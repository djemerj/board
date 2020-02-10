import React, {Component} from 'react';


const boardStyle = {
    width: '500px',
    height: '500px',
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid grey'
};

const squareStyle = {width: '25%', height: '25%'};

class Board extends Component {
    constructor(props) {
        super(props);
        const squares = [];
        for (let i = 0; i < 16; i += 1) {
            squares.push(this.renderSquare(i))
        }

        this.state = {
            squares: squares
        };
    }

    /**
     * Drag start event
     * @param e
     * @param index
     */
    onDragStart = (e, index) => {
        this.draggedIndex = this.state.squares.findIndex(element => element.props.id === index);

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    /**
     * Drop event, invert the squares
     * @param index
     */
    drop = (e, index) => {
        const draggedOverIndex = this.state.squares.findIndex(element => element.props.id === index);
        const origin = this.state.squares[this.draggedIndex];
        const target = this.state.squares[draggedOverIndex];
        let squares = this.state.squares;

        squares[draggedOverIndex] = origin;
        squares[this.draggedIndex] = target;

        this.setState({squares});
    };

    /**
     * Drag end event
     */
    onDragEnd = () => {
        this.draggedIndex = null;
    };

    /**
     * Rendering the squares
     * @param i
     * @return {*}
     */
    renderSquare(i) {
        const x = i % 4;
        const y = Math.floor(i / 4);
        const black = (x + y) % 2 === 1;
        const backgroundColor = black ? 'black' : 'white';
        const color = black ? 'white' : 'black';
        const item = 'item' + i;

        return (
            <div key={item} style={squareStyle} id={i} onDragOver={(e) => e.preventDefault()}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    cursor: 'grab',
                    backgroundColor,
                    color,
                }}
                     draggable
                     onDragStart={e => this.onDragStart(e, i)}
                     onDrop={e => this.drop(e, i)}
                     onDragEnd={this.onDragEnd}>
                    {i}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div style={boardStyle}>{this.state.squares}</div>
        );
    }

}

export default Board;
