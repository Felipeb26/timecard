import { registerLocaleData } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localePt from "@angular/common/locales/pt";
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from "@angular/material/dialog";
//
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { PointTableComponent } from './component/point-table/point-table.component';
import { HomeComponent } from './pages/home/home.component';
//calendar
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CookieService } from "ngx-cookie-service";
import { ToastrModule } from 'ngx-toastr';
import { CalendarComponent } from './component/calendar/calendar.component';
import { PointCrudComponent } from './component/point-crud/point-crud.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { LoginComponent } from './pages/login/login.component';
import { PontoComponent } from './pages/ponto/ponto.component';
import { UserComponent } from './pages/user/user.component';
import { CacheInterceptorService } from './services/cache/cache-interceptor.service';
import { InterceptorService } from './services/shared/interceptor.service';
import { CreateForgetComponent } from './pages/create-forget/create-forget.component';
import DatetimeControlComponent from './datetime/datetime-control/datetime-control.component';
import { TimeComponent } from './datetime/time/time.component';
import { DateCalendarComponent } from './datetime/date-calendar/date-calendar.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PointTableComponent,
    HomeComponent,
    CalendarComponent,
    PointCrudComponent,
    LoginComponent,
    PontoComponent,
    ContatoComponent,
    UserComponent,
    CreateForgetComponent,
    DatetimeControlComponent,
    TimeComponent,
    DateCalendarComponent,
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
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    MatExpansionModule,
    MatDialogModule,
    // JwtModule.forRoot(),
  ],
  providers: [
    CookieService,
    { provide: LOCALE_ID, useValue: "pt-BR" },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptorService, multi: true }
  ], bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
