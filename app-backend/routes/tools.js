const express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var root = path.dirname(require.main.filename);
var filePath = root + "/storage/reittiopas_fi_app.zip";
var filePathDevelopmentKit = root + "/storage/development_kit.zip";


router.get('/download/reittiopas_fi_app.zip', (req, res) => {
    
    fs.exists(filePath, function(exists){
      if (exists) {

        res.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Disposition": "attachment; filename=\"reittiopas_fi_app.zip\""
        });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end("ERROR File does not exist");
      }
    });
  });

router.get('/download/development_kit.zip', (req, res) => {
    
    fs.exists(filePathDevelopmentKit, function(exists){
      if (exists) {

        res.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Disposition": "attachment; filename=\"development_kit.zip\""
        });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end("ERROR File does not exist");
      }
    });
  });
  module.exports = router;