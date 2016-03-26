# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'jekyll-auto-image/version'

Gem::Specification.new do |spec|
  spec.name          = "jekyll-auto-image-amp"
  spec.version       = Jekyll::AutoImage::VERSION
  spec.authors       = ["merlos,n3tfl0w"]
  spec.email         = ["jmmerlos@merlos.org"]
  spec.summary       = %q{jekyll plugin that makes available the first image of a post in the template}
  spec.description   = %q{jekyll plugin that makes available the first image of a post in the template}
  spec.homepage      = "https://github.com/merlos/jekyll-auto-image"
  spec.license       = "MIT"

  spec.files         = Dir['LICENSE.md', 'README.md', 'lib/**/*']
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "jekyll", '~> 2.0'
  
  spec.add_development_dependency "bundler", "~> 1.5"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "shoulda"
  spec.add_development_dependency "mocha"
  
end
