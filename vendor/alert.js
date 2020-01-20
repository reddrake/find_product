var fpAlert = {
  prompt: function (message, style, time) {
    style = (style === undefined) ? 'alert-success' : style;
    time = (time === undefined) ? 3000 : time;
    $('<div>')
      .appendTo('body')
      .addClass('alert ' + style)
      .html(message)
      .fadeIn()
      .delay(time)
      .fadeOut(function () {
        $(this).remove()
      })
  },
  // 成功提示
  success: function (message, time) {
    this.prompt(message, 'alert-success', time);
  },

  // 失败提示
  fail: function (message, time) {
    this.prompt(message, 'alert-danger', time);
  },

  // 提醒
  warning: function (message, time) {
    this.prompt(message, 'alert-warning', time);
  },

  // 信息提示
  info: function (message, time) {
    this.prompt(message, 'alert-info', time);
  }
}