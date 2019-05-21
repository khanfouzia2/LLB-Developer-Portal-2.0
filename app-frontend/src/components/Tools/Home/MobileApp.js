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
       this.fileService.getFileForTools("reittiopas_fi_app.zip").then(response => {
           var filename = "reittiopas_fi_app.zip";
           saveAs(response.data, filename);
       }).catch(function (error) {
           if (error.response) {
               console.log('Error', error.response.status);
           } else {
               console.log('Error', error.message);
           }
       });
   }

    render() {
        return(

            <div className="guidelines-container">                
                <div className="card">
                    <div className="card-header">
                        <h5>Development Kit</h5>
                    </div>
                    <div className="card-body">
                        The development kit is used to create applications that can be deployed to the Living Lab Bus Platform through the LLB Developer Portal.<br/> <br/>
                        <a href="https://github.com/llb-uta/development-kit" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-block btn-outline-secondary">Get Development Kit</a>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h5>Guidelines</h5>
                    </div>
                    <div className="card-body">
                        The LLB Landing Page will include applications made by many different people with different design and development aesthetics. Therefore, it is important to follow the design guidelines.<br/><br/>
                        Developer guidelines will outline the basic usage of the Living Lab Bus (LLB) Developer Portal and the tools you can find inside.<br/> <br/>
                        Inspiration guidelines provide inspirational Bus Related Information Insights on Travel Experience and Passenger Needs<br/><br/>
                            <div className="row">
                                <div className="col-md-4">
                                    <Link className="btn btn-block btn-outline-secondary" role="button" to="/tools/designGuidelines">Design Guidelines</Link>
                                </div>
                                <div className="col-md-4">                               
                                    <Link className="btn btn-block btn-outline-secondary" role="button" to="/tools/developerGuidelines">Developer Guidelines</Link>
                                </div>
                                <div className="col-md-4">
                                    <Link className="btn btn-block btn-outline-secondary" role="button" to="/tools/inspirationGuidelines">Inspiration Guidelines</Link>
                                </div>
                            </div>                        
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h5>Example Applications</h5>                    
                    </div>
                    <div className="card-body">
                        <div className="example-app">
                            <div className="row">
                                <div className="col-md-12">
                                    <strong>Reittiopas.fi</strong> <a href="#" onClick={()=>this.downloadReittiopas()}>Download</a>
                                    <br/>
                                    A good example of integrating already made webapps into the system. Uses jQuery.
                                </div>
                            </div>                            
                        </div>
                        <div className="example-app">
                            <div className="row">
                                <div className="col-md-12">
                                    <strong>Weather App</strong> <a href="https://github.com/llb-uta/pessimist-weather">Download</a>
                                    <br/>
                                    A weather application , which uses AngularJS and Angular Material for layouts. It uses the LLB location API to get device location.
                                </div>
                            </div>                            
                        </div>
                        <div className="example-app">
                            <div className="row">
                                <div className="col-md-12">
                                    <strong>Quiz App</strong> <a href="https://github.com/llb-uta/interactive-quiz">Download</a>
                                    <br/>
                                    Example of quiz application which uses complicated animations and dialogs.
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h5>Extras</h5>
                    </div>
                    <div className="card-body">
                        <div className="extra-app">
                            <div className="row">
                                <div className="col-md-12">
                                    <strong>HSL Developer Community</strong> <a href ="https://dev.hsl.fi/">View</a>
                                    <br/>
                                    HSL Developer Community is open for all individuals and organisations interested in the Open Data and Open Source software regarding Helsinki Region Transport HSL or wider.
                                </div>
                            </div>                            
                        </div>
                        <div className="extra-app">
                            <div className="row">
                                <div className="col-md-12">
                                    <strong>Material design guidelines</strong> <a href ="https://material.io/design/">View</a>
                                    <br/>
                                    Create intuitive and beautiful products with Material Design.
                                </div>
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
        )

   }

}

export default MobileApp;