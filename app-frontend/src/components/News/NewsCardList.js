import React, {Component} from 'react';
import NewsCard from './NewsCard';
import { Link } from "react-router-dom"
import  * as config from '../../config.js';
import * as endpoints from '../../rest-endpoints.js';

/*
  List of news
*/

class NewsCardList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news: []
    }
  }

  /*
    When props change, usually URL page number
  */
  componentWillReceiveProps(nextProps) {
    this.loadNewsAndUpdateComponent(nextProps.match.params.page);
  }

  componentWillMount() {
    this.loadNewsAndUpdateComponent();
  }

  /*
    Load news from DB.

    @param page :: page will define offset value. Default is 1
  */
  loadNewsAndUpdateComponent(page=1) {

    console.log("News component will mount " + endpoints.NEWS_GET_ALL)

    /* Get posts */

    fetch(endpoints.NEWS_GET_ALL+"/"+page).then(data => {
      return data.json();
    }).then(data => {
      console.log( data )

      this.setState({news: data});

    }).catch(err => {
      throw new err;
      console.log("GET failed");
    });
  }





  render() {

    var zero_posts_alert = null;
    if(this.state.news.length > 0) {
      var rows = this.state.news.map(news =>
        // pass the entire object...
        <NewsCard newsObj={news} key={news.id} />
      );
    } else {
      zero_posts_alert = <div className="container-fluid "><div className='alert alert-info mt-md-3'>No news to show!</div></div>
    }

    return(
        <div>
          <nav className="App-custom-nav">
              <span className="navbar-brand mb-0 h1">News</span>
          </nav>
          {zero_posts_alert}
          <div className="App-custom-page-content" id="news">
            <div className="card-columns">
               {rows}
            </div>
            <hr/>

            {/* Nav. Under consturction! */}
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li className="page-item" disabled="true"><Link to="/news/1" className="page-link">Newer</Link></li>
                <li className="page-item"><Link to="/news/3" className="page-link">Older</Link></li>
              </ul>
            </nav>
            <small>Current page {this.props.match.params.page}</small>


          </div>
        </div>
    );
  }
}

export default NewsCardList;
