import { OnInit, Component } from "@angular/core";
import { LoaderService } from "./loader.service";

@Component({
  selector: 'pm-loader',
  template: `<div class="progress-loader" [hidden]="!loading">
              <div class="loading-spinner">
              </div>
            </div>`,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent  {

  loading: boolean;

  constructor(private loaderService: LoaderService){
    this.loaderService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
    });
  }

}