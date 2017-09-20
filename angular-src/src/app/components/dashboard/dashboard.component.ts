import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
//import { CounterComponent } from '../counter/counter.component';
import { ProductService } from '../../services/product.service';
import { BasketService } from '../../services/basket.service';
//import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any;
  product: any;
  cartID: string;
 public counter: number = 0;
  basketProducts : any;
 //busy: Subscription;
  constructor(private productService: ProductService, private basketService : BasketService) {


  }

  ngOnInit() {
    //busy: Subscription;
    this.basketProducts = [];
    let user = JSON.parse(localStorage.getItem('user'));
    console.log('userid:', user.id);
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;

    });
    if (!localStorage.getItem('cart_id')) {
      this.busy = this.productService.getCartId(user.id).subscribe(data => {
        if (data) {
          this.cartID = data;
          console.log('Cart ID init', this.cartID);
          localStorage.setItem('cart_id', this.cartID)
        }

      });
    }

  }

addToCart(product) {

  delete product['quantity'];
var index1 = this.basketProducts.indexOf(product);
  console.log('Product to be added in array ', product);
console.log('Index value',index1);
if( this.basketProducts.length == 0){
this.basketProducts.push(product);
}
else{
this.basketProducts[index1] = product;
}
    console.log('Products in array:', this.basketProducts);
const products =this.basketProducts;

console.log('products value', products);

}

removeProduct (product){
let index = this.basketProducts.indexOf(product);

}

addItems(basketProducts){
console.log('in additems :', basketProducts);
if(basketProducts == undefined){
 console.log('no prducts in cart');

}
else{
 this.productService.addItemToCart(basketProducts).subscribe(data => {
         if (data.success == true) {
           console.log('Addedd to cart', data);
            //this.productService.storeCartId(data.cart._id);
         } else {
           console.log('unable to add');
         }
       });
       //let products1 = [];
       this.basketProducts =[];
}
}
  addItemsToCart(id) {
    console.log('Inside AddItem function : id and count:', id);
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;

//        this.basketService.addProductsToBasket(this.product).subscribe(data=>{
//  console.log('Products in basket:',data);
//        })
      console.log('Product response in dasboard component,quantity', this.product.quantity);

  this.productService.addItemToCart(this.product).subscribe(data => {
         if (data.success == true) {
           console.log('Addedd to cart', data);
            //this.productService.storeCartId(data.cart._id);
         } else {
           console.log('unable to add');
         }
       });

    });

  }


increment() {
   //this.counter += 1;
  this.basketService.increment()
   console.log('increment :', this.counter);

 }

 decrement() {
   //this.counter -= 1;
   this.basketService.decrement();
   console.log('decrement :', this.counter);
 }


//  addProductsToBasket(product,counter){
// console.log('In Basket Service : Product :',product);
// //let product1= product;
// delete product['quantity'];

//  if(this.basketProducts.length == 0){
//  product.count =counter;
//  this.basketProducts.push(product);
//  }
//  else{

//  this.basketProducts.forEach(element => {
//   // console.log('',if(element._id == product._id));

//   if(element._id == product._id){
//  console.log('Same product ID');
//  this.basketProducts.splice( this.basketProducts.indexOf(element._id), 1 );

// console.log('basket elements after removal:',this.basketProducts);
//   //product.count =counter;
// //  console.log('product count:',product.count);

// //this.basketProducts[this.basketProducts.indexOf(element._id)].count= counter;
//   //this.basketProducts.push(indexOf(uct));
//    }
//   else{
// console.log('Not same product id');

//  product.count =counter;
//  console.log('product count:',product.count);
//  this.basketProducts.push(product);
//   }
// });
// }
// console.log('Products in basket :', this.basketProducts.length);


// }


}
