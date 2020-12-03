import { Component, OnInit } from '@angular/core';
import {ReportingService} from '../../services/reporting.service';
import {DownloadService} from '../../services/download.service';
import {DateFormatterService} from '../../services/utils/date-formatter.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  dataDATS: Date;
  dataATS: Date;
  dataDATV: Date;
  dataATV: Date;
  areDatesTSNotPresent = true;
  areDatesTVNotPresent = true;

  // tslint:disable-next-line:max-line-length
  constructor(private reportingService: ReportingService, private downloadService: DownloadService, private dateFormatterService: DateFormatterService) { }

  ngOnInit(): void {
    this.checkTSDates();
    this.checkTVDates();
  }

  downloadReport(type: string): void {
    let dateDa: Date;
    let dateA: Date;
    if (type === 'ts'){
      dateDa = this.dataDATS;
      dateA = this.dataATS;
    } else{
      dateDa = this.dataDATV;
      dateA = this.dataATV;
    }
    console.log(dateDa, dateA);
    this.reportingService.downloadReport(dateDa, dateA, type).subscribe( res => {
      console.log(res);
      // tslint:disable-next-line:max-line-length
      this.downloadService.downloadFile(res, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'report_' + type + '_' + this.dateFormatterService.formateDateD(new Date()) + '.xlsx');
    }, error => {
      alert(error.message);
    });
  }

  checkTSDates(): void {
    if (this.dataDATS !== undefined && this.dataATS !== undefined){
      this.areDatesTSNotPresent = false;
    }
  }

  checkTVDates(): void {
    if (this.dataDATV !== undefined && this.dataATV !== undefined){
      this.areDatesTVNotPresent = false;
    }
  }
}
