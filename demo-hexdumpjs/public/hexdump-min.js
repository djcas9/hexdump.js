// Hexdump.js 0.1.0
// (c) 2011 Dustin Willis Webber
// Hexdump is freely distributable under the MIT license.
// For all details and documentation:
// http://github.com/mephux/hexdump.js

var Hexdump;

Hexdump = (function() {
  
  // Hexdump Initializer
  // data => The string payload.
  // options => hexdump configurations
  function Hexdump(data, options) {
    var self = this;
    self.hexdump = [];
    
    self.options = {
        container: options.container || ''
      , width: options.width || 16
      , spacing: options.spacing || 0
      , ascii: options.ascii || false
      , lineNumber: options.lineNumber
      , html: options.html
      , style: {
          lineNumberLeft: options.style.lineNumberLeft || ''
        , lineNumberRight: options.style.lineNumberRight || ':'
        , stringLeft: options.style.stringLeft || '|'
        , stringRight: options.style.stringRight || '|'
        , hexLeft: options.style.hexLeft || ''
        , hexRight: options.style.hexRight || ''
        , hexNull: options.style.hexNull || '00'
        , stringNull: options.style.stringNull || ' '
      }
    };
    
    // Check for the line number option and turn it off 
    // if not set unless it has been explicitly turned
    // off by the user.
    var ln = self.options.lineNumber;
    if (typeof ln == "undefined" || ln == null) {
      self.options.lineNumber = true;
    };
    
    var html = self.options.html;
    if (typeof html == "undefined" || html == null) {
      self.options.html = true;
    };
    
    // Make sure spacing is within proper range.
    if (self.options.spacing > data.length) {
      self.options.spacing = data.length;
    };

    // Make sure width is within proper range.
    if (self.options.width > data.length) {
      self.options.width = data.length;
    };
    
    var regex = new RegExp('.{1,' + this.options.width + '}', 'g');
    self.data = data.match(regex);
    self.nullCount = (self.options.width - self.data[self.data.length - 1].length);
    
    self.hexCounter = 0;
    self.stringCounter = 0;
    for (var i=0; i < self.data.length; i++) {
      var tempData = self.process(self.data[i]);
      
      self.hexdump.push({
        data: tempData.data,
        string: tempData.string,
        length: self.data[i].length,
        missing: (self.options.width - self.data[i].length)
      });
    };
    
    self.dump();
  }
  
  Hexdump.prototype.dump = function() {
    var self = this;
    
    self.output = '';
    for (var i=0; i < self.hexdump.length; i++) {
      
      if (self.options.lineNumber) { 
        var tempLineNumberStyle = '';
        tempLineNumberStyle += self.options.style.lineNumberLeft;
        
        var currentLineCount = (i * self.options.width); //.toString(16);
        var temLineCount = 8 - currentLineCount.toString().length;
        for (var l=0; l < temLineCount; l++) {
          tempLineNumberStyle += '0';
        };
        
        tempLineNumberStyle += currentLineCount;
        tempLineNumberStyle += self.options.style.lineNumberRight + ' ';
        
        if (self.options.html) {
          self.output += '<span id="line-number">'+tempLineNumberStyle+'</span>';
        } else {
          self.output += tempLineNumberStyle;
        };
      };
      
      var spacingCount = 0;
      var breakPoint = Math.floor(self.options.width / 2);
      
      self.output += self.options.style.hexLeft;
      for (var x=0; x < self.hexdump[i].data.length; x++) {
        
        if (spacingCount == self.options.spacing) {
          if (x == self.hexdump[i].data.length - 1) {
            self.output += self.hexdump[i].data[x];
          } else {
            self.output += self.hexdump[i].data[x] + ' ';
          };
          spacingCount = 0;
        } else {
          self.output += self.hexdump[i].data[x];
          spacingCount++;
        };
      };
      self.output += self.options.style.hexRight;
      
      self.appendString(self.hexdump[i]);
      self.output += "\n";
    };
    
    var hexdump_container = document.getElementById(this.options.container);
    hexdump_container.innerHTML = this.output;
  };
  
  Hexdump.prototype.appendString = function(data) {
    var self = this;
    self.output += ' ' + self.options.style.stringLeft;
    self.output += data.string;
    self.output += self.options.style.stringRight;
  };
  
  Hexdump.prototype.process = function(data) {
    var self = this;
    var stringArray = [];
    var hexArray = [];
    
    for (var i=0; i < data.length; i++) {
      if (self.options.html) {
        hexArray.push('<span data-hex-id="' + self.hexCounter + '">' + toHex(data[i]) + '</span>');
        stringArray.push('<span data-string-id="' + self.hexCounter + '">' + checkForNonPrintable(data[i]) + '</span>');
      } else {
        hexArray.push(toHex(data[i]));
        stringArray.push(checkForNonPrintable(data[i]));
      };
      self.hexCounter++;
    };
    
    if (hexArray.length < self.options.width) {
      var amount = self.options.width - hexArray.length;
      for (var i=0; i < amount; i++) {
        var nullHex = '';
        
        if (self.options.html) {
          nullHex = '<span data-null="true">' + self.options.style.hexNull + '</span>';
        } else {
          nullHex = self.options.style.hexNull;
        };
        
        hexArray.push(nullHex);
      };
    };
    
    if (stringArray.length < self.options.width) {
      var stringAmount = self.options.width - stringArray.length;
      for (var i=0; i < stringAmount; i++) {
        var nullString = '';
        
        if (self.options.html) {
          nullString = '<span data-null="true">' + self.options.style.stringNull + '</span>';
        } else {
          nullString = self.options.style.stringNull;
        };
        
        stringArray.push(nullString);
      };
    };
    
    return { data: hexArray, string: stringArray.join('') };
  };
  
  function checkForNonPrintable(char) {
    var c = char.charCodeAt(0).toString(16);
    if (c == 0x9) {
      return '.';
    } else if (c == 0x7F){
      return '.';
    } else {
      return char;
    };
  };
  
  function toHex (characters) {
    for (var i=0; i < characters.length; i++) {
      var r = characters.charCodeAt(i).toString(16);
      if (r.length < 2) { 
        return "000" + r;
      } else if (r.length == 4) {
        return r;
      } else if (r.length == 3) {
        return "0" + r;
      } else { 
        return "00" + r;
      };
    };
  };
  
  return Hexdump;
})();