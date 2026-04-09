
const globals = {
    audio: true
}

function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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
        showNameModal();
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
  { text: "Wat zou jij als eerste aanpakken bij een nieuw ICT-project?",
    options: [
      { text: "De technische architectuur uitstippelen en beginnen met coderen", tags: ["se"] },
      { text: "Brainstormen over het concept en de gebruikersbeleving",          tags: ["id"] },
      { text: "De bedrijfsdoelen en databehoefte in kaart brengen",              tags: ["bdm"] },
      { text: "De beveiligingseisen en risico's doorlichten",                    tags: ["ism"] },
      { text: "De serveromgeving en netwerkvereisten bepalen",                   tags: ["nse"] }
    ]
  },
  { text: "Welke workshop zou jij het liefst bijwonen?",
    options: [
      { text: "Full-stack webontwikkeling met React en Node.js",                 tags: ["se"] },
      { text: "Design thinking: van idee naar klikbaar prototype",               tags: ["id"] },
      { text: "Data-analyse en visualisatie met Power BI en Python",             tags: ["bdm"] },
      { text: "Ethical hacking: je eerste penetratietest uitvoeren",             tags: ["ism"] },
      { text: "Netwerken met Cisco: routing en switching in de praktijk",        tags: ["nse"] }
    ]
  },
  { text: "Stel: je werkt bij een bedrijf. Wat doe jij het liefst?",
    options: [
      { text: "Een nieuwe app of website van begin tot eind bouwen",             tags: ["se"] },
      { text: "Creatieve digitale oplossingen bedenken en prototypen",           tags: ["id"] },
      { text: "Dashboards en data-analyses maken voor management",               tags: ["bdm"] },
      { text: "De IT-beveiliging controleren en verbeteren",                     tags: ["ism"] },
      { text: "De server- en netwerkinfrastructuur opzetten",                    tags: ["nse"] }
    ]
  },
  { text: "Hoe werk je het liefst?",
    options: [
      { text: "Gestructureerd code schrijven en stap voor stap problemen oplossen", tags: ["se"] },
      { text: "Creatief brainstormen en snel prototypes uitwerken",              tags: ["id"] },
      { text: "Analytisch en methodisch, met oog voor processen en data",        tags: ["bdm"] },
      { text: "Systematisch risico's en kwetsbaarheden in kaart brengen",        tags: ["ism"] },
      { text: "Hands-on aan servers, netwerken en infrastructuur sleutelen",     tags: ["nse"] }
    ]
  },
  { text: "Welke technische uitdaging prikkelt jou het meest?",
    options: [
      { text: "Een complexe bug oplossen in een groot softwaresysteem",          tags: ["se"] },
      { text: "Een product bedenken dat de markt nog niet kent",                 tags: ["id"] },
      { text: "Verborgen patronen ontdekken in een enorme dataset",              tags: ["bdm"] },
      { text: "De zwakste schakel vinden in een beveiligd netwerk",              tags: ["ism"] },
      { text: "Een schaalbare cloud-infrastructuur opzetten voor duizenden gebruikers", tags: ["nse"] }
    ]
  },
  { text: "Welke term spreekt jou het meest aan?",
    options: [
      { text: "Full-stack developer",                                            tags: ["se"] },
      { text: "UX designer / innovation engineer",                               tags: ["id"] },
      { text: "Business analist / data consultant",                              tags: ["bdm"] },
      { text: "Ethical hacker / security officer",                               tags: ["ism"] },
      { text: "Cloud / netwerk engineer",                                        tags: ["nse"] }
    ]
  },
  { text: "Wat voor stage zou jij het liefst lopen?",
    options: [
      { text: "Bij een softwarebedrijf als junior developer",                    tags: ["se"] },
      { text: "Bij een tech-startup als innovatie- of productmedewerker",        tags: ["id"] },
      { text: "Bij een groot bedrijf in de IT-afdeling of data-team",            tags: ["bdm"] },
      { text: "Bij een cybersecuritybedrijf of de overheid",                     tags: ["ism"] },
      { text: "Bij een telecomprovider of cloudprovider",                        tags: ["nse"] }
    ]
  },
  { text: "Hoe kijk je aan tegen programmeren?",
    options: [
      { text: "Super leuk — softwareontwikkeling is precies wat ik wil doen",    tags: ["se"] },
      { text: "Leuk hulpmiddel, maar ik combineer het liever met design",        tags: ["id"] },
      { text: "Nuttig voor data-analyse, maar strategie en processen zijn mijn focus", tags: ["bdm"] },
      { text: "Essentieel om aanvallen en kwetsbaarheden te begrijpen",          tags: ["ism"] },
      { text: "Handig voor automatisering, maar infrastructuur is mijn focus",   tags: ["nse"] }
    ]
  },
  { text: "Welk scenario klinkt het spannendst voor jou?",
    options: [
      { text: "Een app lanceren die duizenden mensen dagelijks gebruiken",       tags: ["se"] },
      { text: "Een innovatief product pitchen voor investeerders",               tags: ["id"] },
      { text: "Een bedrijf helpen 30% efficiënter werken via data",              tags: ["bdm"] },
      { text: "Een cyberaanval in realtime detecteren en stoppen",               tags: ["ism"] },
      { text: "De cloudmigratie van een heel bedrijf uitvoeren",                 tags: ["nse"] }
    ]
  },
  { text: "Wat is je houding tegenover wiskunde en logica?",
    options: [
      { text: "Ik hou van algoritmen en logisch redeneren — de basis van goede code", tags: ["se"] },
      { text: "Ik denk meer visueel en creatief; wiskunde is niet mijn sterkste kant", tags: ["id"] },
      { text: "Statistiek en data-analyse liggen me goed",                       tags: ["bdm"] },
      { text: "Ik gebruik logica om beveiligingsproblemen systematisch aan te pakken", tags: ["ism"] },
      { text: "Ik hou van netwerkcalculaties en binaire logica voor infrastructuur", tags: ["nse"] }
    ]
  },
  { text: "Je hebt een vrije studiemiddag. Wat doe je het liefst?",
    options: [
      { text: "Een eigen app of tool bouwen als hobbyproject",                   tags: ["se"] },
      { text: "Een creatief concept uitwerken en prototypen",                    tags: ["id"] },
      { text: "Een dataset analyseren en visualiseren in een dashboard",         tags: ["bdm"] },
      { text: "Een CTF-challenge (capture the flag) oplossen",                   tags: ["ism"] },
      { text: "Thuis een eigen server of thuisnetwerk opzetten",                 tags: ["nse"] }
    ]
  },
  { text: "Wat motiveert jou het meest?",
    options: [
      { text: "Werkende software bouwen die mensen dagelijks gebruiken",         tags: ["se"] },
      { text: "Innovatieve producten bedenken die iets écht veranderen",         tags: ["id"] },
      { text: "Organisaties slimmer en efficiënter maken met data en strategie", tags: ["bdm"] },
      { text: "Mensen en systemen beschermen tegen digitale dreigingen",         tags: ["ism"] },
      { text: "Een stabiele, snelle en betrouwbare IT-infrastructuur neerzetten", tags: ["nse"] }
    ]
  },
  { text: "Hoe ga je om met een complex technisch probleem?",
    options: [
      { text: "Debuggen totdat ik de oorzaak vind in de code",                   tags: ["se"] },
      { text: "Een creatieve oplossing schetsen en snel testen",                 tags: ["id"] },
      { text: "De data en processen eromheen analyseren",                        tags: ["bdm"] },
      { text: "Een grondige security-analyse van het systeem doen",              tags: ["ism"] },
      { text: "De netwerklogs en systeemconfiguratie checken",                   tags: ["nse"] }
    ]
  },
  { text: "Wat vind je van samenwerken met echte bedrijven aan cases?",
    options: [
      { text: "Top — software bouwen voor echte klanten",                        tags: ["se"] },
      { text: "Ja, zeker als ik mijn eigen ideeën kan inbrengen",                tags: ["id"] },
      { text: "Graag, bij strategische of data-vraagstukken",                    tags: ["bdm"] },
      { text: "Absoluut — beveiligingsprojecten klinken geweldig",               tags: ["ism"] },
      { text: "Zeker, netwerk- en systeemprojecten in de praktijk",              tags: ["nse"] }
    ]
  },
  { text: "Wat wil je over 5 jaar gezegd kunnen hebben?",
    options: [
      { text: "Ik heb software gebouwd die echt door mensen gebruikt wordt",     tags: ["se"] },
      { text: "Ik heb een eigen product of startup gelanceerd",                  tags: ["id"] },
      { text: "Ik help bedrijven groeien met data en digitale strategie",        tags: ["bdm"] },
      { text: "Ik bescherm kritieke systemen tegen cyberdreigingen",             tags: ["ism"] },
      { text: "Ik beheer de IT-infrastructuur van een grote organisatie",        tags: ["nse"] }
    ]
  }
];

var studyTracks = {
  se:  { code:"SE",  label:"Software Engineering",            location:"Den Haag",    color:"#1a6dc5",
         bg:"#deeaf9", textColor:"#0a3d6b", barColor:"#1a6dc5",
         skills:["Java / Python", "Web development", "Agile/Scrum", "Software-architectuur"],
         desc:"Je bouwt van A tot Z softwareapplicaties - van mobiele apps tot webplatformen. Programmeren, software-architectuur en agile werken staan centraal." },
  id:  { code:"ID",  label:"Innovative Development",          location:"Zoetermeer", color:"#c17d10",
         bg:"#fef0d6", textColor:"#7a4200", barColor:"#c17d10",
         skills:["Design thinking", "Prototyping", "Ondernemerschap", "UX & innovatie"],
         desc:"Je combineert techniek met creativiteit en ondernemerschap. Je bedenkt en bouwt innovatieve digitale producten, van idee tot prototype." },
  bdm: { code:"BDM", label:"Business & Data Management",      location:"Den Haag",    color:"#217a3c",
         bg:"#e2f4e8", textColor:"#145226", barColor:"#217a3c",
         skills:["Data-analyse", "SQL / Power BI", "Business processen", "IT-management"],
         desc:"Je verbindt ICT met bedrijfskunde. Je analyseert data, optimaliseert processen en helpt organisaties slimmer werken met digitale technologie." },
  ism: { code:"ISM", label:"Information Security Management", location:"Zoetermeer", color:"#c0392b",
         bg:"#fde8e6", textColor:"#7b1f1a", barColor:"#c0392b",
         skills:["Ethical hacking", "Risicoanalyse", "Netwerkbeveiliging", "Forensics"],
         desc:"Je bent de digitale bewaker. Je leert systemen ethisch te hacken, kwetsbaarheden op te sporen en beveiligingsbeleid te ontwerpen." },
  nse: { code:"NSE", label:"Network & Systems Engineering",   location:"Delft",       color:"#6b3fcb",
         bg:"#ece5fb", textColor:"#3d2080", barColor:"#6b3fcb",
         skills:["Networking (Cisco)", "Linux / Windows Server", "Cloud (AWS/Azure)", "Systeembeheer"],
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

var sceneDelay    = 870;
var progress      = 0;
var scores        = { se:0, id:0, bdm:0, ism:0, nse:0 };
var answers       = []; // chosen option index per question
var transitioning = false;
var circleScale   = 10;

var studentFirstName = '';
var studentLastName  = '';

var answersEl;
var circle;

// ── Name collection ───────────────────────────────────────────────────────────

function showNameModal() {
    $('.main_inner__modal, .main_inner__modalContent').css({
        height: 'auto',
        'max-height': '85vh',
        'overflow-y': 'auto'
    });
    $('.main_inner__modalContent').html(
        '<div class="name-modal-wrap">' +
          '<h2>Welkom bij de HBO-ICT Studiekeuze Quiz</h2>' +
          '<p>Vul je naam in. Deze wordt gebruikt op jouw persoonlijk rapport dat je na afloop kunt downloaden.</p>' +
          '<div class="name-modal-row">' +
            '<div class="name-modal-field">' +
              '<label for="nm-first">Voornaam</label>' +
              '<input type="text" id="nm-first" placeholder="bijv. Emma" autocomplete="given-name" />' +
              '<span class="name-modal-error" id="nm-first-err"></span>' +
            '</div>' +
            '<div class="name-modal-field">' +
              '<label for="nm-last">Achternaam</label>' +
              '<input type="text" id="nm-last" placeholder="bijv. de Vries" autocomplete="family-name" />' +
              '<span class="name-modal-error" id="nm-last-err"></span>' +
            '</div>' +
          '</div>' +
          '<button class="name-modal-submit" onclick="submitNameModal()">Start quiz &#8594;</button>' +
          '<a href="over-ons.html" class="name-modal-over-ons">Over ons</a>' +
        '</div>'
    );
    $('.main_inner__modalOverlay, .main_inner__modal, .main_inner__modalContent').show();
    document.getElementById('nm-first').focus();
    document.getElementById('nm-first').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') document.getElementById('nm-last').focus();
    });
    document.getElementById('nm-last').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') submitNameModal();
    });
}

function submitNameModal() {
    var first = document.getElementById('nm-first').value.trim();
    var last  = document.getElementById('nm-last').value.trim();
    var valid = true;

    document.getElementById('nm-first-err').textContent = '';
    document.getElementById('nm-last-err').textContent  = '';
    document.getElementById('nm-first').classList.remove('input-error');
    document.getElementById('nm-last').classList.remove('input-error');

    if (!first) {
        document.getElementById('nm-first-err').textContent = 'Vul je voornaam in.';
        document.getElementById('nm-first').classList.add('input-error');
        valid = false;
    }
    if (!last) {
        document.getElementById('nm-last-err').textContent = 'Vul je achternaam in.';
        document.getElementById('nm-last').classList.add('input-error');
        valid = false;
    }
    if (!valid) return;

    studentFirstName = first;
    studentLastName  = last;
    $('.main_inner__modalOverlay, .main_inner__modal, .main_inner__modalContent').hide();
    startQuiz();
}

// ── Start ─────────────────────────────────────────────────────────────────────

function startQuiz() {
    answersEl = $('.main_inner__answers');
    circle    = $('.main_inner__circle');

    // Reset state (supports replay)
    progress      = 0;
    scores        = { se:0, id:0, bdm:0, ism:0, nse:0 };
    answers       = new Array(quizQuestions.length).fill(null);
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

    answers[progress] = optionIndex;

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

var trackGradients = {
    se:  '#4299e1',
    id:  '#f6ad55',
    bdm: '#48bb78',
    ism: '#fc8181',
    nse: '#9f7aea'
};

function showResults() {
    var total = 0;
    var key;
    for (key in scores) { total += scores[key]; }
    if (total === 0) total = 1;

    var sorted = [];
    for (key in scores) { sorted.push([key, scores[key]]); }
    sorted.sort(function(a, b) { return b[1] - a[1]; });

    var topKey = sorted[0][0];
    var top    = studyTracks[topKey];
    var g2top  = trackGradients[topKey] || top.color;

    $('.main_inner__title h1').text('Jouw beste richting match');
    $('.main_inner__title p').text('Gebaseerd op jouw antwoorden in de quiz.');

    var barsHTML = '';
    for (var i = 0; i < sorted.length; i++) {
        var k   = sorted[i][0];
        var sc  = sorted[i][1];
        var tr  = studyTracks[k];
        var pct = Math.round((sc / total) * 100);
        var g2  = trackGradients[k] || tr.color;
        var isTop = (i === 0);
        barsHTML +=
            '<div class="res-item' + (isTop ? ' res-item--top' : '') + '">' +
              '<div class="res-item-meta">' +
                '<div class="res-item-left">' +
                  '<span class="res-item-code" style="background:' + tr.color + '">' + tr.code + '</span>' +
                  '<span class="res-item-label">' + tr.label + '</span>' +
                '</div>' +
                '<span class="res-item-pct" style="color:' + tr.color + '">' + pct + '%</span>' +
              '</div>' +
              '<div class="res-bar-bg">' +
                '<div id="res-bar-' + k + '" class="res-bar" style="background:linear-gradient(90deg,' + tr.color + ',' + g2 + ')"></div>' +
              '</div>' +
            '</div>';
    }

    $('.main_inner__modal, .main_inner__modalContent').css({
        height: 'auto',
        'max-height': '85vh',
        'overflow-y': 'auto'
    });

    $('.main_inner__modalContent').html(
        '<div class="res-hero" style="background:linear-gradient(135deg,' + top.color + ' 0%,' + g2top + ' 100%)">' +
          '<div class="res-hero-top">' +
            '<span class="res-hero-eyebrow">&#10024; Beste Match</span>' +
            '<span class="res-hero-code">' + top.code + '</span>' +
          '</div>' +
          '<h2 class="res-hero-title">' + top.label + '</h2>' +
          '<p class="res-hero-desc">' + top.desc + '</p>' +
          '<div class="res-hero-location">&#128205; ' + top.location + ' &bull; De Haagse Hogeschool HBO-ICT</div>' +
        '</div>' +
        '<div class="res-profile">' +
          '<div class="res-profile-heading">Jouw profiel</div>' +
          barsHTML +
        '</div>' +
        '<div class="res-actions">' +
          '<button class="res-download" onclick="downloadRapport()">&#8659; Download jouw rapport (PDF)</button>' +
          '<a href="over-ons.html" class="res-cta">Over ons &#8594;</a>' +
          '<button class="res-restart" onclick="restartQuiz()">&#8635; Opnieuw beginnen</button>' +
        '</div>'
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

function downloadRapport() {
    var total = 0;
    var key;
    for (key in scores) { total += scores[key]; }
    if (total === 0) total = 1;

    var sorted = [];
    for (key in scores) { sorted.push([key, scores[key]]); }
    sorted.sort(function(a, b) { return b[1] - a[1]; });

    var topKey = sorted[0][0];
    var top    = studyTracks[topKey];

    var now     = new Date();
    var dateStr = now.toLocaleDateString('nl-NL', { day: '2-digit', month: 'long', year: 'numeric' });

    var scoresRowsHTML = '';
    for (var i = 0; i < sorted.length; i++) {
        var k   = sorted[i][0];
        var sc  = sorted[i][1];
        var tr  = studyTracks[k];
        var pct = Math.round((sc / total) * 100);
        var isTop = (i === 0);
        scoresRowsHTML +=
            '<tr' + (isTop ? ' style="font-weight:600;"' : '') + '>' +
              '<td><span class="rp-code-badge" style="background:' + tr.bg + ';color:' + tr.textColor + '">' + tr.code + '</span>' +
              tr.label + (isTop ? ' &#9733;' : '') + '</td>' +
              '<td style="color:' + tr.barColor + ';font-weight:600;">' + pct + '%</td>' +
              '<td><div class="rp-bar-bg"><div class="rp-bar-fill" style="width:' + pct + '%;background:' + tr.barColor + '"></div></div></td>' +
              '<td style="font-size:11px;color:#6b7a99;">' + tr.location + '</td>' +
            '</tr>';
    }

    var answersRowsHTML = '';
    for (var qi = 0; qi < quizQuestions.length; qi++) {
        var q   = quizQuestions[qi];
        var ai  = answers[qi];
        var chosenText = (ai !== null && ai !== undefined) ? q.options[ai].text : '—';
        var tag = (ai !== null && ai !== undefined) ? q.options[ai].tags[0] : '';
        var atr = tag ? studyTracks[tag] : null;
        answersRowsHTML +=
            '<tr>' +
              '<td style="color:#6b7a99;width:32px;">' + (qi + 1) + '</td>' +
              '<td>' + escHtml(q.text) + '</td>' +
              '<td>' + escHtml(chosenText) + '</td>' +
              '<td style="width:50px;">' +
                (atr ? '<span class="rp-code-badge" style="background:' + atr.bg + ';color:' + atr.textColor + '">' + atr.code + '</span>' : '') +
              '</td>' +
            '</tr>';
    }

    var skillsBadges = (top.skills || []).map(function(s) {
        return '<span class="rp-skill-badge">' + escHtml(s) + '</span>';
    }).join('');

    document.getElementById('rapport-page').innerHTML =
        '<div class="rp-header">' +
          '<div class="rp-header-left">' +
            '<h1>HBO-ICT Studiekeuze Rapport</h1>' +
            '<p>De Haagse Hogeschool &bull; HBO-ICT</p>' +
          '</div>' +
          '<div class="rp-header-right">' +
            'ali@rashidi.nl' +
          '</div>' +
        '</div>' +
        '<div class="rp-student-box">' +
          '<div class="rp-field"><label>Naam</label><span>' + escHtml(studentFirstName) + ' ' + escHtml(studentLastName) + '</span></div>' +
          '<div class="rp-field"><label>Datum</label><span>' + dateStr + '</span></div>' +
          '<div class="rp-field"><label>Beste match</label><span style="color:' + top.color + '">' + top.code + ' &mdash; ' + top.label + '</span></div>' +
        '</div>' +
        '<div class="rp-section-title">Beste match</div>' +
        '<div class="rp-best-box" style="background:' + top.color + '">' +
          '<div class="rp-best-eyebrow">&#10024; Beste Match &bull; ' + top.code + '</div>' +
          '<div class="rp-best-title">' + top.label + '</div>' +
          '<div class="rp-best-desc">' + top.desc + '</div>' +
          '<div class="rp-best-meta">&#128205; ' + top.location + ' &bull; De Haagse Hogeschool HBO-ICT</div>' +
          '<div class="rp-skills-row">' + skillsBadges + '</div>' +
        '</div>' +
        '<div class="rp-section-title">Jouw profiel &mdash; alle richtingen</div>' +
        '<table class="rp-scores-table"><thead><tr><th>Richting</th><th>Score</th><th>Balk</th><th>Locatie</th></tr></thead><tbody>' + scoresRowsHTML + '</tbody></table>' +
        '<div class="rp-answers-section">' +
          '<div class="rp-section-title">Overzicht antwoorden</div>' +
          '<table class="rp-answers-table"><thead><tr><th>#</th><th>Vraag</th><th>Jouw antwoord</th><th>Richting</th></tr></thead><tbody>' + answersRowsHTML + '</tbody></table>' +
        '</div>' +
        '<div class="rp-footer">' +
          '<span>HBO-ICT Studiekeuze Quiz &bull; De Haagse Hogeschool</span>' +
          '<span>' + escHtml(studentFirstName) + ' ' + escHtml(studentLastName) + ' &bull; ' + dateStr + '</span>' +
        '</div>';

    window.print();
}

function restartQuiz() {
    $('.main_inner__modalOverlay, .main_inner__modal, .main_inner__modalContent').hide();
    scores           = { se:0, id:0, bdm:0, ism:0, nse:0 };
    answers          = new Array(quizQuestions.length).fill(null);
    progress         = 0;
    studentFirstName = '';
    studentLastName  = '';
    showNameModal();
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
