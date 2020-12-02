// tslint:disable:variable-name
import {TicketTipology} from './ticket-tipology';
import {Site} from './site';
import {TourOperator} from './tour-operator';

export class TicketStandard {
  _id: string;
  _rev: string;
  ticketId: string;
  tipologiaTicket: TicketTipology;
  siti: Array<Site>;
  tourOperator: TourOperator;
  nIngressi: number;
  nazione: string;
  dataEmissione: string;
  totaleEuro: number;
}
