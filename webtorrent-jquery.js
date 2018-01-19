(function( $ ) {
  $.fn.webtorrent = function( options ) {
    if( typeof options === 'undefined' ) {
      options = {};
    }
    if( typeof options.client === 'undefined' ) {
      options.client = new WebTorrent();
    }
    if( typeof options.torrentId === 'undefined' ) {
      options.torrentId = this.data( 'torrent-id' );
    }
    if( typeof options.opts === 'undefined' ) {
      options.opts = {};
    }
    if( typeof options.events === 'undefined' ) {
      options.events = {};
    }
    var $elems = this.find( '[data-torrent-file]' );
    options.client.add( options.torrentId, options.opts, function( torrent ) {
      $.each( options.events, function( event, handler ) {
        torrent.on( event, handler );
      } );
      $elems.each( function( key, elem ) {
        torrent.files.find( function( file ) {
          return file.name === $( elem ).data( 'torrent-file' );
        } ).renderTo( elem );
      } );
    } );
  };
  $( '[data-toggle="webtorrent"]' ).webtorrent();
}( jQuery ));