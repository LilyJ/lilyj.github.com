---
title: 'Devil is in the details'
date: 2014-01-03
tags: responsive web design, rewire leadership
---

## The devil is in the details

### Responsive web design kills

Modern devices are now have various height, width, and come with browser with different compatibility. Responsive web design (RWD) is undesirably inevitable. Love it, hate it. We all have to deal with it. 

What's a Responsive web design, first of all...

>Definition: Responsive Web design (RWD) is a Web design approach aimed at crafting sites to provide an optimal viewing experience—easy reading and navigation with a minimum of resizing, panning, and scrolling—across a wide range of devices (from mobile phones to desktop computer monitors). - [Wikipedia](http://en.wikipedia.org/wiki/Responsive_web_design)

For a visual learner like me, [this](http://mediaqueri.es/) is the visual illustration of RWD.

There are countless things that could go wrong with RWD. Here are the things that any web developer should bare in mind before jump right into RWD.


#### Wireframe
RWD makes wireframe a little more tricky. Most experts say go 'mobile first'. Looking from mobile perspective is a good start, but it comes with constrains. 

Some features can enhance usability for the big screen users are completely unnecessary and could create annoyance for the users of small devices like breadcrumbs, for example.

![breadcrumbs](/images/posts/1-3-14/breadcrumbs.png)

Different screen sizes yield different user experience, and developers shouldn't look at web design as a one-size-fits-all. There are a lot that you can do to maximize the user experience, no matter what devices they are using. 

Take a look at Rewire Leadership page for example and see how remodelling the index page and customize layout for different viewports can enhance user experience. 

![index_page_big](/images/posts/1-3-14/index_page_big_compare.png)

The layout is different for the small view

![index_page_small](/images/posts/1-3-14/index_page_small_compare.png)


#### Dynamic grid is your friend 
there are so many pre-made dynamic grid that you can make you hit the ground running. [Bootstrap](http://getbootstrap.com/) and [Foundation](http://foundation.zurb.com/) both have very good grid system. But if you like to be more hand-on, then be sure to define reasonable breakpoints and be consistent thoughout the site otherwise it could result in a nightmare like this.

![grid](/images/posts/1-3-14/grid.png)

![nightmare_grid](/images/posts/1-3-14/grid1.png)


Note: Media query just doesn't work with old IE :( However, if you lucky enough to have to deal with it, don't worry you are not alone. Check out [Respond.js](https://github.com/scottjehl/Respond), it will make your life a little easier. I promise.


#### Be careful with Table
I know I know. People say tables are old-fashion and boring, but sometimes you have no choice but to use table. Table is great for displaying big chunks of data. It makes data less messy and more readable.

When it comes to RWD, table can be a pain. Why? It simply doesn't shrink!. There are a number of tutorials out there regarding responsive table. What I found easy and reliable is the one by [Zurb Foundation](http://foundation.zurb.com/docs/components/tables.html). However, if avoidable table shouldn't be on the small screen at all.

![table](/images/posts/1-3-14/table_compare.png)


#### Choose the right background picture
Choosing the right background picture can be bit challenging. A good candidate is the one that still looks good even when the width becomes smaller. 

![background_bigview](/images/posts/1-3-14/background_bigview.png)

![background_smallview](/images/posts/1-3-14/background_smallview.png)

Alternatively, you can set a condition for browsers to render different background images for different viewports.

#### Dig deeper

Check out full Rewire Leadership site [BEFORE](http://rewire-leadership-2013-12-01.herokuapp.com/) and [AFTER](http://rewireleadership.com/) the remodification. 

Stay cool and keep coding.

Lily 


