import { Injectable } from '@angular/core';
import { Http, Headers, Response  } from'@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BasketService {
products :any;
counter: number ;
  constructor(private http : Http) {
   this.products =[];
this.counter = 0;
  }

increment() {
   this.counter += 1;
   console.log('increment :', this.counter);
 return this.counter;
 }

 decrement() {
   this.counter -= 1;
   console.log('decrement :', this.counter);
   return this.counter;
 }

}
