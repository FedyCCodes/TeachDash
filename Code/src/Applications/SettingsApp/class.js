// SettingsApp.js

/**
 * @class SettingsApp - description
 */
function SettingsApp() {
  
  TDApplication.call(this);
  // this inherits all the properties and method from TDApplication
  
  /**
   * @class SettingsApp
   * @property {String} icon - the ionicon image for the app icon
   */
  this.icon = "cog";
  
  /**
   * @class SettingsApp
   * @property {TDGradientColor} gradientColor - the gradient color that is given for the application icon
   */
  this.gradientColor = TDGradientColor.roseRed;
  
  /**
   * @class SettingsApp
   * @property {string} id - the id of the application
   */
  this.id = "settings-app-id";
  
  /**
   * @class SettingsApp
   * @property {string} name - the name of the application
   */
  this.name = "Settings";
  
  // this has a default app data
  this.reactElement = TDRSettingsAppContainer;
  
  /**
   * @class SettingsApp
   * @method loadBackgroundImage - this is the function that is used to load the background image once it is dropped
   * @param {CustomEvent} event - the response for when it changes
   */
  this.loadBackgroundImage = function(event){
    
    console.log(event);
    
    // TeachDash.userData.setBackgroundImage();
    
  };
  
}

TeachDash.core.addApplication(new SettingsApp());

