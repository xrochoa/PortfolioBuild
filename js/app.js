angular.module("appFolio", [])
    .controller('mainCtrl', ['$scope', function($scope) {


        $scope.navitems = ['Portfolio', 'Skillset', 'Experience', 'Contact'];

        $scope.changeView = function(view) {
            $scope.view = 'views/' + view;
        }

        $scope.changeProject = function(number) {
            $scope.project = $scope.projectData[number];
            $scope.project.number = number;
        }

        $scope.projectData = [{
            'title': 'Risk Visualizer',
            'description': 'Responsive web app to visualize health risk',
            'client': 'Kindra Clark-Snustad (University of Washington Nurse Practitioner)'
        }, {
            'title': 'Fridge Binge',
            'description': 'Two web games and a website for a startup',
            'client': 'Aaron Hunter & Tyler Warren (Google Maps Visual Data Specialists)'
        }, {
            'title': 'HDR Photography',
            'description': 'An web galery showcasing HDR photos of 16 US National Parks',
            'client': 'Personal Project'
        }, {
            'title': 'DevRef.com',
            'description': 'A reference site for a javascript developer',
            'client': 'Personal Project'
        }, {
            'title': 'Jason McDonald',
            'description': 'Portfolio for an Audio Engineer',
            'client': 'Jason McDonald (Recording Studio Owner)'
        }, {
            'title': 'Smaller Projects',
            'description': 'A collection of various porjects'
        }];



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
    }])
    .config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    });