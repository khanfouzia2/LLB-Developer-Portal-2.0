import React, {Component} from 'react';
/*

  Component for viewing one News

  Route: <>/news/:id


*/


class NotFound extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div className="alert alert-warning mt-md-3">
        Page not found [HTTP 404]
      </div>
    )
  }

}
export default NotFound;
