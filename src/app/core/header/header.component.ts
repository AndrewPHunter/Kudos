import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  @Output()
  sidenavToggle = new EventEmitter<void>();
  constructor() {}

  onToggleSideNav() {
    console.log("wtf");
    this.sidenavToggle.emit();
  }
}
