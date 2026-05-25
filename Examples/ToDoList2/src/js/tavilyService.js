const TAVILY_API_URL = '/api/tavily/search';

export async function fetchHowToLink(taskDescription) {
  try {
    const response = await fetch(TAVILY_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `How do I ${taskDescription}`,
        include_answer: 'basic',
        search_depth: 'basic',
      }),
    });
    if (!response.ok) throw new Error(`Tavily API returned ${response.status}`);
    const { results } = await response.json();
    if (!results?.length) return null;
    const { url, title } = results[0];
    return { url, title };
  } catch (error) {
    console.error('Could not fetch how-to link:', error);
    return null;
  }
}
