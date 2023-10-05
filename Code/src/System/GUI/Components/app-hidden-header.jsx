// app-hidden-header-button.babel


/**
 * @function TDRHiddenHeader - this is the React element for the header (TDR stands for Teach Dash React)
 */
function TDRHiddenHeader(props) {
  return (
    <div className="tdr-app-hidden-header">
      <TDRCircleButton src={"contract-outline"} className="tdr-app-hidden-header-zoom-out" onClick={()=>TeachDash.core.headerBar.zoomApp()}/>
    </div>
  );
}
