// Server class
class Server {
    // Constructor method
    constructor() {
        // Importing hyper-text transfer protocol
        this.hyperTextTransferProtocol = require("http");
        // Importing the file system
        this.fileSystem = require("fs");
        // Importing the uniform resource locator
        this.uniformResourceLocator = require("url");
        // The hostname of the website
        this.hostname = "http://stormysystem.ddns.net/";
        // The port that the server is using
        this.port = 8080;
        // The server
        this.server;
        // The path
        this.path = "";
    }
    // Initialize method
    init() {
        // Creating the server to read the requests
        this.server = this.hyperTextTransferProtocol
            .createServer((request, response) =>
                this.handleHTTPRequest(request, response)
            )
            .listen(8080);
    }
    // Render method
    render(path, response) {
        // Reading the file for the homepage
        this.fileSystem.readFile(path, (error, data) =>
            this.handleHTTPResponse(error, data, response)
        );
    }
    // HTTP Response handler method
    handleHTTPResponse(error, data, response) {
        // If-statement to verify there is no error before generating the appropirate HTTP staus code of the response
        if (!error) {
            // Generating a HTTP/200 response
            response.writeHead(200);
            response.end(data);
        } else {
            // Generating a HTTP/404 response
            response.writeHead(404);
            response.end("404 - Page not found");
        }
    }
    // HTTP Request hanlder method
    handleHTTPRequest(request, response) {
        // Logging the request
        console.log(
            "URL: " +
                this.hostname +
                ":" +
                this.port +
                request.url +
                "\nREQUEST METHOD: " +
                request.method
        );
        // Getting the path by parsing the uniform resource locator requested by the client
        const path = this.uniformResourceLocator.parse(request.url).pathname;
        // Generating the reponse
        response.writeHead(200, { "Content-Type": "text/html" });
        // Switch-statement to verify the uniform resource locator of the request
        switch (path) {
            case "/":
                this.render("./Pages/Homepage.html", response);
                break;
            case "/Login":
                this.render("./Pages/Login.html", response);
                break;
            default:
                // Generating HTTP/404 response
                response.writeHead(404);
                response.write("ERROR 404: Not Found");
                response.end();
                break;
        }
    }
}
// Instantiating the server
const server = new Server();
// Initializing the server
server.init();
