import React, {Component} from 'react';
import { NEWS_GET_ONE } from '../../rest-endpoints.js';
import * as config from '../../config.js'
/*

  Component for viewing one News

  Route: <>/news/:id


*/


class News extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newsObj: {
        title: "",
        content: ""
      },
      authorObj: {

      }
    }
  }



  render() {
    console.log("Render");

    const newsContStyle = {
      wordWrap: 'break-word'
    }

    return(
      <div className="App-custom-page-content">

          <div clasName="card" id={`news-${this.state.newsObj.id}`} title={`ID: ${this.state.newsObj.id}`} >
            <div class="card-body">
              <h2>{this.state.newsObj.title}</h2>
              <span className="" id="author" >Author: { this.getAuthorDetails() }</span><br/>
              <span className="em small muted" id="author" >First published: { this.getDateFormatted() }</span>
              <hr/>

              <p className="" style={newsContStyle}>{this.state.newsObj.content}</p>
            </div>
          </div>
      </div>
    );
  }



  componentDidMount() {
    let id = parseInt(this.props.match.params.id, 10);
    if(isNaN(id) || id <= 0) {
      console.log("ID seems to be invalid!");
      this.props.history.push('/news/page/1');
    }
    console.log( 'News Comp. will mount. ID: '+ id );

    fetch(NEWS_GET_ONE+'/'+id, {}).then(data => {
      return data.json();
    }).then( data => {
      console.log(data);
      this.setState({
        newsObj: {
          id: data.id,
          title: data.title,
          content: data.content,
          created_at: data.created_at
        },
        authorObj: data.user
      });
    }).catch(err => {
      console.log("News object was not retrieved successfully.");
      this.props.history.push('/news/page/1');
    });
  }

  /*
    When component receives new props.
    Usually when route changes -> change the content
  */
  componentWillReveiceProps(newProps) {
    console.log('newprops: ' + newProps);

  }


  getAuthorDetails() {
    if(!this.state.authorObj.first_name || !this.state.authorObj.last_name) {
      return "Unknown";
    } else {
      return this.state.authorObj.first_name +" " + this.state.authorObj.last_name;
    }
  }

  getDateFormatted() {
    try {
      var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour:"numeric", minute:"numeric" };
      var ts = new Date(this.state.newsObj.created_at);
      return ts.toLocaleDateString(config.DEFAULT_LOCALE, options);
    } catch(err) {
      return null;
    }
  }

}
export default News;
