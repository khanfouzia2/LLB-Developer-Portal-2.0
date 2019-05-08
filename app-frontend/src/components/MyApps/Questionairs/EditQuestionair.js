import React, { Component } from 'react'
import "./EditQuestionair.css"
const uuidv1 = require('uuid/v1');

class EditQuestionair extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDeleteButtonClicked = this.handleDeleteButtonClicked.bind(this);
    this.renderOptionSection = this.renderOptionSection.bind(this);
    this.onAddOptionClick = this.onAddOptionClick.bind(this);
    this.handleDeleteOptionClicked = this.handleDeleteOptionClicked.bind(this);
    this.handleOptionInputChange = this.handleOptionInputChange.bind(this);
  }
  //This is only handle the question on change not the OPTION on change
  handleOnChange = (event) => {
    const questionOptions =  (event.target.name === "questionType") ? [] : this.props.questionObject.questionOptions
    this.props.handleOnItemChange({
      ...this.props.questionObject,
      [event.target.name]: event.target.value,
      questionOptions: questionOptions
    });
  }
  // This will handle when there is a change in the OPTION item
  handleOptionInputChange = option => event => {
    const { questionOptions } = this.props.questionObject;
    let newOptionList = questionOptions.map ((x, index) => {
        if(x.id === option.id) {
           return {...x, [event.target.name]: event.target.value};
        }
        else { return x;}
    });
    this.props.handleOnItemChange({
      ...this.props.questionObject,
      questionOptions: newOptionList
    });
  }

  handleDeleteButtonClicked = (e) => {
    e.preventDefault();
    this.props.handleOnItemDelete(this.props.questionObject);
  }

  // add Option Clicked
  onAddOptionClick = (e) => {
    e.preventDefault();
    const { questionOptions } = this.props.questionObject;
    let optionList = [...questionOptions, { id: uuidv1(), content: "" }];
    this.props.handleOnItemChange({
      ...this.props.questionObject,
      questionOptions: optionList
    });
  }
  
  // Delete Option 
  handleDeleteOptionClicked = option => e => {
    e.preventDefault();
    const { questionOptions } = this.props.questionObject;
    let optionList = questionOptions.filter(x => x.id !== option.id);
    this.props.handleOnItemChange({
      ...this.props.questionObject,
      questionOptions: optionList
    });
  }
  renderOptionSection = () => {
    const { questionType, questionOptions } = this.props.questionObject;
    let optionList = questionOptions.map((option, index) => {
      return (
        <div className="row" key={option.id}>
          <div className="col-md-10">
            <div className="form-group">
              <input name="content" className="form-control" placeholder="Option" onChange={this.handleOptionInputChange(option)}
                type="text" defaultValue={option.content} />
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-default"
              onClick={this.handleDeleteOptionClicked(option)}>
              <i className="fas fa-times fa-lg"></i>
            </button>
          </div>
        </div>

      );
    })

    if (questionType === "singleChoice" || questionType === "multipleChoice") {
      return (
        <div className="question-option-wrapper">
          <div className="row">
            <div className="col-md-6">
              {optionList}
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.onAddOptionClick}>
            Add new option
          </button>
        </div>
      );
    }
    else return <></>
  }

  render() {
    const { questionText, questionType } = this.props.questionObject;
    return (
      <div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <input className="form-control" placeholder="Question"
                name="questionText" onChange={this.handleOnChange} type="text" defaultValue={questionText} />
            </div>
          </div>
          <div className="col-md-3">
            <select className="custom-select" onChange={this.handleOnChange}
              name="questionType" defaultValue={questionType}>
              <option value="text">Text</option>
              <option value="singleChoice">Single Choice</option>
              <option value="multipleChoice">Multiple Choice</option>
              <option value="sentiment">Sentiment</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="col-md-1">
            <button className="btn btn-default" onClick={this.handleDeleteButtonClicked}>
              <i className="fas fa-trash-alt fa-lg"></i>
            </button>
          </div>
        </div>
        {this.renderOptionSection()}
      </div>
    )
  }
}

export default EditQuestionair;