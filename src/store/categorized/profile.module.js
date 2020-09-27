import BpmService from "../../services/bpm.service";
import CommonUtils from "@/shared/utils/CommonUtils";

export const profile = {
  namespaced: true,
  state: {
    bpmService: new BpmService(),
    preapprove_num: "",
    applicationNumber: "", // номер заявки для печатной формы
    userrole: "",
    percent: 25,

    avgSalary: null,
    loanAbilityClass: null,
    profit: null,
    LoanMax: null,

    confirmCredit: false,
    fileList: [],
    loadings: [], // для лоадинга печатных форм
    disableField: false,
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
      // Number: "",
      Branch: "",
      BranchName: "",
      BODecision: null,
      // FinalDecision: "",
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

        Document: {
          documentType: 8,
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
            {
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
            }
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
        max_loan_sum_preapprove: null // максимальная сумма кредита
      },

      max_loan_sum: null,

      ApplicationComment: {
        items: [
          // {
          //   Comment: "",
          //   Type: "",
          //   CommentPerson: "",
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
        const dataINPS = response.input.find(i => i.label === "clientWagesData")
          .data;
        if (dataINPS.wages.items.length) {
          const scoring = response.input.find(
            i => i.label === "preApprovalData"
          ).data;

          commit("setScoring", scoring);
          commit("setINNandNameOrg", dataINPS.wages.items.slice().pop());

          return dataINPS;
        } else {
          return null;
        }
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("credits/setMessage", errorMessage, { root: true });
        throw error;
      }
    },

    async dataLSBO({ state, commit }) {
      let users = [];
      users.push({
        // pin: state.fullFormProfile.Customer.PINPP, //ИНПС
        pin: "", //ИНПС
        passNumber: state.fullFormProfile.Customer.Document.Number,
        passSerial: state.fullFormProfile.Customer.Document.Series
      });

      state.fullFormProfile.Customer.Relatives.items.forEach(relative => {
        relative.role = "";
        relative.LSBO = false;
        relative.filial = "";

        if (!relative.Document.Number || !relative.Document.Series) {
          throw "Заполните все данные родственников!";
        }
        users.push({
          pin: "",
          passNumber: relative.Document.Number,
          passSerial: relative.Document.Series
        });
      });

      const data = {
        input: [
          {
            name: "persons",
            data: users
          },
          {
            data: state.preapprove_num,
            name: "application_id"
          }
        ]
      };

      console.log("lsbo", data);

      try {
        const response = await state.bpmService.getDataLSBO(data);

        response.input
          .find(i => i.label === "response")
          .data.items.forEach(user => {
            // console.log("user", user)
            if (user.lsbo) {
              let relative = state.fullFormProfile.Customer.Relatives.items.find(
                rel => rel.Document.Number == user.passNumber
              );
              // console.log('relative', relative)
              if (relative) {
                relative.role = user.role;
                relative.LSBO = user.lsbo;
                relative.filial = user.filial;
              }
            }
          });

        const lsbo = response.input
          .find(user => user.label === "response")
          .data.items.findIndex(lsbo => lsbo.lsbo);

        console.log("lsboFlag", lsbo);
        if (lsbo !== -1) {
          state.percent = 30;
        } else {
          state.percent = 25;
        }
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("credits/setMessage", errorMessage, { root: true });
        throw error;
      }
    },

    async clientInfo({ state, commit }) {
      const data = {
        input: [
          {
            data: "589196899",
            name: "clientInn"
          },
          {
            data: "2",
            name: "customerId"
          }
        ]
      };

      try {
        const response = await state.bpmService.getClientInfo(data);
        return response
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("credits/setMessage", errorMessage, { root: true });
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
        commit("credits/setMessage", errorMessage, { root: true });
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
        commit("credits/setMessage", errorMessage, { root: true });
        throw error;
      }
    },

    async getFullForm({ state, commit, getters, rootGetters }, taskId) {
      state.preapprove_num = "";

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
          const data = response.data.input.find(i => i.label === "application")
            .data;
          const dictionaries = response.data.input.find(
            i => i.label === "inputDictionaries"
          ).data;

          commit("setDictionaries", dictionaries);

          if (response.data.name == "Full Application Filling") {
            // для получения информации от халк банка
            const preapprove_num = response.data.input.find(
              i => i.label === "preapprove_num"
            ).data;

            // номер заявки печатная форма
            const applicationNumber = response.data.input.find(
              i => i.label === "process_info_fullApp"
            ).data.applicationNumber;

            // должность
            const userrole = response.data.input.find(
              i => i.label === "userrole"
            ).data;

            commit("setApplicationNumber", applicationNumber);
            commit("setUserrole", userrole);

            commit("setPreapproveNum", preapprove_num);
          }

          // кредит не оформлен
          if (
            response.data.name == "Full Application Filling" &&
            data.BODecision == null
          ) {
            commit("resetDataFullFormProfile");
            commit("setPreapprovData", data);
          } else if (response.data.name == "Работа с документами") {
            commit("setFileList", response);
            commit("setFullForm", data);
          } else if (
            response.data.name != "Full Application Filling" &&
            response.data.name != "Проверка документов" &&
            data.BODecision == true
          ) {
            // для получения информации от халк банка для кредитного секретаря
            const preApplicationNum = response.data.input.find(
              i => i.label === "preApplicationNum"
            );

            const processInfo = response.data.input.find(
              i => i.label === "processInfo"
            );

            commit("setPreapproveNum", preApplicationNum.data);
            commit("setProcessInfo", processInfo.data);

            commit("setFullForm", data);
          } else {
            commit("setFullForm", data);
          }
        } else {
          throw "Data is null";
        }

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("credits/setMessage", errorMessage, { root: true });
        sessionStorage.clear();
        //this.$router.push("/work/credit");
        this.$router.go(-1);
        throw error;
      }
    }
  },
  mutations: {
    setPreapproveNum(state, preapprove_num) {
      state.preapprove_num = preapprove_num;
    },

    setProcessInfo(state, processInfo) {
      state.avgSalary = processInfo.avgSalary
      state.loanAbilityClass = processInfo.loanAbilityClass
      state.profit = processInfo.profit
      state.LoanMax = processInfo.LoanMax
    },

    setScoring(state, payload) {
      state.fullFormProfile.Customer.MonthlyIncome.confirmMonthlyIncome =
        payload.incoming;
      state.fullFormProfile.Customer.MonthlyExpenses.recurringExpenses =
        payload.expenses;
      // state.fullFormProfile.Customer.MonthlyIncome.additionalIncome.sum = payload.payment
      state.fullFormProfile.LoanInfo.max_loan_sum_preapprove = payload.sum;
      
      state.fullFormProfile.max_loan_sum = Math.min(state.fullFormProfile.LoanInfo.ProductMaxSum, state.fullFormProfile.LoanInfo.max_loan_sum_preapprove);
    },

    setINNandNameOrg(state, payload) {
      if (state.fullFormProfile.Customer.JobInfo.type == 1) {
        state.fullFormProfile.Customer.JobInfo.employerName = payload.org_name;
        state.fullFormProfile.Customer.JobInfo.INN = payload.inn;
      }
    },

    setFullForm(state, payload) {
      // Для корректной валидации
      // payload.Customer.Document.Number = String(payload.Customer.Document.Number)
      // payload.Customer.Relatives.items.map(i => i.Document.Number = String(i.Document.Number))
      // payload.Guarantee.RelatedPerson.items.map(i => i.Document.Number = String(i.Document.Number))

      state.fullFormProfile = payload;
    },

    setPreapprovData(state, payload) {
      state.fileList = [];

      // Для корректной валидации
      state.fullFormProfile.ApplicationID = payload.ApplicationID;
      state.fullFormProfile.Number = payload.Number;
      state.fullFormProfile.Branch = payload.Branch;
      state.fullFormProfile.BranchName = payload.BranchName;
      state.fullFormProfile.ClientManagerName = payload.ClientManagerName;
      state.fullFormProfile.Customer.FirstName = payload.Customer.FirstName;
      state.fullFormProfile.Customer.LastName = payload.Customer.LastName;
      state.fullFormProfile.Customer.MiddleName = payload.Customer.MiddleName;
      state.fullFormProfile.Customer.INN = payload.Customer.INN;
      state.fullFormProfile.Customer.PhoneList.items[0].Number =
        payload.Customer.PhoneList.items[0].Number;
      state.fullFormProfile.Customer.PINPP = payload.Customer.PINPP;
      state.fullFormProfile.Customer.Document.Series =
        payload.Customer.Document.Series;
      state.fullFormProfile.Customer.Document.Number =
        payload.Customer.Document.Number;

      state.fullFormProfile.Customer.MaritalStatus =
        payload.Customer.MaritalStatus;

      state.fullFormProfile.Customer.hasChildren = payload.Customer.hasChildren;
      state.fullFormProfile.Customer.UnderAgeChildrenNum =
        payload.Customer.ChildrenNum;

      state.fullFormProfile.Customer.MonthlyIncome.confirmMonthlyIncome =
        payload.Customer.MonthlyIncome.confirmMonthlyIncome;
      // state.fullFormProfile.Customer.MonthlyExpenses.recurringExpenses =
      //   payload.Customer.MonthlyExpenses.recurringExpenses;
      state.fullFormProfile.Customer.MonthlyExpenses.recurringExpenses =
        payload.Customer.MonthlyExpenses.allExpensesSum;
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

      state.fullFormProfile.max_loan_sum = Math.min(state.fullFormProfile.LoanInfo.ProductMaxSum, state.fullFormProfile.LoanInfo.max_loan_sum_preapprove);
    },

    setFileList(state, response) {
      state.disableField = true;
      state.fileList = [];

      console.log("res", response);
      const fileList = response.data.input.filter(i => {
        return (
          i.label === "overdraft" ||
          i.label === "consumer_credit" ||
          i.label === "microloan" ||
          i.label === "payment_schedule"
        );
      });

      response.data.input
        .filter(i => {
          return (
            i.label === "overdraft_guarantor_physical" ||
            i.label === "overdraft_guarantor_legal" ||
            i.label === "microloan_guarantor_physical" ||
            i.label === "microloan_guarantor_legal" ||
            i.label === "consumer_guarantor_physical" ||
            i.label === "consumer_guarantor_legal"
          );
        })
        .forEach(guarantee => guaranteeDoc(guarantee));

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

      console.log("fileList", fileList);

      fileList.forEach((item, index) => {
        state.loadings[index] = false;
      });

      state.fileList = fileList;
    },

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
          marketValue: null
        }
      );
    },

    addInsurance(state) {
      state.fullFormProfile.Guarantee.Insurance.items.push({
        INN: "",
        OrgName: "",
        Sum: 0
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
        Activity: ""
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

    setApplicationNumber(state, applicationNumber) {
      state.applicationNumber = applicationNumber;
    },

    setUserrole(state, userrole) {
      state.userrole = userrole;
    },

    resetDataFullFormProfile(state) {
      state.fileList = []; // очистка файлов на печать
      state.disableField = false;
      state.fullFormProfile = {
        Status: "",
        ApplicationID: "",
        // ProtocolNumber: "",
        Number: "",
        Branch: "",
        BranchName: "",
        BODecision: null,
        // FinalDecision: "",
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

          Document: {
            documentType: 8,
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
              {
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
              }
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
          max_loan_sum_preapprove: null // максимальная сумма кредита
        },

        max_loan_sum: null,

        ApplicationComment: {
          items: [
            // {
            //   Comment: "",
            //   Type: "",
            //   CommentPerson: "",
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
    dictionaries: state => state.dictionaries
  }
};
