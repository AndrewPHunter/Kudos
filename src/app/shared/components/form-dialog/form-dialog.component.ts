import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter
} from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html"
})
export class FormDialogComponent implements AfterViewInit {
  @Input()
  title: string;

  @Output()
  formRendered = new EventEmitter<NgForm>();

  @Output()
  formSubmitted = new EventEmitter<NgForm>();

  @ViewChild("dialogForm") dialogForm: NgForm;

  ngAfterViewInit() {
    this.formRendered.emit(this.dialogForm);
  }

  onSubmit(form: NgForm) {
    this.formSubmitted.emit(form);
  }
}
