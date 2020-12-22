const heroes = {
    supernew : {
        name: 'Суперновичок',
        price: '250',
        income: '1',
        background: 'linear-gradient(90deg, rgba(255,140,139,1) 0%, rgba(255,185,184,1) 100%)',
        cells: 50,
        img: 'hero1.png',
        prev: null,
        next: 'gunsmith'
    },
    gunsmith : {
        name: 'Оружейник',
        price: '1000',
        income: '1,05',
        background: 'linear-gradient(90deg, rgba(255,180,104,1) 0%, rgba(255,223,191,1) 100%)',
        cells: 25,
        img: 'hero2.png',
        prev: 'supernew',
        next: 'comandor'
    },
    comandor : {
        name: 'Командор',
        price: '5000',
        income: '1,1',
        background: 'linear-gradient(90deg, rgba(223,132,132,1) 0%, rgba(255,181,181,1) 100%)',
        cells: 12,
        img: 'hero3.png',
        prev: 'gunsmith',
        next: 'paladin'
    },
    paladin : {
        name: 'Паладин',
        price: '20000',
        income: '1,15',
        background: 'linear-gradient(90deg, rgba(104,119,194,1) 0%, rgba(191,202,255,1) 100%)',
        cells: 6,
        img: 'hero4.png',
        prev: 'comandor',
        next: 'archimag'
    },
    archimag : {
        name: 'Архимаг',
        price: '50000',
        income: '1,2',
        background: 'linear-gradient(90deg, rgba(245,183,111,1) 0%, rgba(255,225,190,1) 100%)',
        cells: 5,
        img: 'hero5.png',
        prev: 'paladin',
        next: 'professor'
    },
    professor : {
        name: 'Профессор',
        price: '75000',
        income: '1,25',
        background: 'linear-gradient(90deg, rgba(255,180,104,1) 0%, rgba(255,223,191,1) 100%)',
        cells: 5,
        img: 'hero6.png',
        prev: 'archimag',
        next: 'mistic'
    },
    mistic : {
        name: 'Мистик',
        price: '1000000',
        income: '1,3',
        background: 'linear-gradient(90deg, rgba(221,118,82,1) 0%, rgba(255,197,177,1) 100%)',
        cells: 5,
        img: 'hero7.png',
        prev: 'professor',
        next: null,
    }
};

$('.ranks__content').children().each(function(){
    if ($(this).data('hero')){
        if ($(this).hasClass('disabled')){
            heroes[$(this).data('hero')].disabled = true;
        }else{
            heroes[$(this).data('hero')].disabled = false;
        }
    }
});

var modal_ranks = $('#modal_ranks');

$('#cross').on('click', function(e){
    e.preventDefault();
    modal_ranks.fadeOut();
});

function changeSlide(hero){
    const currentSlide = hero;

    $('#hero_image').css('opacity', 0);
    $('#hero_name').text(heroes[currentSlide].name);
    $('#price').text(heroes[currentSlide].price);
    $('#income').text(heroes[currentSlide].income);
    $('#modal_bg').css('background', heroes[currentSlide].background);
    $('#price_per_cell').text(parseInt(heroes[currentSlide].price * 0.3));
    $('#potentialCell').text(heroes[currentSlide].cells);
    $('#hero_image').prop('src', 'static/img/' + heroes[currentSlide].img);
    $('#hero_image').animate({opacity: 1}, 1000);

    checkButtons(hero);

    return;
}

function checkButtons(hero){

    const newHero = hero;

    $('#prev').off('click');
    $('#next').off('click');

    if ( heroes[newHero].prev && heroes[heroes[newHero].prev].disabled !== true){
        $('#prev').show();

        $('#hero_image').css('opacity', 0);

        $('#prev').on('click', function() {

            changeSlide(heroes[newHero].prev);
        });

    }else{
        $('#prev').hide();
    }

    if ( heroes[newHero].next && heroes[heroes[newHero].next].disabled !== true){
        $('#next').show();
        
        $('#next').on('click', function() {

            $('#hero_image').css('opacity', 0);

            changeSlide(heroes[newHero].next);

        });

    }else{
        $('#next').hide();
    }
}


$('.ranks__content-item').not('.disabled').each(function(){
    $(this).on('click', function(){

        const hero = $(this).data('hero');

        changeSlide(hero);

        checkButtons(hero);

        modal_ranks.fadeIn();

    });
});

let counter = $('#counter');

$('#minus').on('click', function(){
    let counterValue = parseInt(counter.text());
    if (counterValue > 1){ 
        counter.text(counterValue - 1);
    }
});

$('#plus').on('click', function(){
    let counterValue = parseInt(counter.text());
    counter.text(counterValue + 1);
});

$('#referal_link').on('click', function(e){
    e.preventDefault();
    navigator.clipboard.writeText($(this).attr('href')).then(() => {
        $(this).find('span').text('Copied !');
    }, () => {
        $(this).find('span').text('Error, refresh page please');
    });
});

let heroes_avatars = [];

for (let i = 1; i < 8; i++){
    heroes_avatars.push('static/img/hero' + i + '.png');
}

const heroAnimation = $('.heroes_animation img');

var thisId = 0;

var animationWidthHero = setInterval(function(){
    heroAnimation.attr('src', heroes_avatars[thisId]);
    
    thisId++; 

    if (thisId == 7) {
        clearInterval(animationWidthHero); 
    }

}, 500);   

var heroes_content = $('.ranks .ranks__content');

heroes_content.children().each(function(){
    $(this).css('opacity', 0);
});

$(window).scroll(function(event) {

    var currentWidth = $(window).width();

    if ($(window).scrollTop() > $('.ranks').offset().top - $(window).height() / 2 && currentWidth > 768) {
        heroes_content.children().each(function(){
            $(this).animate({opacity: 1}, 1000);
        });
    }

    if ($(window).scrollTop() > $('.rules__content').offset().top - $(window).height() / 2 && currentWidth > 768) {
        $('.rules__content').addClass('animate__fadeInUpBig')
    }

    if ($(window).scrollTop() > $('.domestication').offset().top - $(window).height() / 2 && currentWidth > 768) {
        $('.domestication_info-text').addClass('animate__fadeInLeft');
        $('.domestication_info img').addClass('animate__fadeInRight');
    }

    if ($(window).scrollTop() > $('.statistic').offset().top - $(window).height() / 2 && currentWidth > 768) {
        $('.statistic__content').addClass('animate__fadeIn');
    }

});