(function ($) {
	"use strict";

	jQuery(document).ready(function ($) {

		// console.log(brands);
		// console.log('hello');
		var iconLibrary = {
			'brands': brands,
			'regular': regular,
			'solid': solid,
			// 'happy-icons' : happyIcons, // load font & css before on it
		};

		var iconMarkup = '';

		$.each(iconLibrary, function (iconPackKey, iconPack) {

			// console.log( iconPack['icons'] );

			var prefix = brandKey(iconPackKey);

			$.each(iconPack['icons'], function (key, icon) {

				var cls = prefix + icon;

				iconMarkup += iconItem(iconPackKey, cls, icon);

				// console.log( icon );

			});

		});



		// TODO: Push ALL icon in window load
		$('#aesthetic-icons-manager__tab__content').append(iconMarkup);

		function iconItem(brand, iconCls, filter) {
			var $markup = '<div class="aesthetic-icons-manager__tab__item" data-library="' + brand + '" filter="' + filter + '"><div class="aesthetic-icons-manager__tab__item__content"><i class="' + iconCls + '"></i><div class="aesthetic-icons-manager__tab__item__name" title="' + filter + '">' + filter + '</div></div></div>';
			return $markup;
		}

		function brandKey(key) {
			switch (key) {
				case 'brands':
					return 'fab fa-';
					break;
				case 'solid':
					return 'fas fa-';
					break;
				case 'regular':
					return 'far fa-';
					break;
				case 'happy-icons':
					return 'hm hm-';
					break;
				default:
					return 'fab fa-';
			}
		}
		// TODO: sidebar class
		$('.aesthetic-icons-manager__tab-link').on('click', function () {
			/* Handle Icon Pack Active State */
			$(this).parent().find('.aesthetic-active').removeClass("aesthetic-active");
			$(this).addClass("aesthetic-active");

			/* Filter Icons by Pack */
			var library = $(this).data('library-id');
			var icons = $('#aesthetic-icons-manager__tab__content').children();

			if (library != "all") {
				icons.filter(function () {
					$(this).toggle($(this).data('library') == library);
				});
			} else {
				icons.filter(function () {
					$(this).show();
				});
			}
		});

		// TODO: search input
		$('#aesthetic-icons-manager__search input').on("keyup", function () {
			var value = $(this).val().toLowerCase();
			var icon = $('#aesthetic-icons-manager__tab__content').find('i');
			//console.log( value );
			icon.filter(function () {
				$(this).closest('.aesthetic-icons-manager__tab__item').toggle($(this).attr('class').toLowerCase().indexOf(value) > -1);
			});
		});

		/**
		 * Script for icon option
		 */
		/* $('.wpci_icon_area').each(function () {
			var wpci_icon_area = $(this);
			var icon_input = wpci_icon_area.find('input.wpci_icon_cls_input');
			var icon_filter = wpci_icon_area.find('input.filter');
			var icon_library = wpci_icon_area.find('.customizer_icon_library');
			var icon = icon_library.find('i');
			//click on input show icon area
			icon_input.on('click', function () {
				icon_library.slideToggle("fast");
			});
			//type on input search icon item in icon area
			icon_filter.on("keyup", function() {
				var value = $(this).val().toLowerCase();
				icon.filter(function() {
					$(this).closest('li').toggle($(this).attr('class').toLowerCase().indexOf(value) > -1);
				});
			});
			//click on icon hide icon area
			icon.on('click', function () {
				icon_input.val($(this).attr('class')).change();
				setTimeout(function () {
					icon_library.slideUp("fast");
				}, 310)
			});
		}); */

	});

})(jQuery);
