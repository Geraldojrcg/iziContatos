import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the ServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  private db: SQLiteObject;
  private isOpen: boolean;
  contato : any[];
  constructor(public storage: SQLite) {
      if (!this.isOpen) {
       this.storage = new SQLite();
       this.storage.create({ name: "contatos.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, tell BIGINT)", []);
        this.isOpen = true;
       }).catch((error) => {
        console.log(error);
       })
    }
  }
  public getDB() {
    return this.storage.create({
      name: 'contatos.db',
      location: 'default'
    });
  }
  postData(contato : Contato){
     return this.getDB()
      .then((db: SQLiteObject) => {
      let sql = "INSERT INTO contatos (nome, email, tell) VALUES (?, ?, ?)";
      return db.executeSql(sql, [contato.nome, contato.email, contato.tell])
      .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  getData() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM contatos';
        var data: any[] = [];
 
        // filtrando pelo nome
        /*if (name) {
          sql += ' and p.name like ?'
          data.push('%' + name + '%');
        }*/
        return db.executeSql(sql, data)
          .then((res: any) => {
            if (res.rows.length > 0) {
              let contatos: any[] = [];
              for (var i = 0; i < res.rows.length; i++) {
                var contato = res.rows.item(i);
                contatos.push(contato);
              }
              return contatos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  deleteData(id){
      return this.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'DELETE FROM contatos WHERE id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  updateData(contato : Contato) {
      return this.getDB()
      .then((db: SQLiteObject) => {
      let sql = "UPDATE contatos SET nome = ?, email = ?, tell = ?  WHERE id = ?";
      return db.executeSql(sql, [contato.nome, contato.email, contato.tell, contato.id])
      .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  SetContato(contato){
    this.contato = contato;
  }
  GetContato(){
    return this.contato;
  }
}
  export class Contato {
   id: number;
   nome: string;
   tell: number;
   email: string;
  
}
