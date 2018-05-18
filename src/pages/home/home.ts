import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { ServiceProvider } from "../../providers/service/service";
import { CallNumber } from '@ionic-native/call-number';
import { CadastroPage } from '../cadastro/cadastro';
import { EditPage } from '../edit/edit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
   contatos : any [];
  
  constructor(public navCtrl: NavController, 
              public modalCtrl : ModalController, 
              public service : ServiceProvider, 
              public alertCtrl : AlertController,
              public callNumber: CallNumber) {

  }
  
  /*ngOnInit() {
    this.getDados();
  }*/
  ionViewWillEnter(){
    this.getDados();
  }
  getDados() {
    //retorno de Dados
    this.service.getData().then((data: any[]) =>{
      console.log("---------"+ data);
      this.contatos = data;
      console.log(this.contatos);
      
      });
  }
  deletarPerfil(id){
       let prompt = this.alertCtrl.create({
            title: 'Deseja excluir o contato?',
            
            buttons: [
              {
                text: 'Não',
                handler: data => {}
              },
              {
                text: 'Sim',
                handler: data => {
                  this.service.deleteData(id)
                  .then(
                        data=>{
                              console.log(data.mensage);
                              this.getDados();
                        },
                        err=>console.log(err)
                  );
                }
              }
            ]
          });
          prompt.present();
  }
  goCadastro(){
    this.navCtrl.push(CadastroPage);

  }
  goEdit(contato){
    let prompt = this.alertCtrl.create({
            title: 'Deseja editar o contato?',
            
            buttons: [
              {
                text: 'Não',
                handler: data => {}
              },
              {
                text: 'Sim',
                handler: data => {
                  this.navCtrl.push(EditPage);
                  this.service.SetContato(contato);         
                }
              }
            ]
          });
          prompt.present();
  }
  Call(tell){
    this.callNumber.callNumber(tell, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }
}
