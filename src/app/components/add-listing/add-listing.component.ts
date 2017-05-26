import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { FirebaseUserService } from '../../services/firebase-user.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  title: any;
  owner: any;
  city: any;
  bedrooms: any;
  price: any;
  type: any;
  image: any;
  path: any;

  authUser: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private firebaseUserService: FirebaseUserService
  ) { }

  ngOnInit() {
    this.firebaseUserService.getAuthUser().subscribe(user => {
      this.authUser = user;
    });
    this.path = "https://firebasestorage.googleapis.com/v0/b/proplistings-41e55.appspot.com/o/default-images%2Fdownload.png?alt=media&token=1c200eef-da74-4001-b4ad-81df128ae412"
  }

  onAddSubmit() {
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms: this.bedrooms,
      price: this.price,
      type: this.type,
      userid: this.authUser.uid
    }

    this.firebaseService.addListing(listing);

    this.router.navigate(['listings']);
  }

}
