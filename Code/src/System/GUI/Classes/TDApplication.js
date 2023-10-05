// TDApplication.js

/**
 * @class TDApplication - the main application class used in all the applications
 */
function TDApplication() {
  
  /**
   * @class TDApplication
   * @property {string} name - the name of the application
   */
  this.name = undefined;
  
  /**
   * @class TDApplication
   * @property {string} id - the id of the application
   */
  this.id = undefined;
  
  /**
   * @class TDApplication
   * @property {String} icon - the ionicon image for the app icon
   */
  this.icon = "cog";
  
  /**
   * @class TDApplication
   * @property {Boolean} wasOpened - check if the application has already been opened by the user
   * @depricated - moved to TeachDash.userData.appVisitedById
   */
  // this.wasOpened = false;
  
  /**
   * @class TDApplication
   * @property {TDGradientColor} gradientColor - the gradient color that is given for the application icon
   */
  this.gradientColor = TDGradientColor.white;
  
  /**
   * @class TDApplication
   * @property {React.Component} reactElement - the react element for the page
   */
  this.widgetReactElement = undefined;
  
  /**
   * @class TDApplication
   * @property {React.Component} reactElement - the react element for the page
   */
  this.reactElement = undefined;
  
  /**
   * @class TDApplication
   * @property {React.Component} outsideElement - the react element for the page
   */
  this.outsideElement = undefined;
  
  /**
   * @class TDApplication
   * @property {TDFSSimplified} fss - this creates the simplified file system class
   */
  this.fss = new TDFSSimplified();
  
  /**
   * @class TDApplication
   * @property {TDFileSystem} fs - this creates the file system class
   */
  this.fs = new TDFileSystem();
  
  /**
   * @class TDApplication
   * @property {TDFileReader} fr - this creates the file reader class
   */
  this.fr = new TDFileSystem();
  
  /**
   * @class TDApplication
   * @property {TDFileWriter} fw - this creates the file writer class
   */
  this.fw = new TDFileSystem();
  
  /**
   * @class TDApplication
   * @property {Boolean} showsClasses - description
   */
  this.showsClasses = false;
  
  /**
   * @class TDApplication
   * @property {Boolean} hasWidget - description
   */
  this.hasWidget = false;

  /**
   * @class TDApplication
   * @property {TDAppFrame} frame - description
   */
  this.frame = new TDAppFrame();
  
  /**
   * @class TDApplication
   * @method onClassClicked - the callback for when a class was clicked by the user and for how the application should respond
   */
  this.onClassClicked = function(event){};
  
  /**
   * @class TDApplication
   * @method sendNotification - a function used to send a notification from the app
   * @param {string} text - the text inside of it
   * @param {fn()} callback - when the notification was clicked
   */
  this.sendNotification = function(text, callback){
    
    if (TeachDash.userData.allowsNotifications) {
      // checks if user can send notification
      
      new Notification(
        // creates a new notification (from electron API)
        
        this.name,
        // with the app name
        
        { body: text }
        // and then the text content
        
      ).onclick = callback || (function(){});
      // with the onclick event
      
    } else {
      // checks if user cannot send notification
      
      console.warn("TDApplication.sendNotification: Warning, a notification was requested to be sent but was refused because they are disabled.");
      // puts an error
      
    }
  };
  
  /**
   * @class TDApplication
   * @property {[TDSchoolClass]} schoolClasses - description
   */
  // this.schoolClasses = undefined;

  /**
   * @class TDApplication
   * @method createHTML - description
   * @param {}  - description
   */
  /*this.createHTML = function(){
    
  };*/

  /**
   * @class TDApplication
   * @method addSchoolClass - description
   * @param {TDSchoolClass} sc - description
   */
  /*this.addSchoolClass = function(sc){
    
  };*/
  
  /**
   * @class TDApplication
   * @method onDroppedFile - a callback function that is called whenever a file is dropped when the file is opened
   * @param {string} path - the path of the file
   */
  this.onDroppedFile = function(path){
    
    
    
  };
  
  /**
   * @class TDApplication
   * @method onOpen - a callback function that is called whenever the application is opened
   * @param {object} input - the input that the application has
   */
  this.onOpen = function(input){};
  
  /**
   * @class TDApplication
   * @method onTerminate - a callback function that is called whenever the application is closed
   */
  this.onTerminate = function(){};

  
}
