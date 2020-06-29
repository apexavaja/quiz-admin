import React from 'react';
import Login from './components/login';
import Main from './components/main';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      token: ''
    }
    this.getLocalStorage = this.getLocalStorage.bind(this);
  }

  getLocalStorage() {
    const token = localStorage.getItem("loginStatus");
    if (token === null) {
      this.setState({ login: false });
    } else {
      this.setState({ login: true });
      this.setState({ token });
    }
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  render() {

    if (this.state.login === false) {
      return <Login />
    } else {
      return <Main />
    }
  }

}

export default App;
