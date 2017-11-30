import { Component, OnInit } from '@angular/core';
import {GuardServices} from './guardServices';
import {Router} from '@angular/router';
import {DriverServices} from './commanservices.service';
import {SharedServiceService} from './shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [GuardServices, DriverServices],
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app works!';
  token: boolean = this.local.getToken();
  constructor( private router: Router, private local: GuardServices,  private driverServices:
                 DriverServices, private ss: SharedServiceService) {}
  ngOnInit() {
    this.token = this.local.getToken();
  }
  logout() {
    this.ss.isLoading = true;
    this.driverServices.userLogout()
      .subscribe(
        sucess => { if (sucess) { localStorage.removeItem('currentUser'); this.token = true;
          this.router.navigate(['/']); }
          this.ss.openSnackBarToast('Logged Out Successfully');
          },
        resCusError => {this.handleError(resCusError);
          this.ss.openSnackBarToast('Error');
        } ,
        ()    =>  {this.ss.isLoading = false;
          }
      );
  }
  handleError(err: any) {
    if (err.error != null) {
      this.ss.openSnackBarToast(err.error );
      return;
    }
    this.ss.openSnackBarToast('Server Error');
  }
}
