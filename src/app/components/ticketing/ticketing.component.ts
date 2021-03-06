import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.css']
})
export class TicketingComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  goToView(location: string) {
    this.router.navigate([location], {relativeTo: this.route});
  }
}
