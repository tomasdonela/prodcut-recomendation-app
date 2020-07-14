import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ProductRecommendationService } from './product-recommendation.service';
import { Question } from './question'
import { CustomerAnswer } from './customer-answer'
import { Product } from './product'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  questions: Question[];
  products: Product[];
  form: FormGroup;

  constructor(private productRecommendationService: ProductRecommendationService){
    this.productRecommendationService.getQuestions().subscribe(questions => {
      this.questions = questions;
      let group: any = {};
      questions.forEach(question => group[question.subject] = new FormControl(''))
      this.form = new FormGroup(group);
    });
  }

  ngOnInit(){}

  getSubmit(){
    let answers = new Array<CustomerAnswer>();
    let result = this.form.getRawValue()
    this.questions.forEach(question => {
      let value = result[question.subject];
      if(value !== null){
        answers.push(new CustomerAnswer(question.subject, value))
      }
    });
     this.productRecommendationService.getProductRecommendation({ answers: answers }).subscribe(products => {
       this.products = products.products;
     });
  }
}
