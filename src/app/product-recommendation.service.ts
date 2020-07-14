import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerAnswer } from './customer-answer' ;
import { Question } from './question'
import { Observable } from 'rxjs'
import { Products } from './products'

@Injectable({
  providedIn: 'root'
})
export class ProductRecommendationService {
  
  urlRecommendation = '/api/v20200707/product-recommendation'
  urlQuestions = '/api/v20200707/product-recommendation/questions'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  } 

  constructor(private http: HttpClient) { }

  getProductRecommendation(answers: { answers: CustomerAnswer[] }): Observable<Products> {
    return this.http.post<Products>(this.urlRecommendation, answers, this.httpOptions);
  }

  getQuestions(): Observable<Question[]>{
    return this.http.get<Question[]>(this.urlQuestions, this.httpOptions);
  }
}