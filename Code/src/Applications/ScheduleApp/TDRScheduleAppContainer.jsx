// TDRScheduleAppContainer.babel

/**
 * @function TDRScheduleAppOutside - the schedule drag and drop
 */
function TDRScheduleAppOutside(props) {
  return (
    <div className="default-style tdr-schedule-app-drag-drop td-gradient-color-rose-red-border td-gradient-color-rose-red-glass" onMouseMove={(e)=>{
      
      e.target.style.left = e.clientX + "px";
      // sets x position
      
      e.target.style.top = e.clientY + "px";
      // sets x position
      
    }} onMouseUp={(e)=>{
      
      e.target.style.display = "none";
      // hides the data
      
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
      // gets the app
      
      app.droppedItem({x: e.clientX, y: e.clientY});
      // calls the drop item
      
    }} style={{display: "none"}}>
      Computer Science
    </div>
  );
}

/**
 * @function TDRScheduleAppContainer - the schedule app container.
 */
function TDRScheduleAppContainer(props) {
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
  // gets the application to use
  return (
    <div className="tdr-schedule-app">
      <div className="default-style tdr-schedule-app-header">
        Set Time Interval
        <select className="default-style" style={{padding:"5px", margin: "0 8px"}} onChange={(e)=>{
          // the onchange for the select option
          
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
          // gets the app
          
          app.timePerClass = e.target.value.split(",").map(e=>parseInt(e));
          // changes the current schedule
          
          var startTime = app.timeRanges[0];
          // gets the starting time
          
          app.timeRanges = [startTime];
          // clears the ranges of time
          
          for (var row = 1; row < 30; row++) {
            // loops through all the rows
            
            startTime[0] += app.timePerClass[0];
            // adds the amount of hours
            
            startTime[1] += app.timePerClass[1];
            // adds the amount of minutes
            
            console.log(startTime);
            
            if (startTime[1] >= 60) {
              // checks if the amount of minutes exceeded an hour
              
              var amountOfHours = Math.floor(startTime[1] / 60);
              // gets the hours difference
              
              startTime[1] = startTime[1] % 60;
              // removes the left over chunk
              
              startTime[0] += amountOfHours;
              // adds the remaining hours
              
            }
            
            startTime[0] = Math.min(19, startTime[0]);
            // limits the time to not go beyond 7 PM
            
            app.timeRanges[row] = startTime.slice();
            // adds the time range
            
          }
          
          app.displayTable();
          // displays the table
          
          app.save();
          // saves the data
          
        }}>
          {
            ([
              ["10 min", [0,10]],
              ["15 min", [0,15]],
              ["30 min", [0,30]],
              ["45 min", [0,45]],
              ["1 hr", [1,0]],
              ["1 hr 10 min", [1,10]],
              ["1 hr 15 min", [1,15]],
              ["1 hr 30 min", [1,30]],
              ["1 hr 45 min", [1,45]],
              ["2 hr", [2,0]],
              ["2 hr 10 min", [2,10]],
              ["2 hr 15 min", [2,15]],
              ["2 hr 30 min", [2,30]],
              ["2 hr 45 min", [2,45]],
              ["3 hr", [3,0]],
            ])
            .map(data=>{return (
              <option selected={app.timePerClass.join() == data[1].join() ? true : undefined} value={data[1]}>
                {data[0]}
              </option>
            )})
          }
        </select>
        Set Alternate Schedule
        <select className="default-style" style={{padding:"5px", margin: "0 8px"}} onChange={(e)=>{
          // the onchange for the select option
          
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
          // gets the app
          
          app.currentSchedule = e.target.value;
          // changes the current schedule
          
          app.save();
          // saves the data
          
          app.displayTable();
          // displays the table
          
        }}>
          {("ABC").split("").map(e=>{return <option selected={app.currentSchedule == e ? true : undefined} value={e}>{e}</option>})}
        </select>
      </div>
      <div className="default-style tdr-schedule-app-page-container">
        <div style={{display:"flex",margin:"10px",marginLeft:"84px", position: "sticky",top: "4px"}}>
          <div className={"default-style"} style={{border:"none",margin: "0 4px",width: "100%"}}>
            Monday
          </div>
          <div className={" default-style "} style={{border:"none",margin: "0 4px",width: "100%"}}>
            Tuesday
          </div>
          <div className={" default-style "} style={{border:"none",margin: "0 4px",width: "100%"}}>
            Wednesday
          </div>
          <div className={" default-style "} style={{border:"none",margin: "0 4px",width: "100%"}}>
            Thursday
          </div>
          <div className={" default-style "} style={{border:"none",margin: "0 4px",width: "100%"}}>
            Friday
          </div>
        </div>
        
        <TDRScheduleAppContainer.Table/>
      </div>
    </div>
  );
}

TDRScheduleAppContainer.TableTimeSelect = function(props){
  
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
  // gets the app
  
  return (
    <select className="tdr-app-button default-style" style={{width: "60px",padding:"0",margin:"0"}} onChange={(e)=>{
      // the onchange for the select option
      
      var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
      // gets the app
      
      app.timeRanges[props.row] = e.target.value.split(",").map(e=>parseInt(e));
      // sets the time ranges
      
      var startTime = app.timeRanges[props.row].slice();
      // gets the starting time
      
      for (var row = props.row + 1; row < 30; row++) {
        // loops through all the rows
        
        startTime[0] += app.timePerClass[0];
        // adds the amount of hours
        
        startTime[1] += app.timePerClass[1];
        // adds the amount of minutes
        
        console.log(startTime);
        
        if (startTime[1] >= 60) {
          // checks if the amount of minutes exceeded an hour
          
          var amountOfHours = Math.floor(startTime[1] / 60);
          // gets the hours difference
          
          startTime[1] = startTime[1] % 60;
          // removes the left over chunk
          
          startTime[0] += amountOfHours;
          // adds the remaining hours
          
        }
        
        startTime[0] = Math.min(19, startTime[0]);
        // limits the time to not go beyond 7 PM
        
        app.timeRanges[row] = startTime.slice();
        // adds the time range
        
      }
      
      app.displayTable();
      // displays the table
      
      app.save();
      // saves the data
      
    }}>
      {([
        ["7:00 AM", [7,0]],
        ["7:05 AM", [7,5]],
        ["7:10 AM", [7,10]],
        ["7:15 AM", [7,15]],
        ["7:20 AM", [7,20]],
        ["7:25 AM", [7,25]],
        ["7:30 AM", [7,30]],
        ["7:35 AM", [7,35]],
        ["7:40 AM", [7,40]],
        ["7:45 AM", [7,45]],
        ["7:50 AM", [7,50]],
        ["7:55 AM", [7,55]],
        ["8:00 AM", [8,0]],
        ["8:05 AM", [8,5]],
        ["8:10 AM", [8,10]],
        ["8:15 AM", [8,15]],
        ["8:20 AM", [8,20]],
        ["8:25 AM", [8,25]],
        ["8:30 AM", [8,30]],
        ["8:35 AM", [8,35]],
        ["8:40 AM", [8,40]],
        ["8:45 AM", [8,45]],
        ["8:50 AM", [8,50]],
        ["8:55 AM", [8,55]],
        ["9:00 AM", [9,0]],
        ["9:05 AM", [9,5]],
        ["9:10 AM", [9,10]],
        ["9:15 AM", [9,15]],
        ["9:20 AM", [9,20]],
        ["9:25 AM", [9,25]],
        ["9:30 AM", [9,30]],
        ["9:35 AM", [9,35]],
        ["9:40 AM", [9,40]],
        ["9:45 AM", [9,45]],
        ["9:50 AM", [9,50]],
        ["9:55 AM", [9,55]],
        ["10:00 AM", [10,0]],
        ["10:05 AM", [10,5]],
        ["10:10 AM", [10,10]],
        ["10:15 AM", [10,15]],
        ["10:20 AM", [10,20]],
        ["10:25 AM", [10,25]],
        ["10:30 AM", [10,30]],
        ["10:35 AM", [10,35]],
        ["10:40 AM", [10,40]],
        ["10:45 AM", [10,45]],
        ["10:50 AM", [10,50]],
        ["10:55 AM", [10,55]],
        ["11:00 AM", [11,0]],
        ["11:05 AM", [11,5]],
        ["11:10 AM", [11,10]],
        ["11:15 AM", [11,15]],
        ["11:20 AM", [11,20]],
        ["11:25 AM", [11,25]],
        ["11:30 AM", [11,30]],
        ["11:35 AM", [11,35]],
        ["11:40 AM", [11,40]],
        ["11:45 AM", [11,45]],
        ["11:50 AM", [11,50]],
        ["11:55 AM", [11,55]],
        ["12:00 PM", [12,0]],
        ["12:05 PM", [12,5]],
        ["12:10 PM", [12,10]],
        ["12:15 PM", [12,15]],
        ["12:20 PM", [12,20]],
        ["12:25 PM", [12,25]],
        ["12:30 PM", [12,30]],
        ["12:35 PM", [12,35]],
        ["12:40 PM", [12,40]],
        ["12:45 PM", [12,45]],
        ["12:50 PM", [12,50]],
        ["12:55 PM", [12,55]],
        ["1:00 PM", [13,0]],
        ["1:05 PM", [13,5]],
        ["1:10 PM", [13,10]],
        ["1:15 PM", [13,15]],
        ["1:20 PM", [13,20]],
        ["1:25 PM", [13,25]],
        ["1:30 PM", [13,30]],
        ["1:35 PM", [13,35]],
        ["1:40 PM", [13,40]],
        ["1:45 PM", [13,45]],
        ["1:50 PM", [13,50]],
        ["1:55 PM", [13,55]],
        ["2:00 PM", [14,0]],
        ["2:05 PM", [14,5]],
        ["2:10 PM", [14,10]],
        ["2:15 PM", [14,15]],
        ["2:20 PM", [14,20]],
        ["2:25 PM", [14,25]],
        ["2:30 PM", [14,30]],
        ["2:35 PM", [14,35]],
        ["2:40 PM", [14,40]],
        ["2:45 PM", [14,45]],
        ["2:50 PM", [14,50]],
        ["2:55 PM", [14,55]],
        ["3:00 PM", [15,0]],
        ["3:05 PM", [15,5]],
        ["3:10 PM", [15,10]],
        ["3:15 PM", [15,15]],
        ["3:20 PM", [15,20]],
        ["3:25 PM", [15,25]],
        ["3:30 PM", [15,30]],
        ["3:35 PM", [15,35]],
        ["3:40 PM", [15,40]],
        ["3:45 PM", [15,45]],
        ["3:50 PM", [15,50]],
        ["3:55 PM", [15,55]],
        ["4:00 PM", [16,0]],
        ["4:05 PM", [16,5]],
        ["4:10 PM", [16,10]],
        ["4:15 PM", [16,15]],
        ["4:20 PM", [16,20]],
        ["4:25 PM", [16,25]],
        ["4:30 PM", [16,30]],
        ["4:35 PM", [16,35]],
        ["4:40 PM", [16,40]],
        ["4:45 PM", [16,45]],
        ["4:50 PM", [16,50]],
        ["4:55 PM", [16,55]],
        ["5:00 PM", [17,0]],
        ["5:05 PM", [17,5]],
        ["5:10 PM", [17,10]],
        ["5:15 PM", [17,15]],
        ["5:20 PM", [17,20]],
        ["5:25 PM", [17,25]],
        ["5:30 PM", [17,30]],
        ["5:35 PM", [17,35]],
        ["5:40 PM", [17,40]],
        ["5:45 PM", [17,45]],
        ["5:50 PM", [17,50]],
        ["5:55 PM", [17,55]],
        ["6:00 PM", [18,0]],
        ["6:05 PM", [18,5]],
        ["6:10 PM", [18,10]],
        ["6:15 PM", [18,15]],
        ["6:20 PM", [18,20]],
        ["6:25 PM", [18,25]],
        ["6:30 PM", [18,30]],
        ["6:35 PM", [18,35]],
        ["6:40 PM", [18,40]],
        ["6:45 PM", [18,45]],
        ["6:50 PM", [18,50]],
        ["6:55 PM", [18,55]]
      ])
      .map(data=>{return ( 
        <option value={data[1]} selected={(app.timeRanges[props.row] || []).join() == data[1].join() ? true : undefined}>
          {data[0]}
        </option>
      )})}
    </select>
    // <TDRCircleButton src="time-outline" onClick={props.onClick}/>  
  );
};

/**
 * @static TDRScheduleAppContainer
 * @property {fn(props: object)} TableRow - the table row page
 */
TDRScheduleAppContainer.TableRow = function(props){
  return (
    <div className="tdr-schedule-app-table-row">
      <div style={{margin: "auto",width: "80px"}}>
        <TDRScheduleAppContainer.TableTimeSelect row={props.row}/>
        <TDRCircleButton src="trash-outline"  onClick={props.onClick || (()=>{
          // the callback for when a new row is requested to be clicked
          
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
          // gets the app
          
          if (app.rowsDisplaying > 1) {
            // checks that there is more than one
            
            app.removeRow(props.index);
            // removes one from displaying
            
            app.displayTable();
            // displays the table
            
            app.save();
            // saves the data
            
          }
          
        })}/>
      </div>
      <div className="tdr-schedule-app-table-row-item">
        { props.children || 
        (<>
          <TDRScheduleAppContainer.TableItem/>
          <TDRScheduleAppContainer.TableItem/>
          <TDRScheduleAppContainer.TableItem/>
          <TDRScheduleAppContainer.TableItem/>
          <TDRScheduleAppContainer.TableItem/>
        </>
        )}
      </div>
    </div>
  );
};

/**
 * @static TDRScheduleAppContainer
 * @property {fn(props: object)} TableItem - the table item element
 */
TDRScheduleAppContainer.TableItem = function(props){
  
  var schoolClass = TeachDash.userData.getSchoolClassById(props.id);
  // gets the school class
  
  if (schoolClass) {
    // checks that the element can get the school class data
    
    props.children = schoolClass.name;
    // gets the name of the class
    
    props.className = `td-gradient-color-${schoolClass.gradientColor.className}-background-border`;
    // stylizes the class name
    
  }
  
  if (props.timeText) {
    // checks that the time text is defined
    
    props.timeText = props.timeText.split(",").map(e=>parseInt(e));
    // splits it
    
  }
  
  return (
    <div className={"tdr-schedule-app-table-item default-style " + (props.className || "")} style={{border:"none"}}>
      {schoolClass != undefined ? props.children : "No Classes"}
      <p>{props.timeText && !isNaN(props.timeText[0]) ? ((props.timeText[0] > 12 ? props.timeText[0] % 12 : props.timeText[0]) + ":" + (parseInt(props.timeText[1]) >= 10 ? props.timeText[1] : "0" + props.timeText[1]) + (props.timeText[0] > 11 ? " PM" : " AM")) : "No time"}</p>
      {schoolClass != undefined ? 
      (<TDRCircleButton src="trash-outline" style={{margin: "5px auto",display: "block",boxShadow:"none"}} onClick={(e=>{
          // when it was clicked
          
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
          // gets the app
          
          app.clearTime(props.row, props.col);
          // clears the item
        })}/>) : ""}
    </div>
  );
};

/**
 * @static TDRScheduleAppContainer
 * @property {fn(props: object)} Table - the table page
 */
TDRScheduleAppContainer.Table = function(props){
  return (
    <div className="tdr-schedule-app-table-container">
      <div className="tdr-schedule-app-table">
        
      </div>
      <TDRButton onClick={()=>{
        // the callback for when a new row is requested to be clicked
        
        var app = TeachDash.core.applications[TeachDash.core.idToNumber["schedule-app-id"]];
        // gets the app
        
        if (app.rowsDisplaying < 30) {
          // checks if the amount of rows is below the limit
          
          app.rowsDisplaying++;
          // adds one to the rows to be displayed
          
          app.displayTable();
          // displays the table
          
          app.save();
          // saves the data
          
        } else {
          // if the amount of rows is 30
          
          alert("Error you have exceeded the amount of rows for the schedule app.");
          // this alerts the user that the maximum is exceeded
        }
      }}>
        Add Another Row
      </TDRButton>
    </div>
  );
};
