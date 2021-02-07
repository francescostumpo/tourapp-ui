import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import videojs from 'video.js';
import {TicketVirtual} from '../../models/ticket-virtual';
import {TicketVirtualService} from '../../services/ticket-virtual.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-virtual-tour',
  templateUrl: './virtual-tour.component.html',
  styleUrls: ['./virtual-tour.component.css']
})
export class VirtualTourComponent implements OnInit {
  ticketVirtual: TicketVirtual;

  constructor(private ticketVirtualService: TicketVirtualService, private router: Router, private route: ActivatedRoute) {
    this.ticketVirtual = new TicketVirtual();
  }

  ngOnInit(): void {
  }


  login(): void {
    console.log(this.ticketVirtual);
    this.ticketVirtualService.loginToVirtualTour(this.ticketVirtual).subscribe(res => {
      console.log(res);
      // @ts-ignore
      if (res.body.message.includes('Piedigrotta')) {
        this.router.navigate(['piedigrottaChurch'], {relativeTo: this.route});
        // @ts-ignore
      } else if (res.body.message.includes('Castello')) {
        this.router.navigate(['muratCastle'], {relativeTo: this.route});
      } else {
        this.router.navigate(['pizzoTown'], {relativeTo: this.route});
      }
    }, error => {
      alert(error.error.message);
    });
  }
}
