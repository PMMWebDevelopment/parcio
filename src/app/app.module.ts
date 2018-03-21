// Base display modules and shared components
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { HomeModule } from "./home/home.module";
import { SharedModule, FooterComponent, HeaderComponent } from "./shared";
import { LoadingModule } from "ngx-loading";

// Forms modules
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Http provision
import { HttpClientModule, HttpClient } from "@angular/common/http";

// Google Maps
import { AgmCoreModule } from "@agm/core";

// Angular Firebase
import * as firebase from "firebase/app";
import { environment } from "./../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthService } from "../app/services/auth.service";
import { DataService } from "../app/services/data.service";

// App's own Components (apart from Header and Footer)
import { AppComponent } from "./app.component";
import { InfodisplayComponent } from "./infodisplay/infodisplay.component";
import { PetrolComponent } from "./infodisplay/petrol/petrol.component";
import { CarparkComponent } from "./infodisplay/carpark/carpark.component";
import { SupermarketsComponent } from "./infodisplay/supermarkets/supermarkets.component";

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {
  useHash: true
});

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    InfodisplayComponent,
    PetrolComponent,
    CarparkComponent,
    SupermarketsComponent,
  ],
  imports: [
    AgmCoreModule.forRoot(environment.googleMaps),
    BrowserModule,
    BrowserAnimationsModule,
    LoadingModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SharedModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    rootRouting
  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
