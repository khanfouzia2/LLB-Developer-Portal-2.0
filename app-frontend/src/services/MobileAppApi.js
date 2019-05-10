import axios from 'axios';
import { USER_MOBILE_APPS, USER_MOBILE_APPS_UPLOAD_FILE } from '../rest-endpoints';

const GetUserMobileApps = () => {
  return axios.get(USER_MOBILE_APPS, { withCredentials: true });
};

const PostUserMobileApp = (name, description, titleType, permissions, status, fileName , fileData, questionairList) => {
  const data = new FormData()
  data.append('application_name', name);
  data.append('description', description);
  data.append('title_type', titleType);
  data.append('permissions', JSON.stringify(permissions));
  data.append('status', status);
  data.append('zip_file_name', fileName);
  data.append('questionairList', JSON.stringify(questionairList));
  data.append('file', fileData);
  return axios.post(USER_MOBILE_APPS,
    data,
    {
      withCredentials: true
    });
}


export { GetUserMobileApps, PostUserMobileApp };