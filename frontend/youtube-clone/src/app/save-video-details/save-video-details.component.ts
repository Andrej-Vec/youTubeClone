import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../services/video.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VideoDto} from "../models/videoDto";

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.scss']
})
export class SaveVideoDetailsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly announcer = inject(LiveAnnouncer);
  private readonly videoService = inject(VideoService);
  private readonly snackBar = inject(MatSnackBar);

  selectedFile!: File;
  selectedFileName: string = "";
  fileSelected: boolean = false;
  videoId: string = "";
  tags: string[] = [];
  addOnBlur = true;
  videoUrl: string = "";
  thumbnailUrl: string = "";
  saveDetailVideoForm: FormGroup = new FormGroup({});
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  ngOnInit() {
    this.videoId = this.activatedRoute.snapshot.params?.['videoId'];
    this.videoService.getVideoId(this.videoId).subscribe(resp => {
      console.log("resp", resp);
      this.videoUrl = resp.videoUrl;
    });
    this.initForm();
  }

  private initForm(): void {
    this.saveDetailVideoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      videoStatus: ['public', Validators.required],
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tagValue: string): void {
    const index = this.tags.indexOf(tagValue);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tagValue}`);
    }
  }

  edit(tagValue: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tagValue);
      return;
    }

    // Edit existing tags
    const index = this.tags.indexOf(tagValue);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  public onFileSelected(event: Event): void {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  public onUpload(): void {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId).subscribe(resp => {
      this.snackBar.open("thubnail spload successful", "OK");
    });
  }

  public saveVideo(): void {
    const videoMetaData: VideoDto = {
      id: this.videoId,
      title: this.saveDetailVideoForm.get("title")?.value,
      description: this.saveDetailVideoForm.get("description")?.value,
      tags: this.tags,
      videoUrl: this.videoUrl,
      videoStatus: this.saveDetailVideoForm.get("videoStatus")?.value,
      thumbnailUrl: this.thumbnailUrl
    }
    this.videoService.saveVideo(videoMetaData).subscribe(resp => {
      this.snackBar.open("Update videoUrl successfully", "OK");
    });
  }
}
