## Cart Content with an `instance`

```js

       req.cart.content('shop').forEach((item)=>{
       
          return (
           <table>
              <tr>
                <th> name </th>
                <th> price </th>
                <th> preview </th>
                <th> description </th>
              </tr>
              <tr>
                <td> {item.name} </td>
                <td> {item.price} </td>
                <td> {item.preview} </td>
                <td> {item.attributes.description} </td>
              </tr>
          </table>
           )

       });

    


```