import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {DriverServices} from '../commanservices.service';
import {SharedServiceService} from '../shared-service.service';


@Component({
  selector: 'app-new-load',
  templateUrl: './new-load.component.html',
  providers: [DriverServices],
  styleUrls: ['./new-load.component.css']
})
export class NewLoadComponent implements OnInit {
  myVar: any;
  las_master: any = '';
  truckListId: number;
  loads: any;
  volums: any;
  userForm = new  FormGroup({
    load_time: new FormControl('', [Validators.required, Validators.minLength(3)]),
    from_destination: new FormControl('', [Validators.required] ),
    to_destination: new FormControl('', [Validators.required] ),
    quantity: new FormControl('', [Validators.required] ),
    notes: new FormControl('', [Validators.required, Validators.minLength(10)] ),
    las_master_data_load_id: new FormControl('', [Validators.required] ),
    las_master_data_volume_id: new FormControl('', [Validators.required] )
  });
  constructor( private route: ActivatedRoute, private router: Router, public snackBar: MdSnackBar,
               private driverServices: DriverServices, private ss: SharedServiceService ) {
  }
  ngOnInit() {
    // get loads
    this.ss.isLoading = true;
    this.driverServices.getLoads()
      .subscribe(
        sucess => { this.loads = sucess; console.log(sucess); },
        resCusError => { this.handleError(resCusError); },
        ()    =>  {this.ss.isLoading = false; }
      );
    // get volum
    this.ss.isLoading = true;
    this.driverServices.getVolum()
      .subscribe(
        sucess => {this.volums = sucess; },
        resCusError => { this.handleError(resCusError); },
        ()    =>  {this.ss.isLoading = false; }
      );
    this.route.params.subscribe( (params: Params) => {
      this.truckListId = parseInt(params['id'], 10 ); }
    );
  }
  onSubmit() {
    if (this.userForm.untouched || this.userForm.invalid) {
      this.openSnackBar('Validation Error please fill the form properly', 'Close');
      return;
    }
    // 1. send to server
    this.ss.isLoading = true;
    this.driverServices.saveNewLoadlList(this.userForm.value, this.truckListId)
      .subscribe(
        sucess => { if (sucess) {
          this.ss.openSnackBarToast( sucess.success);
          this.router.navigate(['/loadLists', this.truckListId]); } },
        resCusError => { this.handleError(resCusError); },
        ()    =>  {this.ss.isLoading = false; }
      );
    // 2. navigate to another page if true
    //  this.router.navigate(['/loadLists']);
  }
  handleError(err: any) {
    if (err.error != null) {
      this.ss.openSnackBarToast('Hmm ' + err.error);
    } if (err.tokenError) {
      this.ss.openSnackBarToast(err.tokenError);
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
    } else {
      this.ss.openSnackBarToast('Server Not Responding');
    }

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
