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


/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
	var headerMarkup = '<div class="aim-modal--header"><div class="aim-modal--header-logo-area"><span class="aim-modal--header-logo-title">Aesthetic Icon Picker</span></div><div class="aim-modal--header-close-btn"><i class="fas fa-times" title="Close"></i></div></div>';

	var aestheticWrap = '<div class="aim-modal aim-close" id="aim-modal"><div class="aim-modal--content"><div class="aim-modal--header"><div class="aim-modal--header-logo-area"><span class="aim-modal--header-logo-title">Aesthetic Icon Picker</span></div><div class="aim-modal--header-close-btn"><i class="fas fa-times" title="Close"></i></div></div><div class="aim-modal--body"><div id="aim-modal--sidebar" class="aim-modal--sidebar"><div class="aim-modal--sidebar-tabs"></div></div><div id="aim-modal--icon-preview-wrap" class="aim-modal--icon-preview-wrap"><div class="aim-modal--icon-search"><input name="" value="" placeholder="Filter by name..."><i class="fas fa-search"></i></div><div class="aim-modal--icon-preview-inner"><div id="aim-modal--icon-preview"></div></div></div></div><div class="aim-modal--footer"><button class="aim-insert-icon-button">Insert</button></div></div></div>';

	function createDomEle(string) {
		var ele = document.createElement('div');
		ele.innerHTML = string;
		return ele.firstChild;
	}

	var aestheticDomEle = createDomEle(aestheticWrap);

	console.log(aestheticDomEle);

	document.querySelector('#icon-picker-wrap').addEventListener('click', applyAestheticDom )

	function applyAestheticDom(e) {

		// e.currentTarget.appendChild(aestheticDomEle);

		console.log( e.currentTarget.querySelector('.aim-modal') );


		if( null == e.currentTarget.querySelector('.aim-modal') ){
			e.currentTarget.appendChild(aestheticDomEle);
		}

		var newIcon = {
			"material":{
				"regular":{
					"list-icon":"",
					"icon-style":"mt-regular",
					"icons":["some","some2"],
				}
			}
		}

		// console.log(typeof miniFontAresome);
		// console.log(typeof Object.assign(miniFontAresome,newIcon));
		// console.log(Object.assign(miniFontAresome,newIcon));

		var sideBarList = [
			{
				"title": "all icons",
				"list-icon": "fas fa-star-of-life",
				"library-id": "all",
			}
		];

		function getLibraryName(string) {
			return string.replace("-", " ")
		}

		function setSideBarList(library,object) {
			object.forEach(function (item, index) {
				var listItem = {
					"title": library + ' - ' + item[0],
					"list-icon": item[1]['list-icon'].length ? item[1]['list-icon'] : "far fa-dot-circle",
					"library-id": item[1]['icon-style'].length ? item[1]['icon-style'] : "all",
				};
				sideBarList.push( listItem )
			});
		}

		function sideBarListMarkup(sideBarList) {
			var markup = '';
			sideBarList.forEach(function (item, index) {
				if ('all' !== item['library-id']) {
					markup += '<div class="aim-modal--sidebar-tab-item" data-library-id="'+item['library-id']+'"><i class="'+item['list-icon']+'"></i>'+item['title']+'</div>';
				}else{
					markup += '<div class="aim-modal--sidebar-tab-item aesthetic-active" data-library-id="'+item['library-id']+'"><i class="'+item['list-icon']+'"></i>'+item['title']+'</div>';
				}
			});

			return markup;
		}

		function iconItemMarkup(libraryItem) {
			var markup = '',
				library = libraryItem['icon-style'],
				prefix = libraryItem['prefix'],
				brand2 = '';

			libraryItem['icons'].forEach(function (item, index) {
				markup += '<div class="aim-icon-item" data-library="' + library + ' all" data-filter="' + item.replace(prefix, "") + '"><div class="aim-icon-item-inner"><i class="' + item + '"></i><div class="aim-icon-item-name" title="' + item.replace(prefix, "") + '">' + item.replace(prefix, "").replace("-", " ") + '</div></div></div>';
			})

			return markup;
		}

		var iconMarkup = '';

		Object.entries(miniFontAresome).forEach(function (item, index) {

			var libraryName = getLibraryName(item[0]);
			// console.log( item[1], index, libraryName, Object.keys( item[1] ));
			setSideBarList(libraryName, Object.entries( item[1] ));

			Object.entries(item[1]).forEach(function (item, index) {
				// console.log( item[1], index );
				// console.log( iconItemMarkup(item[1]) );
				iconMarkup += iconItemMarkup(item[1])
				// var cls = prefix + key;
				// iconMarkup += iconItem(iconPackKey[0], cls, key);
			});

		});

		var sidebarTabs = document.querySelector('.aim-modal--sidebar-tabs');
		sidebarTabs.innerHTML = sideBarListMarkup(sideBarList);

		var wrapper = document.querySelector('#aim-modal--icon-preview');
		wrapper.innerHTML = iconMarkup;







		var searchInput = document.querySelector('.aim-modal--icon-search input');
		var icon = document.querySelectorAll('#aim-modal--icon-preview i');
		var iconWrap = document.querySelectorAll('.aim-icon-item');
		searchInput.addEventListener('keyup', debounce(searchFunc, 100));
		// searchInput.addEventListener('keyup', searchFunc );

		function searchFunc(e) {
			console.log(this.value.toLowerCase());

			var searchText = this.value.toLowerCase();
			filterFunc(iconWrap, searchText, 'filter');

		}

		function filterFunc(filterItems, filterText, dataName) {

			Object.entries(filterItems).filter(function (item, index) {
				// console.log(item[1].dataset[dataName]);
				if (-1 == item[1].dataset[dataName].indexOf(filterText)) {
					item[1].setAttribute('style', 'display: none;');
				} else {
					item[1].removeAttribute('style');
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

	} //aestheticDom click event end

// console.log(sideBarList);

})(window);
