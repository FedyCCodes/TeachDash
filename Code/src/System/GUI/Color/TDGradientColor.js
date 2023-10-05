// TDGradientColor.js

/**
 * @class TDGradientColor - this is the class for the gradient color
 */
function TDGradientColor(data) {
  
  if (data == undefined) {
    // checks if data doesn't have any information
    
    data = {};
    // creates information so there is no errors
  }
  
  /**
   * @class TDGradientColor
   * @property {string} className - the valid css class name used 
   */
  this.className = data.className || TDGradientColor.amountOfGradients++;
  
  /**
   * @class TDGradientColor
   * @property {number} angle - the gradient angle if it is needed to be changed (from 0 to 360)
   */
  this.angle = data.angle || 145;
  
  /**
   * @class TDGradientColor
   * @property {TDColor} color1 - this is the first color of the gradient
   */
  this.color1 = data.color1 || new TDColor();
  
  /**
   * @class TDGradientColor
   * @property {TDColor} color2 - this is the second color of the gradient
   */
  this.color2 = data.color2 || new TDColor();
  
  /**
   * @class TDGradientColor
   * @property {number} duration - how long the duration will last in milliseconds
   */
  this.duration = 300;
  
  /**
   * @class TDGradientColor
   * @method generateGradientAnimation - this is a function used to get all the needed gradients because there is no native gradient changer
   * @param {TDGradientColor} gradient - the gradient to change to
   * @returns {[string]} gradients - a list of all 
   */
  this.generateGradientAnimation = function(gradient) {
    
    var splitted = 60;
    // gets the amount of frames that will be used in changing the color
    
    var differenceGradient = new TDGradientColor({
      // gets the gradient difference to see how many steps it will take to complete it
      
      color1: new TDColor({
        // the first color
        
        arr: [
          // in array form
          
          (this.color1.red - gradient.color1.red) / splitted,
          // the red separated for each frame
          
          (this.color1.green - gradient.color1.green) / splitted,
          // the green separated for each frame
          
          (this.color1.blue - gradient.color1.blue) / splitted
          // the blue separated for each frame
          
        ]
      }),
      
      color2: new TDColor({
        // the second color
        
        arr: [
          // in array form
          
          (this.color2.red - gradient.color2.red) / splitted,
          // the red separated for each frame
          
          (this.color2.green - gradient.color2.green) / splitted,
          // the green separated for each frame
          
          (this.color2.blue - gradient.color2.blue) / splitted
          // the blue separated for each frame
          
          
        ]
      })
      
    });
    
    differenceGradient.color1 = new TDColor({ arr: [
      // removes any negatives from the first color
      
      differenceGradient.color1.red < 0 ? -differenceGradient.color1.red : differenceGradient.color1.red,
      // does it to the red
      
      differenceGradient.color1.green < 0 ? -differenceGradient.color1.green : differenceGradient.color1.green,
      // green
      
      differenceGradient.color1.blue < 0 ? -differenceGradient.color1.blue : differenceGradient.color1.blue
      // and blue
    ]});
    
    differenceGradient.color2 = new TDColor({ arr: [
      // removes any negatives from the second color
      
      differenceGradient.color2.red < 0 ? -differenceGradient.color2.red : differenceGradient.color2.red,
      // does it to the red
      
      differenceGradient.color2.green < 0 ? -differenceGradient.color2.green : differenceGradient.color2.green,
      // green
      
      differenceGradient.color2.blue < 0 ? -differenceGradient.color2.blue : differenceGradient.color2.blue
      // and blue
    ]});
    
    
    var startGradient = this.getBackgroundCSS();
    // gets the initial gradient
    
    var gradients = [startGradient];
    // this is an array for all the gradients with the starting gradient
    
    for (var i = 1; i < splitted + 1; i++) {
      // this is a for loop for all of the gradients
      
      var color1Negative = {
        // this is an object for the negative of the color 1
        
        red: this.color1.red > gradient.color1.red ? -1 : 1,
        // for the red
        
        green: this.color1.green > gradient.color1.green ? -1 : 1,
        // green
        
        blue: this.color1.blue > gradient.color1.blue ? -1 : 1
        // and blue
      };
      var color2Negative = {
        // this is an object for the negative of the color 2
        
        red: this.color2.red > gradient.color2.red ? -1 : 1,
        // for the red
        
        green: this.color2.green > gradient.color2.green ? -1 : 1,
        // green
        
        blue: this.color2.blue > gradient.color2.blue ? -1 : 1
        // and blue
      };
      
      var newGradient = new TDGradientColor({
        // creates a new gradient to add to the list
        
        color1: new TDColor({
          // the first color
          
          arr: [
            // in array form
            
            this.color1.red + (differenceGradient.color1.red * i * color1Negative.red),
            // the red
            
            this.color1.green + (differenceGradient.color1.green * i * color1Negative.green),
            // green
            
            this.color1.blue + (differenceGradient.color1.blue * i * color1Negative.blue)
            // and blue
          ]
        }),
        
        color2: new TDColor({
          // the second color
          
          arr: [
            // in array form
            
            this.color2.red + (differenceGradient.color2.red * i * color2Negative.red),
            // the red
            
            this.color2.green + (differenceGradient.color2.green * i * color2Negative.green),
            // green
            
            this.color2.blue + (differenceGradient.color2.blue * i * color2Negative.blue)
            // and blue
            
          ]
        })
        
      });
      
      gradients.push(newGradient.getBackgroundCSS());
      // gets the  css from the newly created gradient
    }
    
    var endGradient = gradient.getBackgroundCSS();
    // creates the final gradient
    
    gradients.push(endGradient);
    // adds it to the array
    
    return gradients;
    // returns the data
  }; 
  
  /**
   * @class TDGradientColor
   * @method animate - this is a method to animate a gradient item to go from one color to another
   * @param {HTMLElement} element - the html element where the change should be applied to
   * @param {TDGradientColor}  gradient - the final gradient that it should end up as
   * @param {number} time - (optional) the amount of time that is spent for the animation (default is 300 milliseconds)
   * @param {fn(percentage:number)->Boolean} callback - a callback that acts whenever a frame happened with the first parameter as the percentage in a 0 to 1 float scale and to stop the animation the function would need to return false
   * @param {fn()} endCallback - just the callback to when the animation is complete, no inputs or outputs needed
   */
  this.animate = function(element, gradient, time, callback, endCallback){
    
    var createdAnimation = this.generateGradientAnimation(gradient);
    // gets all the generated gradient
    
    time = time || TDCore.standardTime;
    // sets the time as 300 milliseconds if it is not given (from the standard time)
    
    var initalSize = createdAnimation.length;
    // gets the length of the size
    
    element.style.background = createdAnimation.shift();
    // gets the initial frame
    
    var timePerRepeat = Math.floor(time / initalSize);
    // gets the milliseconds used per change
    
    callback = callback || (function(){return true;});
    // defines the callback if it is undefined
    
    endCallback = endCallback || (function(){});
    // defines the callback if it is undefined
    
    function animateNextGradient() {
      // this is the function for the next frame
      
      if (createdAnimation.length > 0) {
        // checks if the created animation is complete uet
        
        var currentGradient = createdAnimation.shift();
        // gets the current gradient
        
        element.style.background = currentGradient;
        // sets the gradient to the element
        
        var allowsContinues = callback(
          // gets the value to see if the animation can contiue
          
          (initalSize - createdAnimation.length) / initalSize
          // inputs the percentage of how complete the animation is
        );
        
        if (allowsContinues != false) {
          // if the callback did not return false
          
          setTimeout(animateNextGradient, timePerRepeat);
          // it continues the animation
        }
        
      } else {
        // if the animation is complete
        
        callback((initalSize - createdAnimation.length) / initalSize);
        // it calls the callback
        
        endCallback();
        // and then activates the end callback
      }
    }
    
    setTimeout(animateNextGradient, timePerRepeat);
    // this activates the animation 
  };
  
  /**
   * @class TDGradientColor
   * @method getCSSText - the total css text combination
   * @returns {string} css - the css result
   */
  this.getCSSText = function(){
    
    return `background:${this.getBackgroundCSS()};border:${this.getBorderCSS()};box-shadow:${this.getShadowCSS()};`;
    // returns the background and shadow and border together
    
  };
  
  /**
   * @class TDGradientColor
   * @method getBackgroundCSS - gets the background value for the gradient
   * @returns {string} css - the css result
   */
  this.getBackgroundCSS = function(){
    
    if (this.color1.toHex() != this.color2.toHex()) {
      // checks that both colors are different
      
      return `linear-gradient(${this.angle}deg, ${this.color1.toHex()} 0%,${this.color2.toHex()} 100%)`;
      // sets the linear gradient value
      
    } else {
      // checks if they are the same
      
      return this.color1.toHex();
      // returns only the first color to improve preformance
    }
  };
  
  /**
   * @class TDGradientColor
   * @method getBorderCSS - gets the border value from the gradient
   * @returns {string} css - the css result
   */
  this.getBorderCSS = function(){
    
    if (this.color1.toHex() != this.color2.toHex()) {
      // checks that both colors are different
      
      return `2px solid ${this.color1.getAdd(this.color2).toHex()}`;
      // sets the border value
      
    } else {
      // checks if they are the same
      
      return `2px solid ${this.color1.toHex()}`;
      // returns only the first color to improve preformance
    }
  };
  
  /**
   * @class TDGradientColor
   * @method getShadowCSS - gets the shadow value from the gradient
   * @param {TDGradientColor} gradient - if there is a gradient to be merged with 
   * @returns {string} css - the css result
   */
  this.getShadowCSS = function(gradient){
    
    if (gradient == undefined) {
      // checks that the color parameter is being used
      
      return `-5px -5px 20px ${this.color1.toHex()}7f, 5px 5px 20px ${this.color2.toHex()}7f`;
      // sets the border value (there is no if statement to check if they are different because there is no preformance improvement)
      
    } else {
      // checks that the color parameter is used
      
      return `-5px -5px 20px ${
        // sets the border value based on
        
        this.color1.getAdd(gradient.color1).toHex()
        // the two first colors together
        
      }7f, 5px 5px 20px ${
        
        this.color2.getAdd(gradient.color2).toHex()
        // the two second colors together
      }7f`;
      
    }
  };
  
  /**
   * @class TDGradientColor
   * @method getGlassCSS - gets the glass effect for the color
   * @returns {string} css - the css result
   */
  this.getGlassCSS = function(){
    
    var presetCss = `-webkit-backdrop-filter: saturate(180%)blur(8px);backdrop-filter: saturate(180%)blur(8px);`;
    // this is some css text that is needed to add the glass effect
    
    if (this.color1.toHex() != this.color2.toHex()) {
      // checks that both colors are different
      
      return `background:linear-gradient(${this.angle}deg, ${this.color1.toHex()}b8 0%,${this.color2.toHex()}b8 100%);` + presetCss;
      // sets the linear gradient value
      
    } else {
      // checks if they are the same
      
      return "background:" + this.color1.toHex() + "b8;" + presetCss;
      // returns only the first color to improve preformance
    }
    
  };
  
  /**
   * @class TDGradientColor
   * @method addCSS - this is a method used to add the css data
   */
  this.addCSS = function(){
    
    TDCore.addCSS(`
.td-gradient-color-${this.className} {${this.getCSSText()}transition: box-shadow ${TDCore.standardTime}ms;}
.td-gradient-color-${this.className}-background{background:${this.getBackgroundCSS()}}
.td-gradient-color-${this.className}-border{border:${this.getBorderCSS()}}
.td-gradient-color-${this.className}-background-border{background:${this.getBackgroundCSS()};border:${this.getBorderCSS()}}
.td-gradient-color-${this.className}:hover {background: ${this.getBackgroundCSS()};border:${this.getBorderCSS()};box-shadow: none;}
.td-gradient-color-${this.className}-glass{${this.getGlassCSS()}}
`);
    // adds the css from the core
    
  };
  
  if (data.className) {
    // checks if the class name has already been defined
    
    this.addCSS();
    // this adds the css gradient data to the head so it can be used
    
    TDGradientColor[data.className] = TDGradientColor.classNames[data.className] = this;
    // this stores the data from the class name
    
  }
  
}

/**
 * @static TDGradientColor
 * @property {number} amountOfGradients - the total amount of gradients that have been made
 */
TDGradientColor.amountOfGradients = 0;

/**
 * @static TDGradientColor
 * @property {[string: TDGradientColor]} classNames - stores all the class names
 */
TDGradientColor.classNames = {};

// document.body.style.background = TDGradientColor.whiteGradient.getBackgroundCSS();TDGradientColor.whiteGradient.animate(document.body, TDGradientColor.darkGrayGradient, 300, console.log, e=>console.log("completed"));
/*
document.body.style.background = TDGradientColor.whiteGradient.getBackgroundCSS();TDGradientColor.whiteGradient.animate(document.body, TDGradientColor.darkGrayGradient, 300, console.log, e=>{
document.body.style.background = TDGradientColor.darkGrayGradient.getBackgroundCSS();TDGradientColor.darkGrayGradient.animate(document.body, TDGradientColor.whiteGradient, 300, console.log, e=>console.log("completed"));
});
*/

