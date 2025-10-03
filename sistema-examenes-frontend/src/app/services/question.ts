import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
 
  constructor(private http:HttpClient) { }

  listExamQuestions(examId: any) {
    return this.http.get(`${baseUrl}/questions/exam/all/${examId}`);
  }

   deleteQuestion(questionId: any) {
    return this.http.delete(`${baseUrl}/questions/delete/${questionId}`);
  }
  addQuestion(question: any) {
    return this.http.post(`${baseUrl}/questions/add`, question);
  }
}
