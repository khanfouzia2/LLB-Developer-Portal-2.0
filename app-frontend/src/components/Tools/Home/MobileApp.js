import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './Tools.css';
import * as endpoints from '../../../rest-endpoints.js';
import { saveAs } from 'file-saver';

/*
  Tools home page - MobileApp component
*/

class MobileApp extends Component {

    downloadReittiopas() {

        console.log("News component will mount ")
    
        /* Get posts */
    
        fetch(endpoints.TOOLS_GET+"/download/reittiopas_fi_app.zip").then(res => {
            console.log(res.data + "I am here");
            saveAs(res.data, "reittiopas_fi_app.zip");
        }).then(res => {
          console.log( res )
    
        }).catch(err => {
            console.log("GET failed");
          throw new Error(err);
        });
      }

  render() {

    return(
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="card-title"><h5>Development Kit</h5></div>
                    <div className="card-text">The development kit is used to create applications that can be deployed to the Living Lab Bus Platform through the LLB Developer Portal.
                        <div className="text-center"><a href="https://github.com/llb-uta/development-kit" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get Development Kit</a></div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="card-title"><h5>Guidelines</h5></div>
                    <div className="card-text">The LLB Landing Page will include applications made by many different people with different design and development aesthetics. Therefore, it is important to follow the below guidelines.
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                                <Link className="btn btn-primary" role="button" to="/tools/designGuidelines">Design Guidelines</Link>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                                <Link className="btn btn-primary" role="button" to="/tools/developerGuidelines">Developer Guidelines</Link>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                                <Link className="btn btn-primary" role="button" to="/tools/inspirationGuidelines">Inspiration Guidelines</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="card-title"><h5>Example Applications</h5></div>
                    <div className="card-text">
                        <div className="card">
                            <div className="card-body">
                            <div className="row">
                                <div className="col-sm-8 col-md-8 col-lg-8 col-xs-8">A good example of integrating already made webapps into the system. Uses jQuery.</div>
                                <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4"><button className="btn btn-primary" onClick={()=>this.downloadReittiopas()} target="_blank" rel="noopener noreferrer">Reittiopas.fi Example</button></div>
                            </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                            <div className="row">
                                <div className="col-sm-8 col-md-8 col-lg-8 col-xs-8">A weather application , which uses AngularJS and Angular Material for layouts. It uses the LLB location API to get device location.</div>
                                <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4"><a href="https://github.com/llb-uta/pessimist-weather" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Pessimist Weather Example</a></div>
                            </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                            <div className="row">
                                <div className="col-sm-8 col-md-8 col-lg-8 col-xs-8">example of quiz application which uses complicated animations and dialogs.</div>
                                <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4"><a href="https://github.com/llb-uta/interactive-quiz" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Quiz App Example</a></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Extras</h5>
                    <p className="card-text">The development kit is used to create applications that can be deployed to the Living Lab Bus Platform through the LLB Developer Portal.</p>
                    <a href="https://github.com/llb-uta/development-kit" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-primary ">Get Development Kit</a>
                </div>
            </div>
        </div>
    );
  }
}

export default MobileApp;