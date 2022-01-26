/**
 * B FLAT DUELING PIANOS JAVASCRIPT FUNCTIONS
 *
 * Roger Glenn
 * roger@mach1media.com
 * JAN 2022
 */

var offsetTop = 0; // scroll offset when top bar should activate = height of main/top navigation

function toggleScrollState() {
	var scrollPosition = $(window).scrollTop();
	//console.log(top);
	
	if (scrollPosition > offsetTop) {
		$('body').removeClass('is-top');
	}
	else if ($('body').hasClass('is-top') == false) {
		$('body').addClass('is-top');
	}
	
	if (scrollPosition <= 0) {
		$('body').removeClass('is-scrolled');
	}
	else if ($('body').hasClass('is-scrolled') == false) {
		$('body').addClass('is-scrolled');
	}
}

//
// OPEN/CLOSE HAMBURGER MENU: ACCESSIBLE
//
function openHamburgerNav() {
	$('.js-menu-toggle').addClass('is-active').attr('aria-expanded', 'true');
	$('#menu').addClass('is-active');
	$('#page-content').css('display','none');
	//$('#hamburger-navigation').focus();
}
function closeHamburgerNav() {
	$('.js-menu-toggle').removeClass('is-active').attr('aria-expanded', 'false');
	$('#menu').removeClass('is-active');
	$('#page-content').css('display','block');
	//$('#hamburger-topbar').focus();
}


/** * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DOCUMENT READY
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
jQuery(document).ready(function($) {
	
	viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	
	window.onscroll = function() {
		toggleScrollState();
	};
	
	window.onresize = function(e) {
		toggleScrollState();
	}
	
	// video modals
	$(".js-modal-vimeo").modalVideo({'channel':'vimeo'});
	$(".js-modal-youtube").modalVideo({'channel':'youtube'});
	
	// TOGGLE ACCORDIONS ----------------------------
	$('.js-nav-dropdown').click(function(e){
		e.preventDefault();
		var target   = $(this).next('ul');
		
		if (target.is(':hidden')) {
			target.velocity('slideDown', {duration:200});
		}
		else {
			target.velocity('slideUp', {duration:200});
		}
	});
	
	// TOGGLE ACCORDIONS ----------------------------
	$('.js-toggle-accordion').click(function(e){
		e.preventDefault();
		var accordionId = $(this).attr('href');
		var accordion   = $(accordionId);
		
		$(this).toggleClass('is-active');
		
		if (accordion.is(':hidden')) {
			accordion.velocity('slideDown', {duration:200});
			$(this).attr('aria-expanded','true');
			$(this).find('.state').empty().text('–');
		}
		else {
			accordion.velocity('slideUp', {duration:200});
			$(this).attr('aria-expanded','false');
			$(this).find('.state').empty().text('+');
		}
	});
	
	// TOGGLE MOBILE MENU
	$('.js-menu-toggle').on('click, tap', function(e){
		e.preventDefault();
		
		// close the menu
		if ($('#menu').hasClass('.is-active')) {
			$('.js-menu-toggle').removeClass('is-active');
			$('#menu').removeClass('is-active');
		}
		
		// open the menu
		else {
			$('.js-menu-toggle').addClass('is-active');
			$('#menu').addClass('is-active');
		}
	});
	$('.js-menu-close').on('click, tap', function(e){
		e.preventDefault();
		
		// close the menu
		$('.js-menu-toggle').removeClass('is-active');
		$('#menu').removeClass('is-active');
	});
	
	// SCROLL TO SAME PAGE ANCHORS ----------------------------
	$('.js-scroll-to-section').click(function(e) {
		var hash = $(this).attr('href').match(/#([^ ]*)/)[1];
		
		if ($('#' + hash).length) {
			e.preventDefault();
			$('#' + hash).velocity("scroll", { duration: 1000, easing: "easeInOutQuant", offset: -100 });
		}
		
		// close the menu overlay
		if ($('#menu').hasClass('is-active')) {
			$('.js-menu-toggle').removeClass('is-active');
			$('#menu').removeClass('is-active');
		}
	});
	
	// scroll to anchor when landing on page with hash in url
	if (window.location.hash) {
		$('a[href^="'+window.location.hash+'"]').first().trigger('click');
	}
});