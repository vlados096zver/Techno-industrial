 $(document).ready(function() {

    if($('.doc__item').length==1) {
      $('.doc').addClass('doc--level1');
    } else if ($('.doc__item').length==2) {
      $('.doc').addClass('doc--level2');
    }

       (function() {
         var headerBlock = $('.main-header');

         $(window).resize(listener);

         $(window).scroll(listener)

         function listener() {
           var heightHeader;
           var scrollTop = $(window).scrollTop();
           var heightMenu = $('.main-header__menu').outerHeight(true);

           heightHeader = $(".main-header__content").outerHeight(true);


           if (heightHeader <= scrollTop) {
             $('.main-header__content').addClass('main-header__content--fixed');
           } else {
             $('.main-header__content').removeClass('main-header__content--fixed');
           }

           if (heightHeader <= scrollTop && $(window).width() <= 1150) {
             headerBlock.css({
               'top': -heightHeader + heightMenu + 'px'
             });
           } else {
             headerBlock.css({
               'top': 0
             });
           }

         }
       })()

       $('.main-header__list').on("click", ".main-header__link", function() {
         var target = $(this).attr('href');
         var value;

         if ($(window).width() <= 1150) {
           value = $(target).offset().top - $('.main-header__menu').outerHeight(true);
         } else {
           value = $(target).offset().top - $('.main-header').outerHeight(true);
         }
         console.log($('.main-header').outerHeight(true))
         $('html, body').animate({

           scrollTop: value
         }, 800);
         return false;
       });


       function validate(input, length, regExp, error, phone) {

         $(input).on('blur keyup', function() {
           var value = $(this).val();
           var that = $(this);

           regExp = regExp == '' ? /./ : regExp;

           if (phone === true) {
             bool_reg = !regExp.test(value);
           } else {
             bool_reg = regExp.test(value);
           }

           if (value.length > length && value !== '' && bool_reg) {
             that.removeClass('form-fail').addClass('form-done');
             $(error).slideUp();
           } else {
             that.removeClass('form-done').addClass('form-fail');
             $(error).slideDown();
           }
         });

       }

       // деакцивация кнопки если есть поле с ошибкой

       function disBtn(input, btn) {
         var input = $(input);
         input.on('blur keyup', function() {

           if (input.hasClass('form-fail')) {
             $(btn).attr('disabled', 'disabled');
           } else {
             $(btn).removeAttr('disabled');
           }

         });

       }

       // для проверки при нажатии

       function valClick(input, length, regExp, error, btn, phone) {
         var value = $(input).val();

         regExp = regExp == '' ? /./ : regExp;

         if (phone === true) {
           bool_reg = regExp.test(value);
         } else {
           bool_reg = !regExp.test(value);
         }

         if (value.length < length && value === '' && bool_reg) {
           $(input).addClass('form-fail');
           $(error).slideDown();
         }
       }

       //  деакцивация кнопки при нажатии

       function disBtnClick(input, btn) {
         var input = $(input);

         if (input.hasClass('form-fail')) {
           $(btn).attr('disabled', 'disabled');
           return false;
         } else {
           return true;
         }

       }

       function validateCheck(input) {
         $(input).on('change', function() {

           var check = $(this).prop('checked');
           if (check) {
             $('button').prop('disabled', false);
           } else {
             $('button').prop('disabled', true);
           }
         });
       }

       $('input[type="tel"]').mask("+38 (999) 999-99-99");

       var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
       var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;
       var regPhone = /[_]/i;
       // пример использования

       validate('#c_fio', 1, regName, '.contacts__fail-fio');
       validate('#c_email', 1, regEmail, '.contacts__fail-email');
       validate('#c_phone', 1, regPhone, '.contacts__fail-phone', true);

       disBtn('#c_fio, #c_email, #c_phone', '.btn--send');


     });