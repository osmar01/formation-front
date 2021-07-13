import { Observable } from 'rxjs';
import { Category } from './category';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private BASE_ENDPOINT = environment.restApiServer;
  private ENDPOINT_PATH = "/category";

  constructor(private http: HttpClient) { }


  
  getAll(): Observable<Category[]> {
    const url = this.BASE_ENDPOINT + this.ENDPOINT_PATH;

    return this.http.get<Category[]>(url);
  }

  getById(idCategory: number): Observable<Category> {
    const url = this.BASE_ENDPOINT + this.ENDPOINT_PATH + idCategory;

    return this.http.get<Category>(url);
  }
}
