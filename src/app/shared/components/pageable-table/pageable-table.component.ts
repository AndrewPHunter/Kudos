import {
  Component,
  Input,
  TemplateRef,
  Output,
  ViewChild,
  ContentChildren,
  QueryList,
  ContentChild,
  AfterContentInit,
  AfterViewInit,
  OnDestroy,
  EventEmitter
} from "@angular/core";
import { Subscription, BehaviorSubject, Subject } from "rxjs";
import {
  MatTable,
  MatHeaderRowDef,
  MatRowDef,
  MatColumnDef,
  MatPaginator,
  MatSort
} from "@angular/material";

@Component({
  selector: "app-pageable-table",
  templateUrl: "./pageable-table.component.html",
  styleUrls: ["./pageable-table.component.css"]
})
export class PageableTableComponent
  implements AfterContentInit, AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = [];

  @Input()
  isLoading?: boolean;

  @Input()
  tableColumns: Array<string>;

  @Input()
  data: Array<any>;

  @Input()
  totalRecords: number;

  @Input()
  headerTemplate?: TemplateRef<any>;

  @Output()
  paginatorRendered = new EventEmitter<MatPaginator>();

  @Output()
  sortRendered = new EventEmitter<MatSort>();

  @ViewChild(MatTable) table: MatTable<any>;

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<any>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ContentChild(MatSort) matSort: MatSort;

  constructor() {}

  ngAfterViewInit() {
    this.paginatorRendered.emit(this.paginator);
    this.sortRendered.emit(this.matSort);
  }

  ngAfterContentInit() {
    this._addTableMetaData();
    this._requestDataOnTableQuery();
  }

  /**
   * @description Iterate through subscription list and unsubscripe to prevent
   * memory leaks
   */
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * @description Read through row and column defs from parent (passed through ng-props)
   * and add to table
   */
  private _addTableMetaData() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef =>
      this.table.addHeaderRowDef(headerRowDef)
    );
  }

  /**
   * @description setup subscriptions to inform parent component of page or sort event
   */
  private _requestDataOnTableQuery() {}
}
