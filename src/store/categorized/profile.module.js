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
      Districts: {
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
      // ApplicationID: "",
      // ProtocolNumber: "",
      // Number: "",
      // Branch: "",
      BODecision: false,
      // FinalDecision: "",
      // Date: "",
      BOLogin: "", // логин авторизованного пользователя
      // Department: "",
      ClientManagerLogin: "", // при авторизации
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
        INN: "",
        PINPP: "",
        ResidentFlag: "",
        Gender: null,

        Document: {
          Series: "",
          Number: null,
          ExpirationDate: "",
          GivenDate: "",
          GUID: "",
          Country: "Uzbekistan",
          DocLink: "",
          DocumentName: 0,
          //GivenPlace: ""
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
              AddressType: "Адрес постоянной регистрации"
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
          nameBankProd: "",    // Наименование банка
          nameService: "",     // Наименование товара/работы/услуги
          agreementDate: "",   // Дата договора
          nameProduction: "",  // Наименование продавца
          billProd: "",        // Расчетный счет продавца
          agreementNumber: "", // Номер договора
          idBankProd: 0
        }
        //InitialPaymentPercent: 0
      },

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
    async uploadFiles({ state, commit }, data) {
      console.log("uploadFiles", data);
      try {
        const response = await state.bpmService.uploadFiles(data);
        console.log("responseFile", response);

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("credits/setMessage", errorMessage, { root: true });
      }
    },

    async getFullForm({ state, commit, getters, rootGetters }) {
      try {
        const response = await state.bpmService.getFullForm(
          rootGetters["credits/taskId"]
        );
        //console.log('response', response)

        if (response.data.input && response.data.input.length) {
          const fullForm = response.data.input.find(
            i => i.label === "application"
          ).data;
          const dictionaries = response.data.input.find(
            i => i.label === "inputDictionaries"
          ).data;

          commit("setFullForm", fullForm);
          commit("setDictionaries", dictionaries);
        } else {
          throw "Data is null";
        }

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("credits/setMessage", errorMessage, { root: true });
        sessionStorage.removeItem("csrf_token");
        this.$router.push("/work/credit");
      }
    }
  },
  mutations: {
    setFullForm(state, payload) {
      state.fullFormProfile = payload;
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
          AddressType: ""
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
          AddressType: ""
        },
        FirstName: "",
        //NameENG: "",
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
        ClientRelation: 0,
        PhoneList: {
          items: [
            {
              Number: 998
            }
          ]
        },
        Resident: false,
        LastName: "",
        PINPP: "",
        BirthDate: ""
      });
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
        FamilyConnectionType: 0,
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
        AddressType
      });
    },

    // добавление комментария
    addComment(state, payload) {
      //console.log('comment', payload)

      state.fullFormProfile[payload.commentBlock].items.push(payload.comment);
    },

    removeRegistration(state, payload) {
      const idx = state.fullFormProfile.Customer.AddressList.items.findIndex(
        item => item.AddressType === payload.item
      );
      if (idx !== -1) {
        state.fullFormProfile.Customer.AddressList.items.splice(idx, 1);
      }
    },

    removeProperty(state, payload) {
      state.fullFormProfile.Customer.PropertyInformation[
        payload.item
      ].items.splice(payload.index, 1);
    },

    // setDictionaries(state, dictionaries) {
    //   for (let item in dictionaries) {
    //     for (let value of dictionaries[item].items) {

    //       if (!value.value) {

    //          for (let i in value) {
    //           // debugger
    //            if (typeof value[i] === 'object' && value[i] != null) {
    //             //  this.setDictionaries(state, value[i])
    //             for (let k of value[i].items) {
    //               k.value = Number(k.value)
    //             }
    //            }
    //          }
    //       }else {
    //         value.value = Number(value.value)
    //       }
    //       //value.value = Number(value.value)
    //     }
    //   }
    //   sessionStorage.setItem("dictionaries", JSON.stringify(dictionaries))
    //   state.dictionaries = dictionaries;
    // },

    setDictionaries(state, dictionaries) {
      function objectTransform(dictionaries) {
        for (let item in dictionaries) {
          if (
            typeof dictionaries[item] === "object" &&
            dictionaries[item] != null
          ) {
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

        return dictionaries;
      }
      sessionStorage.setItem(
        "dictionaries",
        JSON.stringify(objectTransform(dictionaries))
      );
      state.dictionaries = objectTransform(dictionaries);
    },

    resetDataFullFormProfile(state) {
      state.fullFormProfile = {
        Status: "",
        // ApplicationID: "",
        // ProtocolNumber: "",
        // Number: "",
        // Branch: "",
        BODecision: false,
        // FinalDecision: "",
        // Date: "",
        BOLogin: "", // логин авторизованного пользователя
        // Department: "",
        ClientManagerLogin: "", // при авторизации
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
          INN: "",
          PINPP: "",
          ResidentFlag: "",
          Gender: null,

          Document: {
            Series: "",
            Number: null,
            ExpirationDate: "",
            GivenDate: "",
            GUID: "",
            Country: "Uzbekistan",
            DocLink: "",
            DocumentName: 0
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
                AddressType: "Адрес постоянной регистрации"
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
            nameBankProd: "",    // Наименование банка
            nameService: "",     // Наименование товара/работы/услуги
            agreementDate: "",   // Дата договора
            nameProduction: "",  // Наименование продавца
            billProd: "",        // Расчетный счет продавца
            agreementNumber: "", // Номер договора
            idBankProd: 0
          }
          //InitialPaymentPercent: 0
        },

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
    profile: state => state
  }
};
