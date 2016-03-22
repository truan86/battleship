import 'babel-polyfill';
import angular from 'angular';
import angularUiRouter from 'angular-ui-router';
import io from 'socket.io-client';

import mainTemplate from '../partials/main.html';
import gameTemplate from '../partials/game.html';
import resultsTemplate from '../partials/results.html';

import MainController from './main/main.js';
import GameController from './game/index';
import ResultsController from './results/results';
import GameService from './service/service';


angular.module("app", [angularUiRouter])
    .controller('MainController', MainController)
    .controller('GameController', GameController)
    .controller('ResultsController', ResultsController)
    .service('GameService', GameService)
    .factory('socket', function ($rootScope) {
        let socket = io.connect();
        return socket;
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: "/",
                template: mainTemplate,
                controller: 'MainController as main'
            })
            .state('game', {
                url: '/game',
                template: gameTemplate,
                controller: 'GameController as game'
            })
            .state('results', {
                url: '/results',
                template: resultsTemplate,
                controller: 'ResultsController as results'
            });
    });



