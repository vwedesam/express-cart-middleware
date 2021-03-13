## Express Shopping Cart Middleware

[![License](https://poser.pugx.org/gloudemans/shoppingcart/license)](https://github.com/vwedesam/express-cart-middleware)

A simple shoppingcart middleware for Express.
inspired by [LaravelShoppingcart](https://packagist.org/packages/gloudemans/shoppingcart) 

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install express-cart-middleware
```

## API

<!-- eslint-disable no-unused-vars -->

```js
const expressCart = require('express-cart-middleware')

```

## Overview
Look at one of the following topics to learn more about Express Shopping Cart Middleware

* [Usage](#usage)
* [Instances](#instances)
* [Config](#config)
* [Example](#example)

## Usage

The shoppingcart gives you the following methods to use:

### cart.add( [ options ] )

Adding an item to the cart is really simple, you just use the `add()` method, which accepts an Options Object.
 
* Options < Object >

this Options object contains the following keys
 
   * id:       product id (required and unique),
   * name:     product name (required),
   * price:    cost of product  (required),
   * quantity: quantity of product (required, 
   * preview:  url to any resource (optional),
   * attributes : extra details you want to add (optional) 
  
    
```js
 const options = {} // keys
 
 req.cart.add(options);
 
```

### cart.update( [productId, [ data]] )

* productId < Integer >
* data < Object >

To update an item in the cart, you'll first need the product Id of the item.
Next you can use the `update()` method to update it.

If you simply want to update the quantity, you'll pass to the update method the product id and the with an object quantity:

```js
 const productId = 233;

 req.cart.update(productId, { quantity: 19 }); // Will update the quantity
```

### cart.remove( [ productId ])

* productId < Integer >

To remove an item for the cart, you'll again need the product Id. 

```js
 const productId = 233;

 req.cart.remove(productId);
```

### cart.get( [ productId ])

* productId < Integer >
*
If you want to get an item from the cart using its product id, you can simply call the `get()` method on the cart and pass it the product id.

```js
 const productId = 233;

 req.cart.get(productId);
```

### cart.content()

Of course you also want to get the carts content. This is where you'll use the `content` method. This method will return a Collection of CartItems which you can iterate over and show the content to your customers.

```js
 req.cart.content();
```

### cart.checkout()

If you want to completely remove the content of a cart, you can call the destroy method on the cart. This will remove all CartItems from the cart for the current cart instance.

```js
 req.cart.checkout();
```

### total()

The `total()` method can be used to get the calculated total of all items in the cart, given there price and quantity.

```js
 req.cart.total();
```

### cart.tax()

The `tax()` method can be used to get the calculated amount of tax for all items in the cart, given there price and quantity.

```js
 req.cart.tax();
```

### cart.subTotal()

The `subTotal()` method can be used to get the total of all items in the cart, minus the total amount of tax. 

```js
 req.cart.subTotal();
```

### cart.count()

If you want to know how many items there are in your cart, you can use the `count()` method. This method will return the total number of items in the cart. So if you've added 2 books and 1 shirt, it will return 3 items.

```js
  req.cart.Count();
```

### cart.totalQuantity()


```js
  req.cart.totalQuantity();
```


## Instances

The packages supports multiple instances of the cart. The way this works is like this:

You can set the current instance of the cart by calling `req.cart.add( Options, 'newInstance')`. From this moment, the active instance of the cart will be `newInstance`, so when you add, remove or get the content of the cart, you're work with the `newInstance` instance of the cart.
If you want to switch instances, you just call `req.cart.add( Options, 'otherInstance')` again, and you're working with the `otherInstance` again.

So a little example:

```js
    const options = { 
               id: 223, 
               name: 'mouse',
               price: 8900, 
               quantity: 1, 
               preview: 'http://myimages/src/google.png', 
               attributes: [] 
               };
    // add product to the 'music' cart
    req.cart.add(options, 'music')

    // Get the content of the 'music' cart
    req.cart.content('music')

    // update the content of the 'music' cart
    req.cart.update(233, { name: 'new product name'}, 'music')

    // destroy all the content of the 'music' cart
    req.cart.checkout('music')

```

**N.B. all methods provided by the req.cart takes in `instance` of a cart as it last Optional Argument .**

**N.B.2 Keep in mind that the cart stays in the last set instance for as long as you don't set a different one during script execution.**

**N.B.2 The default cart instance is called `default`, so when you're not using instances,`req.cart.content()` is the same as `req.cart.content('default')`.**

## Example

### N.B this package requires `express-session`

```js
    const express = require("express")
    const session = require('express-session')
    const expressCart = require('express-cart-middleware')

    const app = express();

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))


    app.use(expressCart({tax: '12'})) // tax in %

    Or

    app.use(expressCart()) // without tax 


    app.get(/add_to_cart, (req, res)=>{

        req.cart.add({ id: 3, name: 'mouse', price: 8900, quantity: 1, preview: 'http://myimages/src/google.png', attributes: [] })
    })


```

### More Examples

* [Update Cart Item ](/examples/update_cart.md)
* [Display Cart Content ](/examples/cart_content.md)
* [Other examples](/examples/others.md)






