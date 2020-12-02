import { Component, OnInit } from '@angular/core';
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {TourOperator} from '../../../models/tour-operator';
import {TourOperatorService} from '../../../services/tour-operator.service';
import {TicketTipology} from '../../../models/ticket-tipology';
import {Site} from '../../../models/site';

@Component({
  selector: 'app-tour-operator',
  templateUrl: './tour-operator.component.html',
  styleUrls: ['./tour-operator.component.css']
})
// tslint:disable:typedef
export class TourOperatorComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  tourOperatorList: Array<TourOperator>;
  tourOperator: TourOperator;
  tourOperatorForUpdate: TourOperator;
  isPanelUpdateVisible = false;
  isPanelCreateVisible = false;

  constructor(private tourOperatorService: TourOperatorService) {
    this.tourOperator = new TourOperator();
    this.tourOperatorForUpdate = new TourOperator();
  }

  ngOnInit(): void {
    this.getAllTourOperators();
  }
  getAllTourOperators(){
    this.tourOperatorService.getAllTourOperators().subscribe( res => {
      // @ts-ignore
      this.tourOperatorList = res.body;
      console.log('Available TourOperators: ', this.tourOperatorList);
    });
  }

  createOrUpdateTourOperator(action: string){
    let tourOperator: TourOperator;
    if (action === 'update'){
      tourOperator = this.tourOperatorForUpdate;
    }else{
      tourOperator = this.tourOperator;
    }
    this.tourOperatorService.createOrUpdateTourOperator(tourOperator).subscribe( res => {
      // @ts-ignore
      console.log('Response: ', res.body);
      this.toggleCreateOrUpdatePanel(action);
      // @ts-ignore
      this.tourOperator = {};
      this.getAllTourOperators();
    }, error => {
      alert(error.message.message);
    });
  }

  moveForUpdate(tourOperator: TourOperator) {
    this.tourOperatorForUpdate = tourOperator;
    this.toggleCreateOrUpdatePanel('update');
  }

  toggleCreateOrUpdatePanel(action: string) {
    if (action === 'update'){
      this.isPanelCreateVisible = false;
      this.isPanelUpdateVisible = !this.isPanelUpdateVisible;
    }else{
      this.isPanelUpdateVisible = false;
      this.isPanelCreateVisible = !this.isPanelCreateVisible;
    }
  }

  deleteTourOperator(tourOperator: TourOperator) {
    this.tourOperatorService.deleteTourOperator(tourOperator).subscribe( res => {
      // @ts-ignore
      alert(res.body.message);
      this.getAllTourOperators();
    });
  }

}
