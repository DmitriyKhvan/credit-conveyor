import axios from "axios";

export default class TestService {
  
  _baseUrl = "http://10.8.8.70:4000";

//   authProcess = async (data) => {
//     const responce = await axios({
//     method: 'post',
//     url: `${this._baseUrl}/system/login`,
//     data
//     });
    
//     return responce.data;
//   }

//   startProcess = async (token) => {
//     const responce = await axios({
//       method: 'post',
//       headers: { 'BPMCSRFToken': token },
//       url: `${this._baseUrl}/processes?model=Issuance&container=ACC`
//     });
  
//     return responce.data;
//   }

  getTopics = async () => {
    console.log('Все топики');
    
    const responce = await axios({
      method: "get",
      url: `${this._baseUrl}/test/cat`
    });

    return responce.data;
  }

  getTests = async (id) => {
    const responce = await axios({
      method: "get",
      url: `${this._baseUrl}/test/get?id=${id}`
    });

    return responce.data;
  }

//   getUserDataFromReader = async () => {
    
//     const responce = await axios({
//       method: "get",
//       url: `${this._digIdUrl}/DataFromReader`,
//       timeout: 30000
//     });

//     return responce.data;
//   }

//   getUserDataFromService = async () => {
//     const responce = await axios({
//       method: "get",
//       url: `${this._digIdUrl}/DataFromService`,
//       timeout: 60000
//     })

//     return responce.data;
//   }
}