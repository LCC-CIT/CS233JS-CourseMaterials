import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { parseSearchResults, searchBooksByTitle } from '../src/js/openLibraryService.js';

describe('openLibraryService', () => {
  describe('searchBooksByTitle', () => {
    let originalFetch;

    beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = vi.fn();
    });

    afterEach(() => {
      global.fetch = originalFetch;
      vi.restoreAllMocks();
    });

    it('should return empty array if title is empty or whitespace', async () => {
      expect(await searchBooksByTitle('')).toEqual([]);
      expect(await searchBooksByTitle('   ')).toEqual([]);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should fetch and return parsed results on success', async () => {
      const mockResponse = {
        docs: [
          {
            title: 'Mock Book',
            author_name: ['Mock Author'],
            first_publish_year: 2026,
            isbn: ['1111111111']
          }
        ]
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const results = await searchBooksByTitle('Mock Book');
      
      expect(global.fetch).toHaveBeenCalledWith(
        'https://openlibrary.org/search.json?q=Mock%20Book&limit=10',
        expect.any(Object)
      );
      expect(results.length).toBe(1);
      expect(results[0].title).toBe('Mock Book');
      expect(results[0].author).toBe('Mock Author');
      expect(results[0].pubDate).toBe('2026');
    });

    it('should return empty array and log error on fetch failure', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      global.fetch.mockRejectedValueOnce(new Error('API Down'));

      const results = await searchBooksByTitle('Failed Book');
      
      expect(results).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('parseSearchResults', () => {
    it('should return an empty array if data is missing or docs are empty', () => {
      expect(parseSearchResults(null)).toEqual([]);
      expect(parseSearchResults({})).toEqual([]);
      expect(parseSearchResults({ docs: [] })).toEqual([]);
    });

    it('should correctly parse a valid OpenLibrary response doc', () => {
      const mockData = {
        docs: [
          {
            title: 'The Lord of the Rings',
            author_name: ['J.R.R. Tolkien', 'Another Author'],
            first_publish_year: 1954,
            isbn: ['1234567890', '0987654321'],
            cover_i: 12345
          }
        ]
      };

      const result = parseSearchResults(mockData);

      expect(result.length).toBe(1);
      expect(result[0].title).toBe('The Lord of the Rings');
      expect(result[0].author).toBe('J.R.R. Tolkien');
      expect(result[0].pubDate).toBe('1954');
      expect(result[0].isbn).toBe('1234567890');
      expect(result[0].coverPhotoUrl).toBe('https://covers.openlibrary.org/b/id/12345-M.jpg');
    });

    it('should handle missing optional fields gracefully', () => {
      const mockData = {
        docs: [
          {
            title: 'Unknown Book'
          }
        ]
      };

      const result = parseSearchResults(mockData);

      expect(result.length).toBe(1);
      expect(result[0].title).toBe('Unknown Book');
      expect(result[0].author).toBe('Unknown Author');
      expect(result[0].pubDate).toBe('Unknown Date');
      expect(result[0].isbn).toBe('N/A');
      expect(result[0].coverPhotoUrl).toBeNull();
    });
  });
});
