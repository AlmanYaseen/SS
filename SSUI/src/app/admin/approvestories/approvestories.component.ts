import { Component, OnInit } from '@angular/core';
import { Story } from '../../models/story';
import { ApiServices } from '../../services/api.service';

@Component({
  selector: 'app-approvestories',
  templateUrl: './approvestories.component.html'
  
})
export class ApprovestoriesComponent implements OnInit {

  constructor(private service: ApiServices) { }

  ngOnInit(): void {
    this.getStoriesByStatus(false);
  }

  public stories: Story[] = [];
  public p: number;
  public search: string;



  getStoriesByStatus(isApproved: boolean) {
    
    return this.service.getStoriesByStatus(isApproved).subscribe(res => {
      this.stories = res;
      console.log(this.stories);
    });
  }

  public serverErrors = [];
  public showSuccessMsg: boolean = false;
  public showFailureMsg: boolean = false;
  public successMsg: string;
  approveStory(story) {
    
    this.service.approveStory(story).subscribe(res => {
     // alert("Story approved Succesfully");
      
      this.successMsg = "Story Approved";
      this.showFailureMsg = false;
      this.showSuccessMsg = true;
      this.getStoriesByStatus(false);
      setTimeout(() => {
        this.showSuccessMsg = false;
      }, 10000);
      
    });
  }
// ssId: number;
  rejectStory(ssId) {
    
    this.service.rejectStory(ssId).subscribe(res => {
     // alert("Story rejected Succesfully");
      this.successMsg = "Story Rejected!";
      this.showFailureMsg = false;
      this.showSuccessMsg = true;
      this.getStoriesByStatus(false);
      setTimeout(() => {
        this.showSuccessMsg = false;
      }, 10000);
     
    });
  }
}
  
