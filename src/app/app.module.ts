import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { FirebaseService } from './services/firebase.service';
import { FirebaseUserService} from './services/firebase-user.service';
import { LoginGuardService } from './services/login-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listings', component: ListingsComponent, canActivate: [LoginGuardService] },
  { path: 'listing/:id', component: ListingComponent, canActivate: [LoginGuardService]  },
  { path: 'add-listings', component: AddListingComponent, canActivate: [LoginGuardService]  },
  { path: 'edit-listing/:id', component: EditListingComponent, canActivate: [LoginGuardService] }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'proplistings'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FlashMessagesModule
  ],
  providers: [
    FirebaseService,
    FirebaseUserService,
    LoginGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
