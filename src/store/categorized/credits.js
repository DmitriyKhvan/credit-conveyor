import BpmService from '../../services/bpm.service';


export default {
  state: {
    confirm: false,
    personalData: {
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

    async getUserRole({ state }, payload) {
      return await state.bpmService.getUserRole(payload)
    },

    async authProcess({ state, dispatch }, payload) {
      return await state.bpmService.authProcess(payload);
    },

    async startProcess({ state }, payload) {
      return await state.bpmService.startProcess(payload);
    },

    async getDigIdNumber({ state }) {
      return await state.bpmService.getDigIdNumber();
    },

    async getUserDataFromService({ state }) {
      return await state.bpmService.getUserDataFromService();
    },

    async getUserDataFromReader({ state }) {
      return await state.bpmService.getUserDataFromReader();
    },

    async setHeaderRole({ state }, payload) {
      return await state.bpmService.setHeaderRole(payload);
    },

    async setHeaderBPM({ state }, payload) {
      return await state.bpmService.setHeaderBPM(payload);
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
    toggleScannerSerialNumber(state, payload) {
      state.scannerSerialNumber = payload;
    }
  },
  getters: {

  }
}