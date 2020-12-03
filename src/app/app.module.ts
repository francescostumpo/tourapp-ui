import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TicketingComponent } from './components/ticketing/ticketing.component';
import { TicketStandardComponent } from './components/ticketing/ticket-standard/ticket-standard.component';
import { AnagraficaComponent } from './components/anagrafica/anagrafica.component';
import { SitoComponent } from './components/anagrafica/sito/sito.component';
import { TicketTipologyComponent } from './components/anagrafica/ticket-tipology/ticket-tipology.component';
import { TourOperatorComponent } from './components/anagrafica/tour-operator/tour-operator.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { TicketStandardValidateComponent } from './components/ticketing/ticket-standard-validate/ticket-standard-validate.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { BookingComponent } from './components/booking/booking.component';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReportingComponent } from './components/reporting/reporting.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    TicketingComponent,
    TicketStandardComponent,
    AnagraficaComponent,
    SitoComponent,
    TicketTipologyComponent,
    TourOperatorComponent,
    TicketStandardValidateComponent,
    BookingComponent,
    ReportingComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        FormsModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory:  adapterFactory})
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
