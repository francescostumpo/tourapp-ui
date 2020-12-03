import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './components/homepage/homepage.component';
import {TicketingComponent} from './components/ticketing/ticketing.component';
import {TicketStandardComponent} from './components/ticketing/ticket-standard/ticket-standard.component';
import {AnagraficaComponent} from './components/anagrafica/anagrafica.component';
import {SitoComponent} from './components/anagrafica/sito/sito.component';
import {TicketTipologyComponent} from './components/anagrafica/ticket-tipology/ticket-tipology.component';
import {TourOperatorComponent} from './components/anagrafica/tour-operator/tour-operator.component';
import {TicketStandardValidateComponent} from './components/ticketing/ticket-standard-validate/ticket-standard-validate.component';
import {BookingComponent} from './components/booking/booking.component';
import {ReportingComponent} from './components/reporting/reporting.component';

const routes: Routes = [
  { path: '', redirectTo: 'tourApp', pathMatch: 'full'},
  { path: 'tourApp', component: HomepageComponent },
  { path: 'tourApp/anagrafica', component: AnagraficaComponent },
  { path: 'tourApp/anagrafica/siti', component: SitoComponent },
  { path: 'tourApp/anagrafica/tipologiaTickets', component: TicketTipologyComponent },
  { path: 'tourApp/anagrafica/tourOperators', component: TourOperatorComponent },
  { path: 'tourApp/ticketing', component: TicketingComponent},
  { path: 'tourApp/ticketing/ticketStandard', component: TicketStandardComponent},
  { path: 'tourApp/ticketing/verifyTicketStandard', component: TicketStandardValidateComponent},
  { path: 'tourApp/booking', component: BookingComponent},
  { path: 'tourApp/reporting', component: ReportingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
