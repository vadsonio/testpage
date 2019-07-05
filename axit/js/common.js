let LANDING = {
	showMobileMenu: function(){
	    let mobileMenu = $('.header__nav-mob'),
	    	mobileModal = $('.nav-mob-modal'),
	    	closeModal = $('.nav-mob-modal__close');

	    mobileMenu.on('click', function(){
	    	$(this).toggleClass('nav-mob-open');
	    	mobileModal.toggleClass('nav-mob-modal-open');
			$('body').css('overflow', 'hidden');
	    });

	    closeModal.on('click', function(){
	    	mobileMenu.toggleClass('nav-mob-open');
	    	mobileModal.toggleClass('nav-mob-modal-open');
	    	$('body').css('overflow', 'auto');
	    })
	},
	enableFeatureTabs: function(){
		let tabs 	= $(".features__tab"), 
			tabCont = $(".features__tab-cont");

		function clickTab(){
			tabCont.each(function(){
				$(this).css('display', 'none');
			});
		  	
		  	tabs.each(function(){
		  		$(this).removeClass('active');
		  	}); 	
		};

		tabs.on('click', function(){
		  	clickTab();
		  	tabs.removeClass('active');
		  	$(this).addClass('active');
		  	let attr = $(this).attr('data-tab');
		  	$(".features__tab-cont[data-tabcont='"+attr+"']").fadeIn();
		});

		tabs[0].click();
	},
	init: function(){
		LANDING.showMobileMenu();
		LANDING.enableFeatureTabs();
	}
}

$(function() {
	LANDING.init();
});