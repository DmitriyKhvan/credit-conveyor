import BpmService from "../../services/bpm.service";
import CommonUtils from "@/shared/utils/CommonUtils";

export const credits = {
  namespaced: true,
  state: {
    taskId: "",
    userRole: "",
    fileId: null, 
    messageBlock: {
      id: null, // чтоб различать две одинаковые ошибки
      message: null
    },
    roles: {
      //Admin: "CRM",
      CreditManager: "CRM",
      BackOfficee: "BO",
      CreditCommitteeMember: "CCM",
      CreditSecretary: "CS"
    },
    
    confirm: false, // для модального окна расчета кредита
    messageBar: false,
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
      familyStatus: null,
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
    creditTasks: [],

    options: {
      confirmation: [
        {
          label: "Да",
          value: true
        },
        {
          label: "Нет",
          value: false
        }
      ]
    }
   
  },
  actions: {
    async authBpm({ state, dispatch, commit, getters, rootGetters }) {
      
      try {
        //console.log('username', getters["auth/username"])
        // получение empId пользователя
        //const empId = decode(await storegeService.getToken()).emp_id;
       
        const empId = rootGetters["auth/empId"];
        console.log('empId', empId)

        // получение ролей пользователя
        const role = await dispatch("getUserRole", empId);
        console.log("userRole", role);

        const userRole = role.value[0].authority

        // запись роли в header запроса
        await dispatch("setHeaderRole", state.roles[userRole]);

        commit("setUserRole", state.roles[userRole])

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
        commit("setMessage", errorMessage);
        sessionStorage.clear()
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
        commit("setMessage", errorMessage);
        sessionStorage.clear()
        this.$router.push("/work/credit");
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
          //sessionStorage.clear()
          commit("setTaskId", response.nextTask.id);
          sessionStorage.setItem("taskId", response.nextTask.id)
        } else {
          throw 'Next task id is undefined'
        }

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
        
        sessionStorage.clear()
        this.$router.push("/work/credit");
      }
    },

    async confirmationCredit({ state, commit, getters }, data) {
      // console.log("taskId", getters.taskId)
      try {
        const response = await state.bpmService.confirmationCredit({
          taskId: getters.taskId,
          data
        });

        //console.log('confirmCredit', response)
        if (response.nextTask.id || response.requestedTask.state === "completed") {
         
          commit("setTaskId", response.nextTask.id);
          sessionStorage.setItem("taskId", response.nextTask.id)
        } else {
          throw 'Next task id is undefined'
        }
        
        return response;
      } catch (error) {
        console.log('errorMessage', error)
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
        
        sessionStorage.clear()
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
        commit("setMessage", errorMessage);
        
        sessionStorage.clear()
        this.$router.push("/work/credit");
      }
    },

    async getUserTasks({ state, commit }) {
      try {
        const response = await state.bpmService.getUserTasks();
        console.log('res', response)
        if (response.infoList.length) {
          commit("setCreditTasks", response.infoList);
        }
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
        
        sessionStorage.clear()
        this.$router.push("/work/credit");
      }
    },

    async creatFile({state}, fileData) {
      try {
        const response = await state.bpmService.creatFile(fileData)
        console.log('cccccc', response)
        return response
      } catch(error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
      }
    },

    async getFile({state, commit, dispatch}, fileData) {
      try {
        let response = null;
        let file = null;
        if (typeof fileData == 'object') {
          file = await dispatch('creatFile', fileData)

          console.log('createFile', file)

          if (file.infos[0].id) {
            response = await state.bpmService.getFile(file.infos[0].id)
            commit("setFileId", file.infos[0].id)
          }

        } else {
          response = await state.bpmService.getFile(fileData)
          console.log('responsessssss', response)
        }
        
        const blob = new Blob([response], { type: "application/pdf" })
        // const blob = new Blob([response], { type: "application/octet-stream" })
        console.log('infos')
        return {
          url: window.URL.createObjectURL(blob),
          // fileName: file.infos[0].filename
        }
    
      } catch(error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
      }
    }, 

    async getDataFile({state, commit}) {
      return await state.bpmService.getDataFile()
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
        familyStatus: null,
        children: false,
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

    resetMessageBar(state) {
      state.messageBar = false
    },

    toggleScannerSerialNumber(state, payload) {
      state.scannerSerialNumber = payload;
    },

    setMessage(state, message) {
      console.log('setMsg', message)
      state.messageBlock.message = message;
      state.messageBlock.id = new Date();
    },

    toggleMessageBar(state, payload) {
      state.messageBar = payload;
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
    },

    setFileId(state, fileId) {
      state.fileId = fileId
    }
   
  },
  getters: {
    credits: state => state,
    message: state => state.messageBlock.message,
    messageId: state => state.messageBlock.id,
    messageBar: state => state.messageBar,
    taskId: state => state.taskId,
    creditTasks: state => state.creditTasks,
    userRole: state => state.userRole,
    fileId: state => state.fileId
  }
};
