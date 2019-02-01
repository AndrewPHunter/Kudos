import { Component } from "@angular/core";
import { ProfileListingComponent } from "./profile-listing/profile-listing.component";

@Component({
  selector: "app-user-profile",
  templateUrl: "../shared/components/default-page/default-page.component.html"
})
export class UserProfileComponent {
  title = "Profile";
  cardContent = ProfileListingComponent;

  constructor() {}
}
