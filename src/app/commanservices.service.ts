import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../environments/environment';

@Injectable()
export class DriverServices {
  headers: Headers;
  options: RequestOptions;
  private  _url = environment.api + 'api/getAllTruckList';
  constructor(private _http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
      'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
        });
    this.options = new RequestOptions({ headers: this.headers });
  }
  userLogin(user) {
    const bodyString = JSON.stringify(user); // Stringify payload
    return this._http.post( environment.api + 'api/login', bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this._errorHandler); // ... errors if an*/
  }
  getTruckList() {
    return this._http.get( environment.api + 'api/trucklist', this.options)
      .map((response: Response) =>  response.json())
      .catch(this._errorHandler);
  }
  getLoadList() {
    return this._http.get( environment.api + 'api/load', this.options)
      .map((response: Response) =>  response.json())
      .catch(this._errorHandler);
  }
  getSepLoadList(trucklistid) {
    return this._http.get( environment.api + 'api/load' + '/' + trucklistid , this.options)
      .map((response: Response) =>  response.json())
      .catch(this._errorHandler);
  }
  saveTruclList(list) {
    const bodyString = JSON.stringify(list); // Stringify payload
    return this._http.post( environment.api + 'api/trucklist', bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this._errorHandler); // ... errors if an*/
  }
  saveNewLoadlList(newLoad, trucklistid: number) {
    const bodyString = JSON.stringify(newLoad); // Stringify payload
    return this._http.post( environment.api + 'api/load' + '/' + trucklistid, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this._errorHandler); // ... errors if an*/
  }
  userLogout() {
    return this._http.get( environment.api + 'api/logout', this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this._errorHandler); // ... errors if an*/
  }
  deleteTruckList(truckListId) {
    return this._http.delete( environment.api + 'api/trucklist' + '/' + truckListId , this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this._errorHandler); // ... errors if an*/
  }
  deleteLoads(truckListId) {
    return this._http.delete( environment.api + 'api/load' + '/' + truckListId , this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this._errorHandler); // ... errors if an*/
  }
  getAllProject(cus_id) {
    return this._http.get( environment.api + 'api/getAllProject' + '/' + cus_id , this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this._errorHandler); // ... errors if an*/
  }
  getAllVehicles() {
    return this._http.get( environment.api + 'api/getAllVehicles', this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this._errorHandler); // ... errors if an*/
  }
  getAllCustomers() {
    return this._http.get( environment.api + 'api/getAllCustomers', this.options)
      .map((response: Response) =>  response.json())
      .catch(this._errorHandler);
  }
  getLoads() {
    return this._http.get( environment.api + 'api/getLoad', this.options)
      .map((response: Response) =>  response.json())
      .catch(this._errorHandler);
  }
  getVolum() {
    return this._http.get(environment.api + 'api/getVolum', this.options)
      .map((response: Response) =>  response.json())
      .catch(this._errorHandler);
  }
  updateTruckList(list, id) {
    const bodyString = JSON.stringify(list); // Stringify payload
    return this._http.post( environment.api + 'api/trucklist' + '/' + id, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this._errorHandler); // ... errors if an*/
  }
  updatLoadList(list, id) {
    const bodyString = JSON.stringify(list); // Stringify payload
    return this._http.post( environment.api + 'api/load' + '/' + id, bodyString, this.options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch(this._errorHandler); // ... errors if an*/
  }

  _errorHandler(error: Response) {
    return Observable.throw(error.json() || 'Server Error');
  }
}
