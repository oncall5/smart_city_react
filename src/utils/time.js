export function transofrmTime(time) {
  let year = new Date(time * 1000).getFullYear();
  let month = new Date(time * 1000).getMonth() + 1;
  let day = new Date(time * 1000).getDate();

  let hours = new Date(time * 1000).getHours();
  let mins = new Date(time * 1000).getMinutes();
  let seconds = new Date(time * 1000).getSeconds();

  return year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + seconds;
}

export function transofrmTimeMs(time) {
  let year = new Date(time).getFullYear();
  let month = new Date(time).getMonth() + 1;
  let day = new Date(time).getDate();

  let hours = new Date(time).getHours();
  let mins = new Date(time).getMinutes();
  let seconds = new Date(time).getSeconds();

  return year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + seconds;
}
