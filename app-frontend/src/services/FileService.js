import service from './Restapi.js';

export class FileService {
    getFileFromServer(fileName){
        //returns Promise object
        return service.getRestClientTools().get('/download/'+fileName,{ responseType:"arraybuffer" });
    }
}