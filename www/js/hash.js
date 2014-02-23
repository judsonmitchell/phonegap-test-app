// Be sure to bind to the "hashchange" event on document.ready, not
// before, or else it may fail in IE6/7. This limitation may be
// removed in a future revision.
$(function(){

    // Override the default behavior of all `a` elements so that, when
    // clicked, their `href` value is pushed onto the history hash
    // instead of being navigated to directly.
    //$('a').click(function(){
    //    var href = $(this).attr( 'href' );

    //    // Push this URL 'state' onto the history hash.
    //    $.bbq.pushState({ url: href });

    //    // Prevent the default click behavior.
    //    return false;
    //});

    // Bind a callback that executes when document.location.hash changes.
    $(window).bind( 'hashchange', function(e) {
        // In jQuery 1.4, use e.getState( 'url' );
        var url = $.bbq.getState( 'url' );

        // In this example, whenever the event is triggered, iterate over
        // all `a` elements, setting the class to 'current' if the
        // href matches (and removing it otherwise).
        $('ul.app-nav li').each(function(){
            var href = $(this).children('a').attr( 'href' );

            if ( href === url ) {
                $(this).addClass( 'active' );
            } else {
                $(this).removeClass( 'active' );
            }
        });

        // You probably want to actually do something useful here..
        var source = $('#' + url).html();
        var template = Handlebars.compile(source);
        $('.container-content').html(template);
    });

    // Since the event is only triggered when the hash changes, we need
    // to trigger the event now, to handle the hash the page may have
    // loaded with.
    $(window).trigger( 'hashchange' );
});
