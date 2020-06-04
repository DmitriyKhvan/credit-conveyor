import axios from "axios";

export default class BpmService {
  
  // _baseUrlLocal = "http://10.8.7.71:8070/bpm"
  _personalUrl = "http://10.8.8.70:4000"
  _digIdUrl = "http://localhost:50000/api/Identification"
  _baseUrl = "http://10.8.8.90:8070" //test
  // _baseUrl = "http://10.8.8.86:8070"    //prod

  getBPMToken = async () => {
    const responce = await axios({
      method: 'post',
      url: `${this._baseUrl}/bpm/system/login`,
      timeout: 60000
    });
    return responce.data;
  }

  startProcess = async () => {
    const responce = await axios({
      method: 'post',
      url: `${this._baseUrl}/bpm/credit/start`
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
      url: `${this._baseUrl}/bpm/credit/calculation/${taskId}`,
      data
    })

    return responce.data;
  }

  confirmationCredit = async ({taskId, data}) => {
    const responce = await axios({
      method: "post",
      url: `${this._baseUrl}/bpm/credit/confirmation/${taskId}`,
      //url: `${this._baseUrl}/bpm/credit/confirmation/2078.10062`,
      data
    })

    return responce.data;
  }

  getRoleTasks = async () => {
    const responce = await axios({
      method: "get",
      url: `${this._baseUrl}/bpm/credit/roletasks`,
    })

    return responce.data
  }

  getUserTasks = async () => {
    const responce = await axios({
      method: "get",
      url: `${this._baseUrl}/bpm/credit/usertasks`,
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

  getFullForm = async (taskId) => {
    //console.log(taskId)
    const responce = await axios({
      method: "get",
      url: `${this._baseUrl}/bpm/credit/fullform/${taskId}`
    })
    return responce
  }

  setHeaderBPM(csrf_token) {
    axios.defaults.headers.common["BPMCSRFToken"] = csrf_token
  }

  setHeaderRole(role) {
    axios.defaults.headers.common["NBU-BPM-Role"] = role
  }

  // getHeaderRole() {
  //   return axios.headers.common["NBU-BPM-Role"]
  // }

  uploadFiles = async (data) => {
    //const fileName = "file full form profile"
    const responce = await axios({
      method: "post",
      //url: `${this._baseUrl}/file/singlefileupload?documentType=${fileName}`,
      url: `${this._baseUrl}/file/multiplefileupload`,
      data,
      headers: {'Content-Type': 'multipart/form-data'}
    })

    return responce.data
  }

  creatFile = async (data) => {
    const responce = await axios({
      method: "post", 
      url: `${this._baseUrl}/file/edocument`,
      data
    })

    return responce.data
  }

  getFile = async (id) => {
    const responce = await axios({
      method: "get",
      url: `${this._baseUrl}/file/edocument/${id}`,
      responseType: "arraybuffer"
    })

    return responce.data
  }
 }