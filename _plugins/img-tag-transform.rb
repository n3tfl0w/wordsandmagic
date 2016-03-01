class ResponsiveImageify < Jekyll::Converter
    priority :normal

  def matches(ext)
    ext.downcase == ".md"
  end
    
  def output_ext(ext)
      ".html"
    end

  def convert(content)
    content.gsub(/\!\[(.+)\]\((images.+)\)/, '{% responsive_image path: \2 alt: \1  %}')
  end
end