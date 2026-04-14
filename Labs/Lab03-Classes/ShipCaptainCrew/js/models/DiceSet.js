import Die from './Die.js';

export default class DiceSet {
    constructor() {
        this.dice = [];
        for (let i = 0; i < 5; i++) {
            this.dice.push(new Die());
        }

        this.hasShip = false;
        this.hasCaptain = false;
        this.hasCrew = false;
    }

    rollAll() {
        for (const die of this.dice) {
            die.roll();
        }
        this.evaluateDice();
    }

    evaluateDice() {
        // Reset state so it can be dynamically evaluated based on what the user currently holds.
        this.hasShip = false;
        this.hasCaptain = false;
        this.hasCrew = false;

        // Simply check the pool of manually held dice for the presence of our target qualifiers.
        let held6 = false;
        let held5 = false;
        let held4 = false;

        for (const die of this.dice) {
            if (die.isHeld) {
                if (die.value === 6) held6 = true;
                else if (die.value === 5) held5 = true;
                else if (die.value === 4) held4 = true;
            }
        }

        // Apply rules strictly based on what is currently held: 
        // Ship unlocks Captain, Captain unlocks Crew
        if (held6) {
            this.hasShip = true;
            if (held5) {
                this.hasCaptain = true;
                if (held4) {
                    this.hasCrew = true;
                }
            }
        }
    }

    // Returns true if the player has secured all three qualifiers (Ship, Captain, Crew).
    isQualified() {
        return this.hasShip && this.hasCaptain && this.hasCrew;
    }

    // Checks if the physical board contains the 6, 5, and 4, regardless of whether 
    // the user has actually clicked to hold them yet.
    canPotentiallyQualify() {
        let has6 = false;
        let has5 = false;
        let has4 = false;

        for (const die of this.dice) {
            if (die.value === 6) has6 = true;
            if (die.value === 5) has5 = true;
            if (die.value === 4) has4 = true;
        }

        return has6 && has5 && has4;
    }

    // Validates if the player is legally allowed to hold a newly clicked die.
    canHold(die) {
        if (die.value === 6 && this.hasShip && !this.isQualified()) return "You already have a Ship! Additional 6s are Cargo.";
        if (die.value === 5 && !this.hasShip) return "You must secure a Ship (6) before keeping a Captain!";
        if (die.value === 5 && this.hasCaptain && !this.isQualified()) return "You already have a Captain! Additional 5s are Cargo.";
        if (die.value === 4 && (!this.hasShip || !this.hasCaptain)) return "You must secure a Captain (5) before keeping a Crew!";
        if (die.value < 4 && !this.isQualified()) return "You cannot keep Cargo dice until you have a Ship, Captain, and Crew!";
        return true;
    }

    // Validates if the player is legally allowed to un-keep a clicked die.
    canUnhold(die) {
        if (die.value === 6 && this.hasCaptain) {
            let held6Count = 0;
            for (const d of this.dice) {
                if (d.isHeld && d.value === 6) held6Count++;
            }
            if (held6Count === 1) return "You cannot remove your Ship while a Captain is held!";
        }
        if (die.value === 5 && this.hasCrew) {
            let held5Count = 0;
            for (const d of this.dice) {
                if (d.isHeld && d.value === 5) held5Count++;
            }
            if (held5Count === 1) return "You cannot remove your Captain while a Crew is held!";
        }
        return true;
    }

    getCurrentCargoScore() {
        // A player only scores points if they have acquired the 6, 5, and 4.
        if (this.isQualified()) {
            // Because we always play with exactly 5 dice, and the qualifying
            // Ship/Captain/Crew dice will always sum exactly to 15 (6 + 5 + 4), 
            // the fastest way to sum the remaining 2 "Cargo" dice is to sum ALL 5 dice 
            // and subtract the 15 we know comes from the qualifiers.
            let total = 0;
            for (const die of this.dice) {
                total += die.value;
            }
            return total - 15; 
        }
        return 0; // If they don't qualify with all three pieces, their score is 0.
    }

    reset() {
        this.hasShip = false;
        this.hasCaptain = false;
        this.hasCrew = false;
        
        for (const die of this.dice) {
            die.reset();
        }
    }
}
