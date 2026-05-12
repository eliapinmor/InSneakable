import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:3000/api/orders'

  getMyOrders(){
    return this.http.get(`${this.apiUrl}/my-orders`);
  }

  getAllOrders(){
    return this.http.get(this.apiUrl);
  }

  newOrder(data: any){
    return this.http.post(this.apiUrl, data);
  }

  updateStatus(id: string, status: string){
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status })
  }
}
