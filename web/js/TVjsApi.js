 var count = 0;
            function TVjsApi(symbol) {
	console.log(symbol)
//                var urls = 'ws://*****';
//                var urls = 'ws://****/trade_market/websocket/btc_usdt'
//                var urls = 'wss://api.fcoin.com/v2/ws';
				 var urls = 'ws://39.108.98.14:8282';
                this.widgets = null;
                this.socket = new socket(urls);
//                this.socket = new socket();
                this.datafeeds = new datafeeds(this);
               this.symbol = symbol || 'ethusdt';                   
				this.interval = null
                    this.cacheData = {}
                    this.lastTime = null
                    this.getBarTimer = null
                    this.isLoading = true;
                var that = this;
                this.socket.doOpen()
                this.socket.on('open', function() {
					 var to_sub =  {"type":"get_all_k_line","symbol":this.symbol,"period":"5min"}
					that.socket.send(to_sub)
                /*    that.socket.send({
                        cmd: 'req',
                        args: ["candle.M5.ethusdt", 150, parseInt(Date.now() / 1000)]
                    }) */
                })
                this.socket.on('message', that.onMessage)
            }
            TVjsApi.prototype.init = function() {
                //设置默认symbol，interval的默认值
				
                var symbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'eth';
				 var symbol = this.symbol || 'eth';
                var interval = arguments.length > 0 && arguments[1] !== undefined ? arguments[1] : 5;
                if (!this.widgets) {
                    this.widgets = window.tvWidget = new TradingView.widget({
                        //默认商品设置
                        symbol: symbol,
                        //默认请求间隔
                        interval: interval,
                        //默认是否全屏
                         fullscreen: true,
                        //默认是否自适应
                         autosize:true,    
                        //设置容器
                        container_id: 'tv_chart_container',
                        datafeed: this.datafeeds,
                        library_path: './static/tradeview/charting_library/',    
						locale: 'zh',               
                         enabled_features: ["hide_last_na_study_output", "study_templates"],
			            // 包含功能在默认情况下启用/禁用名称的数组。功能表示图表功能的一部分（更是UI/UX的一部分）  http://tradingview.gitee.io/featuresets 参考文档
//			            charts_storage_url: 'https://k.a.mom',  //设置图库页面
//						custom_css_url:"chart.css"  ,//引入外部css
			            // 下面三项是开发自己的后端用的 前台的请求会带着这三项值
			            charts_storage_api_version: "Index",
			            client_id: 'tradingview.com',
			            user_id: 'public_user_id',

            //禁用
            disabled_features: [
                //用户本地存储
                // "use_localstorage_for_settings",
                //左边工具栏
                "left_toolbar",
                // 顶部工具栏
                // "header_widget_dom_node",
                //周围边框
             //   "border_around_the_chart",
                //底部时间栏目
                "timeframes_toolbar",
                //k线与销量分开
                "volume_force_overlay",
                //图表右键菜单
                "pane_context_menu",
                //搜索
                "header_symbol_search", "symbol_search_hot_key",
                //左右箭头
                "header_undo_redo",
                //compare
                "header_compare",
                //图表类型
                "header_chart_type",
                //照相机
                "header_screenshot",
                //设置按钮
                //"header_settings",
                //技术指标线
                // "header_indicators",
                //上传下载按钮
                "header_saveload",
                //分辨率
               // "header_resolutions",
                //全屏
                "header_fullscreen_button"
            ],
            overrides: {
                //蜡烛样式
                "mainSeriesProperties.candleStyle.upColor": "#162431",
                "mainSeriesProperties.candleStyle.downColor": "#64ae74",

                //烛心
                // "mainSeriesProperties.candleStyle.drawWick" : true,
                //烛心颜色
                //"mainSeriesProperties.candleStyle.wickUpColor:" : '#64ae74',
                //"mainSeriesProperties.candleStyle.wickDownColor" : "#64ae74",

                //  白色烛心颜色
                // "mainSeriesProperties.candleStyle.wickUpColor:" : '#64ae74',
                // "mainSeriesProperties.candleStyle.wickDownColor" : "#64ae74",

               // 边框
				'mainSeriesProperties.candleStyle.drawBorder': true,
				'mainSeriesProperties.candleStyle.borderUpColor': '#64ae74',
				'mainSeriesProperties.candleStyle.borderDownColor': '#6d799a',

                //-----------------------------------------------------------------------
                //背景
                // "paneProperties.background" : "#1e222d",
                //  画布白色背景颜色
                "paneProperties.background": "#1e222d",
                //网格线
                "paneProperties.vertGridProperties.color": "#333",
                // "paneProperties.vertGridProperties.style" : 0,
                "paneProperties.horzGridProperties.color": "#333",
                // "paneProperties.horzGridProperties.style" : 0,
                //默认收缩行情信息
                "paneProperties.legendProperties.showLegend": false,
                //坐标轴和刻度标签颜色
                "scalesProperties.lineColor": "#cacaca",
                // "scalesProperties.textColor" : "#fff",
                "scalesProperties.textColor": "#666666",
                "mainSeriesProperties.areaStyle.color1": "#5E8BBF",
                "mainSeriesProperties.areaStyle.color2": "#D9E8F9",
                "mainSeriesProperties.areaStyle.linecolor": "#5E8BBF",
                //成交量高度
                "volumePaneSize": "medium",
                "MACDPaneSize": "tiny",
                'scalesProperties.fontSize': 12

            }
						
                    })
                    this.symbol = symbol
                    this.interval = interval
                    var thats = this.widgets;
					
                    this.widgets.onChartReady(function() {
                        //设置均线种类 均线样式
                /*        thats.chart().createStudy('Moving Average', false, false, [5], null, {'Plot.color': 'rgb(150, 95, 196)'});
                        thats.chart().createStudy('Moving Average', false, false, [10], null, {'Plot.color': 'rgb(116,149,187)'});
                        thats.chart().createStudy('Moving Average', false, false, [20],null,{"plot.color": "rgb(58,113,74)"});
                        thats.chart().createStudy('Moving Average', false, false, [30],null,{"plot.color": "rgb(118,32,99)"});*/
//自己重新定义
thats.MALine5 = thats.chart().createStudy('Moving Average', false, false, [5], null, {'Plot.color': '#642d92'});
thats.MALine10 = thats.chart().createStudy('Moving Average', false, false, [10], null, {'Plot.color': '#5278a3'});
thats.MALine30 = thats.chart().createStudy('Moving Average', false, false, [20], null, {'Plot.color': '#238031'});
thats.MALine60 = thats.chart().createStudy('Moving Average', false, false, [30], null, {'Plot.color': '#850058'});
//thats.chart().getStudyById(thats.MALine5).setVisible(false);
//thats.chart().getStudyById(thats.MALine10).setVisible(false);
//thats.chart().getStudyById(thats.MALine30).setVisible(false);
//thats.chart().getStudyById(thats.MALine60).setVisible(false);
						
						
					 
                        //设置自定义按钮种类 样式  事件
                       // thats.createButton()
							var Button=thats.createButton()		//自己改的
							//console.log(Button)    
                            $(Button).attr('title', "1min").addClass("mydate")
                            .text("1min")
							 .css("color", "#8992ad")
                            .on('click', function(e) {
                            $(this).parent().siblings().children().removeClass("clickBtn");
                            $(this).parent().siblings().children().addClass("mydate");
                            $(this).removeClass("mydate");
                            $(this).addClass("clickBtn");
                            thats.chart().setResolution('1', function onReadyCallback() {});
                            });
//                        thats.createButton().addClass("clickBtn")
							var Button=thats.createButton()			//自己改的
							//console.log(Button)    
                             $(Button).addClass("clickBtn").attr('title', "5min")
                            .text("5min")
							 .css("color", "#8992ad")
                            .on('click', function(e) {
                                    $(this).parent().siblings().children().removeClass("clickBtn");
                            $(this).parent().siblings().children().addClass("mydate");
                            $(this).removeClass("mydate");
                            $(this).addClass("clickBtn");
                            thats.chart().setResolution('5', function onReadyCallback() {});
                            });
//                        thats.createButton().addClass("mydate")
							var Button=thats.createButton()			//自己改的
                            $(Button).addClass("mydate").attr('title', "15min")
                            .text("15min")
 							.css("color", "#8992ad")
                            .on('click', function(e) {
                                    $(this).parent().siblings().children().removeClass("clickBtn");
                            $(this).parent().siblings().children().addClass("mydate");
                            $(this).removeClass("mydate");
                            $(this).addClass("clickBtn");
                            thats.chart().setResolution('15', function onReadyCallback() {});
                            });
                        //thats.createButton().addClass("mydate")
							var Button=thats.createButton()			//自己改的
                             $(Button).addClass("mydate").attr('title', "30min")
                            .text("30min")
                            .css("color", "#8992ad")
                            .on('click', function(e) {
                                    $(this).parent().siblings().children().removeClass("clickBtn");
                            $(this).parent().siblings().children().addClass("mydate");
                            $(this).removeClass("mydate");
                            $(this).addClass("clickBtn");
                            thats.chart().setResolution('30', function onReadyCallback() {});
                            });
                       // thats.createButton().addClass("mydate")
							var Button=thats.createButton()			//自己改的
                            $(Button).addClass("mydate").attr('title', "1H")
                            .text("1H")
							 .css("color", "#8992ad")
                            .on('click', function(e) {
                                    $(this).parent().siblings().children().removeClass("clickBtn");
                            $(this).parent().siblings().children().addClass("mydate");
                            $(this).removeClass("mydate");
                            $(this).addClass("clickBtn");
                            thats.chart().setResolution('60', function onReadyCallback() {});
                            });
                        //thats.createButton().addClass("mydate")
							var Button=thats.createButton()			//自己改的
                            $(Button).addClass("mydate").attr('title', "1D")
                            .text("1D")
 							.css("color", "#8992ad")
                            .on('click', function(e) {
                                    $(this).parent().siblings().children().removeClass("clickBtn");
                            $(this).parent().siblings().children().addClass("mydate");
                            $(this).removeClass("mydate");
                            $(this).addClass("clickBtn");
                            thats.chart().setResolution('240', function onReadyCallback() {});
                            });
                        
                  /*      thats.createButton().addClass("mydate")
                            .attr('title', "1day")
                            .text("1day")
                            .on('click', function(e) {
                                    $(this).parent().siblings().children().removeClass("clickBtn");
                            $(this).parent().siblings().children().addClass("mydate");
                            $(this).removeClass("mydate");
                            $(this).addClass("clickBtn");
                            thats.chart().setResolution('1D', function onReadyCallback() {});
                            });
                        thats.createButton().addClass("mydate")
                            .attr('title', "5day")
                            .text("5day")
                            .on('click', function(e) {
                                    $(this).parent().siblings().children().removeClass("clickBtn");
                            $(this).parent().siblings().children().addClass("mydate");
                            $(this).removeClass("mydate");
                            $(this).addClass("clickBtn");
                            thats.chart().setResolution('5D', function onReadyCallback() {});
                            });
                        thats.createButton().addClass("mydate")
                            .attr('title', "1week")
                            .text("1week")
                            .on('click', function(e) {
                                    $(this).parent().siblings().children().removeClass("clickBtn");
                            $(this).parent().siblings().children().addClass("mydate");
                            $(this).removeClass("mydate");
                            $(this).addClass("clickBtn");
                            thats.chart().setResolution('1W', function onReadyCallback() {});
                            });
                        thats.createButton().addClass("mydate")
                            .attr('title', "1mon")
                            .text("1mon")
                            .on('click', function(e) {
                                    $(this).parent().siblings().children().removeClass("clickBtn");
                            $(this).parent().siblings().children().addClass("mydate");
                            $(this).removeClass("mydate");
                            $(this).addClass("clickBtn");
                            thats.chart().setResolution('1M', function onReadyCallback() {});
                            });  
						*/ 
                    })
                }
            }

			
            TVjsApi.prototype.sendMessage = function(data) {
                var that = this;
                console.log("这是要发送的数据："+JSON.stringify(data) )
                if (this.socket.checkOpen()) {
                    this.socket.send(data)
                } else {
                    this.socket.on('open', function() {
                        that.socket.send(data)
                    })
                }
            }
            TVjsApi.prototype.unSubscribe = function(interval) {
				console.log("取消订阅:"+interval)
                if (interval < 60) {
					var to_sub={"type":"to_unsub",subject:"market."+this.symbol+"usdt.kline."+interval+"min"}
					this.sendMessage(to_sub)
                  /*  this.sendMessage({
                        cmd: 'unsub',
                        args: ["candle.M" + interval + "." + this.symbol.toLowerCase(), 1440, parseInt(Date.now() / 1000)]
                    })*/
                } else if (interval == 60) {
					var to_sub={"type":"to_unsub",subject:"market."+this.symbol+"usdt.kline."+interval+"min"}
					this.sendMessage(to_sub)
                 /*   this.sendMessage({
                        cmd: 'unsub',
                        args: ["candle.H" + (interval / 60) + "." + this.symbol.toLowerCase(), 1440, parseInt(Date.now() / 1000)]
                    })*/
                } else {
					var to_sub={"type":"to_unsub",subject:"market."+this.symbol+"usdt.kline.1day"}
					this.sendMessage(to_sub)
                  /*  this.sendMessage({
                        cmd: 'unsub',
                        args: ["candle.D1." + this.symbol.toLowerCase(), 207, parseInt(Date.now() / 1000)]
                    })*/
                }
            }
            TVjsApi.prototype.subscribe = function() {
				console.log("订阅:"+this.interval)
                if (this.interval < 60) {
					var to_sub={"type":"to_sub",subject:"market."+this.symbol+"usdt.kline."+this.interval+"min"}
					this.sendMessage(to_sub)
                  /*  this.sendMessage({
                        cmd: 'sub',
                        args: ["candle.M" + this.interval + "." + this.symbol.toLowerCase()]
                    })*/
                } else if (this.interval == 60) {
					var to_sub={"type":"to_sub",subject:"market."+this.symbol+"usdt.kline."+this.interval+"min"}
					this.sendMessage(to_sub)
                   /* this.sendMessage({
                        cmd: 'sub',
                        args: ["candle.H" + (this.interval / 60) + "." + this.symbol.toLowerCase()]
                    })*/
                } else {
					var to_sub={"type":"to_sub",subject:"market."+this.symbol+"usdt.kline.1day"}
					this.sendMessage(to_sub)
                  /*  this.sendMessage({
                        cmd: 'sub',
                        args: ["candle.D1." + this.symbol.toLowerCase()]
                    })*/
                }
            }
            TVjsApi.prototype.onMessage = function(data) {
                var thats = this.TVjsApi;
                count++;
                if(count<15){
               //     console.log("这是后台返回的数据"+count+"："+JSON.stringify(data) )
                }
               // console.log(data)
                if (data.data && data.data.length) {
                    var list = []
                    var ticker = thats.symbol + "-" + thats.interval;
                    var that = thats;
                    data.data.forEach(function(element) {
                        list.push({
                            time: that.interval !== 'D' || that.interval !== '1D' ? element.id * 1000 : element.id,
                            open: element.open,
                            high: element.high,
                            low: element.low,
                            close: element.close,
                            volume: element.vol
                        })
                    }, that)
					
                    thats.cacheData[ticker] = list
                    thats.lastTime = list[list.length - 1].time
					console.log(thats.lastTime)
                    thats.subscribe()
                }
//                if (data.type && data.type.indexOf(thats.symbol.toLowerCase()) !== -1) {
				if (data.ch && data.ch.indexOf(thats.symbol.toLowerCase()) !== -1) {   //自己改的
                     console.log(' >> sub:', data.ch)
                    thats.datafeeds.barsUpdater.updateData()
                    var ticker = thats.symbol + "-" + thats.interval;
					//console.log(data)
                    var barsData = {
                        time: data.id * 1000,
                        open: data.open,
                        high: data.high,
                        low: data.low,
                        close: data.close,
                        volume: data.vol
                    }
                    if (barsData.time >= thats.lastTime && thats.cacheData[ticker] && thats.cacheData[ticker].length) {
                        thats.cacheData[ticker][thats.cacheData[ticker].length - 1] = barsData
                    }
                }
            }
            TVjsApi.prototype.getBars = function(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback) {
                // console.log(' >> :', rangeStartDate, rangeEndDate)
                if (this.interval !== resolution) {
                    this.unSubscribe(this.interval)
                    this.interval = resolution
					console.log("初始化订阅:"+this.interval)
                    if (resolution < 60) {
						 var to_sub =  {"type":"get_all_k_line","symbol":this.symbol,"period":"5min"}
                		this.sendMessage(to_sub)
                     /*   this.sendMessage({
                            cmd: 'req',
                            args: ["candle.M" + this.interval + "." + this.symbol.toLowerCase(), 1440, parseInt(Date.now() / 1000)]
                        }) */
                    } else if (resolution >= 60) {
						 var to_sub =  {"type":"get_all_k_line","symbol":this.symbol,"period":"5min"}
                		this.sendMessage(to_sub)
                     /*   this.sendMessage({
                            cmd: 'req',
                            args: ["candle.H" + (this.interval / 60) + "." + this.symbol.toLowerCase(), 1440, parseInt(Date.now() / 1000)]
                        })*/
                    } else {
						 var to_sub =  {"type":"get_all_k_line","symbol":this.symbol,"period":"5min"}
                		this.sendMessage(to_sub)
                      /*  this.sendMessage({
                            cmd: 'req',
                            args: ["candle.D1." + this.symbol.toLowerCase(), 800, parseInt(Date.now() / 1000)]
                        })*/
                    }
                }
                var ticker = this.symbol + "-" + this.interval
                if (this.cacheData[ticker] && this.cacheData[ticker].length) {
                    this.isLoading = false
                    var newBars = []
                    this.cacheData[ticker].forEach(item => {
                        if (item.time >= rangeStartDate * 1000 && item.time <= rangeEndDate * 1000) {
                            newBars.push(item)
                        }
                    })
                    onLoadedCallback(newBars)
                } else {
                    var self = this
                    this.getBarTimer = setTimeout(function() {
                        self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback)
                    }, 10)
                }
            }
