(function (w) {
	"use strict";


	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this,
				args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	var iconLibrary = {
		'brands': brands,
		'regular': regular,
		'solid': solid,
		// 'happy-icons' : happyIcons, // load font & css before on it
	};

	//console.log(typeof iconLibrary);

	var iconMarkup = '';

	Object.entries(iconLibrary).forEach(function (iconPackKey, iconPack) {

		//console.log( iconPackKey[0], iconPack );

		var prefix = brandKey(iconPackKey[0]);

		iconPackKey[1]['icons'].forEach(function (key, icon) {
			// console.log( key, icon );
			var cls = prefix + key;
			iconMarkup += iconItem(iconPackKey[0], cls, key);
		});

	});

	function iconItem(brand, iconCls, filter) {
		var $markup = '<div class="aim-icon-item" data-library="' + brand + ' all" data-filter="' + filter + '"><div class="aim-icon-item-inner"><i class="' + iconCls + '"></i><div class="aim-icon-item-name" title="' + filter + '">' + filter + '</div></div></div>';
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

	var wrapper = document.querySelector('#aim-modal--icon-preview');
	wrapper.innerHTML = iconMarkup;
	//console.log(wrapper);

	var searchInput = document.querySelector('.aim-modal--icon-search input');
	var icon = document.querySelectorAll('#aim-modal--icon-preview i');
	var iconWrap = document.querySelectorAll('.aim-icon-item');
	searchInput.addEventListener('keyup', debounce(searchFunc, 100));
	// searchInput.addEventListener('keyup', searchFunc );

	function searchFunc(e) {
		// console.log(this.value.toLowerCase());

		var searchText = this.value.toLowerCase();
		filterFunc(iconWrap, searchText, 'filter');

	}

	function filterFunc(filterItems, filterText, dataName) {

		Object.entries(filterItems).filter(function (value, index) {
			// console.log(value[1].dataset[dataName]);
			if (-1 == value[1].dataset[dataName].indexOf(filterText)) {
				value[1].setAttribute('style', 'display: none;');
			} else {
				value[1].removeAttribute('style');
			}
		});

	}

	var sideBarBtn = document.querySelectorAll('.aim-modal--sidebar-tab-item');

	sideBarBtn.forEach(function (item, key) {
		item.addEventListener('click', clickHandlerFunc);
	});

	function clickHandlerFunc(e) {
		// console.dir(e.currentTarget);
		if (!e.currentTarget.classList.contains('aesthetic-active')) {
			sideBarBtn.forEach(function (item, key) {
				item.classList.remove('aesthetic-active');
			});
			e.currentTarget.classList.add('aesthetic-active')
		}
		filterFunc(iconWrap, e.currentTarget.dataset['libraryId'], 'library');
	}

	var aestheticModel = document.querySelector('#aim-modal');

	//Icon library open
	document.querySelector('.select-icon').addEventListener('click', function (e) {
		aestheticModel.classList.remove('aim-close');
		aestheticModel.classList.add('aim-open');
	});

	//Icon library close by clicking close button
	document.querySelector('.aim-modal--header-close-btn').addEventListener('click', function (e) {
		aestheticModel.classList.add('aim-close');
		aestheticModel.classList.remove('aim-open');
	});

	// document.querySelector('.aim-icon-item').addEventListener('click', function(e) {
	// 	iconWrap.forEach(function(item,key){
	// 		item.classList.remove('aesthetic-selected');
	// 	});
	// 	e.currentTarget.classList.toggle('aesthetic-selected');
	// });

	// selected icon highlited by adding class
	document.querySelectorAll('.aim-icon-item').forEach(function (item, key) {
		item.addEventListener('click', function (e) {
			iconWrap.forEach(function (item, key) {
				item.classList.remove('aesthetic-selected');
			});
			e.currentTarget.classList.toggle('aesthetic-selected');
		});
	});

	//Insert button
	document.querySelector('.aim-insert-icon-button').addEventListener('click', function (e) {
		var selected = document.querySelector('.aesthetic-selected');

		if (null !== selected) {

			var sellectedClass = selected.querySelector('i').classList.value;

			document.querySelector('#icon_value').value = sellectedClass;

			var wrap = document.querySelector('.select-icon');
			wrap.querySelector('i').classList.value = sellectedClass;
			// if( null == wrap.querySelector('i') ){

			// 	var iTag = document.createElement('i');
			// 	iTag.classList.value = sellectedClass;
			// 	wrap.appendChild(iTag);
			// }else{
			// 	wrap.querySelector('i').classList.value = sellectedClass;
			// }

		}
		aestheticModel.classList.add('aim-close');
		aestheticModel.classList.remove('aim-open');
	});

	//Remove selected icon
	document.querySelector('.icon-none').addEventListener('click', function (e) {
		var selected = document.querySelector('.aesthetic-selected');
		document.querySelector('.select-icon i').classList.value = 'fas fa-circle';

		document.querySelector('#icon_value').value = '';
	});





})(window);
