import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import {SharedServiceService} from '../shared-service.service';
import {DriverServices} from '../commanservices.service';
import {MdDialog} from '@angular/material';
import {MdSnackBar} from '@angular/material';


import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {SignatureComponent} from 'app/load-list/signature/signature.component';

@Component({
  selector: 'app-load-list',
  templateUrl: './load-list.component.html',
  providers: [DriverServices],
  styleUrls: ['./load-list.component.css']
})
export class LoadListComponent implements OnInit {
  public truckList;
  loadLists: any;
  selectedOption: number;
  constructor( public dialog: MdDialog, private route: ActivatedRoute, private router: Router,
               private ss: SharedServiceService,  private driverServices: DriverServices
  ) { }

  ngOnInit() {
    this.route.params.subscribe( (params: Params) => {
      this.truckList = params;
      console.log(this.truckList.id);
    });
    this.ss.isLoading = true;
    this.driverServices.getSepLoadList(this.truckList.id)
      .subscribe(
        sucess => {
          this.loadLists = sucess;
        },
        resCusError => {
          this.handleError(resCusError);
        },
        ()    =>  {this.ss.isLoading = false; }
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
      this.ss.openSnackBarToast('Server Not Responding');
    }
  }
  onSelect(truckList) {
    this.router.navigate(['/newLoad', {id: truckList} ]);
  }
  deleteloadlList(loadId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = parseInt(result);
      if (this.selectedOption === 1) {
        this.ss.isLoading = true;
        let id = 'id = ' + loadId + '';
        this.driverServices.deleteLoads(id)
          .subscribe(
            sucess => {
              this.handleSucess(sucess.truckList);
            },
            resCusError => {
              this.handleError(resCusError);
            },
            ()    =>  {this.ss.isLoading = false; }
          );
      } else {
        return false;
      }
    });
  }
  handleSucess(sucess: any) {
    this.loadLists = sucess;
    this.ss.openSnackBarToast('Record Deleted sucessfully');
    this.ngOnInit();
  }
  onEdit(loadlist) {
    this.router.navigate(['/editLoad',  loadlist ]);
  }
  addSignature(){
    const dialogRef = this.dialog.open(SignatureComponent);
    dialogRef.afterClosed().subscribe(result => {
         });
  }
  onFileSelect(seletedFile) {
    console.log(seletedFile);
  }

}
