import { Component, OnInit } from '@angular/core';
import {DriverServices} from '../commanservices.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router,  Params, ActivatedRoute} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {SharedServiceService} from 'app/shared-service.service';

@Component({
  selector: 'app-edit-truck-list',
  templateUrl: './edit-truck-list.component.html',
  styleUrls: ['./edit-truck-list.component.css']
})
export class EditTruckListComponent implements OnInit {
  loadLists: any;
  projects: any;
  vehicles: any;
  truckList: any;
  customer: any = true;
  project: any = true;
  customer_id: number;
  project_id: number;
  vehicle_id: number;
  newTruckListForm = new  FormGroup({
    customer_id: new FormControl('', [Validators.required] ),
    project_id: new FormControl('', [Validators.required] ),
    vehicle_id: new FormControl('', [Validators.required] )
  });
  constructor( public snackBar: MdSnackBar, localStorageService: LocalStorageService, private ss: SharedServiceService,
               private router: Router, private driverServices: DriverServices, private route: ActivatedRoute) { }
  ngOnInit() {
    this.ss.isLoading = true;
    this.driverServices.getAllCustomers()
      .subscribe(
        sucess => { this.loadLists = sucess; },
        resCusError => {
          this.handleError(resCusError);
        },
        ()    =>  {this.ss.isLoading = false; }
      );
    this.route.params.subscribe( (params: Params) => {
      this.truckList = params;
      this.customer_id = parseInt(this.truckList.customer_id);
      this.project_id = parseInt(this.truckList.project_id);
      this.vehicle_id = parseInt(this.truckList.vehicle_id);
      console.log(this.vehicle_id);
      this.onChange( this.truckList.customer_id ) ;
    });
  }
  handleError(err: any) {
    if (err.error != null) {
      this.ss.openSnackBarToast('Hmm ' + err.error);
    }
    if (err.tokenError) {
      this.ss.openSnackBarToast(err.tokenError);
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
    } else {
      this.ss.openSnackBarToast('Server Not Responding');
    }
  }
  onSubmit() {
    if (this.newTruckListForm.invalid) {
      this.openSnackBar('Validation Error please fill the form properly', 'Close');
      return;
    }
    this.ss.isLoading = true;
    // 1. send to server
    this.driverServices.updateTruckList(this.newTruckListForm.value, this.truckList.id)
      .subscribe(
        sucess => { if (sucess) {
          this.ss.openSnackBarToast( sucess.success);
          this.router.navigate(['/Lists']); } },
        resCusError => { this.handleError(resCusError); },
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
        sucess => {this.projects = sucess; this.customer = false;
          this.onProChange(); },
        resCusError => { this.handleError(resCusError);},
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
