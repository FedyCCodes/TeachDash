// ReportCardApp.js

/**
 * @class ReportCardApp - description
 */
function ReportCardApp() {
  
  TDApplication.call(this);
  // this inherits all the properties and method from TDApplication
  
  /**
   * @class TDApplication
   * @property {String} icon - the ionicon image for the app icon
   */
  this.icon = "clipboard-outline";
  
  /**
   * @class ReportCardApp
   * @property {TDGradientColor} gradientColor - the gradient color that is given for the application icon
   */
  this.gradientColor = TDGradientColor.limeGreen;
  
  /**
   * @class ReportCardApp
   * @property {string} id - the id of the application
   */
  this.id = "report-card-app-id";
  
  /**
   * @class ReportCardApp
   * @property {string} name - the name of the application
   */
  this.name = "Report Card";
  
  this.fss.setPath("/Applications/ReportCardApp.json");
  // changes the path of the data
  
  /**
   * @class ReportCardApp
   * @property {Function} outsideElement - the element for outside the application
   * @depricated
   */
  // this.outsideElement = TDRReportCardAppOutside;
  
  /**
   * @class ReportCardApp
   * @property {Function} reactElement - the element for the application that has a default app data
   */
  this.reactElement = TDRReportCardAppContainer;
  
  /**
   * @class ReportCardApp
   * @property {Boolean} showsClasses - description
   */
  // this.showsClasses = true;
  
  /**
   * @class ReportCardApp
   * @method save - the function that saves the data
   */
  this.save = function(){
    
    this.fss.save(TDStudentReport.presetData);
    // writes to the simplified data
    
  };
  
  /**
   * @class ReportCardApp
   * @method onOpen - a callback function that is called whenever the application is opened
   * @param {object} input - the input that the application has
   */
  this.onOpen = function(input){
    
    this.setCurrentClass(input || TeachDash.userData.schoolClasses[0]);
    // sets the current class
    
  };
  
  /**
   * @class ReportCardApp
   * @property {TDStudentClass} student - the current student that is being evaluated
   */
  this.student = undefined;
  
  /**
   * @class ReportCardApp
   * @property {TDSchoolClass} currentClasss - the current class that is being used by the user
   */
  this.currentClass = undefined;
  
  /**
   * @class ReportCardApp
   * @method setCurrentStudent - sets to the current student
   * @param {TDStudentClass | string} student - the id student or the student object itself
   */
  this.setCurrentStudent = function(student){
    
    if (student !== undefined) {
      // checks if the input is undefined
      
      if (student.constructor == String) {
        // checks if the input is a string
        
        student = this.currentClass.getStudentById(student);
        // defines the school class object
        
      }
      
    }
    this.student = student || new TDStudentClass({ name: "Unnamed Student", gender: "unknown" });
    // this sets the current student
    
    console.log(student);
    
    document.getElementsByClassName("tdr-report-card-app-header-student-gender")[0].value = this.student.gender;
    // this sets the gender
    
    document.getElementsByClassName("tdr-report-card-app-header-student-name")[0].value = this.student.name;
    // this sets the name
    
    document.getElementsByClassName("tdr-report-card-app-header-student-grade")[0].value = this.student.reportCard.grade;
    // this sets the grade
    
    document.getElementsByClassName("tdr-report-card-app-body-textarea")[0].value = this.student.reportCard.totalText;
    // this sets the report
    
  };
  
  this.copyToClipboard = function(){};
  
  /**
   * @class ReportCardApp
   * @method setCurrentClass - this is a function to set the current school class
   * @param {TDSchoolClass | string} schoolClass - either the id of a class or the class object itself
   */
  this.setCurrentClass = function (schoolClass) {
    
    if (schoolClass !== undefined) {
      // checks if the input is undefined
      
      if (schoolClass.constructor == String) {
        // checks if the input is a string
        
        schoolClass = TeachDash.userData.getSchoolClassById(schoolClass);
        // defines the school class object
        
      }
      
    }
    
    this.currentClass = schoolClass;
    // sets the school class to be the current one
    
    document.getElementsByClassName("tdr-report-card-app-header-class-select")[0].value = this.currentClass.id;
    // sets the name of the class
    
    document.getElementsByClassName("tdr-report-card-app-header-class-select")[0].setAttribute("class", "default-style tdr-report-card-app-header-class-select " + `td-gradient-color-${this.currentClass.gradientColor.className}-background-border`);
    // changes the color of the item
    
    ReactDOM.unmountComponentAtNode(document.getElementsByClassName("tdr-report-card-app-header-class-students")[0]);
    // removes the students from the list
    
    ReactDOM.render(TDRReportCardAppContainer.OptionsStudents({}), document.getElementsByClassName("tdr-report-card-app-header-class-students")[0]);
    // replaces it with the current ones
    
    if (schoolClass.students[0]) { 
      // checks if there is a student defined
      
      this.setCurrentStudent(schoolClass.students[0].id);
      // sets the current student
      
    } else {
      // checks if the student is undefined
      
      this.setCurrentStudent(undefined);
      // states that there is no student
      
    }
    
    this.updateSentences(this.student ? this.student.reportCard.grade : 5);
    // this displays the sentences
    
  };
  
  /**
   * @class ReportCardApp
   * @property {[string]} currentSentences - gets the sentences for the current one
   */
  this.currentSentences = [];
  
  /**
   * @class ReportCardApp
   * @method updateSentences - reloads the sentences and loads them all one by one
   * @param {number} grade - the given grade for the sentence
   */
  this.updateSentences = function(grade){
    
    ReactDOM.unmountComponentAtNode(document.getElementsByClassName("tdr-report-card-app-navigation")[0]);
    // removes the students from the list
    
    this.currentSentences = TDStudentReport.presetData[grade || this.student.reportCard.grade];
    // this sets the current sentences
    
    ReactDOM.render(TDRReportCardAppContainer.Sentences({}), document.getElementsByClassName("tdr-report-card-app-navigation")[0]);
    // replaces it with the current ones
    
  };
  
  /**
   * @class ReportCardApp
   * @method learnData - learns the data
   */
  this.learnData = function(){
    
    var textarea = document.getElementsByClassName("tdr-report-card-app-body-textarea")[0];
    // gets the text area element
    
    for (var sentence of textarea.value.split(".")) {
      // this loops through all the sentences that are created
      
      var generatedSentence = TDStudentReport.learnFromSentence(sentence + ".", this.student, this.currentClass);
      // this adds the generated sentence
      
      if (!this.currentSentences.includes(generatedSentence) && generatedSentence.split(" ").join("") != "" && generatedSentence.split(" ").join("") != "." && generatedSentence.length > 6) TDStudentReport.addToPresetData(this.student ? this.student.reportCard.grade : 5, generatedSentence);
      // this adds the sentence to the predefined data
      
    }
    
    alert("Data has been saved.");
    // this tells the user that the data has been created
    
    this.updateSentences();
    // this re renders the sentences
    
    this.save();
    // saves the data
    
  };
  
  /**
   * @class ReportCardApp
   * @method fixTextPronouns - a method to fix any incorrect pronouns
   */
  this.fixTextPronouns = function(){
    
    var textarea = document.getElementsByClassName("tdr-report-card-app-body-textarea")[0];
    // gets the text area element
    
    var result = "";
    // gets the new result for the text area
    
    for (var sentence of textarea.value.split(".")) {
      // this loops through all the sentences that are created
      
      var generatedSentence = TDStudentReport.learnFromSentence(sentence + ".", this.student, this.currentClass);
      // this adds the generated sentence
      
      if (generatedSentence.length > 5) result += TDStudentReport.createSentenceFrom(generatedSentence, this.student, this.currentClass);
      // this adds the sentence to the result
      
    }
    
    textarea.value = result;
    // stores the result
    
  };
  
  /**
   * @class ReportCardApp
   * @method droppedItem - when the item is dropped
   */
  this.droppedItem = function(position, sentence){
    
    var textarea = document.getElementsByClassName("tdr-report-card-app-body-textarea")[0];
    // gets the text area element
    
    var rect = textarea.getBoundingClientRect();
    // gets the rectangle
    
    if (rect.top < position.y && position.y < rect.bottom && rect.left < position.x && position.x < rect.right) {
      // checks if the items are in the same frame
      
      textarea.value += " " + sentence;
      // adds the sentence
      
    }
    
  };
  
  this.fss.load(data=>{if(data[7]!=undefined){TDStudentReport.presetData=data;}});
  // this setups the data if it exists
  
}

TeachDash.core.addApplication(new ReportCardApp());
// adds the application

