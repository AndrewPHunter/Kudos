import { Component } from "@angular/core";
import { PageableTableWrapperBase } from "src/app/shared/components/pageable-table/pageable-table-wrapper.component-base";
import { User } from "../models/user.model";
import { UserService } from "../user.services";
import { UiService } from "src/app/core/services/ui.service";
import { AddKudoComponent } from "../add-kudo/add-kudo.component";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  templateUrl: "./user-listing.component.html"
})
export class UserListingComponent extends PageableTableWrapperBase<User> {
  public tableColumns = [
    "username",
    "first_name",
    "last_name",
    "kudos_given_count",
    "kudos_received_count",
    "giveKudo"
  ];
  constructor(
    service: UserService,
    uiService: UiService,
    private _auth: AuthService
  ) {
    super(service, uiService);
  }

  onGiveKudo(element: User) {
    const dialogSubscription = this._showDialog(AddKudoComponent, {
      title: "Give Kudo",
      dialogData: element
    }).subscribe(kudo => {
      if (kudo) {
        (<UserService>this._service).giveKudo({
          receiver_id: kudo.id,
          text: kudo.text,
          giver_id: this._auth.user.id
        });
      }
    });

    this._subscriptions.push(dialogSubscription);
  }
}
