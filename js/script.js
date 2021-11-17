
$(function () {
    $('#photo-viewer').photoViewer().show().on('click', '.photo-frame', function (e) {
        let $content = $(this).clone().find('img').css({
            marginLeft: 0,
            marginTop: 0,
            width: '100%',
            height: 'auto'
        });

        e.preventDefault();

        // $content = $('#modalWrapper').detach();
        let modal = new Modal();

        modal.open({
            content: $content,
            width: 800,
            height: 450
        });

        
    });;

});

class Modal {
        
    constructor() {
        this.$window = $(window);
        this.$modal = $('<div class="modal"></div>');
        this.$content = $('<div class="modal-content"/>');
        this.$close = $('<button role="button" class="modal-close">Close</button>');

        this.$modal.append(this.$content, this.$close);
        this.$close.on('click', (e) => {
            e.preventDefault();
            this.close();
        });
    }

    center() {
        let top = Math.max(this.$window.height() - this.$modal.outerHeight(), 0) / 2;
        let left = Math.max(this.$window.width() - this.$modal.outerWidth(), 0) / 2;
        this.$modal.css({
            top: top + this.$window.scrollTop(),
            left: left + this.$window.scrollLeft()
        });
    }

    open(settings) { 
        this.$content.empty().append(settings.content);
        this.$modal.css({                          
            width: settings.width ?? 'auto',    
            height: settings.height || 'auto'   
        }).appendTo('body');                 
        this.center();                      
        this.$window.on('resize', () => this.center()); 
    }

    close() {         
        this.$content.empty();           
        this.$modal.detach();       
        this.$window.off('resize');
    }
}
