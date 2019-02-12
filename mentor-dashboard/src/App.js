import React, { Component, Fragment } from 'react';
import ReactLoading from 'react-loading';
import './App.css';
import Table from './components/table.js';
import Search from './components/search.js';

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
      .then(data => this.setState({ json: data })), 500)	
  }
  render() {
    if (this.state.json) {
      return (
        <Fragment>
          <Search mentorsList = {Object.keys(this.state.json.pairs)} updateMentor = {this.updateSelectedMentor.bind(this)}/>
          <Table /> 
        </Fragment>
      );
    } else {
      return (
         <ReactLoading type={'spinningBubbles'} color={'#0099ff'} height={'20%'} width={'20%'} />
      )  
    }
  }
  updateSelectedMentor(newMentor) {
    this.setState({selectedMentor: newMentor})
    console.log(newMentor);
  }
}



export default App;
