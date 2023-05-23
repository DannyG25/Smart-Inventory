import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BinnacleRoutingModule } from './binnacle-routing.module';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { BinnacleComponent } from './binnacle.component';



@NgModule({
  declarations: [ BinnacleComponent],
  imports: [
    CommonModule,
    BinnacleRoutingModule,
    TableModule,
    FileUploadModule,
    AutoCompleteModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    ChipsModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
		CascadeSelectModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule

  ]
})
export class BinnacleModule { }
