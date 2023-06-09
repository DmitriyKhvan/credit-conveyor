import BpmService from "../../services/bpm.service";
import CommonUtils from "@/shared/utils/CommonUtils";

export const profile = {
  namespaced: true,
  state: {
    bpmService: new BpmService(),
    resASOKI: null,
    payOrdersInput: null,
    payOrder: null,
    payOrders: {
      items: []
    },
    fullAmount: 0,
    BPMInput: null,
    allResponse: null,
    // preapprove_num: "",
    percent: 25,

    // avgSalary: null,
    // loanAbilityClass: null,
    // profit: null,
    // LoanMax: null,

    confirmCredit: false,

    //dictionaries: {},
    dictionaries: {
      Graduation: {
        items: []
      },
      additionalIncomeSource: {
        items: []
      },
      VehicleType: {
        items: []
      },
      employeesNum: {
        items: []
      },
      BusinessType: {
        items: []
      },
      DocumentType: {
        items: []
      },
      Reasons: {
        items: []
      },
      ClientRelationType: {
        items: []
      },
      Gender: {
        items: []
      },
      PropertyType: {
        items: []
      },
      LoanProduct: {
        items: []
      },
      DecisionType: {
        items: []
      },
      MainWorkType: {
        items: []
      },
      LoanDetails: {
        items: []
      },
      LoanPurpose: {
        items: []
      },
      PaymentsType: {
        items: []
      },
      PositionType: {
        items: []
      },
      MaritalStatus: {
        items: []
      },
      GuaranteeType: {
        items: []
      },
      FinancialSources: {
        items: []
      },
      Region: {
        items: []
      },
      Districts: {
        items: []
      },
      jobPeriods: {
        items: []
      },
      FamilyRelation: {
        items: []
      },
      Countries: {
        items: []
      }
    },
    //filesAll: [], // для фильтрации какие файлы загружены на сервер

    AddressType: [
      "Адрес постоянной регистрации",
      "Адрес фактического проживания",
      "Адрес временной регистрации"
    ],

    fullFormProfile: {
      Status: "",
      ApplicationID: "",
      // ProtocolNumber: "",
      client_code: "",
      client_uid: "",
      Number: "",
      Branch: "",
      BranchName: "",
      BODecision: null,
      FinalDecision: "", // отказ кредитного менеджера
      // Date: "",
      BOLogin: "", // логин авторизованного пользователя
      // Department: "",
      ClientManagerLogin: "", // при авторизации
      ClientManagerName: null,
      CreditCommiteeDecisions: {
        items: [
          // {
          //   Comment: "",
          //   MemberOfCCFIO: "",
          //   Login: "",
          //   Decision: "" (Y/N/R)
          // }
        ]
      },

      Customer: {
        CustomerId: 0,
        DigID: false,
        Email: "",
        FirstName: "",
        LastName: "",
        MiddleName: "",
        FullName: "",
        BirthDate: "",
        Country: 0,
        BirthCity: "",
        INN: "",
        PINPP: "",
        ResidentFlag: true,
        Gender: null,
        CardNumber: null, // номер карты
        BankInps: "09006", // инпс банка
        LSBO: false,
        role: "",
        filial: "",
        personal_id: "",

        Document: {
          documentType: 6,
          Series: "",
          Number: null,
          ExpirationDate: "",
          GivenDate: "",
          GUID: "",
          Country: "Uzbekistan",
          DocLink: "",
          DocumentName: "",
          Region: null,
          Districts: [],
          GivenPlace: null
        },

        Education: null,
        PhoneList: {
          items: [
            {
              Number: ""
            }
          ]
        },

        AddressList: {
          items: [
            {
              Building: "",
              OwnershipType: null,
              HouseType: "",
              PostalCode: "",
              Region: null,
              District: null,
              Street: "",
              Block: "",
              House: "",
              City: "",
              Apartment: "",
              AddressType: "Адрес постоянной регистрации",
              Districts: []
            },
            {
              Building: "",
              OwnershipType: null,
              HouseType: "",
              PostalCode: "",
              Region: null,
              District: null,
              Street: "",
              Block: "",
              House: "",
              City: "",
              Apartment: "",
              AddressType: "Адрес фактического проживания",
              Districts: []
            }
          ]
        },

        MaritalStatus: 0,
        hasChildren: false,
        // "ChildrenNum": 0,
        UnderAgeChildrenNum: 0,

        Relatives: {
          items: [
            // {
            //   FirstName: "",
            //   // FullName: "",
            //   FamilyConnectionType: null,
            //   LastName: "",
            //   MiddleName: "",
            //   BirthDate: "",
            //   LSBO: false,
            //   role: "",
            //   filial: "",
            //   personal_id: "",
            //   Document: {
            //     documentType: null,
            //     Series: "",
            //     Number: null,
            //     ExpirationDate: "",
            //     GivenDate: "",
            //     GUID: "",
            //     Country: "",
            //     DocLink: "",
            //     DocumentName: "",
            //     Region: null,
            //     Districts: [],
            //     GivenPlace: null
            //   }
            // }
          ]
        },

        JobInfo: {
          employerActivityType: null, //вид деятельности организации
          positionType: null, // Категория занимаемой должности
          INN: "",
          employeesNum: 0, // количество работников
          employerName: "", // Наименование работадателя
          totalJobExperienceMonths: 0, // общий трудовой стаж
          activeYears: 0, // срок деятельности
          position: "", // должность
          type: "", // вид деятельности
          lastJobExperienceMonths: 0 // стаж на последнем месте работы
        },

        // eжемесячные расходы
        MonthlyExpenses: {
          recurringExpenses: 0,
          obligations: 0
        },
        // ежемесячные доходы
        MonthlyIncome: {
          confirmMonthlyIncome: 0,
          hasAdditionalIncome: false,
          additionalIncome: {
            incomeType: 0,
            sum: 0
          }
        },

        PropertyInformation: {
          Realty_new: {
            items: []
          },
          Transport_new: {
            items: []
          }
        }
      },

      Guarantee: {
        Insurance: {
          items: []
        },
        RelatedLegalPerson: {
          items: []
        },
        RelatedPerson: {
          items: []
        }
      },

      LoanInfo: {
        LoanProduct: null, // Кредитный продукт
        Sum: 0, // Запрашиваемая сумма кредита
        Currency: "СУМ", // Валюта
        RepaymentType: null, // Тип графика гашения
        LoanType: null, // Вид кредита

        MinInterestRate: 0.0, // Процентаня ставка по кредиту (минимальная)
        MaxInterestRate: 0.0, // Процентная ставка по кредиту (максимальная)

        MaxDefferalRepaymentPeriod: 0, // Льготный период по погашению кредита

        ConvenientRepaymentTerm: 0, // Удобный день погашения в мес 1 - 31

        TermInMonth: 0, //Количество месяцев на кредит (удобный срок погашения в мес)

        MaxTermInMonths: 0, // Максимальное количество месяцев на кредит
        MinTermInMonths: 0, // Минимальное количество месяцев на кредит

        InitialPayment: 0, // Первоначальный взнос

        MaxInitialPaymentPercent: 0.0, // Процент первоначального взноса (максимальный)
        MinInitialPaymentPercent: 0.0, // Процент первоначального взноса (минимальный)

        LoanPurpose: null, // Цель кредитования

        //SellerName: "", // Наименование продавца

        //ProductName: "", // Наименование товара/работы/услуги

        FundingSource: null, // Источник финансирования
        loan_org_comission: null, //Комиссия за организацию кредита
        other_services: null, //Другие услуги

        FacilitiesForRepaymentDate: false,

        consumerLoan: {
          nameBankProd: "", // Наименование банка
          nameService: "", // Наименование товара/работы/услуги
          agreementDate: "", // Дата договора
          nameProduction: "", // Наименование продавца
          billProd: "", // Расчетный счет продавца
          agreementNumber: "", // Номер договора
          idBankProd: 0
        },
        //InitialPaymentPercent: 0
        ProductMaxSum: null, // максимальная сумма по кредитному продукту
        max_loan_sum_preapprove: null, // максимальная сумма кредита

        microloan_details: {
          mfo: "",
          bank_name: "",
          customer_bill: ""
        },

        collateral: null
      },
      profit: null,
      rejectDetails: [],
      // max_loan_sum: null,
      loanAbilityClass: null,
      loanKoeffCorr: null,

      ApplicationComment: {
        items: [
          // {
          //   Comment: "",
          //   Type: "",
          //   CommentPerson: "",
          //   CommentPersonFIO: "",
          // }
        ]
      },
      AttachedDocuments: {
        items: [
          // {
          //   "id": null,
          //   "DocLink": "",
          //   "DocumentName": "1"
          // }
        ]
      }
    }
  },
  actions: {
    async dataINPS({ state, commit }, data) {
      console.log(JSON.stringify(data, null, 2));
      try {
        const response = await state.bpmService.getDataINPS(data);
        console.log("getDataINPS", response.input);
        const code = response.input.find(i => i.label === "code");

        if (code && response.input) {
          const dataINPS = response.input.find(
            i => i.label === "clientWagesData"
          );
          const scoring = response.input.find(
            i => i.label === "preApprovalData"
          ).data;

          commit("setScoring", scoring);
          if (code.data == 0) {
            commit("setINNandNameOrg", dataINPS.data.wages.items.slice().pop());
          }

          return {
            salaries: dataINPS.data,
            code: code.data,
            msg: response.input.find(i => i.label === "msg").data
          };
        } else {
          // throw "Network Error";
          return {
            code: null,
            msg: "Не удалось получить данные от ИНПС сервиса"
          };
        }
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit(
          "credits/setMessage",
          { message: errorMessage, code: 0 },
          { root: true }
        );

        throw error;
      }
    },

    async viewDataINPS({ state, commit }, data) {
      try {
        const response = await state.bpmService.getDataINPS(data);
        const dataINPS = response.input.find(
          i => i.label === "clientWagesData"
        );

        if (dataINPS) {
          // return dataINPS.data
          return {
            salaries: dataINPS.data,
            code: 0,
            msg: ""
          };
        } else {
          throw "Нет данных";
        }
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit(
          "credits/setMessage",
          { message: errorMessage, code: 0 },
          { root: true }
        );
        throw error;
      }
    },

    async dataLSBO({ state, commit, getters }) {
      let users = [];

      state.fullFormProfile.Customer.Relatives.items.forEach(relative => {
        if (!relative.Document.Number || !relative.Document.Series) {
          throw {
            message: "Заполните все данные родственников!",
            code: 2
          };
        }

        users.push({
          pin: "",
          passNumber: relative.Document.Number,
          passSerial: relative.Document.Series
        });
      });
      users.push({
        // pin: state.fullFormProfile.Customer.PINPP, //ИНПС
        pin: "", //ИНПС
        passNumber: state.fullFormProfile.Customer.Document.Number,
        passSerial: state.fullFormProfile.Customer.Document.Series
      });

      const data = {
        input: [
          {
            name: "persons",
            data: users
          },
          {
            // data: state.preapprove_num,
            data: getters.preapprove_num,
            name: "application_id"
          }
        ]
      };

      console.log("lsbo", JSON.stringify(data, null, 2));

      try {
        const response = await state.bpmService.getDataLSBO(data);

        const dataLSBO = response.input.find(i => i.label === "response");

        if (dataLSBO) {
          commit("setLSBO", dataLSBO);
        }
      } catch (error) {
        throw error;
      }
    },

    async clientInfo({ state, commit }) {
      const data = {
        input: [
          {
            // data: "589196899",
            data: state.fullFormProfile.Customer.INN,
            name: "clientInn"
          },
          {
            // data: "0",
            data: state.fullFormProfile.Customer.CustomerId,
            name: "customerId"
          },
          {
            // data: "12345",
            // data: state.fullFormProfile.ApplicationID,
            data: state.fullFormProfile.Number,
            name: "appId"
          }
        ]
      };

      try {
        const response = await state.bpmService.getClientInfo(data);
        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit(
          "credits/setMessage",
          { message: errorMessage, code: 0 },
          { root: true }
        );
        throw error;
      }
    },

    async clientASOKI({ state, commit }) {
      // console.log('dddd', state.BPMInput)
      const application = state.BPMInput.find(i => i.label == "application")
        .data;
      const dictionaries = state.BPMInput.find(
        i => i.label == "inputDictionaries"
      ).data;
      const preApplication_number = state.BPMInput.find(
        i => i.label == "preapprove_num"
      ).data;

      const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

      const ASOKIInfo = async processId => {
        let res = null;
        await sleep(2 * 60 * 1000);

        res = await state.bpmService.getASOKIInfo(processId);

        // if (res.state != 'completed' || res.state != 'closed') {
        //   ASOKIInfo(res.id)
        // }

        if (
          res.state == "completed" ||
          res.state == "closed" ||
          res.state == "finished"
        ) {
          commit("setASOKI", res);
          return (state.resASOKI = res);
        } else {
          await ASOKIInfo(res.id);
        }
      };

      const objectTransform = dictionaries => {
        for (let item in dictionaries) {
          // if(item == "Branches") continue
          // if (item == "Insurance_company") continue;

          if (
            typeof dictionaries[item] === "object" &&
            dictionaries[item] != null
          ) {
            if (dictionaries[item].items) {
              for (let value of dictionaries[item].items) {
                if (!value.value) {
                  objectTransform(value);
                } else {
                  value["name"] = value.label;
                  delete value.label;
                }
                //value.value = Number(value.value)
              }
            }
          }
        }

        return dictionaries;
      };

      const dictionariesTransform = objectTransform(dictionaries);
      console.log("dictionariesTransform", dictionariesTransform);

      const data = {
        input: [
          {
            name: "application",
            data: application
          },
          {
            name: "dictionaries",
            data: dictionariesTransform
          },
          {
            name: "preApplication_number",
            data: preApplication_number
          }
        ]
      };

      console.log(JSON.stringify(data, null, 2));

      try {
        const startASOKI = await state.bpmService.getClientASOKI(data);
        await ASOKIInfo(startASOKI.id);

        return state.resASOKI;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit(
          "credits/setMessage",
          { message: errorMessage, code: 0 },
          { root: true }
        );
        throw error;
      }
    },

    async getBankBranches({ state, commit }, MFO) {
      try {
        const response = await state.bpmService.getBankBranches(MFO);
        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit(
          "credits/setMessage",
          { message: errorMessage, code: 0 },
          { root: true }
        );
        throw error;
      }
    },

    async uploadFiles({ state, commit }, data) {
      console.log("uploadFiles", data);
      try {
        const response = await state.bpmService.uploadFiles(data);
        console.log("responseFile", response);

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit(
          "credits/setMessage",
          { message: errorMessage, code: 0 },
          { root: true }
        );
        throw error;
      }
    },

    async removeFiles({ state, commit }, id) {
      try {
        const response = await state.bpmService.removeFiles(id);
        console.log("responseFile", response);

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit(
          "credits/setMessage",
          { message: errorMessage, code: 0 },
          { root: true }
        );
        throw error;
      }
    },

    async getFullForm({ state, commit, getters, rootGetters }, taskId) {
      commit("resetDataFullFormProfile");

      let response;
      try {
        if (taskId) {
          response = await state.bpmService.getFullForm(taskId);
          return response;
        } else {
          response = await state.bpmService.getFullForm(
            rootGetters["credits/taskId"]
          );
        }

        console.log("response", response);

        if (response.data.input && response.data.input.length) {
          if (response.data.name === "Get Payment data") {
            const payOrdersInput = response.data.input;

            console.log(JSON.stringify(payOrdersInput, null, 2));

            commit("setPayOrder", payOrdersInput);
          } else {
            const data = response.data.input.find(
              i => i.label === "application"
            ).data;
            const dictionaries = response.data.input.find(
              i => i.label === "inputDictionaries"
            ).data;

            commit("setAllResponse", JSON.parse(JSON.stringify(response.data))); // all response from BPM
            commit("setInput", JSON.parse(JSON.stringify(response.data.input))); // all input from BPM
            commit("setDictionaries", dictionaries);

            // кредит не оформлен
            if (
              response.data.name == "Full Application Filling" &&
              data.BODecision == null
            ) {
              commit("setPreapprovData", data);
            } else {
              commit("setFullForm", data);
            }
          }
        } else {
          throw "Data is null";
        }

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit(
          "credits/setMessage",
          { message: errorMessage, code: 0 },
          { root: true }
        );
        sessionStorage.clear();
        //this.$router.push("/work/credit");
        // this.$router.go(-1);
        throw error;
      }
    },

    async getHistoryTask({ state, commit }, applicationId) {
      try {
        const response = await state.bpmService.getHistoryTask(applicationId);
        return response;
      } catch (error) {
        commit(
          "credits/setMessage",
          {
            message: CommonUtils.filterServerError(error),
            code: 0
          },
          { root: true }
        );

        throw error;
      }
    }
  },
  mutations: {
    setASOKI(state, ASOKI) {
      const loanAbilityClass = ASOKI.output.find(
        i => i.name == "loanAbilityClass"
      );
      const loanKoeffCorr = ASOKI.output.find(i => i.name == "loanKoeffCorr");
      const new_max_loan = ASOKI.output.find(i => i.name == "new_max_loan");
      state.fullFormProfile.LoanInfo.max_loan_sum_preapprove = new_max_loan
        ? new_max_loan.data
        : state.fullFormProfile.LoanInfo.max_loan_sum_preapprove;
      (state.loanAbilityClass = loanAbilityClass
        ? loanAbilityClass.data
        : null),
        (state.loanKoeffCorr = loanKoeffCorr ? loanKoeffCorr.data : null);
    },

    setLSBO(state, dataLSBO) {
      dataLSBO.data.items.forEach(user => {
        if (state.fullFormProfile.Customer.Document.Number == user.passNumber) {
          state.fullFormProfile.Customer.LSBO = user.lsbo ? user.lsbo : false;
          state.fullFormProfile.Customer.role = user.role
            ? CommonUtils.decoder(user.role)
            : "";
          state.fullFormProfile.Customer.filial = user.filial
            ? user.filial
            : "";
        }

        let relative = state.fullFormProfile.Customer.Relatives.items.find(
          rel => rel.Document.Number == user.passNumber
        );
        // console.log('relative', relative)
        if (relative) {
          relative.role = user.role ? CommonUtils.decoder(user.role) : "";
          relative.LSBO = user.lsbo ? user.lsbo : false;
          relative.filial = user.filial ? user.filial : "";
        }
      });

      const lsbo = dataLSBO.data.items.findIndex(lsbo => lsbo.lsbo);

      console.log("lsboFlag", lsbo);
      if (lsbo !== -1) {
        state.percent = 30;
      } else {
        state.percent = 25;
      }
    },

    setInput(state, input) {
      state.BPMInput = input;
    },

    setAllResponse(state, allResponse) {
      state.allResponse = allResponse;
    },

    // setPreapproveNum(state, preapprove_num) {
    //   state.preapprove_num = preapprove_num;
    // },

    setPayOrder(state, payOrdersInput) {
      state.payOrders = [];
      state.payOrders = payOrdersInput.find(i => i.label === "payOrder").data;

      state.payOrder = payOrdersInput.find(
        i => i.label === "payOrderTemplate"
      ).data;

      state.fullAmount = payOrdersInput.find(i => i.label == "fullAmount").data;
      if (!state.payOrders.items.length) {
        state.payOrders.items.push(
          JSON.parse(
            JSON.stringify(
              payOrdersInput.find(i => i.label === "payOrderTemplate").data
            )
          )
        );
      }
      state.payOrdersInput = payOrdersInput;
    },

    // setProcessInfo(state, processInfo) {
    //   state.avgSalary = processInfo.avgSalary;
    //   state.loanAbilityClass = processInfo.loanAbilityClass;
    //   state.profit = processInfo.profit;
    //   state.LoanMax = processInfo.LoanMax;
    // },

    setScoring(state, payload) {
      state.fullFormProfile.Customer.MonthlyIncome.confirmMonthlyIncome =
        payload.incoming;
      state.fullFormProfile.Customer.MonthlyExpenses.recurringExpenses =
        payload.expenses;
      // state.fullFormProfile.Customer.MonthlyIncome.additionalIncome.sum = payload.payment
      state.fullFormProfile.LoanInfo.max_loan_sum_preapprove = payload.sum;

      // state.fullFormProfile.max_loan_sum = Math.min(state.fullFormProfile.LoanInfo.ProductMaxSum, state.fullFormProfile.LoanInfo.max_loan_sum_preapprove);
    },

    setINNandNameOrg(state, payload) {
      // if (state.fullFormProfile.Customer.JobInfo.type == 1) {
      state.fullFormProfile.Customer.JobInfo.employerName = payload.org_name;
      state.fullFormProfile.Customer.JobInfo.INN = payload.inn;
      // }
    },

    setFullForm(state, payload) {
      // Для корректной валидации
      // payload.Customer.Document.Number = String(payload.Customer.Document.Number)
      // payload.Customer.Relatives.items.map(i => i.Document.Number = String(i.Document.Number))
      // payload.Guarantee.RelatedPerson.items.map(i => i.Document.Number = String(i.Document.Number))

      state.fullFormProfile = payload;
    },

    setPreapprovData(state, payload) {
      // Для корректной валидации
      state.fullFormProfile.ApplicationID = payload.ApplicationID;
      state.fullFormProfile.BODecision = payload.BODecision;
      state.fullFormProfile.client_code = payload.client_code;
      state.fullFormProfile.client_uid = payload.client_uid;
      state.fullFormProfile.Number = payload.Number;
      state.fullFormProfile.Branch = payload.Branch;
      state.fullFormProfile.BranchName = payload.BranchName;
      state.fullFormProfile.ClientManagerName = payload.ClientManagerName;
      state.fullFormProfile.ClientManagerLogin = payload.ClientManagerLogin;

      // state.fullFormProfile.Customer = payload.Customer

      // state.fullFormProfile.Customer.Document.Districts = state.dictionaries.Districts

      // state.fullFormProfile.Customer.Relatives.items.forEach(i => {
      //   i.Document.Districts = state.dictionaries.Districts
      // })

      // state.fullFormProfile.Customer.AddressList.items.forEach(i => {
      //   i.Districts = state.dictionaries.Districts
      // })

      state.fullFormProfile.Customer.FirstName = payload.Customer.FirstName;
      state.fullFormProfile.Customer.LastName = payload.Customer.LastName;
      state.fullFormProfile.Customer.MiddleName = payload.Customer.MiddleName;

      state.fullFormProfile.Customer.FullName = payload.Customer.FullName;
      state.fullFormProfile.Customer.BirthDate = payload.Customer.BirthDate;
      state.fullFormProfile.Customer.Gender = payload.Customer.Gender;

      state.fullFormProfile.Customer.INN = payload.Customer.INN;
      state.fullFormProfile.Customer.PhoneList.items[0].Number =
        payload.Customer.PhoneList.items[0].Number;
      state.fullFormProfile.Customer.PINPP = payload.Customer.PINPP;
      state.fullFormProfile.Customer.Document.Series =
        payload.Customer.Document.Series;
      state.fullFormProfile.Customer.Document.Number =
        payload.Customer.Document.Number;

      // state.fullFormProfile.Customer.ResidentFlag =
      //   payload.Customer.ResidentFlag;

      state.fullFormProfile.Customer.Document.GivenDate =
        payload.Customer.Document.GivenDate;

      state.fullFormProfile.Customer.Document.ExpirationDate =
        payload.Customer.Document.ExpirationDate;

      state.fullFormProfile.Customer.MaritalStatus =
        payload.Customer.MaritalStatus;

      state.fullFormProfile.Customer.hasChildren = payload.Customer.hasChildren;
      state.fullFormProfile.Customer.UnderAgeChildrenNum =
        payload.Customer.ChildrenNum;

      state.fullFormProfile.Customer.MonthlyIncome.confirmMonthlyIncome =
        payload.Customer.MonthlyIncome.confirmMonthlyIncome;
      state.fullFormProfile.Customer.MonthlyExpenses.recurringExpenses =
        payload.Customer.MonthlyExpenses.recurringExpenses;
      // state.fullFormProfile.Customer.MonthlyExpenses.recurringExpenses =
      //   payload.Customer.MonthlyExpenses.allExpensesSum;
      state.fullFormProfile.Customer.MonthlyExpenses.obligations =
        payload.Customer.MonthlyExpenses.obligations;
      state.fullFormProfile.Customer.MonthlyIncome.hasAdditionalIncome =
        payload.Customer.MonthlyIncome.hasAdditionalIncome;
      state.fullFormProfile.Customer.MonthlyIncome.additionalIncome.sum =
        payload.Customer.MonthlyIncome.additionalIncome.sum;
      state.fullFormProfile.Customer.MonthlyIncome.additionalIncome.incomeType =
        payload.Customer.MonthlyIncome.additionalIncome.incomeType;

      state.fullFormProfile.LoanInfo.LoanProduct = payload.LoanInfo.LoanProduct;
      state.fullFormProfile.LoanInfo.RepaymentType =
        payload.LoanInfo.RepaymentType;
      state.fullFormProfile.LoanInfo.TermInMonth = payload.LoanInfo.TermInMonth;
      state.fullFormProfile.LoanInfo.LoanPurpose = payload.LoanInfo.LoanPurpose;

      state.fullFormProfile.LoanInfo.max_loan_sum_preapprove =
        payload.LoanInfo.max_loan_sum_preapprove;

      state.fullFormProfile.LoanInfo.ProductMaxSum =
        payload.LoanInfo.ProductMaxSum;

      state.fullFormProfile.LoanInfo.collateral = payload.LoanInfo.collateral;
      state.fullFormProfile.rejectDetails = payload.rejectDetails
        ? payload.rejectDetails
        : { items: [] };
      // state.fullFormProfile.max_loan_sum = Math.min(state.fullFormProfile.LoanInfo.ProductMaxSum, state.fullFormProfile.LoanInfo.max_loan_sum_preapprove);
    },

    // setPreapprovData(state, payload) {
    //   const fullFormProfile = JSON.parse(JSON.stringify(state.fullFormProfile))
    //   state.fullFormProfile = {...fullFormProfile, ...payload}
    //   console.log()
    // },

    addPhone(state) {
      state.fullFormProfile.Customer.PhoneList.items.push({
        Number: 998
      });
    },

    addPhoneGuarantee(state, payload) {
      console.log("guaranteePhone", payload);
      state.fullFormProfile.Guarantee[payload.item].items[
        payload.index
      ].PhoneList.items.push({
        Number: 998
      });
    },

    addProperty(state) {
      state.fullFormProfile.Customer.PropertyInformation.Realty_new.items.push({
        MarketValue: null,
        Region: null,
        PropertyType: null
      });
    },

    addVehicle(state) {
      state.fullFormProfile.Customer.PropertyInformation.Transport_new.items.push(
        {
          transportBrand: "",
          yearOfRelease: null,
          VehicleType: null,
          MarketValue: null
        }
      );
    },

    addInsurance(state) {
      state.fullFormProfile.Guarantee.Insurance.items.push({
        INN: "",
        OrgName: "",
        Sum: 0,
        sec_payment: null, //Страховой платёж
        ContractNumber: "", // Номер Страхового договора
        StartDate: "", // Дата начала действия договора
        ExpDate: "" //Дата истечения действия договора
      });
    },

    addRelatedLegalPerson(state) {
      state.fullFormProfile.Guarantee.RelatedLegalPerson.items.push({
        Address: {
          Building: "",
          OwnershipType: 0,
          HouseType: "",
          PostalCode: "",
          Region: null,
          Street: "",
          District: null,
          Block: "",
          House: "",
          City: "",
          Apartment: "",
          OfficeNum: "",
          AddressType: "",
          Districts: []
        },
        PhoneList: {
          items: [
            {
              Number: 998
            }
          ]
        },
        INN: "",
        Name: "",
        CEOFirstName: "",
        CEOLastName: "",
        CEOMiddleName: "",
        Sum: 0,
        Activity: "",

        cardNumber: "",
        bank_name: "",
        mfo: "",
        relatedLegalPersonBill: ""
      });
    },

    addRelatedPerson(state) {
      state.fullFormProfile.Guarantee.RelatedPerson.items.push({
        Address: {
          Building: "",
          OwnershipType: 0,
          HouseType: "",
          PostalCode: "",
          Region: null,
          Street: "",
          District: null,
          Block: "",
          House: "",
          City: "",
          Apartment: "",
          AddressType: "",
          Districts: []
        },
        FirstName: "",
        //NameENG: "",
        INN: "",
        Sum: 0,
        MiddleName: "",
        CardNumber: null, // номер карты
        bank_name: "",
        mfo: "",
        relatedPersonBill: "", // расчетный счет

        BankInps: null, // инпс банка
        Document: {
          documentType: null,
          Series: "",
          Number: null,
          ExpirationDate: "",
          GivenDate: "",
          GUID: "",
          Country: "",
          DocLink: "",
          DocumentName: "",
          Region: null,
          Districts: [],
          GivenPlace: null
        },
        ClientRelation: null,
        PhoneList: {
          items: [
            {
              Number: 998
            }
          ]
        },
        Resident: true,
        LastName: "",
        PINPP: "",
        BirthDate: ""
      });
    },

    setGivenPlace(state, payload) {
      if (payload.idx || payload.idx === 0) {
        state.fullFormProfile.Customer[payload.item].items[
          payload.idx
        ].Document.GivenPlace = null;
        state.fullFormProfile.Customer[payload.item].items[
          payload.idx
        ].Document.Districts = payload.districts;
      } else {
        state.fullFormProfile.Customer[payload.item].GivenPlace = null;
        state.fullFormProfile.Customer[payload.item].Districts =
          payload.districts;
      }
    },

    setDistricts(state, payload) {
      state.fullFormProfile.Customer[payload.item].items[
        payload.idx
      ].District = null;
      state.fullFormProfile.Customer[payload.item].items[
        payload.idx
      ].Districts = payload.districts;
    },

    setGivenPlaceGuarantee(state, payload) {
      state.fullFormProfile.Guarantee[payload.guarantee].items[
        payload.idx
      ].Document.GivenPlace = null;
      state.fullFormProfile.Guarantee[payload.guarantee].items[
        payload.idx
      ].Document.Districts = payload.districts;
    },

    setDistrictsGuarantee(state, payload) {
      state.fullFormProfile.Guarantee[payload.guarantee].items[
        payload.idx
      ].Address.District = null;
      state.fullFormProfile.Guarantee[payload.guarantee].items[
        payload.idx
      ].Address.Districts = payload.districts;
    },

    removeItem(state, payload) {
      state.fullFormProfile.Customer[payload.item].items.splice(
        payload.index,
        1
      );
    },

    removeGuarantee(state, payload) {
      state.fullFormProfile.Guarantee[payload.item].items.splice(
        payload.index,
        1
      );
    },

    removePhoneGuarantee(state, payload) {
      state.fullFormProfile.Guarantee[payload.item].items[
        payload.index
      ].PhoneList.items.splice(payload.index2, 1);
    },

    addRelative(state) {
      state.fullFormProfile.Customer.Relatives.items.push({
        FirstName: "",
        // FullName: "",
        FamilyConnectionType: null,
        LastName: "",
        MiddleName: "",
        BirthDate: "",
        LSBO: false,
        role: "",
        filial: "",
        personal_id: "",
        Document: {
          documentType: null,
          Series: "",
          Number: null,
          ExpirationDate: "",
          GivenDate: "",
          GUID: "",
          Country: "",
          DocLink: "",
          DocumentName: "",
          Region: null,
          Districts: [],
          GivenPlace: null
        }
      });
    },

    addRegistration(state, AddressType) {
      state.fullFormProfile.Customer.AddressList.items.push({
        Building: "",
        OwnershipType: null,
        HouseType: "",
        PostalCode: "",
        Region: null,
        District: null,
        Street: "",
        Block: "",
        House: "",
        City: "",
        Apartment: "",
        AddressType,
        Districts: []
      });
    },

    // добавление комментария
    addComment(state, payload) {
      console.log("comment", payload);
      if (payload.commentBlock == "CreditCommiteeDecisions") {
        const idx = state.fullFormProfile[payload.commentBlock].items.findIndex(
          i => i.Login == payload.comment.Login
        );
        state.fullFormProfile[payload.commentBlock].items[idx] = {
          ...state.fullFormProfile[payload.commentBlock].items[idx],
          ...payload.comment
        };
      } else {
        state.fullFormProfile[payload.commentBlock].items.push(payload.comment);
      }
    },

    removeRegistration(state, payload) {
      const idx = state.fullFormProfile.Customer.AddressList.items.findIndex(
        item => item.AddressType === payload.item
      );
      if (idx !== -1) {
        state.fullFormProfile.Customer.AddressList.items.splice(idx, 1);
      }
    },

    addFlagRegistration(state, payload) {
      const idx = state.fullFormProfile.Customer.AddressList.items.findIndex(
        item => item.AddressType === payload.item
      );
      if (idx !== -1) {
        state.fullFormProfile.Customer.AddressList.items[idx] = {
          ...state.fullFormProfile.Customer.AddressList.items[0]
        };
        state.fullFormProfile.Customer.AddressList.items[idx].AddressType =
          "Адрес фактического проживания";
        state.fullFormProfile.Customer.AddressList.items[idx].flag =
          payload.value;
      }
    },

    removeProperty(state, payload) {
      state.fullFormProfile.Customer.PropertyInformation[
        payload.item
      ].items.splice(payload.index, 1);
    },

    setDictionaries(state, dictionaries) {
      function objectTransform(dictionaries) {
        for (let item in dictionaries) {
          // if(item == "Branches") continue
          if (item == "Insurance_company") continue;
          if (
            typeof dictionaries[item] === "object" &&
            dictionaries[item] != null
          ) {
            if (dictionaries[item].items) {
              for (let value of dictionaries[item].items) {
                if (!value.value) {
                  objectTransform(value);
                } else {
                  value.value = Number(value.value);
                }
                //value.value = Number(value.value)
              }
            }
          }
        }

        return dictionaries;
      }

      //const dicTransform = objectTransform(dictionaries)

      // sessionStorage.setItem(
      //   "dictionaries",
      //   JSON.stringify(dicTransform)
      // );
      state.dictionaries = objectTransform(dictionaries);
    },

    resetDataFullFormProfile(state) {
      state.FinalDecision = "";
      state.fullFormProfile = {
        Status: "",
        ApplicationID: "",
        // ProtocolNumber: "",
        client_code: "",
        client_uid: "",
        Number: "",
        Branch: "",
        BranchName: "",
        BODecision: null,
        FinalDecision: "", // отказ кредитного менеджера
        // Date: "",
        BOLogin: "", // логин авторизованного пользователя
        // Department: "",
        ClientManagerLogin: "", // при авторизации
        ClientManagerName: null,
        CreditCommiteeDecisions: {
          items: [
            // {
            //   Comment: "",
            //   MemberOfCCFIO: "",
            //   Login: "",
            //   Decision: "" (Y/N/R)
            // }
          ]
        },

        Customer: {
          CustomerId: 0,
          DigID: false,
          Email: "",
          FirstName: "",
          LastName: "",
          MiddleName: "",
          FullName: "",
          BirthDate: "",
          Country: 0,
          BirthCity: "",
          INN: "",
          PINPP: "",
          ResidentFlag: true,
          Gender: null,
          CardNumber: null, // номер карты
          BankInps: "09006", // инпс банка
          LSBO: false,
          role: "",
          filial: "",
          personal_id: "",

          Document: {
            documentType: 6,
            Series: "",
            Number: null,
            ExpirationDate: "",
            GivenDate: "",
            GUID: "",
            Country: "Uzbekistan",
            DocLink: "",
            DocumentName: "",
            Region: null,
            Districts: [],
            GivenPlace: null
          },

          Education: null,
          PhoneList: {
            items: [
              {
                Number: ""
              }
            ]
          },

          AddressList: {
            items: [
              {
                Building: "",
                OwnershipType: null,
                HouseType: "",
                PostalCode: "",
                Region: null,
                District: null,
                Street: "",
                Block: "",
                House: "",
                City: "",
                Apartment: "",
                AddressType: "Адрес постоянной регистрации",
                Districts: []
              },
              {
                Building: "",
                OwnershipType: null,
                HouseType: "",
                PostalCode: "",
                Region: null,
                District: null,
                Street: "",
                Block: "",
                House: "",
                City: "",
                Apartment: "",
                AddressType: "Адрес фактического проживания",
                Districts: []
              }
            ]
          },

          MaritalStatus: 0,
          hasChildren: false,
          // "ChildrenNum": 0,
          UnderAgeChildrenNum: 0,

          Relatives: {
            items: [
              // {
              //   FirstName: "",
              //   // FullName: "",
              //   FamilyConnectionType: null,
              //   LastName: "",
              //   MiddleName: "",
              //   BirthDate: "",
              //   LSBO: false,
              //   role: "",
              //   filial: "",
              //   personal_id: "",
              //   Document: {
              //     documentType: null,
              //     Series: "",
              //     Number: null,
              //     ExpirationDate: "",
              //     GivenDate: "",
              //     GUID: "",
              //     Country: "",
              //     DocLink: "",
              //     DocumentName: "",
              //     Region: null,
              //     Districts: [],
              //     GivenPlace: null
              //   }
              // }
            ]
          },

          JobInfo: {
            employerActivityType: null, //вид деятельности организации
            positionType: null, // Категория занимаемой должности
            INN: "",
            employeesNum: 0, // количество работников
            employerName: "", // Наименование работадателя
            totalJobExperienceMonths: 0, // общий трудовой стаж
            activeYears: 0, // срок деятельности
            position: "", // должность
            type: "", // вид деятельности
            lastJobExperienceMonths: 0 // стаж на последнем месте работы
          },

          // eжемесячные расходы
          MonthlyExpenses: {
            recurringExpenses: 0,
            obligations: 0
          },
          // ежемесячные доходы
          MonthlyIncome: {
            confirmMonthlyIncome: 0,
            hasAdditionalIncome: false,
            additionalIncome: {
              incomeType: 0,
              sum: 0
            }
          },

          PropertyInformation: {
            Realty_new: {
              items: []
            },
            Transport_new: {
              items: []
            }
          }
        },

        Guarantee: {
          Insurance: {
            items: []
          },
          RelatedLegalPerson: {
            items: []
          },
          RelatedPerson: {
            items: []
          }
        },

        LoanInfo: {
          LoanProduct: null, // Кредитный продукт
          Sum: 0, // Запрашиваемая сумма кредита
          Currency: "СУМ", // Валюта
          RepaymentType: null, // Тип графика гашения
          LoanType: null, // Вид кредита

          MinInterestRate: 0.0, // Процентаня ставка по кредиту (минимальная)
          MaxInterestRate: 0.0, // Процентная ставка по кредиту (максимальная)

          MaxDefferalRepaymentPeriod: 0, // Льготный период по погашению кредита

          ConvenientRepaymentTerm: 0, // Удобный день погашения в мес 1 - 31

          TermInMonth: 0, //Количество месяцев на кредит (удобный срок погашения в мес)

          MaxTermInMonths: 0, // Максимальное количество месяцев на кредит
          MinTermInMonths: 0, // Минимальное количество месяцев на кредит

          InitialPayment: 0, // Первоначальный взнос

          MaxInitialPaymentPercent: 0.0, // Процент первоначального взноса (максимальный)
          MinInitialPaymentPercent: 0.0, // Процент первоначального взноса (минимальный)

          LoanPurpose: null, // Цель кредитования

          // SellerName: "", // Наименование продавца

          // ProductName: "", // Наименование товара/работы/услуги

          FundingSource: null, // Источник финансирования
          loan_org_comission: null, //Комиссия за организацию кредита
          other_services: null, //Другие услуги

          FacilitiesForRepaymentDate: false,

          consumerLoan: {
            nameBankProd: "", // Наименование банка
            nameService: "", // Наименование товара/работы/услуги
            agreementDate: "", // Дата договора
            nameProduction: "", // Наименование продавца
            billProd: "", // Расчетный счет продавца
            agreementNumber: "", // Номер договора
            idBankProd: 0
          },
          //InitialPaymentPercent: 0
          ProductMaxSum: null, // максимальная сумма по кредитному продукту
          max_loan_sum_preapprove: null, // максимальная сумма кредита

          microloan_details: {
            mfo: "",
            bank_name: "",
            customer_bill: ""
          },
          collateral: null
        },
        profit: null,
        rejectDetails: [],

        // max_loan_sum: null,
        loanAbilityClass: null,
        loanKoeffCorr: null,

        ApplicationComment: {
          items: [
            // {
            //   Comment: "",
            //   Type: "",
            //   CommentPerson: "",
            //   CommentPersonFIO: "",
            // }
          ]
        },
        AttachedDocuments: {
          items: [
            // {
            //   "id": null,
            //   "DocLink": "",
            //   "DocumentName": "1"
            // }
          ]
        }
      };
    }
  },
  getters: {
    dictionaries: state => state.dictionaries,
    AsokiExists: state => {
      const AsokiExists = state.BPMInput.find(i => i.label == "AsokiExists");
      return AsokiExists ? AsokiExists.data : true;
      // return false
    },
    preapprove_num: state => {
      const preapprove_num = state.BPMInput.find(
        i => i.label === "preapprove_num"
      );

      const preApplicationNum = state.BPMInput.find(
        i => i.label === "preApplicationNum"
      );

      return preapprove_num
        ? preapprove_num.data
        : preApplicationNum
        ? preApplicationNum.data
        : null;
    },

    fileList: state => {
      const fileList = state.BPMInput.filter(i => {
        return (
          i.label === "overdraft" ||
          i.label === "consumer_credit" ||
          i.label === "microloan" ||
          i.label === "payment_schedule"
        );
      });

      state.BPMInput.filter(i => {
        return (
          i.label === "overdraft_guarantor_physical" ||
          i.label === "overdraft_guarantor_legal" ||
          i.label === "microloan_guarantor_physical" ||
          i.label === "microloan_guarantor_legal" ||
          i.label === "consumer_guarantor_physical" ||
          i.label === "consumer_guarantor_legal"
        );
      }).forEach(guarantee => guaranteeDoc(guarantee));

      function guaranteeDoc(guarantee) {
        guarantee.data.items.forEach((item, index) => {
          const doc = {
            data: item,
            label: guarantee.label,
            number: index
          };
          fileList.push(doc);
        });
      }

      const finalFileList = fileList.map(item => {
        return {
          ...item,
          loading: false,
          loadingUz: false
        };
      });

      console.log("fileList", finalFileList);

      return finalFileList;
    },

    fileList_uz: state => {
      const fileList = state.BPMInput.filter(i => {
        return (
          i.label === "overdraft_uz" ||
          i.label === "consumer_credit_uz" ||
          i.label === "microloan_uz" ||
          i.label === "payment_schedule_uz"
        );
      });

      state.BPMInput.filter(i => {
        return (
          i.label === "overdraft_guarantor_physical_uz" ||
          i.label === "overdraft_guarantor_legal_uz" ||
          i.label === "microloan_guarantor_physical_uz" ||
          i.label === "microloan_guarantor_legal_uz" ||
          i.label === "consumer_guarantor_physical_uz" ||
          i.label === "consumer_guarantor_legal_uz"
        );
      }).forEach(guarantee => guaranteeDoc(guarantee));

      function guaranteeDoc(guarantee) {
        guarantee.data.items.forEach((item, index) => {
          const doc = {
            data: item,
            label: guarantee.label,
            number: index
          };
          fileList.push(doc);
        });
      }

      const finalFileList = fileList.map(item => {
        return {
          ...item,
          loading: false,
          loadingUz: false
        };
      });

      console.log("fileList", finalFileList);

      return finalFileList;
    }
  }
};
