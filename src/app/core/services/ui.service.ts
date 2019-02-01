import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ComponentType } from "@angular/cdk/overlay/index";
import { BehaviorSubject, Subject } from "rxjs";
import { IDialogOptions } from "src/app/shared/models/Dialog.model";

@Injectable()
export class UiService {
  constructor(private matDialog: MatDialog) {}

  public showDialog(dialog: ComponentType<any>, options: IDialogOptions) {
    const dialogEvent = new Subject<any>();
    const { title, dialogData, ...rest } = options;
    const dialogRef = this.matDialog.open(dialog, {
      width: "80%",
      data: { title, entity: dialogData },
      ...rest
    });
    dialogRef.afterClosed().subscribe(resp => {
      dialogEvent.next(resp);
    });
    return dialogEvent;
  }
}
