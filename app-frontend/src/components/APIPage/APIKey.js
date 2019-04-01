import React, {Component} from 'react';
import { AuthConsumer } from '../../context/authContext';
import { GenerateAPIKey, GetAPIKey } from '../../services/UserApi';

class APIKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIKey : { }
    }
    this.renderGenerateButton = this.renderGenerateButton.bind(this);
    this.handleGenerateKey = this.handleGenerateKey.bind(this);
    this.renderAPIkeyDetail = this.renderAPIkeyDetail.bind(this);
  }
  handleGenerateKey = async () => {
      let result = await GenerateAPIKey();
      if(result.status === 200) {
        this.setState({APIKey: result.data});
      }
  }
  
  componentDidMount = async () => {
    let result = await GetAPIKey();
    if(result.status === 200) {
      this.setState({APIKey: result.data});
    }
  }

  renderAPIkeyDetail = () => {
    if(this.state.APIKey !== null){
     return(
       <>
          <td>{this.state.APIKey.service_name}</td>
          <td>{this.state.APIKey.api_key}</td>
          <td>{this.state.APIKey.created_at}</td>
       </>
     );
    }
    else {
      return <></>
    }
  }
  renderGenerateButton = () => {
    console.log(this.state.APIKey)

    if(this.state.APIKey === null) {
      return (
        <>
          <button onClick={this.handleGenerateKey} className="btn btn-lg btn-primary">Generate your API key</button>
          <br></br>
          <br></br>
        </>
      );
    }
    else {
      return <></>
    }
  }
  renderContain(userInfo){
    if(userInfo.isAuth){
       return(
          <>
            <nav className="App-custom-nav">
              <span className="navbar-brand mb-0 h1">API KEY</span>
            </nav>
            <div className="App-custom-page-content">
              <div className="card">
                  <div className="api-card-content">
                    <p>To access the data api, you need a key which you can genererate from this page.The base API URL is &nbsp;&nbsp; 
                      <span className="alert alert-secondary">https://llb.cloud.tyk.io/llb-bus-api/</span>
                    </p>
                    <a href="/api">Read more about how to use an API here</a>
                    <br></br><br></br>
                    <h5>Example Request:</h5>
                    <div className="alert alert-secondary">
                      <pre><code>
                          <div>GET</div>
                          <div>https://llb.cloud.tyk.io/llb-bus-api/GetData?busId=&#60;bus-id-here &#62;</div>
                          <div>Header - Authorization: Bearer</div>
                          <div>"The key has to be added in the format “Bearer &#60; your-API-key-here &#62;"</div>
                        </code>
                      </pre>
                    </div>                    
                  </div>             
              </div>
              <br></br>

              <div className="card">
                  <div className="api-card-content"> 
                    {this.renderGenerateButton()}
                    <table className="table">
                      <thead className="thead-light">
                        <tr>
                          <th>API Service Name</th>
                          <th>API Key</th>
                          <th>Generated At</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        {this.renderAPIkeyDetail()}
                        </tr>
                      </tbody>     
                    </table>       
                  </div>             
              </div>
            </div>
          </>
       )
    }
    else {
      return <></>
    }
  }

  render() {
    return (
      <AuthConsumer>
        { ({userInfo}) => (
            <>
              {this.renderContain(userInfo)}
           </>
        )}
      </AuthConsumer>
    );
  }
}

export default APIKey;