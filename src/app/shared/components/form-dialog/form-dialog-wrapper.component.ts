import { OnDestroy, QueryList, ViewChildren } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialogRef } from "@angular/material";
import { IDialogFormData } from "../../models/Dialog.model";
import { NgForm, NgModel } from "@angular/forms";

export abstract class FormDialogWrapperBase<T> implements OnDestroy {
  protected _subscriptions: Subscription[] = [];
  entity: any;

  constructor(
    protected _dialogRef: MatDialogRef<T>,
    public data: IDialogFormData
  ) {
    this.entity = { ...data.entity };
  }

  @ViewChildren(NgModel)
  protected _inputs: QueryList<NgModel>;

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  registerForm(form: NgForm) {
    this._inputs.forEach(input => {
      form.addControl(input);
    });
  }

  onSubmit(form: NgForm) {
    this._dialogRef.close({
      ...this.entity,
      ...form.value
    });
  }
}
