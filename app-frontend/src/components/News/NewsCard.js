import React, {Component} from 'react';
import { Link } from "react-router-dom"
import { AuthConsumer } from '../../context/authContext';
import  * as config from '../../config.js'
import './NewCard.css';

class NewsCard extends Component {

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
                    <i>By {this.getAuthorFullName()} / <span title="Published">{this.getDateFormatted()} </span></i>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {this.getContent()}
                    <hr/>
                    <Link to={`/news/id/${this.props.newsObj.id}`}>Read more...</Link>
                  </p>

                </div>
                <AuthConsumer>
                  { ({userInfo}) => (<React.Fragment> { this.renderAdminToolsFooter(userInfo) } </React.Fragment>) }
                </AuthConsumer>

            </div>
        </div>
      );
    }


    renderAdminToolsFooter(userInfo) {
      return(
        <div className="card-footer">
          <Link to={`/news/compose?edit_id=${this.props.newsObj.id}`}>Edit</Link>
        </div>
      )
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

    getDateFormatted() {
      try {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour:"numeric", minute:"numeric" };
        var ts = new Date(this.props.newsObj.updated_at);
        return ts.toLocaleDateString(config.DEFAULT_LOCALE, options);
      }
      catch(err) {
        console.log(err);
        return null;
      }
    }

}

export default NewsCard;
