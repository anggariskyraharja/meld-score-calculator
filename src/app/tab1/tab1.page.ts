import { ɵDomAdapter } from '@angular/common';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  dialysis: string;
  creatinine: number;
  bilirubin: number;
  inr: number;
  sodium: number;
  satuan1: string ='1';
  satuan2: string ='1';
  result1: string;
  result2: string;

  clear(){
    this.dialysis = null;
    this.creatinine = null;
    this.bilirubin = null;
    this.inr = null;
    this.sodium = null;
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
    if (this.dialysis == null || this.creatinine == null || this.bilirubin == null || this.inr == null || this.sodium == null){
      this.presentAlert()
    } else {
      var creatininex: number;
      var bilirubinx: number;
      var meld: number;
      var meldx: number;
      var sodiumx: number;
      var inrx: number;
      if (this.satuan1 == '1'){
        creatininex = this.creatinine;
      } else if (this.satuan1 == '2'){
        creatininex = this.creatinine * 0.011312217194570135;
      }
      if (this.satuan2 == '1'){
        bilirubinx = this.bilirubin;
      } else if (this.satuan2 == '2'){
        bilirubinx = this.bilirubin * 0.05847953216374269;
      }
      if (creatininex<1){creatininex=1.0};
      if (bilirubinx<1){bilirubinx=1.0};
      if (this.inr<1){inrx=1.0} else {inrx=this.inr};
      if (creatininex>4 || this.dialysis=='q11'){creatininex=4};
      if (this.sodium<125){sodiumx=125}
      else if (this.sodium>137){sodiumx=137}
      else {sodiumx=this.sodium};
      meld = 0.957 * Math.log(creatininex) + 0.378 * Math.log(bilirubinx) + 1.120 * Math.log(inrx) + 0.643;
      meld = meld * 10;
      if (meld>=11.5){
        meldx = meld + (1.32 * (137-sodiumx)) - (0.033 * meld * (137-sodiumx));
      } else {
        meldx = meld;
      }
      if (meldx>40){
        meldx = 40;
      }
      this.result1 = 'The Model For End-Stage Liver Disease (MELD) score is '+meldx.toFixed(0)+' points.';
      if (meldx<=9){
        this.result2 = 'The estimated 3-month mortality rate is 1.9%';
      } else if (meldx<=19){
        this.result2 = 'The estimated 3-month mortality rate is 6.0%';
      } else if (meldx<=29){
        this.result2 = 'The estimated 3-month mortality rate is 19.6%';
      } else if (meldx<=39){
        this.result2 = 'The estimated 3-month mortality rate is 52.6%';
      } else if (meldx>-40){
        this.result2 = 'The estimated 3-month mortality rate is 71.3%';
      }
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
