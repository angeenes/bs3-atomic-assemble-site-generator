// IFFE + Constructor design pattern
(function ($, window, document, undefined)
{
  var Page = function (version, api) {
    this.version = '1.0.0 - Init version'
    this.api = 'http://api.domainname.com/',
        this.init()
  }

  Page.prototype = {
    init: function () {
      console.log('version', this.version)
    },
    methodName: function () {
      // your code here
    }
  }

  page = new Page() // can be a private variable as well "var ..."
})(jQuery, window, document)
