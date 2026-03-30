
const globals = {
    audio: true
}

// Audio
var buttonClick = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/Buttonclick.mp3');
var featured    = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/featured.mp3');
var slideSlow   = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/slideSlow.mp3');
var bg          = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/retrogameloop.mp3');

bg.loop   = true;
bg.volume = 0.7;

function playSound(sound) {
    if (globals.audio) {
        try { sound.play(); } catch(e) {}
    }
}

function playBg() {
    try {
        var p = bg.play();
        if (p && typeof p.catch === 'function') p.catch(function(){});
    } catch(e) {}
}

$(document).ready(function() {

    // Show "click to play" button after animations settle
    setTimeout(function(){
        $('button').animate({'opacity': 1});
    }, 2000);

    // ── Loading screen click ──────────────────────────────────────────────────

    $('.loader').click(function() {
        var $loading = $('.main_inner__loading');
        $loading.addClass('loaded');
        // After animation completes, fully remove from flow so it can't block clicks or paint
        setTimeout(function() {
            $loading.css({ display: 'none' });
        }, 1100);
        playBg();
        startQuiz();
    });

    // ── Audio toggles ─────────────────────────────────────────────────────────

    var audioSwitch = 0;
    var sfxSwitch   = 0;

    $('.options_sf').click(function(){
        if (sfxSwitch === 0) {
            globals.audio = false;
            sfxSwitch = 1;
            $(this).css('opacity', '0.4');
        } else {
            globals.audio = true;
            sfxSwitch = 0;
            $(this).css('opacity', '1');
        }
    });

    $('.options_bg').click(function(){
        if (audioSwitch === 0) {
            $(bg).animate({volume: 0}, 600);
            audioSwitch = 1;
            $(this).css('opacity', '0.4');
        } else {
            $(bg).animate({volume: 0.7}, 600);
            audioSwitch = 0;
            $(this).css('opacity', '1');
        }
    });

});

// ── Quiz data ─────────────────────────────────────────────────────────────────

var quizQuestions = [
  { text: "Wat spreekt jou het meest aan als je aan ICT denkt?",
    options: [
      { text: "Slimme apps en software bouwen voor echte gebruikers", tags: ["se","id"] },
      { text: "Bedrijven helpen met data en digitale processen",       tags: ["bdm"] },
      { text: "Systemen beveiligen en digitale dreigingen stoppen",    tags: ["ism"] },
      { text: "Netwerken, servers en cloud-infrastructuur beheren",    tags: ["nse"] }
    ]
  },
  { text: "Welk vak op school vond je het leukst?",
    options: [
      { text: "Wiskunde of natuurkunde",                              tags: ["nse","ism"] },
      { text: "Informatica of programmeren",                          tags: ["se","id"] },
      { text: "Economie of management",                               tags: ["bdm"] },
      { text: "Geen voorkeur - ik leer graag breed",                  tags: ["se","id","bdm","ism","nse"] }
    ]
  },
  { text: "Stel: je werkt bij een bedrijf. Wat doe jij het liefst?",
    options: [
      { text: "Een nieuwe app of website van begin tot eind bouwen",  tags: ["se"] },
      { text: "Creatieve digitale oplossingen bedenken en prototypen",tags: ["id"] },
      { text: "Dashboards en data-analyses maken voor management",    tags: ["bdm"] },
      { text: "De IT-beveiliging controleren en verbeteren",          tags: ["ism"] },
      { text: "De server- en netwerkinfrastructuur opzetten",         tags: ["nse"] }
    ]
  },
  { text: "Hoe werk je het liefst?",
    options: [
      { text: "Creatief en zelfstandig aan innovatieve projecten",    tags: ["id","se"] },
      { text: "Analytisch, methodisch en goed gedocumenteerd",        tags: ["bdm","ism"] },
      { text: "Hands-on met technische systemen en hardware",         tags: ["nse"] },
      { text: "In een team met mix van business en techniek",         tags: ["bdm","id"] }
    ]
  },
  { text: "Wat boeit jou het meest in de digitale wereld?",
    options: [
      { text: "Hoe software en applicaties worden gemaakt",           tags: ["se"] },
      { text: "Hoe technologie innovatie en start-ups aandrijft",     tags: ["id"] },
      { text: "Hoe bedrijven data gebruiken om slimmer te werken",    tags: ["bdm"] },
      { text: "Hoe hackers werken en hoe je ze stopt",                tags: ["ism"] },
      { text: "Hoe netwerken en cloudplatforms worden opgezet",       tags: ["nse"] }
    ]
  },
  { text: "Welke term spreekt jou het meest aan?",
    options: [
      { text: "Full-stack developer",                                 tags: ["se"] },
      { text: "UX designer / innovation engineer",                    tags: ["id"] },
      { text: "Business analist / data consultant",                   tags: ["bdm"] },
      { text: "Ethical hacker / security officer",                    tags: ["ism"] },
      { text: "Cloud / netwerk engineer",                             tags: ["nse"] }
    ]
  },
  { text: "Wat voor stage zou jij het liefst lopen?",
    options: [
      { text: "Bij een softwarebedrijf of tech-startup",              tags: ["se","id"] },
      { text: "Bij een groot bedrijf in de IT-afdeling of data-team", tags: ["bdm"] },
      { text: "Bij een cybersecuritybedrijf of de overheid",          tags: ["ism"] },
      { text: "Bij een telecomprovider of cloudplatform",             tags: ["nse"] }
    ]
  },
  { text: "Hoe kijk je aan tegen programmeren?",
    options: [
      { text: "Super leuk - code schrijven is mijn ding",             tags: ["se","nse"] },
      { text: "Leuk, maar ik combineer het liever met design",        tags: ["id"] },
      { text: "Ik begrijp de basis, maar richt me meer op processen", tags: ["bdm"] },
      { text: "Ik gebruik het om beveiligingsproblemen op te sporen", tags: ["ism"] }
    ]
  },
  { text: "Welk scenario klinkt het spannendst voor jou?",
    options: [
      { text: "Een app lanceren die duizenden mensen gebruiken",       tags: ["se"] },
      { text: "Een innovatief product pitchen voor investeerders",     tags: ["id"] },
      { text: "Een bedrijf helpen 30% efficienter werken via data",   tags: ["bdm"] },
      { text: "Een cyberaanval in realtime detecteren en stoppen",    tags: ["ism"] },
      { text: "De cloudmigratie van een heel bedrijf uitvoeren",      tags: ["nse"] }
    ]
  },
  { text: "Wat is je houding tegenover wiskunde en logica?",
    options: [
      { text: "Ik hou van abstracte patronen en algoritmen",          tags: ["se","nse"] },
      { text: "Ik gebruik het liefst statistiek en data-analyse",     tags: ["bdm","ism"] },
      { text: "Ik denk meer visueel en creatief dan wiskundig",       tags: ["id"] },
      { text: "Ik werk liever met processen dan berekeningen",        tags: ["bdm"] }
    ]
  },
  { text: "Welke film of serie zou je het liefst kijken?",
    options: [
      { text: "Silicon Valley (apps bouwen, start-ups)",              tags: ["se","id"] },
      { text: "Mr. Robot (hackers, beveiliging)",                     tags: ["ism"] },
      { text: "Moneyball (data en slimme beslissingen)",              tags: ["bdm"] },
      { text: "The IT Crowd (systeembeheer, netwerken)",              tags: ["nse"] }
    ]
  },
  { text: "Wat motiveert jou het meest?",
    options: [
      { text: "Iets bouwen dat mensen echt helpt of verrast",         tags: ["se","id"] },
      { text: "Organisaties slimmer en efficienter maken",            tags: ["bdm"] },
      { text: "Mensen en systemen beschermen tegen gevaar",           tags: ["ism"] },
      { text: "Technische infrastructuur stabiel en snel houden",     tags: ["nse"] }
    ]
  },
  { text: "Hoe ga je om met een complex technisch probleem?",
    options: [
      { text: "Debuggen totdat ik de oorzaak vind in de code",        tags: ["se"] },
      { text: "Een creatieve oplossing schetsen en snel testen",      tags: ["id"] },
      { text: "De data en processen eromheen analyseren",             tags: ["bdm"] },
      { text: "Een grondige security-analyse van het systeem doen",   tags: ["ism"] },
      { text: "De netwerklogs en systeemconfiguratie checken",        tags: ["nse"] }
    ]
  },
  { text: "Wat vind je van samenwerken met bedrijven aan cases?",
    options: [
      { text: "Top - software bouwen voor echte klanten",             tags: ["se"] },
      { text: "Ja, zeker als ik mijn eigen ideeen kan inbrengen",     tags: ["id"] },
      { text: "Graag, bij strategische of data-vraagstukken",         tags: ["bdm"] },
      { text: "Absoluut - beveiligingsprojecten klinken geweldig",    tags: ["ism"] },
      { text: "Zeker, netwerk- en systeemprojecten in de praktijk",   tags: ["nse"] }
    ]
  },
  { text: "Wat wil je over 5 jaar gezegd kunnen hebben?",
    options: [
      { text: "Ik heb software gebouwd die echt gebruikt wordt",      tags: ["se"] },
      { text: "Ik heb een eigen product of startup gelanceerd",       tags: ["id"] },
      { text: "Ik help bedrijven groeien met data en digitale strategie", tags: ["bdm"] },
      { text: "Ik bescherm kritieke systemen tegen cyberdreigingen",  tags: ["ism"] },
      { text: "Ik beheer de IT-infrastructuur van een grote organisatie", tags: ["nse"] }
    ]
  }
];

var studyTracks = {
  se:  { code:"SE",  label:"Software Engineering",            location:"Den Haag",    color:"#1a6dc5",
         desc:"Je bouwt van A tot Z softwareapplicaties - van mobiele apps tot webplatformen. Programmeren, software-architectuur en agile werken staan centraal." },
  id:  { code:"ID",  label:"Innovative Development",          location:"Zoetermeer", color:"#c17d10",
         desc:"Je combineert techniek met creativiteit en ondernemerschap. Je bedenkt en bouwt innovatieve digitale producten, van idee tot prototype." },
  bdm: { code:"BDM", label:"Business & Data Management",      location:"Den Haag",    color:"#217a3c",
         desc:"Je verbindt ICT met bedrijfskunde. Je analyseert data, optimaliseert processen en helpt organisaties slimmer werken met digitale technologie." },
  ism: { code:"ISM", label:"Information Security Management", location:"Zoetermeer", color:"#c0392b",
         desc:"Je bent de digitale bewaker. Je leert systemen ethisch te hacken, kwetsbaarheden op te sporen en beveiligingsbeleid te ontwerpen." },
  nse: { code:"NSE", label:"Network & Systems Engineering",   location:"Delft",       color:"#6b3fcb",
         desc:"Je bouwt en beheert de technische ruggengraat van organisaties - netwerken, servers, cloudplatformen en embedded systemen." }
};

var bgColors = [
    'rgb(67, 34, 56)',
    'rgb(10, 61, 107)',
    'rgb(58, 26, 0)',
    'rgb(26, 58, 26)',
    'rgb(26, 26, 58)'
];

// ── Quiz state ────────────────────────────────────────────────────────────────

var sceneDelay  = 870;
var progress    = 0;
var scores      = { se:0, id:0, bdm:0, ism:0, nse:0 };
var transitioning = false;
var circleScale = 10;

var answersEl;
var circle;

// ── Start ─────────────────────────────────────────────────────────────────────

function startQuiz() {
    answersEl = $('.main_inner__answers');
    circle    = $('.main_inner__circle');

    // Reset state (supports replay)
    progress      = 0;
    scores        = { se:0, id:0, bdm:0, ism:0, nse:0 };
    transitioning = false;

    // Background and circle color
    $('body').css('background', bgColors[0]);
    circle.css('background', bgColors[1 % bgColors.length]);

    // Breadcrumbs
    var bc = $('.main_inner__breadcrumbs');
    bc.empty();
    for (var i = 0; i < quizQuestions.length; i++) {
        bc.append('<div class="breadcrumb"></div>');
    }
    bc.find('.breadcrumb:first').addClass('active');
    bc.css('width', (quizQuestions.length - 1) * 34);

    // Show first question
    initQuestion(0);

    // Bind answer events (use event delegation on container)
    answersEl.off('mouseenter click').on('mouseenter', '.answer', function() {
        playSound(buttonClick);
    }).on('click', '.answer', function() {
        handleAnswer($(this));
    });

    // Key shortcuts 1-5
    $(document).off('keypress.quiz').on('keypress.quiz', function(e) {
        var num = e.which - 48;
        if (num >= 1 && num <= 5) {
            var ans = answersEl.find('.answer');
            if (ans.length >= num) ans.eq(num - 1).trigger('click');
        }
    });
}

// ── Render a question ─────────────────────────────────────────────────────────

function initQuestion(qi) {
    var q = quizQuestions[qi];

    if (!q || !Array.isArray(q.options) || q.options.length === 0) {
        $('.main_inner__title h1').text('Er ging iets mis bij het laden van de vraag.');
        $('.main_inner__feedback').removeClass('correct wrong').text('');
        answersEl.empty().append(
            '<div class="answer answer--disabled">Herlaad de pagina en probeer opnieuw.</div>'
        );
        transitioning = false;
        return;
    }

    // Question text
    $('.main_inner__title h1').text(q.text);
    $('.main_inner__feedback').removeClass('correct wrong').text('');

    // Answer buttons
    answersEl.empty();
    for (var i = 0; i < q.options.length; i++) {
        answersEl.append('<div class="answer">' + q.options[i].text + '</div>');
    }
}

// ── Answer click ──────────────────────────────────────────────────────────────

function handleAnswer(el) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');

    if (transitioning) return;
    transitioning = true;

    var optionIndex  = answersEl.find('.answer').index(el);
    var currentQuestion = quizQuestions[progress];
    if (!currentQuestion || !currentQuestion.options[optionIndex]) {
        transitioning = false;
        return;
    }

    var selectedTags = currentQuestion.options[optionIndex].tags;

    for (var i = 0; i < selectedTags.length; i++) {
        scores[selectedTags[i]] += 1;
    }

    // Feedback
    playSound(featured);
    el.addClass('correct');
    $('.main_inner__feedback')
        .removeClass('wrong')
        .text('Gekozen!')
        .addClass('correct')
        .css('transform', 'translateY(-50%) scale(1) rotate(0deg)');

    // Breadcrumb
    var active = $('.main_inner__breadcrumbs .breadcrumb.active');
    active.addClass('correct').removeClass('active').next().addClass('active');

    progress++;

    var isLast = (progress === quizQuestions.length);

    if (isLast) {
        setTimeout(function() {
            showResults();
            $('.main_inner__modalOverlay, .main_inner__modal, .main_inner__modalContent').show();
        }, sceneDelay + 200);
    }

    // Transition out
    setTimeout(function() {
        circle.css('transform', 'translateY(-50%) scale(' + circleScale + ')');
        answersEl.find('.answer').css({ left: '100px', opacity: '0' });
    }, 230);

    setTimeout(function() {
        if (!isLast) {
            $('body').css('background', bgColors[progress % bgColors.length]);
        }
        circle.css({ transform: 'translateY(-50%) scale(0)', 'transition-duration': '0ms' });
        $('.main_inner__feedback').css('transform', 'translateY(-50%) scale(0) rotate(20deg)');
    }, sceneDelay);

    // Transition in
    setTimeout(function() {
        if (!isLast) {
            if (window.innerWidth > 1000) {
                circle.css('transform', 'translateY(-50%) scale(1)');
            } else {
                circle.css('transform', 'translateY(calc(-50% - 110px)) scale(0.6)');
            }
            circle.css('transition-duration', '500ms');
            if (progress < quizQuestions.length - 1) {
                circle.css('background', bgColors[(progress + 1) % bgColors.length]);
            }
            playSound(slideSlow);
            initQuestion(progress);
        }
        transitioning = false;
    }, sceneDelay + 100);
}

// ── Results ───────────────────────────────────────────────────────────────────

function showResults() {
    var total  = 0;
    var key;
    for (key in scores) { total += scores[key]; }
    if (total === 0) total = 1;

    var sorted = [];
    for (key in scores) { sorted.push([key, scores[key]]); }
    sorted.sort(function(a, b) { return b[1] - a[1]; });

    var topKey = sorted[0][0];
    var top    = studyTracks[topKey];

    $('.main_inner__title h1').text('Jouw beste richting match');
    $('.main_inner__title p').text('Gebaseerd op jouw antwoorden in de quiz.');

    var barsHTML = '';
    for (var i = 0; i < sorted.length; i++) {
        var k   = sorted[i][0];
        var sc  = sorted[i][1];
        var tr  = studyTracks[k];
        var pct = Math.round((sc / total) * 100);
        var isTop = (i === 0);
        barsHTML +=
            '<div style="margin-bottom:8px;padding:10px 14px;border-radius:8px;' +
              'border:1.5px solid ' + (isTop ? tr.color : '#dce4f0') + ';' +
              'background:' + (isTop ? '#f0f4ff' : '#fff') + '">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">' +
                '<span style="font-size:13px;font-weight:600;color:#1a1a2e">' + tr.label + '</span>' +
                '<span style="font-size:12px;font-weight:700;color:' + tr.color + '">' + pct + '%</span>' +
              '</div>' +
              '<div style="height:4px;background:#e8ecf4;border-radius:2px;">' +
                '<div id="res-bar-' + k + '" style="height:4px;background:' + tr.color + ';border-radius:2px;width:0;transition:width 0.9s ease;"></div>' +
              '</div>' +
            '</div>';
    }

    // Resize modal for content
    $('.main_inner__modal, .main_inner__modalContent').css({
        'height': 'auto',
        'max-height': '80vh',
        'overflow-y': 'auto'
    });

    $('.main_inner__modalContent').html(
        '<h1>Jouw richting</h1>' +
        '<p class="score">' + top.label + ' (' + top.code + ')</p>' +
        '<p style="font-size:13px;color:#555;margin-bottom:16px;line-height:1.5;">' + top.desc + '</p>' +
        barsHTML +
        '<p style="font-size:11px;color:#999;margin-top:14px;">' + top.location + ' &bull; De Haagse Hogeschool HBO-ICT</p>' +
        '<a href="https://www.dehaagsehogeschool.nl/opleidingen/hbo-bachelor/hbo-ict" ' +
           'target="_blank" rel="noopener" style="color:#1a6dc5;">Meer info over HBO-ICT &#8594;</a>'
    );

    setTimeout(function() {
        for (var j = 0; j < sorted.length; j++) {
            var k2  = sorted[j][0];
            var sc2 = sorted[j][1];
            var p2  = Math.round((sc2 / total) * 100);
            var bar = document.getElementById('res-bar-' + k2);
            if (bar) bar.style.width = p2 + '%';
        }
    }, 300);
}

// ── Utility ───────────────────────────────────────────────────────────────────

function LightenDarkenColor(col, amt) {
    var rgbMatch = col.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
        var r = Math.min(255, Math.max(0, parseInt(rgbMatch[1]) + amt));
        var g = Math.min(255, Math.max(0, parseInt(rgbMatch[2]) + amt));
        var b = Math.min(255, Math.max(0, parseInt(rgbMatch[3]) + amt));
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    var usePound = col[0] === '#';
    if (usePound) col = col.slice(1);
    var num = parseInt(col, 16);
    var r2 = Math.min(255, Math.max(0, (num >> 16) + amt));
    var b2 = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
    var g2 = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return (usePound ? '#' : '') + (g2 | (b2 << 8) | (r2 << 16)).toString(16);
}

// ── Grain effect ──────────────────────────────────────────────────────────────

class Grain {
    constructor(el) {
        this.patternSize            = 150;
        this.patternScaleX          = 1;
        this.patternScaleY          = 1;
        this.patternRefreshInterval = 3;
        this.patternAlpha           = 12;

        this.canvas     = el;
        this.ctx        = this.canvas.getContext('2d');
        this.ctx.scale(this.patternScaleX, this.patternScaleY);

        this.patternCanvas           = document.createElement('canvas');
        this.patternCanvas.width     = this.patternSize;
        this.patternCanvas.height    = this.patternSize;
        this.patternCtx              = this.patternCanvas.getContext('2d');
        this.patternData             = this.patternCtx.createImageData(this.patternSize, this.patternSize);
        this.patternPixelDataLength  = this.patternSize * this.patternSize * 4;

        this.resize = this.resize.bind(this);
        this.loop   = this.loop.bind(this);
        this.frame  = 0;

        window.addEventListener('resize', this.resize);
        this.resize();
        window.requestAnimationFrame(this.loop);
    }

    resize() {
        this.canvas.width  = window.innerWidth  * devicePixelRatio;
        this.canvas.height = window.innerHeight * devicePixelRatio;
    }

    update() {
        var d = this.patternData.data;
        for (var i = 0; i < this.patternPixelDataLength; i += 4) {
            var v    = Math.random() * 255;
            d[i]     = v;
            d[i + 1] = v;
            d[i + 2] = v;
            d[i + 3] = this.patternAlpha;
        }
        this.patternCtx.putImageData(this.patternData, 0, 0);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.ctx.createPattern(this.patternCanvas, 'repeat');
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    loop() {
        if (++this.frame % this.patternRefreshInterval === 0) {
            this.update();
            this.draw();
        }
        window.requestAnimationFrame(this.loop);
    }
}

var grain = new Grain(document.querySelector('.grain'));
