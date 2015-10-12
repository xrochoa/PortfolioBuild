angular.module("appFolio", [])
    .controller('mainCtrl', ['$scope', function($scope) {

        $scope.navitems = ['Portfolio', 'Skillset', 'Experience', 'Contact'];
        $scope.skills = ['html', 'css', 'js', 'jquery', 'angular', 'bootstrap', 'sass', 'git', 'node', 'gulp', 'mongo', 'karma', ];
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
            name: "National Polythecnic University",
            desc: "",
            link: "",
            logo: "epn"
        }, {
            name: "Ministry of Development",
            desc: "",
            link: "",
            logo: "mdd"
        }];

    }]);