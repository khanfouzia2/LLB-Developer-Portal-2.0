import React, {Component} from 'react';
import { Link } from "react-router-dom"
import AuthContext from "../../context/auth-context";
import  * as config from '../../config.js'
import './NewCard.css';
const helpers = require('../../helpers.js');


/*
  Compoenent for one News Card
*/
class NewsCard extends Component {
    static contextType = AuthContext;
    // props has a news-object
    constructor(props) {
      super(props);
    }

    render() {

      return(
        <div news-id={this.props.newsObj.id}>
            <div className="card news-card">
                {/* <img className="card-img-top img-responsive" src={'https://llb.sis.uta.fi/portal/img/LLB_Linkker.png'}  alt="Card image cap"/>  */}
                <div className="card-header card-background-header">
                  <div className="grey-filter">
                    <h3 className="card-title title-text-shadow">{this.props.newsObj.title}</h3>
                    <i>By {this.getAuthorFullName()} / <span title="Published">{helpers.getDateFormatted(this.props.newsObj.created_at)} </span></i>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {this.getContent()}
                    <br/>
                    <Link className="link" to={`/news/id/${this.props.newsObj.id}`}>
                      Read more...
                    </Link>
                  </p>

                </div>
                <React.Fragment> { this.renderAdminToolsFooter() } </React.Fragment>
            </div>
        </div>
      );
    }


    renderAdminToolsFooter() {
      const {isAuth, role} = this.context;
      if(isAuth && role === config.ADMIN_ROLE_NAME) {
        return(
          <div className="card-footer">
            <small><Link to={`/news/compose?edit_id=${this.props.newsObj.id}`}>Edit</Link></small>
          </div>
        )
      }
      else {
        return <></>
      }
    }

    getAuthorFullName() {
      return `${this.props.newsObj.user.first_name} ${this.props.newsObj.user.last_name}`;
    }

    /*
      Strip content if too long
    */
    getContent() {
      try {
        var content = this.props.newsObj.content;
      }
      catch(err) {
        console.log(err);
        return config.TEXT_IF_POST_EMPTY
      }
      if(content.length == 0 || content==null) {
        return config.TEXT_IF_POST_EMPTY
      }

      return content.length >= config.NEWS_SHOWN_CHARS ? content.substr(0, config.NEWS_SHOWN_CHARS-3) + "..." : content;
    }



}

export default NewsCard;
