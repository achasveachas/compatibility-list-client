import fetch from 'isomorphic-fetch'
import { saveAs } from 'file-saver'

const BASE_URL = 'http://localhost:3000/api/v1'

const parseResponse = (response) => {
  return response.json()
    .then(json => {
      if (!response.ok) {
        return Promise.reject(json.errors)
      }

      return json
    })
}

export default {

  get(url, token) {
    const headers =  {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`

    }
    return fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: headers
    })
    .then(parseResponse)
  },

  getExcel(url, token) {
    const headers =  {
      'Content-Type': 'application/xlsx',
      'Authorization': `Bearer: ${token}`

    }
    return fetch(`${BASE_URL}${url}.xlsx`, {
      method: 'GET',
      headers: headers,
      responseType: 'blob'
    })
    .then(response => response.blob())
    .then((blob) => saveAs(blob, 'compatibility_list.xlsx'))
  },

  post(url, data ={}, token) {
    const body = JSON.stringify(data)

    const headers =  {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    }

    return fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: headers,
      body: body
    })
    .then(parseResponse)
  },

  patch(url, data ={}, token) {
    const body = JSON.stringify(data)

    const headers =  {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    }

    return fetch(`${BASE_URL}${url}`, {
      method: 'PATCH',
      headers: headers,
      body: body
    })
    .then(parseResponse)
  },

  delete(url, token) {
    const headers =  {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    }
    return fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: headers
    })
  }
}
