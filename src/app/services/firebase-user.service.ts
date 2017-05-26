import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseUserService {

  currentUser: any
  user: FirebaseObjectObservable<any>;

  constructor(private afData: AngularFireDatabase, private afAuth: AngularFireAuth, private flashMessage: FlashMessagesService) {
    this.currentUser = afAuth.authState;
    this.currentUser
        .take(1)
        .do(authState => {
          this.user = this.afData.object('/users/' + authState.uid) as FirebaseObjectObservable<User>
        });
  }

  getAuthUser() {
    return this.currentUser;
  }

  getDataUser(){
    return this.user;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      let email = result.user.email;
      let name = result.user.displayName;
      let uid = result.user.uid;
      this.user = this.afData.object('/users/' + uid) as FirebaseObjectObservable<User>
      this.currentUser
        .take(1)
        .do(authState => {
          this.afData.list('/users').update(uid, {
            name: authState.displayName
          })
        });
    })
  }

  logout() {
    this.afAuth.auth.signOut();
    this.flashMessage.show('You are logged out', { cssClass: 'alert-success', timeout: 3000 });
  }
}

interface User {
  $key?: string;
  name: string;
}

