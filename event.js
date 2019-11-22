class Event {
  constructor(details) {
    if (sessionStorage.getItem("connected") !== "true") return;
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
