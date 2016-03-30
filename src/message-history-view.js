'use strict';

import token from 'token';
export default class MessageHistoryView {
  constructor(element) {
    this.element = element;
    this.renderHistoryView();
  }

  renderHistoryView() {
    document.querySelector(`.main`).innerHTML = `<h1>Message History</h1>
    <div class="history">${this.messages}</div>
    <input class="group-name" type="text" placeholder="Room Name"/>
    <button class="load-button">Load</button>`;

    const button = document.querySelector(`.load-button`);
    button.addEventListener(`click`, () => {
      const channelname = document.querySelector(`.group-name`).value;
      this.channelId = this.findIdForChannel(`${channelname}`);
      this.channelId.then(result => {this.currentChannelHistory();});
    });
  }
  findIdForChannel(channelname) {
    const url = `
      https://slack.com/api/channels.list?
      token=${token}`;
    return fetch(url, { method: `POST` })
      .then(res => res.json())
      .then(json => {
        let match;

        this.json.channels.forEach(chan => {
          if (chan.name === channelname) {
            match = chan;
          }
        });

        return match.id;
      });
  }

  currentChannelHistory() {
    return fetch(`https://slack.com/api/channels.history?
     token=${this.token}&
     channel=${this.channelId}`)

     .then((response) => response.json())
     .then((info) => {
       this.messages = info.messages;
       this.renderHistoryView();
     });
  }
}
