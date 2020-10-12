## Other Cart Methods

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


    app.get(/cart, (req, res)=>{

       const data = {
          tax:           req.cart.tax(),
          subtTotal :    req.cart.subTotal(),
          total:         req.cart.total(),
          content:       req.cart.content(),
          totalQuantity: req.cart.totalQuantit(),
          count:         req.cart.count(),
      }

       res.json({ cartInfo: data })
    })


    


```