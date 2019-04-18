import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Misc/Modal.js';
//import {  } from '../../rest-endpoints.js';
import { Link } from "react-router-dom"
import * as config from '../../config.js'
const helpers = require('../../helpers.js');

/*

  Component for Forum Thread's small info box that
  shows title, author name, datetime, answer count ...

  Props:
    threadObj: Thread: {id, title, content, authorObj, created_at}

  @Author: okkop

  UNDER CONSTRUCTION - everything you see here might be changed in the future

*/
class ForumThreadInfoBox extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    const hStyle = {fontWeight: 600, fontSize:'1.2em',wordWrap:'text-break',};
    const authorNameStyle = { display:'inline', fontSize:'0.8em', fontWeight:600, };
    const metadataStyle = { display:'inline-block', marginRight:'1em', fontSize:'0.8em', color:'#aaaaaa', };
    const contentStyle = { marginTop:'0.5em', fontStyle:'italic', fontSize:'0.9em', wordWrap:'text-break', padding:'0.5em', marginLeft:'1em', backgroundColor:'#f7f7f7',};
    //const metadataBox = { borderTop:'1px solid #eee' }

    return(
      <div className="card mt-2 _mt-md-2 _mt-sm-2">
        <div className="card-body">
          <span className="" style={hStyle}>
            <Link to= {`/forum/thread/${this.props.threadObj.id}`}>{this.props.threadObj.title} </Link>
          </span>
          <br/>
          <Link id="author" className="" to={`/${this.props.threadObj.user.id}`} style={authorNameStyle}> { helpers.getAuthorDetails(this.props.threadObj.user) } </Link>
          <span className="" title={`ID: ${this.props.threadObj.id}`} style={metadataStyle}>{ helpers.getDateFormatted(this.props.threadObj.created_at) }</span>
          <p style={contentStyle}>{ helpers.niceSubstr(this.props.threadObj.content, 400) }</p>

        </div>
      </div>
    )

  }

}

ForumThreadInfoBox.propTypes = {
  threadObj: PropTypes.object
}

export default ForumThreadInfoBox;
