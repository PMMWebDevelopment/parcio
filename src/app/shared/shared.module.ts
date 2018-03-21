import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./layout/footer.component";
import { HeaderComponent } from "./layout/header.component";
import { AuthService } from "../services/auth.service";

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, RouterModule]
})
export class SharedModule {}
