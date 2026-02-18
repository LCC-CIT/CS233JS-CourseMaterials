/* Written by by Brian Bird, 2/15/25, with help from GitHub Copilot 
   Refactored to use async / await by Brian Bird using Claude Sonnet 4.6 on 2/18/26 */

// Fetch OpenGraph data from a URL when the form is submitted
document.getElementById('fetchForm').addEventListener('submit', getMetadata);

async function getMetadata(event) {
    event.preventDefault();
    const SITE_URL = encodeURIComponent(event.target.elements.url.value); // Encode the URL entered by the user to handle special characters
    const API_URL = "https://api.linkpreview.net/";
    const API_KEY = "fd3f9a0c9fafe271af5bd823cf3f0c02"; // TODO: hide the API key
    // This is a free API key, but you should get your own

    try {
        // Fetch the metadata from the linkpreview API
        const response = await fetch(`${API_URL}?q=${SITE_URL}&key=${API_KEY}`);

        // Check the response and throw an error if it's not ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON and display the OpenGraph data on the page
        const data = await response.json();
        writeDataToPage(data);
    } catch (error) {
        // Log the error to the console and alert the user
        console.error('Error fetching OpenGraph data:', error);
        alert("There was an error fetching the OpenGraph data. Please try again.");
    }
}

// Write the web site metadata to the page
function writeDataToPage(data) {
    document.getElementById('title').textContent = data.title;
    let image = document.getElementById('image')
    image.src = data.image;
    if (data.image === "") {
        image.alt = "No image available";
    }
    document.getElementById('description').textContent = data.description;
}