import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Add this line

import { AppComponent } from './app.component';
import { TableCanvasComponent } from './table-canvas/table-canvas.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { HashTableService } from './hash-table.service';

@NgModule({
  declarations: [
    AppComponent,
    TableCanvasComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // Add this line
  ],
  providers: [HashTableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
