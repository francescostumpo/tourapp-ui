// tslint:disable:variable-name
import {TourOperator} from './tour-operator';
import {TicketTipology} from './ticket-tipology';

export class TicketVirtual {
  _id: string;
  _rev: string;
  ticketId: string;
  luogoEmissione: string;
  luogoAttivazione: string;
  dataAttivazione: string;
  ticketTipology: TicketTipology;
  tourOperator: TourOperator;
  totaleEuro: number;
  randomPassword: string;
  accessoEffettuato: boolean;
  attivato: boolean;
  nazione: string;
}
