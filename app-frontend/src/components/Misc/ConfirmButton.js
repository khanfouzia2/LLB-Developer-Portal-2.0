import React from 'react';
import PropTypes from 'prop-types';
import '../../styles.css';
const helpers = require('../../helpers.js');

/*

  Button that required two clicks. Usefull for actions that might be not wanted.
  Button is disabled for X seconds [default 1,5 sec.], and then actual onClick method will be called
  (defined in parent comp. and passed as a prop)

  props:
    isRendered: true                  | Does render return the button
    buttonText: "",                   | Text of the button (initially)
    buttonTextWhileDisabled: "",      | Text shown while disabled
    buttonTextAfterFirstClick: "",    | Text after user clicked it first time
    CSSClassString: "",               | Extra CSS class names (btn + ???)
    secondClickOnClickFunc: null,     | What actually happens after the confirmation click.
    disabledTime: 1500,               | Disabled time in ms.


  Example usage:
  <ConfirmButton isRendered={true} buttonText="Delete" buttonTextAfterFirstClick="Confirm deletion?" CSSClassString="btn-danger"
    secondClickOnClickFunc={(e)=>{alert("function called")}} disabledTime={2500} />

  Author: OP


*/
class ConfirmButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }



    this.handleFirstClick = this.handleFirstClick.bind(this);

  }


  render() {

    if(!this.props.isRendered) { return(null); }

    return(
      <><button className={`btn ${this.props.CSSClassString}`} onClick={(e)=>this.handleFirstClick(e)}>{this.props.buttonText}</button></>
    );

  }


  /*

    When button is first clicked.
    Disable it for a moment. After short delay, add onClickListener and enable button.

  */
  handleFirstClick(e) {

    var btn = e.target;
    const onClickListener_ = this.props.secondClickOnClickFunc;
    const buttonTextAfterFirstClick = this.props.buttonTextAfterFirstClick;

    btn.disabled = true;
    btn.innerHTML = this.props.buttonTextWhileDisabled;
    btn.setAttribute('style', 'cursor:wait;');


    setInterval(function(el, onClickListener_, buttonTextAfterFirstClick) {
      // After delay, add the new onClick listerner and set button enabled and so on...
      el.addEventListener("click", onClickListener_);
      el.disabled = false;
      el.style.removeProperty('cursor');
      el.innerHTML = buttonTextAfterFirstClick;

    }, this.props.disabledTime, btn, onClickListener_, buttonTextAfterFirstClick); // params are passed here

  }



  componentDidMount() {
    console.log("Custom 'Confirm button' component did mount!");
  }



}
export default ConfirmButton;

ConfirmButton.propTypes = {
  isRendered: PropTypes.bool,
  buttonText: PropTypes.string,
  buttonTextWhileDisabled: PropTypes.string,
  buttonTextAfterFirstClick: PropTypes.string,
  CSSClassString: PropTypes.string,
  secondClickOnClickFunc: PropTypes.func,
  disabledTime: PropTypes.number
};

// Specifies the default values for props:
ConfirmButton.defaultProps = {
  isRendered: true,
  buttonText: "Button text",
  buttonTextWhileDisabled: "Wait...",
  buttonTextAfterFirstClick: "...",
  CSSClassString: "",
  secondClickOnClickFunc: () => { console.log("OnClick function not defined!") },
  disabledTime: 1500,
};
