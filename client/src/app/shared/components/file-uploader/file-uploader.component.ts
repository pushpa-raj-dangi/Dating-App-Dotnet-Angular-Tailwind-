import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent {
  progressInfos = [];
  message = '';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  preview = [];

  imageInfos?: Observable<any>;

  fileInfos: Observable<any> | null = null;

  constructor(private uploadService: FileUploadService) {}

  selectFile(event: Event): void {
    let files = (event.target as HTMLInputElement).files;
    this.selectedFiles = files;

    this.upload();

    let file;
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      file = files[i];
      reader.onload = (file) => {
        this.preview = [...this.preview, reader.result];
      };
      console.log(this.preview);

      reader.readAsDataURL(file);
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
              console.log(this.progress);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          error: (err: any) => {
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
