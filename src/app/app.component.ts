import { Component } from '@angular/core';
import { NgxFeatureFlagsService } from 'ngx-feature-flags';

@Component({
  selector: 'slr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private flagService: NgxFeatureFlagsService) {
    this.flagService.initialize();
  }

  title = 'ngx-flags';
}
