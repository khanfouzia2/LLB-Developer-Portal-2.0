import service from './Restapi.js';

export class FileService {
    getFileForTools(fileName){
        //returns Promise object
        return service.getRestClientTools().get('/download/'+fileName,{ responseType:"blob" });
    }
}