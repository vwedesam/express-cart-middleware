## Update Cart Item with an `instance`

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


    app.get(/update_cart, (req, res)=>{


       const id = 233;

       req.cart.update( id, { name: 'mouse', price: 8900, quantity: 1, preview: 'http://myimages/src/google.png', attributes: [] }, 'shop');

       res.json({status: "success" })
    })


```