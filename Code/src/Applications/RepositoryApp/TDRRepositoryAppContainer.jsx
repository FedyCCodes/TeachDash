// TDRRepositoryAppContainer.babel

/**
 * @function TDRRepositoryAppContainer - the schedule app container.
 */
function TDRRepositoryAppContainer(props) {
  
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
  // gets the app
  
  return (
    <div className="tdr-repository-app">
      <div className="tdr-repository-app-header default-style" style={{boxShadow:"none"}}>
        
        Current Folder:
        
        <div className="default-style tdr-repository-app-header-folder">
          Unknown Class
        </div>
        
        ,
        
        Layout Type: 
        
        <select className="default-style" defaultValue={app.itemsStyle} style={{padding:"5px", margin: "0 8px"}} onChange={(e)=>{
          // changes the 
          
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
          // gets the app
          
          app.setItemsStyle(e.target.value);
          // sets the items style
          
        }}>
          <option value="list">List</option>
          <option value="grid">Grid</option>
        </select>
        
      </div>
      <div className="tdr-repository-app-body tdr-repository-app-body-hide-preview" style={{boxShadow:"none"}}>
        <div className={"default-style tdr-repository-app-body-container tdr-repository-app-body-container-" + app.itemsStyle} onDrop={(e)=>{
          
          var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
          // gets the app
          
          app.onDragAndDrop(e);
          // runs the drag and drop
        }}>
          
        </div>
        <div className="tdr-repository-app-body-preview default-style"/>
      </div>
    </div>
  );
}

/**
 * @static TDRRepositoryAppContainer
 * @method PreviewFile - an element used to preview a file
 */
TDRRepositoryAppContainer.PreviewFile = function(props){
  
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
  // gets the app
  
  return (
    <div className="tdr-repository-app-body-preview-file" style={{width:"100%",height:"100%",position:"relative"}}>
      {
        props.fileType == "text" ? 
        (<textarea className="default-style tdr-repository-app-body-preview-file-textarea" value={props.data} style={{
          width: "calc(100% - 30px)",
          height: "calc(100% - 30px)",
          resize: "none"
        }} onchange={app.editPreviewFile}>
          
        </textarea>) : 
        (props.fileType == "image" ? 
        (<div style={{
          width: "calc(100% - 30px)",
          height: "calc(100% - 30px)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${props.data})`
        }}></div>) : 
        (
          <p>Invalid File Type</p>
        ))
      }
      <TDRCircleButton src="close" style={{boxShadow:"none",position:"absolute",bottom:"10px",right:"10px"}} onClick={()=>app.togglePreviewFrom(app.currentPreviewPath)}/>
    </div>
  );
  
};


/**
 * @static TDRRepositoryAppContainer
 * @method Files - list all the files
 */
TDRRepositoryAppContainer.Files = function(props){
  
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
  // gets the app
  
  return (
    <div>
      {app.currentEntries.map(entry=>{
        // gets the entry
        return (
          <TDRRepositoryAppContainer.Item entry={entry} fileName={entry.fileName} src={entry.src} onClick={entry.onClick} fullPath={entry.fullPath} fileFunctions={entry.fileFunctions}/>
        );
      })}
    </div>
  );
};

/**
 * @static TDRRepositoryAppContainer
 * @method Item - the item for files or folder
 */
TDRRepositoryAppContainer.Item = function(props) {
  
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
  // gets the app
  
  return (
    <div className="tdr-repository-app-body-item default-style" onClick={props.onClick || (function(){})} fullPath={props.fullPath}>
      <TDRIonicon src={props.src || props.icon || RepositoryApp.fileExtToIcon[props.fileName.split(".").pop()] || RepositoryApp.fileExtToIcon.default}/>
      <p>{props.fileName || "Unknown file"}</p>
      <div style={{float: "right"}}>
        <TDRCircleButton src={app.pinnedEntries.indexOf(props.fullPath) < 0 ? "add-circle-outline" : "remove-circle-outline"} style={{boxShadow:"none"}} onClick={()=>props.fileFunctions.pin(props.entry || props.fullPath)}/>
        <TDRCircleButton src={"eye-sharp"} style={{boxShadow:"none"}} onClick={()=>props.fileFunctions.preview(props.fullPath)}/>
        <TDRCircleButton src="open-outline" style={{boxShadow:"none"}} onClick={()=>props.fileFunctions.open(props.fullPath)}/>
        <TDRCircleButton src="trash-outline" style={{boxShadow:"none"}} onClick={()=>props.fileFunctions.remove(props.fullPath)}/>
      </div>
    </div>  
  );
};

/**
 * @function TDRRepositoryWidget - the schedule app container.
 */
function TDRRepositoryWidget(props) {
  
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["repository-app-id"]];
  // gets the app
  
  return (
    <div className="tdr-repository-widget">
      <div className="tdr-repository-widget-header default-style" style={{marginBottom:"10px",display:"flex"}}>
        Pinned Files: 
      </div>
      <div className="tdr-repository-widget-body tdr-repository-app-body-container-list default-style" style={{marginBottom:"10px",overflow:"scroll"}}>
        {app.pinnedEntries.map(entryPath=>{
          // gets the entry
          return (
            <TDRRepositoryAppContainer.Item fileName={entryPath.split("/").pop()} src={entryPath} fullPath={entryPath} fileFunctions={app.fileFunctions}/>
          );
        })}
      </div>
    </div>
  );
}
