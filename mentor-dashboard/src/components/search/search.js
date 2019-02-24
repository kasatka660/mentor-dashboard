import React, { Component } from 'react';
import Select from 'react-select';
import './search.css'


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
     selectedOption: props.selectedMentor
    }
    this.handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      this.props.updateMentor(selectedOption.value);
      localStorage.setItem('mentor', selectedOption.value);
    }
  }

  render() {
    const { selectedOption } = this.state;
    const options = this.props.mentorsList.map(item => {
      return {
        value: item,
        label: item
      }
    });
    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        defaultValue={options.find(item => item.value == this.props.selectedMentor)}
        defaultInputValue={this.props.selectedMentor}
        selectValue={this.props.selectedMentor}
      />
    );
  }
}

export default Search;

