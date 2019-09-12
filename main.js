let toggle = false
const eventArray = []
$(document).ready(() => {


  new Event({
      title: "Fotos",
      allDay: true,
      day: 12,
      weekDay: "Thursday",
      description: "Neste dia, iremos tirar as fotografias da escola. Não se esqueçam de trazer roupa apropriada!"
  })
  new Event({
    title: "sla",
    allDay: true,
    day: 12,
    weekDay: "Thursday",
    description: "Neste dia, iremos tirar as fotografias da escola. Não se esqueçam de trazer roupa apropriada!"
  })

  $("td").each(function() {
    const td = $(this)
    eventArray.forEach(function (event) {
      if (event.day == td.text()) {
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
  
  $( "td" ).on( "click", function() {
    const popup = $(".popup")
    if (!toggle) {
      popup.addClass("open")
      $(".dark").addClass("open")
      const event = text($(this).text())
      if (event) {
        $("#title").text(event.title)
        $("#event").text(event.description)
      }
      else {
        $("#title").text("Não há eventos para este dia")
        $("#event").text("")
      }
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

function text(text) {
  for (let i = 0; i < eventArray.length; i++) {
    if (eventArray[i].day == text) return eventArray[i]
  }
}

class Event {
  constructor(details) {
    this.eventId = Math.floor(Math.random() * 1000) + 1
    loopArray()
    async function loopArray() {
      for (let i = 0; i < eventArray.length; i++) {
        if (eventArray[i].eventId === this.eventId) {
          this.eventId = Math.floor(Math.random() * 1000) + 1
          loopArray()
          break
        }
      }
    }
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
    eventArray.push(this)
    console.log(eventArray)
  }
}
