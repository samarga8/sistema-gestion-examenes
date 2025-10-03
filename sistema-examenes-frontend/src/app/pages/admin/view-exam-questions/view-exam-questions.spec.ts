import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamQuestions } from './view-exam-questions';

describe('ViewExamQuestions', () => {
  let component: ViewExamQuestions;
  let fixture: ComponentFixture<ViewExamQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewExamQuestions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExamQuestions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
