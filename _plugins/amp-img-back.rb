Jekyll::Hooks.register :posts, :pre_render do |post, payload|
  docExt = post.extname.tr('.', '')
  # only process if we deal with a markdown file
  if payload['site']['markdown_ext'].include? docExt
    newContent = post.content.gsub(/\<img src="(.+)" alt="(.+)"/, '{% responsive_image path: \1 alt: \2  %}')
    img_url = post.content.match(/\<img src="(.+)" alt="(.+)"/)
    post.content = newContent
    post.data['imagea'] = img_url[1] if img_url != nil
  end
end
