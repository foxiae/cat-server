var http = require('http');
var fs = require('fs');

var options = {
  "method": "GET",
  "hostname": "api.giphy.com",
  "port": null,
  "path": "/v1/gifs/random?tag=kitty&api_key=dc6zaTOxFJmzC",
  "headers": {
    "content-length": "0"
  }
};

var download = function(url, dest, callback) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(res) {
    res.pipe(file);
    file.on('finish', function() {
      file.close(callback);
    });
  }).on('error', function(err) {
    fs.unlink(dest);
    if (callback) callback(err.message);
  });
};

var giphyReq = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var imgURL = JSON.parse(chunks.toString()).data.image_url; 
  
    download(imgURL, 'cat.gif');

    console.log('Congrats! Your cat gif saved!'); 
  });
});
giphyReq.end();

