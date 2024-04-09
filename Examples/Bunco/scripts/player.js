// Written by Brian Bird, 4/9/2024 with the assistance of GitHub Copilot

class Player
{
    constructor(name)
    {
        this.name = name;
        this.totalScore = 0;
        this.roundScore = 0;
        this.roundsWon = 0;
    }

    // Roll all the dice in the array
    roll(dice)
    {
        for (let i = 0; i < dice.length; i++)
        {
            dice[i].roll();
        }
    }

    // Calculate the socre for this round and add it to the player's total score
    calculateScore(dice, round)
    {
        let rollScore = 0;
        for (let i = 0; i < dice.length; i++)
        {
            if (dice[i].value === round)
            {
                rollScore++;
            }
        }
        if (rollScore === 3)  // this is a bunco!
        {
            rollScore = 21;
        }
        // If all the die are the same value, the player scored 5 points
         else if (dice.every(d => d.value === dice[0].value)) 
        {
            rollScore = 5;
        }

        this.roundScore += rollScore;
        // Round score can't be over 21
        if (this.roundScore > 21)
        {
            this.roundScore = 21;
        }
        return rollScore;
    }
}