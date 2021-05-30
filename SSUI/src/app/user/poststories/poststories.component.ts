import { Component, OnInit } from '@angular/core';
//import { FormBuilder } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { Story } from '../../models/story';
import { ApiServices } from '../../services/api.service';

@Component({
  selector: 'app-poststories',
  templateUrl: './poststories.component.html',
  styles: [
  ]
})
export class PoststoriesComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: ApiServices, private localStorage: LocalStorageService) { }
  postStoryForm: FormGroup;

  ngOnInit(): void {

    this.getStoriesByUserId(this.localStorage.get("Obj").id);

    this.postStoryForm = this.fb.group({
      "ssTitle": ['', Validators.required],
      "ssDescription": ['', Validators.required]


    });
  }
  get ssTitle() {
    return this.postStoryForm.get('ssTitle');
  }

  get ssDescription() {
    return this.postStoryForm.get('ssDescription');
  }

  public serverErrors = [];
  public showSuccessMsg: boolean = false;
  public showFailureMsg: boolean = false;
  public successMsg: string;


  postStory() {
    
    if (this.postStoryForm.valid) {
      this.service.postStory(this.postStoryForm.value).subscribe(res => {
        //alert("Story posted successfully");
        this.postStoryForm.reset();
        this.successMsg = "Story Posted Successfully";
        this.showFailureMsg = false;
        this.showSuccessMsg = true;
        setTimeout(() => {
          this.showSuccessMsg = false;
        }, 10000);
        this.getStoriesByUserId(this.localStorage.get("Obj").id);

      }, err => {
        this.serverErrors = [];

        if (err.Status === 400) {
          Object.keys(err.error.errors).forEach(key => {
            this.serverErrors.push(err.error.errors[key][0]);
          });
        }

        else if (err.status === 500) {
          this.serverErrors.push("Admin is working on it!");
        }
        else if (err.status === 0) {
          console.log(err);
          this.serverErrors.push("API service seems to be down");
        }
        this.showFailureMsg = true;
        this.showSuccessMsg = false;
        setTimeout(() => {
          this.showFailureMsg = false;
        }, 10000);


      });
    }
  }

  public p: number;
  public stories: Story[] = [];
  public approveStories: Story[] = [];
  public pendingStories: Story[] = [];

  getStoriesByUserId(id: string) {
    
    this.service.getStoriesByUserId(id).subscribe(res => {
      this.stories = res;
      console.log(res);
      this.approveStories = this.stories.filter(x => x.isApproved === true);
      this.pendingStories = this.stories.filter(x => x.isApproved === false);

    });
  }

}
