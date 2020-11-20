import BpmService from "../../services/bpm.service";
import CommonUtils from "@/shared/utils/CommonUtils";

export const credits = {
  namespaced: true,
  state: {
    creditCount: 0,
    taskId: "",
    userRole: "",
    // fileId: null, 
    messageBlock: {
      id: null, // чтоб различать две одинаковые ошибки
      message: null
    },
    roles: {
      //Admin: "CRM",
      // CreditManager: "CRM",
      CreditManager: "ROLE_KM",
      BackOfficee: "ROLE_BO",
      CreditCommitteeMember: "ROLE_CC",
      CreditSecretary: "ROLE_CCS",
      UnderWriter: "ROLE_UrWr",
      CreditCommitteeChief: "ROLE_CCC",
      ProcessManager: "ROLE_PM",

    },

    messageBar: false,
    bpmService: new BpmService(),

    scannerSerialNumber: null,
    disableInput: false,
    disableGCI: true,

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
      birthDate: "",
      gender: null,
      givenDate: "", // дата выдачи паспорта
      expDate: "",  // дата окончания паспорта
      client_code: "",
      client_uid: "",

      typeCredit: null,
      typeStepCredit: null,
      periodCredit: 0,
      loanRate: 0, //ставка по кредиту
      ProductMaxSum: 0, // маск. сумма по кредитному продукту
      spouseCost: 0,
      childCost: 0,

      // FAMILY //
      familyStatus: null,
      children: false,
      childrenCount: 0,
      // MONEY //
      income: 0, //подтвержденный ежемесячный доход
      loan_purpose: null,
      expense: 0, //периодические расходы
      otherExpenses: 0, //плата за облуживание других обязательств
      externalIncome: false, //наличие дополнительного дохода
      externalIncomeSize: 0, //размер дополнительного дохода
      additionalIncomeSource: "" //источник дополнительного дохода
    },

    reasonsList: [], // причины отказа от кредита
    infoList: {}, // информационный лист данные

    preApprovalData: {
      income: 0, // Сколько дохода учитываем
      expense: 0, // Сколько расходов
      maxPayment: 0, // Сколько может платить в месяц
      maxSum: 0 // Сколько максимум кредита можем выдать
    },
    creditTasks: [],
    pages: 0,
    // allPages: 0,
    loadings: [],

    countRowList: [
      {
        label: 10,
        value: 10,
      },
      {
        label: 20,
        value: 20,
      },
      {
        label: 30,
        value: 30,
      },
      {
        label: "Все",
        value: 0
      }
    ],

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
    async authBpm({ state, dispatch, commit, getters, rootGetters }, creditRole = null) {
     
      try {
        let userRole = null
        const empId = rootGetters["auth/empId"];
        console.log('empId', empId)

        // получение ролей пользователя
        const role = await dispatch("getUserRole", empId);
        console.log("userRole", role);

        const userRoles = role.value.map(i => {
          return state.roles[i.authority]
        })

        if (userRoles.find(i => i == creditRole)) {
          debugger
          userRole = creditRole
        } else {
          debugger
          userRole = userRoles.join()
        }

        console.log('userRole', userRole)
        debugger

        // запись роли в header запроса
        // await dispatch("setHeaderRole", state.roles[userRole]);
        await dispatch("setHeaderRole", userRole);
        commit("setUserRole", userRole)

        // запись роли в sessionStore
        sessionStorage.setItem("userRole", userRole)

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
        throw error
      }
    },

    async getUserRole({ state, commit }, payload) {
      return await state.bpmService.getUserRole(payload);
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
        throw error
      }
    },

    async getDigIdNumber({ state, commit }) {
      try {
        const response = await state.bpmService.getDigIdNumber();
        console.log(response.Answere.AnswereComment)
        if (response.Answere.AnswereComment == "OK") {
          // commit("sentScannerSerialNumber", response.ServiceInfo.ScannerSerial);
          commit("sentScannerSerialNumber", 1);
        } else {
          throw "Сканер не определен"
        }
      } catch (error) {
        // const errorMessage = CommonUtils.filterServerError(error);
        // commit("setMessage", errorMessage);
        throw error
      }
    },

    async getUserDataFromService({ state, commit }) {
      try {
        state.disableInput = true
        state.loadMessage = "Данные загружаются"
        const response = await state.bpmService.getUserDataFromService();
        if (response.answere.AnswereComment == "OK") {
          commit("sentPersonData", response)
          commit("sentScannerSerialNumber", null); //close button auto compleate
          state.loadMessage = ""
        } else {
          throw response.answere.AnswereComment
        }
      } catch (error) {
        state.disableInput = false
        state.loadMessage = ""
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
        throw error
      }
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

        // Проверить срабатывает ли catch

        //console.log('confirmCredit', response)
        // Продумать логику когда завершился процесс(taskId = null), а когда вышла ошибка!!!
        // if (response.nextTask.id) {
        //   commit("setTaskId", response.nextTask.id);
        //   sessionStorage.setItem("taskId", response.nextTask.id)
        // } else {
        //   throw 'Next task id is undefined'
        // }

        commit("setTaskId", response.nextTask.id);
        sessionStorage.setItem("taskId", response.nextTask.id)

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
        // sessionStorage.clear()
        // this.$router.push("/work/credit");
        throw error
      }
    },

    async getRoleTasks({ state, commit }, { page, count }) {
      try {
        const response = await state.bpmService.getRoleTasks({ page, count });
        console.log("creditList", response);
        if (response.infoList.length) {
          commit("setCreditTasks", { response, count });
        }
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
        sessionStorage.clear()
        this.$router.push("/work/credit");
        throw error
      }
    },

    async getUserTasks({ state, commit }, { page, count }) {
      try {
        const response = await state.bpmService.getUserTasks({ page, count });
        console.log('res', response)
        if (response.infoList.length) {
          commit("setCreditTasks", { response, count });
        }
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
        sessionStorage.clear()
        this.$router.push("/work/credit");
        throw error
      }
    },

    async creatFile({ state }, fileData) {
      try {
        const response = await state.bpmService.creatFile(fileData)
        console.log('cccccc', response)
        return response
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
        throw error
      }
    },

    async getFile({ state, commit, dispatch }, fileData) {
      try {
        let response = null;
        let file = null;
        if (typeof fileData == 'object') {
          file = await dispatch('creatFile', fileData)

          console.log('createFile', file)
          
          if (file.infos[0].id) {
            response = await state.bpmService.getFile(file.infos[0].id)
            // commit("setFileId", file.infos[0].id)
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
          id: file ? file.infos[0].id : fileData
          // fileName: file.infos[0].filename
        }

      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
        throw error
      }
    },

    async getProtocol({ state, commit, dispatch }, data) {
      try {
        const file = await state.bpmService.getProtocol(data)
        const response = await state.bpmService.getFile(file.infos[0].id)
        const blob = new Blob([response], { type: "application/pdf" })
        return {
          url: window.URL.createObjectURL(blob),
          id: file ? file.infos[0].id : fileData
          // fileName: file.infos[0].filename
        }
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
        throw error
      }
    },

    async checkClient({ state, commit, dispatch }, clientData) {
      try {
        const response = await state.bpmService.checkClient(clientData)
        console.log('GCI', response.internal)
        const code = response.output.find(i => i.name == 'code')
        const msg = response.output.find(i => i.name == 'response')

        if (code.data == 0) {
          state.disableGCI = false
          const client_resp = response.internal.find(i => i.name == 'client_resp')
          commit("setClientDataGCI", client_resp.data)
        } else if(code.data == 4) {
          // попробуйте снова
          state.disableGCI = false
          commit("resetClientDataGCI")
          throw msg.data
        } else {
          // разблокируем поля
          state.disableGCI = false
          commit("resetClientDataGCI")
          throw msg.data
        } 

      } catch (error) {
        state.disableGCI = false
        const errorMessage = CommonUtils.filterServerError(error);
        commit("setMessage", errorMessage);
        throw error
      }
    }
  },
  mutations: {
    resetClientDataGCI(state) {
      state.personalData.name = "";
      state.personalData.surname = "";
      state.personalData.mname = "";
      state.personalData.gender = null;
      state.personalData.passport = "";
      state.personalData.pinpp = null;
      state.personalData.inn = null;
      state.personalData.birthDate = ""
      state.personalData.givenDate = ""
      state.personalData.expDate = ""
      state.personalData.expDate = ""
      state.personalData.client_code = ""
      state.personalData.client_uid = ""
      state.personalData.phone = 998 
      state.personalData.familyStatus = null 
    },


    setClientDataGCI(state, payload) {
        state.personalData.name = payload.responseBody.response.items[0].first_name;
        state.personalData.surname = payload.responseBody.response.items[0].last_name;
        state.personalData.mname = payload.responseBody.response.items[0].patronym;
        state.personalData.gender = payload.responseBody.response.items[0].gender;
        state.personalData.passport = payload.responseBody.response.items[0].series + payload.responseBody.response.items[0].number;
        state.personalData.pinpp = payload.responseBody.response.items[0].pnfl;
        state.personalData.inn = payload.responseBody.response.items[0].tin;
        state.personalData.birthDate = payload.responseBody.response.items[0].birth_date
        state.personalData.givenDate = payload.responseBody.response.items[0].doc_issue_date
        state.personalData.expDate = payload.responseBody.response.items[0].doc_expire_date
        state.personalData.client_code = payload.responseBody.response.items[0].client_code
        state.personalData.client_uid = payload.responseBody.response.items[0].client_Uid
        state.personalData.phone = payload.responseBody.response.items[0].mobile_phone
                                    .replace(/[^0-9]/gim, "")
                                    .slice(-9).length == 9 
                                      ? "998" + payload.responseBody.response.items[0].mobile_phone
                                          .replace(/[^0-9]/gim, "")
                                          .slice(-9)
                                      : 998
        state.personalData.familyStatus = payload.responseBody.response.items[0].marital_status 
                                           ? +payload.responseBody.response.items[0].marital_status + 1
                                           : null
    },

    setPersonalData(state, payload) {
      state.personalData = payload
    },

    creditConfirm(state, payload) {
      state.preApprovalData.income = payload.incoming;
      state.preApprovalData.expense = payload.expenses;
      state.preApprovalData.maxPayment = payload.payment;
      state.preApprovalData.maxSum = payload.sum;
    },

    sentScannerSerialNumber(state, payload) {
      state.scannerSerialNumber = payload;
    },
    sentPersonData(state, payload) {
      console.log("Данные пользователя", payload);
      state.personalData.name = payload.Person.NameL;
      state.personalData.surname = payload.Person.SurnameL;
      state.personalData.mname = payload.Person.PatronymL;
      state.personalData.gender = payload.Person.Sex;
      state.personalData.passport = payload.Person.DocumentSerialNumber;
      state.personalData.pinpp = payload.Person.Pinpp;
      state.personalData.inn = payload.Person.Inn ? payload.Person.Inn : payload.Additional.Inn;
      state.personalData.personPhoto = payload.ModelPersonPhoto.PersonPhoto;
      state.personalData.birthDate = payload.Person.BirthDate
      state.personalData.givenDate = payload.Person.DocumentDateIssue
      state.personalData.expDate = payload.Person.DocumentDateValid
      state.DigID = true
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
        birthDate: "",
        gender: "",
        givenDate: "", // дата выдачи паспорта
        expDate: "",  // дата окончания паспорта
        client_code: "",
        client_uid: "",

        typeCredit: null,
        typeStepCredit: null,
        periodCredit: 0,
        loanRate: 0, //ставка по кредиту
        ProductMaxSum: 0, // маск. сумма по кредитному продукту
        spouseCost: 0,
        childCost: 0,

        // FAMILY //
        familyStatus: null,
        children: false,
        childrenCount: 0,

        // MONEY //
        income: 0, //подтвержденный ежемесячный доход
        loan_purpose: null, // цель кредитования
        expense: 0, //периодические расходы
        otherExpenses: 0, //плата за облуживание других обязательств
        externalIncome: false, //наличие дополнительного дохода
        externalIncomeSize: 0, //размер дополнительного дохода
        additionalIncomeSource: "" //источник дополнительного дохода
      };

    },

    resetMessageBar(state) {
      state.messageBar = false
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
      state.loadings = []
      // количество заявок в списке
      state.creditCount = payload.response.all < payload.count
        ? payload.response.all
        : payload.count

      state.countRowList.find(i => i.label === 'Все').value = payload.response.all

      state.pages = Math.ceil(payload.response.all / payload.count)

      for (let i = 0; i < state.creditCount * 2; i++) {
        state.loadings[i] = false
      }

      // state.creditTasks = payload.response.infoList

      state.creditTasks = payload.response.infoList.map(credit => {
        // let creditCompleate = credit.taskName == "Step: Решение о выдаче" 
        let creditCompleate = credit.taskName == "Step: Заполнить ПП"
          ? true
          : false
        let time = (new Date() - new Date(credit.date)) / (60 * 60 * 24 * 1000) > 1 ||
          credit.taskName == "ERROR: Ошибка создание Контракта в iABS" ||
          credit.taskName == "ERROR: Отправка в НИКИ - Ошибка" ||
          credit.taskName == "ERROR: Ошибка создание ПП в iABS"
          ? true
          : false

        return {
          ...credit,
          time,
          creditCompleate
        }
      })

      // state.creditTasks = payload.response.infoList.sort((a, b) => {
      //     if (b.date < a.date) {
      //       return -1
      //     }
      //     if (b.date > a.date) {
      //       return 1
      //     }
      //   })
    },

    clearCreditTasks(state) {
      state.creditTasks = [];
    },

    removeTask(state, taskId) {
      const idx = state.creditTasks.findIndex(i => i.taskId == taskId)
      state.creditTasks.splice(idx, 1)
    }

  },
  getters: {
    // credits: state => state,
    message: state => state.messageBlock.message,
    messageId: state => state.messageBlock.id,
    messageBar: state => state.messageBar,
    taskId: state => state.taskId,
    userRole: state => state.userRole,
    // creditTasks: state => {
    //   return state.creditTasks.map(credit => {
    //     let time = (new Date() - new Date(credit.date)) / (60 * 60 * 24 * 1000) > 1
    //             ? true
    //             : false

    //     return {
    //       ...credit,
    //       time
    //     }
    //   })
    // }
  }
};
