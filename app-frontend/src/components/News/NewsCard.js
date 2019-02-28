import React, {Component} from 'react';
import './NewCard.css';

class NewsCard extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      let {Title, CreateDate, Author, Content} = this.props;
      return(
              <div>
                  <div className="card news-card">
                      {/* <img className="card-img-top img-responsive" src={'https://llb.sis.uta.fi/portal/img/LLB_Linkker.png'}  alt="Card image cap"/>  */}
                      <div className="card-header card-background-header">
                        <div className="grey-filter">
                          <h3 className="card-title">{Title}</h3>
                          <i>By {Author} | {CreateDate}</i>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{Content.slice(0,1000)}</p>
                      </div>
                      <div className="card-footer">
                        <p>Click to read more</p>
                      </div>
                  </div>
              </div>
      );
 }
}

export default NewsCard;