// API class
class API {
    // Constructor method
    constructor() {
        // Class variables
        this.MySQL = require("mysql");
        this.databaseHandler = this.MySQL.createConnection({
            host: "stormysystem.ddns.net",
            port: 3306,
            database: "icacie",
            user: "",
            password: "",
        });
        // Connecting to the database
        this.databaseHandler.connect((error) => this.handleError(error));
    }
    // Error handler method
    handleError(error) {
        // If-statement to verify whether there is an error
        if (error) {
            throw error;
        }
    }
}
// User class
class User {
    // Constructor method
    constructor() {
        // Class variables
        this.id;
        this.mailAddress;
        this.password;
        this.firstName;
        this.lastName;
        this.message;
        this.url;
        this.registerCode;
        // Instantiating API
        this.API = new API();
    }
    // ID accessor method
    getId() {
        return this.id;
    }
    // ID mutator method
    setId(id) {
        this.id = id;
    }
    // Mail Address accessor method
    getMailAddress() {
        return this.mailAddress;
    }
    // Mail Address mutator method
    setMailAddress(mailAddress) {
        this.mailAddress = mailAddress;
    }
    // Password accessor method
    getPassword() {
        return this.password;
    }
    // Password mutator method
    setPassword(password) {
        this.password = password;
    }
    // First Name accessor method
    getFirstName() {
        return this.firstName;
    }
    // First Name mutator method
    setFirstName(firstName) {
        this.firstName = firstName;
    }
    // Last Name accessor method
    getLastName() {
        return this.lastName;
    }
    // Last Name mutator method
    setLastName(lastName) {
        this.lastName = lastName;
    }
    // Message accessor method
    getMessage() {
        return this.message;
    }
    // Message mutator method
    setMessage(message) {
        this.message = message;
    }
    // URL accessor method
    getUrl() {
        return this.url;
    }
    // URL mutator method
    setUrl(url) {
        this.url = url;
    }
    // Register Code accessor method
    getRegisterCode() {
        return this.registerCode;
    }
    // Register Code mutator method
    setRegisterCode(registerCode) {
        this.registerCode = registerCode;
    }
    // Register method
    register() {
        // Selecting data from the database
        this.API.databaseHandler.query(
            "SELECT * FROM icacie.User WHERE UserMailAddress = ?",
            [this.getMailAddress()],
            (error, results) => {
                // If-statement to verify whether there is an error
                if (error) {
                    throw error;
                }
                // If-statement to compare the data retrieved from the database against the data entered by the user
                if (results.length === 0) {
                    // Inserting data in the database
                    this.API.databaseHandler.query(
                        "INSERT INTO icacie.User (UserFirstName, UserLastName, UserMailAddress, UserPassword) VALUES (?, ?, ?, ?)",
                        [
                            this.getFirstName(),
                            this.getLastName(),
                            this.getMailAddress(),
                            this.getPassword(),
                        ],
                        (error, results) => {
                            // If-statement to verify whether there is an error
                            if (error) {
                                throw error;
                            }
                            console.log(`${this.getMailAddress()} added!`);
                            // The assigning the data to be used
                            this.setMessage(
                                this.getFirstName() +
                                    " " +
                                    this.getLastName() +
                                    " has been registered!"
                            );
                            this.setUrl("/Login");
                            this.setRegisterCode(2);
                        }
                    );
                } else if (
                    this.getMailAddress() === results[0].UserMailAddress
                ) {
                    console.log(`${this.getMailAddress()} exists!`);
                    // The assigning the data to be used
                    this.setMessage(
                        "You already have an account on with this mail address.  Please log into it instead!"
                    );
                    this.setUrl("/Login");
                    this.setRegisterCode(1);
                }
            }
        );
    }
}
// Application class
class Application {
    // Constructor method
    constructor() {
        // Importing the express
        this.express = require("express");
        // Creating the application
        this.application = this.express();
        // Instantiating the router
        this.router = this.express.Router("caseSensitive");
        // Port of the application
        this.port = 8080;
    }
    // Initialize method
    init() {
        // Creating the server to read the requests
        this.application.listen(this.port, () => this.listener());
        // Using the static directory for the static files
        this.application.use(this.express.static(__dirname + "/public/"));
        // Using the JSON that is sent from the Front-end
        this.application.use(this.express.json());
        // Using the uniform resource locator that is encoded from the Front-End
        this.application.use(this.express.urlencoded({ extended: true }));
        // Handling all the requests that are made to the server
        this.handleRequest();
    }
    // Listener method
    listener() {
        console.log(`Server running on PORT: ${this.port}`);
    }
    // Request hanlder method
    handleRequest() {
        // Processing the homepage
        this.application.get("/", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/Homepage.html")
        );
        // Processing the login
        this.application.get("/Login", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/Login.html")
        );
        // Processing the register
        this.application.get("/Register", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/Register.html")
        );
        // Processing the contact us
        this.application.get("/Contact", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/Contact.html")
        );
        // Processing the Sponsors
        this.application.get("/Sponsors", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/Sponsors.html")
        );
        // Processing the gallery
        this.application.get("/Gallery", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/Gallery.html")
        );
        // Processing the call for papers
        this.application.get("/CallForPapers", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/CallForPapers.html")
        );
        // Processing the keynotes
        this.application.get("/Keynotes", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/Keynotes.html")
        );
        // Processing the members
        this.application.get("/Members", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/Members.html")
        );
        // Processing the about us
        this.application.get("/About", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/About.html")
        );
        // Processing the dates
        this.application.get("/Dates", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/Dates.html")
        );
        // Processing the Link
        this.application.get("/Massimo/Link", (request, response) =>
            response.sendFile(__dirname + "/public/Pages/Massimo.html")
        );
    }
}
// Instantiating the application
const application = new Application();
// Initializing the application
application.init();
