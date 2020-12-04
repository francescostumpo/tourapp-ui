import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  goToApp(): void{
    const roles = this.authService.getRoles();
    if (roles.includes('operatore_comunale')){
      this.router.navigate(['reporting'], {relativeTo: this.route});
    }else{
      this.router.navigate(['homepage'], {relativeTo: this.route});
    }
  }

}
