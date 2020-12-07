import { BrowserModule } from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';

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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { TicketStandardValidateComponent } from './components/ticketing/ticket-standard-validate/ticket-standard-validate.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { BookingComponent } from './components/booking/booking.component';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReportingComponent } from './components/reporting/reporting.component';
import { LoginComponent } from './components/login/login.component';
import {AuthService} from './services/auth.service';
import {TokenInterceptor} from './token-interceptor';
import { TicketVirtualComponent } from './components/ticketing/ticket-virtual/ticket-virtual.component';
import { TicketVirtualValidateComponent } from './components/ticketing/ticket-virtual-validate/ticket-virtual-validate.component';
import { VirtualTourComponent } from './components/virtual-tour/virtual-tour.component';
import { PizzoTownComponent } from './components/virtual-tour/pizzo-town/pizzo-town.component';
import { MuratCastleComponent } from './components/virtual-tour/murat-castle/murat-castle.component';
import { PiedigrottaChurchComponent } from './components/virtual-tour/piedigrotta-church/piedigrotta-church.component';
import { VjsPlayerComponent } from './components/vjs-player/vjs-player.component';

const authService = new AuthService();

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
    ReportingComponent,
    LoginComponent,
    TicketVirtualComponent,
    TicketVirtualValidateComponent,
    VirtualTourComponent,
    PizzoTownComponent,
    MuratCastleComponent,
    PiedigrottaChurchComponent,
    VjsPlayerComponent
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
  providers: [{
    provide: AuthService,
    useValue: authService
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})

export class AppModule implements DoBootstrap{
  ngDoBootstrap(appRef: ApplicationRef): void {
    authService.init().then(r => {
      console.log('[ngDoBootstrap] bootstrap app');
      appRef.bootstrap(AppComponent);
    }).catch(
      error => console.log(error)
    );
  } }
