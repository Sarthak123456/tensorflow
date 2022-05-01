import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TensorflowComponent } from './tensorflow/tensorflow.component';
import { PredictComponent } from './predict/predict.component';
import { DrawableDirective } from './drawable.directive';


@NgModule({
  declarations: [
    AppComponent,
    TensorflowComponent,
    PredictComponent,
    DrawableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
