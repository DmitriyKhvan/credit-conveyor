import axios from "axios";
import BpmService from "./bpm.service";

export default class CreditSettings {
  bpmService = new BpmService();

  _personalUrl = this.bpmService._personalUrl;
  _baseUrl = this.bpmService._baseUrl;

  getSettings = async () => {
    const responce = await axios({
      method: "get",
      url: `${this._baseUrl}/bpm/credit/get-all-settings`
    });
    return responce.data;
  };

  updateSettings = async data => {
    const responce = await axios({
      method: "post",
      url: `${this._baseUrl}/bpm/credit/update-settings`,
      data
    });

    return responce.data;
  };

  removeItem = async data => {
    const responce = await axios({
      method: "delete",
      url: `${this._baseUrl}/bpm/credit/delete-settings`,
      data
    });

    return responce.data;
  };

  getFilialsAllowSalary = async () => {
    const responce = await axios({
      method: "get",
      url: `${this._personalUrl}/inps/access`
    });

    return responce.data;
  };

  updateFilialsAllowSalary = async data => {
    const responce = await axios({
      method: "post",
      url: `${this._personalUrl}/inps/access`,
      data
    });

    return responce.data;
  };

  removeFilialsAllowSalary = async mfo => {
    const responce = await axios({
      method: "delete",
      url: `${this._personalUrl}/inps/access?mfo=${mfo}`
    });

    return responce.data;
  };

  getINPSSalaryInput = async data => {
    const responce = await axios({
      method: "get",
      url: `${this._baseUrl}/bpm/credit/manual-inps?creditProductId=${data.creditId}&applicationId=${data.applicationId}`
    });

    return responce.data;
  };

  setDataAllowSallaryInput = async data => {
    const responce = await axios({
      method: "post",
      url: `${this._baseUrl}/bpm/credit/update-manual-inps-data/?applicationId=${data.applicationId}&input=${data.input}`
    });

    return responce.data;
  };

  getDataAllowSallaryInput = async applicationId => {
    const responce = await axios({
      method: "get",
      url: `${this._baseUrl}/bpm/credit/select-manual-inps-data/?applicationId=${applicationId}`
    });

    return responce.data;
  };
}
