import { Injectable } from "@angular/core";
import { TableServiceBase } from "../shared/services/table.service-base";
import { UserKudo } from "./models/userKudos.model";
import { ApiService } from "../core/services/api.service";
import { from } from "rxjs";
import { switchMap, mergeMap, toArray, map } from "rxjs/operators";
import { UserProfile } from "./models/user-profile.model";

const urls = {
  kudos: "kudos",
  users: "users/:id"
};

@Injectable()
export class KudosService extends TableServiceBase<UserKudo> {
  constructor(api: ApiService) {
    super(api);
  }

  public fetch() {
    return this._api
      .get<UserKudo>(urls.kudos)
      .pipe(
        switchMap((kudos: UserKudo[]) => {
          return from(kudos);
        }),
        mergeMap((kudo: UserKudo) => {
          return this._api
            .get<UserProfile>(urls.users.replace(":id", `${kudo.giver_id}`))
            .pipe(
              map((user: UserProfile) => {
                kudo.name = user.username;
                return kudo;
              })
            );
        }),
        toArray()
      )
      .subscribe(kudos => {
        this._data = kudos;
        this._dataSubject.next(this._data.slice());
      });
  }
}
