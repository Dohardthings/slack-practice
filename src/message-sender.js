import token from 'token';

function findIdForChannel(channelName) {

  const url = `
    https://slack.com/api/channels.list?
    token=${token}`

  return fetch(url, { method: "POST" })
    .then(res => res.json())
    .then(json => {
      let match

      json.channels.forEach(chan => {
        if (chan.name == channelName) {
          match = chan
        }
      })

      return match.id
    })
}

function sendMessageWithId(roomId, message) {
  console.log("Now sending", roomId, message)
  const url = `
    https://slack.com/api/chat.postMessage?
    token=${token}&
    channel=${roomId}&
    text=${message}`
  fetch(url, {method: "POST"})
}

function sendMessageToRoom(roomName, message) {
  const idPromise = findIdForChannel(roomName)

  return idPromise.then(id => sendMessageWithId(id, message))
}

export default sendMessageToRoom
