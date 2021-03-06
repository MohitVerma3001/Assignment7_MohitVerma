$.fn.photoViewer = function() {
    let request;
    let $current;
    let cache = {};

    let $frame = $('#photo-viewer');
    let $thumbs = $('.thumb');

    function crossfade($img) {
        if ($current) {
            $current.stop().fadeOut('slow');
        }
    
        $img.css ({
            marginLeft: -$img.width() / 2,
            marginTop: -$img.height() / 2
        });
    
        $img.stop().fadeTo('slow', 1);
        $current = $img;
    }


    this.on('click', '.thumb', function(e){
        let $img;
        let src = this.href;
        let request = src;

        e.preventDefault();
        $thumbs.removeClass('active');
        $(this).addClass('active');

        let p = $('.active').parent().attr('href');

        $('.photo-frame').children().attr('src', p);


        if (cache.hasOwnProperty(src)) {
            if (cache[src].isLoading === false) {
                crossfade(cache[src].$img);
            }
        } else {
            $img = $('<img/>');
    
            cache[src] = {
                $img: $img,
                isLoading: true
            };

            $img.on('load', function(){
                $img.hide();
                $frame.removeClass('is-loading').append($img);
                cache[src].isLoading = false;
                if(request === src) {
                    crossfade($img);
                }
            });
        
            $frame.addClass('is-loading');
        
            $img.attr({
                'src': src,
                'alt': this.title || ''
            });
        }

    });

    return this;


}













