import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Add this line

import { AppComponent } from './app.component';
import { TableCanvasComponent } from './table-canvas/table-canvas.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    TableCanvasComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule  // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
