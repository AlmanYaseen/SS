import { Component, OnInit } from '@angular/core';
import { Story } from '../../models/story';
import { ApiServices } from '../../services/api.service';
import { AngularCsv } from 'angular7-csv';

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
  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'List Of Approved Stories',
    useBom: true,
    noDownload: false,
    headers: ["ssId", "ssTitle", "ssDescription", "Id"]
  };

  getStoriesByStatus(isApproved: boolean) {
    
    return this.service.getStoriesByStatus(isApproved).subscribe(res => {
      this.stories = res;
      console.log(this.stories);
    });
  }
  like(story: Story) {
    this.stories.find(x => x.ssId == story.ssId).like = this.stories.find(x => x.ssId == story.ssId).like + 1;
  }


  public reslut = [];
  downloadCSV() {
    this.reslut = this.stories.map(x => ({ "ssId": x.ssId, "ssTitle": x.ssTitle, "ssDescription": x.ssDescription, "Id": x.id }));
    new AngularCsv(this.reslut, "Stories", this.csvOptions);
  }

}
