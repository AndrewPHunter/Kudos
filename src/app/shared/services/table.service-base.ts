import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";

export abstract class TableServiceBase<T> {
  protected _data: T[] = [];
  protected _dataSubject = new BehaviorSubject<T[]>(this._data.slice());
  public tableUpdating = new Subject<boolean>();
  public refreshTable = new Subject();

  public data = this._dataSubject.asObservable();

  constructor(protected _api: ApiService) {}

  abstract fetch(): void;
}
