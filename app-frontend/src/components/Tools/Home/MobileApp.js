import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './Tools.css';
import { FileService } from '../../../services/FileService.js';
import { saveAs } from 'file-saver';

/*
  Tools home page - MobileApp component
*/

class MobileApp extends Component {

    constructor() {
        super();
        this.fileService = new FileService();
    }

   downloadReittiopas = () => {
       this.fileService.getFileForTools("reittiopas_fi_app.zip").then((response) => {
           var filename = "reittiopas_fi_app.zip";
           saveAs(response.data, filename);
       }).catch(function (error) {
           if (error.response) {
               console.log('Error', error.response.status);
           } else {
               console.log('Error', error.message);
           }
       });
   };

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
                                <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4"><button className="btn btn-primary" onClick={()=>this.downloadReittiopas()}>Reittiopas.fi Example</button></div>
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
                    <p className="card-text"></p>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                            <a href="https://dev.hsl.fi/" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Travel related APIs and Applications by HSL</a>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                            <a href="https://material.io/design/" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Material design guidelines</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default MobileApp;