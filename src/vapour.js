import './directive/animate/animate';

import angular from 'angularjs-ie8-build';
import uiRouter from 'angular-ui-router';
require('oclazyload');

let VapourModule = angular.module('vapour', ['ui.router', 'oc.lazyLoad']);

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