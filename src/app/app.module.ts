import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCheckboxModule, MdDatepicker, MdDatepickerModule, MdDialogContent, MdDialogModule, MdIconModule,
  MdNativeDateModule, MdSelect, MdSelectModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { AccordionModule } from 'ngx-bootstrap';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { routingComponent } from './app-routing.module';
import 'hammerjs';
import { LocalStorageModule } from 'angular-2-local-storage';

import {ReactiveFormsModule} from '@angular/forms';
import { ListComponentComponent } from './list-component/list-component.component';
import { LoginComponent } from './login/login.component';
import { LoadListComponent } from './load-list/load-list.component';
import { TruckListComponent } from './truck-list/truck-list.component';
import { NewLoadComponent } from './new-load/new-load.component';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EditTruckListComponent } from './edit-truck-list/edit-truck-list.component';
import {SharedServiceService} from './shared-service.service';
import { EditLoadListComponent } from './edit-load-list/edit-load-list.component';
import { LoadImageComponent } from './load-image/load-image.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureComponent } from './load-list/signature/signature.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponentComponent,
    routingComponent,
    LoginComponent,
    LoadListComponent,
    TruckListComponent,
    NewLoadComponent,
    ConfirmationDialogComponent,
    EditTruckListComponent,
    EditLoadListComponent,
    LoadImageComponent,
    SignatureComponent
  ],
  entryComponents: [ConfirmationDialogComponent]
  ,
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    InfiniteScrollModule,
    MaterialModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdDialogModule,
    MdIconModule,
    MdSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NguiDatetimePickerModule,
    SignaturePadModule ,
    LocalStorageModule.withConfig({
      prefix: 'app-root',
      storageType: 'localStorage'
    })
  ],
  exports: [MdButtonModule, MdCheckboxModule],
  providers: [SharedServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
