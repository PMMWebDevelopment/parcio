import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from "../../services/data.service";

import { Observable } from "rxjs/observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-petrol',
  templateUrl: './petrol.component.html',
  styleUrls: ['./petrol.component.css']
})
export class PetrolComponent implements OnInit, OnDestroy {
  petrolStationSubscription: Subscription;
  petrolStations = [];

  constructor(private dataService: DataService) {
    this.petrolStations = [];
    this.petrolStationSubscription = this.dataService.petrolStations$.subscribe((petrolStations: any[] ) => {
      this.petrolStations = petrolStations;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.petrolStationSubscription.unsubscribe();
    this.petrolStations = [];
  }

}
