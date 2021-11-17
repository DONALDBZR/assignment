// Declaring the variable that is going to be exported
let windowVariable = Window;
// If-state
if (typeof windowVariable !== "undefined") {
    window = window.localStorage.getItem("window");
}
module.exports = {
    windowVariable,
};
