---
title: 'Devil is in the details'
subtitle: 'Responsive web design kills'
date: 2014-01-05
tags: responsive web design, rewire leadership, css, web design
---

## The devil is in the details

### Responsive web design kills

Modern devices come in various shapes: some big, some small, some tall, some short. What it means for us, developers, is that we have to elegantly deal with various size viewports. Oh, and don't forget about browser compatibility. That's always...fun? 

Let's talk about Responsive Web Design (RWD). RWD is web design with the goal of creating sites that are easily usable across a range of device types (generally phone, tablet, and laptop/desktop). RWD is a relatively new concept, coined in 2010 and only became popular within the last year or so. [These](http://mediaqueri.es/) are some great examples, especially if you are a visual learner like me.

In my recent project working with [Rewire Leadership](http://rewireleadership.com), I remodeled their website to be responsive. There are numerous things that make RWD challenging. Here are some lessons I learned that developers and designers should bear in mind before implementing RWD.

#### Wireframe
RWD makes wireframes more tricky. Most experts advise developing "'mobile first," which means developing for a small viewport and touchscreen first. This is probably a good idea but comes with some constraints that you should be aware of. 

There are features that can enhance usability for the big screen users but are completely unnecessary and could create annoyance for the users on small devices. For example, take a look at these breadcrumbs. Though they make navigating a little easier on large screens, they look terrible and are unnecessary on small screens.

![breadcrumbs](/images/posts/1-3-14/breadcrumbs.png)

Different devices serve different purposes: a laptop may be better for working, a tablet may be better for reading, and a phone may be better for portability. Developers therefore shouldn't look at web design as a one-size-fits-all because different devices are designed to serve different purposes. 

Take a look at the home page of Rewire Leadership for an example and see how remodelling the index page by customizing layout for different viewports can enhance user experience and facilitate business goals. Left is before; right is after.

![index_page_big](/images/posts/1-3-14/index_page_big_compare.png)

Take a closer look on how the layout changes in a smaller viewport.

![index_page_small](/images/posts/1-3-14/index_page_small_compare.png)


#### Dynamic Grid is your Friend

Dynamic grids make viewport-based layout changes far easier and more consistent than manual media queries. For instance, columns can stack on top of each other when the viewport shrinks, making the content easier to read on a mobile device.

There are so many pre-made dynamic grids that you can make you hit the ground running. [Bootstrap](http://getbootstrap.com/) and [Foundation](http://foundation.zurb.com/) frameworks both include good grid systems. There are also many framework-free dynamic grids available like [Bourbon Neat](http://neat.bourbon.io/) and [Susy](http://susy.oddbird.net/).

If you like to be more hands-on, be sure to define reasonable breakpoints and be consistent throughout the site otherwise it could result in a nightmare like this (which is how Rewire Leadership looked before I implemented a dynamic grid).

![grid](/images/posts/1-3-14/grid.png)

![nightmare_grid](/images/posts/1-3-14/grid1.png)


Note: CSS Media queries don't work with older versions of IE (8 and earlier) :(. But don't worry, check out [Respond.js](https://github.com/scottjehl/Respond). Respond.js is a lightweight JavaScript polyfill for enabling media queries in old browsers. It will make your life a easier. I promise.


#### Be Careful with Tables
I know I know. People say tables are old-fashioned and boring, but sometimes they are the right choice. A table is great for readably displaying big chunks of tabular data.

Tables can be a pain when it comes to RWD. Why? They just don't shrink! There are a number of tutorials out there for creating responsive tables. What I found that [Zurb Foundation](http://foundation.zurb.com/docs/components/tables.html) includes and easy and reliable responsibe table. However, if possible, tables should be avoided for small viewports.

![table](/images/posts/1-3-14/table_compare.png)


#### Choose the Right Background Picture

Choosing the right background picture in RWD can be bit challenging. A good candidate is one that still looks good even when the aspect ratio changes. 

![background_bigview](/images/posts/1-3-14/background_bigview.png)

![background_smallview](/images/posts/1-3-14/background_smallview.png)

Alternatively, you can set a condition for browsers to render different background images for different viewports. Go to [this page](http://stuffandnonsense.co.uk/) and play around with it. It's fantastic.

#### Dig deeper

Check out full Rewire Leadership site [BEFORE](http://rewire-leadership-2013-12-01.herokuapp.com/) and [AFTER](http://rewireleadership.com) the remodelling. 

Stay cool and keep coding,  
Lily 
