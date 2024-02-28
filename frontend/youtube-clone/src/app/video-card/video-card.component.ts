import {Component, Input} from '@angular/core';
import {VideoDto} from "../models/videoDto";

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent {
  @Input() videoDto!: VideoDto;
}
