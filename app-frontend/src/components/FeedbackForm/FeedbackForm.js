import React, { Component } from 'react';
import { FEEDBACK_TITLE_MAXLEN } from '../../config.js';




class FeedbackForm extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          title: ""    
        }
    
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnClickSend = this.handleOnClickSend.bind(this);
    }




  render() {






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
                    <div className="form-group col-md-3">
                      <label for="username">Title</label>
                    </div>
                    <div className="col-md-9">
                      <input type="text" className="form-control" onChange={(e)=>this.handleInputChange(e)} name="title" placeholder="Title" maxLength={FEEDBACK_TITLE_MAXLEN}/>
                      <span className="metatext">{this.state.title.length} / {FEEDBACK_TITLE_MAXLEN} </span>
                    </div>
                    
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                    
                      <textarea id="message" name="description" className="form-control" onChange={(e)=>this.handleInputChange(e)}  placeholder="Your feedback" rows="7"></textarea>
                    
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

    //var req = new Request('http://localhost:8080/news/', options);
    var req = new Request('http://localhost:8080/news/page/1');

    // Call backend
    var pr = fetch(req).then(res => {
      console.log(res)
      
       if(res.ok) {
         return res.json() 
       } else {
          alert(res.statusText)
       }

    }).then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
    

  


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
