// Server class
class Server {
    // Constructor method
    constructor() {
        // Importing hyper-text transfer protocol
        this.hyperTextTransferProtocol = require("http");
        // Importing the file system
        this.fileSystem = require("fs");
        this.domain =
            "http://stormysystem.ddns.net:8080/Darkness4869/assignment";
    }
    // Initialize method
    init() {
        // Creating the server to read the requests
        this.hyperTextTransferProtocol
            .createServer((request, _response) => {
                // Logging the request
                console.log(
                    "URL: " +
                        this.domain +
                        request.url +
                        "\nREQUEST METHOD: " +
                        request.method
                );
                // If-statement to verify the uniform resource locator of the request
                if (request.url == this.domain + "/") {
                    this.homepage();
                }
            })
            .listen(8080);
    }
    // Homepage method
    homepage() {
        // Creating the server on homepage
        this.hyperTextTransferProtocol
            .createServer((_request, response) => {
                // Setting the response mime type
                response.setHeader("Content-Type", "text/html");
                // Reading the file for the homepage
                this.fileSystem.readFile(
                    "./Pages/Homepage.html",
                    (error, data) => {
                        // If-statement to verify the HTTP status of the response
                        if (!error) {
                            // Generating a HTTP200 response
                            response.writeHead(200);
                            response.end(data);
                        } else {
                            // Generating a HTTP404 response
                            response.writeHead(404);
                            response.end("404 - Page not Found");
                        }
                    }
                );
            })
            .listen(8080);
    }
}
// Instantiating the server
const server = new Server();
// Initializing the server
server.init();
