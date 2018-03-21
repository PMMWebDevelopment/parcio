import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthService } from "./auth.service";
import * as firebase from "firebase";
import {} from "@types/googlemaps";
import {} from "googlemaps";
import { MapsAPILoader } from "@agm/core";

@Injectable()
export class DataService {
  private carParksSource = new ReplaySubject<any[]>();
  carParks$ = this.carParksSource.asObservable();
  private supermarketsSource = new ReplaySubject<any[]>();
  supermarkets$ = this.supermarketsSource.asObservable();
  private petrolStationsSource = new ReplaySubject<any[]>();
  petrolStations$ = this.petrolStationsSource.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private mapsAPILoader: MapsAPILoader
  ) {}

  changeCarParks(carParks) {
    this.carParksSource.next(carParks);
  }

  changeSupermarkets(supermarkets) {
    this.supermarketsSource.next(supermarkets);
  }

  changePetrolStations(petrolStations) {
    this.petrolStationsSource.next(petrolStations);
  }

  saveSearch(lat, lng, destinationName) {
    firebase
      .database()
      .ref("searches/")
      .push({
        user: firebase.auth().currentUser.email,
        lat: lat,
        lng: lng,
        destinationName: destinationName
      });
  }

  loadSavedSearches() {
    // tslint:disable-next-line:max-line-length
    return this.http.get<any[]>(
      // tslint:disable-next-line:max-line-length
      'https://parcio-36bbd.firebaseio.com/searches.json?orderBy="user"&startAt="' +
        firebase.auth().currentUser.email +
        '"&endAt="' +
        firebase.auth().currentUser.email +
        '"&print=pretty'
    );
  }

  deleteSavedSearch(savedSearch) {
    firebase
      .database()
      .ref("searches/" + savedSearch)
      .remove();
  }
}
