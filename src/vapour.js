import angular from 'angularjs-ie8-build';
import ngAnimate from 'angular-animate';
import uiRouter from 'angular-ui-router';

let VapourModule = angular.module('vapour', ['ngAnimate', 'ui.router']);

let extend = angular.extend;
let forEach = angular.forEach;
let isDefined = angular.isDefined;
let isNumber = angular.isNumber;
let isString = angular.isString;
let jqLite = angular.element;
let noop = angular.noop;

// 重写jqlite方法
import overrides from './service/overrides';
overrides(jqLite);