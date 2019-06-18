$(document).ready(() => {
  $(window).on('scroll', () => {
    const scrollTop = $(window).scrollTop
    const scrollLeft = $(window).scrollLeft
    $('.BannerPicture').css({
      'transform': `translate(${scrollLeft / 2}px, ${scrollTop / 2}px)`
    })
  })
})
