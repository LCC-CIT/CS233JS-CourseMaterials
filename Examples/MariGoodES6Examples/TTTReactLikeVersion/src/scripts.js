class TTT {

    constructor() {
        this.squares = Array(9).fill(null);
        this.xIsNext = true;
        this.winner = null;
        this.winningLine = Array();
        this.lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            ];
        this.render();
    }

    calculateWinner(squares) {
        for (let i = 0; i < this.lines.length; i++) {
          const [a, b, c] = this.lines[i];
          if (squares[a] && 
            squares[a] === squares[b] && 
            squares[a] === squares[c]) {
                return {player: squares[a], winningLine: this.lines[i]};
          }
        }
        return {player: null, winningLine: Array()};
    }
  
    handleClick(i) {
        this.squares[i] = this.xIsNext ? 'X' : 'O';
        const theWinner = this.calculateWinner(this.squares);
        this.winner = theWinner.player;
        this.winningLine = theWinner.winningLine;
        this.xIsNext = !(this.xIsNext); 
        localStorage.setItem('TTT', JSON.stringify(this));
        this.render();
    }
  
    renderSquare(i) {
        const className = (this.winningLine.indexOf(i) == -1) ? "square" : "square-winner";
        const enabled = (this.winner == null && this.squares[i] == null) ? true : false;
        const eventHandler = (enabled)? "ttt.handleClick(" + i + ")": "";
        const output = 
            `<div class='col-xs-4 ${className}' 
                onclick='${eventHandler}'>
                ${(this.squares[i] != null) ? this.squares[i] : ""}
            </div>`;   
        return output;
    }
  
    render() {
        let status;
        if (this.winner) {
          status = 'Winner: ' + this.winner;
        } else {
          status = 'Next player: ' + (this.xIsNext ? 'X' : 'O');
        }
  
        const output =  
            `<div>
            <div class="status">${status}</div>
            <div class="row">
                ${this.renderSquare(0)}${this.renderSquare(1)}${this.renderSquare(2)}
            </div>
            <div class="row">
                ${this.renderSquare(3)}${this.renderSquare(4)}${this.renderSquare(5)}
            </div>
            <div class="row">
                ${this.renderSquare(6)}${this.renderSquare(7)}${this.renderSquare(8)}
            </div>
            </div>
        `;
        document.getElementById('board').innerHTML = output;
    }
}

let ttt;
window.addEventListener("load", () => {  
    ttt = new TTT();
});