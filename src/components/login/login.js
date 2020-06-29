import React, { Component } from 'react';
import './login.css';
import API from '../../config';
import Axios from 'axios';

// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as loginActions from "../../store/login/actions";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      token: ''
    };
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  setLocalStorage() {
    localStorage.setItem("loginStatus", JSON.stringify(this.state.token));
    window.location.reload();
  }

  async handleSubmission() {
    try {
      const { data } = await Axios.post(API + '/admin/login', {
        email: this.state.userName,
        password: this.state.password
      });
      if (data.message === undefined) {
        this.setState({ token: data.token });
        this.setLocalStorage();
      } else {
        document.getElementById("msg").innerHTML = data.message;
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="component-login">
        <input
          type="text"
          value={this.state.userName}
          onChange={e => this.setState({ userName: e.target.value })}
          required
        />
        <br />
        <input
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          required
        /> <br />
        <div id="msg"></div>
        <button onClick={this.handleSubmission}>Login</button>
      </div>);
  }
}
// export default connect(
//     ({ login }) => ({ ...login }),
//     dispatch => bindActionCreators({ ...loginActions }, dispatch)
//   )( login );