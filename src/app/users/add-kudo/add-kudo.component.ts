import { Component, OnInit, Inject } from "@angular/core";
import { FormDialogWrapperBase } from "src/app/shared/components/form-dialog/form-dialog-wrapper.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IDialogFormData } from "src/app/shared/models/Dialog.model";

@Component({
  selector: "app-add-kudo",
  templateUrl: "./add-kudo.component.html"
})
export class AddKudoComponent extends FormDialogWrapperBase<AddKudoComponent> {
  constructor(
    dialogRef: MatDialogRef<AddKudoComponent>,
    @Inject(MAT_DIALOG_DATA) data: IDialogFormData
  ) {
    super(dialogRef, data);
  }
}
