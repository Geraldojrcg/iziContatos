import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServiceProvider, Contato } from "../../providers/service/service";
import { Validators, FormBuilder } from '@angular/forms';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  
  contato : any[];
  cadastro : any = {};
  dados : Contato;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public service : ServiceProvider, 
              public formBuilder : FormBuilder, 
              public alertCtrl : AlertController,
              public view : ViewController ) {
    
      this.contato = this.service.GetContato();
    
      let params:any={
                        id: null,
                        nome: null,
                        email: null,
                        tell: null
                  }
      params = this.contato;
    
      this.cadastro = this.formBuilder.group({
                  id:[params.id],
                  nome:[params.nome, Validators.required],
                  email:[params.email, Validators.required],
                  tell:[params.tell, Validators.required]
            });
  }
  postDados() {
      this.dados = this.cadastro.value;
      this.service.updateData(this.dados);
  }
  
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Boa, '+ this.cadastro.value.nome + '!',
      subTitle: "Seu contato foi atualizado!",
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
  }
}
