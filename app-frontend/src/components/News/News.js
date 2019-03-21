import React, {Component} from 'react';
import { NEWS_GET_ONE } from '../../rest-endpoints.js';
/*

  Component for viewing one News

  Route: <>/news/:id


*/


class News extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newsObj: {} // empty obj.
    }
  }



  render() {
    console.log("Render");
    return(<> NEWS! ### Under constructor ### </>);
  }



  componentWillMount() {
    let id = parseInt(this.props.match.params.id, 10);
    if(isNaN(id) || id <= 0) {
      // error
    }
    console.log( 'News Comp. will mount. ID: '+ id );

    fetch(NEWS_GET_ONE+'/'+id, {}).then(data => {
      return data.json();
    }).then( data => {
      console.log(data);
    }).catch(err => {

    });
  }

  /*
    When component receives new props.
    Usually when route changes -> change the content
  */
  componentWillReveiceProps(newProps) {
    console.log('newprops: ' + newProps);

  }


}
export default News;
