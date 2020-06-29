import React, { Component } from 'react';
import './main.css'
import Axios from 'axios';
import API from '../../config';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as mainActions from "../../store/main/actions";
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct: '',
      type: ''
    };
    this.logout = this.logout.bind(this);
    this.questionOnChange = this.questionOnChange.bind(this);
    this.optionAOnChange = this.optionAOnChange.bind(this);
    this.optionBOnChange = this.optionBOnChange.bind(this);
    this.optionCOnChange = this.optionCOnChange.bind(this);
    this.optionDOnChange = this.optionDOnChange.bind(this);
    this.correctOnChange = this.correctOnChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  questionOnChange = (e) => {
    this.setState({ question: e.target.value });
  }

  optionAOnChange = (e) => {
    this.setState({ option_a: e.target.value });
  }

  optionBOnChange = (e) => {
    this.setState({ option_b: e.target.value });
  }

  optionCOnChange = (e) => {
    this.setState({ option_c: e.target.value });
  }

  optionDOnChange = (e) => {
    this.setState({ option_d: e.target.value });
  }

  correctOnChange = (e) => {
    this.setState({ correct: e.target.value });
  }

  handleSumbit = async (event) => {
    console.log(this.state);
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("loginStatus"));

    const data = {
      question: this.state.question,
      option_a: this.state.option_a,
      option_b: this.state.option_b,
      option_c: this.state.option_c,
      option_d: this.state.option_d,
      correct: this.state.correct,
      type: this.state.type
    };
    try {
      const response = await Axios.post(API + '/question/',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json"
          }
        });
      console.log(response.data);
      if (response.data.questions === undefined) {
        document.getElementById("message").innerHTML = "Not able to add question";
      } else {
        document.getElementById("message").innerHTML = "Question added successfully!!";
        this.setState({
          question: '',
          option_a: '',
          option_b: '',
          option_c: '',
          option_d: '',
          correct: '',
          type: ''
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <div className="component-main">
        <button onClick={this.logout}>Logout</button>
        <h1>Add Quiz</h1>
        <div id="message"></div>
        <form onSubmit={this.handleSumbit}>
          Question:
          <textarea
            value={this.state.question}
            onChange={this.questionOnChange}
            placeholder="Enter question here..."
            required>
          </textarea> <br />
          Quiz name:
          <input
            type="text"
            placeholder="Enter quiz name"
            value={this.state.type}
            onChange={e => this.setState({ type: e.target.value })}
            required />
          <hr />
          Option A:
          <input
            value={this.state.option_a}
            onChange={this.optionAOnChange}
            type="text"
            required />
          Option B:
          <input
            value={this.state.option_b}
            onChange={this.optionBOnChange}
            type="text"
            required />
          Option C:
           <input
            value={this.state.option_c}
            onChange={this.optionCOnChange}
            type="text"
            required />
          Option D:
          <input
            value={this.state.option_d}
            onChange={this.optionDOnChange}
            type="text"
            required />
          Correct Answer:
            <select
            onChange={e => this.setState({ correct: e.target.value })}
          >
            <option
              value={this.state.correct}
              selected
              disabled
            >
              Select correct option
            </option>
            {this.state.option_a &&
              (<option
                value={this.state.option_a}>
                {this.state.option_a}
              </option>)
            }
            {this.state.option_b &&
              (<option
                value={this.state.option_b}>
                {this.state.option_b}
              </option>
              )}
            {this.state.option_c &&
              (<option
                value={this.state.option_c}>
                {this.state.option_c}
              </option>
              )}
            {this.state.option_d &&
              (<option
                value={this.state.option_d}>
                {this.state.option_d}
              </option>
              )}
          </select>
          <input
            type="submit"
            value="Add Question"
          />
        </form>
      </div>);
  }
}
// export default connect(
//     ({ main }) => ({ ...main }),
//     dispatch => bindActionCreators({ ...mainActions }, dispatch)
//   )( main );