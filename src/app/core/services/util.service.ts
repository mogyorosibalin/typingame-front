import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  // Gets a number between 0 and 1, and return its percentage value
  getPercentage(num: number) {
    return this.round(num * 100, 2);
  }

  // Gets a number
  round(num: number, decs: number) {
    const divide = Math.pow(10, decs);
    return Math.round(num * divide) / divide;
  }

}
