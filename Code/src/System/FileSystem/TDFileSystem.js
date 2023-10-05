// TDFileSystem.js

/**
 * @class TDFileSystem - description
 */
function TDFileSystem() {
  
  /**
   * @static TDFileSystem
   * @property {Object} fs - the file system from node js
   */
  TDFileSystem.fs = require("fs");
  
  /**
   * @class TDFileSystem
   * @property {String} directory - the path of the current directory
   */
  this.directory = "";
  
  /**
   * @class TDFileSystem
   * @property {TDFileReader} reader - The file reader class
   */
  this.reader = new TDFileReader();
  
  /**
   * @class TDFileSystem
   * @property {TDFileWriter} writer - The file writer class
   */
  this.writer = new TDFileWriter();
  
  /**
   * @class TDFileSystem
   * @method selectDirectory - description
   * @param {String} path - description
   * DEPRICATED
   */
  /*this.selectDirectory = function(path){
    
  };*/
  
  /**
   * @class TDFileSystem
   * @method isFile - checks if a path is a file or not
   * @param {String} path - the path to check if folder or file is a file
   * @returns {Boolean} result - the true or false value for if it is a file
   */
  this.isFile = function(path){
    
    var stats = TDFileSystem.fs.lstatSync(TDFileSystem.applyPath(path));
    // gets the information of the path
    
    return stats.isFile();
    // returns using the method isFile
  };
  
  /**
   * @class TDFileSystem
   * @method getStats - gets the data from the file
   * @param {String} path - the path to check if folder or file is a file
   * @returns {object} result - the statistics from node js
   */
  this.getStats = function(path){
    
    var stats = TDFileSystem.fs.lstatSync(TDFileSystem.applyPath(path));
    // gets the information of the path
    
    return stats;
    // returns using the method isFile
  };
  
  /**
   * @class TDFileSystem
   * @method openFolderWithApp - this opens the native file explorer for the given folder
   * @param {string} path - the path to where it should go
   */
  this.openFolderWithApp = function(path){
    
    const { shell } = require("electron");
    // this gets the terminal commands from electron
    
    shell.openPath(TDFileSystem.applyPath(path));
    // this opens the path
    
  };
  
  /**
   * @class TDFileSystem
   * @method listEntries - this is a function used to get all the files / folders within a folder
   * @param {String} path - the path to what folder contents is needed
   * @param {Function} callback - a function that takes the contents of the entries
   */
  this.listEntries = function(path, callback){
    
    TDFileSystem.fs.readdir(TDFileSystem.applyPath(path), (err, entries) => {
      // gets the node js to list all the items inside of the entry
      
      if (err) {
        // checks if there is an error
        
        callback([], err);
        // uses the callback with the error and no data
        
      } 
      
      if (entries) {
        // checks if there isn't any error
        
        entries = entries.map(entryPath=>(path + (path.endsWith("/") ? "" : "/") + entryPath));
        // gets the entries with the correct path
        
        callback(entries);
        // uses the callback with the correct entries
        
      }
      
    });
    
  };
  
  /**
   * @class TDFileSystem
   * @method fileExists - checks if a path exists
   * @param {String} path - the path to for folder or file
   * @returns {Boolean} result - the true or false value for if it exists
   * DEPRICATED
   */
  /*this.fileExists = function(path){
    
  };*/
  
}

/**
 * @static TDFileSystem
 * @method makeDirectory - a method used to create directories
 * @param {string} path - the inputed path
 * @param {function} callback - the callback of when the directory is created
 */
TDFileSystem.makeDirectory = function(path, callback){
  
  TDFileSystem.fs.mkdir(TDFileSystem.applyPath(path), callback);
  // creates the folder
  
};

/**
 * @static TDFileSystem
 * @method copyFile - copies the file from one path to another
 */
TDFileSystem.copyFile = function(from, to, callback){
  
  TDFileSystem.fs.copyFile(TDFileSystem.applyPath(from), TDFileSystem.applyPath(to), (err) => {
    // uses the node js function
    
    if (err) console.error(err);
    // if there is an error then it prints it
    
    callback();
    // runs the callback
    
  });
  
};


/**
 * @static TDFileSystem
 * @method applyPath - a method used to fix the path in case it is windows based
 * @param {string} path - the inputed path
 * @returns {string} path - returns the edited path
 */
TDFileSystem.applyPath = function(path){
  
  if (process.platform == "win32") {
    // checks if windows is being used
    
    path = path.split("/").join("\\");
    // changes the path
    
  }
  
  return path;
  // returns the path
  
};

