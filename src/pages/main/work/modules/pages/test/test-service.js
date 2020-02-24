import axios from "axios";

export default class TestService {
  
  _baseUrl = "http://10.8.8.70:4000";

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

  sentTestAnswers = async (data) => {
    const responce = await axios({
      method: "post",
      url: `${this._baseUrl}/test/answer`,
      data
    });

    return responce.data;
  }
}