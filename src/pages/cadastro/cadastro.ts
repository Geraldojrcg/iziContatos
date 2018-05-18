import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ServiceProvider, Contato } from '../../providers/service/service';
import { HomePage } from '../home/home';
/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})

export class CadastroPage {
 
 home : HomePage;
 cadastro : any = {};
 contato : Contato;
  masks: any;
 
    phoneNumber: any = "";
      
  constructor(public navCtrl: NavController, 
    public formBuilder : FormBuilder, 
    public service : ServiceProvider,
    public alertCtrl: AlertController,
    public view: ViewController,) {
    
     this.cadastro = this.formBuilder.group({
                  nome:['', Validators.required],
                  email:['', Validators.required],
                  tell:['', Validators.required]
            });
    this.masks = {
            phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }
  }
  postDados() {
            console.log(this.cadastro.value);
            this.contato = this.cadastro.value;
            this.service.postData(this.contato);
  }
   showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Boa, '+ this.cadastro.value.nome + '!',
      subTitle: "Seu contato foi salvo!",
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
    
  }
}