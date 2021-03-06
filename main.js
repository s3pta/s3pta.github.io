if (!eventArray) var eventArray = []
$(document).ready(() => {
  
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "https://s3pta-api.glitch.me/check/" + sessionStorage.getItem("connected"))
  xhr.send()
  
  xhr.onreadystatechange = () => {
    if (xhr.readyState = XMLHttpRequest.DONE && xhr.status === 200) {
      const jsonResponse = JSON.parse(xhr.responseText)
      if (jsonResponse.connected === true) {
        $(".page").css("display", "block")
      } else {
        window.location.replace("https://s3pta.github.io/auth")
      }
    }
  }
  
  new Event({
      title: "Dia de Natal",
      allDay: true,
      day: 25,
      weekDay: "Friday",
      description: "Dia de Natal. Boas Festas!",
      month: "dezembro",
      year: 2019
  })
  
  new Event({
      title: "Ano Novo",
      allDay: true,
      day: 01,
      weekDay: "Wednesday",
      description: "Feliz Ano Novo!",
      month: "janeiro",
      year: 2020
  })
  
  $("td").each(function() {
    const td = $(this)
    eventArray.forEach(function (event) {
      if (event.day == td.text() && (td.hasClass("lastmonth") ? event.month === $("lastmonth").attr("id") : td.hasClass("nextmonth") ? event.month === $("nextmonth").attr("id") : event.month === $("#month").text().toLowerCase()) && (td.hasClass("nextyear") ? event.year == $("nextyear").attr("id") : td.hasClass("lastyear") ? event.year == $("lastyear").attr("id") : event.year == $("#year").text())) {
        td.addClass("red")
      }
    })
  })


  $(window).on('scroll', () => {
    const scrollTop = $(this).scrollTop()
    const scrollLeft = $(this).scrollLeft()
    $('.Title h1, .Title h2').css({
      'transform': `translate(${scrollLeft / 2}px, ${scrollTop / 2}px)`
    })
    if (scrollTop > 20) {
      $('.BannerPicture').css({
        'transform': `translate(${scrollLeft / 1.3}px, ${scrollTop / 1.3}px) scale(1.1)`,
        "filter": "blur(3px)"
      })
      $('.topnav').addClass('scrolled')
    } else {
      $('.BannerPicture').css({
        'transform': `translate(${scrollLeft / 1.3}px, ${scrollTop / 1.3}px) scale(1)`,
        "filter": "none"
      })
      $('.topnav').removeClass('scrolled')
    }
  })




  $("#navbutton").on("click", function() {
    if (!$(".dark2").hasClass("open")) {
      $("#sidenav").css("width", "250px")
      $("#sidenav a").css("display", "block")
      $(".dark2").addClass("open")
      $(".topnav").addClass("scrolled2")
      $("#navbutton .s1").css("transform", "translateY(8px) rotate(135deg) scale(1.2)")
      $("#navbutton .s2").css("display", "none")
      $("#navbutton .s3").css("transform", "rotate(-135deg) scale(1.2)")
      $("#navbutton .stripe").css("box-shadow", "none")
    } else {
      $("#sidenav").css("width", "0px")
      $("#sidenav a").css("display", "none")
      $(".dark2").removeClass("open")
      $(".topnav").removeClass("scrolled2")
      $("#navbutton .s1").css("transform", "rotate(0) scale(1)")
      $("#navbutton .s2").css("display", "block")
      $("#navbutton .s3").css("transform", "rotate(0) scale(1) translateY(0)")
      $("#navbutton .stripe").css("box-shadow", "0 0 5px rgba(0, 0, 0, .5)")
    }
  })


  $(".dark2").on("click", function() {
    if ($(".dark2").hasClass("open")) {
      $("#sidenav").css("width", "0px")
      $("#sidenav a").css("display", "none")
      $(".dark2").removeClass("open")
      $(".topnav").removeClass("scrolled2")
      $("#navbutton .s1").css("transform", "rotate(0) scale(1)")
      $("#navbutton .s2").css("display", "block")
      $("#navbutton .s3").css("transform", "rotate(0) scale(1) translateY(0)")
      $("#navbutton .stripe").css("box-shadow", "0 0 5px rgba(0, 0, 0, .5)")
    }
  })

  
  $( "td" ).on( "click", function() {
    const popup = $(".popup")
    if (!popup.hasClass("open")) {
      popup.addClass("open")
      $(".dark").addClass("open")
      popup.empty()
      const event = text($(this).text(), $(this).hasClass("lastmonth") ? $("lastmonth").attr("id") : ($(this).hasClass("nextmonth") ? $("nextmonth").attr("id") : $("#month").text().toLowerCase()), ($(this).hasClass("nextyear") ? $("nextyear").attr("id") : $(this).hasClass("lastyear") ? $("lastyear").attr("id") : $("#year").text()))
      if (event[0]) {
        event.forEach(event => {
          popup.append(`<h2 class="${event.eventId}">${event.title}</h2>`)
          popup.append(`<h5 class="${event.eventId}">${event.allDay ? "Todo o dia" : event.endTime ? `${event.beginTime} - ${event.endTime}` : `A partir das ${event.beginTime}`}</h5>`)
          popup.append(`<p class="${event.eventId}">${event.description}</p>`)
        })
      } else popup.append("<p>Não há eventos registados para este dia.</p>")
      const year = $(this).hasClass("nextyear") ? $("nextyear").attr("id") : $(this).hasClass("lastyear") ? $("lastyear").attr("id") : $("#year").text() 
      if ($(this).hasClass("nextmonth")) popup.prepend(`<h1>${$(this).text()} de ${$("nextmonth").attr("id").toLowerCase()} de ${year}</h1>`)
      else if ($(this).hasClass("lastmonth")) popup.prepend(`<h1>${$(this).text()} de ${$("lastmonth").attr("id").toLowerCase()} de ${year}</h1>`)
      else popup.prepend(`<h1>${$(this).text()} de ${$("#month").text().toLowerCase()} de ${year}</h1>`)
    }
    $(".dark").on("click", () => {
      const popup = $(".popup")
      if (popup.hasClass("open")) {
        popup.removeClass("open")
        $(".dark").removeClass("open")
      }
    })
  })
})

class Event {
  constructor(details) {
    let id = Math.floor(Math.random() * 1000) + 1
    async function loopArray() {
      if (!eventArray || eventArray.length == 0) return;
      for (let i = 0; i < eventArray.length; i++) {
        if (eventArray[i].eventId === id) {
          id = await Math.floor(Math.random() * 1000) + 1
          return loopArray()
        }
      }
      return;
    }
    loopArray().then(() => {
      this.eventId = id
    })
    if (details.title) this.title = details.title
    else throw new Error("A title is required!")
    if (details.description) this.description = details.description
    else throw new Error("A description is required!")
    if (details.allDay) this.allDay = details.allDay
    else {
      if (details.beginTime) this.beginTime = details.beginTime
      else throw new Error("No time specified")
    }
    if (details.endTime) this.endTime = details.endTime
    if (details.day) this.day = details.day
    if (details.weekDay) this.weekDay = details.weekDay
    else throw new Error("No day specified")
    if (details.month) this.month = details.month
    else throw new Error("No month specified")
    if (details.year) this.year = details.year
    else throw new Error("No year specified")
    eventArray.push(this)
    console.log(eventArray)
  }
}

function text(text, month, year) {
  const returnArray = []
  for (let i = 0; i < eventArray.length; i++) {
    if (eventArray[i].day == text && month === eventArray[i].month && year == eventArray[i].year) returnArray.push(eventArray[i])
  }
  return returnArray
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
