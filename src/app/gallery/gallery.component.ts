import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

    queryForm: FormGroup;
    results$: Observable<any>;

    constructor(
        private afs: AngularFirestore,
        private fb: FormBuilder
    ) { }

    ngOnInit() {

        this.queryForm = this.fb.group({
            word: new FormControl('')
        });

        this.results$ = this.queryForm.controls.word.valueChanges.pipe(
            debounceTime(200),
            switchMap(v =>
                this.afs.collection<any>('images', ref =>
                    ref.where('labels', 'array-contains', v.charAt(0).toUpperCase() + v.slice(1))
                ).valueChanges()
            )
        );
    }

}
