import React from 'react';
import PropTypes from 'prop-types';
/*

  Generic modal window (aka pop-up)

  Example usage:
  <Modal
    onCloseFunction={()=>this.closeModal()}
    closeButtonStyle="warning"
    closeButtonText="Close me!"
    isShown={this.state.showModal}
    title="Foo foo"
    content="This is content"
    extraButtons=[<button> ...] />

  Note that function closeModal() is defined in the calling parent Component.
  This function defines what will happen when 'clode' button is pressed.
  Typically sets its visibility to false:
    closeModal() {  this.setState({showModal: false});   }

  closeButtonStyle: One of the Bootstrap's colors ['primary','danger','info','success','warning', 'secondary', 'light', 'dark'].
  Defaults to 'primary'

*/

class Modal extends React.Component {

  constructor(props) {
    super(props);
  }




  render() {

    // The gray background
    const backdropStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(31, 72, 113, 0.7)',
        padding:50,
        zIndex:99,
      };

    // The modal "window"
    // vw / vh = view width/height (%)
    const modalStyle = {
        backgroundColor: '#fff',
        position: 'relative',
        display:'block',
        margin: '0 auto',
        borderRadius: 7,
        height: 'auto',
        width: '50vw',
        maxHeight: '95vh',
        zIndex:100,
        overflowY: 'auto',
      };

    const content = {
      padding: 20,
    }

    const contentAreaStyle = {
      fontSize: '0.9rem',
      position: 'relative',
      overflowY: 'scroll',
      minHeight: 50,
      maxHeight: '40%',
      wordWrap: 'break-text',
    };

    // Absolute. Forced to bottom
    const footerStyle = {
      position: 'relative',
      display: 'block',
      width: '100%',
      borderTop: '1px solid #ccc',
      backgroundColor: 'rgba(240, 240, 240, 1.0)',
      padding: 20,
    }

    // if show=false, do not show!
    if(!this.props.isShown) {
      return(null);
    }

    // If there is some text content to be shown. Otherwise only print title
    let content_;
    if(this.props.content) {
      content_ = <div className="" style={contentAreaStyle}><p>{this.props.content}</p></div>
    } else {
      content_ = null;
    }

    return (


        <div className="backdrop" style={backdropStyle}>
          <div className="modal" style={modalStyle}>
            <div id="modal-content-container" style={content}>
              <h3>{this.props.title}</h3>
              {content_}
            </div>

            <div className="footer" style={footerStyle}>
              <div className="float-right">
                {/* Primary button. Always on right side */}
                { this.renderExtraButtons() }
                <button onClick={()=>this.props.onCloseFunction()} className={`btn ml-3 btn-${this.props.closeButtonStyle}`}>
                  <strong>{this.props.closeButtonText}</strong>
                </button>
              </div>
              <div style={{clear:'both'}}></div>
            </div>

          </div>
        </div>
      );

    } // render


    renderExtraButtons() {
      const items = []
      if(this.props.extraButtons.lenght == 0) { return(null); }
      this.props.extraButtons.map(btn => {
        //items.push(btn)
          items.push(
            <div className="mr-1" style={{display:'inline-block'}}>
              {btn}
            </div>
          );
      })
      return items;
    }


}
export default Modal;

Modal.propTypes = {
  onCloseFunction: PropTypes.func, /* should be renamed as primary button function */
  closeButtonText: PropTypes.string,
  closeButtonStyle: PropTypes.oneOf(['primary','danger','info','success','warning', 'secondary', 'light', 'dark']),
  isShown: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  extraButtons: PropTypes.array,
};
// Specifies the default values for props:
Modal.defaultProps = {
  closeButtonText: 'Close',
  closeButtonStyle: 'primary',
  isShown: true,
  extraButtons: []
};
