import { BookReview } from './bookReview.js';
const jsonStoreUrl = 'https://api.jsonstorage.net/v1/json';
const apiKey = '7a456d0a-35f8-41b3-98df-c9f94a00de6a';

const reviews = []; // local array to store BookReview objects

document.addEventListener('DOMContentLoaded', function () {
    // get a list of reviews from local storage
    getAllReviews();
    console.log('Reviews:', reviews);
    listReviews();
});

function getAllReviews() {
      // Get all keys from local storage
      const keys = Object.keys(localStorage);

      // Iterate over the keys
      keys.forEach(key => {
          // Get the review from local storage
          const review = JSON.parse(localStorage.getItem(key));
  
          // Add the review to the reviews array
          reviews.push(review);
      });

        /*
        // Fetch the review from the URL
        fetch(url, {
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
                // Add the review to the array
                reviews.push(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            
    });*/
}

function listReviews() {

    const reviewList = document.getElementById('review-list');

    reviews.forEach(review => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        const title = document.createElement('h5');
        title.className = 'mb-1';
        title.textContent = review.bookTitle;
        listItem.appendChild(title);

        const reviewerName = document.createElement('p');
        reviewerName.className = 'mb-1';
        reviewerName.textContent = `${review.reviewerName}`;
        listItem.appendChild(reviewerName);

        const url = document.createElement('span');
        url.className = 'd-none';
        url.textContent = review.url;
        listItem.appendChild(url);

        reviewList.appendChild(listItem);

        // Add an event listener to each list item
        listItem.addEventListener('click', function () {
            showReview.call(this);
        });
    });
}

function showReview() {
    // get the review from local storage
    const key = `${this.querySelector('h5').textContent}-${this.querySelector('p').textContent}`;

    const review = JSON.parse(localStorage.getItem(key));

    document.querySelector('#book-title').textContent = review.bookTitle;
    document.querySelector('#author').textContent = review.author;
    document.querySelector('#publication-date').textContent = review.publicationDate;
    document.querySelector('#reviewer-name').textContent = review.reviewerName;
    document.querySelector('#book-review').textContent = review.BookReview;
    document.querySelector('#review-date').textContent = review.reviewDate;
    document.querySelector('#review-url').textContent = review.url;
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

/* ****** */
/*  Tests */
/* ****** */

function storeReviewsLocally() {
    // Create an array of BookReview objects
    const reviews = [
        new BookReview('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', 'A great book!', 'John Doe', 'https://example.com/review/1'),
        new BookReview('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', 'A must read!', 'Jane Doe', 'https://example.com/review/2'),
        new BookReview('1984', 'George Orwell', '1949-06-08', 'A thought-provoking book!', 'Bob Smith', 'https://example.com/review/3')
    ];

    // Store each review in local storage
    reviews.forEach(review => {
        // Create a key by concatenating the book title and reviewer name
        const key = `${review.bookTitle}-${review.reviewerName}`;

        // Store the object in local storage
        localStorage.setItem(key, JSON.stringify(review));
    });

    console.log('Reviews stored successfully');
}

// clear local storage for the current domain
function clearLocalStorage() {
    localStorage.clear();
    console.log('Local storage cleared');
}

function storeReviewsOnline() {

    // Create an array of BookReview objects
    const reviews = [
        new BookReview('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', 'A great book!', 'John Doe', 'https://example.com/review/1'),
        new BookReview('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', 'A must read!', 'Jane Doe', 'https://example.com/review/2'),
        new BookReview('1984', 'George Orwell', '1949-06-08', 'A thought-provoking book!', 'Bob Smith', 'https://example.com/review/3')
    ];

    // Store each review online
    reviews.forEach((review) => {
        fetch(`${jsonStoreUrl}?apikey=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error storing review: ' + response.status);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

// Make functions available in the broswer console
window.storeReviewsLocally = storeReviewsLocally;
window.clearLocalStorage = clearLocalStorage;