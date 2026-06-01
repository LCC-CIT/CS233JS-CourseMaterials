// Created by Brian Bird in spring 2026 using Gemini 3.1 Pro.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { parseSearchResults, searchBooksByTitle } from '../src/js/openLibraryService.js';

/**
 * @fileoverview Unit tests for the OpenLibrary API service.
 * Tests network mocking, error handling, and data parsing.
 */
describe('openLibraryService', () => {

  /**
   * Test suite for the async fetch operations.
   */
  describe('searchBooksByTitle', () => {
    let originalFetch;

    /**
     * Replaces the global fetch API with a mock function before each test.
     */
    beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = vi.fn();
    });

    /**
     * Restores the original global fetch API and clears all mock data after each test.
     */
    afterEach(() => {
      global.fetch = originalFetch;
      vi.restoreAllMocks();
    });

    /**
     * Verifies that searching with an empty or whitespace-only string
     * resolves to an empty array without making a network request.
     */
    it('should return empty array if title is empty or whitespace', async () => {
      expect(await searchBooksByTitle('')).toEqual([]);
      expect(await searchBooksByTitle('   ')).toEqual([]);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    /**
     * Verifies that a successful API response is fetched and parsed correctly.
     */
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

    /**
     * Verifies that network failures are caught, an error is logged,
     * and an empty array is safely returned.
     */
    it('should return empty array and log error on fetch failure', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
      global.fetch.mockRejectedValueOnce(new Error('API Down'));

      const results = await searchBooksByTitle('Failed Book');

      expect(results).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  /**
   * Test suite for the data transformation logic.
   */
  describe('parseSearchResults', () => {

    /**
     * Verifies that null, empty, or invalid data objects safely return an empty array.
     */
    it('should return an empty array if data is missing or docs are empty', () => {
      expect(parseSearchResults(null)).toEqual([]);
      expect(parseSearchResults({})).toEqual([]);
      expect(parseSearchResults({ docs: [] })).toEqual([]);
    });

    /**
     * Verifies that a well-formed OpenLibrary document is mapped correctly
     * into the standard application Book object schema.
     */
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

    /**
     * Verifies that missing optional fields (like authors, dates, ISBNs, covers)
     * fall back to reasonable default values instead of throwing errors.
     */
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
