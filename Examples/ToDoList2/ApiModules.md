# Web API Modules in ToDoList2

This app makes web API calls through two dedicated service modules: `quoteService.js` and `tavilyService.js`. Each module exports a single async function and is used by the controller.

---

## `quoteService.js` — Motivational Quote

### What it does

Fetches a random motivational quote from the public [DummyJSON](https://dummyjson.com) API when the app loads. No API key is required.

### API endpoint

```
GET https://dummyjson.com/quotes/random
```

### How it works

```js
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
```

1. Calls `fetch()` with a simple GET request — no headers or body needed.
2. Checks `response.ok` to catch HTTP error codes (4xx, 5xx).
3. Parses the JSON response and destructures the `quote` and `author` fields.
4. Returns `{ quote, author }` on success, or `null` if anything goes wrong.

### Where it's called

`TaskController.loadQuote()` calls `fetchQuote()` once during construction and passes the result to `view.displayQuote()`.

---

## `tavilyService.js` — How-To Link Search

### What it does

Searches the web for a "how to" article related to a new task and returns a link to the top result. This uses the [Tavily](https://tavily.com) search API, which requires an API key.

### API endpoint

```
POST https://api.tavily.com/search
```

### Authentication

The API key is stored in the `.env` file as `VITE_TAVILY_API_KEY` and accessed at build time via `import.meta.env.VITE_TAVILY_API_KEY`. It is sent as a Bearer token in the `Authorization` header.

### How it works

```js
export async function fetchHowToLink(taskDescription) {
  try {
    const response = await fetch(TAVILY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TAVILY_API_KEY}`,
      },
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
```

1. Calls `fetch()` with `method: 'POST'` and a JSON body containing the search query.
2. Sets the `Content-Type` and `Authorization` headers.
3. Constructs the query by prepending `"How do I "` to the task description entered by the user.
4. Checks `response.ok` and throws on HTTP errors.
5. Returns the `url` and `title` from the first search result, or `null` if there are no results or an error occurs.

### Where it's called

`TaskController.handleAddTask()` calls `fetchHowToLink()` after a task is added. If a link is returned, it calls `model.updateTaskLink()` to attach the link to the task.

---

## Key Differences Between the Two Modules

| | `quoteService.js` | `tavilyService.js` |
|---|---|---|
| HTTP method | GET | POST |
| Auth required | No | Yes (Bearer token) |
| Request body | None | JSON with query and options |
| When called | Once at app startup | Each time a task is added |
| Returns | `{ quote, author }` or `null` | `{ url, title }` or `null` |

Both modules follow the same pattern: wrap the `fetch()` call in a `try/catch`, check `response.ok`, and return `null` on any failure so the caller never has to worry about unhandled errors.
