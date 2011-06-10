require 'rubygems'
require 'closure-compiler'

HEADER = /((^\s*\/\/.*\n)+)/

desc "Use the Closure Compiler to compress Underscore.js"
task :build do
  source  = File.read('hexdump.js')
  header  = source.match(HEADER)
  min     = Closure::Compiler.new.compress(source)
  
  File.open('hexdump-min.js', 'w') do |file|
    file.write header[1].squeeze(' ') + min
  end
end

desc "Build the docco documentation"
task :doc do
  sh "docco hexdump.js"
end