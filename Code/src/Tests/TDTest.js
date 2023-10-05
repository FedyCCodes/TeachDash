// TDTest.js

/**
 * @class TDTest - the class for testing out data based on the Jest Library by facebook
 */
function TDTest() {
  
  /**
   * @class TDTest
   * @method describe - a method used to describe a test of data
   * @param {string} title - the title of the tests
   * @param {fn()->[number]} callback - this has a callback that returns list of all the tests
   */
  this.describe = function(title, callback){
    
    console.log(
      "%cTEST:%c " + title, 
      "background: blue;color: white;padding: 2px;", 
      "padding: 2px;"
    );
    // prints out the title
    
    var passPoints = 0;
    // a variable for if the test passed
    
    var list = callback();
    // this gets the list data
    
    for (var item of list) {
      // this is a for loop for the tests
      
      passPoints += item;
      // this puts in the points
    }
    
    console.log(
      "%cSUMM:%c Here is the summary:", 
      "background: blue;color: white;padding: 2px;", 
      "padding: 2px;"
    );
    // console.log the summary
    
    console.log(
      "%cPASS:%c All the tests passed ( " + passPoints.toString() + " / " + list.length.toString() + " ).", 
      "background: rgb(0 191 0);color: white;padding: 2px;", 
      "padding: 2px;"
    );
    // console.log amount of tests passed
    
    console.log(
      "%cFAIL:%c All the tests failed ( " + (list.length - passPoints).toString() + " / " + list.length.toString() + " ).", 
      "background: red;color: white;padding: 2px;", 
      "padding: 2px;"
    );
    // console.log amount of tests failed
  };
  
  /**
   * @class TDTest
   * @method describe - a method used to test data
   * @param {string} description - the description of the test
   * @param {Function|Any} callback - the callback for testing data that returns data that is to be tested or the value
   * @param {Any} expected - the expected value
   * @returns {number} passPoints - the value of if the test passed or not
   */
  this.it = function(description, callback, expected){
    
    var result = callback.constructor == Function ? callback() : callback;
    // this gets the result from the test if it is a Function or normal value
    
    try {
      // this tries to convert the data into JSON strings
      
      result = JSON.stringify(result);
      // this turns the result in the string form
      
      expected = JSON.stringify(expected);
      // this turns the expected result into the string form
      
    } catch (e) {
      
    }
    
    
    var passPoints = 0;
    // a variable for if the test passed
    
    if (result == expected) {
      // checks if the result is the same expected
      
      passPoints = 1;
      // this returns that one point passed
      
      console.log(
        "%cPASS:%c " + description + ",\n       result  : " + result + ",\n       expected: " + expected, 
        "background: rgb(0 191 0);color: white;padding: 2px;", 
        "padding: 2px;"
      );
      // puts in a console.log for passing
      
    } else {
      // checks if the test failed
      
      console.log(
        "%cFAIL:%c " + description + ",\n       result  : " + result + ",\n       expected: " + expected, 
        "background: red;color: white;padding: 2px;", 
        "padding: 2px;"
      );
      // puts in a console.log for failing
      
    }
    
    return passPoints;
    // this returns the passed points
    
  };
  
}

/**
 * @static TDTest
 * @method importScripts - a function used to add a script to the system for testing purposes
 * @param {string} path - the path of the script that is wanted
 */
TDTest.importScript = function (path) {
  
  var script = document.createElement("script");
  // a script element to be added
  
  script.src = path;
  // sets the source with a path
  
  document.body.appendChild(script);
  // adds the script to the body
  
};

/**
 * @static TDTest
 * @property {[string]} testNames - all the test names that it exists
 */
TDTest.testNames = [
  "File System",
  "App Layout Control"
];

TDTest.testNames.map(name=>{
  // runs all the stored tests
  
  TDTest.importScript("Tests/" + name + ".js");
  // brings in the script for file system
});
