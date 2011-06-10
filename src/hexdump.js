// Hexdump.js 0.1.0
// (c) 2011 Dustin Willis Webber
// Hexdump is freely distributable under the MIT license.
// For all details and documentation:
// http://github.com/mephux/hexdump.js

var Hexdump;

Hexdump = (function() {
  
  // Hexdump Initializer
  function Hexdump(data, options) {
    var self = this;
    self.hexdump = [];
    
    self.options = {
      container: options.container || '',
      width: options.width || 16,
      spacing: options.spacing || 0,
      ascii: options.ascii || false,
      hexNull: options.hexNull || '  ',
      stringNull: options.stringNull || ' ',
      left: options.left || '|',
      right: options.right || '|'
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
    
    for (var i=0; i < self.data.length; i++) {
      var tempData = self.process(self.data[i])
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
      
      var spacingCount = 0;
      for (var x=0; x < self.hexdump[i].data.length; x++) {
        
        if (spacingCount == self.options.spacing) {
          self.output += self.hexdump[i].data[x] + ' ';
          spacingCount = 0;
        } else {
          self.output += self.hexdump[i].data[x];
          spacingCount++;
        };
      };
      
      self.appendString(self.hexdump[i]);
      self.output += "\n";
    };
    
    var hexdump_container = document.getElementById(this.options.container);
    hexdump_container.innerHTML = this.output;
  };
  
  Hexdump.prototype.appendString = function(data) {
    var self = this;
    self.output += " " + self.options.left + "" + data.string + "" + self.options.right;
  };
  
  Hexdump.prototype.process = function(data) {
    var self = this;
    
    var hexArray = [];
    for (var i=0; i < data.length; i++) {
      hexArray.push(toHex(data[i]));
    };
    
    if (hexArray.length < self.options.width) {
      var amount = self.options.width - hexArray.length;
      for (var i=0; i < amount; i++) {
        hexArray.push(self.options.hexNull);
      };
    };
    
    if (data.length < self.options.width) {
      var stringAmount = self.options.width - data.length;
      for (var i=0; i < stringAmount; i++) {
        data += self.options.stringNull;
      };
    };
    
    return { data: hexArray, string: data };
  };
  
  function toHex (characters) {
    for (var i=0; i < characters.length; i++) {
      var r = characters.charCodeAt(i).toString(16);
      if (r.length < 2) { return "0" + r } else { return r }
    };
  };
  
  return Hexdump;
})();