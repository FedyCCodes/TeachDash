// StyleSheet.objectify.js

/**
 * @static StyleSheet
 * @method objectify - the method used to convert a string into an object
 * @param {string} style - the style of the string
 * @return {Object} result - the result of the conversion
 */
StyleSheet.objectify = (style)=>{
  
  var result = {},
  // a variable for the result
  
    styles = style.split(';');
  // seperates it by different style
  
  for (var i = 0; i < styles.length; i++) {
    // loops through all the styles
    
    var currentStyle = styles[i].split(':');
    // gets the current style
    
    var definition = currentStyle.splice(0,1)[0];
    // gets the definition
    
    definition = definition.split("-");
    // splits the definition
    
    if (definition.length == 1) {
      // checks if there is only one splited chunk of the definition
      
      definition = definition[0];
      // shrinks to the first element
      
      if (definition != "") {
        // checks that the definition is not empty
        
        result[definition.split(" ").join("")] = currentStyle.join(':');
        // stores the result
      }
    } else {
      // checks if there is multiple splited chunks of the definition
      
      definition = definition.map(e=>{
        // goes through each of the chunks
        
        return e.replace(e[0], e[0].toUpperCase());
        // makes the first letter upper case
        
      }).join("");
      // combines the chunks
      
      definition = definition.replace(definition[0], definition[0].toLowerCase());
      // makes the first letter lowercase
      
      if (definition != "") {
        // checks that the definition is not empty
        
        result[definition.split(" ").join("")] = currentStyle.join(':');
        // stores the result
      }
    }
  }
  
  return result;
  // returns the result
};
