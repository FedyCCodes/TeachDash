// TDCore.js

/**
 * @class TDCore - description
 */
function TDCore() {
  
  console.trace("Instatiated");
  
  /**
   * @class TDCore
   * @property {TDKeyboard} keyboard - the class for all the short cuts that are used by the system
   */
  this.keyboard = new TDKeyboard();
  
  /**
   * @class TDCore
   * @property {TDFileDropper} fileDropper - the class for all the file dropper short cuts
   */
  this.fileDropper = new TDFileDropper();
  
  this.fileDropper.callback = function(path){
    // defines the callback
    
    if (TeachDash.core.currentApplication) {
      // checks if there is an app in use
      
      if (TeachDash.core.currentApplication.onDroppedFile) {
        // checks if the onDroppedFile callback is defined
        
        TeachDash.core.currentApplication.onDroppedFile(path);
        // runs the callback
        
      }
      
    }
    
    
  };
  
  /**
   * @class TDCore
   * @property {[TDApplication]} applications - description
   */
  this.applications = [];
  
  /**
   * @class TDCore
   * @property {[string: number]} idToNumber - this is a hash table that contains all the ids into number form
   */
  this.idToNumber = {};
  
  /**
   * @class TDCore
   * @property {[TDApplication]} widgets - description
   */
  this.widgets = [];
  
  /**
   * @class TDCore
   * @property {TDHeaderBar} headerBar - description
   */
  this.headerBar = new TDHeaderBar();
  
  /**
   * @class TDCore
   * @property {string} pageName - the name of the page that is currently used
   */
  this.pageName = "home";
  
  /**
   * @class TDCore
   * @property {Boolean} appLoaded - checks if the app was loaded
   */
  this.appLoaded = false;
  
  /**
   * @class TDCore
   * @property {TDFileSystem} fs - the file system used by the core
   */
  this.fs = new TDFileSystem();
  
  /**
   * @class TDCore
   * @method showClassBar - displays the class bar when using an application
   */
  this.showClassBar = function(){
    
    if (this.pageName == "app") {
      // checks if the page is using app
      
      var appContainer = document.getElementsByClassName("tdr-app-page-app")[0];
      // the place where all the apps is stored
      
      var mainFrame = appContainer.getElementsByClassName("tdr-app-page-main-frame")[0];
      // the main frame of the application
      
      var appClasses = appContainer.getElementsByClassName("tdr-app-page-app-classes")[0];
      // the gets the app classes of the application
      
      mainFrame.style.width = "calc(100% - 260px)";
      // makes it shrink so it can fit both the class and the frame
      
      mainFrame.style.left = "240px";
      // moves it to the left so it can change position
      
      appClasses.style.width = "200px";
      // gives a width to the classes to be used
      
      if (appClasses.children.length == 0) {
        // checks if the app class area has no children
        
        ReactDOM.render(
          // if it doesn't then it will add the school classes from the user data
          
          React.createElement(
            // this creates an
            
            React.Fragment, null, 
            // empty react element
            
            TeachDash.userData.schoolClasses.map(schoolClass=>
              // adds a list of all the school classes
              
              TDRClassItem({
                // using the element for the class item
                
                schoolClass, 
                // with the class data
                
                onClick: TeachDash.core.currentApplication.onClassClicked || (function(){})
                // and the onclick method
                
              })
            )
          ),
          
          appClasses
          // adds it to the element
          
        );
        
      }
      
    }
    
  };
  
  /**
   * @class TDCore
   * @method hideClassBar - hides the class bar when using an application
   */
  this.hideClassBar = function(){
    
    if (this.pageName == "app") {
      // checks if the page is using app
      
      var appContainer = document.getElementsByClassName("tdr-app-page-app")[0];
      // the place where all the apps is stored
      
      var mainFrame = appContainer.getElementsByClassName("tdr-app-page-main-frame")[0];
      // the main frame of the application
      
      var appClasses = appContainer.getElementsByClassName("tdr-app-page-app-classes")[0];
      // the gets the app classes of the application
      
      mainFrame.style.width = "calc(100% - 20px)";
      // makes it shrink so it can fit both the class and the frame
      
      mainFrame.style.left = "0";
      // moves it to the left so it can change position
      
      appClasses.style.width = "0";
      // gives a width to the classes to be used
      
    }
    
  };
  
  /**
   * @class TDCore
   * @method onHomeOpen - this is called when the home page is opened
   */
  this.onHomeOpen = function(){
    
    document.getElementsByClassName("tdr-app-page-app")[0].style.left = "100%";
    // makes it smoothly move away
    
    var appContainer = document.getElementsByClassName("tdr-app-page-home-apps-container")[0];
    // the place where all the apps is stored
    
    ReactDOM.render(
      // adds in the render
      
      React.createElement(
        // this creates an
        
        React.Fragment, null, 
        // empty react element
        
        this.applications.map(app=>{
          // this converts the application icons into React Element
          
          var element = TDRAppLauncher({icon: app.icon, title: app.name, color: app.gradientColor.className, onClick: function(){
            // this gets the react element
            
            var id = app.id;
            // this gets the id of the application
            
            var mainFrame = document.getElementsByClassName("tdr-app-page-home")[0].getElementsByClassName("tdr-app-page-container")[0];
            // the place where all the home elements are stored
            
            mainFrame.setAttribute("class", "tdr-app-page-container tdr-app-page-home-hide");
            // this closes the hide
            
            setTimeout(function() {
              // delays opening the app by 300 milliseconds
              
              TeachDash.core.openAppById(id);
              // opens the application
              
            }, 200 * TeachDash.userData.allowsAnimations);
            
          }});
          
          
          return element;
          // returns the element
          
        })
      ),
      
      appContainer
      // this adds it to the container
      
    );
    
    var classContainer = document.getElementsByClassName("tdr-app-page-home-classes")[0];
    // gets where the classes are supposed to be located
    
    ReactDOM.render(
      // adds the school classes from the user data
      
      React.createElement(
        // this creates an
        
        React.Fragment, null, 
        // empty react element
        
        TeachDash.userData.schoolClasses.map(schoolClass=>
          // adds a list of all the school classes
          
          TDRClassItem({
            // using the element for the class item
            
            schoolClass, 
            // with the class data
            
            onClick: function(){},
            // and an empty function
            
            addButtons: true
            // adds the editor buttons
          })
          
        )
      ),
      
      classContainer
      // adds it to the element
      
    );
    
    var widgetContainer = document.getElementsByClassName("tdr-app-page-home-widgets")[0];
    // gets where the classes are supposed to be located
    
    ReactDOM.render(
      // adds the school classes from the user data
      
      React.createElement(
        // this creates an
        
        React.Fragment, null, 
        // empty react element
        
        this.widgets.map(app=>{
          // this converts the widgets into React Element
          
          return TDRWidgetItem({children: app.widgetReactElement(), gradientColor: app.gradientColor});
          // returns the element
        })
      ),
      
      widgetContainer
      // adds it to the element
      
    );
    
  };
  
  /**
   * @class TDCore
   * @method openPage - this is a method used to open a specific page in the application
   * @param {string} pageName - this the type of page that wants to be open (of exclusive type "welcome", "home", "app")
   */
  this.openPage = function(pageName){
    
    var pageItems = document.getElementsByClassName("tdr-app-page-" + pageName);
    // this gets any existing page items
    
    var allPages = document.getElementsByClassName("tdr-app-page");
    // this is a variable for all the pages in the application
    
    for (var i = 0; i < allPages.length; i++) {
      // this loops through all the pages
      
      allPages[i].style.left = "100%";
      // this makes the page move to the left
      
      if (allPages[i] != pageItems[0]) {
        // checks if the page that is used is not the same as the page item
        
        if (allPages[i].children.length > 0) {
          // checks if there are children in the page
          
          ReactDOM.unmountComponentAtNode(allPages[i]);
          // removes any content inside
          
        }
        
      }
      
    }
    
    this.headerBar.setName(pageName.replaceAt(0, pageName[0].toUpperCase()));
    // this changes the name to whatever is being used
    
    this.pageName = pageName;
    // this stores the page name that was used
    
    if (pageName == "loading") {
      // checks if loading page is called
      
      TeachDash.userData.firstTimeOpen = false;
      // tells the system that the application was already opened
      
      TDUserData.fss.save(TeachDash.userData);
      // stores the user data
      
    }
    
    if (pageItems.length > 0) {
      // checks if there is a bigger amount
      
      pageItems[0].style.left = "0%";
      // makes it move to the left
      
      var pageContainer = TDCore.pageContainers[pageName];
      // gets the page container
      
      ReactDOM.render(
        // This is the element that allows react elements to be displayed
        
        React.createElement(pageContainer, null),
        // and uses the TDRPage[pageName]Container
        
        pageItems[0],
        // inside of the root element  
        
        function(){
          // this gets the callback
          
          if (TeachDash.core.pageName == "home") {
            // checks if the home page is being used
            
            setTimeout(function() {
              // delays by 300 milliseconds
              
              var mainFrame = document.getElementsByClassName("tdr-app-page-home")[0].getElementsByClassName("tdr-app-page-container")[0];
              // the place where all the home elements are stored
              
              mainFrame.setAttribute("class", "tdr-app-page-container");
              // this closes the hide
              
            }, 300 * TeachDash.userData.allowsAnimations);
            
            TeachDash.core.onHomeOpen();
            // this is called when the home page is created
          }
          
        }
      );
      
      if (pageName == "loading") {
        // checks if the page is loading
        
        setTimeout(TeachDash.core.startingFrame.runLoadingTests, 1000 * TeachDash.userData.allowsAnimations);
        // runs the loading tests with a delay
        
      }
      
    } else {
      // checks if it doesn't exist
      
      console.warn("Warning TDCore.openPage: Error the open page function was given the incorrect, the type that was inputted: \"" + pageName + "\", please fix it with \"welcome\", \"loading\", \"home\", and \"app\"");
      // puts in a warning for the 
    }
    
  };
  
  /**
   * @class TDCore
   * @method addApplication - this is a function that adds the application to the core
   * @param {TDApplication} app - the application that is to be added
   */
  this.addApplication = function(app){
    
    this.idToNumber[app.id] = parseInt(this.applications.length);
    // stores the number id of the application
    
    this.applications.push(app);
    // this adds to the applications array
    
    if (app.hasWidget) {
      // checks if the application has a widget
      
      this.widgets.push(app);
      // this adds to the widgets array
      
    }
    
  };
  
  /**
   * @class TDCore
   * @property {TDApplication} currentApplication - the current application that is being used by the user
   */
  this.currentApplication;
  
  /**
   * @class TDCore
   * @method openAppById - this is a function to open an application
   * @param {string} id - this gets the id of the application to be ran
   * @param {object} input - the input that the application has
   */
  this.openAppById = function(id, input){
    
    if (this.pageName == "home") {
      // this checks if the page is home
      
      this.openPage("app");
      // this puts in the app page
    }
    
    var index = this.idToNumber[id];
    // this gets the index of the application
    
    if (this.currentApplication !== undefined) {
      // checks that the current application is defined
      
      this.currentApplication.onTerminate();
      // runs the on terminate callback
      
    }
    
    var application = this.currentApplication = this.applications[index] || {};
    // this gets the application
    
    var appPage = document.getElementsByClassName("tdr-app-page tdr-app-page-app")[0];
    // gets the app page
    
    if (application.id) {
      // checks that the app has an id
      
      appPage.setAttribute("class", "tdr-app-page tdr-app-page-app tdr-app-" + application.id);
      // includes the app id
      
    }
    
    var applicationContainer = document.getElementsByClassName("tdr-app-page-container-app")[0];
    // gets the container element for the application
    
    this.headerBar.setName(application.name.replaceAt(0, application.name[0].toUpperCase()));
    // this changes the name to whatever is being used
    
    if (application.reactElement) {
      // checks if the react element was defined
      
      if (!TeachDash.userData.appVisitedById.includes(application.id)) {
        // checks if the app has already been opened
        
        TeachDash.userData.appVisitedById.push(application.id);
        // tells the system that the app has already been visited so that next time the user clicks on it, it doesn't reload
        
        TDUserData.fss.save(TeachDash.userData);
        // stores the user data
        
        setTimeout(function() {
          // this delays the data by half a second
          
          var applicationContainer = document.getElementsByClassName("tdr-app-page-container-app")[0];
          // gets the container element for the application
          
          var applicationContainerText = applicationContainer.getElementsByClassName("tdr-loading-circle-text")[0].getElementsByTagName("p")[0];
          // gets the element text
          
          ReactDOM.unmountComponentAtNode(applicationContainerText);
          // removes the content of the element
          
          ReactDOM.render(
            // this displays the application data
            
            "The application is complete",
            // puts in the react element
            
            applicationContainerText
            // this puts in the application container
            
          );
          
          TeachDash.core.startingFrame.changeLoadingCircleTo(applicationContainer.getElementsByClassName("tdr-app-circle-loading")[0], "success", function(){
            // makes it in success mode
            
            setTimeout(function(){
              // delays by 1 tenth of a second
              
              document.getElementsByClassName("tdr-app-page-app")[0].style.left = "100%";
              // makes it smoothly move away
              
            }, 300 * TeachDash.userData.allowsAnimations);
            
            setTimeout(function(){
              // makes it delayed by a second
              
              ReactDOM.unmountComponentAtNode(applicationContainer);
              // removes the content of the element
              
              ReactDOM.render(
                // this displays the application data
                
                application.reactElement(),
                // puts in the react element
                
                applicationContainer,
                // this puts in the application container
                
                function(){
                  // a callback for when the app is made
                  
                  document.getElementsByClassName("tdr-app-page-app")[0].style.left = "0%";
                  // makes it smoothly move back
                  
                  if (application.showsClasses) {
                    // checks if the application shows it's classes
                    
                    setTimeout(()=>TeachDash.core.showClassBar(), 400 * TeachDash.userData.allowsAnimations);
                    // shows the class bar
                  }
                  
                  application.onOpen(input);
                  // calls back the open function from the application
                  
                }
                
              );
              
            }, 1000 * TeachDash.userData.allowsAnimations);
          });
        }, 500 * TeachDash.userData.allowsAnimations);
        
      } else {
        // checks if the app has not yet been opened
        
        ReactDOM.unmountComponentAtNode(applicationContainer);
        // removes the content of the element
        
        document.getElementsByClassName("tdr-app-page-app")[0].style.left = "0%";
        // makes it smoothly move back
        
        ReactDOM.render(
          // this displays the application data
          
          application.reactElement(),
          // puts in the react element
          
          applicationContainer,
          // this puts in the application container
          
          function(){
            // a callback for when the code is all added
            
            if (application.showsClasses) {
              // checks if the application shows it's classes
              
              setTimeout(()=>TeachDash.core.showClassBar(), 400 * TeachDash.userData.allowsAnimations);
              // shows the class bar
              
            }
            
            application.onOpen(input);
            // calls back the open function from the application
            
          }
          
        );
        
      }
      
      ReactDOM.unmountComponentAtNode(document.getElementsByClassName("tdr-outside-app-container")[0]);
      // removes the outside element if it exists
      
      if (application.outsideElement) {
        // checks if the react element was defined
        
        ReactDOM.render(application.outsideElement({}), document.getElementsByClassName("tdr-outside-app-container")[0]);
        // displays the outside element if it exists
      }
      
    } else {
      // checks if the react element is undefined
      
      setTimeout(function() {
        // this delays the data by half a second
        
        var applicationContainer = document.getElementsByClassName("tdr-app-page-container-app")[0];
        // gets the container element for the application
        
        TeachDash.core.startingFrame.changeLoadingCircleTo(applicationContainer.getElementsByClassName("tdr-app-circle-loading")[0], "fail");
        // makes it into fail mode
        
        var applicationContainerText = applicationContainer.getElementsByClassName("tdr-loading-circle-text")[0].getElementsByTagName("p")[0];
        // gets the element text
        
        ReactDOM.unmountComponentAtNode(applicationContainerText);
        // removes the content of the element
        
        ReactDOM.render(
          // this displays the application data
          
          "The application is incomplete",
          // puts in the react element
          
          applicationContainerText
          // this puts in the application container
          
        );
        
      }, 1500 * TeachDash.userData.allowsAnimations);
      
    }
    
  };
  
  /**
   * @class TDCore
   * @method terminateApp - this closes the application
   */
  this.terminateApp = function(){
    
    if (this.pageName == "app") {
      // this checks if the page is app
      
      this.openPage("home");
      // this puts in the home page
    }
    
    if (this.currentApplication != undefined) {
      // checks that the current application is defined
      
      this.currentApplication.onTerminate();
      // adds the callback when the application terminates
    }
    
    this.currentApplication = undefined;
    // removes the data of the current application
    
    // tdr-app-pages-full-screen
  };
  
  /**
   * @class TDCore
   * @property {TDStartingFrame} startingFrame - this contains the starting frame
   */
  this.startingFrame = new TDStartingFrame();
  
  /**
   * @class ScheduleApp
   * @method homeLoop - a function for every time second that runs
   */
  this.homeLoop = function(){
    
    var timeText = "Time: " + (new Date().getHours() % 12) + ":" + (
      // puts in the time
      
      new Date().getMinutes() < 10 ? 
      // checks if there is 1 digit in the minute section
      
      "0" + (new Date().getMinutes()) : 
      // adds in the extra 0 to make it two digits
      
      (new Date().getMinutes())
      // if not then it leaves it
      
    ) + " " + (!new Date().toString().includes("PM") ? "PM" : "AM");
    // takes the time text
    
    var headerBarRight = document.getElementsByClassName("tdr-app-header-right")[0];
    // gets the element of the header
    
    if (headerBarRight.innerText != timeText) headerBarRight.innerText = timeText;
    // sets the header text if it's different
    
    if (TeachDash.core.pageName == "home") {
      // checks if the home page is open
      
      for (var app of TeachDash.core.applications) {
        // loops through all the applications
        
        if (app.homeLoop) app.homeLoop();
        // runs the loop
        
      }
      
    }
    
  };
  
  setInterval(this.homeLoop, 1000);
  // loops the home loop
  
}

/**
 * @static TDCore
 * @property {number} standardTime - this puts in the standard time for animation within the application
 */
TDCore.standardTime = 300;

/**
 * @static TDCore
 * @method addCSS - this adds the css text
 * @param {string} cssString - the css text that wants to be added
 */
TDCore.addCSS = function(cssString){
  
  var styleElement = document.createElement("style");
  // this creates the style element
  
  styleElement.innerHTML = cssString;
  // this sets the css text to the style
  
  document.head.appendChild(styleElement);
  // this adds the style element to the head
  
};

/**
 * @static TDCore
 * @method randomInt - a method to get a random whole number
 * @param {number} min - the lowest number
 * @param {number} max - the biggest number
 * @returns {number} result - the random number
 */
TDCore.randomInt = function(min, max){
  
  return Math.floor(min + (Math.random() * (max - min)));
  // returns the number
  
};

/**
 * @static TDCore
 * @property {object} pageContainers - the object for all the pages
 */
TDCore.pageContainers = {};

/**
 * @static TeachDash
 * @property {TDCore} core - this is a variable for the core of the entire system
 */
TeachDash.core = new TDCore();
