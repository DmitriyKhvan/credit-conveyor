import BpmService from "../../services/bpm.service";
import CommonUtils from "@/shared/utils/CommonUtils";

export const profile = {
  namespaced: true,
  state: {
    bpmService: new BpmService(),
    confirmCredit: false,
    fileList: [],
    disableField: false,
    dictionaries: {},
    // dictionaries: {
    //   Graduation: {
    //     items: []
    //   },
    //   additionalIncomeSource: {
    //     items: []
    //   },
    //   VehicleType: {
    //     items: []
    //   },
    //   employeesNum: {
    //     items: []
    //   },
    //   BusinessType: {
    //     items: []
    //   },
    //   DocumentType: {
    //     items: []
    //   },
    //   Reasons: {
    //     items: []
    //   },
    //   ClientRelationType: {
    //     items: []
    //   },
    //   Gender: {
    //     items: []
    //   },
    //   PropertyType: {
    //     items: []
    //   },
    //   LoanProduct: {
    //     items: []
    //   },
    //   DecisionType: {
    //     items: []
    //   },
    //   MainWorkType: {
    //     items: []
    //   },
    //   LoanDetails: {
    //     items: []
    //   },
    //   LoanPurpose: {
    //     items: []
    //   },
    //   PaymentsType: {
    //     items: []
    //   },
    //   PositionType: {
    //     items: []
    //   },
    //   MaritalStatus: {
    //     items: []
    //   },
    //   GuaranteeType: {
    //     items: []
    //   },
    //   FinancialSources: {
    //     items: []
    //   },
    //   Region: {
    //     items: []
    //   },
    //   Districts: {
    //     items: []
    //   },
    //   jobPeriods: {
    //     items: []
    //   },
    //   FamilyRelation: {
    //     items: []
    //   }
    // },
    //filesAll: [], // для фильтрации какие файлы загружены на сервер

    AddressType: [
      "Адрес постоянной регистрации",
      "Адрес фактического проживания",
      "Адрес временной регистрации"
    ],
    
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
          documentType: 2,
          Series: "",
          Number: null,
          ExpirationDate: "",
          GivenDate: "",
          GUID: "",
          Country: "Uzbekistan",
          DocLink: "",
          DocumentName: "",
          GivenPlace: ""
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
                GivenPlace: ""
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
        throw error
      }
    },

    async removeFiles({ state, commit }, id) {
      try {
        const response = await state.bpmService.removeFiles(id);
        console.log("responseFile", response);

        return response;
      } catch(error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("credits/setMessage", errorMessage, { root: true });
        throw error
      }
    },

    async getFullForm({ state, commit, getters, rootGetters }, taskId) {
      
      let response
      try {
        if (taskId) {
          response = await state.bpmService.getFullForm(taskId);
          return response;
        } else {
          response = await state.bpmService.getFullForm(
            rootGetters["credits/taskId"]
          );
        }
        
        console.log('response', response)

        if (response.data.input && response.data.input.length) {
          const data = response.data.input.find(
            i => i.label === "application"
          ).data;
          const dictionaries = response.data.input.find(
            i => i.label === "inputDictionaries"
          ).data;
            
          // if (response.data.name == "Full Application Filling") { // кредит не оформлен
          //   commit("setPreapprovData", data);
          // } 
          if (data.BODecision == null) { // кредит не оформлен
            commit("setPreapprovData", data);
          } 
          else if (response.data.name == "Работа с документами") {
            console.log('res', response)
            const fileList = response.data.input.find(
              i => i.label === "overdraft" || i.label === "consumer_credit" || i.label === "microloan"
            )
            console.log('fileList', fileList)
            if (fileList) {
              commit("setFileList", fileList)
            }

            state.disableField = true
            
            commit("setFullForm", data);
          } 
          else {
            commit("setFullForm", data);
          }

          commit("setDictionaries", dictionaries);
        } else {
          throw "Data is null";
        }

        return response;
      } catch (error) {
        const errorMessage = CommonUtils.filterServerError(error);
        commit("credits/setMessage", errorMessage, { root: true });
        sessionStorage.clear()
        this.$router.push("/work/credit");
        throw error
      }
    }
  },
  mutations: {
    setFullForm(state, payload) {
      
      // Для корректной валидации
      payload.Customer.Document.Number = String(payload.Customer.Document.Number)
      payload.Customer.Relatives.items.map(i => i.Document.Number = String(i.Document.Number))
      payload.Guarantee.RelatedPerson.items.map(i => i.Document.Number = String(i.Document.Number))
      
      state.fullFormProfile = payload;
    },

    setPreapprovData(state, payload) {
      state.fileList = []
       // Для корректной валидации
      payload.Customer.Document.Number = String(payload.Customer.Document.Number)

      state.fullFormProfile.Customer.FirstName = payload.Customer.FirstName;
      state.fullFormProfile.Customer.LastName = payload.Customer.LastName;
      state.fullFormProfile.Customer.MiddleName = payload.Customer.MiddleName;
      state.fullFormProfile.Customer.INN = payload.Customer.INN;
      state.fullFormProfile.Customer.PhoneList.items[0].Number = payload.Customer.PhoneList.items[0].Number;
      state.fullFormProfile.Customer.PINPP = payload.Customer.PINPP;
      state.fullFormProfile.Customer.Document.Series = payload.Customer.Document.Series
      state.fullFormProfile.Customer.Document.Number = payload.Customer.Document.Number

      state.fullFormProfile.Customer.MaritalStatus = payload.Customer.MaritalStatus

      state.fullFormProfile.Customer.hasChildren = payload.Customer.hasChildren;
      state.fullFormProfile.Customer.UnderAgeChildrenNum = payload.Customer.ChildrenNum;

      state.fullFormProfile.Customer.MonthlyIncome.confirmMonthlyIncome = payload.Customer.MonthlyIncome.confirmMonthlyIncome;
      state.fullFormProfile.Customer.MonthlyExpenses.recurringExpenses = payload.Customer.MonthlyExpenses.recurringExpenses;
      state.fullFormProfile.Customer.MonthlyExpenses.obligations = payload.Customer.MonthlyExpenses.obligations;
      state.fullFormProfile.Customer.MonthlyIncome.hasAdditionalIncome = payload.Customer.MonthlyIncome.hasAdditionalIncome;
      state.fullFormProfile.Customer.MonthlyIncome.additionalIncome.sum = payload.Customer.MonthlyIncome.additionalIncome.sum;
      state.fullFormProfile.Customer.MonthlyIncome.additionalIncome.incomeType = payload.Customer.MonthlyIncome.additionalIncome.incomeType;

      state.fullFormProfile.LoanInfo.LoanProduct = payload.LoanInfo.LoanProduct;
      state.fullFormProfile.LoanInfo.RepaymentType = payload.LoanInfo.RepaymentType;
      state.fullFormProfile.LoanInfo.TermInMonth = payload.LoanInfo.TermInMonth;
    },

    setFileList(state, fileList) {
      state.fileList = []
      state.fileList.push(fileList)
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
          GivenPlace: ""
        },
        ClientRelation: null,
        PhoneList: {
          items: [
            {
              Number: 998
            }
          ]
        },
        Resident: null,
        LastName: "",
        PINPP: "",
        BirthDate: ""
      });
    },

    setDistricts(state, payload) {
      state.fullFormProfile.Customer[payload.item].items[payload.idx].District = null
      state.fullFormProfile.Customer[payload.item].items[payload.idx].Districts = payload.districts
    },

    setDistrictsGuarantee(state, payload) {
      state.fullFormProfile.Guarantee[payload.guarantee].items[payload.idx].Address.District = null
      state.fullFormProfile.Guarantee[payload.guarantee].items[payload.idx].Address.Districts = payload.districts
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
          GivenPlace: ""
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
      console.log('comment', payload)
      if (payload.commentBlock == 'CreditCommiteeDecisions') {
        const idx = state.fullFormProfile[payload.commentBlock].items.findIndex(i => i.Login == payload.comment.Login)
        state.fullFormProfile[payload.commentBlock].items[idx] = {
          ...state.fullFormProfile[payload.commentBlock].items[idx],
          ...payload.comment
        }
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
        }
        state.fullFormProfile.Customer.AddressList.items[idx].AddressType = "Адрес фактического проживания"
        state.fullFormProfile.Customer.AddressList.items[idx].flag = payload.value
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
      state.dictionaries = objectTransform(dictionaries)
    },

    resetDataFullFormProfile(state) {
      state.fileList = [] // очистка файлов на печать
      state.disableField = false
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
            documentType: 2,
            Series: "",
            Number: null,
            ExpirationDate: "",
            GivenDate: "",
            GUID: "",
            Country: "Uzbekistan",
            DocLink: "",
            DocumentName: "",
            GivenPlace: ""
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
                  GivenPlace: ""
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
