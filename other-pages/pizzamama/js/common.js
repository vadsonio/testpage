let LANDING = {
	cart: 0,
	cartArr: [],
	headerActiveItem: '',		// cart or mobile-menu
	bannerParallax(){ 
		let scene = document.getElementById('banner_parallax');
		let parallaxInstance = new Parallax(scene);
	},
	rellaxJs(){
		let rellax = new Rellax('.rellax');
	},
	scrollHeader(){
		let header = $('.header');

		window.addEventListener('scroll', function(e) {
			let doc = document.documentElement;
			let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

			if(top > 0){
				header.addClass('scrolled')
			} else {
				header.removeClass('scrolled')
				$('.mobile-menu').removeClass('open')
			}
		});
	},
	hamburgerMenu(){
		let mobileMenu = $('.mobile-menu');

		$('.hamburger-menu').click(function(){

			if(LANDING.headerActiveItem === 'mob-menu'){
				LANDING.removeBodyOverflow();
				LANDING.headerActiveItem = '';
			} else {
				LANDING.headerActiveItem = 'mob-menu';
				LANDING.addBodyOverflow();
			}

			$('.cart-menu').removeClass('open');

			if(!mobileMenu.hasClass('open')){
				mobileMenu.addClass('open')
				$('.overlay-menu').addClass('open')
			} else{
				mobileMenu.removeClass('open')
				$('.overlay-menu').removeClass('open')
			}
		})
	},
	cartMenu(){
		let cartBtn = $('.cart'),
			cartMenu = $('.cart-menu');

		cartBtn.click(function(){

			if(LANDING.headerActiveItem === 'cart'){
				LANDING.removeBodyOverflow();
				LANDING.headerActiveItem = '';
			} else {
				LANDING.headerActiveItem = 'cart';
				LANDING.addBodyOverflow();
			}

			$('.mobile-menu').removeClass('open');
			
			if(!cartMenu.hasClass('open')){
				cartMenu.addClass('open')
				$('.overlay-menu').addClass('open')
			} else{
				cartMenu.removeClass('open')
				$('.overlay-menu').removeClass('open');
			}
		})
	},
	setCartQuantity(){
		let htmlCartIcon = $('.cart__marker');
		htmlCartIcon.text(LANDING.cart)
	},
	addingToCart(){
		let addToCart = $('.addToCart');

		addToCart.on('click', function(){

			let orderName = $(this).data('name'),
				name = $('#'+orderName+'_name').val(),
				price = $('#'+orderName+'_price').val(),
				quantity = $('#'+orderName+'_quantity').val(),
				parent = $(this).parent();

			let newOrder = {
				tag: orderName,
				name,
				price,
				quantity
			}

			if(!LANDING.cartArr.length){ 
				LANDING.cartArr.push(newOrder)
				LANDING.cart +=1;
				LANDING.setCartQuantity();
				LANDING.appendObjectToCartMenu();
				parent.addClass('ordered');
			} else {
				let isAdded = LANDING.cartArr.filter(addedOrder => addedOrder.name === newOrder.name)
				if(isAdded.length){
					return
				} else {
					LANDING.cartArr.push(newOrder);
					LANDING.cart +=1;
					LANDING.setCartQuantity();
					LANDING.appendObjectToCartMenu();
					parent.addClass('ordered');
				}
			}
		})		
	},
	appendObjectToCartMenu(){
		$('.cart-menu').text('');

		if(LANDING.cartArr.length){
			let summ = 0;
			for(let item of LANDING.cartArr){
				summ += item.price * item.quantity;
			}
			LANDING.cartArr.forEach(itemInCart => {
				$('.cart-menu').append('<div class="cart-menu__item" data-name='+ itemInCart.tag +'><div class="cart-menu__name">' + itemInCart.name + '</div><div class="cart-menu__quantity">'+ itemInCart.quantity +' шт.</div><div class="cart-menu__price">'+ itemInCart.price +' &#8381</div><button class="cart-menu__delete-item"><i class="fas fa-times"></i></button></div>')
			})
			$('.cart-menu').append('<div class="cart-menu__summary">Итого: <span class="cart-menu__summary-numb">'+summ+' &#8381</span></div>')
			$('.cart-menu').append('<button class="btn btn--yellow cart-menu__order-btn">оформить заказ</button>')
		} else {
			$('.cart-menu').text('Корзина пуста');
		}
	},
	deleteFromCart(){
		$('.cart-menu').on('click', '.cart-menu__delete-item', function(){
			let itemToDeleteName = $(this).parent().data('name');

			LANDING.cartArr = LANDING.cartArr.filter(item => item.tag !== itemToDeleteName);
			LANDING.cart -=1;
			LANDING.setCartQuantity();
			LANDING.appendObjectToCartMenu();

			$('*[data-name='+ itemToDeleteName +']').parent().removeClass('ordered');
		});

		$('.deleteFromCart').click(function(){
			let itemToDeleteName = $(this).data('name'),
				parent = $(this).parent();

			LANDING.cartArr = LANDING.cartArr.filter(item => item.tag !== itemToDeleteName);
			LANDING.cart -=1;
			LANDING.setCartQuantity();
			LANDING.appendObjectToCartMenu();
			
			parent.addClass('ordered-fadeOut');
			setTimeout(function(){
				parent.removeClass('ordered');
				parent.removeClass('ordered-fadeOut');
			}, 300)
		})
	},
	setCardItemQuantity(){
		let changeItemsQuantityBtn = $('.add-item-block__btn');

		changeItemsQuantityBtn.click(function(){
			let parentItem = $(this).closest('.assortment__item'),
				childItemQuant = parentItem.find('.order_quantity');

			let quant = Number(childItemQuant.text());

			if($(this).hasClass('btn-plus')){
				quant++
			} else if($(this).hasClass('btn-minus')){
				if(quant>1){
					quant--
				}
			}
			parentItem.find("input[id*=_quantity]").val(quant);
			childItemQuant.text(quant);
		})
	},
	overlayMenuClick(){
		let overlay = $('.overlay-menu'),
			cart = $('.cart-menu'),
			fixedMenu = $('.mobile-menu');

		overlay.click(function(){
			LANDING.removeBodyOverflow();
			LANDING.headerActiveItem = '';
			if(cart.hasClass('open') || fixedMenu.hasClass('open')){
				cart.removeClass('open');
				fixedMenu.removeClass('open');
				overlay.removeClass('open');
			}
		});
	},
	handleMobileMenu(){
		$('.mobile-menu .mobile-nav__link').click(function(){
			LANDING.removeBodyOverflow();
			$('.mobile-menu').removeClass('open');
			$('.overlay-menu').removeClass('open');
		})
	},
	tooltips(){
		$('.assortment__item-ingredients').mouseenter(function(){
			let ingrediendBlock = $(this);

			if(ingrediendBlock.data("tooltip")){
				ingrediendBlock.append("<p class='tooltip ingredients'>" + ingrediendBlock.data("tooltip") + "</p>")
			}
		}).mouseleave(function(){
			let ingrediendBlock = $(this)

			ingrediendBlock.find('.tooltip').remove();
		})
	},
	addBodyOverflow(){
		$('body').addClass('stop-scroll');
	},
	removeBodyOverflow(){
		$('body').removeClass('stop-scroll');
	},
	addDotsToLargeText(){
		let ingredientLines = $('.assortment__item-ingredients');

		ingredientLines.each(function(item){
			if(this.scrollHeight > this.offsetHeight){
				let text = this.innerHTML,
					initialText = text;

				while(this.scrollHeight > this.offsetHeight){
					text = text.slice(0, -1);
					this.innerHTML = text;
				}
				this.dataset.tooltip = initialText;
				this.innerHTML = this.innerHTML.slice(0, -3) + '...';
			}
		})
	},
	init: function(){
		LANDING.bannerParallax();
		LANDING.rellaxJs();
		LANDING.scrollHeader();
		LANDING.hamburgerMenu();
		LANDING.cartMenu();
		LANDING.setCartQuantity();
		LANDING.addingToCart();
		LANDING.setCardItemQuantity();
		LANDING.deleteFromCart();
		LANDING.overlayMenuClick();
		LANDING.handleMobileMenu();
		LANDING.tooltips();
		LANDING.addDotsToLargeText();
	}
}

$(function() {
	LANDING.init();
});