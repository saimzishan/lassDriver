import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {DriverServices} from '../commanservices.service';
import {SharedServiceService} from '../shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [DriverServices],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: any;
  token: any;
  info: any;
  constructor( private router: Router, public snackBar: MdSnackBar,
               private driverServices: DriverServices, private ss: SharedServiceService) {
    this.userForm = new  FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)] )
    });
  }
  onSubmit() {
    // validations
    if (this.userForm.untouched || this.userForm.invalid) {
      this.openSnackBar('Validation Error please fill the form properly', 'Close');
      return;
    }
    this.ss.isLoading = true;
   /* const  info = this.userForm.value;
    this.token = info;*/
    // 1. login from server
    this.driverServices.userLogin(this.userForm.value)
      .subscribe(
        sucess => { if (sucess) { localStorage.setItem('currentUser', ( sucess.token ));
         this.ss.openSnackBarToast('Login Successfully ');
                    this.router.navigate(['/Lists']);
        } },
        resCusError => { this.handleError(resCusError); },
        ()    =>  {this.ss.isLoading = false; }
      );
    // 2. navigate to another page if authentications are true
    // this.router.navigate(['/Lists']);
    // storing the token on local storage
  }
  handleError(err: any) {
    if (err.error != null) {
      this.ss.openSnackBarToast('Hmm ' + err.error );
      return;
    }
    this.ss.openSnackBarToast('Server Error');
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }


  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/Lists']);
    }
  }

}
