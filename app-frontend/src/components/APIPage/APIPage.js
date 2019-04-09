import React, {Component} from 'react';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import './APIPage.css'
import Context from '../../context/auth-context';

class APIPage extends Component {
  static contextType = Context;

  renderContain = () => {
    const { isAuth } = this.context;
   
    if(isAuth) {
      return(
        <>
        <div className="jumbotron">
          <h1 className="display-4">API DOCUMENTATION</h1>
          <p className="lead">Here you will find information about different API we offer. Currently LLB is offering the 3 following APIs:</p>
          <ul>
            <li>REST API</li>
            <li>MQQT API</li>
            <li>BLOB API</li>
          </ul>
          <a target="_blank" rel="noopener noreferrer" href={process.env.PUBLIC_URL + 'document/LLB Instructions-JUNCTION.pdf'}>Click here for the full API documentation (21 pages)</a>         
        </div>
        <div className="App-custom-page-content">
          <div className="" id="tools">
              <ul className="nav nav-tabs" id="toolsTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#restapi" role="tab" aria-controls="mobileApp" aria-selected="true">REST API</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#mqqtapi" role="tab" aria-controls="publicDisplayApp" aria-selected="false">MQQT API</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#blobapi" role="tab" aria-controls="publicDisplayApp" aria-selected="false">BLOB API</a>
                </li>
              </ul>
              
              <div className="tab-content">
                <div className="tab-pane active" id="restapi" role="tabpanel" aria-labelledby="mobileApp-tab">
                <div className="card">
                  <div class="card-header">
                    REST API
                  </div>
                  <div className="alert alert-primary api-card-content">
                  <a href="/apikey"> If you haven't created your own API key. Click here to generate one !</a> 
                  </div>              
                    <SwaggerUI url={this.props.URL} />
                  </div>
                </div>
                <div className="tab-pane" id="mqqtapi" role="tabpanel" aria-labelledby="publicDisplayApp-tab">
                <div className="card">
              <div className="card-header">
                MQQT API
              </div>
              <div className="api-card-content">
                <div className="row ">
                    <div className="col-md-5">
                      <div className="card " >
                          <div className="card-header">
                            Broker URL
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">Username: llb</li>
                            <li className="list-group-item">Password: livinglabbus2017</li>
                          </ul>
                      </div>
                    </div>
                    <div className="col-md-7">
                    <div className="card " >
                          <div className="card-header">
                            MQTT topic format
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>fi/llb/vehicle_type/id/data_type</strong></li>
                            <li className="list-group-item">1. <strong>vehicle_type: </strong>one of bus, rail, subway, tram, ferry (currently only bus)</li>
                            <li className="list-group-item">2. <strong>id:</strong> unique id of the vehicle (currently operational are 1612, 3008, 3009)</li>
                            <li className="list-group-item">3. <strong>data_type:</strong> one of location, position, sensor, can</li>
                          </ul>
                    </div>
                  </div>
                </div>    
                <h5>Example Request:</h5>
                <div className="alert alert-dark">
                  <div>i. Topic:</div>
                  <div>ii. mqtt sub -v -h llbbroker2.northeurope.cloudapp.azure.com:1883 -p 1883 -t 'fi/llb/bus/1612/location/'</div>
                </div>
                <h5>Example Response:</h5>
                <div className="alert alert-secondary">
                  <pre><code>
                      <div>&#123;</div>
                      <div>"timestamp" :"2017-11-21T08:21:36.000Z",</div>
                      <div>"latitude":65.056339631,</div>
                      <div>"longitude":25.455822490,</div>
                      <div>"altitude":17.080000000,</div>
                      <div>"eps":0.630000000,</div>
                      <div>"epx":15.567000000,</div>
                      <div>"epv":39.790000000,</div>
                      <div>"ept":0.005000000,</div>
                      <div>"speed":0.191000000,</div>
                      <div>"climb":-0.089000000,</div>
                      <div>"track":0.120900000,</div>
                      <div>mode":3.000000000</div>
                      <div>&#125; </div>
                    </code>
                  </pre>
                </div>                    
              </div>             
              </div>
                </div>
                <div className="tab-pane" id="blobapi" role="tabpanel" aria-labelledby="publicDisplayApp-tab">
                <div className="card">
                <div className="card-header">
                  BLOB DATA API
                </div>
                <div className="api-card-content">
                  <p>LLB provides an open access to raw data blobs where all the sensor data received
                    from the vehicles (or bus stops) are stored. All vehicle sources (sensors, GPS, etc.) send a
                    message once per second, and the message is stored to blob files in JSON format. The blobs
                    contain data for one day. Developers can download the data that is relevant to them based
                    on mode of transport (currently only busses), bus id, data type (location, position, sensors,
                    can, etc.) and date.
                  </p>
  
                  <div className="card " >
                          <div className="card-header">
                            Blob API Info
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>URL:</strong> https://llb.blob.core.windows.net/<strong><i>DATATYPE-BUSID/DATATYPE-BUSID-DATE</i></strong></li>
                            <li className="list-group-item"><strong><i>DATATYPE:</i></strong> Can, sensor, location, position (see usage examples in the end)</li>
                            <li className="list-group-item"><strong><i>BUSID:</i></strong> Unique id of the bus (4 digits)</li>
                            <li className="list-group-item"><strong><i>DATE:</i></strong> YYYY_MM_DD</li>
                            <li className="list-group-item"><strong>Example:</strong> <a href="https://llb.blob.core.windows.net/can-1612/can-1612-2017_08_31">https://llb.blob.core.windows.net/can-1612/can-1612-2017_08_31</a></li>
                          </ul>
                  </div>
                </div>
              </div>
                </div>
              </div>

            </div>
        </div>
      </>
      );
    }
    else {
      return <></>
    }
  }

  render = () => this.renderContain()
}

export default APIPage;