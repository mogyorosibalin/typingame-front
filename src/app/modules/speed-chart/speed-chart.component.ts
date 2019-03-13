import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { CharFeedback } from '../../shared/enums/char-feedback.enum';

@Component({
  selector: 'app-speed-chart',
  templateUrl: './speed-chart.component.html',
  styleUrls: ['./speed-chart.component.sass']
})
export class SpeedChartComponent implements OnInit {

  @Input() typingResults = [];

  speedChart = {
    type: 'scatter',
    datasets: [
      {
        data: this.createChartDataSpeed(),
        label: 'Speed (WPM)',
        fill: false,
        backgroundColor: '#f00',
        borderColor: '#f00',
        showLine: true,
        tension: 0
      }
    ],
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
      tooltips: {
        custom: function(tooltip) {
          tooltip.displayColors = false;
        },
        callbacks: {
          title: function(tooltipItem, data) {
            const item = data.datasets[0].data[tooltipItem[0].index];
            return moment(item.finishedTime).format('MMM Do YYYY, h:mm a');
          },
          label: function(tooltipItem, data) {
            const item = data.datasets[0].data[tooltipItem.index];
            return [
              `Speed: ${item.y} WPM`,
              `Accuracy: ${item.accuracy}%`
            ];
          }
        },
        titleFontSize: 16,
        bodyFontSize: 14
      }
    },
    legend: false
  };

  constructor() { }

  ngOnInit() {
    const data = this.createChartDataSpeed();
    this.speedChart.datasets[0].data = data;
    this.speedChart.options.scales.yAxes[0].ticks.suggestedMin = Math.min(...data.map(d => d.y)) - 5;
    this.speedChart.options.scales.yAxes[0].ticks.suggestedMax = Math.max(...data.map(d => d.y)) + 5;
  }

  createChartDataSpeed() {
    const data = [];
    for (const typingResult of this.typingResults) {
      data.push({
        x: data.length + 1,
        y: Math.round((typingResult.chars.length / 5) / (typingResult.timeMiliSec / 1000 / 60)),
        timiMiliSec: typingResult.timeMiliSec,
        finishedTime: typingResult.finishedTime,
        accuracy: Math.round(
          (typingResult.chars.filter(good => good !== CharFeedback.WRONG).length / typingResult.chars.length) * 100 * 100) / 100
      });
    }
    return data;
  }

}
