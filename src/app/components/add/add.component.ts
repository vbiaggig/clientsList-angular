import { Component, OnInit } from '@angular/core';
import { ConnService } from 'src/app/services/conn.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  item: any = { name: '', lastName: '', birthdate: '', age: 0, deathProbability: '' };
  constructor(private srv: ConnService) { }

  ngOnInit(): void {
  }

  add(): void {
    this.item.age = this.getAge(this.item.birthdate);
    this.item.deathProbability = this.deathProbability(this.item.birthdate);
    this.srv.addItem(this.item);
    this.item = { name: '', lastName: '', birthdate: '', age: 0, deathProbability: '' }
  }

  deathProbability(from: any): string {
    from = new Date(from);
    from = from.getTime();
    const to = (110 * 31556900000) - from;
    const date = new Date(from + Math.random() * (to - from));
    return this.formatDate(date);
  }

  getAge(dateString: any): number {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  formatDate(date: any): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }
}
