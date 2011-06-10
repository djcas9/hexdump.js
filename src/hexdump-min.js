// Hexdump.js 0.1.0
// (c) 2011 Dustin Willis Webber
// Hexdump is freely distributable under the MIT license.
// For all details and documentation:
// http://github.com/mephux/hexdump.js
var Hexdump;
Hexdump=function(){function e(a,c){this.hexdump=[];this.options={container:c.container||"",width:c.width||16,spacing:c.spacing||0,ascii:c.ascii||!1,hexNull:c.hexNull||"  ",stringNull:c.stringNull||" ",left:c.left||"|",right:c.right||"|"};if(this.options.spacing>a.length)this.options.spacing=a.length;if(this.options.width>a.length)this.options.width=a.length;this.data=a.match(RegExp(".{1,"+this.options.width+"}","g"));this.nullCount=this.options.width-this.data[this.data.length-1].length;for(var b=
0;b<this.data.length;b++){var d=this.process(this.data[b]);this.hexdump.push({data:d.data,string:d.string,length:this.data[b].length,missing:this.options.width-this.data[b].length})}this.dump()}function f(a){for(;0<a.length;)return a=a.charCodeAt(0).toString(16),a.length<2?"0"+a:a}e.prototype.dump=function(){this.output="";for(var a=0;a<this.hexdump.length;a++){for(var c=0,b=0;b<this.hexdump[a].data.length;b++)c==this.options.spacing?(this.output+=this.hexdump[a].data[b]+" ",c=0):(this.output+=this.hexdump[a].data[b],
c++);this.appendString(this.hexdump[a]);this.output+="\n"}document.getElementById(this.options.container).innerHTML=this.output};e.prototype.appendString=function(a){this.output+=" "+this.options.left+""+a.string+""+this.options.right};e.prototype.process=function(a){for(var c=[],b=0;b<a.length;b++)c.push(f(a[b]));if(c.length<this.options.width){var d=this.options.width-c.length;for(b=0;b<d;b++)c.push(this.options.hexNull)}if(a.length<this.options.width){d=this.options.width-a.length;for(b=0;b<d;b++)a+=
this.options.stringNull}return{data:c,string:a}};return e}();
