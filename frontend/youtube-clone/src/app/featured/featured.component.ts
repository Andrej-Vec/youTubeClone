import {Component, inject, OnInit} from '@angular/core';
import {VideoService} from "../services/video.service";
import {VideoDto} from "../models/videoDto";
import {Observable} from "rxjs";

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit{
  private readonly videoService = inject(VideoService);

  $featuredVideos!: Observable<VideoDto[]>;
  ngOnInit() {
    this.$featuredVideos = this.videoService.getAllvideos();
  }
}
