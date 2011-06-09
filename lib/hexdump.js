var Hexdump = {

  toHex: function( number ) {
    var r = number.toString(16);
    if (r.length < 2) { return "0" + r } else { return r }
  },
  
  dump: function(data, options){
    var byte_width, byte_format, temp;
    var hexdump = [];

    this.options = {
      container: options.container || '',
      width: options.width || 16,
      spacing: options.spacing || 2,
      base: options.base || 'hexadecimal',
      ascii: options.ascii || false,
    }
    
    // Make sure spacing is within proper range.
    if (this.options.spacing > data.length) {
      this.options.spacing = data.length / 2;
    };

    // Make sure width is within proper range.
    if (this.options.width > data.length) {
      this.options.width = data.length / 2;
    };
    
    temp = ''
    var regex = new RegExp('.{1,' + this.options.width + '}', 'g');
    var tempArray = data.match(regex);
    var fillCount = (this.options.width - tempArray[tempArray.length - 1].length);
    
    console.log('Width: ' + this.options.width);
    console.log('Spacing: ' + this.options.spacing);
    console.log('Total Length: ' + data.length);
    console.log('Fill Count: ' + fillCount);
    
    for (var i=0; i < tempArray.length; i++) {
      var chars = tempArray[i];

      var tempSpacing = 0;
      for (var x=0; x < chars.length; x++) {
        tempSpacing++;
        
        var tempByte = chars.charCodeAt(x);
        
        if (this.options.spacing == tempSpacing) {
          temp += Hexdump.toHex(tempByte);
          temp += ' ';
          tempSpacing = 0
        } else {
          temp += Hexdump.toHex(tempByte);
        };
        
      };
      
      hexdump.push({
        data: temp,
        string: chars
      });
      
      temp = ''
    };
    
    for (var i=0; i < hexdump.length; i++) {
      if (i == (hexdump.length - 1)) {
        
        var tempSpacingCount = this.options.spacing / 2;
        var moreSpacingCount = this.options.width * 2;
        var currentCount = hexdump[i].data.replace(/ /g,'').length;
        
        if ((this.options.spacing * 2) < currentCount) {
          var appendFill = (fillCount * 2);
        } else {
          var appendFill = (currentCount - (this.options.spacing * 2) / 2);
        };
        
        if (appendFill <= 0){
          var nullFill = ((moreSpacingCount - currentCount)) / 2;
        } else {
          var nullFill = (((moreSpacingCount - currentCount) - appendFill) / 2);
        };
        
        temp += hexdump[i].data
        
        console.log('Other Count: ' + (this.options.spacing * 2))
        console.log('more Spacing Count: ' + moreSpacingCount);
        console.log('Current Count: ' + currentCount)
        
        console.log('Null Fill: ' + nullFill);
        console.log('Append Fill: ' + appendFill);

        
        if (moreSpacingCount > currentCount) {
          if (! (appendFill < 0)) {
            for (var s=0; s < appendFill; s++) {
              temp += '.'
            };
            temp += ' '
          };
        };
        
        tempSpacing = 0;
        for (var x=0; x < nullFill; x++) {
          tempSpacing++
          
          if (this.options.spacing == tempSpacing) {
            temp += '.. ';
            tempSpacing = 0;
          } else {
            temp += '..';
          };
          
        };
        
        var tempstring = ''
        for (var f=0; f < (this.options.width - hexdump[i].string.length); f++) {
          tempstring += ' ';
        };

        temp += ' |' + hexdump[i].string + tempstring + '|';
      } else {
        temp += hexdump[i].data + ' |' + hexdump[i].string + '| \n';
      };  
    };
    
    var hexdump_container = document.getElementById(this.options.container);
    hexdump_container.innerHTML = temp;
    console.log('-------------------');
  }
};