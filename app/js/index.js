import 'babel-polyfill';
import angular from 'angular';
import angularUiRouter from 'angular-ui-router';

import mainTemplate from '../partials/main.html';
import startTemplate from '../partials/start.html';
import resultsTemplate from '../partials/results.html';

import MainController from './main/main.js';
import StartController from './start/start';
import ResultsController from './results/results';
import GameService from './service/service'

angular.module("app", [angularUiRouter])
    .controller('MainController', MainController)
    .controller('StartController', StartController)
    .controller('ResultsController', ResultsController)
    .service('GameService', GameService)

    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: "/",
                template: mainTemplate,
                controller: 'MainController as main'
            })
            .state('start', {
                url: '/start',
                template: startTemplate,
                controller: 'StartController as start'
            })
            .state('results', {
                url: '/results',
                template: resultsTemplate,
                controller: 'ResultsController as result'
            });

    });

