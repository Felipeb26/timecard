/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});

function renderCalendar(ultimoDiaMes: number, ultimoDiaMesPassado: number, li:any, stop: number) {
  for (var i = ultimoDiaMes; i >= 5; i++) {
    const proximoDias = Math.abs(ultimoDiaMesPassado - i + 1);
    if (proximoDias != 0) {
      if (li[stop] !== undefined) {
        console.log("ok")
      } else {
        console.log("not ok")
      }
    }
  }
}
