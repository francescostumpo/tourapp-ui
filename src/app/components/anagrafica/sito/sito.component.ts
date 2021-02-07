import {Component, OnInit} from '@angular/core';
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {SitoService} from '../../../services/sito.service';
import {Site} from '../../../models/site';
import {TourOperator} from '../../../models/tour-operator';

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
  site: Site;
  siteForUpdate: Site;
  isPanelUpdateVisible = false;
  isPanelCreateVisible = false;

  constructor(private sitoService: SitoService) {
    this.site = new Site();
    this.siteForUpdate = new Site();
  }

  ngOnInit(): void {
    this.getAllSites();
  }

  getAllSites() {
    this.sitoService.getAllSites().subscribe(res => {
      // @ts-ignore
      this.siteList = res.body;
      console.log('Available Sites: ', this.siteList);
    });
  }

  createOrUpdateSite(action: string) {
    let site: Site;
    if (action === 'update') {
      site = this.siteForUpdate;
    } else {
      site = this.site;
    }
    this.sitoService.createOrUpdateSite(site).subscribe(res => {
      // @ts-ignore
      console.log('Response: ', res.body);
      this.toggleCreateOrUpdatePanel(action);
      // @ts-ignore
      this.site = {};
      this.getAllSites();
    }, error => {
      alert(error.message.message);
    });
  }

  moveForUpdate(site: Site) {
    this.siteForUpdate = site;
    this.toggleCreateOrUpdatePanel('update');
  }

  toggleCreateOrUpdatePanel(action: string) {
    if (action === 'update') {
      this.isPanelCreateVisible = false;
      this.isPanelUpdateVisible = !this.isPanelUpdateVisible;
    } else {
      this.isPanelUpdateVisible = false;
      this.isPanelCreateVisible = !this.isPanelCreateVisible;
    }
  }

  deleteSite(site: Site) {
    this.sitoService.deleteSite(site).subscribe(res => {
      // @ts-ignore
      alert(res.body.message);
      this.getAllSites();
    });
  }
}
