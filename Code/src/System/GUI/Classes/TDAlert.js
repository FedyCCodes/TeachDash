// TDAlert.js

/**
 * @class TDAlert - the class for an alert
 */
function TDAlert(data) {
  
  TDAlert.close();
  // this removes the previous alert
  
  /**
   * @class TDAlert
   * @variable {HTMLElement} alertContainer - gets the container to where the alert is
   */
  var alertContainer = document.getElementsByClassName("tdr-alert-element")[0];
  
  /**
   * @class TDAlert
   * @variable {React.Component} element - gets the react element
   */
  var alertElement = TDRAlert(data);
  
  ReactDOM.render(alertElement, alertContainer);
  // then adds the alert
  
}

/**
 * @static TDAlert
 * @method close - a function used to close the alert
 */
TDAlert.close = function(){
  
  var alertContainer = document.getElementsByClassName("tdr-alert-element")[0];
  // gets the container to where the alert is
  
  ReactDOM.unmountComponentAtNode(alertContainer);
  // removes the alert container
  
};
// TDAlert({content:"Input",okay(){console.log("hello world")}});
