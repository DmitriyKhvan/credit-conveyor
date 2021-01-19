import axios from 'axios'

export default class CreditSettings {
	_baseUrl = 'http://10.8.8.90:8070'; //dev
  // _baseUrl = 'http://10.8.8.86:8070'; //prod
  // _baseUrl = "http://10.8.7.76:8070" //local

	getSettings = async () => {
		const responce = await axios({
			method: 'get', 
			url: `${this._baseUrl}/bpm/credit/get-all-settings`
		})
		return responce.data
  }
  
  updateSettings = async (data) => {
    const responce = await axios({
      method: 'post',
      url: `${this._baseUrl}/bpm/credit/update-settings`,
      data
    })

    return responce.data
  }

  removeItem = async (data) => {
    const responce = await axios({
      method: 'delete',
      url: `${this._baseUrl}/bpm/credit/delete-settings`,
      data
    })

    return responce.data
  }
}