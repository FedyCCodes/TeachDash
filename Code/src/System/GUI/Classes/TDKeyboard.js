// TDKeyboard.js

/**
 * @class TDKeyboard - the keyboard short cuts that are created to simplify user interaction
 */
function TDKeyboard() {
  
  /**
   * @class TDKeyboardShortcuts
   * @property {object} keyCodes - all the key codes stored by for the system
   */
  this.keyCodes = {"backspace":8,"tab":9,"enter":13,"shift":16,"caps_lock":20,"escape":27,"space":32,"delete":46,"left_arrow":37,"up_arrow":38,"right_arrow":39,"down_arrow":40,"0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57,"a":65,"b":66,"c":67,"d":68,"e":69,"f":70,"g":71,"h":72,"i":73,"j":74,"k":75,"l":76,"m":77,"n":78,"o":79,"p":80,"q":81,"r":82,"s":83,"t":84,"u":85,"v":86,"w":87,"x":88,"y":89,"z":90};
  
  /**
   * @class TDKeyboardShortcuts
   * @property {[object]} data - all the keyboard short cuts that are stored
   */
  this.shortcuts = [];
  
  /**
   * @class TDKeyboardShortcuts
   * @method addShortcut - this is a function to add a short cut for the user
   * @param {string} key - this is the text of how to add the short cut in form of "ctrl a" (ctrl and cmd are interchangable)
   * @param {fn()} callback - the function that is run by the code
   */
  this.addShortcut = function(keyValues, callback){
    
    var splitedKeys = keyValues.toLowerCase().split(" ");
    // splits the text data
    
    var keyData = {};
    // a variable for to simplify the key data
    
    if ((splitedKeys.includes("ctrl") || splitedKeys.includes("cmd")) && (!splitedKeys.includes("!ctrl") && !splitedKeys.includes("!cmd"))) {
      // checks if the control or command key is used and checks that individual keys are not called
      
      keyData.metaKey = keyData.ctrlKey = true;
      // turns it to true
    }
    
    if (splitedKeys.includes("!ctrl")) {
      // if the ctrl key only is requested
      
      keyData.ctrlKey = true;
      // makes it sent to the data
      
    }
    
    if (splitedKeys.includes("!cmd")) {
      // if the ctrl key only is requested
      
      keyData.metaKey = true;
      // makes it sent to the data
      
    }
    
    if (splitedKeys.includes("shift")) {
      // checks if the shift key is requested
      
      keyData.shiftKey = true;
      // makes the shift key requested
      
    }
    
    
    if (splitedKeys.includes("alt") || splitedKeys.includes("option")) {
      // checks if the alt or option button is requested
      
      keyData.altKey = true;
      // tells the code that the key is being used
      
    }
    
    keyData.keyCodes = [];
    // defines the key code
    
    for (var key of splitedKeys) {
      // a for loop for all the left over keys
      
      if (this.keyCodes[key]) {
        // checks if there is a keycode for the key that is being used
        
        keyData.keyCodes.push(this.keyCodes[key]);
        // adds the key code
        
      }
      
    }
    
    this.shortcuts.push({
      // adds to the data
      
      keyData,
      // stores the key data
      
      callback
      // puts the callback
      
    });
    
  };
  
  addEventListener("keydown", function(event){
    // this adds a callback for when the key down is clicked
    
    for (var shortcut of TeachDash.core.keyboard.shortcuts) {
      // loops through all the keyboard short cuts
      
      if (shortcut.keyData.metaKey && !event.metaKey) {
        // checks if the meta key is defined but it is not used
        
        return;
        // stops the code
        
      }
      
      if (shortcut.keyData.ctrlKey && !event.ctrlKey) {
        // checks if the control key is defined but it is not used
        
        return;
        // stops the code
        
      }
      
      if (shortcut.keyData.shiftKey && !event.shiftKey) {
        // checks if the shiftKey key is defined but it is not used
        
        return;
        // stops the code
        
      }
      
      if (shortcut.keyData.altKey && !event.altKey) {
        // checks if the alt key is defined but it is not used
        
        return;
        // stops the code
        
      }
      
      for (var keyCode of shortcut.keyData.keyCodes) {
        // loops through all the key codes to see if one of them is valid
        
        if (keyCode != event.keyCode) {
          // checks if the key code that is being searched is not used
          
          return;
          // stops the code
          
        }
        
      }
      
      console.log(shortcut);
      
      event.preventDefault();
      // disables the preset code
      
      shortcut.callback();
      // runs the code for the custom shortcut
      
    }
    
  });
  
}
