import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { firestore } from 'firebase';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

    form: FormGroup;

    constructor(
        private afs: AngularFireStorage,
        private fs: AngularFirestore,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            image: new FormControl('')
        });
    }

    uploadFile(fileList: FileList) {

        const files = Array.from(fileList);

        files.forEach(file => {
            const doc = firestore().collection('images').doc();
            const ext = file.name.split('.').pop().toLowerCase();
            const uploadTask = this.afs.ref(`images/${doc.id}.${ext}`).put(file, {
                customMetadata: {
                    id: doc.id
                }
            }).then((result: UploadTaskSnapshot) => {

                return result.ref.getDownloadURL();

            }).then((url) => {
                doc.set({
                    url,
                    createdAt: firestore.FieldValue.serverTimestamp()
                });
            });
        });

    }

}
