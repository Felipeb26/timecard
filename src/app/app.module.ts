import { MatToolbarModule } from '@angular/material/toolbar';
import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from "@angular/material/table"
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatExpansionModule } from "@angular/material/expansion";
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
import { LoginComponent } from './pages/login/login.component';
import { InterceptorService } from './services/shared/interceptor.service';
import { PontoComponent } from './pages/ponto/ponto.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { CookieService } from "ngx-cookie-service";
import { JwtModule } from "@auth0/angular-jwt";
import { UserComponent } from './pages/user/user.component';
import { CacheInterceptorService } from './services/cache/cache-interceptor.service';

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
    UserComponent
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
