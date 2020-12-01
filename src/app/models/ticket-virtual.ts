// tslint:disable:variable-name
import {TicketTipology} from './ticket-tipology';
import {Site} from './site';
import {TourOperator} from './tour-operator';

export class TicketVirtual {
  _id: string;
  _rev: string;
  ticketId: string;
  ticketTipology: TicketTipology;
  siti: Array<Site>;
  tourOperator: TourOperator;
  nIngressi: number;
  dataEmissione: string;
  totaleEuro: number;
  randomPassword: string;
  clientIp: string;
}
