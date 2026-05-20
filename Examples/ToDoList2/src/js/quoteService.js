const QUOTE_API_URL = 'https://dummyjson.com/quotes/random';

// Returns { quote, author } on success, or null when the network request fails,
// so callers can always handle the no-quote case without crashing.
export async function fetchQuote() {
  try {
    const response = await fetch(QUOTE_API_URL);
    if (!response.ok) throw new Error(`Quote API returned ${response.status}`);
    const { quote, author } = await response.json();
    return { quote, author };
  } catch (error) {
    console.error('Could not load motivational quote:', error);
    return null;
  }
}
