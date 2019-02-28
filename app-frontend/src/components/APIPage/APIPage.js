import React, {Component} from 'react';
import SwaggerUi, {presets} from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

class APIPage extends Component {
  componentDidMount() {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      // url: `http://petstore.swagger.io/v2/swagger.json`,
      url: this.props.URL,
      presets: [presets.apis],
    });
  }

  render() {
    return (
      <div id="swaggerContainer" />
    );
  }
}

export default APIPage;