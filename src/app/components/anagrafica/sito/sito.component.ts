import { Component, OnInit } from '@angular/core';
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {SitoService} from '../../../services/sito.service';
import {Site} from '../../../models/site';

@Component({
  selector: 'app-sito',
  templateUrl: './sito.component.html',
  styleUrls: ['./sito.component.css']
})
// tslint:disable:typedef
export class SitoComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  siteList: Array<Site>;
  constructor(private sitoService: SitoService) { }

  ngOnInit(): void {
    this.getAllSites();
  }
  getAllSites(){
    this.sitoService.getAllSites().subscribe( res => {
      // @ts-ignore
      this.siteList = res.body;
      console.log('Available Sites: ', this.siteList);
    });
  }
}
