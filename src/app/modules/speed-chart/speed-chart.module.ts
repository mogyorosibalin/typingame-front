import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { SpeedChartComponent } from './speed-chart.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [
    SpeedChartComponent
  ],
  imports: [
    ChartsModule,
    CoreModule,
    SharedModule
  ],
  exports: [
    SpeedChartComponent
  ]
})
export class SpeedChartModule {}
