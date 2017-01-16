// DOCS: https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/speechkit-dg-tts-docpage/
import _defaults from 'lodash/defaults';

// One yandex demo key.
const DEV_KEY = '069b6659-984b-4c5f-880e-aaedcfd84102';

export default function syth(options) {
  const query = _defaults(options, {
    format: 'mp3',
    lang: 'ru-RU',
    speaker: 'kostya',
    emotion: 'neutral',
    speed: 1,
    key: DEV_KEY
  });

  return fetch(
    `https://tts.voicetech.yandex.net/generate?${toQueryString(query)}`,
    {
      method: 'GET'
    }
  ).then(response => response.blob()).then(blob =>{
    const audio = new Audio(URL.createObjectURL(blob));
    audio.play();
  });
}


function toQueryString(obj) {
  let parts = [];
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
    }
  }
  return parts.join("&");
}
