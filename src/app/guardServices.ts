import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import {SharedServiceService} from './shared-service.service';

@Injectable()
export class GuardServices implements CanActivate {
  constructor( private router: Router, private ss: SharedServiceService) {}
  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      this.ss.openSnackBarToast('Not allowed') ;
      this.router.navigate(['/']);
    }
  }
  getToken() {
    if (localStorage.getItem('currentUser')) {
      return false;
    }
    return true;
  }

}
