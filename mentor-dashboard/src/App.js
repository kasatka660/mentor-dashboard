import React, { Component, Fragment } from 'react';
import ReactLoading from 'react-loading';
import './App.css';
import Table from './components/table/table';
import Search from './components/search/search';
import Login from './components/login/login';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null,
      selectedMentor: null
    }
  }
  componentDidMount() {
    setTimeout( () => fetch('./input.json')
      .then(response => response.json())
      .then(data => this.setState({ json: data, selectedMentor: localStorage.getItem('mentor')})), 500)
  }
  render() {
    if (this.state.json) {
      return (
        <Fragment>
          <Login mentorLogin = {this.displayMentorByLogin.bind(this)} />
          <Search mentorsList = {Object.keys(this.state.json.pairs)} updateMentor = {this.updateSelectedMentor.bind(this)} selectedMentor = {this.state.selectedMentor}/>
          <Table selectedMentor = {this.state.selectedMentor} json = {this.state.json}/> 
        </Fragment>
      );
    } else {
      return (
         <ReactLoading type={'spinningBubbles'} color={'#0099ff'} height={'20%'} width={'20%'} />
      )  
    }
  }
  updateSelectedMentor(newMentor) {
    this.setState({selectedMentor: newMentor});
  }
  displayMentorByLogin(data) {
    const url = 'https://mentor-dashboard-kasatka660.herokuapp.com/authenticate/'+data.code;
    let userUrl = 'https://api.github.com/user?access_token='
    fetch(url) 
      .then(response => response.json())
      .then(data => {
        fetch(userUrl + data.token)
          .then(response => response.json())
          .then(data => {
            this.setState({selectedMentor: data.login})
            localStorage.setItem('mentor', data.login);
          });
      })  
      .catch(function (error) {  
        throw error;  
      });
  }
}

export default App;
