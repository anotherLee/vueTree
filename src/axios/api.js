
import axios from 'axios'
import address from './url.js'

export function getTestData() {
  return axios({
    url: address.url,
    method: 'get'
  })
}
