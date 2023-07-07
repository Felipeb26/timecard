/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const [token, email] = data.split("LIPE")

  renderCalendar(token, email)
    .then((data) => {
      console.log(data)
      console.log(data)
      postMessage("foi");
    })
    .catch((err) => {
      console.error(err)
      postMessage("não foi");
    })
});

function renderCalendar(token: string, email: string) {
  return fetch(`https://batsworks-timecard.onrender.com/batsworks/v1/persona/data?email=${encodeURIComponent(email)}`, {
    method: "GET", headers: { "Authorization": `Bearer ${token}` }
  })
}
