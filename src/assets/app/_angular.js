window.angular.module('appFolio', [])
    .controller('mainCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {

        //ROOT UTILITY FOR PORTFOLIO AND EXPERIENCE
        $scope.alterHash = function(hash) {
            $location.hash(hash);
        };

        //NAVBAR
        $scope.navitems = ['Portfolio', 'Skillset', 'Experience', 'Contact'];
        //console.log($location.hash());

        //PORTFOLIO
        $rootScope.changeProject = function(index) {
            $rootScope.project = $rootScope.projectData[index];
        };

        var portfolioItems = [
            'various',
            'riskvisualizer',
            'fridgebinge',
            'hdrgallery',
            'defref',
            'carcrash',
            'adeq',
            'harmonystyles',
            'disney'
        ];


        //next button
        $scope.next = function() {
            var current = portfolioItems.indexOf($location.hash());
            if (current === 0) {
                $scope.alterHash(portfolioItems[portfolioItems.length - 1]);
            } else {
                current--;
                $scope.alterHash(portfolioItems[current]);
            }
        }

        //previous button
        $scope.previous = function() {
            var current = portfolioItems.indexOf($location.hash());
            if (current === (portfolioItems.length - 1)) {
                $scope.alterHash(portfolioItems[0]);
            } else {
                current++;
                $scope.alterHash(portfolioItems[current]);
            }
        }

        //load portfolio when closing projects modal
        $('.portfolio-modal').on('hide.bs.modal', function() {
            if (portfolioItems.indexOf($location.hash()) !== -1) {
                $scope.$apply(function() {
                    $scope.alterHash('portfolio');
                })
            }
        });

        //load experience when closing resume modal (for situation when i load resume directly)
        $('.resume-modal').on('hide.bs.modal', function() {
            if ($location.hash() === 'resume') {
                $scope.$apply(function() {
                    $scope.alterHash('experience');
                })
            }
        });

        $rootScope.projectData = [{
            'title': 'Risk Visualizer',
            'description': 'Responsive web app to visualize health risk',
            'technology': 'HTML Canvas, AngularJS, Bootstrap',
            'client': 'Kindra C.',
            'code': 'riskvisualizer',
            'link': 'http://riskvisualizer.xaviro.com/',
            'number': 0
        }, {
            'title': 'Fridge Binge',
            'description': 'Website for retro games startup',
            'technology': 'MEAN Stack (MongoDB, Express, AngularJS, Node.js), Handlebars, Passport (Local Authentication)',
            'client': 'FridgeBingeGames',
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
            'client': 'FridgeBingeGames',
            'code': 'carcrash',
            'link': 'http://fridgebinge.xaviro.com/carcrash',
            'number': 4

        }, {
            'title': 'Back to the 80\'s',
            'description': 'Eighties themed site',
            'technology': 'Bootstrap, Photoshop, Final Cut',
            'client': 'Aaron H.',
            'code': 'various',
            'link': 'http://80s.xaviro.com/',
            'number': 5
        }, {
            'title': 'Harmony Styles',
            'description': 'Stylist Business Website',
            'technology': 'CSS3, Responsive design',
            'client': 'Harmony L.',
            'code': 'harmonystyles',
            'link': 'http://www.harmonystyles.com',
            'number': 6
        }, {
            'title': 'Arizona Department of Environmental Quality',
            'description': 'ADEQ Interactive Microsite',
            'technology': 'SVG, Illustrator, GSAP, Responsive Design',
            'client': 'Killer Infographics',
            'code': 'adeq',
            'link': 'http://www.adeq.com',
            'number': 7
        }, {
            'title': 'Nintendo Disney Art Academy',
            'description': 'Website for Nintendo\'s new 3DS game',
            'technology': 'CSS3, Photoshop, GSAP, slick.js',
            'client': 'Enter the Studio',
            'code': 'disney',
            'link': 'http://artacademy.nintendo.com/disney/',
            'number': 8
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
                            break;
                        case 'harmonystyles':
                            portfolioModal.modal();
                            $rootScope.changeProject(6);
                            break;
                        case 'adeq':
                            portfolioModal.modal();
                            $rootScope.changeProject(7);
                            break;
                        case 'disney':
                            portfolioModal.modal();
                            $rootScope.changeProject(8);
                            break;
                        case 'resume':
                            resumeModal.modal();
                    }
                };




                //runs previous functions on path change with watch
                $rootScope.launchkModal();





            });
    }]).filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        };
    });
