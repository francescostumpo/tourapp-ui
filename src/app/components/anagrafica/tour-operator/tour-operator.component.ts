import { Component, OnInit } from '@angular/core';
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {TourOperator} from '../../../models/tour-operator';
import {TourOperatorService} from '../../../services/tour-operator.service';

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
  constructor(private tourOperatorService: TourOperatorService) { }

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
}
