import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class ConnService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  private itemsDocument: AngularFirestoreDocument<Item>;

  items: Observable<Item[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getItems() {
    return this.items
  }
  addItem(item: Item) {
    this.itemsCollection.add(item);
  }
  deleteItem(id) {
    this.itemsDocument = this.afs.doc<Item>('items/' + id);
    this.itemsDocument.delete();
  }
  updateItem(item) {
    this.itemsDocument = this.afs.doc<Item>('items/' + item.id);
    this.itemsDocument.update(item);
  }
}
