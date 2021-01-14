import axios from 'axios'

export default class CreditSettings {
	_baseUrl = 'http://10.8.8.90:8070'; //dev
	// _baseUrl = 'http://10.8.8.86:8070'; //prod

	getSettings = async () => {
		const responce = await axios({
			method: 'get', 
			url: `${this._baseUrl}/bpm/credit/get-all-settings`
		})
		return responce.data
	}
}