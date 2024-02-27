import {Component, inject} from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import {VideoService} from "../services/video.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent {
  private readonly videoService: VideoService = inject(VideoService);
  private readonly router = inject(Router);

  files: NgxFileDropEntry[] = [];
  fileUploaded = false;
  fileEntry: FileSystemFileEntry | undefined;

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
       this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.fileUploaded = true;

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }

  public uploadVideo(): void {
    if (this.fileEntry !== undefined) {
      this.fileEntry.file(file => {
        this.videoService.uploadViedo(file).subscribe(resp => {
          this.router.navigateByUrl("save-video-details/" + resp.videoId);

        });
      });
    }
  }
}
