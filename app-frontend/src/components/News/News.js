import React, {Component} from 'react';
import Modal from '../Misc/Modal.js';
import { NEWS_GET_ONE } from '../../rest-endpoints.js';
import { Link } from "react-router-dom"
import * as config from '../../config.js'
const helpers = require('../../helpers.js');


/*

  Component for viewing one News

  Route: <>/news/:id


*/


class News extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newsObj: {},
      authorObj: {

      },
      showModal: false
    }

    //
    this.closeModal = this.closeModal.bind(this);
  }



  render() {
    console.log("Render");

    const newsContStyle = {
      wordWrap: 'break-word'
    }

    const background = {
      backgroundImage: 'url(/img/LLB_Bus.png)',
      height: '100%',
      width: '100%',
      opacity:'0.95',
      backgroundColor: 'rgba(233,233,233, 0.6)', /* Used if the image is unavailable */
      position: 'absolute',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    return(
      <div className="App-custom-page-content" style={background}>
          { this.renderNotVisibleAlert() }
          <div clasName="card" id="news-card" data-id={`news-${this.state.newsObj.id}`} title={`ID: ${this.state.newsObj.id}`} >
            <div class="card-body">
              <div className="mb-3"><strong><Link to='/news/'>Go back</Link></strong></div>
              <h2>{this.state.newsObj.title}</h2>
              <span className="" id="author" >Author: { helpers.getAuthorDetails(this.state.authorObj) }</span><br/>
              <span className="em small muted" id="author" >First published: { helpers.getDateFormatted(this.state.newsObj.created_at) }</span>
              <hr/>

              <div className="" dangerouslySetInnerHTML={helpers.getSanitizedContent(this.state.newsObj.content)}></div>
            </div>
          </div>

          {/* Modal component. Hidden by default */}
          <Modal onCloseFunction={()=>this.closeModal()} closeButtonStyle="warning" closeButtonText="Close me!" isShown={this.state.showModal} title="Foo foo" content="This is content" />
      </div>
    );
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }



  componentDidMount() {
    let id = this.props.match.params.id;
    if(!helpers.isValidID(id)) {
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
          is_visible: data.is_visible,
          created_at: data.created_at,
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

  /*
    If News's visibility is hidden, render this alert
  */
  renderNotVisibleAlert() {
    if(!this.state.newsObj.is_visible) {
      return(
        <div className="alert alert-info">This news is not public. <Link to={`/news/compose?edit_id=${this.state.newsObj.id}`}>You can change it here.</Link></div>
      )
    } else {
      return(null);
    }
  }


}
export default News;
