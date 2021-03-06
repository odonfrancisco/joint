import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  url: string = environment.BASE_URL;

  constructor(
    private http: Http,
  ) { }

  getRestaurantNames(){
    return this.http.get(`${this.url}/restaurant/names`)
      .pipe(
        map(res => res.json())
      );
  };

  getRestaurant(id){
    return this.http.get(`${this.url}/restaurant/${id}`)
      .pipe(
        map(res => res.json())
      );
  };

  createOrder(restaurantId, tableNum){
    return this.http.post(`${this.url}/restaurant/${restaurantId}/order/create`, {tableNum}, {withCredentials: true})
      .pipe(
        map(res => res.json())
      );
  };

  login(restaurantId, password){
    return this.http.post(`${this.url}/restaurant/${restaurantId}/login`, {password: password}, {withCredentials: true})
      .pipe(
        map(res => res.json())
      );
  };

  checkUser(restaurantId, role){
    return this.http.get(`${this.url}/restaurant/${restaurantId}/${role}/login`, {withCredentials: true})
      .pipe(
        map(res => res.json())
      );
  };
  
  createNewRestaurant(newRestaurant){
    return this.http.post(`${this.url}/restaurant/new`, {newRestaurant}, {
      withCredentials: true
    })
      .pipe(
        map(res => res.json())
      );
  };

  addKitchenAdmin(restaurantId, userId){
    return this.http.get(`${this.url}/restaurant/${restaurantId}/kitchenUser/${userId}`)
      .pipe(
        map(res => res.json())
      )
  }
  
}
