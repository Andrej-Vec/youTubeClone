import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "../models/uploadVideoResponse";

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
}
