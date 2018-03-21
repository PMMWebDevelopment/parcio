import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { environment } from "../../../src/environments/environment";
import { FormControl } from "@angular/forms";
import { DataService } from "../services/data.service";
import {} from "@types/googlemaps";
import { MapsAPILoader } from "@agm/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-infodisplay",
  templateUrl: "./infodisplay.component.html",
  styleUrls: ["./infodisplay.component.css"]
})
export class InfodisplayComponent implements OnInit, OnDestroy {
  public loading = false;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  destinationCaption: string;
  map;
  mapCenter;
  carParkSearch;
  request;
  place;
  carParkSubscription: Subscription;
  supermarketSubscription: Subscription;
  petrolStationSubscription: Subscription;
  carPark: any[];
  carParks: any[];
  carParkMarkers = [];
  supermarket: any[];
  supermarkets: any[];
  supermarketMarkers = [];
  petrolStation: any[];
  petrolStations: any[];
  petrolStationMarkers = [];
  userDisplayName: string;
  loginStatus: boolean;
  loginStatusSubscription: Subscription;
  loadSavedSearchesSubscription: Subscription;
  search = [];
  searches = [];

  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(
    private dataService: DataService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private http: HttpClient,
    public authService: AuthService,
    private af: AngularFireAuth
  ) {}

  ngOnInit() {
    this.checkloginStatus();
    this.setCurrentPosition();
    // create search FormControl
    this.searchControl = new FormControl();
    this.autocomplete();
  }

  checkloginStatus() {
    this.loginStatusSubscription = this.af.authState.subscribe(res => {
      if (res && res.uid) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
    });
  }

  autocomplete() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }

  getMap(event: any) {
    this.loading = true;
    this.destinationCaption = event.currentTarget.parentNode.children[0].value;
    this.getCarParks();
    this.getSupermarkets();
    this.getPetrolStations();
    this.loading = false;
  }

  getCarParks() {
    this.carParkSubscription = this.http
      .get(
        "https://quiet-sea-66169.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?&key=" +
          environment.googleMaps.apiKey +
          "&location=" +
          this.latitude +
          "," +
          this.longitude +
          "&radius=500&type=parking"
      )
      .subscribe((carParks: any) => {
        this.carParkMarkers = [];
        this.carParks = carParks.results;
        for (let i = 0; i < this.carParks.length; i++) {
          this.carPark = [
            this.carParks[i].geometry.location.lat,
            this.carParks[i].geometry.location.lng,
            this.carParks[i].name
          ];
          this.carParkMarkers.push(this.carPark);
        }
      });
    this.dataService.changeCarParks(this.carParkMarkers);
    return this.carParkSubscription;
  }

  getSupermarkets() {
    this.supermarketSubscription = this.http
      .get(
        "https://quiet-sea-66169.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?&key=" +
          environment.googleMaps.apiKey +
          "&location=" +
          this.latitude +
          "," +
          this.longitude +
          "&radius=2000&type=supermarket"
      )
      .subscribe((supermarkets: any) => {
        this.supermarketMarkers = [];
        this.supermarkets = supermarkets.results;
        for (let i = 0; i < this.supermarkets.length; i++) {
          this.supermarket = [
            this.supermarkets[i].geometry.location.lat,
            this.supermarkets[i].geometry.location.lng,
            this.supermarkets[i].name
          ];
          this.supermarketMarkers.push(this.supermarket);
        }
      });
    this.dataService.changeSupermarkets(this.supermarketMarkers);
    return this.supermarketSubscription;
  }

  getPetrolStations() {
    this.petrolStationSubscription = this.http
      .get(
        "https://quiet-sea-66169.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?&key=" +
          environment.googleMaps.apiKey +
          "&location=" +
          this.latitude +
          "," +
          this.longitude +
          "&radius=2000&type=gas_station"
      )
      .subscribe((petrolStations: any) => {
        this.petrolStationMarkers = [];
        this.petrolStations = petrolStations.results;
        for (let i = 0; i < this.petrolStations.length; i++) {
          this.petrolStation = [
            this.petrolStations[i].geometry.location.lat,
            this.petrolStations[i].geometry.location.lng,
            this.petrolStations[i].name
          ];
          this.petrolStationMarkers.push(this.petrolStation);
        }
      });
    this.dataService.changePetrolStations(this.petrolStationMarkers);
    return this.petrolStationSubscription;
  }

  loadSearches(event: any) {
    this.searches = [];
    this.loadSavedSearchesSubscription = this.dataService
      .loadSavedSearches()
      .subscribe((searches: any[]) => {
        Object.keys(searches).forEach(key => {
          this.search = [
            searches[key].destinationName,
            searches[key].lat,
            searches[key].lng,
            key
          ];
          this.searches.push(this.search);
        });
      });
  }

  loadSearch(event: any) {
    this.mapsAPILoader.load().then(() => {
      this.ngZone.run(() => {
        const geocoder = new google.maps.Geocoder();
        const address =
          event.currentTarget.parentNode.parentNode.children[0].children[0]
            .innerText;
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.latitude = results[0].geometry.location.lat();
            this.longitude = results[0].geometry.location.lng();
            this.zoom = 15;
            this.destinationCaption = address;
            this.getCarParks();
            this.getSupermarkets();
            this.getPetrolStations();
          }
        });
      });
    });
  }

  saveSearch(event: any) {
    console.log(this.latitude, this.longitude, this.destinationCaption);
    this.dataService.saveSearch(
      this.latitude,
      this.longitude,
      this.destinationCaption
    );
  }

  exportSearch(event: any) {
    // To do: create function for exporting chosen destination to a text file
  }

  deleteSearch(event: any) {
    for (let i = 0; i < this.searches.length; i++) {
      if (
        this.searches[i][0] ===
        event.currentTarget.parentNode.parentNode.children[0].children[0]
          .innerText
      ) {
        this.dataService.deleteSavedSearch(this.searches[i][3]);
      }
    }
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  ngOnDestroy() {
    if (this.carParkSubscription) {
      this.carParkSubscription.unsubscribe();
    }
    if (this.supermarketSubscription) {
      this.supermarketSubscription.unsubscribe();
    }
    if (this.petrolStationSubscription) {
      this.petrolStationSubscription.unsubscribe();
    }
    if (this.loadSavedSearchesSubscription) {
      this.loadSavedSearchesSubscription.unsubscribe();
    }
  }
}
