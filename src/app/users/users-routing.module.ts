import { NgModule } from "@angular/core";
import { UserListingComponent } from "./user-listing/user-listing.component";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users.component";

const routes: Routes = [{ path: "users", component: UsersComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
