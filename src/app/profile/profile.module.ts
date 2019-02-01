import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { UserProfileComponent } from "./user-profile.component";
import { ProfileListingComponent } from "./profile-listing/profile-listing.component";
import { KudosService } from "./profile.services";

@NgModule({
  declarations: [UserProfileComponent, ProfileListingComponent],
  imports: [SharedModule, ProfileRoutingModule],
  entryComponents: [ProfileListingComponent],
  providers: [KudosService]
})
export class ProfileModule {}
