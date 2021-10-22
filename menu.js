var animationFinished = true;
var currentlyOpenedMenu = -1;

function setEvents()
{
    $(".menu-item").on("click", function(event)
    {
        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();

        let index = $(this).index(".menu-item");

        let display = $($(".menu-wrapper")[index]).css("display");
        if (display == "block")
        {
            if (animationFinished == true)
            {
                animationFinished = false;
                $($(".menu-wrapper")[index]).animate({height: 0}, 500, function() 
                { 
                    $($(".menu-wrapper")[currentlyOpenedMenu]).css("display", "none");
                    currentlyOpenedMenu = -1;
                    animationFinished = true;
                });
            }            
        }
        else 
        {
            if (currentlyOpenedMenu != -1)
            {
                $($(".menu-wrapper")[currentlyOpenedMenu]).css("height", "0px");
                $($(".menu-wrapper")[currentlyOpenedMenu]).css("display", "none");
            }

            if (animationFinished == true)
            {
                animationFinished = false;
                $($(".menu-wrapper")[index]).css("height", "auto");
                let height = $($(".menu-wrapper")[index]).height();
                $($(".menu-wrapper")[index]).css("height", "0px");

                $($(".menu-wrapper")[index]).css("display", "block");
                $($(".menu-wrapper")[index]).animate({height: height}, 500, function() 
                {                    
                    currentlyOpenedMenu = index;
                    animationFinished = true;
                });
            }            
        }
    });

    $(".menu-wrapper").on("click", function(event)
    {
        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
    });

    $("html").on("click", function()
    {
        if (animationFinished == true && currentlyOpenedMenu != -1)
        {
            animationFinished = false;
            $($(".menu-wrapper")[currentlyOpenedMenu]).animate({height: 0}, 500, function() 
            {
                $($(".menu-wrapper")[currentlyOpenedMenu]).css("display", "none");
                animationFinished = true;
                currentlyOpenedMenu = -1;
            });
        }
    });
}

$(window).on("load", function()
{
    setEvents();
});