let LANDING = {
	scrollHeader: function(){
	  var shrinkHeader = 10;
	  $(window).scroll(function() {
	    var scroll = getCurrentScroll();
	      if ( scroll >= shrinkHeader ) {
	           $('.header__inner').addClass('header__inner--scrolled');
	        }
	        else {
	            $('.header__inner').removeClass('header__inner--scrolled');
	        }
	  });

	  function getCurrentScroll() {
	    return window.pageYOffset || document.documentElement.scrollTop;
	  }
	},
	enableMobMenu: function(){
		$('.header__mob-btn').click(function(){
			$(this).toggleClass('opened');
			if($(this).hasClass('opened')){
				$('.mob-menu').toggleClass('visible');
			}else{
				$('.mob-menu').toggleClass('visible');
			}
		});

		$('.header__mob-btn').keypress(function (e){
			if (e.keyCode == 13) {
		        $(this).toggleClass('opened');
		        if($(this).hasClass('opened')){
					$('.mob-menu').toggleClass('visible');
				}else{
					$('.mob-menu').toggleClass('visible');
				}
		    }
		});
	},
	signTabs: function(){
		$('.authorization__tab').click(function(){
			$(this)
	        .addClass("active")
	        .siblings()
	        .removeClass("active")
	        .closest("div.authorization__wrap")
	        .find("div.authorization__tabs-item")
	        .removeClass("active")
	        .eq($(this).index())
	        .addClass("active");

	        if($(this).index()==0){
				$('.authorization__tab-line').removeClass('registration');
	        	$('.authorization__tab-line').addClass('enter');
	        }else{
	        	$('.authorization__tab-line').removeClass('enter');
	        	$('.authorization__tab-line').addClass('registration');
	        }
		});

		$('.authorization__tab').keypress(function (e){
			if (e.keyCode == 13) {
		        $(this).click();
		    }
		});


	},
	folderControls: function(){
		let logo			= $('.header__logo'),
			searchEnableBtn = $('#searchEnable'),
			addEnableBtn	= $('#addEnable'),
			searchPanel		= $('.header__folder-search'),
			addPanel		= $('.header__folder-add'),
			folderMenu		= $('.header__folder-menu'),
			folderControls	= $('.header__controls'),
			searchPanelClose = $('.btnCancelSearch'),
			addPanelClose	= $('.btnCancelAdd'),
			mobBtn 			= $('.header__mob-btn');

		searchEnableBtn.click(function(){
			if(searchPanel.attr('aria-hidden') == 'true'){
				togglePanels("search");
				searchPanel.attr('aria-hidden', 'false');
			} else {
				searchPanel.attr('aria-hidden', 'true');
				togglePanels("search");
			}
			
		});

		addEnableBtn.click(function(){
			if(addPanel.attr('aria-hidden') == 'true'){
				togglePanels("add");
				addPanel.attr('aria-hidden', 'false');
			} else {
				addPanel.attr('aria-hidden', 'true');
				togglePanels("add");
			}
		});

		searchPanelClose.click(function(){
			if(searchPanel.attr('aria-hidden') == 'false'){
				togglePanels("search");
				searchPanel.attr('aria-hidden','true');
			}
		});

		addPanelClose.click(function(){
			if(addPanel.attr('aria-hidden') == 'false'){
				togglePanels("add");
				addPanel.attr('aria-hidden','true');
			}
		});

		function togglePanels(panel){
			folderMenu.toggleClass('hide');
			folderControls.toggleClass('hide');
			logo.toggleClass('hide');
			mobBtn.toggleClass('hide');
			if(panel=="search"){
				searchPanel.toggleClass('enable');
			} else {
				addPanel.toggleClass('enable');
			}
			
		};
	},
	userInfo: function(){
		let userInfoLink  = $('.header__controls-user-link'),
			userInfoBlock = $('.user-info');

		userInfoLink.click(function(){
			userInfoBlock.toggleClass('enable');
		});

		$(document).click(function(event) { 
		  $target = $(event.target);

		  if(!$target.is(userInfoBlock) && !$target.is(userInfoLink) && !$target.is(userInfoBlock.children())) {
		    userInfoBlock.removeClass('enable');
		  } else if($target.is(userInfoBlock)===userInfoLink){
		  	userInfoBlock.toggleClass('enable');
		  }        
		});
	},
	addFolder: function(){
		let folderLink = $('.main-cont__add-folder-link');

		folderLink.click(function(){
			$(this).toggleClass('hide');

			if($(this).hasClass('hide')){
				$('.main-cont__add-folder').toggleClass('enable');
			}
		});

		$(document).click(function(event) { 
		  $target = $(event.target);

		  if(!$target.is($('.main-cont__folder-input')) && !$target.is(folderLink)) {
		    folderLink.removeClass('hide');
		    $('.main-cont__add-folder').removeClass('enable');
		  }        
		});

	},
	languageSelect: function(){
		let choosedItem = $('.language-main__choosed'),
			itemsToChoose = $('.language-main__item'),
			arr = [];

		if(choosedItem.length>0 && itemsToChoose.length>0){

			itemsToChoose.each(function () {
			  arr.push($(this).attr('data-lang'));
			});

			let choosedClass = itemsToChoose.first().children().attr('class').split(' ')[1];

			jQuery('<span/>',{
				"class": 'flag-icon '+choosedClass
			}).appendTo(choosedItem);

			jQuery('<select/>',{
				"class": "language-select__hide"
			}).appendTo('.language-select');

			$.each(arr, function(key, value) {
				$('.language-select__hide')
	  		      .append($('<option>', { value : value })
		          .text(value));
			});
			   

			$('.language-main__item').click(function(){
				let indexOfChoosed = itemsToChoose.index(this);
				let newClass = $(this).children().attr('class').split(' ')[1];

				$('.language-select__hide').prop('selectedIndex', indexOfChoosed);
				choosedItem.children().attr('class', 'flag-icon '+ newClass);
			});
		};
	},
	showSocials: function(){
		let socialsModal = $('#shareSocials'),
			socialsEnableLinks = $('.share-link');

		socialsEnableLinks.click(function(event){
			event.preventDefault();
			socialsModal.toggleClass('enable');

			if(socialsModal.hasClass('enable')){
				$("body").addClass('stopScroll');
			}
		});

		$(document).click(function(event) { 
		  $target = $(event.target);

		  if($target.is(socialsModal)) {
		    socialsModal.removeClass('enable');
		    $("body").removeClass('stopScroll');
		  }        
		});
	},
	deleteLink: function(){
		let deleteModal = $('#deleteLink'),
			deleteLinks = $('.delete-link'),
			cancelDeleting = $('#cancelDeletingLink');

		deleteLinks.click(function(event){
			event.preventDefault();
			deleteModal.toggleClass('enable');

			if(deleteModal.hasClass('enable')){
				$("body").addClass('stopScroll');
			}
		});

		cancelDeleting.click(function(){
			deleteModal.removeClass('enable');
			$("body").removeClass('stopScroll');
		});

		$(document).click(function(event) { 
		  $target = $(event.target);

		  if($target.is(deleteModal)) {
		    deleteModal.removeClass('enable');
		    $("body").removeClass('stopScroll');
		  }        
		});
	},
	editFolderName: function(){
    	let editModal = $('#editFolderName'),
    		editLink  = $('.main-cont__main-title-change'),
    		cancelEditing = $('#cancelEditingLink');

    	editLink.click(function(event){
			event.preventDefault();
			editModal.toggleClass('enable');

			if(editModal.hasClass('enable')){
				$("body").addClass('stopScroll');
			}
    	});

    	cancelEditing.click(function(){
    		editModal.removeClass('enable');
    		$("body").removeClass('stopScroll');
    	});

    	$(document).click(function(event) { 
		  $target = $(event.target);

		  if($target.is(editModal)) {
		    editModal.removeClass('enable');
		    $("body").removeClass('stopScroll');
		  }        
		});
	},
	init: function(){
		LANDING.scrollHeader();
		LANDING.enableMobMenu();
		LANDING.signTabs();
		LANDING.folderControls();
		LANDING.userInfo();
		LANDING.addFolder();
		LANDING.languageSelect();
		LANDING.showSocials();
		LANDING.deleteLink();
		LANDING.editFolderName();
	}
}

$(function() {
	LANDING.init();
});