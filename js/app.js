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
                case 'carcrash':
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
            'technology': 'HTML Canvas, AngularJS, Bootstrap',
            'client': 'University of Washington Nurse Practitioner',
            'code': 'riskvisualizer',
            'link': 'http://riskvisualizer.xaviro.com/',
            'number': 0
        }, {
            'title': 'Fridge Binge',
            'description': 'Website for retro games startup',
            'technology': 'MEAN Stack (MongoDB, Express, AngularJS, Node.js), Handlebars, Passport (Local Authentication)',
            'client': 'Seattle Entrepreneurs',
            'code': 'fridgebinge',
            'link': 'http://fridgebinge.xaviro.com/',
            'number': 1
        }, {
            'title': 'HDR Photography',
            'description': 'Web galery showcasing HDR photos of National Parks',
            'technology': 'Bootstrap, AngularJS, Browserify',
            'client': 'Personal Project',
            'code': 'hdrgallery',
            'link': 'http://photogallery.xaviro.com/',
            'number': 2
        }, {
            'title': 'Developer\'s Reference',
            'description': 'Reference site for javascript developers',
            'technology': 'Bootstrap, AngularJS, Sass',
            'client': 'Personal Project',
            'code': 'defref',
            'link': 'http://devref.xaviro.com/',
            'number': 3
        }, {
            'title': 'Car Crash',
            'description': 'Retro javascript game',
            'technology': 'Phaser, Browserify, Photoshop',
            'client': 'Seattle Entrepreneurs',
            'code': 'carcrash',
            'link': 'http://fridgebinge.xaviro.com/carcrash',
            'number': 4

        }, {
            'title': 'Back to the 80\'s',
            'description': 'Eighties themed site',
            'technology': 'Bootstrap, Photoshop, Final Cut',
            'client': 'Personal Project',
            'code': 'various',
            'link': 'http://80s.xaviro.com/',
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
                'name': 'MongoDB & Mongoose'
            }, {
                'icon': 'npm',
                'name': 'npm & Bower'
            }, {
                'icon': 'express',
                'name': 'Express'
            }, {
                'icon': 'browserify',
                'name': 'Browserify'
            }, {
                'icon': 'karma',
                'name': 'Karma'
            }, {
                'icon': 'passport',
                'name': 'Passport'
            }, {
                'icon': 'sublime',
                'name': 'Sublime'
            }, {
                'icon': 'bash',
                'name': 'Bash'
            }, {
                'icon': 'phaser',
                'name': 'Phaser'
            }, {
                'icon': 'photoshop',
                'name': 'Photoshop & Gimp'
            }

            /*,{
                'icon': 'nginx',
                'name': 'Nginx'
            },  {
                'icon': 'logic',
                'name': 'Logic Pro'
            }, {
                'icon': 'finalcut',
                'name': 'Final Cut Pro'
            },{
                'icon': 'docs',
                'name': 'Google Docs'
            }*/

        ];

        //EXPERIENCE
        $scope.jobs = [{
            name: "Randstad at Google",
            logo: "rand"
        }, {
            name: "Freelancer",
            logo: "free"
        }, {
            name: "National Polytechnic School",
            logo: "epn"
        }, {
            name: "Ecuadorian Ministry of Development",
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
                        case 'carcrash':
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