import {Component} from '@angular/core';
import 'chart.js';


@Component({
  selector: 'main',
  template: require('./main.html'),
  styles: [require('./main.scss')],
})


export class MainComponent {
  displayLineCharts = '工厂概览';
  selections = [{
    name: '工厂概览'
  }, {
    name: '一号生产线'
  }, {
    name: '二号生产线'
  }, {
    name: '总装生产线'
  }];
  changeLineChart = function(displayLine: string) {
    this.displayLineCharts = displayLine;
    switch (displayLine) {
      case '工厂概览':
        this.chartData = [
          { data: [330, 600, 260, 700], label: '月进料' },
          { data: [120, 455, 100, 340], label: '月出料' },
          { data: [110, 145, 160, 360], label: '总平衡' }
        ];
        break;
      case '一号生产线':
        this.chartData = [
          { data: [130, 500, 260, 400], label: '月进料' },
          { data: [120, 455, 100, 340], label: '月出料' },
          { data: [10, 45, 160, 60], label: '总平衡' }
        ];
        break;
      case '二号生产线':
        this.chartData = [
          { data: [380, 740, 220, 650], label: '月进料' },
          { data: [340, 455, 100, 300], label: '月出料' },
          { data: [40, 285, 120, 350], label: '总平衡' }
        ];
        break;
      case '总装生产线':
        this.chartData = [
          { data: [330, 600, 260, 700], label: '月进料' },
          { data: [120, 455, 100, 340], label: '月出料' },
          { data: [110, 145, 160, 360], label: '总平衡' }
        ];
        break;
    }
  };
  randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
  };

  chartOptions = {
    responsive: true
  };

  chartData = [
    {data: [330, 600, 260, 700], label: '月进料'},
    {data: [120, 455, 100, 340], label: '月出料'},
    {data: [110, 145, 160, 360], label: '总平衡'}
  ];

  chartLabels = ['一月', '二月', '三月', '四月'];

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

  doughnutLabels = ['一等品',
    '二等品',
    '次等品',
  ];

  onChartClick(event) {
    console.log(event);
  }
}
