function bsl_contains(arr, obj) {
    var i = arr.length;
    while(i--) {
        if(arr[i] === obj) {
            return i;
        }
    }
    return -1;
}
function BSLJSBridge(msg) {
    var len = Object.keys(msg).length;
    var arg = '';
    var count = 0;

    var js;
    for (var i in msg) {
        count++;
        if (i != 'methodName') {
            arg += "'" + msg[i] + "'";
            if (count < len) {
                arg += ','
            }
        }
    };
    var filterFuntion = ['login', 'share', 'shareImage', 'shareCutImage','ShareImgWithTxt']
    if (bsl_contains(filterFuntion,msg.methodName) > -1) {
        arg = JSON.stringify(msg);
        js = 'javascript:local_kingkr_obj.' + msg.methodName + '(' + "'" + arg + "'" + ')';

    } else {

        if (len > 1) {


            js = "javascript:local_kingkr_obj." + msg.methodName + "(" + arg + ")";
        } else {
            js = 'javascript:local_kingkr_obj.' + msg.methodName + '()';
        }
    }
    console.log(js);
    eval(js);
}

!
function(a) {
	a();
} (function() {
	var H;
	var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	H = {
		Login: function(platform, forwardurl, callbackMethod) {
			var message = {
				methodName: 'login',
				platform: platform,
				forwardurl: forwardurl,
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		}
		,
		Pay: function(order, paytype, callbackMethod) {
			var message = {
				methodName: 'pay',
				order: order,
				paytype: paytype,
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		WXPay: function(ProductName, Desicript, Price, OuttradeNo,attach, callbackMethod) {
		if(isAndroid){
        		window.local_kingkr_obj.wxPay(ProductName, Desicript, Price, OuttradeNo,attach,callbackMethod);
        		}else if(isiOS){
				var message = {methodName: 'WXPay',productName:ProductName,desicript:Desicript,price:Price,outtradeNo:OuttradeNo,attach:attach,callbackMethod:callbackMethod};
           BSLJSBridge(message);
           }

        		},
		CopyText: function(txt) {
		    var message = {
		        methodName: 'copyText',
		        txt:txt
		    };
		    BSLJSBridge(message);
		},
		Share: function(content, imageurl, targetUrl, title, callbackMethod) {
			var message = {
				methodName: 'share',
				content: content,
				imageurl: imageurl,
				targetUrl: targetUrl,
				'title': title,
				'callbackMethod': callbackMethod
			};
			BSLJSBridge(message);
		},

		ShareImg: function(imageurl, callbackMethod) {
			var message = {
				methodName: 'shareImage',
				imageurl: imageurl,
				callbackMethod: 'shareCallback'
			};
			BSLJSBridge(message);
		},
		ShareImgWithTxt: function(platform,content, imageurl, targetUrl, title, callbackMethod) {
                     if(isAndroid){
                        var message = {methodName: 'share',platform:platform,content: content,imageurl: imageurl,targetUrl: targetUrl,'title': title,'callbackMethod': callbackMethod};
                        BSLJSBridge(message);
                     }else if(isiOS){
                        var message = { methodName : 'ShareImgWithTxt', content: content,imageurl: imageurl,targetUrl: targetUrl,'title': title,callbackMethod: callbackMethod,platform:platform};
                        BSLJSBridge(message);
                     }
            },
		ShareImgByPlatfrom: function(platform,imageurl, callbackMethod) {
		if(isAndroid){
		    local_kingkr_obj.shareImageByPlatform(platform,imageurl,callbackMethod);
		    }else if(isiOS){
        			var message = {
        				methodName: 'ShareImgByPlatfrom',
        				platform:platform,
        				imageurl: imageurl,
        				callbackMethod: callbackMethod
        			};
        			BSLJSBridge(message);
        			}
        		},
        ShareCImgByPlatform: function(platform,callbackMethod) {
                    if(isAndroid){
                             var message = {
                                   methodName: 'shareCutImage',
                                   platform:platform,
                                   callbackMethod: callbackMethod
                                   };
                             BSLJSBridge(message);
                 }else if(isiOS){
                             var message = {
                                   methodName: 'ShareCImgByPlatform',
                                   platform:platform,
                                   callbackMethod: callbackMethod
                                   };
                              BSLJSBridge(message);
                  }
        },
		ShareCImg: function(callbackMethod) {
			var message = {
				methodName: 'shareCutImage',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		ShareMultiImage: function(data,description) {
            if(isAndroid){
			local_kingkr_obj.shareMultiImage(data,description);
			}else if(isiOS){
			var message = {methodName:'ShareMultiImage',data:data,descript:descript};
           BSLJSBridge(message);
           }

		},
		ShareMultiImageToSome: function(data) {

        	local_kingkr_obj.shareMultiImageToSome(data)
        },

		CCache: function() {
			var message = {
				methodName: 'cleanCache'
			};
			BSLJSBridge(message);
		},
		Qcode: function(resulttype, callbackMethod) {
			var message = {
				methodName: 'qrcoder',
				controlQRCodeResult: resulttype,
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		AppBottom: function(param, foreve) { 
			if (param == null) var message = {
				methodName: 'controlBottomTabLayout',
				foreve:foreve
			};
			else var message = {
				methodName: 'controlBottomTabLayout',
				show: '' + param + '',
				foreve:foreve
			};
			BSLJSBridge(message);
		},
		AppTop: function(param, foreve) {
			if (param == null) var message = {
				methodName: 'controllNavigateLayout',
				foreve:foreve
			};
			else var message = {
				methodName: 'controllNavigateLayout',
				show: '' + param + '',
				foreve:foreve
			};
			BSLJSBridge(message);
		},
		AppLeft: function(state) {
			var message = {
				'methodName': 'controlLeftMenuLayout',
				'show': state
			};
			BSLJSBridge(message);
		},
		AppTopL: function(fun, imageUrl, forever) {
        			var message = {
        				methodName: 'ctrlNavLeftBtnFun',
        				funcNum: fun,
        				buttonImage: imageUrl,
        				forever:forever
        			};
        			BSLJSBridge(message);
        		},
		AppTopR: function(fun, imageUrl, forever) {
        			var message = {
        				methodName: 'ctrlNavRightBtnFun',
        				funcNum: fun,
        				buttonImage: imageUrl,
        				forever:forever
        			};
        			BSLJSBridge(message);
        		},
		PhoneID: function(callbackMethod) {
			var message = {
				methodName: 'getDeviceIdentifier',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		AppScreen: function(orientation) {
			var message = {
				methodName: 'setScreenOrientation',
				orientation: orientation
			};
			BSLJSBridge(message);
		},
		CopyUrl: function()
		{
			var message = {
				methodName: 'copyUrlToClipboard'
			};
			BSLJSBridge(message);
		},
		OpenWeb: function(url) {
			if (url == '' || url == 'undefined') {
				url='';
			}
				var message = {
					methodName: 'awakeOtherWebview',
					webviewUrl: url
				}
				BSLJSBridge(message);
		},
		JPushTag: function(tag, callbackmethod) {
			if (tag == '') {
				return false;
			}
			var message = {
				methodName: 'registerPushTag',
				tag: tag,
				callbackMethod: callbackmethod
			};
			BSLJSBridge(message);
		},
		OppoPushTag:function(tag,callbackmethod){
		    if (tag == '') {
            		return false;
            }
            var message = {
            	methodName: 'registerPushTag',
            	tag: tag,
            	callbackMethod: callbackmethod
            };
            BSLJSBridge(message);
		},
		DeletePushTags:function(tags,callbackmethod){
		    if (tags == '') {
        		return false;
        	}
        	var message = {
        		methodName: 'deletePushTags',
        		tag: tags,
        		callbackMethod: callbackmethod
        	};
        	BSLJSBridge(message);
		},
		Build: function(callbackmethod)
		{
			var message = {
				methodName: 'getBuild',
				callbackMethod: callbackmethod
			}
			BSLJSBridge(message);
		},
		GPS: function(callbackMethod) {
		if(isiOS){
			var message = {methodName:'getLocation',callbackMethod:callbackMethod};
           BSLJSBridge(message);
           }else if(isAndroid){
           local_kingkr_obj.getLocation(0,callbackMethod);
           }

		},
		StartGPS: function(callbackMethod,distance) {
		if(isiOS){
		    var message = {methodName:'getLocation',callbackMethod:callbackMethod,keep:'1',distance:distance};
           BSLJSBridge(message);
           }else if(isAndroid){
           local_kingkr_obj.getLocation(distance,callbackMethod);
           }

        },
		StopGPS:function(){
		if(isAndroid){
		    local_kingkr_obj.getLocation(-1,'');
		    }else if(isiOS){
			var message = {methodName:'stopLocation'};
           BSLJSBridge(message);
           }
		},

		checkApp: function(urlScheme, callbackMethod) {

			var message = {methodName:'checkAppInstalled',callbackMethod:callbackMethod,urlScheme:urlScheme};
           BSLJSBridge(message);

		},
		openApp: function(urlScheme, callbackMethod)
		{

			var message = {methodName:'openApp',urlScheme:urlScheme,callbackMethod:callbackMethod};
           BSLJSBridge(message);

		},
		touchID: function(callbackMethod) {
			var message = {
				methodName: 'fingerprint',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		WifiSsid: function(callbackMethod) {
			var message = {
				methodName: 'getWifiSSID',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},

		SetBrightness: function(value,system) {
			var message = {
				methodName: 'setBrightness',
				brightness: value,
				system     : system
			};
			BSLJSBridge(message);
		},
		checkBDMap: function(callbackMethod)
		{
			var message = {
				methodName: 'checkBDMap',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		openBDMap: function(callbackMethod) {
			var message = {
				methodName: 'openBDMap',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		navBDMap: function(startlat, startlon, endlat, endlon, callbackMethod) {
			var message = {
				methodName: 'navBDMap',
				startlat: startlat,
				startlon: startlon,
				endlat: endlat,
				endlon: endlon,
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},

		checkGDMap: function(callbackMethod)
		{
			var message = {
				methodName: 'checkGDMap',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		openGDMap: function(callbackMethod) {
			var message = {
				methodName: 'openGDMap',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		navGDMap: function(startlat, startlon, endlat, endlon, callbackMethod) {
			var message = {
				methodName: 'navGDMap',
				startlat: startlat,
				startlon: startlon,
				endlat: endlat,
				endlon: endlon,
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		checkGGMap: function(callbackMethod)
		{
			var message = {
				methodName: 'checkGGMap',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		openGGMap: function(callbackMethod) {
			var message = {
				methodName: 'openGGMap',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		navGGMap: function(startlat, startlon, endlat, endlon, callbackMethod) {
			var message = {
				methodName: 'navGGMap',
				startlat: startlat,
				startlon: startlon,
				endlat: endlat,
				endlon: endlon,
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		checkTXMap: function(callbackMethod) 
		{
			var message = {
				methodName: 'checkTXMap',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		openTXMap: function(callbackMethod) {
			var message = {
				methodName: 'openTXMap',
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
		navTXMap: function(startlat, startlon, endlat, endlon, callbackMethod) {
			var message = {
				methodName: 'navTXMap',
				startlat: startlat,
				startlon: startlon,
				endlat: endlat,
				endlon: endlon,
				callbackMethod: callbackMethod
			};
			BSLJSBridge(message);
		},
       openAppleMap:function(callbackMethod)
       {
           var message = {methodName:'openAppleMap',callbackMethod:callbackMethod};
           BSLJSBridge(message);
       },
       navAppleMap:function(startlat,startlon,endlat,endlon,callbackMethod)
       {
           var message = {methodName:'navAppleMap',startlat:startlat,startlon:startlon,endlat:endlat,endlon:endlon,callbackMethod:callbackMethod};
           BSLJSBridge(message);
       },
		navMap:function(startlat,startlon,endlat,endlon,startName, endName,callbackMethod,mapType)
           {
               var message = {methodName:'navMap',
               startlat:startlat,startlon:startlon,endlat:endlat,endlon:endlon,
               startName:startName,endName:endName,callbackMethod:callbackMethod,mapType:mapType};
               BSLJSBridge(message);
           },
           openMap:function(callbackMethod,mapType)
              {
                  var message = {methodName:'openMap',callbackMethod:callbackMethod,mapType:mapType};
                  BSLJSBridge(message);
              },
           checkMap:function(callbackMethod,mapType)
              {
                  var message = {methodName:'checkMap',callbackMethod:callbackMethod,mapType:mapType};
                  BSLJSBridge(message);
              },

               hideStateBar:function(hidden,forever)
               {
                       if(isAndroid){
                       local_kingkr_obj.hideStateBar(hidden,forever);
                       }else if(isiOS){
						var message = {methodName:'setStatusBarHidden',hidden:hidden,forever:forever};
                    BSLJSBridge(message);
                    }

                },
               getClipboard:function(callbackMethod)
               {
                   var message = {methodName:'getClipboardText',callbackMethod:callbackMethod};
                   BSLJSBridge(message);
               },
               checkWX:function(callbackMethod)
               {
                   var message = {methodName:'checkWX',callbackMethod:callbackMethod};
                   BSLJSBridge(message);
               },
               checkZFB:function(callbackMethod)
               {
                   var message = {methodName:'checkZFB',callbackMethod:callbackMethod};
                   BSLJSBridge(message);
               },
               cacheSize:function(callbackMethod)
               {
                   var message = {methodName:'getCacheSize',callbackMethod:callbackMethod};
                   BSLJSBridge(message);
               },
               tabbarColor:function(color, forever)
               {
                   var message = {methodName:'tabbarColor',color:color, forever:forever};
                   BSLJSBridge(message);

               },
               navbarColor:function(color, forever)
               {
                   var message = {methodName:'navbarColor',color:color,forever:forever};
                   BSLJSBridge(message);

               },
               downRefresh:function(open, forever)
               {
                   var message = {methodName:'downRefresh',open:open,forever:forever};
                   BSLJSBridge(message);
               },
               netWorkState:function(callbackMethod)
               {
                   var message = {methodName:'netWorkState',callbackMethod:callbackMethod};
                   BSLJSBridge(message);
               },
               msgRing:function()
               {
                   var message = {methodName:'msgRing'};
                   BSLJSBridge(message);
               },
               getVolume:function(callbackMethod)
               {
                   var message = {methodName:'getVolume',callbackMethod:callbackMethod};
                   BSLJSBridge(message);
               },
               setVolume:function(value)
                      {
                          var message = {methodName:'setVolume',volume:value};
                          BSLJSBridge(message);
               },
               getAVVolume:function(callbackMethod){
                     if(isiOS){
                     var message = {methodName:'getVolume',callbackMethod:callbackMethod};
                     BSLJSBridge(message);
                     }else if(isAndroid){

					 local_kingkr_obj.getMusicVolume(callbackMethod);
					 }
               },
               setAVVolume:function(value)
               {
				   if(isAndroid){
				   local_kingkr_obj.setMusicVolume(value);
				   }else if(isiOS){
				   var message = {methodName:'setVolume',volume:value};
                    BSLJSBridge(message);
                    }
               },
               ChangeTabbar:function(content)
               {
				   if(isAndroid){
				   local_kingkr_obj.setBottomMenu(content);
				   }else if(isiOS){
                   var message ={methodName:'ChangeTabbar',content:content};
                    BSLJSBridge(message);
                    }

               },
               SetTitleName:function(title, color)
               {
                   if(isAndroid){
                   local_kingkr_obj.setTitleName(title,color);
                   }else if(isiOS){
				   var message = {methodName:'navbarTitle',title:title,color:color};
                    BSLJSBridge(message);
                    }

               },

               SetNavBarAlpha:function(alpha, foreve)
               {
				   if(isAndroid){
				   local_kingkr_obj.setNavBarAlpha(alpha,foreve);
				   }else if(isiOS){
				   var message = {methodName:'navbarAlpha',alpha:alpha,foreve:foreve};
                    BSLJSBridge(message);
                    }

               },
               SetTabbarAlpha:function(alpha, forever)
               {

				   if(isAndroid){
				   local_kingkr_obj.setTabbarAlpha(alpha,forever);
				   }else if(isiOS){
				   var message = {methodName:'tabbarAlpha',alpha:alpha,forever:forever};
                    BSLJSBridge(message);
                    }

               },
               GetBrightness:function(callbackMethod)
               {
                   if(isAndroid){
				   local_kingkr_obj.getBrightness(callbackMethod);
				   }else if(isiOS){
				   var message = {methodName:'brightness',callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               GetContact:function(callbackMethod)
               {
                   if(isAndroid){
				   local_kingkr_obj.getSingleContacts(callbackMethod);
				   }else if(isiOS){
				   var message = {methodName:'getContact',callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               GetAllContact:function(callbackMethod)
               {
                   var message = {methodName:'getAllContact', callbackMethod:callbackMethod};
                   BSLJSBridge(message);
               },
               SetJsClose:function()
               {
                   var message = {methodName:'setJsClose'};
                   BSLJSBridge(message);
               },
               PhoneInfo:function(callbackMethod)
               {
                   if(isAndroid){
				   local_kingkr_obj.setJsPhoneInfo(callbackMethod);
				   }else if(isiOS){
				   var message = {methodName:'phoneInfo',callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               AddContact:function(contact, callbackMethod){
                   var message = {methodName:'addContact',
                   contact:contact,
                   callbackMethod:callbackMethod};
                   BSLJSBridge(message);
               },
               GetVersion:function(callbackMethod)
               {
				   if(isAndroid){
				   local_kingkr_obj.getVersionName(callbackMethod);
				   }else if(isiOS){
				   var message = {methodName:'getVersion',callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               GetNetType:function(callbackMethod)
               {
                   var message = {methodName:'getNetType', callbackMethod:callbackMethod};
                   BSLJSBridge(message);
               },
               MonitorNetWork:function(callbackMethod)
               {
                    if(isAndroid){
					local_kingkr_obj.openNetListen(callbackMethod);
					}else if(isiOS){
					var message = {methodName:'monitorNetWork',callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               DownloadFile:function(data,callbackMethod,select)
               {

					local_kingkr_obj.downloadFile(data,callbackMethod,select);
               },
               DownloadFileByPath:function(data,path,callbackMethod,select)
               {
                    local_kingkr_obj.downloadFile(data,path,callbackMethod,select);

               },
			   IOSDownloadImage:function(imageUrlArray,callbackMethod){
				   var message = {methodName:'DownloadFile',imageUrlArray:imageUrlArray,callbackMethod:callbackMethod};
                    BSLJSBridge(message);

			   },
               CloseMonitorNetWork:function()
               {
					if(isAndroid){
					local_kingkr_obj.closeNetListen();
					}else if(isiOS){
					var message = {methodName:'CloseMonitorNetWork'};
                    BSLJSBridge(message);
                    }

               },
               OpenBrowser:function(callbackMethod,type,url)
               {
                    var message = {methodName:'openBrowser',callbackMethod:callbackMethod,type:type,url:url};
                    BSLJSBridge(message);
               },
               OpenVideo:function(videoUrl,title)
               {
					 if(isAndroid){
					 local_kingkr_obj.openVideo(videoUrl,title);
					 }else if(isiOS){
					 var message = {methodName:'playVideo',videoUrl:videoUrl,title:title};
                    BSLJSBridge(message);
                    }

               },
               KeepBright:function(unlock)
               {

					if(isAndroid){
					local_kingkr_obj.keepBright(unlock);
					}else if(isiOS){
					var message = {methodName:'UnlockScreen',unlock:unlock};
                    BSLJSBridge(message);
                    }

               },
               ShowImages:function(imgs,title,orientation)
               {
                    if(isAndroid){
                    local_kingkr_obj.showImages(imgs,title,orientation);
                    }else if(isiOS){
					var message = {methodName:'OpenImages',imgs:imgs,title:title,orientation:orientation};
                    BSLJSBridge(message);
                    }

               },
               ControlScreenshot:function(flag)
               {
                    var message = {methodName:'controlScreenshot', flag:flag};
                    BSLJSBridge(message);
               },
               Screenshot(open,callbackMethod){
                    if(isAndroid){
                    local_kingkr_obj.screenshortLinstener(open,callbackMethod);
                    }else if(isiOS){
					var message = {methodName:'MonitorScreenshot',open:open,callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               Vibrator()
               {
                    if(isAndroid){
                    local_kingkr_obj.vibrator();
                    }else if(isiOS){
					var message = {methodName:'Vibration'};
                    BSLJSBridge(message);
                    }
               },
               AudioPlayBG:function(open)
               {
					if(isAndroid){
					local_kingkr_obj.audioBackstage(open);
					}else if(isiOS){
					var message = {methodName:'AudioPlayBG',open:open};
                    BSLJSBridge(message);
                    }

               },
               SlideHideNav:function(open)
               {
					if(isAndroid){
					local_kingkr_obj.controlNavBarHide(open);
					}else if(isiOS){
					var message = {methodName:'SlideHideNav',open:open};
                    BSLJSBridge(message);
                    }
               },
               SlideHideTab:function(open)
               {
                    if(isAndroid){
					local_kingkr_obj.controlTabBarHide(open);
					}else if(isiOS){
					var message = {methodName:'SlideHideTab',open:open};
                    BSLJSBridge(message);
                    }

               },
               ControlSlide:function(funt)
               {
                    if(isAndroid){
					local_kingkr_obj.controlSlide(funt);
					}else if(isiOS){
					var message = {methodName:'ControlSlide',funt:funt};
                    BSLJSBridge(message);
                    }

               },
               GetToken:function(callbackMethod)
               {
                    var message = {methodName:'getToken', callbackMethod:callbackMethod};
                    BSLJSBridge(message);
               },
               CheckBiometrics:function(callbackMethod)
               {
                    if(isAndroid){
					local_kingkr_obj.checkFingerprint(callbackMethod);
					}else if(isiOS){
					var message = {methodName:'CheckBiometrics',callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               OpenXCX:function(name,path,type,callbackMethod){
                    if(isAndroid){
                    local_kingkr_obj.openXCX(name,path,type,callbackMethod);
                    }else if(isiOS){
					var message = {methodName:'OpenMiniProgram',name:name,path:path,type:type,callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               ShareMusic:function(platform,title,description,thumbImgUrl,musicDataUrl,musicUrl,callbackMethod){//分享的音乐地址musicDataUrl,点击后的跳转地址musicUrl
                    if(isAndroid){
                    local_kingkr_obj.shareMusic(platform,title,description,thumbImgUrl,musicDataUrl,musicUrl,callbackMethod);
                    }else if(isiOS){
					var message = {methodName:'ShareMusic',title:title,description:description,musicUrl:musicUrl,musicDataUrl:musicDataUrl,thumbImgUrl:thumbImgUrl,platform:platform,callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               ShareVideo:function(platform,title,description,thumbImgUrl,videoUrl,callbackMethod){
                    if(isAndroid){
                    local_kingkr_obj.shareVideo(platform,title,description,thumbImgUrl,videoUrl,callbackMethod);
                    }else if(isiOS){
					var message = {methodName:'ShareVideo',title:title,description:description,videoUrl:videoUrl,thumbImgUrl:thumbImgUrl,platform:platform,callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               GetStepCount:function(callbackMethod)
               {
                    if(isAndroid){
                                        local_kingkr_obj.getStepNum(callbackMethod);
                                        }else if(isiOS){
                    					var message = {methodName:'GetStepCount',callbackMethod:callbackMethod};
                                                            BSLJSBridge(message);
                                        }

               },
               OpenStep:function(){
                    local_kingkr_obj.openStep();
               },
               CloseStep:function(){
                    local_kingkr_obj.closeStep();
               },
               QrPhoto:function(type,callbackMethod){
                    if(isAndroid){
                    local_kingkr_obj.qrPhoto(type,callbackMethod);
                    }else if(isiOS){
					var message = {methodName:'QRCodeAlbum',controlQRCodeResult:type,callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               QrUrl:function(type,url,callbackMethod){
               if(isAndroid){
                    local_kingkr_obj.qrUrl(type,url,callbackMethod);
                    }else if(isiOS){
					var message = {methodName:'QRCodeImgUrl',controlQRCodeResult:type,url:url,callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               CleanData:function(){
                    local_kingkr_obj.cleanData();
               },
               IsOpenNotice:function(callbackMethod){
                    if(isAndroid){
                    local_kingkr_obj.isOpenNotice(callbackMethod);
                    }else if(isiOS){
					var message = {methodName:'pushMsg',callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               CreateWindow:function(url){
                  if(isAndroid){
                  local_kingkr_obj.createWindows(url);
                  }else if(isiOS){
				  var message = {methodName:'OpenWindow',url:url};
                    BSLJSBridge(message);
                    }

               },
               CloseTopWindow:function(){
                    if(isAndroid){
                    local_kingkr_obj.closeTopWindow();
                    }else if(isiOS){
					var message = {methodName:'CloseTopWindow'};
                    BSLJSBridge(message);
                    }

               },
               CloseTopWindowRefresh:function(){
                    if(isAndroid){
                    local_kingkr_obj.closeTopWindowRefresh();
                    }else if(isiOS){
					var message = {methodName:'CloseTopWindowRefresh'};
                    BSLJSBridge(message);
                    }

               },
               CheckFirstInstall:function(callbackMethod){
                    if(isAndroid){
                    local_kingkr_obj.isFirstInstall(callbackMethod);
                    }else if(isiOS){
			        var message = {methodName:'CheckFirstInstall',callbackMethod:callbackMethod};
                    BSLJSBridge(message);
                    }

               },
               StatusBarTextColor:function(style){
                    if(isAndroid){
                    local_kingkr_obj.stateBarTextColor(style);
                    }else if(isiOS){
			        var message = {methodName:'StatusBarTextColor',style:style};
                    BSLJSBridge(message);
                    }

               },
			   IAP:function(orderId,productId,CBUrl,callbackMethod)
       {
           if(isiOS){
           var message = {methodName:'IAP',orderId:orderId,productId:productId,CBUrl:CBUrl,callbackMethod:callbackMethod};
           BSLJSBridge(message);
           }
       },
	   UNReplacementResource:function()
       {
           if(isiOS){
           var message = {methodName:'UNReplacementResource'};
           BSLJSBridge(message);
           }
       },
       ReplacementResource:function()
       {
           if(isiOS){
           var message = {methodName:'ReplacementResource'};
           BSLJSBridge(message);
           }
       },
       SetJsPermission:function(permission){
       if(isAndroid){
       local_kingkr_obj.setJsPermission(permission);
       }
       },
       ControlOpenApp: function(type) {
                                var message = { methodName: 'ControlOpenApp',type: type};
                                BSLJSBridge(message);
                                },
       SetNavigationBarColor:function(color){
            if(isAndroid){
                local_kingkr_obj.setNavigationBarColor(color);
            }
       },
       ShareApplet:function(pageUrl, appletId, path, title, desc, imageUrl, callbackMethod){
            var message = {methodName:'shareApplet',pageUrl:pageUrl, appletId:appletId, path:path,
             title:title, desc:desc, imageUrl:imageUrl, callbackMethod:callbackMethod};
            BSLJSBridge(message);
       },
       StartAccelerate:function(callbackMethod){
            var message={methodName:'StartAccelerate',callbackMethod:callbackMethod};
            BSLJSBridge(message);
       },
       StopAccelerate:function(){
            var message={methodName:'StopAccelerate'};
            BSLJSBridge(message);
       },
       StartGyro:function(callbackMethod){
            var message = {methodName:'StartGyro',callbackMethod:callbackMethod};
            BSLJSBridge(message);
       },
       StopGyro:function(){
            var message = {methodName:'StopGyro'};
            BSLJSBridge(message);
       },
       JsAIRecognition:function(type, callbackMethod){
            var message = {methodName:'jsAIRecognition', type:type, callbackMethod:callbackMethod};
            BSLJSBridge(message);
       },
       SystemShareTxt:function(content){
                   var message = {methodName:'systemShareTxt',content:content};
                   BSLJSBridge(message);
       },
       SystemShareImg:function(image){
            var message = {methodName:'systemShareImg',image:image};
            BSLJSBridge(message);
       },
       SystemShareImgs:function(images){
            var message = {methodName:'systemShareImgs',images:images};
            BSLJSBridge(message);
       },
       JsAISpeechRecog:function(callbackMethod){
            var message = {methodName:'jsAISpeechRecog', callbackMethod:callbackMethod};
            BSLJSBridge(message);
       },
       SetNavigationBarButtonColor:function(flag){
            if(isAndroid){
                local_kingkr_obj.setNavigationBarButtonColor(flag);
            }
       },
       OpenPrivacyStatement:function(){
            if(isAndroid){
                local_kingkr_obj.openPrivacyStatement();
            }
       }
	};
	BSL = H;

});
function intercept_body(e){
            if(!e){
                var e = window.event;
            }
            var targ = e.target;
            var tname = targ.tagName;
            alert(tname);
        }

function iframes(){
     var iframes = document.getElementsByTagName('iframe');
    console.log(iframes);
        for(var i=0;i < iframes.length;i++) {
            iframes[i].contentWindow.BSL = BSL;
        }
}
iframes();