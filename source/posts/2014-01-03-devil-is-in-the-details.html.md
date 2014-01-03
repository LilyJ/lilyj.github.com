---
title: 'Devil is in the details'
subtitle: 'Responsive web design kills'
date: 2014-01-03
tags: responsive web design, rewire leadership, css, web design
---

## The devil is in the details

### Responsive web design kills

Modern devices are now come in various shapes: some big, some small, some tall, some short. What it means to us, developers, is that we have to deal various heights and widths of the devices' screens. Oh and not to forget about browser compatibilities but we will leave that to later. 

Today we are talking about Responsive web design (RWD). RWD is a relatively new concept, it came out in May 2010 and became popular only about a little over a year ago. What's Responsive web design, first of all...

>Definition: Responsive Web design (RWD) is a Web design approach aimed at crafting sites to provide an optimal viewing experience—easy reading and navigation with a minimum of resizing, panning, and scrolling—across a wide range of devices (from mobile phones to desktop computer monitors). - [Wikipedia](http://en.wikipedia.org/wiki/Responsive_web_design)

For a visual learner like me, [this](http://mediaqueri.es/) is the visual illustration of RWD.

In my recent project working with [Rewire Leadership Institute](http://rewireleadership.com), I have a chance to remodel their website as well as set up foundation for the entire backend. From my experience, there are numerous things that could go wrong with RWD. Here are the major things that I think any web developer and designer should bare in mind before jump right into RWD.


#### Wireframe
RWD makes wireframe a little more tricky. Most experts say go 'mobile first'. Looking from mobile perspective is a good start, though it comes with constrains. 

There are features that can enhance usability for the big screen users but are completely unnecessary and could create annoyance for the users on small devices. Take a look at breadcrumbs, for example, though it makes navigating a little easier, it doesn't look good and is unnecessary on the small screens.

![breadcrumbs](/images/posts/1-3-14/breadcrumbs.png)

Different devices serve different purposes: a laptop may be better for working long hour which required typing, a tablet may be better for reading a book, but small devices like a phone is more portable and better for a quick media consumption. Because different devices meant to serve different purposes, it is something fundamentally different in the user experiences, developers therefore shouldn't look at web design as a one-size-fits-all. There are a lot that you can do to maximize the user experience, on different devices they are using. 

Take a look at Rewire Leadership front page for example and see how remodelling the index page by customizing layout for different viewports can enhance user experience and facilitate business goals. On the left is the before the remodelling and on the right is the one after. 

![index_page_big](/images/posts/1-3-14/index_page_big_compare.png)

Take a closer look on how the layout alters in a smaller viewport.

![index_page_small](/images/posts/1-3-14/index_page_small_compare.png)


#### Dynamic grid is your friend 
Dynamic grid allows the web layout to change when the screen becomes bigger or smaller. For instance, columns can stack on top of each other when the screen become smaller which make it easier to read on the tiny device. 

There are so many pre-made dynamic grid that you can make you hit the ground running. [Bootstrap](http://getbootstrap.com/) and [Foundation](http://foundation.zurb.com/) both have very good grid system. But if you are only looking for dynamic grid and not other of the Bootstrap's pre-made thingy. These are some good and reliable grid system that you can use:

* [Skeleton](http://www.getskeleton.com/)
* [Bourbon Neat](http://neat.bourbon.io/)
* [Susy](http://susy.oddbird.net/)

If you like to be more hand-on, then be sure to define reasonable breakpoints and be consistent throughout the site otherwise it could result in a nightmare like this.

![grid](/images/posts/1-3-14/grid.png)

![nightmare_grid](/images/posts/1-3-14/grid1.png)


Note: CSS Media queries don't work with an old IE (8 and earlier) :( but don't worry you are not alone. Check out [Respond.js](https://github.com/scottjehl/Respond), a lightweight JavaScript library made to enable RWD on the old IE. It will make your life a little easier. I promise.


#### Be careful with Table
I know I know. People say tables are old-fashion and boring, but sometimes you have no choice but to use table. Table is great for displaying big chunks of information. It makes data less messy and more readable.

When it comes to RWD, table can be a pain. Why? It simply doesn't shrink!. There are a number of tutorials out there regarding responsive table. What I found easy and reliable is the one by [Zurb Foundation](http://foundation.zurb.com/docs/components/tables.html). However, if avoidable table shouldn't be used on the small screen at all.

![table](/images/posts/1-3-14/table_compare.png)


#### Choose the right background picture
Choosing the right background picture in RWD can be bit challenging. A good candidate is the one that still looks good even when the width becomes smaller. 

![background_bigview](/images/posts/1-3-14/background_bigview.png)

![background_smallview](/images/posts/1-3-14/background_smallview.png)

Alternatively, you can set a condition for browsers to render different background images for different viewports. Go to [this](http://stuffandnonsense.co.uk/) page and playing around with it. This is my favorite one so far.

#### Dig deeper

Check out full Rewire Leadership site [BEFORE](http://rewire-leadership-2013-12-01.herokuapp.com/) and [AFTER](http://rewireleadership.com) the remodelling. 

Stay cool and keep coding.

Lily 


