import { Component } from "@angular/core";
import { PageableTableWrapperBase } from "src/app/shared/components/pageable-table/pageable-table-wrapper.component-base";
import { UserKudo } from "../models/userKudos.model";
import { KudosService } from "../profile.services";
import { UiService } from "src/app/core/services/ui.service";

@Component({
  templateUrl: "./profile-listing.component.html"
})
export class ProfileListingComponent extends PageableTableWrapperBase<
  UserKudo
> {
  public tableColumns = ["name", "text", "created_at", "updated_at"];

  constructor(service: KudosService, uiService: UiService) {
    super(service, uiService);
  }
}
