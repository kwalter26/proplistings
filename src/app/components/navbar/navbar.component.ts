import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseUserService } from '../../services/firebase-user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(private userService: FirebaseUserService) {
  }

  ngOnInit() {
    this.user = this.userService.getAuthUser();
  }

  onLogin() {
    this.userService.login();
  }

  onLogout() {
    this.userService.logout();
  }

}
