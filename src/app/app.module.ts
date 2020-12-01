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
    TourOperatorComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
