import BpmService from "../../services/bpm.service";
import storegeService from "../../services/storage.service";
import { decode } from "jsonwebtoken";
import CommonUtils from "@/shared/utils/CommonUtils";

export default {
  state: {
    taskId: "",
    userRole: "",
    errorMessage: {
      id: null, // чтоб различать две одинаковые ошибки
      message: null
    },
    roles: {
      Admin: "CRM",
      CreditManager: "CRM",
      BackOfficee: "BO",
      CreditCommitteeMember: "CCM",
      CreditSecretary: "CS"
    },
    loaderForm: true, // при загрузки формы preapproval
    confirm: false, // для модального окна расчета кредита
    errorBar: false,
    bpmService: new BpmService(),
    icon: false,
    loader: false,
    iconMessage: "",
    scannerSerialNumber: null,
    disableBtn: false,
    disableInput: false,
    submitting: false,
    loadMessage: "",
    personalData: {
      surname: "",
      name: "",
      mname: "",
      inn: null,
      phone: 998,
      pinpp: null,
      passport: "",
      personPhoto: "",

      typeCredit: null,
      typeStepCredit: null,
      periodCredit: 0,
      loanRate: 0, //ставка по кредиту
      spouseCost: 0,
      childCost: 0,

      // FAMILY //
      familyStatus: false,
      children: false,
      childrenCount: 0,
      // MONEY //
      income: 0, //подтвержденный ежемесячный доход
      expense: 0, //периодические расходы
      otherExpenses: 0, //плата за облуживание других обязательств
      externalIncome: false, //наличие дополнительного дохода
      externalIncomeSize: 0, //размер дополнительного дохода
      additionalIncomeSource: "" //источник дополнительного дохода
    },

    confirmCreditData: {
      output: [
        {
          name: "confirm",
          data: true
        },
        {
          name: "reasons",
          data: []
        }
      ]
    },

    reasonsList: [], // причины отказа от кредита

    preApprovalData: {
      income: 0, // Сколько дохода учитываем
      expense: 0, // Сколько расходов
      maxPayment: 0, // Сколько может платить в месяц
      maxSum: 0 // Сколько максимум кредита можем выдать
    },
    creditTasks: []
   
  },
  actions: {
    async authBpm({ state, dispatch, commit, getters }) {
      
      try {
        //console.log('username', getters["auth/username"])
        // получение empId пользователя
        //const empId = decode(await storegeService.getToken()).emp_id;
        const empId = getters["auth/empId"];

        // получение ролей пользователя
        const role = await dispatch("getUserRole", empId);
        console.log("userRole", role);

        const userRole = role.value[0].authority

        commit("setUserRole", userRole)

        // запись роли в header запроса
        await dispatch("setHeaderRole", state.roles[userRole]);
        //await dispatch("setHeaderRole", "ff")

        // запись роли в sessionStore
        sessionStorage.setItem("userRole", state.roles[userRole])

        // получение BPM token
        const csrf_token = await dispatch("getBPMToken");

        // запись BPM token в header запроса
        await dispatch("setHeaderBPM", csrf_token.csrf_token);

        // запись BPM token sessionStore
        sessionStorage.setItem("csrf_token", csrf_token.csrf_token);

        return csrf_token;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setError", errorMessage);
        sessionStorage.removeItem("csrf_token");
        this.$router.push("/work/credit");
      }
    },

    async getUserRole({ state, commit }, payload) {
      
      const response = await state.bpmService.getUserRole(payload);

      return response
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

    async startProcess({ state, commit }) {
      try {
        const response = await state.bpmService.startProcess();

        console.log("startProcess taskId ", response.userTaskCreditDetailed.id);
        if (response.userTaskCreditDetailed.id) {
          commit("setTaskId", response.userTaskCreditDetailed.id);
        }

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setError", errorMessage);
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

    async calculationCredit({ state, commit, getters }, data) {
      try {
        //console.log('calculation', payload)
        const response = await state.bpmService.calculationCredit({
          taskId: getters.taskId,
          data
        });

        console.log("calculCredit taskId ", response.nextTask.id);
        if (response.nextTask.id) {
          commit("setTaskId", response.nextTask.id);
        } else {
          throw 'Next task id is undefined'
        }

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setError", errorMessage);
        sessionStorage.removeItem("csrf_token");
      }
    },

    async confirmationCredit({ state, commit, getters }, data) {
      // console.log("taskId", getters.taskId)
      // debugger
      try {
        const response = await state.bpmService.confirmationCredit({
          taskId: getters.taskId,
          data
        });

        console.log('confirmCredit', response)
        debugger
        if (response.nextTask.id || response.requestedTask.state === "completed") {
          debugger
          commit("setTaskId", response.nextTask.id);
          sessionStorage.setItem("taskId", response.nextTask.id)
        } else {
          throw 'Next task id is undefined'
        }
        debugger
        return response;
      } catch (error) {
        console.log('errorMessage', error)
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setError", errorMessage);
        sessionStorage.removeItem("csrf_token");
      }
    },

    async getRoleTasks({ state, commit }) {
      try {
        const response = await state.bpmService.getRoleTasks();
        console.log("creditList", response);
        if (response.infoList.length) {
          commit("setCreditTasks", response.infoList);
        }
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setError", errorMessage);
        sessionStorage.removeItem("csrf_token");
        this.$router.push("/work/credit");
      }
    },

    async getUserTasks({ state, commit }) {
      try {
        const response = await state.bpmService.getUserTasks();
        if (response.infoList.length) {
          commit("setCreditTasks", response.infoList);
        }
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setError", errorMessage);
        sessionStorage.removeItem("csrf_token");
        this.$router.push("/work/credit");
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
      state.preApprovalData.maxSum = payload.maxSum;
    },

    toggleSubmitting(state, payload) {
      state.submitting = payload;
    },
    toggleDisableBtn(state, payload) {
      state.disableBtn = payload;
    },
    toggleDisableInput(state, payload) {
      state.disableInput = payload;
    },
    errorLoadData(state, payload) {
      // console.log(payload);
      state.icon = payload.flag;
      state.loader = payload.loader;
      state.iconMessage = payload.message;
    },
    sentScannerSerialNumber(state, payload) {
      state.scannerSerialNumber = payload;
    },
    loadMessageChange(state, payload) {
      state.loadMessage = payload;
    },
    sentPersonData(state, payload) {
      console.log("Данные пользователя", payload);
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

        typeCredit: null,
        typeStepCredit: null,
        periodCredit: 0,
        loanRate: 0, //ставка по кредиту
        spouseCost: 0,
        childCost: 0,

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
      };
    },

    toggleScannerSerialNumber(state, payload) {
      state.scannerSerialNumber = payload;
    },

    setError(state, error) {
      state.errorMessage.message = error;
      state.errorMessage.id = new Date();
    },

    clearError(state) {
      state.errorMessage = null;
    },

    toggleErrorBar(state, payload) {
      //state.errorMessage = null;
      state.errorBar = payload;
    },

    toggleLoaderForm(state, flag) {
      state.loaderForm = flag;
    },

    setTaskId(state, payload) {
      state.taskId = payload;
    },

    setUserRole(state, payload) {
      state.userRole = payload
    },

    setCreditTasks(state, payload) {
      payload.map(i => i.date = CommonUtils.dateFilter(i.date, "datetime"))
      state.creditTasks = payload;
    },

    clearCreditTasks(state) {
      state.creditTasks = [];
    }
   
  },
  getters: {
    error: state => state.errorMessage.message,
    errorId: state => state.errorMessage.id,
    errorBar: state => state.errorBar,
    taskId: state => state.taskId,
    creditTasks: state => state.creditTasks,
    userRole: state => state.userRole
  }
};
