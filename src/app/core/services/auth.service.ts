import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";
import { User } from "src/app/users/models/user.model";

const urls = {
  user: "users/me"
};

@Injectable()
export class AuthService {
  private _user: User;

  get user() {
    return this._user;
  }

  constructor(private _api: ApiService) {}

  loadUser() {
    this._api.get<User>(urls.user).subscribe((user: User) => {
      this._user = user;
    });
  }
}
