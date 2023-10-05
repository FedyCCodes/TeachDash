// TDFileWriter.js

/**
 * @class TDFileWriter - The file writer class
 */
function TDFileWriter() {
  
  /**
   * @class TDFileWriter
   * @method destroy - a function to permentaly delete a file without it going to the trash
   * @param {string} path - the location of the file to be deleted
   * @param {Function} callback - the callback to delete a file
   */
  this.destroy = function(path, callback){
    
    TDFileSystem.fs.unlink(TDFileSystem.applyPath(path), callback);
    // removes the file from the path
    
  };
  
  /**
   * @class TDFileWriter
   * @method remove - a function to delete a file 
   * @param {string} path - the location of the file to be deleted
   * @param {Function} callback - the callback to delete a file
   */
  this.remove = function(path, callback){
    
    const shell = require("electron").shell;
    // gets the shell commands from the electron app
    
    shell.moveItemToTrash(TDFileSystem.applyPath(path), callback);
    // moves the file to the trash
    
  };
  
  /**
   * @class TDFileWriter
   * @method text - writes a text file based on the path
   * @param {String} path - the location to where the file is stored
   * @param {String} data - the data of the text file
   * @param {Function} callback - the callback once the writing is complete (if there is an error it is in the parameter)
   */
  this.text = function(path, data, callback){
    
    TDFileSystem.fs.writeFile(TDFileSystem.applyPath(path), new Uint8Array(Buffer.from(data)), (err) => {
      // this writes the path and also converts the data from buffer data to uint8
      
      if (callback){
        // checks if there is an error and if the error callback is defined
        
        callback(err);
        // runs the error callback
        
      }
    });
    
  };
  
  /**
   * @class TDFileWriter
   * @method base64 - writes a base64 file based on the path
   * @param {String} path - the location to where the file is stored
   * @param {String} data - the data of the text file
   * @param {Function} callback - the callback once the writing is complete (if there is an error it is in the parameter)
   */
  this.base64 = function(path, data, callback){
    
    TDFileSystem.fs.writeFile(TDFileSystem.applyPath(path), new Uint8Array(Buffer.from(data.replace("data:;base64,", ""), "base64")), (err) => {
      // this writes the path and also converts the data from base64 data to uint8
      
      if (callback){
        // checks if there is an error and if the error callback is defined
        
        callback(err);
        // runs the error callback
        
      }
    });
    
  };
  
  /**
   * @class TDFileWriter
   * @method uint8 - writes a base64 file based on the path
   * @param {String} path - the location to where the file is stored
   * @param {Uint8Array} data - the data of the text file
   * @param {Function} callback - the callback once the writing is complete (if there is an error it is in the parameter)
   */
  this.uint8 = function(path, data, callback){
    
    TDFileSystem.fs.writeFile(TDFileSystem.applyPath(path), data, (err) => {
      // this writes the path and also converts the data from buffer data to uint8
      
      if (callback){
        // checks if there is an error and if the error callback is defined
        
        callback(err);
        // runs the error callback
        
      }
    });
    
  };
  
  
}
