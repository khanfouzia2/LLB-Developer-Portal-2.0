import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './Tools.css';

/*
  Tools home page - PublicDisplayApp component
*/

class PublicDisplayApp extends Component {

render() {

return(
    <div>
        <div className="card">
            <div className="card-body">
                <div className="card-title"><h5>Guidelines</h5></div>
                <div className="card-text">The LLB Landing Page will include applications made by many different people with different design and development aesthetics. Therefore, it is important to follow the below guidelines.
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                            <Link className="btn btn-primary" role="button" to="/tools/designGuidelines">Design Guidelines</Link>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
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
                            <div className="col-sm-8 col-md-8 col-lg-8 col-xs-8">An example of an integrated weather forecast app</div>
                            <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4"><a href="https://llb.sis.uta.fi/#/public" role="button" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Public Display WebApp</a></div>
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

export default PublicDisplayApp;