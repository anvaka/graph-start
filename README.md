# graph starter

A simple starter project to build your own graph algorithm exploration. 

![demo](https://i.imgur.com/zqXvkvW.gif)

It allows you to load any graph from a .dot file, do a basic graph layout, and supports pan/zoom interaction.
The rest is up to you. 

I was using this as a skeleton for some of my graph explorations and I hope you find this useful as a first
graph setup.

Happy exploration!

## Getting started

First - you need to clone/fork this repository and then:

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

This should render a simple graph and you can do some basic layout. You can drop `.dot` files into it
to load new graphs.

From this point - you are free to modify the project as you wish. 

### Compiles and minifies for production
```
npm run build
```

### Customize vue configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## What's inside?

* [ngraph.graph](https://github.com/anvaka/ngraph.graph) as a graph data structure
* [ngraph.fromdot](https://github.com/anvaka/ngraph.fromdot) loads `.dot` files
* [panzoom](https://github.com/anvaka/panzoom) for pan/zoom interaction
* [ngraph.forcelayout](https://github.com/anvaka/ngraph.forcelayout) for the basic graph layout
* [w-gl](https://github.com/anvaka/w-gl) - super duper obscure (and fast) WebGL renderer that can render dots and lines.
* vue.js powered UI and dev tools.

## Thanks!

* Stay tuned for updates: https://twitter.com/anvaka
* If you like my work and would like to support it - https://www.patreon.com/anvaka