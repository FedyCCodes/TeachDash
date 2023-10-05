// ClassEditApp.js

/**
 * @class ClassEditApp - description
 */
function ClassEditApp() {
  
  TDApplication.call(this);
  // this inherits all the properties and method from TDApplication
  
  /**
   * @class ClassEditApp
   * @property {String} icon - the ionicon image for the app icon
   */
  this.icon = "book-outline";
  
  /**
   * @class ClassEditApp
   * @property {TDGradientColor} gradientColor - the gradient color that is given for the application icon
   */
  this.gradientColor = TDGradientColor.orange;
  
  /**
   * @class ClassEditApp
   * @property {string} id - the id of the application
   */
  this.id = "class-edit-app-id";
  
  /**
   * @class ClassEditApp
   * @property {string} name - the name of the application
   */
  this.name = "Class Editor";
  
  /**
   * @class ClassEditApp
   * @property {Function} reactElement - the element for the application that has a default app data
   */
  this.reactElement = TDRClassEditAppContainer;
  
  /**
   * @class ClassEditApp
   * @method save - the function that saves the data
   */
  this.save = function(){
    
    TeachDash.userData.save();
    // writes to the simplified data
    
  };
  
  /**
   * @class ClassEditApp
   * @method onOpen - a callback function that is called whenever the application is opened
   * @param {object} input - the input that the application has
   */
  this.onOpen = function(input){
    
    this.setCurrentClass(input || TeachDash.userData.schoolClasses[0]);
    // sets the current class
    
  };
  
  /**
   * @class ClassEditApp
   * @property {TDSchoolClass} currentClass - the current class that is being used by the user
   */
  this.currentClass = undefined;
  
  /**
   * @class ClassEditApp
   * @method updateSchoolList - re renders the school list
   */
  this.updateSchoolList = function(){
    
    var previousValue = document.getElementsByClassName("tdr-class-edit-app-header-class-select")[0].value.slice();
    // gets the previous value of the select
    
    ReactDOM.unmountComponentAtNode(document.getElementsByClassName("tdr-class-edit-app-header-class-select")[0]);
    // removes the school class from the list
    
    ReactDOM.render(TDRClassEditAppContainer.SchoolList({}), document.getElementsByClassName("tdr-class-edit-app-header-class-select")[0]);
    // replaces it with the current ones
    
    document.getElementsByClassName("tdr-class-edit-app-header-class-select")[0].value = previousValue;
    // sets the previous value of the select
    
  };
  
  /**
   * @class ClassEditApp
   * @method updateStudentList - a method used to update the student list
   */
  this.updateStudentList = function(){
    
    ReactDOM.unmountComponentAtNode(document.getElementsByClassName("tdr-class-edit-app-body")[0]);
    // removes the students from the list
    
    ReactDOM.render(TDRClassEditAppContainer.StudentList({}), document.getElementsByClassName("tdr-class-edit-app-body")[0]);
    // replaces it with the current ones
    
  };
  
  /**
   * @class ClassEditApp
   * @method setCurrentClass - this is a function to set the current school class
   * @param {TDSchoolClass | string} schoolClass - either the id of a class or the class object itself
   */
  this.setCurrentClass = function (schoolClass) {
    
    if (schoolClass.constructor == String) {
      // checks if the input is a string
      
      schoolClass = TeachDash.userData.getSchoolClassById(schoolClass);
      // defines the school class object
      
    }
    
    this.currentClass = schoolClass;
    // sets the school class to be the current one
    
    document.getElementsByClassName("tdr-class-edit-app-header-class-select")[0].value = this.currentClass.id;
    // sets the name of the class
    
    document.getElementsByClassName("tdr-class-edit-app-header-class-name")[0].value = this.currentClass.name;
    // sets the name of the class
    
    document.getElementsByClassName("tdr-class-edit-app-header-class-select")[0].setAttribute("class", "default-style tdr-class-edit-app-header-class-select " + `td-gradient-color-${this.currentClass.gradientColor.className}-background-border`);
    // changes the color of the item
    
    document.getElementsByClassName("tdr-class-edit-app-header-class-color")[0].value = this.currentClass.gradientColor.className;
    // sets the value of the color
    
    document.getElementsByClassName("tdr-class-edit-app-header-class-color")[0].setAttribute("class", "default-style tdr-class-edit-app-header-class-color " + `td-gradient-color-${this.currentClass.gradientColor.className}-background-border`);
    // changes the color of the item
    
    this.updateSchoolList();
    // re renders the list
    
    this.updateStudentList();
    // re renders the student list
    
  };
  
  /**
   * @class ClassEditApp
   * @method addStudent - this is a method to see if the student
   */
  this.addStudent = function(){
    
    if (this.currentClass) {
      // this checks if the current class
      
      var student = new TDStudentClass({ name: "Unnamed Student", gender: "unknown" });
      // this creates a new student
      
      this.currentClass.addStudent(student);
      // this adds the student to the call
      
      this.save();
      // this saves the data
      
      this.updateStudentList();
      // re renders the student list
      
    }
    
  };
  
}

TeachDash.core.addApplication(new ClassEditApp());

