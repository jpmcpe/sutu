import React, { Component } from 'react';
import logo from './agua.png';
import logo1 from './agua.png';
import logo2 from './agua.png';
import logo3 from './agua.png';
import logo4 from './agua.png';
import Modal from 'react-modal';
import './App.css';


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

function Square(props) {
    if (props.value === "X")
    {
        return (
            <button className="square check" onClick={props.onClick}>
                <img src={logo} width="150"></img>
            </button>
        );
    }else if (props.value === "O"){
        return (
            <button className="square wrong" onClick={props.onClick}>
                <img src={logo} width="150"></img>
            </button>
        );
    }else{
        return (
            <button className="square" onClick={props.onClick}>
                <img src={logo} width="150"></img>
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                image={"./agua"+i+".jpeg"}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(isResponse(i)){
            squares[i] = "X";
            this.openModal()
        }else{
            squares[i] = "O";
        }

        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        let status;

        return (
            <div className="game">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    Felicidades GANASTE y tu Colegio Gano 20 puntos más, sigue asi!
                </Modal>
                <h1>Identifica la imagen donde no se desperdicia el agua</h1>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
            </div>
        );
    }
}

function isResponse(index){
    const lines =[2];
    const [a, b, c] = lines;
    if (index===a || index===b || index===c) {
        return true;
    }
    return false;
}

export default Game;
