import { MatToolbarModule } from '@angular/material/toolbar';
import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from "@angular/material/table"
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { PointTableComponent } from './component/point-table/point-table.component';
import { HomeComponent } from './pages/home/home.component';
//calendar
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { CalendarComponent } from './component/calendar/calendar.component';
import { PointCrudComponent } from './component/point-crud/point-crud.component';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PointTableComponent,
    HomeComponent,
    CalendarComponent,
    PointCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    FullCalendarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
    }),
    SweetAlert2Module.forRoot(),
    MatSelectModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt-BR",
    }], bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
