// window.addEvent('domready', function() {

//   var test = new Fx.Accordion($$('h1'), $$('.accordion-el'), {
//   });

//   test.display(0);

// });

$(function () {

    $('.accordion').accordion({
        selector: {
            trigger: '.title .icon'
        }
    });

});