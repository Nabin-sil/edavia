import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AccountService, QuizService } from '@app/_services';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less']
})
export class QuestionComponent implements OnInit {
 user: User;
 questionList: any=[]; 
 currentQuestion: number=0;
 points:number=0;
 counter=60;
 correctAnswer: number= 0;
 incorrectAnswer: number=0;
 interval$:any;
 progress:string="0";
 isQuizCompleted : boolean = false;

 constructor( private accountService: AccountService, private quizService: QuizService) { 
    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions(){
 this.quizService.getQuiz().subscribe(res=>{
   this.questionList = res.questions;
 })
  }


  nextQuestion(){
    this.currentQuestion++;

  }
  
  previousQuestion(){
    this.currentQuestion--;
    
  }
 
  answer(currentQno:number,option:any){
    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if(option.correct){
      this.points += 10;
      this.correctAnswer++;

      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
      this.getProgressPercentage();

      }, 1000);

    }else{
      setTimeout(()=>{
      this.points -= 10;
      this.currentQuestion++;
    //  this.correctAnswer--;
      this.incorrectAnswer++;
      this.resetCounter();
      this.getProgressPercentage();
    }, 1000);

    this.points -= 10;
  }
  }

  startCounter(){
    this.interval$ = interval(1000).subscribe(val=>{
      this.counter --;
      if(this.counter === 0){
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    }, 600000)

  }

  
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }

  
  resetCounter(){
   this.stopCounter();
   this.counter=60;
   this.startCounter(); 
  }


  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
  }

 getProgressPercentage(){
   this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;

 }

}
