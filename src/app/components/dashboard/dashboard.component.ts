import { Component, OnInit } from '@angular/core';
import { ConnService } from 'src/app/services/conn.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: any = { name: '', lastName: '', birthdate: '', age: 0 };
  ageAverage: number;
  standardDeviation: number;
  constructor(private conn: ConnService) {
    this.conn.getItems().subscribe(items => {
      this.items = items;
      this.ageAverage = this.calcAgeAverage(this.items);
      this.standardDeviation = this.calcStandardDeviation(this.items);
    });
  }

  ngOnInit(): void {
  }

  calcAgeAverage(items: any): number {
    return Math.round(items.reduce((a: number, b: any) => (a + b.age), 0) / items.length * 100) / 100;
  }

  calcStandardDeviation(items: any): number {
    const media = Math.round(items.reduce((a: number, b: any) => (a + b.age), 0) / items.length * 100) / 100;
    const sumatoria = items.reduce((a: number, b: any) => (a + Math.pow((b.age - media), 2)), 0);
    const entreN = sumatoria / items.length;
    return Math.round(Math.sqrt(entreN) * 100) / 100;
  }

}
