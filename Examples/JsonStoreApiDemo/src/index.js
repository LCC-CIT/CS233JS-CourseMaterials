import { BookReview } from './bookReview.js';
const jsonStoreUrl = 'https://api.jsonstorage.net/v1/json';
const apiKey = '7a456d0a-35f8-41b3-98df-c9f94a00de6a';
const reviewId = '1f65d869-619f-4c39-beda-5df34664ef85/d47fc918-d1f2-4556-b0c8-f47724333eae';

let lastReviewKey = 1;  // number suffix on the last review key

document.addEventListener('DOMContentLoaded', function () {
    // add event listeners for all the buttons
    let addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', addReview);
    addBtn.disabled = true;
    document.getElementById('readBtn').addEventListener('click', readReviews);
});

// We need to get all the reveiws before adding a review so that we know what the next review key number should be.
// Use HTTP PATCH to add a review from the form on the page
function addReview() {
    let key = "review" + lastReviewKey;
    let data = {}
    data[key] = {
            bookTitle: document.getElementById('bookTitle').value,
            author: document.getElementById('author').value,
            publicationDate: document.getElementById('pubDate').value,
            bookReview: document.getElementById('bookReview').value,
            reviewerName: document.getElementById('reviewerName').value,
            reviewDate: new Date().toISOString()
    };
    fetch(`${jsonStoreUrl}/${reviewId}?apiKey=${apiKey}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error storing review: ' + response.status);
            }
            console.log(response.url);  // url of the stored data
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Use HTTP GET to read all reviews
function readReviews() {
    fetch(`${jsonStoreUrl}/${reviewId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error reading reviews: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayReviews(data);
            lastReviewKey = Object.keys(data).length + 1;
        })
        .catch(error => {
            console.error('Error:', error);
        });
        // enable the add button since we've read the reviews and know how many there are 
               document.getElementById('addBtn').disabled = false;
}

function displayReviews(reviews) {
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = '';
    for (let key in reviews) {
        let review = reviews[key];
        const li = document.createElement('li');
        li.textContent = review.bookTitle + ' by ' + review.author + ' reviewed by ' + review.reviewerName;
        li.classList.add('list-group-item'); // Add this line
        reviewList.appendChild(li);
    };
}



/* **************************************** */
/*                  Tests                   */
/* **************************************** */

const testReviewId = '1f65d869-619f-4c39-beda-5df34664ef85/edd99dbb-9df8-471a-8c74-52274e07f09b';

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
    const reviews = {
        review1: new BookReview('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', 'A great book!', 'John Doe', 'https://example.com/review/1'),
        review2: new BookReview('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', 'A must read!', 'Jane Doe', 'https://example.com/review/2'),
        review3: new BookReview('1984', 'George Orwell', '1949-06-08', 'A thought-provoking book!', 'Bob Smith', 'https://example.com/review/3')
    };

    fetch(`${jsonStoreUrl}?apikey=${apiKey}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviews)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error storing review: ' + response.status);
            }
            console.log(response.url);  // url of the stored data
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// get reviews from the online json store
function getReviewsOnline() {
    fetch(`${jsonStoreUrl}/${testReviewId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error reading reviews: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function updateReviewOnline() {
    let data = {
        /* op: "add",
        path: "/BookReviews/-",
        value: */
        review4:
        {
            bookTitle: "New Book 2",
            author: "New Author 2",
            publicationDate: "2022-01-02",
            bookReview: "This is another new book!",
            reviewerName: "Reviewer Name",
            reviewDate: "2022-01-01T00:00:00.000Z",
            url: "https://example.com/review/4"
        }
    };
    fetch(`${jsonStoreUrl}/${testReviewId}?apiKey=${apiKey}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.error('Error:', err));
}


// Use HTTP PUT to replace a set of reviews
function replaceReviewsOnline() {
    // Create an array of BookReview objects
    const reviews = {
        review1: new BookReview("Pride and Prejudice", "Jane Austen", "1813-01-28", "A classic piece of literature!", "Reviewer 4", "2022-04-04T00:00:00.000Z"),
        review2: new BookReview("Moby Dick", "Herman Melville", "1851-10-18", "An epic tale of man versus nature!", "Reviewer 5", "2022-05-05T00:00:00.000Z"),
        review3: new BookReview("The Catcher in the Rye", "J.D. Salinger", "1951-07-16", "A controversial novel that's a symbol of teenage rebellion!", "Reviewer 6", "2022-06-06T00:00:00.000Z")
    }

    fetch(`${jsonStoreUrl}/${reviewId}?apikey=${apiKey}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviews)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error storing review: ' + response.status);
            }
            console.log(response.url);  // url of the stored data
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Make functions available in the broswer console
window.storeReviewsOnline = storeReviewsOnline;
window.getReviewsOnline = getReviewsOnline;
window.updateReviewOnline = updateReviewOnline;
window.replaceReviewsOnline = replaceReviewsOnline;
window.storeReviewsLocally = storeReviewsLocally;
window.clearLocalStorage = clearLocalStorage;
