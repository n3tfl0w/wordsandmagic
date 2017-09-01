---
title: Can't install RMagick 2.16.0. Can't find MagickWand.h.
description: After a recent build I came across this error.
author: Dan O’Neill
date: 2017/09/01
layout: article
---

I was running a build of my site when I hit the following error: "Can't install RMagick 2.16.0. Can't find MagickWand.h."

![Photo by Markus Spiske on Unsplash](/images/markus-spiske-207946.jpg)

I had the following logs (I've abbreviated them for space):

```
Build started.
Pulling image jekyll/jekyll:3.4
Creating image started.
Sending build context to Docker daemon  2.048kB

Step 1/10 : FROM jekyll/jekyll:3.4
 ---> 131e7647f128
Step 2/10 : RUN apk add --no-cache imagemagick
 ---> Running in 459d10b95ee4
fetch http://dl-cdn.alpinelinux.org/alpine/v3.6/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.6/community/x86_64/APKINDEX.tar.gz
.
.
.
(20/20) Installing imagemagick (7.0.5.10-r0)
Step 3/10 : RUN apk add --no-cache imagemagick-dev
 ---> Running in edee017fe6d3
fetch http://dl-cdn.alpinelinux.org/alpine/v3.6/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.6/community/x86_64/APKINDEX.tar.gz
(1/2) Installing imagemagick-c++ (7.0.5.10-r0)
(2/2) Installing imagemagick-dev (7.0.5.10-r0)
.
.
.
Step 7/10 : RUN gem install rmagick
 ---> Running in a2c976ea58ce
Building native extensions.  This could take a while...
ERROR:  Error installing rmagick:
	ERROR: Failed to build gem native extension.

    current directory: /usr/local/bundle/gems/rmagick-2.16.0/ext/RMagick
/usr/local/bin/ruby -r ./siteconf20170831-7-nke7aj.rb extconf.rb
checking for gcc... yes
checking for Magick-config... no
checking for pkg-config... yes
checking for outdated ImageMagick version (<= 6.4.9)... no
checking for presence of MagickWand API (ImageMagick version >= 6.9.0)... no
checking for Ruby version >= 1.8.5... yes
checking for stdint.h... yes
checking for sys/types.h... yes
checking for wand/MagickWand.h... no

Can't install RMagick 2.16.0. Can't find MagickWand.h.
*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.
.
.
.
The command '/bin/sh -c gem install rmagick' returned a non-zero code: 1
Build failed !!!.
```

After quite a bit of Google it turns out that RMagick 2.16.0 is not compatible with the newest version of ImageMagick (Version 7), but it looks like its [only on older versions of Ruby](https://stackoverflow.com/questions/39494672/rmagick-installation-cant-find-magickwand-h).

It looks like my only way out of this is to [install an older version of ImageMagick](http://antoniolorusso.com/2017/01/29/rmagick-and-imagemagick-7/) - specifically version 6, but on Alpine Linux that doesn't seem to be as straight forward as other versions of linux.  Then I came across this [superuser answer by Vlad Frolov](https://superuser.com/a/1057145). Turns out I had to add the repo for the older version of Alpine using the following command:

```
echo 'http://dl-cdn.alpinelinux.org/alpine/v3.5/main' >> /etc/apk/repositories
```

Then I could specifically request the older version of ImageMagick

```
apk add --no-cache imagemagick=6.9.6.8-r1
```
