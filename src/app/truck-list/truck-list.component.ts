import { Component, OnInit } from '@angular/core';
import {DriverServices} from '../commanservices.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {SharedServiceService} from '../shared-service.service';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  providers: [DriverServices],
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit {
  user: any;
  loadLists: any;
  projects: any;
  vehicles: any;
  customer: any = true;
  project: any = true;
  newTruckListForm = new  FormGroup({
    customer_id: new FormControl('', [Validators.required] ),
    project_id: new FormControl('', [Validators.required] ),
    vehicle_id: new FormControl('', [Validators.required] )
  });
  constructor( public snackBar: MdSnackBar, localStorageService: LocalStorageService,
               private router: Router, private driverServices: DriverServices, private ss: SharedServiceService) { }
  ngOnInit() {
    this.ss.isLoading = true;
    this.driverServices.getAllCustomers()
        .subscribe(
          sucess => { this.loadLists = sucess; console.log(sucess); },
          resCusError => {
            this.handleError(resCusError);
          },
          ()    =>  {this.ss.isLoading = false;}
        );
    }
  handleError(err: any) {
    if (err.error != null) {
      this.ss.openSnackBarToast('Hmm ' + err.error);
    } if (err.tokenError) {
      this.ss.openSnackBarToast(err.tokenError);
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
    } else {
      this.ss.openSnackBarToast(err);
    }
  }
  onSubmit() {
    if (this.newTruckListForm.untouched || this.newTruckListForm.invalid) {
      this.openSnackBar('Validation Error please fill the form properly', 'Close');
      return;
    }
    // 1. send to server
    this.ss.isLoading = true;
    this.driverServices.saveTruclList(this.newTruckListForm.value)
      .subscribe(
        sucess => { if (sucess) {
          this.ss.openSnackBarToast( sucess.success);
          this.router.navigate(['/Lists']); } },
        resCusError => { this.handleError(resCusError); } ,
        ()    =>  {this.ss.isLoading = false; }
      );
    // 2. navigate to another page if true
    //  this.router.navigate(['/loadLists']);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  onChange(cus_id) {
    this.ss.isLoading = true;
    this.driverServices.getAllProject(cus_id)
      .subscribe(
        sucess => {this.projects = sucess; this.customer = false; },
        resCusError => { this.handleError(resCusError); } ,
        ()    =>  {this.ss.isLoading = false; }
      );
  }
  onProChange() {
    this.ss.isLoading = true;
    this.driverServices.getAllVehicles()
      .subscribe(
        sucess => {this.vehicles = sucess; this.project = false; },
        resCusError => { this.handleError(resCusError); } ,
        ()    =>  {this.ss.isLoading = false; }
      );
  }

}
