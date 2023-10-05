// TDRSettingsAppContainer.babel

/**
 * @function TDRSettingsAppContainer - the settings app container.
 */
function TDRSettingsAppContainer(props) {
  
  var app = TeachDash.core.applications[TeachDash.core.idToNumber["settings-app-id"]];
  // gets the application
  
  return (
    <div className="tdr-settings-app">
      <div>
        <h2>Settings App</h2>
        <h3>General:</h3>
        <div className="tdr-settings-app-item default-style">
          <span>Set Animation type:</span>
          <TDRButton onClick={()=>TeachDash.userData.setAnimationMode(false)}>Minimal</TDRButton>
          <TDRButton onClick={()=>TeachDash.userData.setAnimationMode(true)}>Normal</TDRButton>
        </div>
        <div className="tdr-settings-app-item default-style">
          <span>Set Notification type:</span>
          <TDRButton onClick={()=>TeachDash.userData.setNotificationMode(true)}>On</TDRButton>
          <TDRButton onClick={()=>TeachDash.userData.setNotificationMode(false)}>Off</TDRButton>
        </div>
        <div className="tdr-settings-app-item default-style">
          <span>Set dark mode to:</span>
          <button className="tdr-app-button system-style" onClick={()=>TeachDash.userData.setColorMode()}>System</button>
          <button className="tdr-app-button light-style" onClick={()=>TeachDash.userData.setColorMode("body-light")}>Light</button>
          <button className="tdr-app-button dark-style" onClick={()=>TeachDash.userData.setColorMode("body-dark")}>Dark</button>
        </div>
        <div className="tdr-settings-app-item default-style">
          <span>Open path of data:</span>
          <TDRButton onClick={()=>TeachDash.core.fs.openFolderWithApp(new TDFSSimplified().getFullPath())}>Open Folder</TDRButton>
        </div>
        <h3>About:</h3>
        <div className="tdr-settings-app-item default-style">
          Version: { TeachDash.version }
          <br/>
          Update Log: 
          <br/>
          {TeachDash.updateText.split("\n").map(e=>
            <>
              {e}<br/>
            </>
          )}
        </div>
        <div className="tdr-settings-app-item default-style" style={{display:"block"}}>
          Made with:
          <ul>
            <li>
              <TDRIonicon src="logo-nodejs"/>Node.JS (version: { process.versions.node }) 
            </li>
            <li><TDRIonicon src="logo-electron"/>ElectronJS (version: { process.versions.electron })</li>
            <li><TDRIonicon src="logo-react"/>ReactJS (version: { React.version })</li>
            <li><TDRIonicon src="logo-css3"/>Less (version: 4.1.1)</li>
            <li><TDRIonicon src="logo-ionic"/>Ionic (for ionicons)</li>
            <li><TDRIonicon src="logo-google"/>Google Fonts</li>
          </ul>
        </div>
        <div className="tdr-settings-app-item default-style" style={{display:"block"}}>
          Compatible with:
          <ul>
            <li><TDRIonicon src="logo-apple"/>MacOS</li>
            <li><TDRIonicon src="logo-windows"/>Windows</li>
            <li><TDRIonicon src="logo-tux"/>Linux</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
