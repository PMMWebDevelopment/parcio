import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Observable } from "rxjs/observable";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: "app-carpark",
  templateUrl: "./carpark.component.html",
  styleUrls: ["./carpark.component.css"]
})
export class CarparkComponent implements OnInit, OnDestroy {
  carParkSubscription: Subscription;
  carParks = [];

  constructor(private dataService: DataService) {
    this.carParkSubscription = this.dataService.carParks$.subscribe((carParks: any[] ) => {
      this.carParks = carParks;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.carParkSubscription.unsubscribe();
    this.carParks = [];
  }
}
