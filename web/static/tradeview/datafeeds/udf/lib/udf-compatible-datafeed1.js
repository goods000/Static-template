var detafeed_historyTime = 0

var detafeed_lastResolution = null

var detafeed_lastSymbol = null

var t_init = null

function FeedBase() {}

FeedBase.prototype.onReady = function(callback) {

  callback(this._configuration)

}

FeedBase.prototype.getSendSymbolName = function(symbolName) {

  var name = symbolName.split('/')

  return (name[0] + name[1]).toLocaleUpperCase()

}

FeedBase.prototype.resolveSymbol = function(symbolName, onResolve, onError) {

  onResolve({

    'name': symbolName,

    'timezone': 'Asia/Shanghai',

    'pricescale': 100,

    'minmov': 1,

    'minmov2': 0,

    'ticker': symbolName,

    'description': '',

    'session': '24x7',

    'type': 'bitcoin',

    'volume_precision': 10,

    'has_intraday': true,

    'intraday_multipliers': ['3', '5', '15', '60', '240', '1D'],

    'has_weekly_and_monthly': false,

    'has_no_volume': false,

    'regular_session': '24x7'

  })

}

FeedBase.prototype.getApiTime = function(resolution) {

  switch (resolution) {

    case '3':

      return '3m'

    case '5':

      return '5m'

    case '15':

      return '15m'

    case '60':

      return '1h'

    case '240':

      return '4h'

    case '1D':

      return '1d'

    default:

      return '15m'

  }

}

FeedBase.prototype.getBars = function(symbolInfo, resolution, rangeStartDate, rangeEndDate, onResult, onError) {

  if (!detafeed_historyTime || (resolution !== detafeed_lastResolution) || detafeed_lastSymbol !== symbolInfo.name) {

    // 储存请求过的产品

    detafeed_lastSymbol = symbolInfo.name

    // 记录目前时间搓，就用目前的目前时间搓往前请求历史数据

    detafeed_historyTime = Date.now()

  }

  clearInterval(t_init)

  const e_time = Number((Date.now() + '').substr(0, 9) + '0000')

  const r_data = {

    interval: this.getApiTime(resolution),

    symbol: this.getSendSymbolName(symbolInfo.name),

    startTime: '',

    limit: 500,

    endTime: e_time

  }

  $.ajax({

    type: 'POST',

    url: 'http://atoken-api.netmi.com.cn/wallet/bian/kline',

    contentType: 'application/json; charset=utf-8',

    data: JSON.stringify(r_data),

    dataType: 'json',

    success: function(data) {

      if (data.data.list && Array.isArray(data.data.list)) {

        // 记录这次请求的时间周期

        const k_list = data.data.list

        detafeed_lastResolution = resolution

        var meta = { noData: false }

        var bars = []

        if (k_list.length) {

          console.log(1)

          localStorage.setItem('k_open', Number(k_list[k_list.length - 1].open).toFixed(2))

          localStorage.setItem('k_high', Number(k_list[k_list.length - 1].high).toFixed(2))

          localStorage.setItem('k_low', Number(k_list[k_list.length - 1].low).toFixed(2))

          localStorage.setItem('k_close', Number(k_list[k_list.length - 1].close).toFixed(2))

          localStorage.setItem('k_volume', Number(k_list[k_list.length - 1].baseVolume).toFixed(2))

          detafeed_historyTime = e_time

          for (var i = 0; i < k_list.length; i += 1) {

            bars.push({

              time: k_list[i].openTime,

              close: k_list[i].close,

              open: k_list[i].open,

              high: k_list[i].high,

              low: k_list[i].low,

              volume: k_list[i].baseVolume

            })

          }

        } else {

          meta = { noData: true }

        }

        onResult(bars, meta)

      }

    },

    error: function(message) {

      console.log(message)

    }

  })

}

FeedBase.prototype.subscribeBars = function(symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {

  const self = this

  t_init = setInterval(function() {

    const e_time = Number((Date.now() + '').substr(0, 9) + '0000')

    const r_data = {

      interval: self.getApiTime(resolution),

      symbol: self.getSendSymbolName(symbolInfo.name),

      startTime: detafeed_historyTime,

      limit: 200,

      endTime: e_time

    }

    $.ajax({

      type: 'POST',

      url: 'http://atoken-api.netmi.com.cn/wallet/bian/kline',

      contentType: 'application/json; charset=utf-8',

      data: JSON.stringify(r_data),

      dataType: 'json',

      success: function(data) {

        if (data.data.list && Array.isArray(data.data.list)) {

          const k_list = data.data.list

          if (k_list.length) {

            localStorage.setItem('k_open', Number(k_list[k_list.length - 1].open).toFixed(2))

            localStorage.setItem('k_high', Number(k_list[k_list.length - 1].high).toFixed(2))

            localStorage.setItem('k_low', Number(k_list[k_list.length - 1].low).toFixed(2))

            localStorage.setItem('k_close', Number(k_list[k_list.length - 1].close).toFixed(2))

            localStorage.setItem('k_volume', Number(k_list[k_list.length - 1].baseVolume).toFixed(2))

            detafeed_historyTime = e_time

            for (var i = 0; i < k_list.length; i += 1) {

              onTick({

                time: k_list[i].openTime,

                close: k_list[i].close,

                open: k_list[i].open,

                high: k_list[i].high,

                low: k_list[i].low,

                volume: k_list[i].baseVolume

              })

            }

          }

        }

      },

      error: function(message) {

        console.log(message)

      }

    })

  }, 6000)

}

FeedBase.prototype.unsubscribeBars = function(listenerGuid) {

  // 取消订阅产品的callback

}