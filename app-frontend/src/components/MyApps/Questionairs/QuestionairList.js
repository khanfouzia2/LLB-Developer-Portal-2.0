import React, { Component } from 'react'
import EditQuestionair from './EditQuestionair';
import PropTypes from 'prop-types';
const uuidv1 = require('uuid/v1');

class QuestionairList extends Component {
  constructor(props) {
    super(props);
    this.handleAddNewQuestionClicked = this.handleAddNewQuestionClicked.bind(this);
    this.HandleSingleQuestionChange = this.HandleSingleQuestionChange.bind(this);
    this.HandleRemoveQuestion = this.HandleRemoveQuestion.bind(this);
  }

  handleAddNewQuestionClicked = (e) => {
    e.preventDefault();
    const { onQuestionairListChange, questionairList } = this.props;
    onQuestionairListChange(
      {
        questionairList: [...questionairList,
        { id: uuidv1(), question: "", type: "text", questionOptions: [], isEditable: true }]
      }
    );
  }

  HandleSingleQuestionChange = (changedObj) => {
    const { onQuestionairListChange, questionairList } = this.props;
    let newQuestionList = questionairList.map((question, index) => {
      if (question.id === changedObj.id) {
        return changedObj;
      }
      else return question;
    });
    onQuestionairListChange(
      { questionairList: newQuestionList }
    );
  }

  HandleRemoveQuestion = (removeObj) => {
    const { onQuestionairListChange, questionairList } = this.props;
    let newQuestionList = questionairList.filter(x => x.id != removeObj.id);
    onQuestionairListChange(
      { questionairList: newQuestionList }
    );
  }

  render() {
    const questionList = this.props.questionairList.map(x =>
      <EditQuestionair key={x.id} handleOnItemChange={this.HandleSingleQuestionChange}
        questionObject={x} handleOnItemDelete={this.HandleRemoveQuestion} isEditable={x.isEditable}>
      </EditQuestionair>);
    return (
      <>
        {questionList}
        <button className="btn btn-secondary" onClick={this.handleAddNewQuestionClicked}>Add new question</button>
      </>
    );
  }
}
QuestionairList.propTypes = {
  questionairList: PropTypes.array,
};
export default QuestionairList
