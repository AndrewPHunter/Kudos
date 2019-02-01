import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { UserListingComponent } from "./user-listing/user-listing.component";
import { UserService } from "./user.services";
import { AddKudoComponent } from "./add-kudo/add-kudo.component";

@NgModule({
  declarations: [UsersComponent, UserListingComponent, AddKudoComponent],
  imports: [SharedModule, UsersRoutingModule],
  providers: [UserService],
  entryComponents: [UserListingComponent, AddKudoComponent]
})
export class UsersModule {}
