

if (!eventArray) var eventArray = []
$(document).ready(() => {

  new Event({
      title: "Teste de C.I",
      beginTime: "09:20",
      day: 30,
      weekDay: "Thursday",
      description: "Neste dia teremos teste de Ciências Integradas. Para estudar, poderão usar as fichas que o respetivo professor vos entregou, as apresentação disponíveis no TEAMS, os apontamentos das aulas e o manual, da página 11 à 49. Bom estudo!",
      month: "outubro",
      year: 2019
  })

  new Event({
    title: "Teste de Matemática",
    beginTime: "12:45",
    day: 17,
    weekDay: "Thursday",
    description: "Neste dia iremos ter teste de Matemática. Toda a matéria necessária para estudar está na ficha que a professora deu com toda a matéria. Bom estudo!",
    month: "outubro",
    year: 2019
  })
  
  if (sessionStorage.getItem("connected") === "true") {
    $(".password").css("display", "none")
    $(".page").css("display", "block")
  } else {
    $(".page").html("<div></div>")
    eventArray = []
  }
  
  $("td").each(function() {
    const td = $(this)
    eventArray.forEach(function (event) {
      if (event.day == td.text() && (td.hasClass("lastmonth") ? event.month === $("lastmonth").attr("id") : td.hasClass("nextmonth") ? event.month === $("nextmonth").attr("id") : event.month === $("#month").text().toLowerCase()) && event.year == $("#year").text()) {
        td.addClass("red")
      }
    })
  })


  $(window).on('scroll', () => {
    const scrollTop = $(this).scrollTop()
    const scrollLeft = $(this).scrollLeft()
    $('.BannerPicture').css({
      'transform': `translate(${scrollLeft / 1.3}px, ${scrollTop / 1.3}px)`
    })
    $('.Title h1, .Title h2').css({
      'transform': `translate(${scrollLeft / 2}px, ${scrollTop / 2}px)`
    })
    if (scrollTop > 20) {
      $('.topnav').addClass('scrolled')
    } else {
      $('.topnav').removeClass('scrolled')
    }
  })




  $("#navbutton").on("click", function() {
    if (!$(".dark2").hasClass("open")) {
      $("#sidenav").css("width", "250px")
      $("#sidenav a").css("display", "block")
      $(".dark2").addClass("open")
      $(".topnav").addClass("scrolled2")
    } else {
      $("#sidenav").css("width", "0px")
      $("#sidenav a").css("display", "none")
      $(".dark2").removeClass("open")
      $(".topnav").removeClass("scrolled2")
    }
  })


  $(".dark2").on("click", function() {
    if (!$(".dark2").hasClass("open")) {
      $("#sidenav").css("width", "0px")
      $("#sidenav a").css("display", "none")
      $(".dark2").removeClass("open")
      $(".topnav").removeClass("scrolled2")
    }
  })

  
  $( "td" ).on( "click", function() {
    const popup = $(".popup")
    if (!popup.hasClass("open")) {
      popup.addClass("open")
      $(".dark").addClass("open")
      popup.empty()
      const event = text($(this).text(), $(this).hasClass("lastmonth") ? $("lastmonth").attr("id") : ($(this).hasClass("nextmonth") ? $("nextmonth").attr("id") : $("#month").text().toLowerCase()), $("#year").text())
      if (event[0]) {
        event.forEach(event => {
          popup.append(`<h2 class="${event.eventId}">${event.title}</h2>`)
          popup.append(`<h5 class="${event.eventId}">${event.allDay ? "Todo o dia" : event.endTime ? `${event.beginTime} - ${event.endTime}` : `A partir das ${event.beginTime}`}</h5>`)
          popup.append(`<p class="${event.eventId}">${event.description}</p>`)
        })
      } else popup.append("<p>Não há eventos registados para este dia.</p>")
      if ($(this).hasClass("nextmonth")) popup.prepend(`<h1>${$(this).text()} de ${$("nextmonth").attr("id").toLowerCase()}</h1>`)
      else if ($(this).hasClass("lastmonth")) popup.prepend(`<h1>${$(this).text()} de ${$("lastmonth").attr("id").toLowerCase()}</h1>`)
      else popup.prepend(`<h1>${$(this).text()} de ${$("#month").text().toLowerCase()}</h1>`)
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

function text(text, month, year) {
  const returnArray = []
  for (let i = 0; i < eventArray.length; i++) {
    if (eventArray[i].day == text && month === eventArray[i].month && year == eventArray[i].year) returnArray.push(eventArray[i])
  }
  return returnArray
}

function check() {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "https://s3pta-api.glitch.me/check/" + $("#password").val() + "/" + (window.location.href.split("/").pop() || "index"))
  xhr.send()
  
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.getResponseHeader("Content-Type"))
      if (xhr.getResponseHeader("Content-Type").includes("text/html")) {
        $(".password").css("display", "none")
        $(".page").css("display", "block")
        $(".page").html(xhr.responseText)
        sessionStorage.setItem("connected", true)
      } else $("#wrong").text("Palavra passe errada.")
    }
  }
}

$(".password form").submit(function(e) {
  e.preventDefault();
  check()
});
