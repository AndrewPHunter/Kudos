import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"]
})
export class SidenavListComponent {
  @Output()
  sidenavClose = new EventEmitter<void>();

  routes = [
    { link: "/profile", icon: "account_circle", title: "Profile" },
    { link: "/users", icon: "people", title: "Users" }
  ];
  constructor() {}

  onClose() {
    this.sidenavClose.emit();
  }
}
