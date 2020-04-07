import axios from "axios";

export default class BpmService {
  
  _baseUrl = "http://10.8.7.71:8070/bpm"
  _personalUrl = "http://10.8.8.70:4000"
  _digIdUrl = "http://localhost:50000/api/Identification"
  _uploadFileUrl = "http://10.8.8.90:8070"

  getBPMToken = async () => {
    const responce = await axios({
      method: 'post',
      url: `${this._baseUrl}/system/login`,
      timeout: 60000
    });
    
    return responce.data;
  }

  startProcess = async () => {
    const responce = await axios({
      method: 'post',
      url: `${this._baseUrl}/credit/start`
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

  calculationCredit = async ({taskId, data}) => {
    const responce = await axios({
      method: "post",
      url: `${this._baseUrl}/credit/calculation/${taskId}`,
      data
    })

    return responce.data;
  }

  confirmationCredit = async ({taskId, data}) => {
    const responce = await axios({
      method: "post",
      url: `${this._baseUrl}/credit/confirmation/${taskId}`,
      data
    })

    return responce.data;
  }

  getCreditList = async () => {
    
    const responce = await axios({
      method: "get",
      url: `${this._baseUrl}/processes`,
    })

    return responce.data
  }

  getUserRole = async (userId) => {
    const responce = await axios({
      method: "get",
      url: `${this._personalUrl}/roles/user?id=${userId}` 
    })

    return responce.data
  }

  setHeaderBPM(csrf_token) {
    axios.defaults.headers.common["BPMCSRFToken"] = csrf_token
  }

  setHeaderRole(role) {
    axios.defaults.headers.common["NBU-BPM-Role"] = role
  }

  uploadFiles = async (data) => {
    const fileName = "file full form profile"
    const responce = await axios({
      method: "post",
      url: `${this._uploadFileUrl}/file/?documentType=${fileName}`,
      data,
      headers: {'Content-Type': 'multipart/form-data'}
    })

    return responce.data
  }
 }