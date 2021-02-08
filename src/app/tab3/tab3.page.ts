import { ɵDomAdapter } from '@angular/common';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  q1: string = '1';
  q2: string = '1';
  q3: string = '1';
  q4: string = '1';
  q5: string = '1';
  q6: string = '1';
  toogle1: boolean = false;
  toogle2: boolean = false;
  toogle3: boolean = false;
  toogle4: boolean = false;
  score: number = -1;
  classification: string = 'Scores ≤ 4 suggest an unfavorable result with induction. Spontaneous delivery unlikely.';

  check1(event){
    this.q1 = event.target.value;
    this.calculate();
  }
  check2(event){
    this.q2 = event.target.value;
    this.calculate();
  }
  check3(event){
    this.q3 = event.target.value;
    this.calculate();
  }
  check4(event){
    this.q4 = event.target.value;
    this.calculate();
  }
  check5(event){
    this.q5 = event.target.value;
    this.calculate();
  }
  check6(event){
    this.q6 = event.target.value;
    this.calculate();
  }

  calculate(){
    this.score = -5;
    if (this.q1 == '1'){this.score=this.score+1}
    else if (this.q1 == '2'){this.score=this.score+2}
    else if (this.q1 == '3'){this.score=this.score+3}
    else if (this.q1 == '4'){this.score=this.score+4}
    if (this.q2 == '1'){this.score=this.score+1}
    else if (this.q2 == '2'){this.score=this.score+2}
    else if (this.q2 == '3'){this.score=this.score+3}
    else if (this.q2 == '4'){this.score=this.score+4}
    if (this.q3 == '1'){this.score=this.score+1}
    else if (this.q3 == '2'){this.score=this.score+2}
    else if (this.q3 == '3'){this.score=this.score+3}
    else if (this.q3 == '4'){this.score=this.score+4}
    if (this.q4 == '1'){this.score=this.score+1}
    else if (this.q4 == '2'){this.score=this.score+2}
    else if (this.q4 == '3'){this.score=this.score+3}
    if (this.q5 == '1'){this.score=this.score+1}
    else if (this.q5 == '2'){this.score=this.score+2}
    else if (this.q5 == '3'){this.score=this.score+3}
    if (this.q6 == '1'){this.score=this.score-1}
    else if (this.q6 == '2'){this.score=this.score+1}
    else if (this.q6 == '3'){this.score=this.score+2}
    else if (this.q6 == '4'){this.score=this.score+3}
    else if (this.q6 == '5'){this.score=this.score+4}
    else if (this.q6 == '6'){this.score=this.score+5}
    if (this.toogle1 == true){this.score=this.score+1}
    if (this.toogle2 == true){this.score=this.score-1}
    if (this.toogle3 == true){this.score=this.score-1}
    if (this.toogle4 == true){this.score=this.score+1}
    if (this.score <= 4){
      this.classification = 'Scores ≤ 4 suggest an unfavorable result with induction. Spontaneous delivery unlikely.'
    } else if (this.score <=9){
      this.classification = 'Scores 5-9 suggest an intermediate result with induction.'
    } else if (this.score >=10){
      this.classification = 'Scores ≥ 10 suggest favorable for induction. Spontaneous vaginal delivery is more likely.'
    } 
  }
  constructor(public alertController: AlertController) {
  }

}
