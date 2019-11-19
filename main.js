let toggle = false
let toggle2 = false
const eventArray = []
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
    if (!toggle2) {
      $("#sidenav").css("width", "250px")
      $("#sidenav a").css("display", "block")
      $(".dark2").addClass("open")
      $(".topnav").addClass("scrolled2")
      toggle2 = true
    } else {
      $("#sidenav").css("width", "0px")
      $("#sidenav a").css("display", "none")
      $(".dark2").removeClass("open")
      $(".topnav").removeClass("scrolled2")
      toggle2 = false
    }
  })


  $(".dark2").on("click", function() {
    if (toggle2) {
      $("#sidenav").css("width", "0px")
      $("#sidenav a").css("display", "none")
      $(".dark2").removeClass("open")
      $(".topnav").removeClass("scrolled2")
      toggle2 = false
    }
  })

  
  $( "td" ).on( "click", function() {
    const popup = $(".popup")
    if (!toggle) {
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
      toggle = true
    }
    $(".dark").on("click", () => {
      const popup = $(".popup")
      if (toggle) {
        popup.removeClass("open")
        $(".dark").removeClass("open")
        toggle = false
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

