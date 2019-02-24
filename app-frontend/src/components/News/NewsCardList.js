import React, {Component} from 'react';
import NewsCard from './NewsCard';

class NewsCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [] 
    }
  }

  componentDidMount() {
    //axios fetch data here, just hard code at the moment
    this.setState({
      news: [
        {
          Title: "23/11/17 - Junction 2017 Challenge!",
          CreateDate: "10.10.2019",
          Author: "Jane Doe",
          Content: "Public transportation is a growing and transforming multi-billion euro business, influenced and disrupted currently by forces like digitalization, urbanization and environmentalism. In order to stay competitive and evolve, public transportation has to improve its ability to meet the varying needs and aspirations of the passengers. In Brilliant Bus Display -challenge we are looking for innovative public screen services/applications that will improve the travel experience of the bus passengers. We offer a unique set of bus-related data to be utilized in the created services, and a possibility to showcase your work among leading industry stakeholders in ITS World Congress in Copenhagen in September 2018. "
        },
        {
          Title: "23/11/17 - Junction 2017 Challenge!",
          CreateDate: "10.10.2019",
          Author: "Jane Doe",
          Content: "Public transportation is a growing and transforming multi-billion euro business, influenced and disrupted currently by forces like digitalization, urbanization and environmentalism. In order to stay competitive and evolve, public transportation has to improve its ability to meet the varying needs and aspirations of the passengers. In Brilliant Bus Display -challenge we are looking for innovative public screen services/applications that will improve the travel experience of the bus passengers. We offer a unique set of bus-related data to be utilized in the created services, and a possibility to showcase your work among leading industry stakeholders in ITS World Congress in Copenhagen in September 2018. "
        },
        {
          Title: "23/11/17 - Junction 2017 Challenge!",
          CreateDate: "10.10.2019",
          Author: "Jane Doe",
          Content: "Public transportation is a growing and transforming multi-billion euro business, influenced and disrupted currently by forces like digitalization, urbanization and environmentalism. In order to stay competitive and evolve, public transportation has to improve its ability to meet the varying needs and aspirations of the passengers. In Brilliant Bus Display -challenge we are looking for innovative public screen services/applications that will improve the travel experience of the bus passengers. We offer a unique set of bus-related data to be utilized in the created services, and a possibility to showcase your work among leading industry stakeholders in ITS World Congress in Copenhagen in September 2018. "
        },
        {
          Title: "23/11/17 - Junction 2017 Challenge!",
          CreateDate: "10.10.2019",
          Author: "Jane Doe",
          Content: "Public transportation is a growing and transforming multi-billion euro business, influenced and disrupted currently by forces like digitalization, urbanization and environmentalism. In order to stay competitive and evolve, public transportation has to improve its ability to meet the varying needs and aspirations of the passengers. In Brilliant Bus Display -challenge we are looking for innovative public screen services/applications that will improve the travel experience of the bus passengers. We offer a unique set of bus-related data to be utilized in the created services, and a possibility to showcase your work among leading industry stakeholders in ITS World Congress in Copenhagen in September 2018. "
        },
        {
          Title: "23/11/17 - Junction 2017 Challenge!",
          CreateDate: "10.10.2019",
          Author: "Jane Doe",
          Content: "Public transportation is a growing and transforming multi-billion euro business, influenced and disrupted currently by forces like digitalization, urbanization and environmentalism. In order to stay competitive and evolve, public transportation has to improve its ability to meet the varying needs and aspirations of the passengers. In Brilliant Bus Display -challenge we are looking for innovative public screen services/applications that will improve the travel experience of the bus passengers. We offer a unique set of bus-related data to be utilized in the created services, and a possibility to showcase your work among leading industry stakeholders in ITS World Congress in Copenhagen in September 2018. "
        },
      ]
    })
  }

  render() {
    let rows = this.state.news.map(a => <NewsCard Title={a.Title} CreateDate={a.CreateDate}
                                        Author={a.Author} Content={a.Content} >
                                        </NewsCard>);
    return(
        <div>
          <nav className="App-custom-nav">
              <span className="navbar-brand mb-0 h1">NEWS</span>
          </nav>
          <div className="App-custom-page-content">
            <div className="card-columns">
               {rows}
            </div>
          </div>
        </div>
    );
  }
}

export default NewsCardList;