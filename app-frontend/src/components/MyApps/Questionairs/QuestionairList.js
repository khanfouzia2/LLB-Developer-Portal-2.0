import React, { Component } from 'react'

class QuestionairList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: []
    }
  }
  render() {
    return(
      <>
          <h3>List of question component</h3>
          <p>A list of question will come here</p>
         <button>Add new question</button>  
      </>
    );  
  }
}

export default QuestionairList
