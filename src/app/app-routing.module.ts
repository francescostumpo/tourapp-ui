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
import {AuthGuardService} from './services/auth-guard.service';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'tourApp', pathMatch: 'full'},
  { path: 'tourApp', component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuardService]},
  { path: 'tourApp/homepage', component: HomepageComponent, canActivate: [AuthGuardService], data: {expectedRoles: ['amministratore', 'operatore_biglietteria', 'operatore_biglietteria_comunale']}},
  // tslint:disable-next-line:max-line-length
  { path: 'tourApp/anagrafica', component: AnagraficaComponent, canActivate: [AuthGuardService], data: {expectedRoles: ['amministratore']} },
  { path: 'tourApp/anagrafica/siti', component: SitoComponent, canActivate: [AuthGuardService], data: {expectedRoles: ['amministratore']} },
  // tslint:disable-next-line:max-line-length
  { path: 'tourApp/anagrafica/tipologiaTickets', component: TicketTipologyComponent, canActivate: [AuthGuardService], data: {expectedRoles: ['amministratore']} },
  { path: 'tourApp/anagrafica/tourOperators', component: TourOperatorComponent, canActivate: [AuthGuardService], data: {expectedRoles: ['amministratore']} },
  { path: 'tourApp/ticketing', component: TicketingComponent, canActivate: [AuthGuardService], data: {expectedRoles: ['amministratore', 'operatore_biglietteria', 'operatore_biglietteria_comunale']}},
  { path: 'tourApp/ticketing/ticketStandard', component: TicketStandardComponent, canActivate: [AuthGuardService], data: {expectedRoles: ['amministratore', 'operatore_biglietteria', 'operatore_biglietteria_comunale']}},
  // tslint:disable-next-line:max-line-length
  { path: 'tourApp/ticketing/verifyTicketStandard', component: TicketStandardValidateComponent, canActivate: [AuthGuardService], data: {expectedRoles: ['amministratore', 'operatore_biglietteria', 'operatore_biglietteria_comunale']}},
  { path: 'tourApp/booking', component: BookingComponent, canActivate: [AuthGuardService], data: {expectedRoles: ['amministratore']}},
  { path: 'tourApp/reporting', component: ReportingComponent, canActivate: [AuthGuardService], data: {expectedRoles: ['amministratore', 'operatore_comunale']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
