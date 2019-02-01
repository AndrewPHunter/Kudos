import { Injectable } from "@angular/core";
import { TableServiceBase } from "../shared/services/table.service-base";
import { User } from "./models/user.model";
import { ApiService } from "../core/services/api.service";
import { Kudo } from "./models/kudo.model";

const urls = {
  users: "users",
  kudos: "kudos"
};
@Injectable()
export class UserService extends TableServiceBase<User> {
  constructor(api: ApiService) {
    super(api);
  }

  fetch() {
    return this._api.get<User>(urls.users).subscribe((users: User[]) => {
      this._data = users;
      this._dataSubject.next(this._data.slice());
    });
  }

  giveKudo(kudo: Kudo) {
    this.tableUpdating.next(true);
    this._api.create<Kudo>(urls.kudos, kudo).subscribe(_ => {
      this.tableUpdating.next(false);
      this.refreshTable.next();
    });
  }
}
