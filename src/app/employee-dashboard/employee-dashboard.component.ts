import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
formValue !: FormGroup;
employeeModelObj : EmployeeModel = new EmployeeModel();
empolyeeData !: any;
showAdd !: boolean;
showUpdate !: boolean;

  constructor( private formbuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName :[''],
      email :[''],
      mobile :[''],
      salary:['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("employee added successful");
      let ref = document.getElementById('Cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee;
    },
    err=>{
      alert("something went wrong");
    })
  }
  getAllEmployee(){
    this.api.getEmploye()
    .subscribe(res=>{
      this.empolyeeData = res;
    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row: any){
    this.employeeModelObj.id= row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    this.showAdd = false;
    this.showUpdate = true;
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmploye(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("update successfully");
      let ref = document.getElementById('Cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
  }
