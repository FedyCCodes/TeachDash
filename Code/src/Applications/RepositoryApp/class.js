// RepositoryApp.js

/**
 * @class RepositoryApp - description
 */
function RepositoryApp() {
  
  TDApplication.call(this);
  // this inherits all the properties and method from TDApplication
  
  /**
   * @class RepositoryApp
   * @property {string} icon - the ionicon image for the app icon
   */
  this.icon = "file-tray-full-outline";
  
  /**
   * @class RepositoryApp
   * @property {TDGradientColor} gradientColor - the gradient color that is given for the application icon
   */
  this.gradientColor = TDGradientColor.lightBlue;
  
  /**
   * @class RepositoryApp
   * @property {Boolean} showsClasses - description
   */
  this.showsClasses = true;
  
  /**
   * @class RepositoryApp
   * @property {string} id - the id of the application
   */
  this.id = "repository-app-id";
  
  /**
   * @class RepositoryApp
   * @property {Boolean} hasWidget - confirms that there is a widget
   */
  this.hasWidget = false;
  
  /**
   * @class RepositoryApp
   * @property {string} name - the name of the application
   */
  this.name = "Repository";
  
  /**
   * @class RepositoryApp
   * @property {Function} reactElement - the element for the application that has a default app data
   */
  this.reactElement = TDRRepositoryAppContainer;
  
  /**
   * @class RepositoryApp
   * @property {Function} widgetReactElement - the element for the widget
   */
  this.widgetReactElement = TDRRepositoryWidget;
  
  this.fss.setPath("/Applications/RepositoryApp.json");
  // changes the path of the data
  
  /**
   * @class RepositoryApp
   * @property {string} itemsStyle - the style of the item
   */
  this.itemsStyle = "grid";
  
  /**
   * @class RepositoryApp
   * @method setItemsStyle - a method to set the style
   * @param {string} data - (of exclusive "grid", "list")
   */
  this.setItemsStyle = function(data){
    
    if (this.itemsStyle != data) {
      // checks if the data is different
      
      this.itemsStyle = data;
      // sets the item
      
      var itemsElement = document.getElementsByClassName("tdr-repository-app-body-container")[0];
      // gets the item element
      
      if (itemsElement) itemsElement.setAttribute("class", "tdr-repository-app-body-container tdr-repository-app-body-container-" + data);
      // sets the class item to change to grid or list
      
      this.save();
      // saves their data
    }
  };
  
  this.fss.load(function(data, err){
    // loads the file data
    
    if (data) {
      // checks that the data is defined
      
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
      // gets the app
      
      app.setItemsStyle(data.itemsStyle);
      // sets the style
      
      app.pinnedEntries = data.pinnedEntries || [];
      // sets the pinned entries
      
    }
    
  });
  
  /**
   * @class RepositoryApp
   * @property {[string]} pinnedEntries - a list of all the pinned entries
   */
  this.pinnedEntries = [];
  
  /**
   * @class RepositoryApp
   * @property {[object]} currentEntries - a list of the current files being displayed
   */
  this.currentEntries = [];
  
  /**
   * @class RepositoryApp
   * @method save - the function that saves the data
   */
  this.save = function(){
    
    this.fss.save({
      // saves the data
      
      itemsStyle: this.itemsStyle,
      // the items style
      
      pinnedEntries: this.pinnedEntries
      // sets the pinned entries
      
    });
    
  };
  
  /**
   * @class RepositoryApp
   * @property {TDSchoolClass} schoolClass - the current school class being used
   */
  this.schoolClass = undefined;
  
  /**
   * @class RepositoryApp
   * @method onOpen - a callback function that is called whenever the application is opened
   * @param {object} input - the input that the application has
   */
  this.onOpen = function(input){
    
    this.setSchoolClass(input || TeachDash.userData.schoolClasses[0]);
    // sets the current class
    
    /*
    var container = document.getElementsByClassName("tdr-repository-app-body-container")[0];
    // gets the container
    
    container.ondrop = function(event){
      // defines the callback
      
      event.preventDefault();
      // prevents normal
      
      console.log(event.dataTransfer);
      
    };
    */
    
  };
  
  /**
   * @class TDApplication
   * @method onDroppedFile - a callback function that is called whenever a file is dropped when the file is opened
   * @param {string} path - the path of the file
   */
  this.onDroppedFile = function(path){
    
    var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
    // gets the app
    
    var fileName = path.split("/").pop();
    // gets the last file name
    
    TDFileSystem.copyFile(path, app.fss.getFullPath().replace("Applications/RepositoryApp.json", "Repository/") + app.schoolClass.id + "/" + fileName, function(){
      // copies the file
      
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
      // gets the app
      
      app.updateFileList(app.schoolClass.id);
      // updates the file list
      
    });
    
    console.log("RepositoryApp: " + path);
    
  };
  
  /**
   * @class RepositoryApp
   * @property {Object} fileFunctions - an object that contains all the main functions for an entry
   */
  this.fileFunctions = {
    
    preview(path){
      // sets up the preview
      
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
      // gets the app
      
      app.togglePreviewFrom(path);
      // shows the preview from the file
      
    },
    
    open(path){
      // opens the file
      
      const shell = require("electron").shell;
      // gets the shell commands from the electron app
      
      shell.openPath(TDFileSystem.applyPath(path));
      // opens the file at the path
      
    },
    
    pin(path){
      // pins the file
      
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
      // gets the app
      
      if (app.pinnedEntries.includes(path)) {
        // checks if the path is a pinned entry
        
        app.pinnedEntries.splice(app.pinnedEntries.indexOf(path), 1);
        // removes the pinned file
        
      } else {
        // checks if the path is not yet in the pinned entries
        
        app.pinnedEntries.push(path);
        // adds the file to the pinned entries
        
      }
      
      setInterval(app.updateFileList, 200);
      // rerenders the file list
      
    },
    
    remove(path){
      // delete the file
      
      if (confirm("Are you sure you would like to delete file at path: " + path)) {
        // checks if the user wants to delete
        
        var fw = new TDFileWriter();
        // creates the file writer
        
        fw.remove(path, function(){
          // callback for when the file is deleted
          
          setTimeout(function(){
            // delays by 200 milliseconds
            
            var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
            // gets the app
            
            app.updateFileList(app.schoolClass.id);
            // updates the file list
            
          }, 1000);
        });
        
      }
      
    }
    
  };
  
  /**
   * @class RepositoryApp
   * @method updateFileList - updates the list of data
   */
  this.updateFileList = function(path){
    
    this.fs.listEntries(this.fss.getFullPath().replace("Applications/RepositoryApp.json", "Repository/") + path, function(entries, err){
      // gets all the entries
      
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
      // gets the app
      
      app.currentEntries = [];
      // clears the entries
      
      for (var path of entries) {
        // loops through all the entries path
        
        var fileName = path.split("/").pop();
        // gets the file name
        
        if (!fileName.startsWith(".")) {
          // checks if the file is supposed to be hidden
          
          app.currentEntries.push({
            // adds in a new entry
            
            fileName,
            // sets the file name
            
            fullPath: path,
            // adds the full path
            
            fileFunctions: app.fileFunctions,
            // gets all the functions for the file
            
            onClick(e){
              // sets the onclick when a file is clicked
              
              console.log(e.target);
              
            }
            
          });
          
        }
      }
      
      var container = document.getElementsByClassName("tdr-repository-app-body-container")[0];
      // the container element of the repository
      
      ReactDOM.unmountComponentAtNode(container);
      // removes any existing files in the container
      
      ReactDOM.render(
        // loads the render
        
        TDRRepositoryAppContainer.Files({}),
        // the files element
        
        container
        // the container
        
      );
      
      
    });
    
  };
  
  /**
   * @class RepositoryApp
   * @method onClassClicked - a callback function that is called whenever the application is opened
   * @param {object} input - the input that the application has
   */
  this.onClassClicked = function(event, schoolClass){
    
    var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
    // gets the app
    
    app.setSchoolClass(schoolClass);
    // sets the school class
    
  };
  
  /**
   * @class RepositoryApp
   * @property {string} currentPreviewPath - stores the preview path that is being used
   */
  this.currentPreviewPath = "";
  
  /**
   * @class RepositoryApp
   * @method editPreviewFile - a function to edit the text file
   */
  this.editPreviewFile = function(){
    
    var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
    // gets the app
    
    var textarea = document.getElementsByClassName("tdr-repository-app-body-preview-file")[0];
    // gets the text file
    
    app.fs.writer.text(app.currentPreviewPath, textarea.value);
    // stores the text
    
  };
  
  /**
   * @class RepositoryApp
   * @method togglePreviewFrom - a function to show the preview of a given file or close it if it's in use
   * @param {string} path - the path for the file to be displayed or not
   */
  this.togglePreviewFrom = function(path){
    
    var appBody = document.getElementsByClassName("tdr-repository-app-body")[0];
    // gets the body
    
    var className = appBody.getAttribute("class");
    // gets the class name
    
    var fileExtension = (path || "").split("/").pop().split(".").pop();
    // gets the last file name and the file extension if there is one
    
    var validFileExtensions = "png jpg jpeg gif html txt java cs cpp js".split(" ");
    // a list of different file extensions that work
    
    if (path && this.currentPreviewPath != path) {
      // checks that the path parameter is defined
      
      appBody.setAttribute("class", "tdr-repository-app-body tdr-repository-app-body-show-preview");
      // shows the preview
      
      this.currentPreviewPath = path;
      // stores the current preview path
      
      var textFileExtensions = "html txt java cs cpp js".split(" "),
      // gets the valid text files extension
      
      imageFileExtensions = "png jpg jpeg gif".split(" ");
      // gets the valid image files extension
      
      if (textFileExtensions.includes(fileExtension)) {
        // checks if the file is text type
        
        this.fs.reader.text(this.currentPreviewPath, function(result){
          // reads the text file
          
          var previewContainer = document.getElementsByClassName("tdr-repository-app-body-preview")[0];
          // gets the preview container
          
          ReactDOM.unmountComponentAtNode(previewContainer);
          // removes any components inside
          
          ReactDOM.render(TDRRepositoryAppContainer.PreviewFile({data: result, fileType: "text"}), previewContainer);
          // loads the preview
          
        });
        
      } else if (imageFileExtensions.includes(fileExtension)) {
        // checks if the file is image
        
        this.fs.reader.base64(this.currentPreviewPath, function(result){
          // reads the text file
          
          var previewContainer = document.getElementsByClassName("tdr-repository-app-body-preview")[0];
          // gets the preview container
          
          ReactDOM.unmountComponentAtNode(previewContainer);
          // removes any components inside
          
          ReactDOM.render(TDRRepositoryAppContainer.PreviewFile({data: result, fileType: "image"}), previewContainer);
          // loads the preview
          
        });
        
      } else {
        // checks if preview can't read it
        
        var previewContainer = document.getElementsByClassName("tdr-repository-app-body-preview")[0];
        // gets the preview container
        
        ReactDOM.unmountComponentAtNode(previewContainer);
        // removes any components inside
        
        ReactDOM.render(TDRRepositoryAppContainer.PreviewFile({data: "", fileType: ""}), previewContainer);
        // loads the preview
        
      }
      
    } else {
      // it hides it if it's not
      
      appBody.setAttribute("class", "tdr-repository-app-body tdr-repository-app-body-hide-preview");
      // hides the preview
      
      this.currentPreviewPath = "";
      // removes the path
      
    }
    
    console.log(this.fs.getStats(path));
    
  };
  
  /**
   * @class RepositoryApp
   * @method setSchoolClass - this is a function to set the current school class
   * @param {TDSchoolClass | string} schoolClass - either the id of a class or the class object itself
   */
  this.setSchoolClass = function (schoolClass) {
    
    if (schoolClass !== undefined) {
      // checks if the input is undefined
      
      if (schoolClass.constructor == String) {
        // checks if the input is a string
        
        schoolClass = TeachDash.userData.getSchoolClassById(schoolClass);
        // defines the school class object
        
      }
      
      this.schoolClass = schoolClass;
      // sets the school class to be the current one
      
      var folderText = document.getElementsByClassName("tdr-repository-app-header-folder")[0];
      // this gets the folder text
      
      folderText.innerText = this.schoolClass.name;
      // sets the name
      
      folderText.setAttribute("class", `default-style tdr-repository-app-header-folder td-gradient-color-${this.schoolClass.gradientColor.className}-background`);
      // sets the color of the class
      
      this.fs.listEntries(this.fss.getFullPath().replace("Applications/RepositoryApp.json", "Repository/") + this.schoolClass.id, function(entries, err){
        // gets all the entries
        
        if (err) {
          // checks if the folder doesn't exist
          
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
          // gets the app
          
          TDFileSystem.makeDirectory(app.fss.getFullPath().replace("Applications/RepositoryApp.json", "Repository/") + app.schoolClass.id, function(){});
          // creates the directory
          
        }
        
      });
      
      this.updateFileList(this.schoolClass.id);
      // this shows the list of items
      
      
    }
    
  };
  
}

/**
 * @static RepositoryApp
 * @property {Object} fileExtToIcon - an object that converts the file extension to a valid icon
 */
RepositoryApp.fileExtToIcon = {
  "default": "document-outline",
  "txt": "document-text-outline",
  "html": "document-text-outline",
  "htm": "document-text-outline",
  "js": "code-slash-outline",
  "css": "code-slash-outline",
  "java": "code-slash-outline",
  "cs": "code-slash-outline",
  "cpp": "code-slash-outline",
  "c": "code-slash-outline",
  "py": "code-slash-outline",
  "png": "image-outline",
  "jpg": "image-outline",
  "jpeg": "image-outline",
  "webp": "image-outline",
  "gif": "image-outline",
  "url": "globe-outline",
  "pdf": "reader-outline"
};

TeachDash.core.addApplication(new RepositoryApp());
