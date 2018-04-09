const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

function sendFile(filepath, response, cb) {
    fs.createReadStream(filepath).pipe(response);
    response.on('end', cb);
    response.on('error', cb);
}

const server = http.createServer((request, response) => {
    // Check if request method not in available methods
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('Invalid Method');
        return response.end();
    }

    const reqURL = url.parse(request.url);
    const filepath = path.join('build', reqURL.pathname);
    fs.stat(filepath, (err, stat) => {
        if (stat && stat.isFile()) {
            // If the file is available
            return sendFile(filepath, response, () => response.end());
        }
        // Send index.html as fallback request
        return sendFile('./build/index.html', response, () => {
            response.end();
        });
    });
});

server.listen(8080, () => {
    console.log(`Server is listening on http://localhost:8080`);
});
