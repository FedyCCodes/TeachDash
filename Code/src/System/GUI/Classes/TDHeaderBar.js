// TDHeaderBar.js

/**
 * @class TDHeaderBar - description
 */
function TDHeaderBar() {

  /**
   * @class TDHeaderBar
   * @property {HTMLElement} element - description
   */
  this.element = undefined;

  /**
   * @class TDHeaderBar
   * @property {String} name - description
   */
  this.name = undefined;

  /**
   * @class TDHeaderBar
   * @method openSettings - a method to open the settings app from the header
   */
  this.openSettings = function(){
    
    if (TeachDash.core.pageName == "home") {
      // this checks if the page is home
      
      var mainFrame = document.getElementsByClassName("tdr-app-page-home")[0].getElementsByClassName("tdr-app-page-container")[0];
      // the place where all the home elements are stored
      
      mainFrame.setAttribute("class", "tdr-app-page-container tdr-app-page-home-hide");
      // this closes the hide
      
      setTimeout(function(){
        // delays by 300 seconds
        
        TeachDash.core.openAppById("settings-app-id");
        // opens the settings app using the core
        
      }, 300 * TeachDash.userData.allowsAnimations);
      
    } else if (TeachDash.core.pageName == "app") {
      // checks if an app is in use
      
      TeachDash.core.openPage("home");
      // makes it open the home page
      
      this.openSettings();
      // then re runs this function with the settings app
      
    }
    
    
  };

  /**
   * @class TDHeaderBar
   * @method zoomApp - this allows the app to increase size
   */
  this.zoomApp = function(){
    
    if (TeachDash.core.pageName == "app") {
      // checks if the app is being asked for
      
      var container = document.getElementsByClassName("tdr-app-container")[0];
      // gets the container
      
      if (container.getAttribute("class").includes("tdr-app-pages-full-screen")) {
        // checks if container is full screen
        
        container.setAttribute("class", "tdr-app-container");
        // changes the class name with the full screen class
        
      } else {
        // checks if container is not full screen
        
        container.setAttribute("class", "tdr-app-container tdr-app-pages-full-screen");
        // changes the class name with the full screen class
      }
      
    }
    
  };
  
  /**
   * @class TDHeaderBar
   * @method closeApp - closes the app from header bar
   */
  this.closeApp = function(){
    
    var container = document.getElementsByClassName("tdr-app-container")[0];
    // gets the container incase it is at fullscreen 
    
    container.setAttribute("class", "tdr-app-container");
    // changes the class name to disable full screen mode
    
    TeachDash.core.terminateApp();
    // terminates the applications
    
  };

  /**
   * @class TDHeaderBar
   * @method showTime - description
   */
  this.showTime = function(){
    
  };

  /**
   * @class TDHeaderBar
   * @method setName - this is a method to change the header bar title
   * @param {string} title - the title for the header bar
   */
  this.setName = function(title){
    
    document.getElementsByClassName("tdr-app-header-title")[0].innerText = title;
    // this sets the text to the title
    
  };
  
}


