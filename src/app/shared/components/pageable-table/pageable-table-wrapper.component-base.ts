import { TableServiceBase } from "../../services/table.service-base";
import { BehaviorSubject, Subscription } from "rxjs";
import { IFilterInformation } from "../../models/TableQuery.model";
import {
  OnDestroy,
  ViewChild,
  OnInit,
  AfterViewInit,
  AfterContentInit
} from "@angular/core";
import { DebouncedInputComponent } from "../debounced-input/debounced-input.component";
import {
  MatSelect,
  MatTableDataSource,
  MatPaginator,
  MatSort
} from "@angular/material";
import { PageableTableComponent } from "./pageable-table.component";
import { UiService } from "src/app/core/services/ui.service";
import { ComponentType } from "@angular/cdk/overlay/index";
import { IDialogOptions } from "../../models/Dialog.model";

export abstract class PageableTableWrapperBase<T>
  implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  data: MatTableDataSource<T>;

  protected _subscriptions: Subscription[] = [];
  protected _filterFor: DebouncedInputComponent;
  protected _paginator: MatPaginator;
  protected _sort: MatSort;

  @ViewChild("table")
  protected _table: PageableTableComponent;

  constructor(
    protected _service: TableServiceBase<T>,
    protected _uiService: UiService
  ) {}

  ngOnInit() {
    this._subscribeToDataChanges();
  }

  ngAfterViewInit() {
    this._subscribeToTableEvents();
  }

  ngAfterContentInit() {
    this._table.isLoading = true;
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  protected _showDialog(dialog: ComponentType<any>, options: IDialogOptions) {
    return this._uiService.showDialog(dialog, options);
  }

  registerSimpleFilterInput(input: DebouncedInputComponent) {
    this._filterFor = input;
    const subscription = this._filterFor.valueChanges.subscribe(filterValue =>
      this._fetchData()
    );
    this._subscriptions.push(subscription);
  }

  registerPaginator(paginator: MatPaginator) {
    this._paginator = paginator;
  }

  registerSort(sort: MatSort) {
    this._sort = sort;
  }

  private _subscribeToTableEvents() {
    let subscription = this._service.tableUpdating.subscribe(updating => {
      this._table.isLoading = updating;
    });

    this._subscriptions.push(subscription);

    subscription = this._service.refreshTable.subscribe(_ => {
      this._fetchData();
    });
  }

  private _subscribeToDataChanges() {
    const subscription = this._service.data.subscribe(data => {
      this.data = new MatTableDataSource(data);
      this.data.sort = this._sort;
      this.data.paginator = this._paginator;
      if (
        this._filterFor &&
        this._filterFor.value &&
        this._filterFor.value !== ""
      ) {
        this.data.filter = this._filterFor.value.trim().toLowerCase();
      }
      this._table.isLoading = false;
    });

    this._subscriptions.push(subscription);
  }

  private _fetchData() {
    this._table.isLoading = true;
    this._service.fetch();
  }
}
