import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { InfodisplayComponent } from "./infodisplay/infodisplay.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "infodisplay", component: InfodisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
