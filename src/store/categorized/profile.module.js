import BpmService from "../../services/bpm.service";
import CommonUtils from "@/shared/utils/CommonUtils";

export const profile = {
  namespaced: true,
  state: {
    bpmService: new BpmService(),
    confirmCredit: false,
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
      jobPeriods: {
        items: []
      },
      FamilyRelation: {
        items: []
      }
    },
    //filesAll: [], // для фильтрации какие файлы загружены на сервер

    AddressType: [
      "Адрес постоянной регистрации",
      "Адрес фактического проживания",
      "Адрес временной регистрации"
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
      ],

      RepaymentType: []
    },

    fullFormProfile: {
      Status: "",
      ApplicationID: "",
      ProtocolNumber: "",
      Number: "",
      Branch: "",
      BODecision: "",
      FinalDecision: "",
      Date: "",
      BOLogin: "", // логин авторизованного пользователя
      Department: "",
      ClientManagerLogin: "",
      CreditCommiteeDecisions: [
        // {
        //   Comment: "",
        //   MemberOfCCFIO: "",
        //   id: 0,
        //   Login: "",
        //   isApproved: false
        // }
      ],

      Customer: {
        DigID: false,
        Email: "",
        FirstName: "",
        LastName: "",
        MiddleName: "",
        FullName: "",
        BirthDate: "",
        INN: "",
        PINPP: "",
        ResidentFlag: false,
        Gender: null,

        Document: {
          Series: "",
          Number: null,
          ExpirationDate: "",
          GivenDate: "",
          GUID: "",
          Country: "",
          DocLink: "",
          DocumentName: 0
        },

        Education: null,
        PhoneList: [
          {
            Number: ""
          }
        ],

        AddressList: [
          {
            Building: "",
            OwnershipType: null,
            HouseType: "",
            PostalCode: "",
            Region: null,
            District: "", 
            Street: "",
            Block: "",
            House: "",
            City: "",
            Apartment: "",
            AddressType: "1"
          }
        ],

        MaritalStatus: false,
        hasChildren: false,
        // "ChildrenNum": 0,
        UnderAgeChildrenNum: null,

        Relatives: [
          {
            FirstName: "",
            FullName: "",
            FamilyConnectionType: null,
            LastName: "",
            MiddleName: "",
            BirthDate: "",
            Document: {
              Series: "",
              Number: null,
              ExpirationDate: "",
              GivenDate: "",
              GUID: "",
              Country: "",
              DocLink: "",
              DocumentName: 0
            }
          }
        ],

        JobInfo: {
          employerActivityType: null, //вид деятельности организации
          positionType: null, // Категория занимаемой должности
          INN: "",
          employeesNum: null, // количество работников
          employerName: "", // Наименование работадателя
          totalJobExperienceMonths: null, // общий трудовой стаж
          activeYears: null, // срок деятельности
          position: "", // должность
          type: "", // вид деятельности
          lastJobExperienceMonths: null // стаж на последнем месте работы
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
          Realty_new: [],
          Transport_new: []
        }
      },

      Guarantee: {
        Insurance: [],
        RelatedLegalPerson: [],
        RelatedPerson: []
      },

      LoanInfo: {
        LoanProduct: null, // Кредитный продукт
        Sum: null, // Запрашиваемая сумма кредита
        Currency: "СУМ", // Валюта
        RepaymentType: null, // Тип пошагового кредита
        LoanType: null, // Вид кредита

        MinInterestRate: null, // Процентаня ставка по кредиту (минимальная)
        MaxInterestRate: null, // Процентная ставка по кредиту (максимальная)

        MaxDefferalRepaymentPeriod: null, // Льготный период по погашению кредита

        ConvenientRepaymentTerm: null, // Удобный срок погашения в мес

        MaxTermInMonths: null, // Максимальное количество месяцев на кредит
        MinTermInMonths: null, // Минимальное количество месяцев на кредит

        InitialPayment: null, // Первоначальный взнос

        MaxInitialPaymentPercent: null, // Процент первоначального взноса (максимальный)
        MinInitialPaymentPercent: null, // Процент первоначального взноса (минимальный)

        LoanPurpose: "", // Цель кредитования

        SellerName: "", // Наименование продавца

        ProductName: "", // Наименование товара/работы/услуги

        FundingSource: "", // Источник финансирования

        FacilitiesForRepaymentDate: false
      },

      ApplicationComment: [
        // {
        //   Comment: "",
        //   Type: "",
        //   CommentPerson: "",
        //   id: 0,
        //   CommentDate: "2020-03-18T09:00:23.928+05:00"
        // }
      ],
      AttachedDocuments: [
        // {
        //   "id": null,
        //   "DocLink": "",
        //   "DocumentName": "1"
        // }
      ]
    }
  },
  actions: {
    async uploadFiles({ state, commit }, data) {
      console.log("uploadFiles", data);
      try {
        const response = await state.bpmService.uploadFiles(data);
        console.log("responseFile", response);

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("credits/setMessage", errorMessage, {root: true});
      }
    },

    async getFullForm({ state, commit, getters, rootGetters }) {
      try {
        const response = await state.bpmService.getFullForm(rootGetters["credits/taskId"]);
        console.log('response', response)
        const fullForm = (response.data.input.find(i => i.label === "application")).data
        const dictionaries = (response.data.input.find(i => i.label === "inputDictionaries")).data

        if (fullForm) {
          commit("setFullForm", fullForm);
          commit("setDictionaries", dictionaries);
        }

        return response
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("credits/setMessage", errorMessage, {root: true});
        sessionStorage.removeItem("csrf_token");
      }
    }
  },
  mutations: {
    setFullForm(state, payload) {
      state.fullFormProfile = payload;
    },

    addPhone(state) {
      state.fullFormProfile.Customer.PhoneList.push({
        Number: 998
      });
    },

    addPhoneGuarantee(state, payload) {
      state.fullFormProfile.Guarantee[payload.item][
        payload.index
      ].PhoneList.push({
        Number: 998
      });
    },

    addProperty(state) {
      state.fullFormProfile.Customer.PropertyInformation.Realty_new.push({
        MarketValue: null,
        Region: null,
        PropertyType: null
      });
    },

    addVehicle(state) {
      state.fullFormProfile.Customer.PropertyInformation.Transport_new.push({
        transportBrand: "",
        yearOfRelease: null,
        VehicleType: null,
        marketValue: null
      });
    },

    addInsurance(state) {
      state.fullFormProfile.Guarantee.Insurance.push({
        INN: "",
        OrgName: "",
        Sum: 0
      });
    },

    addRelatedLegalPerson(state) {
      state.fullFormProfile.Guarantee.RelatedLegalPerson.push({
        Address: {
          Building: "",
          OwnershipType: null,
          HouseType: "",
          PostalCode: "",
          Region: null,
          Street: "",
          District: "", //Надо добавить!!!
          Block: "",
          House: "",
          City: "",
          Apartment: "",
          Office: "", // ???
          AddressType: null
        },
        PhoneList: [
          {
            Number: 998
          }
        ],
        INN: "",
        Name: "",
        Sum: 0, // Надо добавить!
        Activity: "" // Надо добавить!
      });
    },

    addRelatedPerson(state) {
      state.fullFormProfile.Guarantee.RelatedPerson.push({
        Address: {
          Building: "",
          OwnershipType: null,
          HouseType: "",
          PostalCode: "",
          Region: null,
          Street: "",
          District: "", //Надо добавить!!!
          Block: "",
          House: "",
          City: "",
          Apartment: "",
          AddressType: null
        },
        FirstName: "",
        NameENG: "",
        INN: "",
        Sum: 0,
        MiddleName: "",
        Document: {
          Series: "",
          Number: null,
          ExpirationDate: "",
          GivenDate: "",
          GUID: "",
          Country: "",
          DocLink: "",
          DocumentName: 0
        },
        ClientRelation: null,
        PhoneList: [
          {
            Number: 998
          }
        ],
        FullName: "",
        Resident: false,
        LastName: "",
        PINPP: "",
        BirthDate: ""
      });
    },

    removeItem(state, payload) {
      state.fullFormProfile.Customer[payload.item].splice(payload.index, 1);
    },

    removeGuarantee(state, payload) {
      state.fullFormProfile.Guarantee[payload.item].splice(payload.index, 1);
    },

    removePhoneGuarantee(state, payload) {
      state.fullFormProfile.Guarantee[payload.item][
        payload.index
      ].PhoneList.splice(payload.index2, 1);
    },

    addRelative(state) {
      state.fullFormProfile.Customer.Relatives.push({
        FirstName: "",
        FullName: "",
        FamilyConnectionType: null,
        LastName: "",
        MiddleName: "",
        BirthDate: "",
        Document: {
          Series: "",
          Number: null,
          ExpirationDate: "",
          GivenDate: "",
          GUID: "",
          Country: "",
          DocLink: "",
          DocumentName: 0
        }
      });
    },

    addRegistration(state, AddressType) {
      state.fullFormProfile.Customer.AddressList.push({
        Building: "",
        OwnershipType: null,
        HouseType: "",
        PostalCode: "",
        Region: null,
        District: "", //Надо добавить!!!
        Street: "",
        Block: "",
        House: "",
        City: "",
        Apartment: "",
        AddressType
      });
    },

    // добавление комментария
    addComment(state, payload) {
      console.log('comment', payload)
      debugger
      if (Array.isArray(state.fullFormProfile[payload.commentBlock])) {
        state.fullFormProfile[payload.commentBlock].push(payload.comment)
      } else {
        state.fullFormProfile[payload.commentBlock].items.push(payload.comment)
      }
    },

    removeRegistration(state, payload) {
      const idx = state.fullFormProfile.Customer.AddressList.findIndex(
        item => item.AddressType === payload.item
      );
      if (idx !== -1) {
        state.fullFormProfile.Customer.AddressList.splice(idx, 1);
      }
    },

    removeProperty(state, payload) {
      state.fullFormProfile.Customer.PropertyInformation[payload.item].splice(
        payload.index,
        1
      );
    },

    setDictionaries(state, payload) {
      state.dictionaries = payload;
    },

    resetDataFullFormProfile(state) {
      state.fullFormProfile = {
        Status: "",
        ApplicationID: "",
        ProtocolNumber: "",
        Number: "",
        Branch: "",
        BODecision: "",
        FinalDecision: "",
        Date: "",
        BOLogin: "",
        Department: "",
        ClientManagerLogin: "",
        CreditCommiteeDecisions: [
          // {
          //   Comment: "",
          //   MemberOfCCFIO: "",
          //   id: 0,
          //   Login: "",
          //   isApproved: false
          // }
        ],

        Customer: {
          DigID: false,
          Email: "",
          FirstName: "",
          LastName: "",
          MiddleName: "",
          FullName: "",
          BirthDate: "",
          INN: "",
          PINPP: "",
          ResidentFlag: false,
          Gender: null,

          Document: {
            Series: "",
            Number: null,
            ExpirationDate: "",
            GivenDate: "",
            GUID: "",
            Country: "",
            DocLink: "",
            DocumentName: 0
          },

          Education: null,
          PhoneList: [
            {
              Number: ""
            }
          ],

          AddressList: [
            {
              Building: "",
              OwnershipType: null,
              HouseType: "",
              PostalCode: "",
              Region: null,
              District: "", //Надо добавить!!!
              Street: "",
              Block: "",
              House: "",
              City: "",
              Apartment: "",
              AddressType: "1"
            }
          ],

          MaritalStatus: false,
          hasChildren: false,
          // "ChildrenNum": 0,
          UnderAgeChildrenNum: null,

          Relatives: [
            {
              FirstName: "",
              FullName: "",
              FamilyConnectionType: null,
              LastName: "",
              MiddleName: "",
              BirthDate: "",
              Document: {
                Series: "",
                Number: null,
                ExpirationDate: "",
                GivenDate: "",
                GUID: "",
                Country: "",
                DocLink: "",
                DocumentName: 0
              }
            }
          ],

          JobInfo: {
            employerActivityType: null, //вид деятельности организации
            positionType: null, // Категория занимаемой должности
            INN: "",
            employeesNum: null, // количество работников
            employerName: "", // Наименование работадателя
            totalJobExperienceMonths: null, // общий трудовой стаж
            activeYears: null, // срок деятельности
            position: "", // должность
            type: "", // вид деятельности
            lastJobExperienceMonths: null // стаж на последнем месте работы
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
            Realty_new: [],
            Transport_new: []
          }
        },

        Guarantee: {
          Insurance: [],
          RelatedLegalPerson: [],
          RelatedPerson: []
        },

        LoanInfo: {
          LoanProduct: null, // Кредитный продукт
          Sum: null, // Запрашиваемая сумма кредита
          Currency: "СУМ", // Валюта
          RepaymentType: null, // Тип пошагового кредита
          LoanType: null, // Вид кредита

          MinInterestRate: null, // Процентаня ставка по кредиту (минимальная)
          MaxInterestRate: null, // Процентная ставка по кредиту (максимальная)

          MaxDefferalRepaymentPeriod: null, // Льготный период по погашению кредита

          ConvenientRepaymentTerm: null, // Удобный срок погашения в мес

          MaxTermInMonths: null, // Максимальное количество месяцев на кредит
          MinTermInMonths: null, // Минимальное количество месяцев на кредит

          InitialPayment: null, // Первоначальный взнос

          MaxInitialPaymentPercent: null, // Процент первоначального взноса (максимальный)
          MinInitialPaymentPercent: null, // Процент первоначального взноса (минимальный)

          LoanPurpose: "", // Цель кредитования

          SellerName: "", // Наименование продавца

          ProductName: "", // Наименование товара/работы/услуги

          FundingSource: "", // Источник финансирования

          FacilitiesForRepaymentDate: false
        },

        ApplicationComment: [
          // {
          //   Comment: "",
          //   Type: "",
          //   CommentPerson: "",
          //   id: 0,
          //   CommentDate: "2020-03-18T09:00:23.928+05:00"
          // }
        ],
        AttachedDocuments: []
      };
    }
  },
  getters: {
    profile: state => state
  }
};
