import BpmService from '../../services/bpm.service';
import storegeService from '../../services/storage.service';
import { decode } from 'jsonwebtoken';
import CommonUtils from '../../shared/utils/CommonUtils'

export default {
  state: {
    errorMessage: null,
    roles: {
      Администратор: "CRM",
      CreditManager: "CRM",
      BackOfficee: "BO",
      CreditCommitteeMember: "CCM",
      CreditSecretary: "CS"
    },
    confirm: false,
    errorBar: false,
    personalData: {
      surname: "",
      name: "",
      mname: "",
      inn: "",
      phone: 998,
      pinpp: "",
      passport: "",
      personPhoto: "",

      typeCredit: "",
      typeStepCredit: "",
      // FAMILY //
      familyStatus: "",
      children: "",
      childrenCount: 0,
      // MONEY //
      income: 0, //подтвержденный ежемесячный доход
      expense: 0, //периодические расходы
      otherExpenses: 0, //плата за облуживание других обязательств
      externalIncome: "", //наличие дополнительного дохода
      externalIncomeSize: 0, //размер дополнительного дохода
      additionalIncomeSource: "" //источник дополнительного дохода
    },
    preApprovalData: {
      income: 0, // Сколько дохода учитываем
      expense: 0, // Сколько расходов
      maxPayment: 0, // Сколько может платить в месяц
      maxSum: 0 // Сколько максимум кредита можем выдать
    },
    bpmService: new BpmService(),
    icon: false,
    loader: false,
    iconMessage: "",
    scannerSerialNumber: null,
    disableBtn: false,
    disableInput: false,
    submitting: false,
    loadMessage: ""
  },
  actions: {

    async authBpm({state, dispatch, commit}) {
      try {
          // получение id пользователя
          const userId = decode(await storegeService.getToken()).id;
          
          // получение ролей пользователя
          const role = await dispatch("getUserRole", userId)
          console.log("userRole", role)

          // запись роли в header запроса
          await dispatch("setHeaderRole", state.roles[role.value[0].name])
          //await dispatch("setHeaderRole", "ff")
        
          // получение BPM token 
          const csrf_token = await dispatch("getBPMToken")
          
          // запись BPM token в header запроса
          await dispatch("setHeaderBPM", csrf_token.csrf_token)

          // запись BPM token sessionStore
          sessionStorage.setItem("csrf_token", csrf_token.csrf_token);

          return csrf_token
      } catch (error) {
          const errorMessage = CommonUtils.filterServerError(error)
          commit('setError', errorMessage)
          sessionStorage.removeItem("csrf_token");
      }
    },

    async getUserRole({ state }, payload) {
      return await state.bpmService.getUserRole(payload)
    },

    async getBPMToken({ state, dispatch }) {
      return await state.bpmService.getBPMToken();
    },

    async setHeaderRole({ state }, payload) {
      return await state.bpmService.setHeaderRole(payload);
    },

    async setHeaderBPM({ state }, payload) {
      return await state.bpmService.setHeaderBPM(payload);
    },

    async startProcess({ state }) {
      try {
        return await state.bpmService.startProcess();
      } catch (error) {
          const errorMessage = CommonUtils.filterServerError(error)
          commit('setError', errorMessage)
          sessionStorage.removeItem("csrf_token");
      }
    },

    async getDigIdNumber({ state }) {
      return await state.bpmService.getDigIdNumber();
    },

    async getUserDataFromService({ state }) {
      return await state.bpmService.getUserDataFromService();
    },

    // async getUserDataFromReader({ state }) {
    //   return await state.bpmService.getUserDataFromReader();
    // },

    async getCreditList({ state }) {
      try {
        return await state.bpmService.getCreditList();
      } catch (error) {
          const errorMessage = CommonUtils.filterServerError(error)
          
          commit('setError', errorMessage)
          sessionStorage.removeItem("csrf_token");
      }
    }
  },
  mutations: {
    toggleConfirm(state, payload) {
      //console.log(state, payload);
      //state.confirm = payload.preApprovalForm;
      state.confirm = payload;
    },

    creditConfirm(state, payload) {
      state.preApprovalData.income = payload.income;
      state.preApprovalData.expense = payload.expense;
      state.preApprovalData.maxPayment = payload.maxPayment;
      state.preApprovalData.maxSum = payload.maxSum 
    },

    toggleSubmitting(state, payload) {
      state.submitting = payload
    },
    toggleDisableBtn(state, payload) {
      state.disableBtn = payload
    },
    toggleDisableInput(state, payload) {
      state.disableInput = payload
    },
    errorLoadData(state, payload) {
      // console.log(payload);
      state.icon = payload.flag;
      state.loader = payload.loader;
      state.iconMessage = payload.message
    },
    sentScannerSerialNumber(state, payload) {
      state.scannerSerialNumber = payload
    },
    loadMessageChange(state, payload) {
      state.loadMessage = payload
    },
    sentPersonData(state, payload) {
      console.log("Данные пользователя",payload);
      state.personalData.name = payload.personData.Name;
      state.personalData.surname = payload.personData.Surname;
      state.personalData.pinpp = payload.personData.Pinpp;
      state.personalData.passport = payload.personData.DocumentNumber;
      state.personalData.inn = payload.Inn;
      state.personalData.mname = payload.Patronym;
      state.personalData.personPhoto = payload.personPhoto;
    },
    resetPersonData(state) {
      state.personalData = {
        surname: "",
        name: "",
        mname: "",
        inn: "",
        phone: 998,
        pinpp: "",
        passport: "",
        personPhoto: "",
        // FAMILY //
        familyStatus: "",
        children: "",
        childrenCount: 0,
        // MONEY //
        income: 0, //подтвержденный ежемесячный доход
        expense: 0, //периодические расходы
        otherExpenses: 0, //плата за облуживание других обязательств
        externalIncome: "", //наличие дополнительного дохода
        externalIncomeSize: 0, //размер дополнительного дохода
        additionalIncomeSource: "" //источник дополнительного дохода
      }
    },
    
    toggleScannerSerialNumber(state, payload) {
      state.scannerSerialNumber = payload;
    },

    setError(state, error) {
      state.errorMessage = error
    },

    clearError(state) {
      state.errorMessage = null
    },

    toggleErrorBar(state, payload) {
      state.errorBar = payload
    }
  },
  getters: {
    error: state => state.errorMessage,
    typeCredit: state => state.personalData.typeCredit,
    errorBar: state => state.errorBar
  }
}