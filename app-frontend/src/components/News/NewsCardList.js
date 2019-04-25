import React, { Component } from 'react';
import NewsCard from './NewsCard';
import { Link } from "react-router-dom"
import AuthContext from '../../context/auth-context';
import * as config from '../../config.js';
import * as endpoints from '../../rest-endpoints.js';

/*
  List of news
*/

class NewsCardList extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      news: []
    }

  }

  /*
    When props change, usually URL page number.
    Make sure it is an INTEGER and store it in state.page
  */
  componentWillReceiveProps(nextProps) {
    var page = parseInt(nextProps.match.params.page, 10); // base 10
    if (isNaN(page) && page <= 0) {
      console.log("Invalid :page in URL. Setting to 1")
      page = 1;
    }
    // Make call after state is successfully updated!
    this.setState({ page: page }, () => {
      console.log("page: " + page)
      this.loadNewsAndUpdateComponent(page = this.state.page);
    })

  }

  componentWillMount() {
    this.loadNewsAndUpdateComponent(1);
  }

  /*
    Load news from DB.
    @param page :: page will define offset value. Default is 1
  */
  loadNewsAndUpdateComponent(page = 1) {

    console.log("News component will mount " + endpoints.NEWS_GET_ALL)

    fetch(endpoints.NEWS_GET_ALL + "/" + page).then(data => {
      return data.json();
    }).then(data => {
      console.log(data)

      this.setState({ news: data });

    }).catch(err => {
      // throw new Error(err);
      console.log("GET news failed");
    });
  }


  getNextPageLink() {
    var nextPage = this.state.page + 1
    return (<li className="page-item"><Link to={`/news/page/${nextPage}`} className="page-link"> Older </Link></li>);
  }

  getPrevPageLink() {
    var prevPage = this.state.page - 1;

    if (prevPage < 1) {
      prevPage = 1;
      return (<li className="page-item" disabled> <a href="#" className="page-link" aria-disabled="true"> Newer </a> </li>);
    } else {
      return (<li className="page-item" > <Link to={`/news/page/${prevPage}`} className="page-link"> Newer </Link> </li>);
    }
  }


  /* Render this sub-component if auth. user is role=admin  */
  renderAdminPanel() {
      const {isAuth, role} = this.context;
      console.log( role +", "+ config.ADMIN_ROLE_NAME )
      if(isAuth && role === config.ADMIN_ROLE_NAME) {
        return(
            <React.Fragment>
              <div className="card mt-md-3">
                <div className="card-header">Admin tools</div>
                <div className="card-body">
                  <ul>
                    <li><Link to="/news/compose">Compose or edit drafts</Link></li>
                  </ul>
                </div>
              </div>
              <div className="alert alert-success mt-md-3">[Admin notice] News shown below are public. Users will see News section as it's shown below.</div>
              <hr/>
            </React.Fragment>
        );
      }
  }


  render() {

    var zero_posts_alert = null;
    if (this.state.news.length > 0) {
      var rows = this.state.news.map(news =>
        // pass the entire object...
        <NewsCard newsObj={news} key={news.id} />
      );
    } else {
      zero_posts_alert = <div className='alert alert-info mt-md-3'>No news to show! | <strong><Link to="/news/page/1">Go back to page 1</Link></strong></div>
    }

    let value = this.context;
    console.log(value);

    return(
        <div>
          <nav className="App-custom-nav">
              <span className="navbar-brand mb-0 h1">News</span>
          </nav>
          <div className="App-custom-page-content">

            { this.renderAdminPanel() }

            <div className="" id="news">
              { zero_posts_alert }
              <div className="card-columns">
                { rows}
              </div>
              <hr/>

              {/* Nav. */}
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  { this.getPrevPageLink() }
                  { this.getNextPageLink() }
                </ul>
              </nav>
              <small>Current page {this.state.page}</small>

            </div>
          </div>
        </div>
      );
  }
}

export default NewsCardList;
