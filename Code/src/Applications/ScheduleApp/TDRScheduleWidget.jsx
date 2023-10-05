// TDRScheduleWidget.babel

/**
 * @function TDRScheduleWidget - the schedule widget item
 */
function TDRScheduleWidget(props) {
  
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
  // gets the app
  
  var currentSubject = app.getCurrentSubject();
  // gets the current subject
  
  var schoolClasses = [];
  // this gets the school classes for the current subject
  
  if (currentSubject[0] != "" && currentSubject[1] != "") {
    // checks that the classes have an id
    
    if (currentSubject[0] != "") {
      // checks that the current class is defined
      
      schoolClasses[0] = TeachDash.userData.getSchoolClassById(currentSubject[0]);
      // gets the school class
      
    }
    
    if (currentSubject[1] != "") {
      // checks that the current class is defined
      
      schoolClasses[1] = TeachDash.userData.getSchoolClassById(currentSubject[1]);
      // gets the school class
      
    }
    
  }
  
  return (
    <div className="tdr-schedule-widget" style={{height: "100%"}}>
      <div className="tdr-schedule-widget-header default-style" style={{marginBottom:"10px",display:"flex"}}>
        Current Schedule: 
        <select className="default-style" style={{padding:"0", margin: "0 4px"}} onChange={(e)=>{
          // the onchange for the select option
          
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
          // gets the app
          
          app.currentSchedule = e.target.value;
          // changes the current schedule
          
          app.reloadWidget();
          // updates the widget
          
          app.save();
          // saves the data
          
        }}>
          {("ABC").split("").map(e=>{return <option selected={app.currentSchedule == e ? true : undefined} value={e}>{e}</option>})}
        </select>
      </div>
      <div className="tdr-schedule-widget-body default-style" style={{height: "calc(100% - 80px)"}}>
        <div className={"tdr-schedule-widget-body-item default-style " + (schoolClasses[0] != undefined ? `td-gradient-color-${schoolClasses[0].gradientColor.className}-background` : "")}>
          {schoolClasses[0] != undefined ? schoolClasses[0].name : "No Classes"}
        </div>
        <div className={"tdr-schedule-widget-body-item default-style " + (schoolClasses[1] != undefined ? `td-gradient-color-${schoolClasses[1].gradientColor.className}-background` : "")}>
          {schoolClasses[1] != undefined ? schoolClasses[1].name : "No Classes"}
        </div>
      </div>
    </div>
  );
}
