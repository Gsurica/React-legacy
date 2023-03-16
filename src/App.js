import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  
  state = {
    name: "Guilherme Surica",
    counter: 0
  }

  handleAClick = (e) => {
    e.preventDefault();
    const { counter } = this.state
    this.setState({ counter: counter + 1 })
  }

  handlePClick = () => {
    this.setState({ name: "Gui" })
  }

  render() {

    const { name, counter } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handlePClick}>
            { name }
          </p>
          <p>
            { counter }
          </p>
          <a
            onClick={this.handleAClick}
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Este é o link!
          </a>
        </header>
      </div>
    );
  }
}

export default App;
