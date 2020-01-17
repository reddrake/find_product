var prompt = function (message, style, time) {
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
};

// 成功提示
var success_prompt = function (message, time) {
  prompt(message, 'alert-success', time);
};

// 失败提示
var fail_prompt = function (message, time) {
  prompt(message, 'alert-danger', time);
};

// 提醒
var warning_prompt = function (message, time) {
  prompt(message, 'alert-warning', time);
};

// 信息提示
var info_prompt = function (message, time) {
  prompt(message, 'alert-info', time);
};