import { Component, OnInit } from '@angular/core';
import { Story } from '../../models/story';
import { ApiServices } from '../../services/api.service';

@Component({
  selector: 'app-readstories',
  templateUrl: './readstories.component.html'
})
export class ReadstoriesComponent implements OnInit {

  constructor(private service: ApiServices) { }

  ngOnInit(): void {
    this.getStoriesByStatus(true);
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
  like(story: Story) {
    this.stories.find(x => x.ssId == story.ssId).like = this.stories.find(x => x.ssId == story.ssId).like + 1;
  }
}
