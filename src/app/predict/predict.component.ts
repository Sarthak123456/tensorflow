import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawableDirective } from '../drawable.directive';

import * as tf from '@tensorflow/tfjs';


@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit {

  constructor() { }

  linearModel!: tf.Sequential;
  prediction: any;
  predictedNumber!: string;

  model: any;
  predictions: any;

  @ViewChild(DrawableDirective) canvas:any;

  ngOnInit() {
    this.loadModel();
  }


  //// LOAD PRETRAINED KERAS MODEL ////

  async loadModel() {
    this.model = await tf.loadLayersModel('https://raw.githubusercontent.com/dhormale/angular-tensorFlow-integration/master/src/assets/model.json');
  }

  async predict(imageData: ImageData) {
    // console.log('imageData = ' , imageData);

    const pred = await tf.tidy(() => {

      // Convert the canvas pixels to
      let img = tf.browser.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = this.model.predict(img) as any;

      // Save predictions on the component
      this.predictions = Array.from(output.dataSync());

      for (let i = 0; i < this.predictions.length; i++) {
        if (this.predictions[i] == "1") {
          this.predictedNumber = i.toString();
        }
      }
      if (this.predictedNumber == "") {
        this.predictedNumber = ":(";
      }
    });

  }

  clear() {
    this.predictedNumber = "";
  }

}
