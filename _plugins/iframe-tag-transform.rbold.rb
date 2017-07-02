Jekyll::Hooks.register :posts, :pre_render do |post, payload|
  docExt = post.extname.tr('.', '')
  # only process if we deal with a markdown file
  if payload['site']['markdown_ext'].include? docExt
    newContent = post.content.gsub(/<iframe (height="\d+" width="\d+"|width="\d+" height="\d+") src="(.*embed\/([^"]+))".+<\/iframe>|<iframe src="(.*embed\/([^"]+))" (height="\d+" width="\d+"|width="\d+" height="\d+").+<\/iframe>/,'<iframe \\1\\6 layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" src="\\2\\4"><img src="//img.youtube.com/vi/\\3\\5/0.jpg" layout="fill" placeholder></img></iframe>')
    post.content = newContent
  end
end