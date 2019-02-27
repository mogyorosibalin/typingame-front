import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../core/auth/auth.service';
import { TypingService } from '../../../core/services/typing.service';
import { Text } from '../../../shared/models/text.model';
import * as moment from 'moment';

@Component({
  selector: 'app-practice-info',
  templateUrl: './practice-info.component.html',
  styleUrls: ['./practice-info.component.sass']
})
export class PracticeInfoComponent implements OnInit, OnDestroy {

  text: Text;
  typingResults: any[];
  private _typingResultsSub: Subscription;

  speedChart = {
    type: 'scatter',
    datasets: [{
      data: [],
      fill: false,
      backgroundColor: '#f00',
      borderColor: '#f00',
      showLine: true,
      tension: 0
    }],
    legend: false,
    options: {
      responsive: true,
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            stepSize: 1,
            suggestedMin: 1,
            suggestedMax: 3
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
          },
          ticks: {
            suggestedMin: 40,
            suggestedMax: 100
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },
      tooltips: {
        custom: function(tooltip) {
          tooltip.displayColors = false;
        },
        callbacks: {
          label: function(tooltipItem, data) {
            const item = data.datasets[0].data[tooltipItem.index];
            return item.y;
          }
        },
        bodyFontSize: 14
      }
    },
  };

  constructor(private authService: AuthService,
              private typingService: TypingService) { }

  ngOnInit() {
    this.text = this.typingService.getText();
    this._typingResultsSub = this.typingService.typingResultsForTextChanged
      .subscribe(
        (typingResults: any[]) => {
          this.typingResults = typingResults;
          this.speedChart.datasets[0].data = this.createChartDataSpeed();
        }
      );
  }

  ngOnDestroy() {
    this._typingResultsSub.unsubscribe();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  createChartDataSpeed() {
    const data = [];
    for (const typingResult of this.typingResults) {
      data.push({
        x: data.length + 1,
        y: Math.round((typingResult.chars.length / 5) / (typingResult.timeMiliSec / 1000 / 60))
      });
    }
    return data;
  }

  onPracticeAgain() {
    this.typingService.typingAgain.next();
  }

  getAccuracy() {
   return this.typingService.getAccuracy();
  }

  getElapsedTime() {
    return Math.round(this.typingService.getElapsedTime() / 1000);
  }

  getSpeed() {
    return this.typingService.getFinalSpeed();
  }

  getPoints() {
    return this.typingService.getPoints();
  }

}
