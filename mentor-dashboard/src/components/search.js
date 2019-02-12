import React, { Component } from 'react';
import Select from 'react-select';



class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
     selectedOption: null,
    }
    this.handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      this.props.updateMentor(selectedOption.value);
      console.log(`Option selected:`, selectedOption);
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
      />
    );
  }
}

export default Search;

