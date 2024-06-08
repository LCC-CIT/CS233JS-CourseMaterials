export class BookReview {
    constructor(bookTitle, author, publicationDate, bookReview, reviewerName, url) {
        this.bookTitle = bookTitle;
        this.author = author;
        this.publicationDate = publicationDate;
        this.bookReview = bookReview;
        this.reviewerName = reviewerName;
        this.reviewDate = new Date().toISOString();
        this.url = url;
    }
}