import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Search from './components/search/search';
import Table from './components/table/table';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('render search', () => {
  const div = document.createElement('div');
  const mentorsList = ['mentor1', 'mentor2', 'mentor3'];
  const handleMentor = () => {};
  ReactDOM.render(<Search mentorsList = {mentorsList} 
					  	updateMentor = {handleMentor} 
					  	selectedMentor = {'mentor1'}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('render table', () => {
	const div = document.createElement('div');
  const json = {
  	pairs: [],
    score: [],
    tasks: []
  };
  ReactDOM.render( <Table selectedMentor = {'mentor1'} 
  							json = {json}/> , div);
  ReactDOM.unmountComponentAtNode(div);
});


