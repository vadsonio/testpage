let LANDING = {
	mobileMenu: function(){

		let body = $('body'),
			html = $('html'),
			overlayMob = $('.mob-menu'),
    		overlayBtts = $('button[class$="-mobm"]');

		$.each(overlayBtts, function(index, item){
			$(item).click(function(){
				let overlayOpen = $(item).hasClass('open-mobm');
				overlayMob.attr('aria-hidden', !overlayOpen);

				body.toggleClass('noscroll');
				html.toggleClass('noscroll');

				overlayMob.scrollTop = 0;
			});
		});
	},
	choosePeopleForm: function(){
		$('.form-sel').each(function() {
		  $(this).children('select').css('display', 'none');
		  
		  var $current = $(this);
		  
		  $(this).find('option').each(function(i) {
		    if (i == 0) {
		      $current.prepend($('<div>', {
		        class: $current.attr('class').replace(/form-sel/g, 'form-sel__box')
		      }));
		      
		      var placeholder = $(this).text();
		      $current.prepend($('<input>', {
		        class: $current.attr('class').replace(/form-sel/g, 'form-sel__placeholder'),
		        // value: placeholder,
		        'name': 'group',
		        required: true,
		        placeholder: placeholder,
		        'data-placeholder': placeholder
		      }));
		      return;
		    }
		    
		    $current.children('div').append($('<span>', {
		      class: $current.attr('class').replace(/form-sel/g, 'form-sel__box__options'),
		      text: $(this).text()
		    }));
		  });
		});

		// Toggling the `.active` state on the `.sel`.
		$('.form-sel').click(function() {
		  $(this).toggleClass('active');
		});

		// Toggling the `.selected` state on the options.
		$('.form-sel__box__options').click(function() {
		  var txt = $(this).text();
		  var index = $(this).index();
		  
		  $(this).siblings('.form-sel__box__options').removeClass('selected');
		  $(this).addClass('selected');
		  
		  var $currentSel = $(this).closest('.form-sel');
		  $currentSel.children('.form-sel__placeholder').val(txt);
		  $currentSel.children('select').prop('selectedIndex', index + 1);
		});

		
		let indexItem = -1;

		let chooseOptionsList = function (event) {
			  if (event.defaultPrevented) {
			    return; // Do nothing if the event was already processed
			  }

			  function chooseItem(itemIndex){
			  	$('.form-sel__box__options').removeAttr('style');
			  	$('.form-sel__box__options:eq('+ itemIndex +')').css('backgroundColor', '#f0f0f0');
			  	console.log(indexItem);
			  }

			  switch (event.key) {
			    case "Down": // IE/Edge specific value
			      if(indexItem>($('.form-sel__box__options').length)-2){
			      	indexItem=($('.form-sel__box__options').length)-2;
			      }
			      indexItem++;
			      chooseItem(indexItem);
			    case "ArrowDown": 
			      if(indexItem>($('.form-sel__box__options').length)-2){
			      	indexItem=($('.form-sel__box__options').length)-2;
			      }
			      indexItem++;
			      chooseItem(indexItem);
			      break;
			    case "Up": // IE/Edge specific value
			    	if(indexItem > 0){
			    		indexItem--;
			    	}
			    	chooseItem(indexItem);
			    case "ArrowUp":
			      if(indexItem > 0){
			    		indexItem--;
			    	}
			    	chooseItem(indexItem);
			      break;
			    case "Left": // IE/Edge specific value
			    case "ArrowLeft":
			      // Do something for "left arrow" key press.
			      break;
			    case "Right": // IE/Edge specific value
			    case "ArrowRight":
			      // Do something for "right arrow" key press.
			      break;
			    case "Enter":
			      // Do something for "enter" or "return" key press.
			      $('.form-sel__box__options:eq('+ indexItem +')').click();
			      // $('.form-sel').trigger('blur');

			      break;
			    case "Esc": // IE/Edge specific value
			    case "Escape":
			      // Do something for "esc" key press.
			      break;
			    default:
			      return; // Quit when this doesn't handle the key event.
			  }

			  // Cancel the default action to avoid it being handled twice
			  event.preventDefault();
			};


		$('.form-sel__placeholder').focus(function(){
			$('.form-sel').toggleClass('active');
			$('.form-sel__box__options').removeClass('selected');
			window.addEventListener("keydown", chooseOptionsList, true);
		});
		$('.form-sel__placeholder').focusout(function(){
			$('.form-sel').removeClass('active');
			window.removeEventListener("keydown", chooseOptionsList, true);
		});


		$(document).mouseup(function (e){ 
			var selBox = $(".form-sel"); 
			if (!selBox.is(e.target) 
			    && selBox.has(e.target).length === 0) { 
				$('.form-sel').removeClass('active');
			}
		});
	},
	chooseTimeForm: function(){

		let timeSlider = (function(){
		  let data = {
		    hours : "00",
		    minutes : "00"
		  }
		  let placeholder = $('.timeInput');
		  
		  return {
		    init: function(){
		      // console.log(data.hours+ ' : '+data.minutes);
		      placeholder.val(data.hours+ ' : '+data.minutes);
		    },
		    setMinutes: function(val){
		      if(val==="60"){
		        val = "00";
		      };
		      if(val.length == 1){
		        val = '0'+val;
		      }
		      data.minutes=val;
		      $('.time-range__minutes').val(data.minutes);
		      timeSlider.init();
		    },
		    setHours: function(val){
		      if(val.length == 1){
		        val = '0'+val;
		      }
		      data.hours=val;
		      $('.time-range__hours').val(data.hours);
		      timeSlider.init();
		    }
		  }
		})();

		$('.time-range__rangeM').on('input', function(){
		  timeSlider.setMinutes($(this).val());
		});

		$('.time-range__rangeH').on('input', function(){
		  timeSlider.setHours($(this).val());
		})



		$('.time-range__rangeM').hover(function(){
		  $('.time-range__minutes').addClass('hov');
		},function(){
		  $('.time-range__minutes').removeClass('hov');
		})

		$('.time-range__rangeH').hover(function(){
		  $('.time-range__hours').addClass('hov');
		},function(){
		  $('.time-range__hours').removeClass('hov');
		})


		$('.timeInput').click(function() {
		  $('.time-range').toggleClass('active');
		  // alert('work');
		});

		$(document).mouseup(function (e){ 
			var timeBox = $(".time-range"); 
			if (!timeBox.is(e.target) 
			    && timeBox.has(e.target).length === 0) { 
				$('.time-range').removeClass('active');
			}
		});

		$('.timeInput').focus(function(){
			$('.time-range').toggleClass('active');
		});
		
		$('.time-range .rangeMain:eq(1)').focusout(function(){
			$('.time-range').removeClass('active');
		});


	},
	popUp: function(){
		let poperUp = $('.anchor-top');

		poperUp.hide();

		$(window).scroll(function () {
		    var $this = $(this);

		    if ($this.scrollTop() > 250) {
		       poperUp.fadeIn("slow");
		    } else {
		       poperUp.fadeOut("slow");
		    }
		});

		poperUp.click(function() {
			$("html, body").animate({scrollTop: 0}, "slow")
		})
	},
	init: function(){
		LANDING.mobileMenu();
		LANDING.choosePeopleForm();
		LANDING.chooseTimeForm();
		LANDING.popUp();
	}
}

$(function() {
	LANDING.init();
});