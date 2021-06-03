import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Story } from '../models/story';
import { LocalStorageService } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class ApiServices {
  baseUrl: string = "http://localhost:50000/api/Stories";

  constructor(private api: HttpClient, private localStorage: LocalStorageService) { }

  postStory(story: Story) {
    
    return this.api.post<Story>(this.baseUrl, story, { withCredentials:true});
  }

  getStoriesByStatus(isApproved: boolean) {
    
    return this.api.get<Story[]>(this.baseUrl + "/getStoriesByStatus/" + isApproved, { withCredentials: true } );
  }

  approveStory(story: Story) {
    
    return this.api.put<Story>(this.baseUrl + "/approveStory/" + story.ssId, story, { withCredentials: true });
  }

  rejectStory(ssId) {
    
    return this.api.delete<Story>(this.baseUrl + "/Delete/" + ssId, { withCredentials: true });
  }


  getStoriesByUserId(id: string) {
    
    return this.api.get<Story[]>(this.baseUrl + "/getStoriesByUserId/" + id, { withCredentials: true });
  }


  getStories() {
    return this.api.get<Story[]>(this.baseUrl, { withCredentials: true });
  }
}
