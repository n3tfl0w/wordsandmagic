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
        if post.data["embeddable"]
          post.data["is_embed"] = true
          post.render(site.layouts, site.site_payload)
            post.write(site.dest, "index.amp.html")
          post.data["is_embed"] = false
        end
      end
    end
  end
end