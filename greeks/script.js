$(document).ready(() => {
    $(window).on("scroll", function() {
        const scroll = $(this).scrollTop();
        $(".background").css("transform", `translateY(${scroll / 1.3}px)`)
        $(".title h1").css("transform", `translateY(${scroll / 2}px)`)
        $(".title h2").css("transform", `translateY(${scroll / 2}px)`)
    })
    $(".hidden").on("click", function() {
        if ($(this).hasClass("hidden")) {
            if (!$(this).hasClass("done")) {
                $(this).css("transform", "rotateY(180deg)")
                setTimeout(() => {
                    if (!$(this).hasClass("done")) {
                        $(this).find("p").css("transform", "scaleX(-1)")
                        $(this).find("img").css("transform", "scaleX(-1)")
                        $(this).removeClass("hidden")
                    }
                }, 2000 / 30)
                setTimeout(() => {
                    $(this).addClass("done")
                }, 15000 / 30)
            }
        }
        else {
            if ($(this).hasClass("done")) {
                $(this).css("transform", "rotateX(0deg)")
                setTimeout(() => {
                        $(this).find("p").css("transform", "scaleX(1)")
                        $(this).find(".question").css("transform", "scaleX(1) translate(-50%, -50%)")
                        $(this).find("img").css("transform", "scaleX(1)")
                        $(this).addClass("hidden")
                }, 1800 / 30)
                setTimeout(() => {
                    $(this).removeClass("done")
                }, 15000 / 30)
            }
        }
    })
})
