let LANDING = {
	headerItemsHover: function(){
		let headerDropdownItem = $('.main-nav__item'),
			headerDropdown = $('.main-nav__dropdown');

		headerDropdownItem.hover(function(){
			$('body').addClass('overflow-hidden-with-scroll');
		}, function(){
			$('body').removeClass('overflow-hidden-with-scroll');
		});

		headerDropdown.hover(function(){
			$('body').addClass('overflow-hidden-with-scroll');
		}, function(){
			$('body').removeClass('overflow-hidden-with-scroll');
		});
	},
	searchEnable: function(){
		let search = $('#headerSearch'),
			searchDropdown = $('#headerSearchDropdown'),
			searchPanel = $('.search-panel'),
			length = 0,
			dropdownenable = false;

		search.mousedown(function(){
			if(length>0){
				searchDropdown.addClass('open');
			}
		});
	
		search.keyup(function(event){
			length = event.target.value.length;

			if(length>0){
				searchDropdown.addClass('open');
			} else {
				searchDropdown.removeClass('open');
			}
		});

		$(document).on('click', function(event){
		    if (!searchPanel.is(event.target) &&
		        searchPanel.has(event.target).length === 0)
		    {
		        searchDropdown.removeClass('open');
		    }
		});
	},
	searchEnableMob: function(){
		let search = $('#headerSearchMob'),
			searchDropdown = $('#headerSearchDropdownMob'),
			searchEnableButton = $('.search-mob-btn'),
			searchMob = $('.search-panel__mob'),
			searchMobClose = $('.search-panel__disable');

		searchEnableButton.click(function(){
			searchMob.toggleClass('show');

			if(searchMob.hasClass('show')){
				$('body').addClass('overflow-hidden');
			} else {
				$('body').removeClass('overflow-hidden');
			}

			if($('.app__mob-menu').hasClass('show')){
				$('.app__mob-menu').removeClass('show');
			}
		});

		search.click(function(){
			searchDropdown.addClass('open');
		});

		searchMobClose.click(function(){
			searchMob.toggleClass('show');

			$('body').removeClass('overflow-hidden');
		});

		$(document).on('click', function(event){
		    if (!search.is(event.target) &&
		        search.has(event.target).length === 0)
		    {
		        searchDropdown.removeClass('open');
		    }
		});
	},
	videoOnload: function(){
		$(".article-item").each(function(){
			let vid = $(this).find('.article-item__video')[0],
				time = 0,
				timestamp = $(this).find('.article-item__timestamp');

			if(timestamp.length>0){
				vid.onloadedmetadata = function(){
					time = secondsToTime(Math.round(vid.duration));
					timestamp.text(time.h+':'+time.m+':'+time.s);
				}

				function secondsToTime(secs){
					let hours = Math.floor(secs / (60 * 60));

					let divisor_for_minutes = secs % (60 * 60);
					let minutes = Math.floor(divisor_for_minutes / 60);

					if(minutes<10){
						minutes = '0' + minutes
					}

					let divisor_for_seconds = divisor_for_minutes % 60;
					let seconds = Math.ceil(divisor_for_seconds);

					if(seconds<10){
						seconds = '0' + seconds
					}

					let timeObj = {
					    "h": hours,
					    "m": minutes,
					    "s": seconds
					};

					return timeObj;
				}
			} else {
				return false;
			}
		});


		$(".article-item.article-item--main-page").each(function(){
			let vid = $(this).find('.article-item__video')[0],
				time = 0,
				timestamp = $(this).find('.article-item__timestamp');

			if(timestamp.length>0){
				vid.onloadedmetadata = function(){
					time = secondsToTime(Math.round(vid.duration));
					timestamp.text(time.h+':'+time.m+':'+time.s);
				}

				function secondsToTime(secs){
					let hours = Math.floor(secs / (60 * 60));

					let divisor_for_minutes = secs % (60 * 60);
					let minutes = Math.floor(divisor_for_minutes / 60);

					if(minutes<10){
						minutes = '0' + minutes
					}

					let divisor_for_seconds = divisor_for_minutes % 60;
					let seconds = Math.ceil(divisor_for_seconds);

					if(seconds<10){
						seconds = '0' + seconds
					}

					let timeObj = {
					    "h": hours,
					    "m": minutes,
					    "s": seconds
					};

					return timeObj;
				}
			} else {
				return false;
			}
		});

	},
	videoHover: function(){
		$(".article-item__media.video").hover(function(){
		 	$(this).children("video")[0].play();
	    }, function(){
	    	var el = $(this).children("video")[0];
		    el.pause();
		    el.currentTime = 0;
	    });
	},
	mobileMenu: function(){
		let mobileMenuButton = $('.header__mob-menu-btn'),
			mobileMenu = $('.app__mob-menu'),
			mobileMenuOverlay = $('.mob-menu__overlay');

		mobileMenuButton.click(function(){
			if($('.search-panel__mob').hasClass('show')){
				$('.search-panel__mob').removeClass('show')
			}

			mobileMenu.toggleClass('show');

			if(mobileMenu.hasClass('show')){
				$('body').addClass('overflow-hidden');
			} else{
				$('body').removeClass('overflow-hidden');
			}

			setTimeout(menuAsideAnimation, 500);

			function menuAsideAnimation(){
				if(mobileMenu.hasClass('show')){
					$('.mob-menu__aside').addClass('show');
					
				} else{
					$('.mob-menu__aside').removeClass('show');
				}
			}
		});

		mobileMenuOverlay.click(function(){
			mobileMenu.removeClass('show');
			$('.mob-menu__aside').removeClass('show');
			$('body').removeClass('overflow-hidden');
		});
	},
	textareaAutosize: function(){
		let commentsTextarea = $('.comments__textarea');

		autosize(commentsTextarea);
	},
	modalEnable: function(){
		let signInLink = $('.sign-link'),
			modalBox = $('.app__modal'),
			closeModalBox = $('.app__modal-close'),
			modalBoxOverlay = $('.app__modal-overlay');

		signInLink.click(function(){

			let dataAttr = $(this).data('sign');
			
			var $current = $('.app__modal-sign-block[data-sign-block="' + dataAttr + '"]').addClass('show');
  			$('.app__modal-sign-block').not($current).removeClass('show');

			modalBox.addClass('show');
			$('body').addClass('overflow-hidden');
		});

		modalBoxOverlay.click(function(event){
			if(event.target !== this){
				return;
			}

			modalBox.removeClass('show');
			$('body').removeClass('overflow-hidden');
		});

		closeModalBox.click(function(){
			modalBox.removeClass('show');
			$('body').removeClass('overflow-hidden');
		});
	},
	headerPersonalCab: function(){
		let personalCabLink = $('.user-sign-cab__user-link'),
			personalCabDropdown = $('.user-sign-cab__dropdown');

		personalCabLink.click(function(){
			personalCabDropdown.toggleClass('show');
		});

		$(document).on('click', function(event){
		    if (!personalCabLink.is(event.target) &&
		        personalCabLink.has(event.target).length === 0 &&
		        !personalCabDropdown.is(event.target) &&
		        personalCabDropdown.has(event.target).length === 0)
		    {
		        personalCabDropdown.removeClass('show');
		    }
		});
	},
	init: function(){
		LANDING.headerItemsHover();
		LANDING.searchEnable();
		LANDING.searchEnableMob();
		LANDING.videoOnload();
		LANDING.videoHover();
		LANDING.mobileMenu();
		LANDING.textareaAutosize();
		LANDING.modalEnable();
		LANDING.headerPersonalCab();
	}
}

$(function() {
	LANDING.init();
});