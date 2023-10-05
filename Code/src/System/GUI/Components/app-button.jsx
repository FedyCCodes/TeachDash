
/**
 * @function TDRButton - this is the React element for the buttons (TDR stands for Teach Dash React)
 */
function TDRButton(props) {
  return (
    <button onClick={props.onClick || (function(){})} className={"tdr-app-button default-style " + (props.className || "")} style={props.style || {}}>
      {props.children}
    </button>
  )
}
