import {
  Component,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  EventEmitter
} from "@angular/core";
import { DebouncedInputComponent } from "../debounced-input/debounced-input.component";

@Component({
  selector: "app-simple-filter-header",
  templateUrl: "./simple-filter-header.component.html"
})
export class SimpleFilterHeaderComponent implements AfterViewInit {
  @Input()
  filterPlaceholder: string;

  @Output()
  addButtonClicked = new EventEmitter<void>();

  @Output()
  viewRendered = new EventEmitter<DebouncedInputComponent>();

  @ViewChild(DebouncedInputComponent) filter: DebouncedInputComponent;

  constructor() {}

  ngAfterViewInit() {
    this.viewRendered.emit(this.filter);
  }

  onClick() {
    this.addButtonClicked.emit();
  }
}
