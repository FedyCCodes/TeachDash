// TDFileReader.js

/**
 * @class TDFileReader - The file reader class
 */
function TDFileReader() {
  
  /**
   * @class TDFileReader
   * @method text - the method to get text from a file
   * @param {String} path - the location to where the file is stored
   * @param {Function} callback - the calback for getting the data
   * 
   */
  this.text = function(path, callback){
    
    TDFileSystem.fs.readFile(TDFileSystem.applyPath(path), (err, data) => {
      // this reads the file using the NodeJS api
      
      if (err) {
        // checks if there is an error
        
        callback(undefined, err);
        // gets the callback information with the error
      }
      
      if (data) {
        // checks if there is data
        
        callback(data.toString("utf8"), undefined);
        // gets the callback information without the error in utf8 form
      }
    });
    
  };
  
  /**
   * @class TDFileReader
   * @method base64 - the method to get base64 from a file mainly used for images
   * @param {String} path - the location to where the file is stored
   * @param {Function} callback - the calback for getting the data
   */
  this.base64 = function(path, callback){
    
    TDFileSystem.fs.readFile(TDFileSystem.applyPath(path), (err, data) => {
      // this reads the file using the NodeJS api
      
      if (err) {
        // checks if there is an error
        
        callback(undefined, err);
        // gets the callback information with the error
      }
      
      if (data) {
        // checks if there is data
        
        callback("data:;base64," + data.toString('base64'), undefined);
        // gets the callback information without the error in base64 form
      }
    });
    
  };
  
  /**
   * @class TDFileReader
   * @method uint8 - the method to get the bytes array from a file
   * @param {String} path - the location to where the file is stored
   * @param {Function} callback - the calback for getting the data
   */
  this.uint8 = function(path, callback){
    
    TDFileSystem.fs.readFile(TDFileSystem.applyPath(path), (err, data) => {
      // this reads the file using the NodeJS api
      
      if (err) {
        // checks if there is an error
        
        callback(undefined, err);
        // gets the callback information with the error
      }
      
      if (data) {
        // checks if there is data
        
        callback(new Uint8Array(data), undefined);
        // gets the callback information without the error and in normal buffer form
        
      }
    });
    
  };
  
}
