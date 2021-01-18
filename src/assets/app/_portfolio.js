//data

var portfolioData = [{
    'title': 'Nintendo Disney Art Academy',
    'subtitle': 'Promo website for Nintendo\'s 3DS game',
    'description': 'Nintendo Disney Art Academy is a website designed by <a href="http://enterthestudio.com/">Enter the Studio</a> for Nintendo\'s 3DS game. It was developed using technologies like GSAP, CSS3, slick.js, and JQuery. It was also customized and tested on many modern devices including the 3DS console.',
    'code': 'disney',
    'buttons': [false, false, false, 'http://artacademy.nintendo.com/disney/']
}, {
    'title': 'Fridge Binge',
    'subtitle': 'Website for a retro games startup',
    'description': 'Fridge Binge was developed and designed as a gaming site using AngularJS, Node.js, MongoDB, Express, Handlebars, Passport, Bcrypt, and RESTful APIs. It\'s Auth sytem was later migrated to Angular 2 and Firebase as a future proof upgrade.',
    'code': 'fridgebinge',
    'buttons': ['desktop', false, false, 'http://www.fridgebinge.com']
}, {
    'title': 'Arizona Department of Environmental Quality',
    'subtitle': 'ADEQ Interactive Microsite',
    'description': 'ADEQ Interactive Microsite is a website designed by <a href="http://http://killerinfographics.com/.com/">Killer Infographics</a> and developed using GSAP, JQuery, Illustrator, and responsive design principles. It uses SVG animations for a more elaborate level of interactivity.',
    'code': 'adeq',
    'buttons': [false, false, false, 'http://kiadeq3.surge.sh']
}, {
    'title': 'Class Appraisal',
    'subtitle': 'Appraisal Data Interactive Infographics',
    'description': 'Class Appraisal is a collection of infographics designed by <a href="http://http://killerinfographics.com/.com/">Killer Infographics</a>. Their architechture allow continuos graphic and data updates without coding knowledge. It was developed using D3.js, topojson.js, ArcGIS, AJAX, and many other web technologies.',
    'code': 'classappraisal',
    'buttons': [false, false, false, 'https://www.classappraisal.com/interactive-dashboard']
}, {
    'title': 'Harmony Styles',
    'subtitle': 'Stylist Business Website',
    'description': 'Harmony Styles is a responsive business website designed by Tyler Warren. It was developed using CSS3, JQuery, and many other web technologies.',
    'code': 'harmonystyles',
    'buttons': [false, false, false, 'http://harmonystyles.net']
}, {
    'title': 'Car Crash',
    'subtitle': 'Retro web game',
    'description': 'Car Crash is a web game that connects with <a href="http://fridgebinge.com/">FridgeBinge.com</a> through Restful API calls to create, update, delete (CRUD) user\'s data. It was designed with the help of Tyler Warren and developed using Phaser, Browserify, AJAX, RESTful APIs, and Photoshop.',
    'code': 'carcrash',
    'buttons': [false, false, false, 'http://www.fridgebinge.com/games/carcrash']

}, {
    'title': 'Rosie',
    'subtitle': 'MIDI Generator Desktop App for macOS',
    'description': 'Rosie is a MIDI Generator Desktop App for macOS. It creates a collection of midi files that randomly generate rythmic patterns, melodies, chords, tracks and full songs. It\'s object oriented design is based on the MIDI Specification and Jazz music theory. It can be used for musical brainstorming and was developed using Node.js and Electron.',
    'code': 'rosie',
    'buttons': ['desktop', false, false, false]

}, {
    'title': 'Risk Visualizer',
    'subtitle': 'Responsive web app to visualize health risk',
    'description': 'The Risk Visualizer was a project developed for Kindra C., a nurse practitioner in need of a visual feedback for her patients. It was designed and developed using HTML, AngularJS, Bootstrap, and responsive design principles.',
    'code': 'riskvisualizer',
    'buttons': [false, false, false, 'http://riskvisualizer.xaviro.com/']
}, {
    'title': 'HDR Photography',
    'subtitle': 'Web galery showcasing HDR photos of National Parks',
    'description': 'This is a personal gallery showcasing HDR photos of US National Parks.',
    'code': 'hdrgallery',
    'buttons': [false, false, false, 'http://photogallery.xaviro.com/']
}];


/*----------  MODAL CLICKS  ----------*/


var currentProjectIndex = 0;

var $portfolioModal = $('#portfolio-modal'),
    $portfolioBtn = $('.btn-portfolio');

//portfolio click
$portfolioBtn.click(function () {

    var index = $portfolioBtn.index(this);
    currentProjectIndex = index;

    changeProject(currentProjectIndex);

    //open modal
    $portfolioModal.modal();

});


/*----------  LEFT AND RIGHT ARROWS  ----------*/

//portfolio modal is already open
var $arrowLeft = $('#arrow-left'),
    $arrowRight = $('#arrow-right');

$arrowLeft.click(function () {

    currentProjectIndex = (currentProjectIndex === 0) ? (portfolioData.length - 1) : (currentProjectIndex -= 1);
    changeProject(currentProjectIndex);


});

$arrowRight.click(function () {

    currentProjectIndex = (currentProjectIndex === portfolioData.length - 1) ? (currentProjectIndex = 0) : (currentProjectIndex += 1);
    changeProject(currentProjectIndex);

});

var $title = $('#portfolio-project-title'),
    $subtitle = $('#portfolio-project-subtitle'),
    $description = $('#portfolio-project-description'),
    $video = $('#portfolio-video'),
    $devices = $('.btn-device');

function changeProject(index) {

    //fill data
    $title.text(portfolioData[index].title);
    $subtitle.text(portfolioData[index].subtitle);
    $description.html(portfolioData[index].description);
    //updates buttons
    var buttons = portfolioData[index].buttons;
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] === false) {
            $($devices[i]).addClass('hide');
        } else {
            $($devices[i]).removeClass('hide');
        }
    }
    //resets video playback (stops) and changes poster
    resetVideo(index);


}

/*----------  VIDEO BUTTONS  ----------*/


var $btnDesktop = $('#btn-video-desktop');
var $btnIpad = $('#btn-video-ipad');
var $btnMobile = $('#btn-video-mobile');
var $btnLink = $('#btn-web-link');

$btnDesktop.click(function () {
    changeVideo(currentProjectIndex, '-desktop');
});

$btnIpad.click(function () {
    changeVideo(currentProjectIndex, '-ipad');
});

$btnMobile.click(function () {
    changeVideo(currentProjectIndex, '-mobile');
});

$btnLink.click(function () {
    window.open(portfolioData[currentProjectIndex].buttons[3]);
});


var videoPlayer = videojs('portfolio-video');

//changes poster, video sources, and plays video
function changeVideo(index, string) {


    videoPlayer.src([
        { type: 'video/mp4', src: './assets/res/video/' + portfolioData[index].code + string + '.mp4' },
        { type: 'video/webm', src: './assets/res/video/' + portfolioData[index].code + string + '.webm' },
        { type: 'video/ogg', src: './assets/res/video/' + portfolioData[index].code + string + '.ogg' }
    ]);

    videoPlayer.play();
    videoPlayer.controls(true); //show controls manually since they are hidden on reset

}

//resets player to show new poster
function resetVideo(index) {

    videoPlayer.reset();
    videoPlayer.controls(false); //hide controls manually since they show by default
    videoPlayer.poster('./assets/img/portfolio/' + portfolioData[index].code + '.png');

}
