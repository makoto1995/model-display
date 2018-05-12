import {Component} from '@angular/core';
import 'chart.js';


@Component({
  selector: 'main',
  template: require('./main.html'),
  styles: [require('./main.scss')],
})


export class MainComponent {
  randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
  };
  chartOptions = {
    responsive: true
  };

  chartData = [
    {data: [330, 600, 260, 700], label: 'Account A'},
    {data: [120, 455, 100, 340], label: 'Account B'},
    {data: [45, 67, 800, 500], label: 'Account C'}
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  doughnutOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  doughnutData = [
    {
      data: [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
      ],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
      ],
      label: 'Dataset 1'
    }
  ];

  doughnutLabels = ['Red',
    'Orange',
    'Yellow',
  ];

  onChartClick(event) {
    console.log(event);
  }
}
