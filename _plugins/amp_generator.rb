# Create a generator that creates a second amp page for every post. Using a seperate template.

# Import a file with array of html to amp html tags - like emoji plugin.

# In those pages - replace html tags with amp versions of the same tags
module Jekyll
  # override write and destination functions to taking optional argument for pagename
  class Post
    def destination(dest, pagename)
      # The url needs to be unescaped in order to preserve the correct filename
      path = File.join(dest, CGI.unescape(self.url))
      path = File.join(path, pagename) if template[/\.html$/].nil?
      path
    end

    def write(dest, pagename="index.html")
      path = destination(dest, pagename)
      puts path
      FileUtils.mkdir_p(File.dirname(path))
      File.open(path, 'w') do |f|
        f.write(self.output)
      end
    end
  end

  # the cleanup function was erasing our work
  class Site
    def cleanup
    end
  end

  class EmbedPostGenerator < Generator
    safe true
    priority :low
    def generate(site)
      site.posts.each do |post|
        if post.data["layout"] == 'article'
            post.data["layout"] = "articleamp"
            post.content = replace(post.content)
            post.render(site.layouts, site.site_payload)
            post.write(site.dest, "index.amp.html")
            post.data["layout"] = 'article'
        end
      end
    end
    def replace(content)
        content.gsub!(/ü/, '&uuml;')
        content.gsub!(/Ü/, '&Uuml;')
        content.gsub!(/ö/, '&ouml;')
        content.gsub!(/Ö/, '&Ouml;')
        content.gsub!(/ä/, '&auml;')
        content.gsub!(/Ä/, '&Auml;')
        content.gsub!(/ß/, '&szlig;')
        content.gsub!(/ẞ/, '&#7838;')

        content
    end
  end
end