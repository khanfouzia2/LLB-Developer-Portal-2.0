import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Misc/Modal.js';
import { Link } from "react-router-dom"
//import {  } from '../../rest-endpoints.js';
import * as config from '../../config.js'
const helpers = require('../../helpers.js');


class ThreadCompose extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div className="card border-success_ mb-5">
        <div className="card-body">

          <div className="mb-3">
            <h3>New Thread</h3>
          </div>

          <div className="form-group row">
            <div class="col-md-2">
              <label for="title" className="col-form-label">Title</label>
            </div>
            <div class="col-md-10">
              <input className="form-control" type="text" maxlength="1000" placeholder="Title" required/>
            </div>
          </div>{/* end of title row */}

          <div className="form-group row">
            <div class="col-md-12">
              <textarea className="form-control" style={{minHeight:50, maxHeight:1000}} rows="5" placeholder="Content" required>
              </textarea>
            </div>
          </div>

          {/* Bottom row, buttons */}
          <div className="form-group row mb-0">
            <div class="col-md-12">
              <div className="float-left">
                <button className="btn btn-outline-danger btn-sm">Cancel</button>
              </div>
              <div className="float-right">
                <button className="ml-2 btn btn-success btn-sm">Post</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

}
export default ThreadCompose;
