export default class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    // Encapsulates score updates so that only the Player controls its own data.
    setScore(score) {
        this.score = score;
    }
}
