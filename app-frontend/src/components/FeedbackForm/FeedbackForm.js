import React, { Component } from 'react';
import { FEEDBACK_TITLE_MAXLEN } from '../../config.js';
import {FEEDBACK_POST} from '../../rest-endpoints.js';
import Alert from '../Misc/Alert.js';
import Context from '../../context/auth-context';

class FeedbackForm extends Component {


    static contextType = Context;

    constructor(props) {
        super(props);
    
        this.state = {
          title: "",    
          description: "",
          alert: {
            content: "",
            isShown: false,
            style: null,
          }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnClickSend = this.handleOnClickSend.bind(this);
    }

  render() {
    const { isAuth } = this.context;
    if(!isAuth) {
      return(null);
    }
    return (
     
      <React.Fragment>

      <div className="App-custom-nav">
          <h2>Give feedback</h2>
        </div>
      <div className="App-custom-page-content">          
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center">Feedback</h1>
              <p className="text-center">Your feedback matters</p>              
              <div className="container mt-5">
                <div className="row">
                  <div className="col-12">
                    <Alert isShown={this.state.alert.isShown} style={this.state.alert.style} content={this.state.alert.content} />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-3">
                    <label for="username">Title</label>
                  </div>
                  <div className="col-md-9">
                    <input type="text" value={this.state.title} className="form-control" onChange={(e)=>this.handleInputChange(e)} name="title" placeholder="Title" maxlength={FEEDBACK_TITLE_MAXLEN}/>
                    <span className="metatext float-right">{this.state.title.length} / {FEEDBACK_TITLE_MAXLEN} </span>
                  </div>                    
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <textarea value={this.state.description} id="message" name="description" className="form-control" onChange={(e)=>this.handleInputChange(e)}  placeholder="Your feedback" rows="7">
                    </textarea>                   
                  </div>                  
                </div>                  
                <div className="row">
                  <div className="col-md-9">
                  </div>
                  <div className="col-md-3">
                    <button type="submit" onClick={(e)=>this.handleOnClickSend(e)} className="btn btn-primary float-right">Send</button>  
                  </div>
                </div>                   
              </div>
            </div>{/* Card end */}
          </div>  
        </div>            
      </div>  
    </React.Fragment>
    );
  }

  handleOnClickSend(e) {

    console.log("User clicked send!")
    
    // Disable btn for a moment
    e.target.disabled = true;
    setInterval((btn) => { btn.disabled=false }, 5000, e.target);

    const title = this.state.title;
    const description = this.state.description;

    var heds = new Headers();
    heds.append('content-type', 'application/json');

    const options = {
      method: 'POST',
      headers: heds,
      body: JSON.stringify({title: title, description: description}),
      credentials: "include"
    }

    //TESTING BACKEND
    var req = new Request(FEEDBACK_POST);

    // Call backend
    var pr = fetch(req, options);
    pr.then(res => {
      console.log(res)
      
       if(res.ok) {
         return res.json() 
       } else {
        this.setState({ alert: { content: "Invalid content!", isShown: true, style: "warning"}});
        throw new Error() //exit from callback
       }

    }).then(data => {
      console.log(data)

      // Show alert
      this.setState({
        alert: {
          content: "Feedback sent succesfully!",
          isShown: true,
          style: "success"
        }
      })

      // Wipe form values
      this.setState({
        title: "",
        description: ""
      });
      
      
    }, (err)=>{ console.log(alert)(err) }).catch(err => {
      this.setState({ alert: { content: "Something went wrong!", isShown: true, style: "warning" }});
      console.log(err)
    });
  }



  /* Generic method for changing form-values */
  handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
          [name]: value
      });
  }




}

export default FeedbackForm;