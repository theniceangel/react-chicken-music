import originalJsonp from 'jsonp'

export default function jsonp (url, params, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + serialize(params)
  return new Promise((resolve, reject) => {
    originalJsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
function serialize (params) {
  let data = ''
  if (typeof params === 'object' && params) {
    for (let key in params) {
      data += '&' + key + '=' + encodeURIComponent(params[key])
    }
  }
  return data ? data.substring(1) : ''
}
