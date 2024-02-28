import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../services/video.service";
import {VideoDto} from "../models/videoDto";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly videoService = inject(VideoService);

  videoId: string = "";
  videoDto!: VideoDto;

  ngOnInit() {
    this.videoId = this.activatedRoute.snapshot.params?.['videoId'];
    this.videoService.getVideoId(this.videoId).subscribe(resp => {
      const {title, description, tags, videoUrl ,videoStatus, thumbnailUrl} = resp;
      this.videoDto = resp;
    });
  }
}
