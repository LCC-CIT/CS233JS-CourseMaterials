// Written by Brian Bird, 4/9/2024 with the assistance of GitHub Copilot

class Die
{
    constructor()
    {
        this.value = 0;
    }

    roll()
    {
        this.value = Math.floor(Math.random() * 6) + 1;
    }
}