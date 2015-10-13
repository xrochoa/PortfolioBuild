angular.module("appFolio", [])
    .controller('mainCtrl', ['$scope', function($scope) {

        $scope.navitems = ['Portfolio', 'Skillset', 'Experience', 'Contact'];
        $scope.skills = [{
            'icon': 'html',
            'name': 'HTML5'
        }, {
            'icon': 'css',
            'name': 'CSS3'
        }, {
            'icon': 'js',
            'name': 'JavaScript'
        }, {
            'icon': 'jquery',
            'name': 'JQuery'
        }, {
            'icon': 'angular',
            'name': 'AngularJS'
        }, {
            'icon': 'bootstrap',
            'name': 'Bootstrap'
        }, {
            'icon': 'sass',
            'name': 'Sass'
        }, {
            'icon': 'git',
            'name': 'Git & GitHub'
        }, {
            'icon': 'node',
            'name': 'Node.js'
        }, {
            'icon': 'gulp',
            'name': 'Gulp'
        }, {
            'icon': 'mongo',
            'name': 'MongoDB'
        }, {
            'icon': 'karma',
            'name': 'Karma'
        }];
        $scope.jobs = [{
            name: "Randstad at Google",
            desc: "",
            link: "",
            logo: "rand"
        }, {
            name: "Freelancer",
            desc: "",
            link: "",
            logo: "x"
        }, {
            name: "National Polytechnic School",
            desc: "",
            link: "",
            logo: "epn"
        }, {
            name: "Ecuadorian Ministry of Development",
            desc: "",
            link: "",
            logo: "mdd"
        }];

    }]);