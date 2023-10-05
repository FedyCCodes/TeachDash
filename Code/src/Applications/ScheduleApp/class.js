// ScheduleApp.js

/**
 * @class {TDApplication} ScheduleApp - description
 */
function ScheduleApp() {
  
  TDApplication.call(this);
  // this inherits all the properties and method from TDApplication
  
  /**
   * @class ScheduleApp
   * @property {String} icon - the ionicon image for the app icon
   */
  this.icon = "calendar-number-outline";
  
  /**
   * @class ScheduleApp
   * @property {TDGradientColor} gradientColor - the gradient color that is given for the application icon
   */
  this.gradientColor = TDGradientColor.bluePurple;
  
  /**
   * @class ScheduleApp
   * @property {string} currentSchedule - the current schedule that is being used by the user (of exclusive type A, B, and C)
   */
  this.currentSchedule = "A";
  
  /**
   * @class ScheduleApp
   * @property {Boolean} hasWidget - confirms that there is a widget
   */
  this.hasWidget = true;
  
  this.fss.setPath("/Applications/ScheduleApp.json");
  // changes the path of the data
  
  /**
   * @class ScheduleApp
   * @property {string} id - the id of the application
   */
  this.id = "schedule-app-id";
  
  /**
   * @class ScheduleApp
   * @property {string} name - the name of the application
   */
  this.name = "Schedule";
  
  /**
   * @class ScheduleApp
   * @property {Boolean} showsClasses - description
   */
  this.showsClasses = true;
  
  /**
   * @class ScheduleApp
   * @property {Function} reactElement - the element for the application that has a default app data
   */
  this.reactElement = TDRScheduleAppContainer;
  
  /**
   * @class ScheduleApp
   * @property {Function} outsideElement - the element for the application that has a default app data
   */
  this.outsideElement = TDRScheduleAppOutside;
  
  /**
   * @class ScheduleApp
   * @property {Function} widgetReactElement - the element for the widget
   */
  this.widgetReactElement = TDRScheduleWidget;
  
  /**
   * @class ScheduleApp
   * @property {TDSchoolClass} currentSchoolClass - the current school class being used
   */
  var currentSchoolClass = undefined;
  
  this.onClassClicked = function(event, schoolClass){
    // this is the callback for when the class is clicked
    
    var dragAndDrop = document.getElementsByClassName("tdr-schedule-app-drag-drop")[0];
    // the element for drag and drop
    
    dragAndDrop.innerText = schoolClass.name;
    // sets the name
    
    dragAndDrop.setAttribute("class", `default-style tdr-schedule-app-drag-drop td-gradient-color-${schoolClass.gradientColor.className}-border td-gradient-color-${schoolClass.gradientColor.className}-glass`);
    // sets the color
    
    dragAndDrop.style.top = event.clientY + "px";
    // puts in the y position of the drag and drop
    
    dragAndDrop.style.left = event.clientX + "px";
    // puts in the x position of the drag and drop
    
    dragAndDrop.style.display = "block";
    // shows the element
    
    currentSchoolClass = schoolClass;
    // this gets the school class
    
    // console.log(schoolClass, event);
    
  };
  
  /**
   * @class ScheduleApp
   * @property {number} rowsDisplaying - the rows that are displayed to the user because it stores the data beyond what is displayed
   */
  this.rowsDisplaying = 1; 
  /*{A: 1, B: 1, C: 1}*/
  
  /**
   * @class ScheduleApp
   * @property {{string: [[string]]}} scheduleData - a matrix of all the school classes
   */
  this.scheduleData = {A: [["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]], B: [["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]], C: [["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]]};
  
  /**
   * @class ScheduleApp
   * @variable {number} startingTime - the numerical value for when the day starts in minutes
   */
  this.startingTime = 0;
  
  /**
   * @class ScheduleApp
   * @variable {[number]} timeRanges - the time amount per item in minutes
   */
  this.timeRanges = [];
  
  /**
   * @class ScheduleApp
   * @variable {number} timePerClass - the time amount per item in minutes
   */
  this.timePerClass = [1,0];
  
  /**
   * @class ScheduleApp
   * @method save - the function that saves the data
   */
  this.save = function(){
    
    this.fss.save({
      // writes to the simplified data
      
      startingTime: this.startingTime,
      // saves the starting time
      
      timeRanges: this.timeRanges,
      // saves the starting time
      
      timePerClass: this.timePerClass,
      // saves the starting time
      
      currentSchedule: this.currentSchedule,
      // the current schedule being used
      
      scheduleData: this.scheduleData,
      // then the schedule data
      
      rowsDisplaying: this.rowsDisplaying
      // and the rows that are displayed
      
    });
    
  };
  
  /**
   * @class ScheduleApp
   * @method clearTime - a method to remove a given item for the schedule
   * @param {number} row - the row for where it wants to be deleted
   * @param {number} col - the row for where it wants to be deleted
   */
  this.clearTime = function(row, col){
    
    this.scheduleData[this.currentSchedule][row][col] = "";
    // makes a specific item empty
    
    this.displayTable();
    // re displays tables
    
    this.save();
    // saves the data
    
  };
    
  /**
   * @class ScheduleApp
   * @method removeRow - a method to remove a given row for the schedule
   * @param {number} row - the row for where it wants to be deleted
   */
  this.removeRow = function(row){
    
    if (confirm("Are you sure you want to delete this")) {
      // confrims if the user wants to do delete or not
      
      this.scheduleData[this.currentSchedule].splice(row, 1);
      // this removes the row from the data
      
      this.scheduleData[this.currentSchedule].push(["","","","",""]);
      // and then adds in another one
      
      this.rowsDisplaying--;
      // removes the row for the current schedule
    }
  };
  
  /**
   * @class ScheduleApp
   * @method droppedItem - callback for when it was dropped
   */
  this.droppedItem = function(position){
    
    var rows = document.getElementsByClassName("tdr-schedule-app-table-row-item");
    // gets all the rows elements
    
    var rowElement, r;
    // the row element that is found
    
    for (r = 0; r < rows.length; r++) {
      // loops for all the rows
      
      var row = rows[r];
      // gets the current row
      
      var rect = row.getBoundingClientRect();
      // gets the rectangle
      
      if (rect.y < position.y && position.y < rect.y + rect.height) {
        // checks that the position is found
        
        rowElement = row;
        // stores the row
        
        break;
        // ends the loop
        
      }
    }
    
    if (rowElement) {
      // checks that the row element is defined
      
      var cols = rowElement.getElementsByClassName("tdr-schedule-app-table-item");
      // gets all the cols elements
      
      for (var c = 0; c < cols.length; c++) {
        // loops for all the rows
        
        var colElement = cols[c];
        // gets the current row
        
        var rect = colElement.getBoundingClientRect();
        // gets the rectangle
        
        if (rect.x < position.x && position.x < rect.x + rect.width) {
          // checks that the position is found
          
          this.scheduleData[this.currentSchedule][r][c] = currentSchoolClass.id;
          // stores the id
          
          this.save();
          // saves the data
          
          TDGradientColor.clearMiddleColor.animate(colElement, currentSchoolClass.gradientColor, 300 * TeachDash.userData.allowsAnimations, undefined, function(){
            // animates the gradient
            
            var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
            // gets the app
            
            app.displayTable();
            // re displays the table
            
          });
          
          break;
          // ends the loop
          
        }
      }
    }
    
    
    
  };
  
  /**
   * @class ScheduleApp
   * @method displayTable - the function to show what data is being show
   */
  this.displayTable = function(){
    
    var tableElement = document.getElementsByClassName("tdr-schedule-app-table")[0];
    // this gets the table element to store the react data
    
    ReactDOM.unmountComponentAtNode(tableElement);
    // removes the previous element
    
    var rows = [];
    // a collection of all the element rows to be added
    
    var sheduleMatrix = this.scheduleData[this.currentSchedule];
    // gets the schedule matrix
    
    for (var i = 0; i < this.rowsDisplaying; i++) {
      // a for loop for all the rows
      
      rows.push(
        TDRScheduleAppContainer.TableRow({
          // adds in the table row
          
          row: i, 
          // with the row value index
          
          children: React.createElement(
            React.Fragment, 
            null, 
            // and all the columns for the row
            
            sheduleMatrix[i].map((id,c)=>{
              // by converting the ids
              
              return TDRScheduleAppContainer.TableItem({id:id,row:i,col:c,timeText: this.timeRanges[i] + " AM"});
              // into table items
            })
          )
        })
      );
      
    }
    
    ReactDOM.render(React.createElement(React.Fragment, null, rows), tableElement);
    // displays the data
    
  };
  
  this.fss.load(function(data,err){
    // this gets the data if it exists
    
    var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
    // gets the app
    
    if (data && data.scheduleData != undefined) {
      // checks that there is data
      
      app.startingTime = data.startingTime;
      // applies the starting time
      
      app.timeRanges = data.timeRanges;
      // saves the starting time
      
      app.timePerClass = data.timePerClass;
      // saves the starting time
      
      app.currentSchedule = data.currentSchedule;
      // the current schedule being used
      
      app.scheduleData = data.scheduleData;
      // then the schedule data
      
      app.rowsDisplaying = data.rowsDisplaying;
      // and the rows that are displayed
      
      if (app.rowsDisplaying.constructor == Object) {
        // checks if the rows that are being displayed is an object
        
        app.rowsDisplaying = app.rowsDisplaying[app.currentSchedule];
        // sets the number of the current schedule
        
      }
      
    }
    
  });
  
  /**
   * @class ScheduleApp
   * @method onOpen - a callback function that is called whenever the application is opened
   * @param {object} input - the input that the application has
   */
  this.onOpen = function(input){
    
    var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
    // gets the app
    
    app.displayTable();
    // displays the table
    
  };
  
  /**
   * @class ScheduleApp
   * @method getCurrentSubject - a function to get the current school class
   * @returns {[string]} id - the class id of the current subject
   */
  this.getCurrentSubject = function(){
    
    var date = new Date(), id = ["", ""];
    // gets the time information
    
    var hours = date.getHours(),
      // gets the current hour
      
      minutes = date.getMinutes(),
      // the current minute
      
      dayOfTheWeek = date.getDay();
      // and the day of the week
    
    for (var row = 0; row < this.timeRanges.length; row++) {
      // a for loop for all the rows
      
      minutes = date.getMinutes();
      // resets the minutes
      
      hours = date.getHours();
      // and hours
      
      var earliestTime = this.timeRanges[row].slice(),
        // gets the current time
        
        timeDifference = this.timePerClass.slice(),
        // gets the difference in time
        
        latestTime = this.timeRanges[row].slice();
        // gets another range
      
      latestTime[0] += timeDifference[0];
      // adds the hours to the time
      
      latestTime[1] += timeDifference[1];
      // adds the minutes to the time
      
      earliestTime[1] += 60 * earliestTime[0];
      // changes the value of the earliest time minutes to be total minutes 
      
      latestTime[1] += 60 * latestTime[0];
      // changes the value of the latest time minutes to be total minutes 
      
      minutes += 60 * hours;
      // changes the value of the time minutes to be total minutes 
      
      if (earliestTime[1] <= minutes && minutes <= latestTime[1]) {
        // checks if the minutes are in the time frame of the current hour
        
        if (dayOfTheWeek != 0 && dayOfTheWeek != 6) {
          // checks if the day of the week is correct
          
          id = [this.scheduleData[this.currentSchedule][row][dayOfTheWeek - 1],this.scheduleData[this.currentSchedule][row + 1][dayOfTheWeek - 1] || ""];
          // gets the id
          
          if (earliestTime[1] == minutes && (date.getSeconds() == 1)) {
            // checks that the time is exact for a subject
            
            if (id[0] != "") {
              // checks that there is an id
              
              var schoolClass = TeachDash.userData.getSchoolClassById(id[0]);
              // gets the school class
              
              this.sendNotification("Your current class is: " + schoolClass.name);
              // sends a notification
            }
            
          }
          
          break;
          // ends the loop
          
        }
        
      }
      
    }
    
    return id;
    // returns the id
    
  };
  
  /**
   * @class ScheduleApp
   * @property {[string]} currentSubject - the current subject
   */
  this.currentSubject = this.getCurrentSubject();
  
  /**
   * @class ScheduleApp
   * @method reloadWidget - a function to reload the widget
   */
  this.reloadWidget = function(){
    
    var currentSubject = this.getCurrentSubject();
    // gets the current subject
    
    var schoolClasses = [];
    // this gets the school classes for the current subject
    
    var items = document.getElementsByClassName("tdr-schedule-widget-body-item");
    // gets the item
    
    if (this.currentSubject[0] != currentSubject[0] || this.currentSubject[1] != currentSubject[1]) {
      // checks that there is different subjects
      
      if (currentSubject[0] != "") {
        // checks that the current class is defined
        
        schoolClasses[0] = TeachDash.userData.getSchoolClassById(currentSubject[0]);
        // gets the school class
        
        items[0].innerText = schoolClasses[0].name;
        // changes the name
        
        items[0].setAttribute("class", `tdr-schedule-widget-body-item default-style td-gradient-color-${schoolClasses[0].gradientColor.className}-background`);
        // changes the color
        
      } else {
        // checks that the current class is undefined
        
        items[0].innerText = "No Classes";
        // changes the name
        
        items[0].setAttribute("class", `tdr-schedule-widget-body-item default-style`);
        // changes the color
        
      }
      
      if (currentSubject[1] != "") {
        // checks that the current class is defined
        
        schoolClasses[1] = TeachDash.userData.getSchoolClassById(currentSubject[1]);
        // gets the school class
        
        items[1].innerText = schoolClasses[1].name;
        // changes the name
        
        items[1].setAttribute("class", `tdr-schedule-widget-body-item default-style td-gradient-color-${schoolClasses[1].gradientColor.className}-background`);
        // changes the color
        
      } else {
        // checks that the current class is undefined
        
        items[1].innerText = "No Classes";
        // changes the name
        
        items[1].setAttribute("class", `tdr-schedule-widget-body-item default-style`);
        // changes the color
        
      }
      
      this.currentSubject = currentSubject;
      // stores the current subject
      
    }
  };
  
  /**
   * @class ScheduleApp
   * @method homeLoop - a function for every time second that runs
   */
  this.homeLoop = this.reloadWidget;
  
  this.onTerminate = this.reloadWidget;
  // when the app is closed it reloads the widget
  
}

TeachDash.core.addApplication(new ScheduleApp());

/*

Tomorrow:
- fix the trash can
- I need to connect the data that is being stored on the app with what it actually sees
- load and save data
- drag and drop classes to the item

I did all this :)

*/

/*

const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked'

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () => console.log(CLICK_MESSAGE)
  
  
*/

