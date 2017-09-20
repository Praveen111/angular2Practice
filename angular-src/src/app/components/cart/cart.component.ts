import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: any;
  cartId: string;
  userid : string;
  counter : number = 0;
  constructor(private productService: ProductService) {}

  ngOnInit() {

    let cartid = JSON.parse(localStorage.getItem('cart_id'));
    this.cartId = cartid;
    console.log('cart ID on init',this.cartId);

this.productService.getCartItems(this.cartId).subscribe(data => {
      if (data) {
        this.cartProducts = data.products;
        //this.productService.storeCartId(data.cart._id);
      } else {
        console.log('Unable to get Cart items');
      }

    })
  }


  increment() {
   this.counter += 1;
   console.log('increment :', this.counter);

 }

 decrement() {
   this.counter -= 1;
   console.log('decrement :', this.counter);
 }

addProductsToBasket(product,counter){
console.log('In Basket Service : Product :',product);
//let product1= product;
delete product['quantity'];

// if(this.basketProducts.length == 0){
// product.count =counter;
// this.basketProducts.push(product);
// }
// else{

// this.basketProducts.forEach(element => {
//   //console.log('element :',element);
//  if(element._id == product._id){
// console.log('Same product ID');
// product.count =counter;
// console.log('product count:',product.count);

// this.basketProducts.push(product);
//  }
//  else{


// product.count =counter;
// console.log('product count:',product.count);
// this.basketProducts.push(product);
//  }
 //});
//}
//console.log('Products in basket :', this.basketProducts.length);

}

  }





