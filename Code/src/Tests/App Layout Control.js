// App Layout Control.js

(function() {
  // this is the test cases for the file system
  
  var test = new TDTest();
  
  test.it("Check if the application count is the total amount.", TeachDash.core.applications.length, 5);
  
  test.it("Check if the main functions for opening or terminating.", TeachDash.core.openAppById != undefined && TeachDash.core.terminateApp != undefined, true);
  
  test.it("Header data check information.", JSON.stringify(TeachDash.core.headerBar), "{}");
  
  test.it("Check if the main header functions are defined.", ()=>{return TeachDash.core.headerBar.openSettings != undefined && TeachDash.core.headerBar.closeApp != undefined && TeachDash.core.headerBar.zoomApp != undefined}, true);
  
})();
