import BpmService from "../../services/bpm.service";

export default {
  state: {
    confirm: false,
    dictionaries: {},

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
      {
        Comment: "",
        MemberOfCCFIO: "",
        id: 0,
        Login: "",
        isApproved: false
      }
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
          AddressType: 1
        },
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
          AddressType: 2
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
      Currency: "", // Валюта
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
      {
        Comment: "",
        Type: "",
        CommentPerson: "",
        id: 0,
        CommentDate: "2020-03-18T09:00:23.928+05:00"
      }
    ],
    AttachedDocuments: [
      {
        DocLink: "",
        DocumentName: ""
      }
    ],

    bpmService: new BpmService(),
    // icon: false,
    // loader: false,
    // iconMessage: "",
    // disableBtn: false,
    // disableInput: false,
    // submitting: false,
    // loadMessage: ""
  },
  actions: {
    // async authProcess(state, payload) {
    //   return await state.state.bpmService.authProcess(payload);
    // }
  },
  mutations: {
    addPhone(state) {
      state.Customer.PhoneList.push({
        Number: 998
      });
    },

    addPhoneGuarantee(state, payload) {
      state.Guarantee[payload.item][payload.index].PhoneList.push({
        Number: 998
      });
    },

    addProperty(state) {
      state.Customer.PropertyInformation.Realty_new.push({
        MarketValue: null,
        Region: null,
        PropertyType: null
      });
    },

    addVehicle(state) {
      state.Customer.PropertyInformation.Transport_new.push({
        transportBrand: "",
        yearOfRelease: null,
        VehicleType: null,
        marketValue: null
      });
    },

    addInsurance(state) {
      state.Guarantee.Insurance.push({
        INN: "",
        OrgName: "",
        Sum: 0
      });
    },

    addRelatedLegalPerson(state) {
      state.Guarantee.RelatedLegalPerson.push({
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
      state.Guarantee.RelatedPerson.push({
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
      state.Customer[payload.item].splice(payload.index, 1);
    },

    removeGuarantee(state, payload) {
      state.Guarantee[payload.item].splice(payload.index, 1);
    },

    removePhoneGuarantee(state, payload) {
      state.Guarantee[payload.item][payload.index].PhoneList.splice(
        payload.index2,
        1
      );
    },

    addRelative(state) {
      state.Customer.Relatives.push({
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
      state.Customer.AddressList.push({
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

    removeRegistration(state, payload) {
      const idx = state.Customer.AddressList.findIndex(
        item => item.AddressType === payload.item
      );
      state.Customer.AddressList.splice(idx, 1);
    },

    removeProperty(state, payload) {
      state.Customer.PropertyInformation[payload.item].splice(payload.index, 1);
    },

    setDictionaries(state, payload) {
      state.dictionaries = payload;
    }
  },
  getters: {}
};
