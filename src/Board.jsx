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
        this.draggedItem = this.state.squares.find(element => element.props.id === index);

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    /**
     * Drag over event
     * @param index
     */
    onDragOver = index => {
        const draggedOverItem = this.state.squares.find(element => element.props.id === index);

        if (this.draggedItem === draggedOverItem) {
            return;
        }

        let squares = this.state.squares.filter(square => square !== this.draggedItem);

        squares.splice(index, 0, this.draggedItem);

        this.setState({squares});
    };

    /**
     * Drag end event
     */
    onDragEnd = () => {
        this.draggedItem = null;
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
        const item = 'item' + i;

        return (
            <div key={item} style={squareStyle} id={i} onDragOver={() => this.onDragOver(i)}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    cursor: 'grab',
                    backgroundColor,
                }}
                     draggable
                     onDragStart={e => this.onDragStart(e, i)}
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
