import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { PageableTableComponent } from "./components/pageable-table/pageable-table.component";
import { ContentCardComponent } from "./components/content-card/content-card.component";
import { SimpleFilterHeaderComponent } from "./components/simple-filter-header/simple-filter-header.component";
import { DebouncedInputComponent } from "./components/debounced-input/debounced-input.component";
import { FormDialogComponent } from "./components/form-dialog/form-dialog.component";

@NgModule({
  declarations: [
    ContentCardComponent,
    PageableTableComponent,
    SimpleFilterHeaderComponent,
    DebouncedInputComponent,
    FormDialogComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ContentCardComponent,
    PageableTableComponent,
    SimpleFilterHeaderComponent,
    DebouncedInputComponent,
    FormDialogComponent
  ]
})
export class SharedModule {}
