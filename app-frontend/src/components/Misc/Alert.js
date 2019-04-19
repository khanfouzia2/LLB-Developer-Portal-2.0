import React from 'react';
import PropTypes from 'prop-types';
/*



*/

class Alert extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {

      // if show=false, do not show!
      if(!this.props.isShown) {
        return(null);
      }

      return (
        <div class={`alert-${this.props.style} alert`}>
            {this.props.content}
          </div>
        );

  } // render

  componentDidMount() {
  }


}
export default Alert;

Alert.propTypes = {
  style: PropTypes.string,
  isShown: PropTypes.bool,
  content: PropTypes.string
};
// Specifies the default values for props:
Alert.defaultProps = {
  style: "info",
  isShown: false,
  content: ""
};
