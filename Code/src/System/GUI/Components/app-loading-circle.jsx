// app-loading-circle.babel

/**
 * @function TDRLoadingCircle - this is the element for loading circles (TDR stands for Teach Dash React)
 */
function TDRLoadingCircle(props) {
  return (
    <div className="default-style tdr-app-circle-loading">
      <div className="tdr-app-circle-loading-container">
        <div className="tdr-app-circle-loading-ring" style={{
          background: TDGradientColor.lightYellow.getBackgroundCSS()
        }}></div>
        <svg viewBox="0 0 36 36" className="tdr-app-circle-loading-svg">
          <path className="tdr-app-circle-loading-svg-path" strokeDasharray="20, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        </svg>
        <div className="tdr-app-circle-loading-fill default-style-no-add"></div>
        <svg xmlns='http://www.w3.org/2000/svg' className='tdr-app-circle-loading-ionicon' viewBox='0 0 512 512'></svg>
      </div>
    </div>
  );
}

/*

TeachDash.core.startingFrame.changeLoadingCircleTo(document.getElementsByClassName("test-animation")[0], "success");

*/