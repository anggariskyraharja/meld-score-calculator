import { ɵDomAdapter } from '@angular/common';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  growth: string;
  albumin: number;
  bilirubin: number;
  inr: number;
  age: number;
  satuan1: string ='1';
  satuan2: string ='1';
  result1: string;
  result2: string;

  clear(){
    this.growth = null;
    this.albumin = null;
    this.bilirubin = null;
    this.inr = null;
    this.age = null;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Missing Value',
      message: 'Please input all the required values!',
      buttons: ['Okay']
    });
    await alert.present();
  }

  checksatuan1(event){
    this.satuan1 = event.target.value;
  }
  checksatuan2(event){
    this.satuan2 = event.target.value;
  }
  calculate(){
    if (this.growth == null || this.albumin == null || this.bilirubin == null || this.inr == null || this.age == null){
      this.presentAlert()
    } else {
      var albuminx: number;
      var bilirubinx: number;
      var peld: number;
      var agex: number;
      var growthx: number;
      if (this.satuan1 == '1'){
        albuminx = this.albumin;
      } else if (this.satuan1 == '2'){
        albuminx = this.albumin / 10;
      }
      if (this.satuan2 == '1'){
        bilirubinx = this.bilirubin;
      } else if (this.satuan2 == '2'){
        bilirubinx = this.bilirubin * 0.05847953216374269;
      }
      if (this.age < 1){agex = 1}else{agex = 0};
      if (this.growth == 'q11'){growthx = 1}else{growthx = 0};

      peld = 10*(0.480 * Math.log(bilirubinx)+ 1.857 * Math.log(this.inr) - 0.687 * Math.log(albuminx) + 0.436 * agex + 0.667 * growthx)
      if (peld < 0){peld = 0};
      this.result1 = 'The Pediatric End-Stage Liver Disease (PELD) score is '+peld.toFixed(1)+' points.';
    }
  }

  roundoff(value){
    var value4 = "" + Math.round(value);
    var bonus2 = value4.length + 1;
    var bonus = 0;
    if (value < 100){bonus=bonus+1};
    if (value < 10){bonus=bonus+1};
    if (value < 1){bonus=bonus+1};
    if (value < 0.1){bonus=bonus+1};
    if (value < 0.01){bonus=bonus+1};
    if (value < 0.001){bonus=bonus+1};
    if (value < 0.0001){bonus=bonus+1};
    bonus2 = bonus2+bonus;
    var whole = Math.round(value * Math.pow(10, bonus));
    var whole2 = "" + whole * Math.pow(10, -1*bonus);
    var whole3 = whole2.substr(0,bonus2);
    return whole3;
  }

  constructor(public alertController: AlertController) {
  }

}
