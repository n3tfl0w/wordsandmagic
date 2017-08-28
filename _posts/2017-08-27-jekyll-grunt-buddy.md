---
title: Jekyll, Grunt, and Buddy
description: I needed a way to reliably deploy my site that wasn't tethered to one machine.
author: Dan O’Neill
date: 2017/07/28
layout: article
---

So after years playing with Wordpress, I moved to flat file html, using various systems to build this site. Recently I've been using [Jekyll](https://jekyllrb.com/) for that with [Grunt](https://gruntjs.com/) for some nice pre and post processing. This was a great setup for a little while. But it had one fairly annoying limitation - at least for me anyway - I was tied to doing everything on one machine. Being a systems administrator this single point of failure was annoying.

![Photo by Markus Spiske on Unsplash](/images/markus-spiske-207946.jpg)

This single point of failure was *especially* annoying when I couldn't replicate my build process on another machine, a raspberry pi that I had lying around in my house, in the hopes of having my website build process separated from the laptop that I take everywhere. I tried for days, and although I had some pretty convoluted processing ([Google's amp](https://www.ampproject.org/), image size processing, etc) that I'm sure made it way more complicated than it needed to be, I couldn't get it to work in a way that resembled my current setup.

It was incidental then that for another project I came across [Buddy](https://buddy.works/). I wasn't able to use it for that other project but it seemed absolutely perfect for what I needed for my personal site.

Buddy lets you create a pipeline of actions built around a shared file system. So I made the leap and moved my blog content and required Jekyll files to a github repo. Buddy can then check for commits to that repo and start a pipeline of actions. In my case this looked like so:

- A grunt action -- this does some up front basics. Minifies my css using the grunt-contrib-cssmin grunt plugin and creates images in various sizes of whatever images I upload for a new article using the grunt-responsive-images plugin by [Andi Smith](https://github.com/andismith/grunt-responsive-images).
- A Jekyll Build command -- This is a simple incremental build command. _*NB*_: Don't forget to change ownership of the build directory to jekyll:jekyll
- Then there's another grunt action -- This time running the very handy grunt plugin: responsive_images_extender by [Stephan Max](https://github.com/stephanmax/grunt-responsive-images-extender). This plugin allows me to replace img html within files that Jekyll produced with an img html block with srcset attributes including the different file size images that I created in step 1.
- Finally I run a built-in buddy FTP job that copies the files to my hosting. I know I could just copy the files back to github and host them from there but I like having my site hosted from an Irish hosting company that I've been dealing with for years.

So now, whenever I make a commit to the master branch of my github repo, it rebuilds my site using buddy. It was super fast when I was using their trial paid tier, but a bit slower now on the free tier. That said, for my purposes it's absolutely fine. Another benefit to doing this is that I simplified some of processing, and believe I now have a build process that I could migrate to another service with only a little work.

A few cons of course:

- Locally, I was able to build my site to localhost - meaning only I could see the many many errors that tend to creep into my posts. This new process means when I commit a blog post, its live within a minute or so - warts and all. I think I could get around this my using a second pipeline to build to a private URL for draft posts, but again I'm not overly bothered by this - the benefits outweigh that small niggle.
-  Build time is a little slower now that I've moved to the free tier in buddy. However if that's a problem for you - Buddy has paid tiers for more important work.

I have a few more improvements to make around some of the changes I made to my site to [increase my pagespeed score](http://wordsandmagic.com/2017/07/20/Quick-pagespeed-wins/) but overall this process suits my needs pretty well. 
