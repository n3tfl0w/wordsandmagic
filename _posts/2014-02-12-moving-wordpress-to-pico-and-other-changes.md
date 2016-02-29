---
title: Moving From WordPress to Pico and other changes
description: I had two goals - try to streamline my writing experience and to simplify the reading experience on my site.
feat_pic: /images/street.jpg
pic_attr: By Glen Carrie - http://www.cocopine.co.za/ from unsplash.com
Date: 2014/02/12
Author: Dan O’Neill
layout: article
---

I’ve started to use different writing tools recently and that has led to a change in how I view my site here. I’m using [editorially](https://editorially.com) and iA Writer almost exclsuively for writing. They offer a distraction free writing experience for someone like me who has grown up with 25 tabs open and was bitten by the “always be formatting” bug. 

Then after the writing was finished, I would then open wordpress and format the hell out of it. I had some nice touches to my theme - pull quotes and negative left and right margined images. I liked the look of it but maintaining it became a pain - I would try to show off these little touches in every article. The content would then be relegated behind my presentation, and that **distraction free writing experience didn’t translate to a distraction free reading experience**.

So I had two goals - try to streamline my writing experience and to simplify the reading experience on my site.

First goal was solved by a nice little flat file CMS called Pico by [dev7studios](http://pico.dev7studios.com/index.html). As mentioned above I was already writing in markdown friendly environments. Pico was then perfect - just drop the .md file into a folder and its done. Pico has some nice features but a great template system based on [twig](http://twig.sensiolabs.org/). 

The way I used it was to create a base html file with a header, footer, and so on, with block that could be replaced by child template files. for example here’s my child article template file:

{% highlight ruby %}

{% endhighlight %}

Blocks in child files replace similarly named blocks in the parent file, but can inherit anything from the parent by adding the parent() function. So I can add specific css files for a particular child template with ease, without having to add it to every single page. Same with javascript files - instead of loading them on every page - only load them on pages that require them. It can be tough enough to get your head around the first time but I was able to figure it out pretty quickly.

So while all of that made my writing experience a little more - actually a lot more - streamlined, I then had to think of my second goal: making the reading experience a little more less distracting too - because I could have just recreated my current WordPress theme for Pico. I didn’t want that.

So I stripped out anything that wasn’t being used, or that wasn’t absolutely beautiful. Menu on every page that no-one ever used? Gone. Negative margined left and right floating images? Gone. I actually went back and forth with myself about having a “homepage” as such, but decided for it just in case.

Maybe some of you are asking *“Wait a second, you don’t have a menu any more?”* Nope. Nobody ever used it. People arrived from Google or Facebook or Twitter and then left - so why worry about the effort.

I also gutted my css files. One of the things about my last theme was it grew steadily over time - I kept adding things over time. I went from a 23kb css file with a tonne of (over) customization to a 8kb file where I thought about everything I added. 

I upped my default text size, made all images align centrally, as do blockquotes. The odd time I post code the pre blocks are now nice and basic. 

One thing I did keep though is the large header image on articles. It’s my one extravagance on this site, I suppose. And maybe they don’t really work - but I don’t care :-D 

So the site is cleaner and clearer and easier to “use”. So I think I managed to complete goal two too. Though if you come across anything or have any questions - feel free to get in touch.



