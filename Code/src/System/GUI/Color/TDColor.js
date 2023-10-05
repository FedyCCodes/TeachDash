// TDColor.js

/**
 * @class TDColor - this is the class that contains color information
 */
function TDColor(data) {
  
  if (data === undefined) {
    // checks if data doesn't have any information
    
    data = {};
    // creates information so there is no errors
  }
  
  if (data.arr !== undefined) {
    // checks if the array object was used to create the color
    
    data.red = data.arr[0];
    // sets the red
    
    data.green = data.arr[1];
    // sets the green
    
    data.blue = data.arr[2];
    // sets the blue
    
  }
  
  /**
   * @class TDColor
   * @property {number} red - the red data from the color (0 to 255 integer)
   */
  this.red = data.red != undefined ? data.red : 255;

  /**
   * @class TDColor
   * @property {number} green - the green data from the color (0 to 255 integer)
   */
  this.green = data.green != undefined ? data.green : 255;

  /**
   * @class TDColor
   * @property {number} blue - the blue data from the color (0 to 255 integer)
   */
  this.blue = data.blue != undefined ? data.blue : 255;

  /**
   * @class TDColor
   * @property {number} alpha - the alpha data from the color (0 to 1 float)
   */
  this.alpha = data.alpha != undefined ? data.alpha : 1;
  
  if (data.hex != undefined) {
    // checks if a hex value already exists
    
    this.setFromHex(data.hex);
    // this puts in the hex value
  }
  
  /**
   * @class TDColor
   * @method setFromHex - a function to set the hex value into the data value
   * @param {string} hex - the hexadecimal value that wants to be converted
   */
  this.setFromHex = function(hex){
    
    hex = hex.replace("#", "");
    // removes any hashtags in the string
    
    switch (hex.length) {
      // this is a switch statement for the amount of data
      
      case 3:
        // this one is if the form is in style of "#fff" (#rgb) with a default to 1
        
        this.red = (parseInt(hex[0], 16) / 15) * 255;
        // gets the value of red
        
        this.green = (parseInt(hex[1], 16) / 15) * 255;
        // gets the value of green
        
        this.blue = (parseInt(hex[2], 16) / 15) * 255;
        // gets the value of blue
        
        this.alpha = 1;
        // gets the value of alpha
        
        break;
      
      case 4:
        // this one is if the form is in style of "#ffff" (#rgba)
        
        this.red = (parseInt(hex[0], 16) / 15) * 255;
        // gets the value of red
        
        this.green = (parseInt(hex[1], 16) / 15) * 255;
        // gets the value of green
        
        this.blue = (parseInt(hex[2], 16) / 15) * 255;
        // gets the value of blue
        
        this.alpha = (parseInt(hex[3], 16) / 15) * 1;
        // gets the value of alpha
        
        break;
      
      case 6:
        // this one is if the form is in style of "#ffffff" (#rrggbb) with a default to 1
        
        this.red = parseInt(hex.substring(0, 2), 16);
        // gets the value of red
        
        this.green = parseInt(hex.substring(2, 4), 16);
        // gets the value of green
        
        this.blue = parseInt(hex.substring(4, 6), 16);
        // gets the value of blue
        
        this.alpha = 1;
        // gets the value of alpha
        
        break;
      
      case 8:
        // this one is if the form is in style of "#ffffffff" (#rrggbbaa) 
        
        this.red = parseInt(hex.substring(0, 2), 16);
        // gets the value of red
        
        this.green = parseInt(hex.substring(2, 4), 16);
        // gets the value of green
        
        this.blue = parseInt(hex.substring(4, 6), 16);
        // gets the value of blue
        
        this.alpha = parseInt(hex.substring(6, 8), 16) / 255;
        // gets the value of alpha
        
        break;
      
      default:
        // this is incase none of the cases are met
        
        console.warn("Warning TDColor: You probably have an invalid hexadecimal string please fix it.");
        
    }
    
  };

  /**
   * @class TDColor
   * @method toHex - a function used to get the hex value of the color
   * @param {number} type - the type that dictates how the hex value should be returned (default is 6)
   * @returns {string} hex - the hex value of the number
   */
  this.toHex = function(type){
    
    type = type || 6;
    // makes the default value of type 6
    
    var hex = "#";
    // this is the return value of the hexadecimal
    
    switch (type) {
      case 3:
        // if the format wanted is "#fff"
        
        hex += (
          // sets the hex value
          
          Math.floor((this.red / 255) * 15).toString(16) + 
          // gets the red value
          
          Math.floor((this.green / 255) * 15).toString(16) + 
          // gets the green value
          
          Math.floor((this.blue / 255) * 15).toString(16)
          // gets the blue value
        );
        
        break;
        
      case 4:
        // if the format wanted is "#ffff"
        
        hex += (
          // sets the hex value
          
          Math.floor((this.red / 255) * 15).toString(16) + 
          // gets the red value
          
          Math.floor((this.green / 255) * 15).toString(16) + 
          // gets the green value
          
          Math.floor((this.blue / 255) * 15).toString(16) +
          // gets the blue value
          
          Math.floor(this.alpha * 15).toString(16)
          // gets the alpha value
        );
        
        break;
        
      case 6:
        // if the format wanted is "#fff"
        
        hex += (
          // sets the hex value
          
          (this.red > 15 ? Math.floor(this.red).toString(16) : "0" + Math.floor(this.red).toString(16)) + 
          // gets the red value
          
          (this.green > 15 ? Math.floor(this.green).toString(16) : "0" + Math.floor(this.green).toString(16)) + 
          // gets the green value
          
          (this.blue > 15 ? Math.floor(this.blue).toString(16) : "0" + Math.floor(this.blue).toString(16))
          // gets the blue value
          
        );
        
        break;
        
      case 8:
        // if the format wanted is "#fff"
        
        hex += (
          // sets the hex value
          
          (this.red > 15 ? Math.floor(this.red).toString(16) : "0" + Math.floor(this.red).toString(16)) + 
          // gets the red value
          
          (this.green > 15 ? Math.floor(this.green).toString(16) : "0" + Math.floor(this.green).toString(16)) + 
          // gets the green value
          
          (this.blue > 15 ? Math.floor(this.blue).toString(16) : "0" + Math.floor(this.blue).toString(16)) + 
          // gets the blue value
          
          (this.alpha * 255 > 15 ? Math.floor(this.alpha * 255).toString(16) : "0" + Math.floor(this.alpha * 255).toString(16))
          // gets the alpha value
        );
        
        break;
      default:
        // puts in default
        
        hex = "#000000";
        // leaves the color as black
    }
    
    return hex;
    // returns the hex value
    
  };
  
  /**
   * @class TDColor
   * @method add - this adds the color to the current color
   * @param {TDColor} color - this gets the color to be added
   */
  this.add = function(color){
    
    this.red = (color.red + this.red) / 2;
    // this adds the red
    
    this.green = (color.green + this.green) / 2;
    // this adds the green
    
    this.blue = (color.blue + this.blue) / 2;
    // this adds the blue
    
    this.alpha = (color.alpha + this.alpha) / 2;
    // this adds the alpha
    
  };
  
  /**
   * @class TDColor
   * @method getAdd - this adds the color to the current color in a string form
   * @param {TDColor} color - this gets the color to be added
   * @returns {TDColor} mixedColor - the mixed color that was created
   */
  this.getAdd = function(color){
    
    var mixedColor = new TDColor();
    // this gets a new color to change
    
    mixedColor.red = Math.floor((color.red + this.red) / 2);
    // this adds the red
    
    mixedColor.green = Math.floor((color.green + this.green) / 2);
    // this adds the green
    
    mixedColor.blue = Math.floor((color.blue + this.blue) / 2);
    // this adds the blue
    
    mixedColor.alpha = Math.floor((color.alpha + this.alpha) / 2);
    // this adds the alpha
    
    return mixedColor;
    // returns the color in hex value
    
  };
  
  /**
   * @class TDColor
   * @method setFromRgb - description
   * @param {String} rgb - description
   * DEPRYCATED
   */
  /*this.setFromRgb = function(rgb){
    
  };*/

  /**
   * @class TDColor
   * @method toRgb - description
   * @param {}  - description
   * DEPRYCATED
   */
  /*this.toRgb = function(){
    
  };*/
}

/*
NOTE:
- I discovered a really frustrating bug within using "||" with number values. It turns out if the main value is "0" it translates to "false" because since "||" is technically an OR operator for if statements it only takes what is true
*/

