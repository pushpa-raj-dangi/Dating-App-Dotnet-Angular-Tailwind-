import { TimeAgoPipe } from 'src/app/core/pipes/time-ago.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { LoadingInterceptor } from './../core/interceptors/loading.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/core/interceptors/error-interceptor.interceptor';
import { JwtTokenInterceptor } from 'src/app/core/interceptors/jwt-token.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { PhotoEditorComponent } from './components/photo-editor/photo-editor.component';

@NgModule({
  imports: [CommonModule, ConfirmDialogComponent, PaginationComponent],
  declarations: [LoaderComponent, PhotoEditorComponent, FileUploaderComponent],
  exports: [
    CommonModule,
    LoaderComponent,
    PhotoEditorComponent,
    FileUploaderComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
