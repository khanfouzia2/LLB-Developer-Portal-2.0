import axios from 'axios';
import * as endpoints from '../rest-endpoints.js';


class Restapi {
  getRestClientTools() {
    if (!this.serviceInstance) {
      this.serviceInstance = axios.create({
        baseURL: endpoints.TOOLS_GET,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
          },
      });
    }
    return this.serviceInstance;
  }
}

export default (new Restapi());