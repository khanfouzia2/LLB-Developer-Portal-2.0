import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './Tools.css';
import { FileService } from '../../../services/FileService.js';
import { saveAs } from 'file-saver';

/*
  Tools home page - PublicDisplayApp component
*/

class PublicDisplayApp extends Component {

    render() {
        return(

            <div className="guidelines-container">                
                
                <div className="card">
                    <div className="card-header">
                        <h5>Guidelines</h5>
                    </div>
                    <div className="card-body">
                        The LLB Landing Page will include applications made by many different people with different design and development aesthetics. Therefore, it is important to follow the design guidelines.<br/><br/>
                        Inspiration guidelines provide inspirational Bus Related Information Insights on Travel Experience and Passenger Needs<br/><br/>
                            <div className="row">
                                <div className="col-md-6">
                                    <Link className="btn btn-block btn-outline-secondary" role="button" to="/tools/designGuidelines">Design Guidelines</Link>
                                </div>
                                <div className="col-md-6">
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
                                    <strong>Public Display WebApp</strong> <a href ="https://llb.sis.uta.fi/#/public">View</a>
                                    <br/>
                                    An example of an integrated weather forecast app.
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
export default PublicDisplayApp;