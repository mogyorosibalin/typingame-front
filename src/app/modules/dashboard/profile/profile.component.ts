import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';

import { UserService } from '../../../core/services/user.service';
import {CharFeedback} from '../../../shared/enums/char-feedback.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  lastNum = 10;

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
            suggestedMax: 10
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
      }
    },
    legend: false
  };

  accuracyChart = {
    type: 'scatter',
    datasets: [
      {
        data: this.createChartDataAccuracy(),
        label: 'Accuracy (%)',
        fill: false,
        backgroundColor: '#00f',
        borderColor: '#00f',
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
            suggestedMax: 10
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
          },
          ticks: {
            suggestedMin: 95,
            suggestedMax: 100
          }
        }]
      }
    },
    legend: false
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  createChartDataSpeed() {
    const data = [];
    for (const typingResult of this.userService.getTypingResults().reverse()) {
      data.push({ x: data.length + 1, y: Math.round((typingResult.chars.length / 5) / (typingResult.timeMiliSec / 1000 / 60)) });
    }
    return data;
  }

  createChartDataAccuracy() {
    const data = [];
    for (const typingResult of this.userService.getTypingResults().reverse()) {
      data.push({ x: data.length + 1, y: Math.round(
          (typingResult.chars.filter(good => good !== CharFeedback.WRONG).length / typingResult.chars.length) * 100 * 100) / 100 });
    }
    return data;
  }

  changeLast(amount: number) {
    this.lastNum += amount;
    this.lastNum = Math.max(this.lastNum, 1);
    this.lastNum = Math.min(this.lastNum, this.userService.getTypingTimes());
  }

  getPicture(): string {
    return this.userService.getProfilePicture();
  }

  getName(): string {
    return this.userService.getFirstName() + ' ' + this.userService.getLastName();
  }

  getNickname(): string {
    return this.userService.getNickname();
  }

  getTypingTimes(): number {
    return this.userService.getTypingTimes();
  }

  getPoints(): number {
    return this.userService.getPoints();
  }

  getAverageSpeedLast(): number {
    return this.userService.getSpeed(this.lastNum);
  }

  getRealAverageSpeedLast(): number {
    return this.userService.getRealSpeed(this.lastNum);
  }

  getAverageSpeedAll(): number {
    return this.userService.getSpeed();
  }

  getRealAverageSpeedAll(): number {
    return this.userService.getRealSpeed();
  }

  getAverageAccuracyLast(): number {
    return this.userService.getAccuracy(this.lastNum);
  }

  getRealAverageAccuracyLast(): number {
    return this.userService.getRealAccuracy(this.lastNum);
  }

  getAverageAccuracyAll(): number {
    return this.userService.getAccuracy();
  }

  getRealAverageAccuracyAll(): number {
    return this.userService.getRealAccuracy();
  }

}
