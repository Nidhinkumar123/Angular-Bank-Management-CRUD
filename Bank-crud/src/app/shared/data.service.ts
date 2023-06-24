import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add customer
  addCustomer(customer : Customer) {
    customer.id = this.afs.createId();
    return this.afs.collection('/Customers').add(customer);
  }

  // get all customers
  getAllCustomers() {
    return this.afs.collection('/Customers').snapshotChanges();
  }

  // delete customer
  deleteCustomer(customer : Customer) {
     this.afs.doc('/Customers/'+customer.id).delete();
  }

  // update customer
  updateCustomer(customer : Customer) {
    this.deleteCustomer(customer);
    this.addCustomer(customer);
  }
    
}
