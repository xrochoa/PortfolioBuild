angular.module("appFolio", [])
    .controller('mainCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {

        //ROOT UTILITY FOR PORTFOLIO AND EXPERIENCE
        $scope.alterHash = function(hash) {
            $location.hash(hash);
        };

        //NAVBAR
        $scope.navitems = ['Portfolio', 'Skillset', 'Experience', 'Contact'];
        console.log($location.hash());

        //PORTFOLIO
        $rootScope.changeProject = function(index) {
            $rootScope.project = $rootScope.projectData[index];
        };

        $('.portfolio-modal').on('hide.bs.modal', function() {
            console.log('hey');
            switch ($location.hash()) {
                case 'riskvisualizer':
                case 'fridgebinge':
                case 'hdrgallery':
                case 'defref':
                case 'audioportfolio':
                case 'various':
                    $scope.$apply(function() {
                        $scope.alterHash('portfolio');
                    })
            }

        });

        $('.resume-modal').on('hide.bs.modal', function() {
            console.log('hey');
            switch ($location.hash()) {
                case 'resume':
                    $scope.$apply(function() {
                        $scope.alterHash('experience');
                    })
            }

        });

        $rootScope.projectData = [{
            'title': 'Risk Visualizer',
            'description': 'Responsive web app to visualize health risk',
            'client': 'Kindra Clark-Snustad (University of Washington Nurse Practitioner)',
            'code': 'riskvisualizer',
            'number': 0
        }, {
            'title': 'Fridge Binge',
            'description': 'Two web games and a website for a startup',
            'client': 'Aaron Hunter & Tyler Warren (Google Maps Visual Data Specialists)',
            'code': 'fridgebinge',
            'number': 1
        }, {
            'title': 'HDR Photography',
            'description': 'An web galery showcasing HDR photos of 16 US National Parks',
            'client': 'Personal Project',
            'code': 'hdrgallery',
            'number': 2
        }, {
            'title': 'DevRef.com',
            'description': 'A reference site for a javascript developer',
            'client': 'Personal Project',
            'code': 'defref',
            'number': 3
        }, {
            'title': 'Jason McDonald',
            'description': 'Portfolio for an Audio Engineer',
            'client': 'Jason McDonald (Recording Studio Owner)',
            'code': 'audioportfolio',
            'number': 4

        }, {
            'title': 'Smaller Projects',
            'description': 'A collection of various porjects',
            'client': 'Various',
            'code': 'various',
            'number': 5
        }];


        //SKILLS
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

        //EXPERIENCE
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
    .config(['$locationProvider', function($locationProvider) {

        //fixes angular confusion of # anchor links --> now !
        $locationProvider.html5Mode(true).hashPrefix('!');
    }])
    .run(['$rootScope', '$location', function($rootScope, $location) {

        $rootScope.$watch(function() {
                return $location.hash();
            },
            function(hash) {

                //handles checking route and showing portfolio modal
                var portfolioModal = $('.portfolio-modal');
                var resumeModal = $('.resume-modal');


                $rootScope.launchkModal = function() {

                    switch ($location.hash()) {
                        case '':
                        case 'portfolio':
                        case 'skillset':
                        case 'experience':
                        case 'contact':
                            portfolioModal.modal('hide');
                            resumeModal.modal('hide');
                            console.log('main');
                            break;
                        case 'riskvisualizer':
                            portfolioModal.modal();
                            $rootScope.changeProject(0);
                            break;
                        case 'fridgebinge':
                            portfolioModal.modal();
                            $rootScope.changeProject(1);
                            break;
                        case 'hdrgallery':
                            portfolioModal.modal();
                            $rootScope.changeProject(2);
                            break;
                        case 'defref':
                            portfolioModal.modal();
                            $rootScope.changeProject(3);
                            break;
                        case 'audioportfolio':
                            portfolioModal.modal();
                            $rootScope.changeProject(4);
                            break;
                        case 'various':
                            portfolioModal.modal();
                            $rootScope.changeProject(5);
                            break; ///
                        case 'resume':
                            resumeModal.modal();
                    }
                };




                //runs previous functions on path change with watch
                $rootScope.launchkModal();





            });
    }]);