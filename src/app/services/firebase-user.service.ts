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
  }

  getCurrentUser() {
    return this.currentUser;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      let email = result.user.email;
      let name = result.user.displayName;
      let uid = result.user.uid;
      this.user = this.afData.object('/users/' + uid) as FirebaseObjectObservable<User>
      this.user.subscribe(user => {
        console.log(user)
        if (!user.$exists) {
          console.log('User does not exist');
          this.afData.list('/users').update(uid, {
          name: name
        })
        } else {
          console.log('User does exist');
        }
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

