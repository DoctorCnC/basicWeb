const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res)=> {
    let filePath ='.' + req.url;


    if (filePath === './'){
        filePath= './index.html';
    }
    else if(filePath ==='./about'){
        filePath = './about.html'
   

    }else if(filePath === 'contact-me.html'){
        filePath='contact-me.html';
    } else {
        filePath ='./404.html';

}

const extname = path.extname(filePath);
const contentType = getContentType(extname);

fs.readFile(filePath, (err, content)=>{
    if (err){
        if (err.code === 'ENOENT'){
            fs.readFile('./404.html', (err, notfoundContent)=>{
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(notFoundContent, 'utf-8');
            });
        }else{
                res.writeHead(500);
                res.send("server errror");
            }
        }else {
            res.writeHead(200, {"Content-Type" : contentType});
            res.end(content, 'utf-8');
        }
    });
});

server.listen(8080, () => {
    console.log("Server running at http://localhost:8080/");
});

function getContentType(extname) {
    switch (extname) {
      case '.html':
        return 'text/html';
      case '.css':
        return 'text/css';
      case '.js':
        return 'text/javascript';
      default:
        return 'text/plain';
    }
  }
  
  console.log("jello bbaby jesus");


