var app = angular.module('myApp', ['vapour']);

// controller
app.controller('IndexCtrl', function ($scope) {
    $scope.products = [
        {
            name: '测试1',
            content: '测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1'
        },
        {
            name: '测试2',
            content: '测试2测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1'
        },
        {
            name: '测试3',
            content: '测试3测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1'
        }
    ];

    $scope.pieData = [{
        name: "Microsoft Internet Explorer",
        y: 56.33
    }, {
        name: "Chrome",
        y: 24.03,
        sliced: true,
        selected: true
    }, {
        name: "Firefox",
        y: 10.38
    }, {
        name: "Safari",
        y: 4.77
    }, {
        name: "Opera",
        y: 0.91
    }, {
        name: "Proprietary or Undetectable",
        y: 0.2
    }]
});
// config
var indexTemp = document.getElementById('index').innerHTML;
app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('index', {
        url: '/index',
        controller: 'IndexCtrl',
        template: indexTemp
    });

    $urlRouterProvider.otherwise('index');
});

app.directive('hcPieChart', function () {
    return {
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: scope.title
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    data: scope.data
                }]
            });
        }
    };
});
