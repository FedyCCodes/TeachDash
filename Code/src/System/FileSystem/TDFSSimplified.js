// TDFSSimplified.js

/**
 * @class TDFSSimplified - a file system that is simplified to just json data
 */
function TDFSSimplified(path) {
  
  /**
   * @class TDFSSimplified
   * @variable {string} savingPath - the path to where the library data is stored
   */
  var savingPath = TDFileSystem.appDataPath + "/FSSimplified";
  
  /*switch (process.platform) {
    // a switch statement depending on the platform
    
    case "win32":
      // checks if the platform is windows
      
      savingPath = "C:/Users/" + process.resourcesPath.split("C:\\Users\\")[1].split("\\")[0] + "/AppData/Local/TeachDash/FSSimplified";
      // sets the saving path to a location
      
      break;
    
    case "darwin":
      // checks if the platform is macOS
      
      savingPath = "/Users/" + process.resourcesPath.split("/Users/")[1].split("/")[0] + "/Library/Application Support/TeachDash/FSSimplified";
      // sets the saving path to a location
      
      break;
    
    case "linux":
      // checks if the platform is linus
      
      savingPath = "~/.config/TeachDash/FSSimplified";
      // sets the saving path to a location
      
      break;
    
    default:
      // if no platform is valid
      
      console.error("puts in an error within the console");
  }*/
  
  /**
   * @class TDFSSimplified
   * @variable {string} path - the path of the place that contains the stored JSON
   */
  path = path || "";

  /**
   * @class TDFSSimplified
   * @method setPath - a function to set the location of the file
   * @param {string} newPath - the new path given to the system
   */
  this.setPath = function(newPath){
    
    path = newPath;
    // changes the private path variable
    
  };
  
  /**
   * @class TDFSSimplified
   * @method getFullPath - this gets the path with the stored data that is stored on the class
   */
  this.getFullPath = function(){
    
    return TDFileSystem.appDataPath + "/FSSimplified" + path;
    // returns the private variable path
    
  };
  
  /**
   * @class TDFSSimplified
   * @method getPath - this gets the path that is stored on the class
   */
  this.getPath = function(){
    
    return path;
    // returns the private variable path
    
  };

  /**
   * @class TDFSSimplified
   * @method load - loads the json data within the callback
   * @param {Function} callback - the callback function to get the data
   */
  this.load = function(callback){
    
    if (TDFileSystem.appDataPath) {
      // checks that the app data path is defined
      
      var fr = new TDFileReader();
      // creates the file reader to read files
      
      fr.text(TDFileSystem.appDataPath + "/FSSimplified" + path, (data, err)=>{
        // this gets the path data
        
        if (data) {
          // checks if data is defined
          
          callback(JSON.parse(data), err);
          // takes the callback in json form
        }
        
        if (err) {
          // checks if there is an error
          
          callback({}, err);
          // uses the callback with the error
          
        }
      });
      
    } else {
      // checks if the app data path is not yet defined
      
      TDFSSimplified.cache.push({callback,path});
      // adds the callback
      
    }
    
  };

  /**
   * @class TDFSSimplified
   * @method save - saves the json data if there is
   * @param {Object} data - description
   */
  this.save = function(data){
    
    var fw = new TDFileWriter();
    // this creates the file writer class
    
    data = JSON.stringify(data);
    // makes the object into a string
    
    fw.text(TDFileSystem.appDataPath + "/FSSimplified" + path, data);
    // writes the text data for the path
    
  };

  
}

/**
 * @static TDFSSimplified
 * @property {[fn()]} cache - an array holding the callbacks waiting for the file path to work
 */
TDFSSimplified.cache = [];

/**
 * @static TDFSSimplified
 * @method createSaveFolder - a function to create the save folder
 * @param {Function} callback - the callback function to get the data
 */
TDFSSimplified.createSaveFolder = (callback)=>{
  
  callback = callback || (function(){});
  // defines the callback if it is empty
  
  var fss = new TDFSSimplified();
  // this gets the simplified filesystem
  
  TDFileSystem.fs.mkdir(TDFileSystem.applyPath(fss.getFullPath()), callback);
  // creates the folder
  
};

