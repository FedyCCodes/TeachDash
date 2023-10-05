// app-circle-button.babel

/**
 * @function TDRCircleButton - this is the React element for the circle buttons (TDR stands for Teach Dash React)
 */
function TDRCircleButton(props){
  return (
    <button onClick={props.onClick || (function(){})} className={"tdr-app-circle-button default-style " + (props.className || "")} style={props.style || {}}>
      <TDRIonicon src={props.src || props.icon}/>
    </button>
  );
}

