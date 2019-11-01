import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../service.service"
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

declare var liff: any;

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  title = 'openClass';
  messages: string;
  userProfile: any;
  // name: string;
  // studentID: string;
  IDLine;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  name: Observable<any>;
  studentID: Observable<any>;
  studentData: any;
  public registorStatus = true;
  todayDate: string;

  constructor(private ServiceService: ServiceService, private db: AngularFireDatabase) {
    this.IDLine = this.messages = "";
    this.initLineLiff();
    // this.itemsRef = this.db.list('userId');
    // this.items = this.itemsRef.valueChanges();

  }


  async ngOnInit() {
    await this.initLineLiff();
    this.getStudentData()
    // this.todayDate = new Date().toISOString().slice(0, 10);
  }



  getStudentData() {

    this.items = this.db.list(`/userId/${this.userProfile.userId}`).valueChanges();

    this.items.subscribe(res => {
      // read result form JSON response
      console.log(">>>" + JSON.stringify(res))

      if (res.length != 3) {
        this.name ;
        this.studentID;
        this.registorStatus = true;
        // console.log("<<<"+JSON.stringify(res))
        // alert("null >>" + JSON.stringify(res)  )

      } else {
        this.name = res[1];
        this.studentID = res[0];
        this.registorStatus = false;
        // console.log("<<<>>>" + JSON.stringify(res))
        // alert("not"+ JSON.stringify(res))


      }

    },
      err => console.log(err));
  }

  async sendData() {
    this.db.list(`userId/`).set(this.userProfile.userId, { StudentID: this.studentID, StudentName: this.name , userId : this.userProfile.userId });
    // alert(">>>" + this.name + " >>" + this.studentID)
    this.sendMessages()
  }

  async initLineLiff() {
    try {
      const data: any = await this.ServiceService.initLineLiff();
      this.userProfile = await liff.getProfile();





      // alert(`Hi ${this.userProfile.displayName}!`);
    } catch (err) {
      // alert(err)
    }



  }

  async sendMessages() {
    if (this.registorStatus == true) {
      this.messages = "ลงทะเบียนเรียบร้อยแล้ว";
    } else if (this.registorStatus == false) {
      this.messages = "แก้ไขข้อมูลเรียบร้อยแล้ว";
    }

    try {
      const successMsgs = await liff.sendMessages([
        {
          type: 'text',
          text: this.messages
        }
      ])
      liff.closeWindow()


    } catch (e) {
      alert(e)
    }

  }
}
