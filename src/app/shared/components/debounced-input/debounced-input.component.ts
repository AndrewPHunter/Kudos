import {
  Component,
  AfterViewInit,
  Input,
  Output,
  OnDestroy,
  ViewChild,
  ElementRef,
  forwardRef
} from "@angular/core";
import { BehaviorSubject, Subscription, fromEvent } from "rxjs";
import { debounceTime, map, distinctUntilChanged } from "rxjs/operators";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-debounced-input",
  templateUrl: "./debounced-input.component.html",
  styleUrls: ["./debounced-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DebouncedInputComponent),
      multi: true
    }
  ]
})
export class DebouncedInputComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input()
  id = null;

  @Input()
  name = null;

  @Input()
  placeholder: string;

  @Input()
  type = "text";

  @Input()
  delayTime = 500;

  // tslint:disable-next-line:no-input-rename
  @Input("value")
  _value: string = null;

  get value() {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
    this.valueChanges.next(val);
  }

  @Output()
  valueChanges = new BehaviorSubject<string>(null);

  @ViewChild("debounced") input: ElementRef;

  private subscription: Subscription;

  isDisabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngAfterViewInit() {
    this.subscription = fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(this.delayTime),
        map((e: any) => e.target.value),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.value = value;
      });
  }

  writeValue(value: string): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    if (fn) {
      this.onChange = fn;
    }
  }

  registerOnTouched(fn: any): void {
    if (fn) {
      this.onTouched = fn;
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
