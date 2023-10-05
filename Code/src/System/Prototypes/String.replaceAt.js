// String.prototype.replaceAt.js

/**
 * @class String
 * @method replaceAt - a function to replace a specific character because you cannot edit a specific character using [] notation
 * @param {number} index - the index to change
 * @param {string} replacement - the text to replace
 * @returns {string} str - returns the edited text
 */
String.prototype.replaceAt = function(index, replacement) {
  
  var str = this.slice(0, index);
  // gets the string from start to the index
  
  str += replacement;
  // adds the replacement character
  
  str += this.slice(1 + index, this.length);
  // adds the string after the index until the end
  
  return str;
  // returns the string
};
