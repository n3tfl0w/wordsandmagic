Jekyll::Hooks.register :posts, :post_render do |post, payload|
  docExt = post.extname.tr('.', '')
  # only process if we deal with a markdown file
  if payload['site']['markdown_ext'].include? docExt
    newContent = post.content.gsub(/\!\[(.+)\]\((images.+|wp-content.+)\)/, '{% responsive_image path: \2 alt: \1  %}')
    img_url = post.content.match(/\!\[.+\]\((images.+|wp-content.+)\)/)
    post.content = newContent
    post.data['imagea'] = img_url[1] if img_url != nil
  end
end