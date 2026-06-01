/**
 * Service for fetching data from the OpenLibrary API.
 * This service handles HTTP requests and parsing to keep the Model clean.
 */

const BASE_URL = 'https://openlibrary.org';
const USER_AGENT_EMAIL = 'birdb@lanecc.edu';

/**
 * Custom headers required by OpenLibrary to prevent rate limiting.
 * @type {HeadersInit}
 */
const HEADERS = {
  'User-Agent': `BookList/1.0 (${USER_AGENT_EMAIL})`,
  'Accept': 'application/json'
};

/**
 * Searches OpenLibrary by book title and returns a formatted list of books.
 * @param {string} title - The book title to search for.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of book objects.
 */
export async function searchBooksByTitle(title) {
  if (!title || title.trim() === '') return [];
  
  const query = encodeURIComponent(title.trim());
  const url = `${BASE_URL}/search.json?q=${query}&limit=10`;

  try {
    const response = await fetch(url, { headers: HEADERS });
    if (!response.ok) {
      throw new Error(`OpenLibrary API error: ${response.statusText}`);
    }

    const data = await response.json();
    return parseSearchResults(data);
  } catch (error) {
    console.error('Error fetching from OpenLibrary:', error);
    return [];
  }
}

/**
 * Parses the raw OpenLibrary API response into our standard Book format.
 * This is an internal pure function exported for unit testing.
 * @param {Object} data - The raw JSON response from OpenLibrary.
 * @returns {Array<Object>} Formatted array of books.
 */
export function parseSearchResults(data) {
  if (!data || !data.docs || !Array.isArray(data.docs)) {
    return [];
  }

  return data.docs.map(doc => {
    // Extract the first author if available
    const author = doc.author_name && doc.author_name.length > 0 ? doc.author_name[0] : 'Unknown Author';
    
    // Extract the first publish year
    const pubDate = doc.first_publish_year ? doc.first_publish_year.toString() : 'Unknown Date';
    
    // Extract the first ISBN
    const isbn = doc.isbn && doc.isbn.length > 0 ? doc.isbn[0] : 'N/A';

    // Construct the cover photo URL using the cover_i field
    const coverPhotoUrl = doc.cover_i 
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` 
      : null;

    return {
      title: doc.title,
      author: author,
      pubDate: pubDate,
      isbn: isbn,
      coverPhotoUrl: coverPhotoUrl
    };
  });
}
