require 'rubygems'
require 'fileutils'
require 'closure-compiler'

HEADER = /((^\s*\/\/.*\n)+)/

desc "Use the Closure Compiler to compress hexdump.js"
task :build do
  source  = File.read('src/hexdump.js')
  header  = source.match(HEADER)
  min     = Closure::Compiler.new.compress(source)
  
  hexdump = File.open('src/hexdump-min.js', 'w') do |file|
    file.write header[1].squeeze(' ') + min
  end
  
end
