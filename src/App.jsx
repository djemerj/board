import React, {Component} from 'react';
import './App.css';
import Board from './Board';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <Board />
            </div>
        )
    }
}

export default App;
