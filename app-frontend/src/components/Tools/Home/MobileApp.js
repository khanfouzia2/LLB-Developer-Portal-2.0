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
            <div className="row no-gutters">
                <div class="card-group no-gutters rounded">
                    <div className="card col-sm-4 col-md-4 col-lg-4 col-xs-4">
                        <div className="card border-dark">
                            <div className="card-body">
                                <div className="card-title"><h5>Development Kit</h5></div>
                                <div className="card">
                                    <div className="card-body">
                                        The development kit is used to create applications that can be deployed to the Living Lab Bus Platform through the LLB Developer Portal.
                                        <a href="https://github.com/llb-uta/development-kit" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-block btn-secondary">Get Development Kit</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-dark">
                            <div className="card-body">
                                <h5 className="card-title">Extras</h5>
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-text">HSL Developer Community is open for all individuals and organisations interested in the Open Data and Open Source software regarding Helsinki Region Transport HSL or wider.</p>
                                        <a href="https://dev.hsl.fi/" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-block btn-secondary">Travel related APIs and Applications by HSL</a>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                    <p className="card-text">Create intuitive and beautiful products with Material Design.</p>
                                        <a href="https://material.io/design/" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-block btn-secondary">Material design guidelines</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card border-dark col-sm-4 col-md-4 col-lg-4 col-xs-4 rounded">
                        <div className="card-body">
                            <div className="card-title"><h5>Guidelines</h5></div>
                            <div className="card">
                                <div className="card-body">
                                    The LLB Landing Page will include applications made by many different people with different design and development aesthetics. Therefore, it is important to follow the design guidelines.<br></br>
                                    <Link className="btn btn-block btn-secondary" role="button" to="/tools/designGuidelines">Design Guidelines</Link>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    Developer guidelines will outline the basic usage of the Living Lab Bus (LLB) Developer Portal and the tools you can find inside.<br></br>
                                    <Link className="btn btn-block btn-secondary" role="button" to="/tools/developerGuidelines">Developer Guidelines</Link>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    Inspiration guidelines provide inspirational Bus Related Information Insights on Travel Experience and Passenger Needs<br></br>
                                    <Link className="btn btn-block btn-secondary" role="button" to="/tools/inspirationGuidelines">Inspiration Guidelines</Link>
                                </div>
                            </div>
                        </div>
                    </div>
            
                
                    <div className="card border-dark col-sm-4 col-md-4 col-lg-4 col-xs-4 rounded">
                        <div className="card-body">
                            <div className="card-title"><h5>Example Applications</h5></div>
                            <div className="card-text">
                                <div className="card">
                                    <div className="card-body">
                                        A good example of integrating already made webapps into the system. Uses jQuery.<br></br>
                                        <button className="btn btn-block btn-secondary" onClick={()=>this.downloadReittiopas()}>Reittiopas.fi Example</button>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        A weather application , which uses AngularJS and Angular Material for layouts. It uses the LLB location API to get device location.<br></br>
                                        <a href="https://github.com/llb-uta/pessimist-weather" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-block btn-secondary">Pessimist Weather Example</a>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        example of quiz application which uses complicated animations and dialogs.<br></br>
                                        <a href="https://github.com/llb-uta/interactive-quiz" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-block btn-secondary">Quiz App Example</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default MobileApp;