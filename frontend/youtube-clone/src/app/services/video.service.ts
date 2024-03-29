import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {UploadVideoResponse} from "../models/uploadVideoResponse";
import {VideoDto} from "../models/videoDto";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private httpClient: HttpClient = inject(HttpClient);

  public uploadViedo(file: File): Observable<UploadVideoResponse> {
    const formData = new FormData()
    formData.append('file', file, file.name);

    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/videos", formData);
  }

  public uploadThumbnail(file: File, videoId: string): Observable<string> {
    const formData = new FormData()
    formData.append('file', file, file.name);
    formData.append("videoId", videoId);

    return this.httpClient.post("http://localhost:8080/api/videos/thumbnail", formData,
      {
      responseType: 'text'
    });
  }

  public getVideoId(videoId: string): Observable<VideoDto> {
    //return of("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
    return of({"id": "45", "title": "title", "description": "description", "tags": [], "videoUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "videoStatus": "videoStatus", "thumbnailUrl": "thumbnailUrl"});
    //return this.httpClient.get<string>("http://localhost:8080/api/videos/" + videoId);
  }


  saveVideo(videoMetaData: VideoDto): Observable<VideoDto> {
    return this.httpClient.put<VideoDto>("http://localhost:8080/api/videos", videoMetaData)
  }
}
