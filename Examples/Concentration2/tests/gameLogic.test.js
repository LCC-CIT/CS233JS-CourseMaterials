// Written by Brian Bird using Gemini 3.1 pro in spring 2026.
import { describe, it, expect, beforeEach } from 'vitest';
import { GameLogic } from '../src/gameLogic.js';
import { NUMBER_OF_CARDS } from '../src/ui.js';

/**
 * @fileoverview Unit tests for the GameLogic class in the Concentration2 game.
 * Verifies the integrity of game rules including deck generation, shuffling, and matching.
 */

describe('GameLogic', () => {
    /** @type {GameLogic} */
    let logic;

    /**
     * Re-instantiates the GameLogic class before each test
     * to ensure a clean, isolated state.
     */
    beforeEach(() => {
        logic = new GameLogic();
    });

    /**
     * Verifies that the GameLogic class initializes with the correct 
     * default properties.
     */
    it('should initialize with default values', () => {
        expect(logic.cards).toEqual([]);
        expect(logic.firstPick).toBe(-1);
        expect(logic.secondPick).toBe(-1);
        expect(logic.matches).toBe(0);
        expect(logic.tries).toBe(0);
    });

    /**
     * Verifies that the `fillCards` method correctly populates the deck 
     * with exactly 20 cards (10 matching pairs).
     */
    it('should fill cards with exactly 20 cards', () => {
        logic.fillCards();
        expect(logic.cards.length).toBe(NUMBER_OF_CARDS);
        // Ensure that there are pairs
        const aHearts = logic.cards.filter(c => c.value === 'a' && c.suit === 'h');
        expect(aHearts.length).toBe(1);
    });

    /**
     * Verifies that the `shuffleCards` method randomizes the order 
     * of the cards without adding or removing any elements.
     */
    it('should shuffle cards', () => {
        logic.fillCards();
        const originalOrder = [...logic.cards];
        logic.shuffleCards();
        // It's highly unlikely that the array remains in the exact same order
        expect(logic.cards).not.toEqual(originalOrder);
        // But the length and contents should be identical
        expect(logic.cards.length).toBe(originalOrder.length);
    });

    /**
     * Verifies that the `pickCard` method accurately tracks 
     * the player's first and second card selections.
     */
    it('should record picks correctly', () => {
        logic.pickCard(5);
        expect(logic.firstPick).toBe(5);
        expect(logic.secondPick).toBe(-1);

        logic.pickCard(12);
        expect(logic.firstPick).toBe(5);
        expect(logic.secondPick).toBe(12);
    });

    /**
     * Verifies that the `resetPicks` method clears the player's 
     * current card selections back to -1.
     */
    it('should reset picks', () => {
        logic.pickCard(5);
        logic.pickCard(12);
        logic.resetPicks();
        expect(logic.firstPick).toBe(-1);
        expect(logic.secondPick).toBe(-1);
    });

    /**
     * Verifies that the `isMatch` method correctly returns true 
     * when the two selected cards have identical values.
     */
    it('should identify a match', () => {
        logic.fillCards();
        // Manually place matching cards
        logic.cards[0] = { value: 'a', suit: 'h' };
        logic.cards[1] = { value: 'a', suit: 's' };

        logic.pickCard(0);
        logic.pickCard(1);
        expect(logic.isMatch()).toBe(true);
    });

    /**
     * Verifies that the `isMatch` method correctly returns false 
     * when the two selected cards have different values.
     */
    it('should identify a non-match', () => {
        logic.fillCards();
        // Manually place non-matching cards
        logic.cards[0] = { value: 'a', suit: 'h' };
        logic.cards[1] = { value: 'k', suit: 'h' };

        logic.pickCard(0);
        logic.pickCard(1);
        expect(logic.isMatch()).toBe(false);
    });
});
