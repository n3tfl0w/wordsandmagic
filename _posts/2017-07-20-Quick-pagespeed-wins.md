---
title: Quick ways to increase your pagespeed score
description: I went from 4/100 to 97/100 with these small fixes
author: Dan O’Neill
date: 2017/07/20
layout: article
---

Instead of doing actual real work yesterday, I procrastinated and decided to take a look at my [Google Pagespeed](https://developers.google.com/speed/pagespeed/) score again. I've always kind of cheated and run it against my index page - [Dan O'Neill](http://wordsandmagic.com) - which is basically just some links and some text. Even then my score wasn't great - around the 74 mark. But I decided to run it on one of my more beefy posts yesterday ([Six of the very best space pictures](http://wordsandmagic.com/2017/07/12/Space-my-favourite-pictures/)) and was amazed when I got a score of 4. 4/100. Woeful. So decided to take a look and see what I could do and in the end got my score to 97/100.

![some of my many page speed problems](/images/pagespeed.jpg)

### Enabling Compression using .htaccess file.
So I thought I had already done this. I'd been using the h5bp .htaccess file, but I was still getting errors about some of my minified css and my javascript files. Turns out I was using an old version of the file, so updating to the newest version immediately cleared the errors - [Apache Server Configs v2.14.0](https://github.com/h5bp/server-configs-apache).

Obviously if you don't know what you're doing here, you can do some real damage to your website **so use with care**. There is a compression section at line 713 of the [h5bp .htaccess file](https://github.com/h5bp/server-configs-apache/blob/master/dist/.htaccess) if you just want to look at that, as this was the section that fixed my issues.

### Minifying resources
This is a very simple one - after you run the pagespeed tool, at the bottom of the page it will give you minified versions of your css and javascript files (along with optimised images but more on that soon). Just replace your header css and js links with the new minified versions. I was already serving minified versions of my css but I had missed some of js files I use for embedded video resizing. Keep a backup of your un-minified files as the minified versions are unreadable and all but impossible to modify.

### Eliminate render-blocking JavaScript and CSS in above-the-fold content and Optimse CSS delivery
This one took the most amount of work for me as it took me a while to understand what this point was trying to tell me. Essentially, only 6% of my content that was on the screen when my page loaded could be rendered without making another request for either some script or some CSS file to display the content correctly.

I decided to fix the javascript first. This meant setting my javascript header links to defer loading the file or making the javascript load asynchronously like so:

```
<script defer src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script async src="/scripts/modernizr-2.6.2-respond-1.1.0.min.js"></script>
<script defer src="/scripts/cookiechoices.js"></script>
<script defer src="/scripts/jquery.fitvids.js"></script>
```

I also moved my own javascript into a small file and used the following script in my footer to only load it later.

```
<script>
    function downloadJSAtOnload() {
        var element = document.createElement("script");
        element.src = "/page.js";
        document.body.appendChild(element);
        }
        if (window.addEventListener)
        window.addEventListener("load", downloadJSAtOnload, false);
        else if (window.attachEvent)
        window.attachEvent("onload", downloadJSAtOnload);
        else window.onload = downloadJSAtOnload;
</script>
```

Then came the CSS cleanup and this took more work. The first step was to find the critical path css required by my page. For this, I used a number of tools with varying degrees of success but the best by far seemed to be [Jonas Ohlsson's critical path css generator](https://jonassebastianohlsson.com/criticalpathcssgenerator/). You place your URL in the top text field (1), copy all of your css content into another text field (2) and click generate. For me this meant copying the content of three minified css files into the second text field.

The tool then generates your critical path css. You inline this css in your <head> section. To then load the rest of the files, use the following handy section of code that google provides [https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery) at the end of your file near the </body> tag.

```
<noscript id="deferred-styles">
    <link rel="stylesheet" href="/css/normalize.min.css">
    <link rel="stylesheet" href="/css/1140.min.css">
    <link rel="stylesheet" href="/css/main.min.css?v=1.0.1">
    <link href="https://fonts.googleapis.com/css?family=Spectral:500,500i" rel="stylesheet" type='text/css'>
</noscript>
<script>
    var loadDeferredStyles = function() {
    var addStylesNode = document.getElementById("deferred-styles");
    var replacement = document.createElement("div");
    replacement.innerHTML = addStylesNode.textContent;
    document.body.appendChild(replacement)
    addStylesNode.parentElement.removeChild(addStylesNode);
    };
    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
      webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
    else window.addEventListener('load', loadDeferredStyles);
</script>
```

### Optimize Images
This one is probably where the biggest gains come from on a page with big images like this page - [Six of the very best space pictures](http://wordsandmagic.com/2017/07/12/Space-my-favourite-pictures/), but where I can probably least pass on any knowledge. There are a few online tools for optimizing images that are useful, and in fact the [Google Pagespeed tool](https://developers.google.com/speed/pagespeed/) will also provide you with optimised versions of your imagery.

However, I use a combination of [Jekyll](https://jekyllrb.com/) and [Grunt](https://gruntjs.com/) to build my website so I wanted something with a bit more automation involved. Luckily I came across this handy grunt plugin - [grunt-responsive-images](https://github.com/andismith/grunt-responsive-images). This plugin creates a set of images for you of a number of sizes using GraphicsMagick or ImageMagick. It allows you to add a number of options on each image like size, name, quality etc. but importantly allows you to set your own custom input options using CustomIn. I was able to use this to set the options I found on [this stackoverflow post](https://stackoverflow.com/questions/7261855/recommendation-for-compressing-jpg-files-with-imagemagick) so that every image was re-created using these options:
- -quality 85%
- -sampling-factor 4:2:0
- -interlace line
- -strip

These options greatly reduced my file sizes and helped me clear this error from my pagespeed report. Using some of the other options could even net you further reductions so best to use some trial and error to see what results you like personally. 
