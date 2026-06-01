// Created by Brian Bird in spring 2026 using Gemini 3.1 Pro.

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BookModel } from '../src/js/model.js';

/**
 * @fileoverview Unit tests for the BookModel class.
 * Tests local storage persistence, state management, and rating operations.
 */
describe('BookModel', () => {
  /** @type {BookModel} */
  let model;

  /**
   * Mocks global localStorage and initializes a fresh BookModel instance
   * before each test to ensure test isolation.
   */
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

  /**
   * Verifies that a newly instantiated BookModel starts with an empty book list.
   */
  it('should initialize with an empty book list', () => {
    expect(model.books).toEqual([]);
  });

  /**
   * Verifies that adding a new book assigns the default 'To Read' status,
   * an initial rating of 0, and a unique identifier.
   */
  it('should add a book with default status and rating', () => {
    model.addBook({ title: 'Test Book', author: 'Author' });
    expect(model.books.length).toBe(1);
    expect(model.books[0].title).toBe('Test Book');
    expect(model.books[0].status).toBe('To Read');
    expect(model.books[0].rating).toBe(0);
    expect(model.books[0].id).toBeDefined();
  });

  /**
   * Verifies that the updateStatus method correctly mutates a book's status field.
   */
  it('should update book status', () => {
    model.addBook({ title: 'Test Book' });
    const bookId = model.books[0].id;

    model.updateStatus(bookId, 'Reading');
    expect(model.books[0].status).toBe('Reading');

    model.updateStatus(bookId, 'Finished');
    expect(model.books[0].status).toBe('Finished');
  });

  /**
   * Verifies that only books with a 'Finished' status can be rated.
   */
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

  /**
   * Verifies that if a book's status is changed from 'Finished' to something else,
   * its rating is reset to 0.
   */
  it('should reset rating if status changes away from Finished', () => {
    model.addBook({ title: 'Test Book' });
    const bookId = model.books[0].id;

    model.updateStatus(bookId, 'Finished');
    model.rateBook(bookId, 5);
    expect(model.books[0].rating).toBe(5);

    model.updateStatus(bookId, 'Reading');
    expect(model.books[0].rating).toBe(0);
  });

  /**
   * Verifies that a book can be successfully removed from the model's collection.
   */
  it('should delete a book', () => {
    model.addBook({ title: 'Book 1' });
    model.addBook({ title: 'Book 2' });

    const book1Id = model.books[0].id;
    model.deleteBook(book1Id);

    expect(model.books.length).toBe(1);
    expect(model.books[0].title).toBe('Book 2');
  });

});
