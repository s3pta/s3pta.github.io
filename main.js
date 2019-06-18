$(document).ready(() => {
  $(window).on('scroll', () => {
    const scrollTop = $(this).scrollTop()
    const scrollLeft = $(this).scrollLeft()
    $('.BannerPicture').css({
      'transform': `translate(${scrollLeft / 2}px, ${scrollTop / 2}px)`
    })
  })
})
