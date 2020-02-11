import axios from "axios";

export default class BpmService {
  
  _baseUrl = "https://10.9.1.131:9443/bpm";
  _digIdUrl = "http://localhost:50000/api/Identification/";

  // data = {
  //   "refresh-groups": true,
  //   "requested-lifetime": 7200
  // };

  authProcess = async (data) => {
    const responce = await axios({
    method: 'post',
    url: `${this._baseUrl}/system/login`,
    data
    });
    
    return responce.data;
  }

  startProcess = async (token) => {
    const responce = await axios({
      method: 'post',
      headers: { 'BPMCSRFToken': token },
      url: `${this._baseUrl}/processes?model=Issuance&container=ACC`
    });
  
    return responce.data;
  }

  getDigIdNumber = async () => {
    console.log('Запрос на scannerNumber');
    
    const responce = await axios({
      method: "get",
      url: `${this._digIdUrl}/DataSerial`
    });

    return responce.data;
  }

  getUserDataFromReader = async () => {
    
    const responce = await axios({
      method: "get",
      url: `${this._digIdUrl}/DataFromReader`,
      timeout: 30000
    });

    return responce.data;
  }

  getUserDataFromService = async () => {
    const responce = await axios({
      method: "get",
      url: `${this._digIdUrl}/DataFromService`,
      timeout: 60000
    })

    return responce.data;
  }
}