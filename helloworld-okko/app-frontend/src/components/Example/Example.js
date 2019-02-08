import React, {Component} from 'react';

class Example extends React.Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
        serverResponse: {
            message: null,
            imgUrl: null
        }
    }
    
  }
  
  render() {
    return (<div >
        <h1>{this.state.serverResponse.message}</h1>
        <img src={this.state.serverResponse.imgUrl} />
      </div>
    );
  }
  
  
    componentWillMount() {
        
        console.log("Component will mount...");
        fetch('http://localhost:8080/hello.json').then(function(res) {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({serverResponse: data});
        });
      
  }
  
  
}

export default Example;