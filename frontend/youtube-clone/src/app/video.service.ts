import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private httpClient: HttpClient = inject(HttpClient);

  public uploadViedo(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name);


    return this.httpClient.post<Observable<any>>("http://localhost:8080/api/videos", formData);
  }
}
