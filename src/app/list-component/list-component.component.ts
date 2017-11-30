import { Component, OnInit  } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {Router, Routes, Params, ActivatedRoute, CanActivate} from '@angular/router';
import {DriverServices} from '../commanservices.service';
import {MdDialog, MdDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {SharedServiceService} from '../shared-service.service';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  providers: [DriverServices],
  styleUrls: ['./list-component.component.css']
})

export class ListComponentComponent implements OnInit {
  user: any;
  truckLists: any;
  selectedOption: number;
  constructor(public dialog: MdDialog, localStorage: LocalStorageService
              , private ss: SharedServiceService , private router: Router, private driverServices: DriverServices) {
  }

  ngOnInit() {
    this.ss.isLoading = true;
    this.driverServices.getTruckList()
      .subscribe(
        sucess => {
          this.truckLists = sucess.truckList;
        },
        resCusError => {
          this.handleError(resCusError);
        },
        ()    =>  {this.ss.isLoading = false;}
      );
  }

  onSelect(truckList) {
    this.router.navigate(['/loadLists', truckList]);
  }

  deleteTruclList(truckListId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = parseInt(result);
      if (this.selectedOption === 1) {
        this.ss.isLoading = true;
        this.driverServices.deleteTruckList(truckListId)
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
  onEdit(truckListid) {
    this.router.navigate(['/editTruckList',  truckListid ]);
  }
  deleteLoadList(truckListId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = parseInt(result);
      if (this.selectedOption === 1) {
        this.ss.isLoading = true;
        let id = 'truck_list_id = ' + truckListId + '';
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

  handleSucess(sucess: any) {
    this.truckLists = sucess;
    this.ss.openSnackBarToast('Record Deleted sucessfully');
    this.ngOnInit();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = parseInt(result);
      if (this.selectedOption === 1) {
        return true;
      } else {
        return false;
      }
    });
  }
}
