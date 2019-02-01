import { Component } from "@angular/core";
import { UserListingComponent } from "./user-listing/user-listing.component";

@Component({
  selector: "app-users",
  templateUrl: "../shared/components/default-page/default-page.component.html"
})
export class UsersComponent {
  title = "User Kudos";
  cardContent = UserListingComponent;
}
