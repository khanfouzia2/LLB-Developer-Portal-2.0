import React, {Component} from 'react';
import SwaggerUi, {presets} from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import './APIPage.css'

class APIPage extends Component {
  componentDidMount() {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      // url: `http://petstore.swagger.io/v2/swagger.json`,
      url: this.props.URL,
      presets: [presets.apis],
    });
  }

  render() {
    return (
      <>
        <div className="jumbotron">
          <h1 className="display-4">API DOCUMENTATION</h1>
          <p className="lead">Here you will find information about different API we offer</p>         
        </div>
        <div className="App-custom-page-content" id="news">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
              <div class="card-header">
                REST API
              </div>               
                <div id="swaggerContainer" />
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="card">
              <div className="card-header">
                MQQT API
              </div>
                <div className="row">
                  <div className="col-md-5">
                    <div className="card api-card-content" >
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
                    <div className="card api-card-content" >
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
                <div className="alert alert-dark api-card-content">
                  i. Topic:
                  ii. mqtt sub -v -h llbbroker2.northeurope.cloudapp.azure.com:1883 -p 1883 -t 'fi/llb/bus/1612/location/'
                </div>
                <div className="alert alert-secondary api-card-content">
                  <pre><code>
                      "timestamp" :"2017-11-21T08:21:36.000Z",
                      "latitude":65.056339631,
                      "longitude":25.455822490,
                      "altitude":17.080000000,
                      "eps":0.630000000,
                      "epx":15.567000000,
                      "epv":39.790000000,
                      "ept":0.005000000,
                      "speed":0.191000000,
                      "climb":-0.089000000,
                      "track":0.120900000,
                      "mode":3.000000000
                    </code>
                  </pre>
                </div>                
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default APIPage;