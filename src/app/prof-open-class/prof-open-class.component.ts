import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../service.service"
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


declare var liff: any;
@Component({
  selector: 'app-prof-open-class',
  templateUrl: './prof-open-class.component.html',
  styleUrls: ['./prof-open-class.component.css']
})
export class ProfOpenClassComponent implements OnInit {
  title = 'openClass';
  messages: string;
  userProfile: any;

  timeStart: any;
  timeEnd: any;
  timeLate: any;
  todayDate: any;

  startData: any;
  endData: any;

  statusBeacon: any;


  data: Observable<any[]>;
  indexDate: any;

  studentID = [];


  editStatus = false;

  constructor(private ServiceService: ServiceService, private db: AngularFireDatabase) {

    this.initLineLiff();

  }


  async ngOnInit() {
    await this.initLineLiff();


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.todayDate = yyyy + '/' + mm + '/' + dd;


    // this.todayDate = new Date().toISOString().slice(0, 10);
    console.log(this.todayDate)

    this.getDate();
    this.getUserId();
  }



  getDate() {

    this.data = this.db.list(`/Date`).valueChanges();

    this.data.subscribe(res => {
      // read result form JSON response
      console.log(">>>" + JSON.stringify(res))
      this.indexDate = res.length

      console.log(this.indexDate)

    },
      err => console.log(err));

  }

  getUserId() {
    this.data = this.db.list(`/userId`).valueChanges();
    this.data.subscribe(res => {
      // read result form JSON response
      console.log("userId>>>" + JSON.stringify(res))
      for (var i = 0; i < res.length; i++) {
        this.studentID.push(res[i].userId)
      }
      console.log("userId JSON>>>" + this.studentID + "type:" + this.studentID[1])
    },
      err => console.log(err));

  }


  editStatusChang() {

    this.editStatus = !this.editStatus
    console.log(this.editStatus)
    if (this.editStatus == true) {

      this.data = this.db.list(`/Date`).valueChanges();
      this.data.subscribe(res => {
        // read result form JSON response
        console.log("Date>>>" + JSON.stringify(res[this.indexDate - 1]))
        const curentDate = res[this.indexDate - 1]
        console.log(curentDate.End)
        this.timeEnd = curentDate.End.split(" ")[1]
        console.log(this.timeEnd)
        this.timeStart = curentDate.start.split(" ")[1]
        this.timeLate = curentDate.late

      },
        err => console.log(err));

    }
  }


  async sendData() {
    this.getDate();
    this.getUserId();
    this.startData = this.todayDate.toString() + " " + this.timeStart.toString()
    this.endData = this.todayDate.toString() + " " + this.timeEnd.toString()

    if (this.editStatus !== true) {
      this.db.list(`Date/`).set((this.indexDate + 1).toString(), { End: this.endData, start: this.startData, late: this.timeLate });

      for (var i = 0; i < this.studentID.length; i++) {
        this.db.list(`Check/` + this.studentID[i]).set((this.indexDate + 1).toString(), { checkName: 0, Date: this.todayDate.toString() });
      }
    } else {
      this.db.list(`Date/`).set((this.indexDate).toString(), { End: this.endData, start: this.startData, late: this.timeLate });

      for (var i = 0; i < this.studentID.length; i++) {
        this.db.list(`Check/` + this.studentID[i]).set((this.indexDate + 2).toString(), { checkName: 0, Date: this.todayDate.toString() });
      }

    }
    this.db.list(`/`).set("statusBeacon", "poweredOn");




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
    this.messages = "เปิดระบบ Beacon";

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
