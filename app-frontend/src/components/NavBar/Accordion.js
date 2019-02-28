import  React, {Component} from 'react'
import './Accordion.css'

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.handleOnAccordionClick = this.handleOnAccordionClick.bind(this);
    this.state = {
      accordionClass: "accordion",
      childContentStyle : null,
    }
  }
  handleOnAccordionClick = () => {
     this.setState((prevState) => {
        return {
          accordionClass: (prevState.accordionClass === "accordion") ? "accordion activate" : "accordion",
          childContentStyle: (prevState.childContentStyle == null) 
                             ? {maxHeight: this.childContent.clientHeight} 
                             : null
        }
     });     
  }
  render() {
    return(
      <React.Fragment>
        <div className={this.state.accordionClass} onClick={this.handleOnAccordionClick}>{this.props.header}</div>
          <div className="panel" style={this.state.childContentStyle}>
            <div ref={(elem) => this.childContent = elem} >
              {this.props.children}
            </div>
          </div>
      </React.Fragment>
    );    
  };
}

export default Accordion;