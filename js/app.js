angular.module("appFolio", [])
    .controller('mainCtrl', ['$scope', '$location', function($scope, $location) {


        $scope.alterHash = function(hash) {
            $location.hash(hash);
        };


        $scope.navitems = ['Portfolio', 'Skillset', 'Experience', 'Contact'];

        $scope.changeView = function(view) {
            $scope.view = 'views/' + view;
        };

        $scope.changeProject = function(number) {
            $scope.project = $scope.projectData[number];
            $scope.project.number = number;
        };

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

        //fixes angular confusion of # anchor links
        $locationProvider.html5Mode(true).hashPrefix('!');
    })
    .run(function($rootScope, $location) {

        $rootScope.$watch(function() {
                return $location.hash();
            },
            function(hash) {
                console.log('url has changed: ' + hash);

                //handles checking route and showing portfolio modal
                var portfolioModal = $('.portfolio-modal');

                $rootScope.launchkModal1 = function() {
                    switch ($location.hash()) {
                        case 'project0':
                        case 'project1':
                        case 'project2':
                        case 'project3':
                        case 'project4':
                        case 'project5':
                            portfolioModal.modal();
                            break;
                        default:
                            portfolioModal.modal('hide');

                    }

                };

                //handles checking route and showing resume modal
                var resumeModal = $('.resume-modal');

                $rootScope.launchkModal2 = function() {

                    if ($location.hash() === 'resume') {
                        resumeModal.modal();
                    } else {
                        resumeModal.modal('hide');
                    }
                };

                //runs previous functions on path change with watch
                $rootScope.launchkModal1();
                $rootScope.launchkModal2();


            });
    });