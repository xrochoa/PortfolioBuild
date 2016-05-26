angular.module('appFolio', [])
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
            $scope.currentIndex = index;
        };

        $rootScope.projectData = [{
            'name': 'Nintendo Disney Art Academy',
            'desc': 'Website for Nintendo\'s new 3DS game',
            'tech': 'CSS3, JQuery, GSAP, slick.js, Photoshop',
            'client': 'Enter the Studio',
            'design': 'Enter the Studio',
            'code': 'disney',
            'link': 'http://artacademy.nintendo.com/disney/'
        }, {
            'name': 'Harmony Styles',
            'desc': 'Stylist Business Website',
            'tech': 'CSS3, JQuery, Responsive Design',
            'client': 'Harmony L.',
            'design': 'Tyler Warren',
            'code': 'harmonystyles',
            'link': 'http://harmonystyles-v3.surge.sh'
        }, {
            'name': 'Arizona Department of Environmental Quality',
            'desc': 'ADEQ Interactive Microsite',
            'tech': 'SVG, Illustrator, GSAP, Responsive Design, JQuery',
            'client': 'Killer Infographics',
            'design': 'Killer Infographics',
            'code': 'adeq',
            'link': 'http://kiadeq3.surge.sh'
        }, {
            'name': 'Fridge Binge',
            'desc': 'Website for retro games startup',
            'tech': 'AngularJS, Node.js, MongoDB, Express, Handlebars, Passport, Bcrypt, RESTful API',
            'client': 'FridgeBingeGames',
            'design': 'Xavier Reyes Ochoa',
            'code': 'fridgebinge',
            'link': 'http://www.fridgebinge.com'
        }, {
            'name': 'Demandware Shopper\'s Journey',
            'desc': 'Shopping Experience Interactive Infographic',
            'tech': 'D3.js, velocity.js, SVG, AJAX',
            'client': 'Killer Infographics',
            'design': 'Killer Infographics',
            'code': 'demandware',
            'link': 'http://www.demandware.com/new-shoppers-journey/graphic.php'
        }, {
            'name': 'Risk Visualizer',
            'desc': 'Responsive web app to visualize health risk',
            'tech': 'HTML Canvas, AngularJS, Bootstrap',
            'client': 'Kindra C.',
            'design': 'Xavier Reyes Ochoa',
            'code': 'riskvisualizer',
            'link': 'http://riskvisualizer.xaviro.com/'
        }, {
            'name': 'Class Appraisal',
            'desc': 'Appraisal Data Interactive Infographic',
            'tech': 'D3.js, topojson.js, ArcGIS, AJAX',
            'client': 'Killer Infographics',
            'design': 'Killer Infographics',
            'code': 'classappraisal',
            'link': 'https://www.classappraisal.com/interactive-dashboard'
        }, {
            'name': 'Developer\'s Reference',
            'desc': 'Reference site for javascript developers',
            'tech': 'Bootstrap, AngularJS, Sass, D3.js',
            'client': 'Open Source Project',
            'design': 'Xavier Reyes Ochoa',
            'code': 'defref',
            'link': 'http://devref.xaviro.com/'
        }, {
            'name': 'Car Crash',
            'desc': 'Retro web game',
            'tech': 'Phaser, Browserify, AJAX, RESTful API, Photoshop',
            'client': 'FridgeBingeGames',
            'design': 'Tyler Warren & Xavier Reyes Ochoa',
            'code': 'carcrash',
            'link': 'http://www.fridgebinge.com/carcrash'

        }, {
            'name': 'HDR Photography',
            'desc': 'Web galery showcasing HDR photos of National Parks',
            'tech': 'Bootstrap, AngularJS, Browserify',
            'client': 'Personal Project',
            'design': 'Xavier Reyes Ochoa',
            'code': 'hdrgallery',
            'link': 'http://photogallery.xaviro.com/'
        }, {
            'name': 'Back to the 80\'s',
            'desc': 'Eighties themed site',
            'tech': 'Bootstrap, Photoshop, Final Cut',
            'client': 'Aaron H.',
            'design': 'Xavier Reyes Ochoa',
            'code': 'eighties',
            'link': 'http://80s.xaviro.com/'
        }, {
            'name': 'Starbuck',
            'desc': 'Starbucks Organization Campaign',
            'tech': 'vivus.js, GSAP, SVG, Illustrator',
            'client': 'Killer Infographics',
            'design': 'Killer Infographics',
            'code': 'starbucks',
            'link': 'http://starbucksorgchartv2.surge.sh'
        }];

        //create array of code names
        $rootScope.portfolioItems = [];

        for (var i = 0; i < $rootScope.projectData.length; i++) {
            $rootScope.portfolioItems.push($rootScope.projectData[i].code);

        };


        //next button
        $scope.next = function() {
            var current = $rootScope.portfolioItems.indexOf($location.hash());
            if (current === 0) {
                $scope.alterHash($rootScope.portfolioItems[$rootScope.portfolioItems.length - 1]);
            } else {
                current--;
                $scope.alterHash($rootScope.portfolioItems[current]);
            }
        }

        //previous button
        $scope.previous = function() {
            var current = $rootScope.portfolioItems.indexOf($location.hash());
            if (current === ($rootScope.portfolioItems.length - 1)) {
                $scope.alterHash($rootScope.portfolioItems[0]);
            } else {
                current++;
                $scope.alterHash($rootScope.portfolioItems[current]);
            }
        }

        //load portfolio when closing projects modal
        $('.portfolio-modal').on('hide.bs.modal', function() {
            if ($rootScope.portfolioItems.indexOf($location.hash()) !== -1) {
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

                    var hideModalArray = ['', 'portfolio', 'skillset', 'experience', 'contact'];

                    if (hideModalArray.indexOf($location.hash()) > -1) {

                        portfolioModal.modal('hide');
                        resumeModal.modal('hide');

                    } else if ($rootScope.portfolioItems.indexOf($location.hash()) > -1) {

                        portfolioModal.modal();
                        $rootScope.changeProject($rootScope.portfolioItems.indexOf($location.hash()));

                    } else if ($location.hash() === 'resume') {

                        resumeModal.modal();

                    }
                };




                //runs previous functions on path change with watch
                $rootScope.launchkModal();





            });
    }]);