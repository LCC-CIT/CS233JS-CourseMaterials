import { BookReview } from './bookReview.js';
const jsonStoreUrl = 'https://api.jsonstorage.net/v1/json';
const apiKey = '7a456d0a-35f8-41b3-98df-c9f94a00de6a';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('createBtn').addEventListener('click', storeReview);
    document.getElementById('readBtn').addEventListener('click', readReview);
    document.getElementById('updateBtn').addEventListener('click', updateReview);
    document.getElementById('deleteBtn').addEventListener('click', deleteReview);
});

function storeReview() {
    // Get data from input fields
    const bookTitle = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    const publicationDate = document.getElementById('pubDate').value;
    const bookReview = document.getElementById('bookReview').value;
    const reviewerName = document.getElementById('reviewerName').value;

    // Create a new Review object
    const review = new BookReview(bookTitle, author, publicationDate, bookReview, reviewerName);

    // Store the Review object using the JsonStore web API
    fetch(`${jsonStoreUrl}?apikey=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({BookReview: review})
    })
    .then(response => {
        if (response.ok) {
            console.log('Review stored successfully');
        } else {
            throw new Error('Error storing review: ' + response.status);
        }
    })
    .then(data => {
        // Assuming the URL is stored in a property named 'url' in the response data
        const url = data.url;
    
        // Create a key by concatenating the book title and reviewer name
        const key = `${bookTitle}-${reviewerName}`;
    
        // Store the URL in local storage
        localStorage.setItem(key, url);
    
        console.log('Review stored successfully');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function readReview() {
    // Get the review ID from the input field
    const reviewId = document.getElementById('reviewId').value;

    // Read the review from the JsonStore web API
    fetch(`${jsonStoreUrl}/${reviewId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error reading review: ' + response.status);
        }
    })
    .then(data => {
        console.log('Review:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateReview() {
    // Get the review ID from the input field
    const reviewId = document.getElementById('reviewId').value;

    // Get data from input fields
    const bookTitle = document.getElementById('bookTitle').value;
    const author = document.getElementById('author').value;
    const publicationDate = document.getElementById('pubDate').value;
    const bookReview = document.getElementById('bookReview').value;
    const reviewerName = document.getElementById('reviewerName').value;

    // Create a new Review object
    const review = new BookReview(bookTitle, author, publicationDate, bookReview, reviewerName);

    // Update the review using the JsonStore web API
    fetch(`${jsonStoreUrl}/${reviewId}?apikey=${apiKey}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    .then(response => {
        if (response.ok) {
            console.log('Review updated successfully');
        } else {
            throw new Error('Error updating review: ' + response.status);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteReview() {
    // Get the review ID from the input field
    const reviewId = document.getElementById('reviewId').value;

    // Delete the review using the JsonStore web API
    fetch(`${jsonStoreUrl}/${reviewId}?apikey=${apiKey}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Review deleted successfully');
        } else {
            throw new Error('Error deleting review: ' + response.status);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}