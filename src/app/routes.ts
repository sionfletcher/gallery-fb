import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { GalleryComponent } from './gallery/gallery.component';

export const routes: Routes = [
    { path: '', component: GalleryComponent },
    { path: 'upload', component: UploadComponent }
];
