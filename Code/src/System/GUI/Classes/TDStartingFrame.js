// TDStartingFrame.js

/**
 * @class TDStartingFrame - description
 */
function TDStartingFrame() {

  /**
   * @class TDStartingFrame
   * @property {HTMLElement} element - description
   */
  this.element = undefined;
  
  /**
   * @class TDStartingFrame
   * @method goToHome - description
   */
  this.goToHome = function(){
    
  };
  
  /**
   * @class TDStartingFrame
   * @method saveFolderTest - runs the test to create the save folder
   */
  this.saveFolderTest = function(){
    
    TDFSSimplified.createSaveFolder(function(){
      // this is a callback to when the save folder was created
      
      var fss = new TDFSSimplified("/Tests");
      // this gets the simplified filesystem
      
      TDFileSystem.makeDirectory(fss.getFullPath(), function(){
        // creates the folder for Tests data
        
        var fss = new TDFSSimplified("/Repository");
        // this gets the simplified filesystem
        
        TDFileSystem.makeDirectory(fss.getFullPath(), function(){
          // creates the folder for basic data data
          
          var fss = new TDFSSimplified("/Data");
          // this gets the simplified filesystem
          
          TDFileSystem.makeDirectory(fss.getFullPath(), function(){
            // creates the folder for basic data data
            
            var fss = new TDFSSimplified("/Applications");
            // this gets the simplified filesystem
            
            TDFileSystem.makeDirectory(fss.getFullPath(), function(){
              // creates the folder for Applications data
              
              TeachDash.core.startingFrame.changeLoadingCircleTo(document.getElementsByClassName("tdr-app-page-loading")[0].getElementsByClassName("tdr-app-circle-loading")[1], "success");
              // activates the success for the loading circle
              
              setTimeout(function() {
                // delays for 7 tenth of a second
                
                TeachDash.core.startingFrame.fileResourcesTest();
                // runs the file resource test
                
              }, 700 * TeachDash.userData.allowsAnimations);
              
            });
          });
        });
      });
    });
    
  };
  
  /**
   * @class TDStartingFrame
   * @method fileResourcesTest - downloads basic files from the project to the data
   */
  this.fileResourcesTest = function(){
    
    /*var fr = new TDFileReader();
    // gets the file reader
    
    fr.text(__dirname + "/Resources/sentences.json", function(text){
      // this gets the data
      
      var fss = new TDFSSimplified("/Applications/sentences.json");
      // this creates the simplified file system for the sentences json
      
      var fw = new TDFileWriter();
      // gets the file reader
      
      fw.text(fss.getFullPath(), text, function(){
        // writes the text file to the data
        
        
        
      });
      
    });*/
    
    TeachDash.core.startingFrame.changeLoadingCircleTo(document.getElementsByClassName("tdr-app-page-loading")[0].getElementsByClassName("tdr-app-circle-loading")[2], "success", function(){
      // activates the success for the loading circle and when the success callback is called
      
      setTimeout(function() {
        // delays for half a second
        
        TeachDash.core.openPage("home");
        // goes to the home page
        
      }, 500 * TeachDash.userData.allowsAnimations);
      
    });
    
  };
  
  /**
   * @class TDStartingFrame
   * @method runLoadingTests - a function to run all the main loading tests
   */
  this.runLoadingTests = function(){
    
    /*var fss = new TDFSSimplified("/main.json");
    // this creates the simplified file system for the main json
    
    fss.load(function(data, err){
      // this gets the data
      
    });*/
    
    
    TeachDash.core.startingFrame.changeLoadingCircleTo(document.getElementsByClassName("tdr-app-page-loading")[0].getElementsByClassName("tdr-app-circle-loading")[0], "success");
    // activates the success for the loading circle
    
    setTimeout(function() {
      // delays for 7 tenth of a second
      
      TeachDash.core.startingFrame.saveFolderTest();
      // runs the file resource test
      
    }, 700 * TeachDash.userData.allowsAnimations);
    
  };
  
  /**
   * @class TDStartingFrame
   * @method changeLoadingCircleTo - a function to convert a loading circle into either a success or fail
   * @param {HTMLElement} element - the loading element that needs to be changed to
   * @param {string} type - the type of what it should be converted to (of exclusive type "success" or "fail")
   * @param {Function} endCallback - the callback for when it is completed 
   */
  this.changeLoadingCircleTo = function(element, type, endCallback) {
    
    var gradientColor = TDGradientColor.lightBlue;
    // this is a variable for the gradient color
    
    endCallback = endCallback || (function(){});
    // defines the end callback if it's undefined
    
    var svgIcon = React.Fragment;
    // this is a variable for the gradient color
    
    if (type == "success") {
      // checks if the type is success
      
      gradientColor = TDGradientColor.limeGreen;
      // this makes the new color green
      
      svgIcon = TDRIonicon["checkmark-circle-outline"];
      // this sets the svg icon
      
    } else if (type == "fail") {
      // checks if the type is fail
      
      gradientColor = TDGradientColor.roseRed;
      // this makes the new color red
      
      svgIcon = TDRIonicon["close-circle-outline"];
      // this sets the svg icon
      
    }
    
    ReactDOM.render(
      // this adds inside the svg
      
      svgIcon(),
      // svg icon
      
      element.getElementsByClassName("tdr-app-circle-loading-ionicon")[0]
      // inside the ionicon element
    );
    
    TDGradientColor.lightYellow.animate(
      // animates the gradient from yellow
      
      element.getElementsByClassName("tdr-app-circle-loading-ring")[0], 
      // with the element
      
      gradientColor, 
      // to the color selected
      
      300 * TeachDash.userData.allowsAnimations, 
      // for 300 milliseconds
      
      (p)=>{
        // and adds in a callback for every frame
        
        element.getElementsByClassName("tdr-app-circle-loading-svg-path")[0]
        // with the svg path
        
          .setAttribute("stroke-dasharray", Math.floor((1 - p) * 20).toString() + ", 100");
          // changes the length of the outline to make the ring into a circle
      }, 
      ()=>{
        // and adds in a callback for when it finishes
        
        element.getElementsByClassName("tdr-app-circle-loading-fill")[0].style.height = 
        // shrinks the height of the middle circle to show more color
        
        element.getElementsByClassName("tdr-app-circle-loading-fill")[0].style.width = "0";
        // shrinks the width of the middle circle to show more color
          
        element.getElementsByClassName("tdr-app-circle-loading-ionicon")[0].style.height = 
        // makes the icon increase height to show itself
        
        element.getElementsByClassName("tdr-app-circle-loading-ionicon")[0].style.width = "50%";
        // makes the icon increase width to show itself
        
        element.getElementsByClassName("tdr-app-circle-loading-ionicon")[0].style.opacity = "1";
        // makes the icon visible
        
        endCallback();
        // calls the end callback
        
      }
    );
    
  };
  
  /**
   * @class TDStartingFrame
   * @method createDirectories - description
   * @param {}  - description
   */
  this.createDirectories = function(){
    
  };
  
}
