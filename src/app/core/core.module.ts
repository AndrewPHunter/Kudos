import { NgModule, SkipSelf, Optional } from "@angular/core";
import { EnsureModuleLoadedOnce } from "./ensureModuleLoadedOnce";
import { SharedModule } from "../shared/shared.module";
import { ApiService } from "./services/api.service";
import { LayoutComponent } from "./layout/layout.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { SidenavListComponent } from "./sidenav-list/sidenav-list.component";
import { HttpClientModule } from "@angular/common/http";
import { UiService } from "./services/ui.service";
import { AuthService } from "./services/auth.service";

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidenavListComponent],
  imports: [SharedModule, HttpClientModule, RouterModule],
  exports: [LayoutComponent, HttpClientModule],
  providers: [ApiService, UiService, AuthService]
})
export class CoreModule extends EnsureModuleLoadedOnce {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
