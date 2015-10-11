angular.module("appFolio", [])
    .controller('mainCtrl', ['$scope', function($scope) {

        $scope.navitems = ['Portfolio', 'Skillset', 'Experience', 'Contact'];
        $scope.skills = ['html', 'css', 'javascript', 'angular', 'node', 'bootstrap', 'bash', 'mongo', 'sass', 'bower', 'npm', 'git', 'github', 'yeoman', ];

    }]);