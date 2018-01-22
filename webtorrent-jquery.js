(function ($) {
  'use strict';
  /**
   * @param options.client      instance of WebTorrent
   * @param options.torrentId   get passed to client.add(torrentId)
   * @param options.opts        get passed to client.add(torrentId,opts)
   * @param options.torrentOn   event-handlers that get assigned in client.add() through torrent.on()
   */
  $.fn.webtorrent = function (options) {
    if (typeof options === 'undefined') {
      options = {};
    }
    if (typeof options.client === 'undefined') {
      options.client = new WebTorrent();
    }
    if (typeof options.torrentId === 'undefined') {
      options.torrentId = this.data('torrent-id');
    }
    if (typeof options.opts === 'undefined') {
      options.opts = {};
    }
    if (typeof options.torrentOn === 'undefined') {
      options.torrentOn = {};
    }
    var $elems = this.find('[data-filename]');
    options.client.add(options.torrentId, options.opts, function (torrent) {
      $.each(options.torrentOn, function (event, handler) {
        torrent.on(event, handler);
      });
      $elems.each(function (key, elem) {
        torrent.files.find(function (file) {
          return file.name === $(elem).data('filename');
        }).renderTo(elem);
      });
    });
  };
  $('[data-toggle="webtorrent"]').webtorrent();
}(jQuery));
