import { Component } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

@Component({
  // moduleId is no longer needed in Angular
  selector: 'ns-home',
  templateUrl: 'home.component.html',
  imports: [NativeScriptCommonModule],
})
export class HomeComponent {}