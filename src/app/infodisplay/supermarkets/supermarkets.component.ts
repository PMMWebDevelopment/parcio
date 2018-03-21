import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Observable } from "rxjs/observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-supermarkets",
  templateUrl: "./supermarkets.component.html",
  styleUrls: ["./supermarkets.component.css"]
})
export class SupermarketsComponent implements OnInit, OnDestroy {
  supermarketsSubscription: Subscription;
  supermarkets = [];

  constructor(private dataService: DataService) {
    this.supermarketsSubscription = this.dataService.supermarkets$.subscribe((supermarkets: any[] ) => {
      this.supermarkets = supermarkets;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.supermarketsSubscription.unsubscribe();
  }
}
