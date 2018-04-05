angular.module("liberia_news_network", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ionicLazyLoad","liberia_news_network.controllers", "liberia_news_network.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Liberia News Network" ;
		$rootScope.appLogo = "" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;

		$ionicPlatform.ready(function() {
			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "liberia_news_network",
				storeName : "liberia_news_network",
				description : "The offline datastore for Liberia News Network app"
			});



			//required: cordova plugin add onesignal-cordova-plugin --save
			if(window.plugins && window.plugins.OneSignal){
				window.plugins.OneSignal.enableNotificationsWhenActive(true);
				var notificationOpenedCallback = function(jsonData){
					try {
						$timeout(function(){
							$window.location = "#/liberia_news_network/" + jsonData.notification.payload.additionalData.page ;
						},200);
					} catch(e){
						console.log("onesignal:" + e);
					}
				}
				window.plugins.OneSignal.startInit("d52a6f44-5ec9-474d-a9c9-bd3c11f6c359").handleNotificationOpened(notificationOpenedCallback).endInit();
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("liberia_news_network.home");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})


.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("liberia_news_network",{
		url: "/liberia_news_network",
			abstract: true,
			templateUrl: "templates/liberia_news_network-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("liberia_news_network.about_us", {
		url: "/about_us",
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.c_liberia_clearl_singles", {
		url: "/c_liberia_clearl_singles/:id",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-c_liberia_clearl_singles.html",
						controller: "c_liberia_clearl_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.c_liberia_clearly", {
		url: "/c_liberia_clearly",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-c_liberia_clearly.html",
						controller: "c_liberia_clearlyCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.dashboard", {
		url: "/dashboard",
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.front_page_afric_singles", {
		url: "/front_page_afric_singles/:id",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-front_page_afric_singles.html",
						controller: "front_page_afric_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.front_page_africa", {
		url: "/front_page_africa",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-front_page_africa.html",
						controller: "front_page_africaCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.gnn_liberia", {
		url: "/gnn_liberia",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-gnn_liberia.html",
						controller: "gnn_liberiaCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.gnn_liberia_singles", {
		url: "/gnn_liberia_singles/:id",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-gnn_liberia_singles.html",
						controller: "gnn_liberia_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.home", {
		url: "/home",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-home.html",
						controller: "homeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.kmtv", {
		url: "/kmtv",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-kmtv.html",
						controller: "kmtvCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.kmtv_singles", {
		url: "/kmtv_singles/:id",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-kmtv_singles.html",
						controller: "kmtv_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.kool_online", {
		url: "/kool_online",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-kool_online.html",
						controller: "kool_onlineCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.kool_online_singles", {
		url: "/kool_online_singles/:id",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-kool_online_singles.html",
						controller: "kool_online_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.liberia_stars_vi_singles", {
		url: "/liberia_stars_vi_singles/:id",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-liberia_stars_vi_singles.html",
						controller: "liberia_stars_vi_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.liberian_observer", {
		url: "/liberian_observer",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-liberian_observer.html",
						controller: "liberian_observerCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.liberian_stars_views", {
		url: "/liberian_stars_views",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-liberian_stars_views.html",
						controller: "liberian_stars_viewsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.news_category", {
		url: "/news_category",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-news_category.html",
						controller: "news_categoryCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.news_posts_bookmark", {
		url: "/news_posts_bookmark",
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-news_posts_bookmark.html",
						controller: "news_posts_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.observer_singles", {
		url: "/observer_singles/:id",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-observer_singles.html",
						controller: "observer_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.settings", {
		url: "/settings",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-settings.html",
						controller: "settingsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.test", {
		url: "/test",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-test.html",
						controller: "testCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.the_bush_chicken", {
		url: "/the_bush_chicken",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-the_bush_chicken.html",
						controller: "the_bush_chickenCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.the_bush_chicken_singles", {
		url: "/the_bush_chicken_singles/:id",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-the_bush_chicken_singles.html",
						controller: "the_bush_chicken_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.the_new_democrat", {
		url: "/the_new_democrat",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-the_new_democrat.html",
						controller: "the_new_democratCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.the_new_democrat_singles", {
		url: "/the_new_democrat_singles/:id",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-the_new_democrat_singles.html",
						controller: "the_new_democrat_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.the_news_lib", {
		url: "/the_news_lib",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-the_news_lib.html",
						controller: "the_news_libCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("liberia_news_network.the_news_lib_singles", {
		url: "/the_news_lib_singles/:id",
		cache:false,
		views: {
			"liberia_news_network-side_menus" : {
						templateUrl:"templates/liberia_news_network-the_news_lib_singles.html",
						controller: "the_news_lib_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})


// router by user


	$urlRouterProvider.otherwise("/liberia_news_network/home");
});
