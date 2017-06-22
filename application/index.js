import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './app.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      val: 0,
    }
    this.increment = this.increment.bind(this);
  }
  increment() {
    const { val } = this.state;
    this.setState({ val: val + 1 });
  }
  render() {
    return (
      <div>
        <button onClick={this.increment}>do something</button>
        {this.state.val}
      </div>
    )
  }
}

export default App;
