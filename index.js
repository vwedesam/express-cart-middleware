

module.exports = function (config) {

    return function(req, res, next) {

    req.session.items = {}

    // req.session.items[instance] = [
    //       { id: 3, name: 'mouse', preview: '', price: 8900, quantity: 1, attributes: [] }
    //         ],

    req.cart = {
            
            add: ( options, instance = "default" ) => {

                    const { id, name, price, quantity, attributes = [] } = options;
                    if( !id || !name || !price || !quantity ){
                        return { msg: 'Unable to Add Item, All Params are required!' };
                    }else{
                            if(req.session.items[instance]){
                                   if( req.session.items[instance].some(item=> item.id == id ) ){
                                            req.flash('error_msg', "product already in cart" );
                                   }else{
                                            req.session.items[instance] = req.session.items[instance].concat(options);
                                   }
                            }else{
                                    req.session.items[instance] = [] 
                                    // adding to cart for the first time
                                    req.session.items[instance] = req.session.items[instance].concat(options);
                            }
                        return { id, name, price, quantity, attributes }
                    }
            },
            update: ( id, options = {}, instance = 'default' ) => {
                    if( id ){
                        delete options.id; // delete id if given
                        let updatedItem = { ...req.cart.content(instance).filter(item => item.id == id )[0], ...options }
                        req.session.items[instance] = req.cart.remove(id).concat(updatedItem);
                    }
            },
            get: (id, instance = 'default' ) => {
                if( id ){
                    return req.session.items[instance] = req.cart.content(instance).filter( item => item.id === parseInt(id) );
                }else{
                    return { msg: 'Unable to remove Product, id not given' };
                }
            },
            remove: (id, instance = 'default' ) => {
                    if( id ){
                        return req.session.items[instance] = req.cart.content(instance).filter( item => item.id != id );
                    }else{
                        return { msg: 'Unable to remove Product, id not given' };
                    }
            },
            checkout: (instance = 'default') => {
                     req.session.items[instance] = [];
            },
            content: (instance = 'default') => {
                    if( req.session.items[instance] ) return req.session.items[instance];
                    else return [];
            },
            subTotal: (instance = 'default') => {
                if(req.cart.content(instance).length > 0){
                    return req.cart.content(instance).map(item => parseInt(item.price) * parseInt(item.quantity) )
                            .reduce((total, num) => total += parseInt(num) ); 
                }else{
                    return 0
                }
            },
            tax: (instance = 'default') => {
                if(config.tax){
                    return req.cart.subTotal(instance) * parseInt(config.tax) / 100;
                }
                return 0;
            },
            total: (instance = 'default') => {
                return req.cart.subTotal(instance) + req.cart.tax(instance);
            },
            totalQuantity: (instance = 'default') => {
                if(req.cart.content(instance).length > 0){
                    return req.cart.content(instance).map(item => parseInt(item.quantity) )
                            .reduce((total, num) => total += parseInt(num) );
                }else{
                    return 0
                }
            },
            count: (instance = 'default') => {
                return req.cart.content(instance).length
            }
    }

   next();
}

}
