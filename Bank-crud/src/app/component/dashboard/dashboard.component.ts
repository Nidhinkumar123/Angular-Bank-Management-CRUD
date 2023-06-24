import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customersList: Customer[] = [];
  customerObj: Customer = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  mobile: string = '';

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  // register() {
  //   this.auth.logout();
  // }

  getAllCustomers() {

    this.data.getAllCustomers().subscribe(res => {

      this.customersList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching customer data');
    })

  }

  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
  }

  addCustomer() {
    if (this.first_name == '' || this.last_name == '' || this.mobile == '' || this.email == '') {
      alert('Fill all input fields');
      return;
    }

    this.customerObj.id = '';
    this.customerObj.email = this.email;
    this.customerObj.first_name = this.first_name;
    this.customerObj.last_name = this.last_name;
    this.customerObj.mobile = this.mobile;

    this.data.addCustomer(this.customerObj);
    this.resetForm();

  }

  updateCustomer() {

  }

  deleteCustomer(customer: Customer) {
    if (window.confirm('Are you sure you want to delete ' + customer.first_name + ' ' + customer.last_name + ' ?')) {
      this.data.deleteCustomer(customer);
    }
  }

}
