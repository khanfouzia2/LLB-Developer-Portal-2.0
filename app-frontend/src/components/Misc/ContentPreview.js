import React from 'react';
import PropTypes from 'prop-types';
import '../../styles.css';
const helpers = require('../../helpers.js');

/*

  Preview box for text content

  Author: OP

*/
class ContentPreview extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {
    return(
      <div className="">
        <div className="content-preview-box" dangerouslySetInnerHTML={helpers.getSanitizedContent(this.props.content)}></div>
      </div>
    );
  }



}
export default ContentPreview;

ContentPreview.propTypes = {
  content: PropTypes.string
};

// Specifies the default values for props:
ContentPreview.defaultProps = {
  content: ""
};
