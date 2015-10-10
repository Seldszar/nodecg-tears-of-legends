(function () {
    'use strict';

    angular.module('tears-of-legends', [])
        .directive('stopwatch', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                templateUrl: '/partials/components/stopwatch.html',
                link: function (scope, element, attrs) {
                    nodecg.Replicant('stopwatch')
                        .on('change', function (oldVal, newVal) {
                            if (angular.equals(oldVal, newVal)) {
                                return;
                            }

                            scope.stopwatch = newVal;
                            scope.$apply();
                        });
                }
            };
        }])
        .directive('pool', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                templateUrl: '/partials/components/pool.html',
                link: function (scope, element, attrs) {
                    nodecg.Replicant('pool')
                        .on('change', function (oldVal, newVal) {
                            if (angular.equals(oldVal, newVal)) {
                                return element.removeClass('updating');
                            }

                            $timeout(function () {
                                if (newVal) {
                                    scope.pool = newVal;
                                }

                                element.removeClass('updating');
                            }, 500);

                            element.addClass('updating');
                        });

                    element.addClass('updating');
                }
            };
        }])
        .directive('player', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                templateUrl: '/partials/components/player.html',
                scope: {
                    index: '='
                },
                link: function (scope, element, attrs) {
                    nodecg.Replicant('players')
                        .on('change', function (oldVal, newVal) {
                            var oldPlayer = (oldVal ? oldVal[scope.index - 1] : undefined);
                            var newPlayer = (newVal ? newVal[scope.index - 1] : undefined);

                            if (angular.equals(oldPlayer, newPlayer)) {
                                return element.removeClass('updating');
                            }

                            $timeout(function () {
                                if (newPlayer) {
                                    scope.player = newPlayer;

                                    element.removeClass('updating');
                                }
                            }, 500);

                            element.addClass('updating');
                        });

                    element.addClass('updating');
                }
            };
        }])
        .directive('characters', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                templateUrl: '/partials/components/characters.html',
                link: function (scope, element, attrs) {
                    scope.characters = [];

                    scope.character = function (index) {
                        return scope.config.characters[scope.characters[index]];
                    };

                    nodecg.Replicant('characters')
                        .on('change', function (oldVal, newVal) {
                            if (angular.equals(oldVal, newVal)) {
                                return element.removeClass('updating');
                            }

                            $timeout(function () {
                                if (newVal) {
                                    scope.characters = newVal;
                                }

                                element.removeClass('updating');
                            }, 500);

                            element.addClass('updating');
                        });

                    element.addClass('updating');
                }
            };
        }])
        .controller('MainController', ['$scope', '$timeout', function ($scope, $timeout) {
            $scope.config = nodecg.bundleConfig;
        }]);
})();
