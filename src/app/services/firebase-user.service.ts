import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseUserService {

  currentUser: Observable<firebase.User>;
  user: FirebaseObjectObservable<any>;
  userId: any;

  constructor(private afData:AngularFireDatabase, private afAuth: AngularFireAuth, private flashMessage: FlashMessagesService) {
    this.currentUser = afAuth.authState;
  }

  getCurrentUser(){
    return this.currentUser;
  }

  getUser(){

  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    
  }


  logout() {
    this.afAuth.auth.signOut();
    this.flashMessage.show('You are logged out',{cssClass:'alert-success',timeout: 3000});
  }
}

