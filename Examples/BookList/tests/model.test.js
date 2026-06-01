import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BookModel } from '../src/js/model.js';

describe('BookModel', () => {
  let model;

  beforeEach(() => {
    // Mock localStorage
    const store = {};
    global.localStorage = {
      getItem: vi.fn(key => store[key] || null),
      setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
      removeItem: vi.fn(key => { delete store[key]; }),
      clear: vi.fn(() => { for (const key in store) delete store[key]; })
    };

    model = new BookModel();
  });

  it('should initialize with an empty book list', () => {
    expect(model.books).toEqual([]);
  });

  it('should add a book with default status and rating', () => {
    model.addBook({ title: 'Test Book', author: 'Author' });
    expect(model.books.length).toBe(1);
    expect(model.books[0].title).toBe('Test Book');
    expect(model.books[0].status).toBe('To Read');
    expect(model.books[0].rating).toBe(0);
    expect(model.books[0].id).toBeDefined();
  });

  it('should update book status', () => {
    model.addBook({ title: 'Test Book' });
    const bookId = model.books[0].id;
    
    model.updateStatus(bookId, 'Reading');
    expect(model.books[0].status).toBe('Reading');
    
    model.updateStatus(bookId, 'Finished');
    expect(model.books[0].status).toBe('Finished');
  });

  it('should rate a finished book', () => {
    model.addBook({ title: 'Test Book' });
    const bookId = model.books[0].id;
    
    // Rating a non-finished book should do nothing
    model.rateBook(bookId, 5);
    expect(model.books[0].rating).toBe(0);

    // Update to finished, then rate
    model.updateStatus(bookId, 'Finished');
    model.rateBook(bookId, 4);
    expect(model.books[0].rating).toBe(4);
  });

  it('should reset rating if status changes away from Finished', () => {
    model.addBook({ title: 'Test Book' });
    const bookId = model.books[0].id;
    
    model.updateStatus(bookId, 'Finished');
    model.rateBook(bookId, 5);
    expect(model.books[0].rating).toBe(5);

    model.updateStatus(bookId, 'Reading');
    expect(model.books[0].rating).toBe(0);
  });

  it('should delete a book', () => {
    model.addBook({ title: 'Book 1' });
    model.addBook({ title: 'Book 2' });
    
    const book1Id = model.books[0].id;
    model.deleteBook(book1Id);
    
    expect(model.books.length).toBe(1);
    expect(model.books[0].title).toBe('Book 2');
  });


});
