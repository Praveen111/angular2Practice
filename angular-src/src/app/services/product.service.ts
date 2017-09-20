import { Injectable } from '@angular/core';
import { Http, Headers, Response  } from'@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
userid :String;
cartID : String;
  constructor(private http : Http) { }

getAllProducts() {
console.log('hitting ProductService');
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.get('http://localhost:4020/products/getproducts',{headers : headers})
    .map((res:Response) => res.json())

}

getProductById(id) {
  console.log('Product ID in ProductService:', id);
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
   return this.http.post('http://localhost:4020/products/getproductById/',{_id : id}, {
       headers: headers
     }).map((res:Response) => res.json())


}

addItemToCart(products1) {

 console.log('Product to be added', products1);
// product.count= count;
let user = JSON.parse(localStorage.getItem('user'));
console.log('userid :', user.id);
//console.log('product object :', product);
//this.http.
this.userid = user.id;
//delete product['quantity'];

  let headers = new Headers();
let addProducts = {
    userid : user.id,
    products :products1

};

console.log('in service addProduct json:',addProducts);

  headers.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:4020/cart/addCartItems', addProducts,{
      headers: headers,
      })
    .map((res: Response) => res.json())

}

getCartItems(cartId) {

  console.log('cart ID :', cartId);
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:4020/cart/cartItems/', {
      _id: cartId
    }, {
      headers: headers
    })
    .map((res: Response) => res.json())
}

// storeCartId(cartid) {
//   const cartId = localStorage.setItem('cart_id', cartid);
// }

getCartId(userid){


 let headers = new Headers();
  headers.append('Content-Type', 'application/json');
return this.http.post('http://localhost:4020/cart/getCartId/',{userid : userid},{headers : headers}).map((res: Response) => res.json())
}




}

