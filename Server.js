// Importing the Hyper-Text Transfer Protocol
const hyperTextTransferProtocol = require("http");
// Importing the File system
const fileSystem = require("fs");
// Assigning the domain!  Only used for console logging purpose 😅
const domain = "http://stormysystem.ddns.net:8080/Darkness4869/assignment";
// Creating the server to manage the requests and the responses
hyperTextTransferProtocol
    .createServer((request, response) => {
        // Logging the request
        console.log(
            "URL: " +
                domain +
                request.url +
                "\nREQUEST METHOD: " +
                request.method
        );
        // If-statement to verify the uniform resource locator of the request
        if (request.url == "/") {
            // Setting the response mime type
            response.setHeader("Content-Type", "text/html");
            // Reading the file for the homepage
            fileSystem.readFile("./Pages/Homepage.html", (error, data) => {
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
            });
        } else if (request.url == "/Login") {
            // Setting the response mime type
            response.setHeader("Content-Type", "text/html");
            // Reading the file for the homepage
            fileSystem.readFile("./Pages/Login.html", (error, data) => {
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
            });
        } else {
            // Generating a HTTP404 response
            response.writeHead(404);
            response.end("404 - Page not Found");
        }
    })
    .listen(8080);
