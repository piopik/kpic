//$(document).ready(function(){

    function kpic(){

        var kpicContainer=$('<div id="kpic"><div class="pic"><a class="close"></a><div class="number"><span class="a"></span> / <span class="b"></span></div><div class="black"><a class="arr left"></a><a class="arr right"></a><div class="title"></div></div></div></div>');
        kpicContainer.appendTo('body');

        var kpicContainerPic=kpicContainer.find('.pic');

        kpic = [];
        var viewport = {};
        viewport.w =  $(window).width();
        viewport.h = window.innerHeight;

        $('.kpic').each(function(){

            $(this).off("click");

            pic={'href':$(this).attr('href'),'title':$(this).attr('title')};

            if($(this).attr('data-kgallery')){
                gal=$(this).attr('data-kgallery');
            } else {
                gal=0;
            }

            if(!kpic[gal]){
                kpic[gal]= [];
            }

            $(this).attr('data-kid',kpic[gal].push(pic)-1);

        });


        var kpicOpen = [];

        function change(id,gal){

            if (kpic[gal][id] && id>=0){
                kpicContainer.addClass('loading');

                var img = new Image();
                img.src = kpic[gal][id].href;
                img.title = kpic[gal][id].title;

                kpicOpen.id = id;
                kpicOpen.gal = gal;

                kpicContainerPic.find('.number .a').html(kpicOpen.id+1);
                kpicContainerPic.find('.number .b').html(kpic[gal].length);

                img.onload = function() {

                    width=Math.min(this.width, 0.9*viewport.w);
                    height=Math.min(this.height, 0.9*viewport.h);

                    kpicContainerPic.css({'width':width,'height':height}).css({'margin-left':-width/2,'margin-top':-height/2,'background': 'url('+this.src+')'});
                    kpicContainerPic.find('.title').html(img.title);
                    kpicContainer.removeClass('loading');
                    kpicContainerPic.find('.arr').unbind();
                    kpicContainerPic.find('.left').bind( "click", function() {
                        change((kpicOpen.id-1),kpicOpen.gal );
                    });
                    kpicContainerPic.find('.right').bind( "click", function() {
                        change((kpicOpen.id+1),kpicOpen.gal );
                    });
                    $(document).unbind("keyup");
                    $(document).keyup(function(e) {
                        if (e.keyCode == 27) {
                            kpicContainer.removeClass('show');
                            kpicContainerPic.find('.title').html('');
                        } else if (e.keyCode == 37) {
                            change((kpicOpen.id-1),kpicOpen.gal );
                        } else if (e.keyCode == 39) {
                            change((kpicOpen.id+1),kpicOpen.gal );
                        }

                    });
                }
            }
        }

        $('.kpic').on("click",function(event){
            event.preventDefault();

            viewport.w =  $(window).width();
            viewport.h = window.innerHeight;

            kpicContainer.addClass('loading');

            var img = new Image();
            img.src = $(this).attr('href');
            img.title = $(this).attr('title');

            kpicOpen.id = $(this).data('kid');
            kpicOpen.gal = $(this).data('kgallery');

            kpicContainerPic.find('.number .a').html(kpicOpen.id+1);
            kpicContainerPic.find('.number .b').html(kpic[kpicOpen.gal].length);

            img.onload = function() {

                width=Math.min(this.width, 0.9*viewport.w);
                height=Math.min(this.height, 0.9*viewport.h);

                kpicContainerPic.css({'width':width,'height':height}).css({'margin-left':-width/2,'margin-top':-height/2,'background': 'url('+this.src+')'});
                kpicContainerPic.find('.title').html(img.title);
                kpicContainer.removeClass('loading');
                $(document).unbind("keyup");
                kpicContainerPic.find('.arr').unbind();
                kpicContainerPic.find('.left').bind( "click", function() {
                    change((kpicOpen.id-1),kpicOpen.gal );
                });
                kpicContainerPic.find('.right').bind( "click", function() {
                    change((kpicOpen.id+1),kpicOpen.gal );
                });
                $(document).keyup(function(e) {
                    if (e.keyCode == 27) {
                        kpicContainer.removeClass('show');
                        kpicContainerPic.find('.title').html('');
                    } else if (e.keyCode == 37) {
                        change((kpicOpen.id-1),kpicOpen.gal );
                    } else if (e.keyCode == 39) {
                        change((kpicOpen.id+1),kpicOpen.gal );
                    }
                });
            };

            kpicContainer.addClass('show');
        });

        kpicContainer.find('.close').on("click",function(e){
            if($(e.target).is('.pic')){
                e.preventDefault();
                return;
            }

            kpicContainer.removeClass('show');
            kpicContainerPic.find('.title').html('');
            kpicContainerPic.css({'background':'rgba(255,255,255,0.1)'});

        });
    };

window.kpic=kpic;
//});