angular.module("liberia_news_network.controllers", [])



// TODO: indexCtrl --|-- 
.controller("indexCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	// TODO: indexCtrl --|-- $rootScope.exitApp
	$rootScope.exitApp = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: "Confirm Exit",
			template: "Are you sure you want to exit?"
		});
		confirmPopup.then(function (close){
			if(close){
				ionic.Platform.exitApp();
			}
			$rootScope.closeMenuPopover();
		});
	};
	
	// TODO: indexCtrl --|-- $rootScope.changeLanguage
	$rootScope.changeLanguage = function(langKey){
		if(typeof langKey !== null){
			$translate.use(langKey);
			tmhDynamicLocale.set(langKey);
			try {
				$rootScope.language_option = langKey;
				localforage.setItem("language_option",langKey);
			}catch(e){
				localforage.setItem("language_option","en-us");
			}
		}
	};
	
	// TODO: indexCtrl --|-- $rootScope.showLanguageDialog
	var modal_language = "";
	modal_language += "<ion-modal-view>";
	modal_language += "<ion-header-bar class=\"bar bar-header bar-assertive-900\">";
	modal_language += "<h1 class=\"title\">{{ 'Language' | translate }}</h1>";
	modal_language += "</ion-header-bar>";
	modal_language += "<ion-content class=\"padding\">";
	modal_language += "<div class=\"list\">";
	modal_language += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"language_option\" ng-value=\"'en-us'\" ng-click=\"tryChangeLanguage('en-us')\">English - US</ion-radio>";
	modal_language += "<button class=\"button button-full button-assertive-900\" ng-click=\"closeLanguageDialog()\">{{ 'Close' | translate }}</button>";
	modal_language += "</div>";
	modal_language += "</ion-content>";
	modal_language += "</ion-modal-view>";
	
	$rootScope.languageDialog = $ionicModal.fromTemplate(modal_language,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showLanguageDialog = function(){
		$rootScope.languageDialog.show();
		localforage.getItem("language_option", function(err, value){
			$rootScope.language_option = value;
		}).then(function(value){
			$rootScope.language_option = value;
		}).catch(function (err){
			$rootScope.language_option = "en-us";
		})
	};
	
	$rootScope.closeLanguageDialog = function(){
		$rootScope.languageDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	$rootScope.tryChangeLanguage = function(langKey){
		$rootScope.changeLanguage(langKey);
	};
	
	localforage.getItem("language_option", function(err, value){
		if(value === null){
			localforage.setItem("language_option","en-us");
		}else{
			$rootScope.changeLanguage(value);
		}
	}).then(function(value){
		if(value === null){
			localforage.setItem("language_option","en-us");
		}else{
			$rootScope.changeLanguage(value);
		}
	}).catch(function (err){
		localforage.setItem("language_option","en-us");
	})
	// TODO: indexCtrl --|-- $rootScope.changeFontSize
	$rootScope.changeFontSize = function(fontSize){
		if(typeof fontSize !== null){
			try {
				$rootScope.fontsize_option = $rootScope.fontsize = fontSize;
				localforage.setItem("fontsize_option",fontSize);
			}catch(e){
				localforage.setItem("fontsize_option","normal");
			}
		}
	};
	
	// TODO: indexCtrl --|-- $rootScope.showFontSizeDialog
	var modal_fontsize = "";
	modal_fontsize += "<ion-modal-view>";
	modal_fontsize += "<ion-header-bar class=\"bar bar-header bar-assertive-900\">";
	modal_fontsize += "<h1 class=\"title\">{{ 'Font Size' | translate }}</h1>";
	modal_fontsize += "</ion-header-bar>";
	modal_fontsize += "<ion-content class=\"padding\">";
	modal_fontsize += "<div class=\"list\">";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'small'\" ng-click=\"tryChangeFontSize('small');\">{{ 'Small' | translate }}</ion-radio>";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'normal'\" ng-click=\"tryChangeFontSize('normal');\">{{ 'Normal' | translate }}</ion-radio>";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'large'\" ng-click=\"tryChangeFontSize('large');\">{{ 'Large' | translate }}</ion-radio>";
	modal_fontsize += "<button class=\"button button-full button-assertive-900\" ng-click=\"closeFontSizeDialog()\">{{ 'Close' | translate }}</button>";
	modal_fontsize += "</div>";
	modal_fontsize += "</ion-content>";
	modal_fontsize += "</ion-modal-view>";
	
	$rootScope.fontSizeDialog = $ionicModal.fromTemplate(modal_fontsize,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showFontSizeDialog = function(){
		$rootScope.fontSizeDialog.show();
		localforage.getItem("fontsize_option", function(err, value){
			$rootScope.fontsize_option = $rootScope.fontsize = value;
		}).then(function(value){
			$rootScope.fontsize_option = $rootScope.fontsize = value;
		}).catch(function (err){
			$rootScope.fontsize_option = $rootScope.fontsize = "normal";
		})
	};
	
	$rootScope.closeFontSizeDialog = function(){
		$rootScope.fontSizeDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	localforage.getItem("fontsize_option", function(err, value){
		if(value === null){
			localforage.setItem("fontsize_option","normal");
		}else{
			$rootScope.changeFontSize(value);
		}
	}).then(function(value){
		if(value === null){
			localforage.setItem("fontsize_option","normal");
		}else{
			$rootScope.changeFontSize(value);
		}
	}).catch(function (err){
		console.log(err);
		localforage.setItem("fontsize_option","normal");
	})
	
	
	$rootScope.tryChangeFontSize = function(val){
		$rootScope.changeFontSize(val);
	};
	
	// TODO: indexCtrl --|-- $rootScope.modal_notification
	var modal_notification = "";
	$rootScope.disable_notification_option = false;
	modal_notification += "<ion-modal-view>";
	modal_notification += "<ion-header-bar class=\"bar bar-header bar-assertive-900\">";
	modal_notification += "<h1 class=\"title\">{{ 'Notifications' | translate }}</h1>";
	modal_notification += "</ion-header-bar>";
	modal_notification += "<ion-content class=\"\">";
	modal_notification += "<div class=\"list\">";
	modal_notification += "<ion-toggle ng-model=\"disable_notification_option\"  ng-click=\"tryChangeNotification(disable_notification_option)\">";
	modal_notification += "{{ 'Disable Alerts' | translate }}";
	modal_notification += "</ion-toggle>";
	modal_notification += "<div class=\"item\">";
	modal_notification += "<button class=\"button button-full button-assertive-900\" ng-click=\"closeNotificationDialog()\">{{ 'Close' | translate }}</button>";
	modal_notification += "</div>";
	modal_notification += "</div>";
	modal_notification += "</ion-content>";
	modal_notification += "</ion-modal-view>";
	
	$rootScope.notificationDialog = $ionicModal.fromTemplate(modal_notification,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showNotificationDialog = function(){
		get_notification();
		$rootScope.notificationDialog.show();
	};
	
	$rootScope.closeNotificationDialog = function(){
		$rootScope.notificationDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	var get_notification =  function(){
		localforage.getItem("disable_notification_option", function(err, value){
			var notification_value = false ;
			if(value === null){
				notification_value = false ;
			}
			if(value === true){
				notification_value = true ;
			}else{
				notification_value = false ;
			}
			localforage.setItem("disable_notification_option",notification_value);
			$rootScope.disable_notification_option = notification_value ;
		}).then(function(value){
			var notification_value = false ;
			if(value === null){
				notification_value = false ;
			}
			if(value === true){
				notification_value = true ;
			}else{
				notification_value = false ;
			}
			localforage.setItem("disable_notification_option",notification_value);
			$rootScope.disable_notification_option = notification_value ;
		}).catch(function (err){
			localforage.setItem("disable_notification_option",false);
			$rootScope.disable_notification_option = false ;
		})
	
	}
	
	get_notification();
	
	
	$rootScope.tryChangeNotification = function(val){
		$rootScope.changeNotification(val);
	};
	
	
	$rootScope.changeNotification = function(val){
		$rootScope.disable_notification_option = val;
		localforage.setItem("disable_notification_option",val);
	};
	
	
	$scope.$watch("disable_notification_option", function (newValue, oldValue, scope) {
		if(window.plugins && window.plugins.OneSignal){
			if(newValue == true){
				window.plugins.OneSignal.setSubscription(false);
			}else{
				window.plugins.OneSignal.setSubscription(true);
			}
		}
	});
	
	// TODO: indexCtrl --|-- $rootScope.clearCacheApp
	$rootScope.clearCacheApp = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: "Confirm",
			template: "Are you sure you want to clear cache?"
		});
		confirmPopup.then(function (close){
			if(close){
				localforage.keys().then(function(keys) {
					for(var e = 0; e < keys.length ; e++) {
						localforage.setItem(keys[e],[]);
					}
					$state.go("liberia_news_network.home");
				}).catch(function(err) {
					$state.go("liberia_news_network.home");
				});
			}
			$rootScope.closeMenuPopover();
		});
	};
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: indexCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: indexCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: indexCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: indexCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: indexCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: indexCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: indexCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `index` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: side_menusCtrl --|-- 
.controller("side_menusCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: side_menusCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: side_menusCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: side_menusCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: side_menusCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: side_menusCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: side_menusCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: side_menusCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `side_menus` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: about_usCtrl --|-- 
.controller("about_usCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: about_usCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: about_usCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: about_usCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: about_usCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: about_usCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: about_usCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: about_usCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `about_us` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: c_liberia_clearl_singlesCtrl --|-- 
.controller("c_liberia_clearl_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (c_liberia_clearl)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: c_liberia_clearl_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: c_liberia_clearl_singlesCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: c_liberia_clearl_singlesCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: c_liberia_clearl_singlesCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: c_liberia_clearl_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: c_liberia_clearl_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: c_liberia_clearl_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: c_liberia_clearl_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=19&_embed=true&per_page=20";
	// TODO: c_liberia_clearl_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=19&_embed=true&per_page=20&callback=JSON_CALLBACK";
	// TODO: c_liberia_clearl_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_c_liberia_clearls_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.c_liberia_clearl = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: c_liberia_clearl_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: c_liberia_clearl_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_c_liberia_clearls_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.c_liberia_clearl = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: c_liberia_clearl_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: c_liberia_clearl_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: c_liberia_clearl_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_c_liberia_clearls_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: c_liberia_clearl_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: c_liberia_clearl_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_c_liberia_clearls_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.c_liberia_clearl = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.c_liberia_clearl = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: c_liberia_clearl_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `c_liberia_clearl_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: c_liberia_clearlyCtrl --|-- 
.controller("c_liberia_clearlyCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (c_liberia_clearl)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: c_liberia_clearlyCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: c_liberia_clearlyCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: c_liberia_clearlyCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: c_liberia_clearlyCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: c_liberia_clearlyCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: c_liberia_clearlyCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: c_liberia_clearlyCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url C Liberia Clearly
	targetQuery = "categories=19"; //default param
	raplaceWithQuery = "categories=19";
	
	
	// TODO: c_liberia_clearlyCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: c_liberia_clearlyCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=19&_embed=true&per_page=20";
	// TODO: c_liberia_clearlyCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=19&_embed=true&per_page=20&callback=JSON_CALLBACK";
	// TODO: c_liberia_clearlyCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_c_liberia_clearls = [];
	
	localforage.getItem("data_c_liberia_clearls_" + $scope.hashURL, function(err, get_c_liberia_clearls){
		if(get_c_liberia_clearls === null){
			data_c_liberia_clearls =[];
		}else{
			data_c_liberia_clearls = JSON.parse(get_c_liberia_clearls);
			$scope.data_c_liberia_clearls =JSON.parse( get_c_liberia_clearls);
			$scope.c_liberia_clearls = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_c_liberia_clearls[lastPush])){
					$scope.c_liberia_clearls.push(data_c_liberia_clearls[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_c_liberia_clearls === null ){
		data_c_liberia_clearls =[];
	}
	if(data_c_liberia_clearls.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: c_liberia_clearlyCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_c_liberia_clearls = response.data;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_c_liberia_clearls);
				$scope.data_c_liberia_clearls = response.data;
				// TODO: c_liberia_clearlyCtrl --|---------- set:localforage
				localforage.setItem("data_c_liberia_clearls_" + $scope.hashURL, JSON.stringify(data_c_liberia_clearls));
				$scope.c_liberia_clearls = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_c_liberia_clearls[lastPush])){
						$scope.c_liberia_clearls.push(data_c_liberia_clearls[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: c_liberia_clearlyCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_c_liberia_clearls = data;
						$scope.data_c_liberia_clearls = data;
						$ionicLoading.hide();
						// TODO: c_liberia_clearlyCtrl --|---------- set:localforage
						localforage.setItem("data_c_liberia_clearls_" + $scope.hashURL,JSON.stringify(data_c_liberia_clearls));
						controller_by_user();
						$scope.c_liberia_clearls = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_c_liberia_clearls[lastPush])){
								$scope.c_liberia_clearls.push(data_c_liberia_clearls[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: c_liberia_clearlyCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: c_liberia_clearlyCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: c_liberia_clearlyCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: c_liberia_clearlyCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_c_liberia_clearls = response.data;
			$scope.data_c_liberia_clearls = response.data;
			// TODO: c_liberia_clearlyCtrl --|---------- set:localforage
			localforage.setItem("data_c_liberia_clearls_" + $scope.hashURL,JSON.stringify(data_c_liberia_clearls));
			$scope.c_liberia_clearls = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_c_liberia_clearls[lastPush])){
					$scope.c_liberia_clearls.push(data_c_liberia_clearls[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: c_liberia_clearlyCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_c_liberia_clearls = data;
					$scope.data_c_liberia_clearls = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: c_liberia_clearlyCtrl --|---------- set:localforage
					localforage.setItem("data_c_liberia_clearls_"+ $scope.hashURL,JSON.stringify(data_c_liberia_clearls));
					$scope.c_liberia_clearls = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_c_liberia_clearls[lastPush])){
							$scope.c_liberia_clearls.push(data_c_liberia_clearls[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: c_liberia_clearlyCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: c_liberia_clearlyCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_c_liberia_clearls === null){
		data_c_liberia_clearls = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_c_liberia_clearls[lastPush])){
				$scope.c_liberia_clearls.push(data_c_liberia_clearls[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: c_liberia_clearlyCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_c_liberia_clearls);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `c_liberia_clearly` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: dashboardCtrl --|-- 
.controller("dashboardCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: dashboardCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: dashboardCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: dashboardCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: dashboardCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: dashboardCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: dashboardCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: dashboardCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `dashboard` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: front_page_afric_singlesCtrl --|-- 
.controller("front_page_afric_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (front_page_afric)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: front_page_afric_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: front_page_afric_singlesCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: front_page_afric_singlesCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: front_page_afric_singlesCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: front_page_afric_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: front_page_afric_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: front_page_afric_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: front_page_afric_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=14&per_page=30";
	// TODO: front_page_afric_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=14&per_page=30&callback=JSON_CALLBACK";
	// TODO: front_page_afric_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_front_page_africs_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.front_page_afric = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: front_page_afric_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: front_page_afric_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_front_page_africs_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.front_page_afric = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: front_page_afric_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: front_page_afric_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: front_page_afric_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_front_page_africs_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: front_page_afric_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: front_page_afric_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_front_page_africs_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.front_page_afric = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.front_page_afric = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: front_page_afric_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `front_page_afric_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: front_page_africaCtrl --|-- 
.controller("front_page_africaCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (front_page_afric)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: front_page_africaCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: front_page_africaCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: front_page_africaCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: front_page_africaCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: front_page_africaCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: front_page_africaCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: front_page_africaCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url  
	targetQuery = "categories=14"; //default param
	raplaceWithQuery = "categories=14";
	
	
	// TODO: front_page_africaCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: front_page_africaCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=14&per_page=30";
	// TODO: front_page_africaCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=14&per_page=30&callback=JSON_CALLBACK";
	// TODO: front_page_africaCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_front_page_africs = [];
	
	localforage.getItem("data_front_page_africs_" + $scope.hashURL, function(err, get_front_page_africs){
		if(get_front_page_africs === null){
			data_front_page_africs =[];
		}else{
			data_front_page_africs = JSON.parse(get_front_page_africs);
			$scope.data_front_page_africs =JSON.parse( get_front_page_africs);
			$scope.front_page_africs = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_front_page_africs[lastPush])){
					$scope.front_page_africs.push(data_front_page_africs[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_front_page_africs === null ){
		data_front_page_africs =[];
	}
	if(data_front_page_africs.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: front_page_africaCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_front_page_africs = response.data;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_front_page_africs);
				$scope.data_front_page_africs = response.data;
				// TODO: front_page_africaCtrl --|---------- set:localforage
				localforage.setItem("data_front_page_africs_" + $scope.hashURL, JSON.stringify(data_front_page_africs));
				$scope.front_page_africs = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_front_page_africs[lastPush])){
						$scope.front_page_africs.push(data_front_page_africs[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: front_page_africaCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_front_page_africs = data;
						$scope.data_front_page_africs = data;
						$ionicLoading.hide();
						// TODO: front_page_africaCtrl --|---------- set:localforage
						localforage.setItem("data_front_page_africs_" + $scope.hashURL,JSON.stringify(data_front_page_africs));
						controller_by_user();
						$scope.front_page_africs = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_front_page_africs[lastPush])){
								$scope.front_page_africs.push(data_front_page_africs[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: front_page_africaCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: front_page_africaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: front_page_africaCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: front_page_africaCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_front_page_africs = response.data;
			$scope.data_front_page_africs = response.data;
			// TODO: front_page_africaCtrl --|---------- set:localforage
			localforage.setItem("data_front_page_africs_" + $scope.hashURL,JSON.stringify(data_front_page_africs));
			$scope.front_page_africs = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_front_page_africs[lastPush])){
					$scope.front_page_africs.push(data_front_page_africs[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: front_page_africaCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_front_page_africs = data;
					$scope.data_front_page_africs = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: front_page_africaCtrl --|---------- set:localforage
					localforage.setItem("data_front_page_africs_"+ $scope.hashURL,JSON.stringify(data_front_page_africs));
					$scope.front_page_africs = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_front_page_africs[lastPush])){
							$scope.front_page_africs.push(data_front_page_africs[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: front_page_africaCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: front_page_africaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_front_page_africs === null){
		data_front_page_africs = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_front_page_africs[lastPush])){
				$scope.front_page_africs.push(data_front_page_africs[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: front_page_africaCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_front_page_africs);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `front_page_africa` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: gnn_liberiaCtrl --|-- 
.controller("gnn_liberiaCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (gnn_liberia)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: gnn_liberiaCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: gnn_liberiaCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: gnn_liberiaCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: gnn_liberiaCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: gnn_liberiaCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: gnn_liberiaCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: gnn_liberiaCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	
	// TODO: gnn_liberiaCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: gnn_liberiaCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://gnnliberia.com/wp-json/wp/v2/posts?&_embed=true&per_page=30";
	// TODO: gnn_liberiaCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://gnnliberia.com/wp-json/wp/v2/posts?&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: gnn_liberiaCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_gnn_liberias = [];
	
	localforage.getItem("data_gnn_liberias_" + $scope.hashURL, function(err, get_gnn_liberias){
		if(get_gnn_liberias === null){
			data_gnn_liberias =[];
		}else{
			data_gnn_liberias = JSON.parse(get_gnn_liberias);
			$scope.data_gnn_liberias =JSON.parse( get_gnn_liberias);
			$scope.gnn_liberias = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_gnn_liberias[lastPush])){
					$scope.gnn_liberias.push(data_gnn_liberias[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_gnn_liberias === null ){
		data_gnn_liberias =[];
	}
	if(data_gnn_liberias.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: gnn_liberiaCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_gnn_liberias = response.data;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_gnn_liberias);
				$scope.data_gnn_liberias = response.data;
				// TODO: gnn_liberiaCtrl --|---------- set:localforage
				localforage.setItem("data_gnn_liberias_" + $scope.hashURL, JSON.stringify(data_gnn_liberias));
				$scope.gnn_liberias = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_gnn_liberias[lastPush])){
						$scope.gnn_liberias.push(data_gnn_liberias[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: gnn_liberiaCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_gnn_liberias = data;
						$scope.data_gnn_liberias = data;
						$ionicLoading.hide();
						// TODO: gnn_liberiaCtrl --|---------- set:localforage
						localforage.setItem("data_gnn_liberias_" + $scope.hashURL,JSON.stringify(data_gnn_liberias));
						controller_by_user();
						$scope.gnn_liberias = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_gnn_liberias[lastPush])){
								$scope.gnn_liberias.push(data_gnn_liberias[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: gnn_liberiaCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: gnn_liberiaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: gnn_liberiaCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: gnn_liberiaCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_gnn_liberias = response.data;
			$scope.data_gnn_liberias = response.data;
			// TODO: gnn_liberiaCtrl --|---------- set:localforage
			localforage.setItem("data_gnn_liberias_" + $scope.hashURL,JSON.stringify(data_gnn_liberias));
			$scope.gnn_liberias = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_gnn_liberias[lastPush])){
					$scope.gnn_liberias.push(data_gnn_liberias[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: gnn_liberiaCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_gnn_liberias = data;
					$scope.data_gnn_liberias = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: gnn_liberiaCtrl --|---------- set:localforage
					localforage.setItem("data_gnn_liberias_"+ $scope.hashURL,JSON.stringify(data_gnn_liberias));
					$scope.gnn_liberias = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_gnn_liberias[lastPush])){
							$scope.gnn_liberias.push(data_gnn_liberias[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: gnn_liberiaCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: gnn_liberiaCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_gnn_liberias === null){
		data_gnn_liberias = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_gnn_liberias[lastPush])){
				$scope.gnn_liberias.push(data_gnn_liberias[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: gnn_liberiaCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_gnn_liberias);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `gnn_liberia` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: gnn_liberia_singlesCtrl --|-- 
.controller("gnn_liberia_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (gnn_liberia)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://gnnliberia.com/wp-json/wp/v2/posts?&_embed=true&per_page=30";
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://gnnliberia.com/wp-json/wp/v2/posts?&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: gnn_liberia_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_gnn_liberias_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.gnn_liberia = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: gnn_liberia_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: gnn_liberia_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_gnn_liberias_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.gnn_liberia = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: gnn_liberia_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: gnn_liberia_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: gnn_liberia_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_gnn_liberias_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: gnn_liberia_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: gnn_liberia_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_gnn_liberias_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.gnn_liberia = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.gnn_liberia = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: gnn_liberia_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `gnn_liberia_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: homeCtrl --|-- 
.controller("homeCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: homeCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: homeCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: homeCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: homeCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: homeCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: homeCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: homeCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `home` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: kmtvCtrl --|-- 
.controller("kmtvCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (kmtv)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: kmtvCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: kmtvCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: kmtvCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: kmtvCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: kmtvCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: kmtvCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: kmtvCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	
	// TODO: kmtvCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: kmtvCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://kmtvliberia.com/wp-json/wp/v2/posts?&_embed=true&per_page=30";
	// TODO: kmtvCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://kmtvliberia.com/wp-json/wp/v2/posts?&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: kmtvCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_kmtvs = [];
	
	localforage.getItem("data_kmtvs_" + $scope.hashURL, function(err, get_kmtvs){
		if(get_kmtvs === null){
			data_kmtvs =[];
		}else{
			data_kmtvs = JSON.parse(get_kmtvs);
			$scope.data_kmtvs =JSON.parse( get_kmtvs);
			$scope.kmtvs = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_kmtvs[lastPush])){
					$scope.kmtvs.push(data_kmtvs[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_kmtvs === null ){
		data_kmtvs =[];
	}
	if(data_kmtvs.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: kmtvCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_kmtvs = response.data;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_kmtvs);
				$scope.data_kmtvs = response.data;
				// TODO: kmtvCtrl --|---------- set:localforage
				localforage.setItem("data_kmtvs_" + $scope.hashURL, JSON.stringify(data_kmtvs));
				$scope.kmtvs = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_kmtvs[lastPush])){
						$scope.kmtvs.push(data_kmtvs[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: kmtvCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_kmtvs = data;
						$scope.data_kmtvs = data;
						$ionicLoading.hide();
						// TODO: kmtvCtrl --|---------- set:localforage
						localforage.setItem("data_kmtvs_" + $scope.hashURL,JSON.stringify(data_kmtvs));
						controller_by_user();
						$scope.kmtvs = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_kmtvs[lastPush])){
								$scope.kmtvs.push(data_kmtvs[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: kmtvCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: kmtvCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: kmtvCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: kmtvCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_kmtvs = response.data;
			$scope.data_kmtvs = response.data;
			// TODO: kmtvCtrl --|---------- set:localforage
			localforage.setItem("data_kmtvs_" + $scope.hashURL,JSON.stringify(data_kmtvs));
			$scope.kmtvs = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_kmtvs[lastPush])){
					$scope.kmtvs.push(data_kmtvs[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: kmtvCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_kmtvs = data;
					$scope.data_kmtvs = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: kmtvCtrl --|---------- set:localforage
					localforage.setItem("data_kmtvs_"+ $scope.hashURL,JSON.stringify(data_kmtvs));
					$scope.kmtvs = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_kmtvs[lastPush])){
							$scope.kmtvs.push(data_kmtvs[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: kmtvCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: kmtvCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_kmtvs === null){
		data_kmtvs = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_kmtvs[lastPush])){
				$scope.kmtvs.push(data_kmtvs[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: kmtvCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_kmtvs);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `kmtv` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: kmtv_singlesCtrl --|-- 
.controller("kmtv_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (kmtv)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: kmtv_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: kmtv_singlesCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: kmtv_singlesCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: kmtv_singlesCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: kmtv_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: kmtv_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: kmtv_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: kmtv_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://kmtvliberia.com/wp-json/wp/v2/posts?&_embed=true&per_page=30";
	// TODO: kmtv_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://kmtvliberia.com/wp-json/wp/v2/posts?&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: kmtv_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_kmtvs_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.kmtv = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: kmtv_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: kmtv_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_kmtvs_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.kmtv = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: kmtv_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: kmtv_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: kmtv_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_kmtvs_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: kmtv_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: kmtv_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_kmtvs_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.kmtv = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.kmtv = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: kmtv_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `kmtv_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: kool_onlineCtrl --|-- 
.controller("kool_onlineCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (kool_online)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: kool_onlineCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: kool_onlineCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: kool_onlineCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: kool_onlineCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: kool_onlineCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: kool_onlineCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: kool_onlineCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	
	// TODO: kool_onlineCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: kool_onlineCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://www.koolonline2.com/wp-json/wp/v2/posts?&_embed=true&per_page=20";
	// TODO: kool_onlineCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://www.koolonline2.com/wp-json/wp/v2/posts?&_embed=true&per_page=20&callback=JSON_CALLBACK";
	// TODO: kool_onlineCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_kool_onlines = [];
	
	localforage.getItem("data_kool_onlines_" + $scope.hashURL, function(err, get_kool_onlines){
		if(get_kool_onlines === null){
			data_kool_onlines =[];
		}else{
			data_kool_onlines = JSON.parse(get_kool_onlines);
			$scope.data_kool_onlines =JSON.parse( get_kool_onlines);
			$scope.kool_onlines = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_kool_onlines[lastPush])){
					$scope.kool_onlines.push(data_kool_onlines[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_kool_onlines === null ){
		data_kool_onlines =[];
	}
	if(data_kool_onlines.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: kool_onlineCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_kool_onlines = response.data;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_kool_onlines);
				$scope.data_kool_onlines = response.data;
				// TODO: kool_onlineCtrl --|---------- set:localforage
				localforage.setItem("data_kool_onlines_" + $scope.hashURL, JSON.stringify(data_kool_onlines));
				$scope.kool_onlines = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_kool_onlines[lastPush])){
						$scope.kool_onlines.push(data_kool_onlines[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: kool_onlineCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_kool_onlines = data;
						$scope.data_kool_onlines = data;
						$ionicLoading.hide();
						// TODO: kool_onlineCtrl --|---------- set:localforage
						localforage.setItem("data_kool_onlines_" + $scope.hashURL,JSON.stringify(data_kool_onlines));
						controller_by_user();
						$scope.kool_onlines = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_kool_onlines[lastPush])){
								$scope.kool_onlines.push(data_kool_onlines[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: kool_onlineCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: kool_onlineCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: kool_onlineCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: kool_onlineCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_kool_onlines = response.data;
			$scope.data_kool_onlines = response.data;
			// TODO: kool_onlineCtrl --|---------- set:localforage
			localforage.setItem("data_kool_onlines_" + $scope.hashURL,JSON.stringify(data_kool_onlines));
			$scope.kool_onlines = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_kool_onlines[lastPush])){
					$scope.kool_onlines.push(data_kool_onlines[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: kool_onlineCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_kool_onlines = data;
					$scope.data_kool_onlines = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: kool_onlineCtrl --|---------- set:localforage
					localforage.setItem("data_kool_onlines_"+ $scope.hashURL,JSON.stringify(data_kool_onlines));
					$scope.kool_onlines = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_kool_onlines[lastPush])){
							$scope.kool_onlines.push(data_kool_onlines[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: kool_onlineCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: kool_onlineCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_kool_onlines === null){
		data_kool_onlines = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_kool_onlines[lastPush])){
				$scope.kool_onlines.push(data_kool_onlines[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: kool_onlineCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_kool_onlines);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `kool_online` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: kool_online_singlesCtrl --|-- 
.controller("kool_online_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (kool_online)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: kool_online_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: kool_online_singlesCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: kool_online_singlesCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: kool_online_singlesCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: kool_online_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: kool_online_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: kool_online_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: kool_online_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://www.koolonline2.com/wp-json/wp/v2/posts?&_embed=true&per_page=20";
	// TODO: kool_online_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://www.koolonline2.com/wp-json/wp/v2/posts?&_embed=true&per_page=20&callback=JSON_CALLBACK";
	// TODO: kool_online_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_kool_onlines_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.kool_online = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: kool_online_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: kool_online_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_kool_onlines_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.kool_online = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: kool_online_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: kool_online_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: kool_online_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_kool_onlines_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: kool_online_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: kool_online_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_kool_onlines_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.kool_online = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.kool_online = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: kool_online_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `kool_online_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: liberia_stars_vi_singlesCtrl --|-- 
.controller("liberia_stars_vi_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (liberia_stars_vi)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: liberia_stars_vi_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: liberia_stars_vi_singlesCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: liberia_stars_vi_singlesCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: liberia_stars_vi_singlesCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: liberia_stars_vi_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: liberia_stars_vi_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: liberia_stars_vi_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: liberia_stars_vi_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://liberianstarsviews.com/wp-json/wp/v2/posts?&_embed=true&per_page=20";
	// TODO: liberia_stars_vi_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://liberianstarsviews.com/wp-json/wp/v2/posts?&_embed=true&per_page=20&callback=JSON_CALLBACK";
	// TODO: liberia_stars_vi_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_liberia_stars_vis_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.liberia_stars_vi = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: liberia_stars_vi_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: liberia_stars_vi_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_liberia_stars_vis_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.liberia_stars_vi = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: liberia_stars_vi_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: liberia_stars_vi_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: liberia_stars_vi_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_liberia_stars_vis_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: liberia_stars_vi_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: liberia_stars_vi_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_liberia_stars_vis_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.liberia_stars_vi = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.liberia_stars_vi = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: liberia_stars_vi_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `liberia_stars_vi_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: liberian_observerCtrl --|-- 
.controller("liberian_observerCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (observer)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: liberian_observerCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: liberian_observerCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: liberian_observerCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: liberian_observerCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: liberian_observerCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: liberian_observerCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: liberian_observerCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url  
	targetQuery = "categories=12"; //default param
	raplaceWithQuery = "categories=12";
	
	
	// TODO: liberian_observerCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: liberian_observerCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=12&_embed=true&per_page=30";
	// TODO: liberian_observerCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=12&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: liberian_observerCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_observers = [];
	
	localforage.getItem("data_observers_" + $scope.hashURL, function(err, get_observers){
		if(get_observers === null){
			data_observers =[];
		}else{
			data_observers = JSON.parse(get_observers);
			$scope.data_observers =JSON.parse( get_observers);
			$scope.observers = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_observers[lastPush])){
					$scope.observers.push(data_observers[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_observers === null ){
		data_observers =[];
	}
	if(data_observers.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: liberian_observerCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_observers = response.data;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_observers);
				$scope.data_observers = response.data;
				// TODO: liberian_observerCtrl --|---------- set:localforage
				localforage.setItem("data_observers_" + $scope.hashURL, JSON.stringify(data_observers));
				$scope.observers = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_observers[lastPush])){
						$scope.observers.push(data_observers[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: liberian_observerCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_observers = data;
						$scope.data_observers = data;
						$ionicLoading.hide();
						// TODO: liberian_observerCtrl --|---------- set:localforage
						localforage.setItem("data_observers_" + $scope.hashURL,JSON.stringify(data_observers));
						controller_by_user();
						$scope.observers = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_observers[lastPush])){
								$scope.observers.push(data_observers[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: liberian_observerCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: liberian_observerCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: liberian_observerCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: liberian_observerCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_observers = response.data;
			$scope.data_observers = response.data;
			// TODO: liberian_observerCtrl --|---------- set:localforage
			localforage.setItem("data_observers_" + $scope.hashURL,JSON.stringify(data_observers));
			$scope.observers = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_observers[lastPush])){
					$scope.observers.push(data_observers[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: liberian_observerCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_observers = data;
					$scope.data_observers = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: liberian_observerCtrl --|---------- set:localforage
					localforage.setItem("data_observers_"+ $scope.hashURL,JSON.stringify(data_observers));
					$scope.observers = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_observers[lastPush])){
							$scope.observers.push(data_observers[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: liberian_observerCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: liberian_observerCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_observers === null){
		data_observers = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_observers[lastPush])){
				$scope.observers.push(data_observers[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: liberian_observerCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_observers);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `liberian_observer` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: liberian_stars_viewsCtrl --|-- 
.controller("liberian_stars_viewsCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (liberia_stars_vi)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: liberian_stars_viewsCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: liberian_stars_viewsCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: liberian_stars_viewsCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: liberian_stars_viewsCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: liberian_stars_viewsCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: liberian_stars_viewsCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: liberian_stars_viewsCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	
	// TODO: liberian_stars_viewsCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: liberian_stars_viewsCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://liberianstarsviews.com/wp-json/wp/v2/posts?&_embed=true&per_page=20";
	// TODO: liberian_stars_viewsCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://liberianstarsviews.com/wp-json/wp/v2/posts?&_embed=true&per_page=20&callback=JSON_CALLBACK";
	// TODO: liberian_stars_viewsCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_liberia_stars_vis = [];
	
	localforage.getItem("data_liberia_stars_vis_" + $scope.hashURL, function(err, get_liberia_stars_vis){
		if(get_liberia_stars_vis === null){
			data_liberia_stars_vis =[];
		}else{
			data_liberia_stars_vis = JSON.parse(get_liberia_stars_vis);
			$scope.data_liberia_stars_vis =JSON.parse( get_liberia_stars_vis);
			$scope.liberia_stars_vis = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_liberia_stars_vis[lastPush])){
					$scope.liberia_stars_vis.push(data_liberia_stars_vis[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_liberia_stars_vis === null ){
		data_liberia_stars_vis =[];
	}
	if(data_liberia_stars_vis.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: liberian_stars_viewsCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_liberia_stars_vis = response.data;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_liberia_stars_vis);
				$scope.data_liberia_stars_vis = response.data;
				// TODO: liberian_stars_viewsCtrl --|---------- set:localforage
				localforage.setItem("data_liberia_stars_vis_" + $scope.hashURL, JSON.stringify(data_liberia_stars_vis));
				$scope.liberia_stars_vis = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_liberia_stars_vis[lastPush])){
						$scope.liberia_stars_vis.push(data_liberia_stars_vis[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: liberian_stars_viewsCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_liberia_stars_vis = data;
						$scope.data_liberia_stars_vis = data;
						$ionicLoading.hide();
						// TODO: liberian_stars_viewsCtrl --|---------- set:localforage
						localforage.setItem("data_liberia_stars_vis_" + $scope.hashURL,JSON.stringify(data_liberia_stars_vis));
						controller_by_user();
						$scope.liberia_stars_vis = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_liberia_stars_vis[lastPush])){
								$scope.liberia_stars_vis.push(data_liberia_stars_vis[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: liberian_stars_viewsCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: liberian_stars_viewsCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: liberian_stars_viewsCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: liberian_stars_viewsCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_liberia_stars_vis = response.data;
			$scope.data_liberia_stars_vis = response.data;
			// TODO: liberian_stars_viewsCtrl --|---------- set:localforage
			localforage.setItem("data_liberia_stars_vis_" + $scope.hashURL,JSON.stringify(data_liberia_stars_vis));
			$scope.liberia_stars_vis = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_liberia_stars_vis[lastPush])){
					$scope.liberia_stars_vis.push(data_liberia_stars_vis[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: liberian_stars_viewsCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_liberia_stars_vis = data;
					$scope.data_liberia_stars_vis = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: liberian_stars_viewsCtrl --|---------- set:localforage
					localforage.setItem("data_liberia_stars_vis_"+ $scope.hashURL,JSON.stringify(data_liberia_stars_vis));
					$scope.liberia_stars_vis = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_liberia_stars_vis[lastPush])){
							$scope.liberia_stars_vis.push(data_liberia_stars_vis[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: liberian_stars_viewsCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: liberian_stars_viewsCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_liberia_stars_vis === null){
		data_liberia_stars_vis = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_liberia_stars_vis[lastPush])){
				$scope.liberia_stars_vis.push(data_liberia_stars_vis[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: liberian_stars_viewsCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_liberia_stars_vis);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `liberian_stars_views` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: news_categoryCtrl --|-- 
.controller("news_categoryCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: news_categoryCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: news_categoryCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: news_categoryCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: news_categoryCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: news_categoryCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: news_categoryCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	// TODO: news_categoryCtrl --|-- disable back button
	
	$ionicHistory.nextViewOptions({
		disableAnimate: false,
		disableBack: false
	});
	
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: news_categoryCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `news_category` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: news_posts_bookmarkCtrl --|-- 
.controller("news_posts_bookmarkCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: news_posts_bookmarkCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: news_posts_bookmarkCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: news_posts_bookmarkCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: news_posts_bookmarkCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: news_posts_bookmarkCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: news_posts_bookmarkCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: news_posts_bookmarkCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `news_posts_bookmark` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: observer_singlesCtrl --|-- 
.controller("observer_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (observer)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: observer_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: observer_singlesCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: observer_singlesCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: observer_singlesCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: observer_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: observer_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: observer_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: observer_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=12&_embed=true&per_page=30";
	// TODO: observer_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://radioapp.radiolib.us/wp-json/wp/v2/posts?categories=12&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: observer_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_observers_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.observer = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: observer_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: observer_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_observers_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.observer = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: observer_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: observer_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: observer_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_observers_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: observer_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: observer_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_observers_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.observer = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.observer = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: observer_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `observer_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: settingsCtrl --|-- 
.controller("settingsCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: settingsCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: settingsCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: settingsCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: settingsCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: settingsCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: settingsCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: settingsCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `settings` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: testCtrl --|-- 
.controller("testCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: testCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: testCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: testCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: testCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: testCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: testCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: testCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `test` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_bush_chickenCtrl --|-- 
.controller("the_bush_chickenCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_bush_chicken)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_bush_chickenCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_bush_chickenCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: the_bush_chickenCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_bush_chickenCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_bush_chickenCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_bush_chickenCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_bush_chickenCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	
	// TODO: the_bush_chickenCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: the_bush_chickenCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://www.bushchicken.com/wp-json/wp/v2/posts?&_embed=true&per_page=30";
	// TODO: the_bush_chickenCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://www.bushchicken.com/wp-json/wp/v2/posts?&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: the_bush_chickenCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_the_bush_chickens = [];
	
	localforage.getItem("data_the_bush_chickens_" + $scope.hashURL, function(err, get_the_bush_chickens){
		if(get_the_bush_chickens === null){
			data_the_bush_chickens =[];
		}else{
			data_the_bush_chickens = JSON.parse(get_the_bush_chickens);
			$scope.data_the_bush_chickens =JSON.parse( get_the_bush_chickens);
			$scope.the_bush_chickens = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_the_bush_chickens[lastPush])){
					$scope.the_bush_chickens.push(data_the_bush_chickens[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_the_bush_chickens === null ){
		data_the_bush_chickens =[];
	}
	if(data_the_bush_chickens.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: the_bush_chickenCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_the_bush_chickens = response.data;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_the_bush_chickens);
				$scope.data_the_bush_chickens = response.data;
				// TODO: the_bush_chickenCtrl --|---------- set:localforage
				localforage.setItem("data_the_bush_chickens_" + $scope.hashURL, JSON.stringify(data_the_bush_chickens));
				$scope.the_bush_chickens = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_the_bush_chickens[lastPush])){
						$scope.the_bush_chickens.push(data_the_bush_chickens[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: the_bush_chickenCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_the_bush_chickens = data;
						$scope.data_the_bush_chickens = data;
						$ionicLoading.hide();
						// TODO: the_bush_chickenCtrl --|---------- set:localforage
						localforage.setItem("data_the_bush_chickens_" + $scope.hashURL,JSON.stringify(data_the_bush_chickens));
						controller_by_user();
						$scope.the_bush_chickens = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_the_bush_chickens[lastPush])){
								$scope.the_bush_chickens.push(data_the_bush_chickens[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: the_bush_chickenCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: the_bush_chickenCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: the_bush_chickenCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_bush_chickenCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_the_bush_chickens = response.data;
			$scope.data_the_bush_chickens = response.data;
			// TODO: the_bush_chickenCtrl --|---------- set:localforage
			localforage.setItem("data_the_bush_chickens_" + $scope.hashURL,JSON.stringify(data_the_bush_chickens));
			$scope.the_bush_chickens = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_the_bush_chickens[lastPush])){
					$scope.the_bush_chickens.push(data_the_bush_chickens[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: the_bush_chickenCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_the_bush_chickens = data;
					$scope.data_the_bush_chickens = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: the_bush_chickenCtrl --|---------- set:localforage
					localforage.setItem("data_the_bush_chickens_"+ $scope.hashURL,JSON.stringify(data_the_bush_chickens));
					$scope.the_bush_chickens = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_the_bush_chickens[lastPush])){
							$scope.the_bush_chickens.push(data_the_bush_chickens[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: the_bush_chickenCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: the_bush_chickenCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_the_bush_chickens === null){
		data_the_bush_chickens = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_the_bush_chickens[lastPush])){
				$scope.the_bush_chickens.push(data_the_bush_chickens[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: the_bush_chickenCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_the_bush_chickens);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `the_bush_chicken` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_bush_chicken_singlesCtrl --|-- 
.controller("the_bush_chicken_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_bush_chicken)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://www.bushchicken.com/wp-json/wp/v2/posts?&_embed=true&per_page=30";
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://www.bushchicken.com/wp-json/wp/v2/posts?&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: the_bush_chicken_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_the_bush_chickens_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.the_bush_chicken = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_bush_chicken_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: the_bush_chicken_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_the_bush_chickens_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_bush_chicken = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: the_bush_chicken_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_bush_chicken_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: the_bush_chicken_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_the_bush_chickens_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: the_bush_chicken_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: the_bush_chicken_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_the_bush_chickens_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.the_bush_chicken = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_bush_chicken = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: the_bush_chicken_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `the_bush_chicken_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_new_democratCtrl --|-- 
.controller("the_new_democratCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_new_democrat)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_new_democratCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_new_democratCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: the_new_democratCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_new_democratCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_new_democratCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_new_democratCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_new_democratCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	
	// TODO: the_new_democratCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: the_new_democratCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://thenewdemocrat.info/wp-json/wp/v2/posts?&_embed=true&per_page=30";
	// TODO: the_new_democratCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://thenewdemocrat.info/wp-json/wp/v2/posts?&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: the_new_democratCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_the_new_democrats = [];
	
	localforage.getItem("data_the_new_democrats_" + $scope.hashURL, function(err, get_the_new_democrats){
		if(get_the_new_democrats === null){
			data_the_new_democrats =[];
		}else{
			data_the_new_democrats = JSON.parse(get_the_new_democrats);
			$scope.data_the_new_democrats =JSON.parse( get_the_new_democrats);
			$scope.the_new_democrats = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_the_new_democrats[lastPush])){
					$scope.the_new_democrats.push(data_the_new_democrats[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_the_new_democrats === null ){
		data_the_new_democrats =[];
	}
	if(data_the_new_democrats.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: the_new_democratCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_the_new_democrats = response.data;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_the_new_democrats);
				$scope.data_the_new_democrats = response.data;
				// TODO: the_new_democratCtrl --|---------- set:localforage
				localforage.setItem("data_the_new_democrats_" + $scope.hashURL, JSON.stringify(data_the_new_democrats));
				$scope.the_new_democrats = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_the_new_democrats[lastPush])){
						$scope.the_new_democrats.push(data_the_new_democrats[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: the_new_democratCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_the_new_democrats = data;
						$scope.data_the_new_democrats = data;
						$ionicLoading.hide();
						// TODO: the_new_democratCtrl --|---------- set:localforage
						localforage.setItem("data_the_new_democrats_" + $scope.hashURL,JSON.stringify(data_the_new_democrats));
						controller_by_user();
						$scope.the_new_democrats = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_the_new_democrats[lastPush])){
								$scope.the_new_democrats.push(data_the_new_democrats[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: the_new_democratCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: the_new_democratCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: the_new_democratCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_new_democratCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_the_new_democrats = response.data;
			$scope.data_the_new_democrats = response.data;
			// TODO: the_new_democratCtrl --|---------- set:localforage
			localforage.setItem("data_the_new_democrats_" + $scope.hashURL,JSON.stringify(data_the_new_democrats));
			$scope.the_new_democrats = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_the_new_democrats[lastPush])){
					$scope.the_new_democrats.push(data_the_new_democrats[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: the_new_democratCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_the_new_democrats = data;
					$scope.data_the_new_democrats = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: the_new_democratCtrl --|---------- set:localforage
					localforage.setItem("data_the_new_democrats_"+ $scope.hashURL,JSON.stringify(data_the_new_democrats));
					$scope.the_new_democrats = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_the_new_democrats[lastPush])){
							$scope.the_new_democrats.push(data_the_new_democrats[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: the_new_democratCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: the_new_democratCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_the_new_democrats === null){
		data_the_new_democrats = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_the_new_democrats[lastPush])){
				$scope.the_new_democrats.push(data_the_new_democrats[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: the_new_democratCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_the_new_democrats);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `the_new_democrat` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_new_democrat_singlesCtrl --|-- 
.controller("the_new_democrat_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_new_democrat)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_new_democrat_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_new_democrat_singlesCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: the_new_democrat_singlesCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_new_democrat_singlesCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_new_democrat_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_new_democrat_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_new_democrat_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: the_new_democrat_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://thenewdemocrat.info/wp-json/wp/v2/posts?&_embed=true&per_page=30";
	// TODO: the_new_democrat_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://thenewdemocrat.info/wp-json/wp/v2/posts?&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: the_new_democrat_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_the_new_democrats_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.the_new_democrat = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_new_democrat_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: the_new_democrat_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_the_new_democrats_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_new_democrat = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: the_new_democrat_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_new_democrat_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: the_new_democrat_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_the_new_democrats_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: the_new_democrat_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: the_new_democrat_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_the_new_democrats_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.the_new_democrat = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_new_democrat = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: the_new_democrat_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `the_new_democrat_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_news_libCtrl --|-- 
.controller("the_news_libCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_news_lib)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_news_libCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_news_libCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: the_news_libCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_news_libCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_news_libCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_news_libCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_news_libCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	
	// TODO: the_news_libCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: the_news_libCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://thenewslib.com/wp-json/wp/v2/posts?&_embed=true&per_page=30";
	// TODO: the_news_libCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://thenewslib.com/wp-json/wp/v2/posts?&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: the_news_libCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_the_news_libs = [];
	
	localforage.getItem("data_the_news_libs_" + $scope.hashURL, function(err, get_the_news_libs){
		if(get_the_news_libs === null){
			data_the_news_libs =[];
		}else{
			data_the_news_libs = JSON.parse(get_the_news_libs);
			$scope.data_the_news_libs =JSON.parse( get_the_news_libs);
			$scope.the_news_libs = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_the_news_libs[lastPush])){
					$scope.the_news_libs.push(data_the_news_libs[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_the_news_libs === null ){
		data_the_news_libs =[];
	}
	if(data_the_news_libs.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: the_news_libCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_the_news_libs = response.data;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_the_news_libs);
				$scope.data_the_news_libs = response.data;
				// TODO: the_news_libCtrl --|---------- set:localforage
				localforage.setItem("data_the_news_libs_" + $scope.hashURL, JSON.stringify(data_the_news_libs));
				$scope.the_news_libs = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_the_news_libs[lastPush])){
						$scope.the_news_libs.push(data_the_news_libs[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: the_news_libCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_the_news_libs = data;
						$scope.data_the_news_libs = data;
						$ionicLoading.hide();
						// TODO: the_news_libCtrl --|---------- set:localforage
						localforage.setItem("data_the_news_libs_" + $scope.hashURL,JSON.stringify(data_the_news_libs));
						controller_by_user();
						$scope.the_news_libs = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_the_news_libs[lastPush])){
								$scope.the_news_libs.push(data_the_news_libs[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: the_news_libCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: the_news_libCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: the_news_libCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_news_libCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_the_news_libs = response.data;
			$scope.data_the_news_libs = response.data;
			// TODO: the_news_libCtrl --|---------- set:localforage
			localforage.setItem("data_the_news_libs_" + $scope.hashURL,JSON.stringify(data_the_news_libs));
			$scope.the_news_libs = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_the_news_libs[lastPush])){
					$scope.the_news_libs.push(data_the_news_libs[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: the_news_libCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_the_news_libs = data;
					$scope.data_the_news_libs = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: the_news_libCtrl --|---------- set:localforage
					localforage.setItem("data_the_news_libs_"+ $scope.hashURL,JSON.stringify(data_the_news_libs));
					$scope.the_news_libs = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_the_news_libs[lastPush])){
							$scope.the_news_libs.push(data_the_news_libs[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: the_news_libCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: the_news_libCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_the_news_libs === null){
		data_the_news_libs = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_the_news_libs[lastPush])){
				$scope.the_news_libs.push(data_the_news_libs[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: the_news_libCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
//debug: all data
//console.log(data_the_news_libs);
$ionicConfig.backButton.text("");
			
		} catch(e){
			console.log("%cerror: %cPage: `the_news_lib` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: the_news_lib_singlesCtrl --|-- 
.controller("the_news_lib_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (the_news_lib)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: the_news_lib_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: the_news_lib_singlesCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: the_news_lib_singlesCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_news_lib_singlesCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: the_news_lib_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: the_news_lib_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: the_news_lib_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("liberia_news_network.home");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: the_news_lib_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "http://thenewslib.com/wp-json/wp/v2/posts?&_embed=true&per_page=30";
	// TODO: the_news_lib_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "http://thenewslib.com/wp-json/wp/v2/posts?&_embed=true&per_page=30&callback=JSON_CALLBACK";
	// TODO: the_news_lib_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_the_news_libs_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.the_news_lib = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_news_lib_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: the_news_lib_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_the_news_libs_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "No Network connection" + " (" + data.status + ")",
						template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_news_lib = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: the_news_lib_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: the_news_lib_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: the_news_lib_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_the_news_libs_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: the_news_lib_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: the_news_lib_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_the_news_libs_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].id ===  parseInt(itemID)) || (datas[i].id === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.the_news_lib = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "No Network connection" + " (" + data.status + ")",
							template: "Internet connection is required to access the application. Please enable mobile network or Wifi in Settings",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.the_news_lib = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: the_news_lib_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `the_news_lib_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})
