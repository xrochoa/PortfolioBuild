//data

var portfolioData = [{
    "name": "Nintendo Disney Art Academy",
    "desc": "Website for Nintendo's new 3DS game",
    "tech": "CSS3, JQuery, GSAP, slick.js, Photoshop",
    "client": "Enter the Studio",
    "design": "Enter the Studio",
    "code": "disney",
    "link": "http://artacademy.nintendo.com/disney/"
}, {
    "name": "Fridge Binge",
    "desc": "Website for retro games startup",
    "tech": "AngularJS, Node.js, MongoDB, Express, Handlebars, Passport, Bcrypt, RESTful API",
    "client": "FridgeBingeGames",
    "design": "Xavier Reyes Ochoa",
    "code": "fridgebinge",
    "link": "http://www.fridgebinge.com"
}, {
    "name": "Arizona Department of Environmental Quality",
    "desc": "ADEQ Interactive Microsite",
    "tech": "SVG, Illustrator, GSAP, Responsive Design, JQuery",
    "client": "Killer Infographics",
    "design": "Killer Infographics",
    "code": "adeq",
    "link": "http://kiadeq3.surge.sh"
}, {
    "name": "Class Appraisal",
    "desc": "Appraisal Data Interactive Infographic",
    "tech": "D3.js, topojson.js, ArcGIS, AJAX",
    "client": "Killer Infographics",
    "design": "Killer Infographics",
    "code": "classappraisal",
    "link": "https://www.classappraisal.com/interactive-dashboard"
}, {
    "name": "Harmony Styles",
    "desc": "Stylist Business Website",
    "tech": "CSS3, JQuery, Responsive Design",
    "client": "Harmony L.",
    "design": "Tyler Warren",
    "code": "harmonystyles",
    "link": "http://harmonystyles-v3.surge.sh"
}, {
    "name": "Car Crash",
    "desc": "Retro web game",
    "tech": "Phaser, Browserify, AJAX, RESTful API, Photoshop",
    "client": "FridgeBingeGames",
    "design": "Tyler Warren & Xavier Reyes Ochoa",
    "code": "carcrash",
    "link": "http://www.fridgebinge.com/carcrash"

}, {
    "name": "Rosie",
    "desc": "MIDI Generator Desktop App for macOS",
    "tech": "Node.js, MIDI Specification, Electron",
    "client": "Personal Project",
    "design": "Xavier Reyes Ochoa",
    "code": "rosie",
    "link": "http://www.demandware.com/new-shoppers-journey/graphic.php"
}, {
    "name": "Risk Visualizer",
    "desc": "Responsive web app to visualize health risk",
    "tech": "HTML Canvas, AngularJS, Bootstrap",
    "client": "Kindra C.",
    "design": "Xavier Reyes Ochoa",
    "code": "riskvisualizer",
    "link": "http://riskvisualizer.xaviro.com/"
}, {
    "name": "HDR Photography",
    "desc": "Web galery showcasing HDR photos of National Parks",
    "tech": "Bootstrap, AngularJS, Browserify",
    "client": "Personal Project",
    "design": "Xavier Reyes Ochoa",
    "code": "hdrgallery",
    "link": "http://photogallery.xaviro.com/"
}];


/*----------  MODAL CLICKS  ----------*/

var currentProjectIndex = 0;

var $portfolioModal = $("#portfolio-modal"),
    $portfolioBtn = $('.btn-portfolio');

//portfolio click
$portfolioBtn.click(function() {

    var index = $portfolioBtn.index(this);
    currentProjectIndex = index;

    portfolioModalContent(currentProjectIndex);

    //open modal
    $portfolioModal.modal();

});


/*----------  LEFT AND RIGHT ARROWS  ----------*/

//portfolio modal is already open
var $arrowLeft = $('#arrow-left'),
    $arrowRight = $('#arrow-right');

$arrowLeft.click(function() {

    currentProjectIndex = (currentProjectIndex === 0) ? (portfolioData.length - 1) : (currentProjectIndex -= 1);
    portfolioModalContent(currentProjectIndex);

});

$arrowRight.click(function() {

    currentProjectIndex = (currentProjectIndex === portfolioData.length - 1) ? (currentProjectIndex = 0) : (currentProjectIndex += 1);
    portfolioModalContent(currentProjectIndex);

});

var $name = $('#portfolio-project-name'),
    $desc = $('#portfolio-project-desc'),
    $client = $('#portfolio-project-client'),
    $design = $('#portfolio-project-design'),
    $tech = $('#portfolio-project-tech'),
    $video = $('#portfolio-video');


function portfolioModalContent(index) {

    //fill data
    $name.text(portfolioData[index].name);
    $desc.text(portfolioData[index].desc);
    $client.text(portfolioData[index].client);
    $design.text(portfolioData[index].design);
    $tech.text(portfolioData[index].tech);
    $video.attr('poster', './assets/img/portfolio/' + portfolioData[index].code + '.png');


}
