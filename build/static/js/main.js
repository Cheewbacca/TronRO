"use strict";

var heroes = {
  supernew: {
    name: 'Суперновичок',
    price: '250',
    income: '1',
    background: 'linear-gradient(90deg, rgba(255,140,139,1) 0%, rgba(255,185,184,1) 100%)',
    cells: 50
  },
  gunsmith: {
    name: 'Оружейник',
    price: '1000',
    income: '1,05',
    background: 'linear-gradient(90deg, rgba(255,180,104,1) 0%, rgba(255,223,191,1) 100%)',
    cells: 25
  },
  comandor: {
    name: 'Командор',
    price: '5000',
    income: '1,1',
    background: 'linear-gradient(90deg, rgba(223,132,132,1) 0%, rgba(255,181,181,1) 100%)',
    cells: 12
  },
  paladin: {
    name: 'Паладин',
    price: '20 000',
    income: '1,15',
    background: 'linear-gradient(90deg, rgba(104,119,194,1) 0%, rgba(191,202,255,1) 100%)',
    cells: 6
  },
  archimag: {
    name: 'Архимаг',
    price: '50 000',
    income: '1,2',
    background: 'linear-gradient(90deg, rgba(245,183,111,1) 0%, rgba(255,225,190,1) 100%)',
    cells: 5
  },
  professor: {
    name: 'Профессор',
    price: '75 000',
    income: '1,25',
    background: 'linear-gradient(90deg, rgba(255,180,104,1) 0%, rgba(255,223,191,1) 100%)',
    cells: 5
  },
  mistic: {
    name: 'Мистик',
    price: '100 0000',
    income: '1,3',
    background: 'linear-gradient(90deg, rgba(221,118,82,1) 0%, rgba(255,197,177,1) 100%)',
    cells: 5
  }
};
var modal_ranks = $('#modal_ranks');
$('#cross').on('click', function (e) {
  e.preventDefault();
  modal_ranks.fadeOut();
});
$('.ranks__content-item').not('.disabled').each(function () {
  $(this).on('click', function () {
    var hero = $(this).data('hero');
    $('#hero_name').text(heroes[hero].name);
    $('#price').text(heroes[hero].price);
    $('#income').text(heroes[hero].income);
    $('#hero_image').prop('src', $(this).find('img').attr('src'));
    $('#modal_bg').css('background', heroes[hero].background);
    $('#price_per_cell').text(parseInt(heroes[hero].price * 0.3));
    $('#potentialCell').text(heroes[hero].cells);
    modal_ranks.fadeIn();
  });
});
var counter = $('#counter');
$('#minus').on('click', function () {
  var counterValue = parseInt(counter.text());

  if (counterValue > 1) {
    counter.text(counterValue - 1);
  }
});
$('#plus').on('click', function () {
  var counterValue = parseInt(counter.text());
  counter.text(counterValue + 1);
});
$('#referal_link').on('click', function (e) {
  var _this = this;

  e.preventDefault();
  navigator.clipboard.writeText($(this).attr('href')).then(function () {
    $(_this).find('span').text('Copied !');
  }, function () {
    $(_this).find('span').text('Error, refresh page please');
  });
});