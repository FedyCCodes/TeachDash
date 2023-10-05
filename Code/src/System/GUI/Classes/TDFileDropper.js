// TDFileDropper.js

/**
 * @class TDFileDropper - the controller class for dropping files (this was made with help from https://www.geeksforgeeks.org/drag-and-drop-files-in-electronjs/)
 */
function TDFileDropper() {
  
  /**
   * @class TDFileDropper
   * @property {fn()} callback - a callback that are used
   */
  this.callback = function(){};
  
  document.ondrop =  function(event){
    // defines the callback for when files are actually dropped into the application
    
    event.preventDefault();
    // prevents the application from changing path
    
    event.stopPropagation();
    // disables extra popups from the drag and drop
    
    for (var file of event.dataTransfer.files) {
      // loops through all the paths
      
      TeachDash.core.fileDropper.callback(file.path);
      // runs the callback
      
      // console.log('File Path of dragged files: ', file.path);
      // Using the path attribute to get absolute file path
    }
  };
  
  document.ondragover = function(event){
    // defines a callback for when the file dragged left
    
    event.preventDefault();
    // prevents the application from changing path
    
    event.stopPropagation();
    // disables extra popups from the drag and drop
    
  };
  
  document.ondragenter = function (event) {
    // defines a callback when the file enters in the space
    
    // console.log('File is in the Drop Space');
    
  };
  
  document.ondragleave = function (event) {
    // defines a callback when the file leaves the space
    
    // console.log('File has left the Drop Space');
  };
  
}
