import { Component, OnInit } from '@angular/core';
import { ConnService } from '../../services/conn.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  items: any;
  newItems: any;
  editItem: any = { name: '', lastName: '', birthdate: '', age: 0, deathProbability: '' };
  constructor(private conn: ConnService) {
    this.getItem();
  }

  ngOnInit(): void {
  }

  getItem(): void {
    this.conn.getItems().subscribe(items => {
      this.items = items;
    });
  }

  delete(id: string): void {
    this.conn.deleteItem(id)
  }
  update(item: any): void {
    this.editItem = item;
  }
  updateForm(): void {
    this.conn.getItems().subscribe(items => {
      const getItem = items.find((x: any) => x.id === this.editItem.id);
      this.getData(getItem);
    });
  }
  closeModal(): void{
    this.getItem();
  }

  getData(getItem: any): void {
    if (getItem.birthdate !== this.editItem.birthdate) {
      this.editItem.age = this.getAge(this.editItem.birthdate);
      this.editItem.deathProbability = this.deathProbability(this.editItem.birthdate);
    }
    this.conn.updateItem(this.editItem);
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
  deathProbability(from: any): string {
    from = new Date(from);
    from = from.getTime();
    const to = (110 * 31556900000) - from;
    const date = new Date(from + Math.random() * (to - from));
    return this.formatDate(date);
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
