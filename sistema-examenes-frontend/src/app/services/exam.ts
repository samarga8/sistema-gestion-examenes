import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamService {


  constructor(private http: HttpClient) { }

  public listExams() {
    return this.http.get<any>('http://localhost:8080/exams/all');
  }

  public addExam(exam: any): Observable<any> {
    return this.http.post('http://localhost:8080/exams/create', exam);
  }

  public deleteExam(examId: any) {
    return this.http.delete(`${baseUrl}/exams/delete/${examId}`);
  }

  public getExam(examId: any) {
    return this.http.get(`${baseUrl}/exams/get/${examId}`);
  }

  public updateExam(exam: any): Observable<any> {
    return this.http.put(`${baseUrl}/exams/update`, exam);
  }
}
