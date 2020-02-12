import BpmService from '../../pages/main/work/modules/pages/credit/service/bpm-service';

export default {
  state: {
    confirm: false,
    personalData: {
      surname: "",
      name: "",
      mname: "",
      inn: "",
      pinpp: "",
      sex: "",
      residency: "",
      phones: [{
        phone: 998
      }],
      email: "",
      education: "",
      
      passportData: {
        series: "",
        number: "",
        date: ""
      },

      //Адрес
      permanentRegistration: {
        index: null,
        rigion: "",
        city: "",
        street: "",
        houseNumber: "",
        housing: "",
        structure: "",
        apartmentNumber: "",
        typeOfOwnership: ""
      },
    
  
      actualRegistration: {
        index: null,
        rigion: "",
        city: "",
        street: "",
        houseNumber: "",
        housing: "",
        structure: "",
        apartmentNumber: "",
        typeOfOwnership: ""
      },

      temporaryRegistration: {
        index: null,
        rigion: "",
        city: "",
        street: "",
        houseNumber: "",
        housing: "",
        structure: "",
        apartmentNumber: "",
        typeOfOwnership: ""
      },

      activity: {
        kind: "",
        nameOfEmployer: "",
        innOfEmployer: null,
        typeOrganization: "",
        amountWorkes: "",
        position: "",
        positionCategory: "",
        workExperience: "",
        totalWorkExperience: "",
      },

      family: {
        familyStatus: "",
        children: "",
        childrenCount: 0
      },

      expenseIncome: {
        income: 0, //подтвержденный ежемесячный доход
        expense: 0, //периодические расходы
        otherExpenses: 0, //плата за облуживание других обязательств
        externalIncome: "", //наличие дополнительного дохода
        externalIncomeSize: 0, //размер дополнительного дохода
        additionalIncomeSource: "" //источник дополнительного дохода
      },

      relatives: [
        {
          relative: "",
          surname: "",
          name: "",
          mname: "",
          birthday: "",
          passportData: {
            series: "",
            number: null,
            date: ""
          }
        }
      ],

      //Имущество
      properties: [],
      vehicles: [],

      //Гарантии
      guarantees: [],

      infoCredit: {
        product: "",
        price: 0,
        currency: "",
        typeRepayment: "",
        interestRateMax: 0,
        interestRateMin: 0,
        periodRepayment: "",
        comfortablePeriodRepayment: 0,
        periodRepaymentMin: 0,
        periodRepaymentMax: 0,
        type: "",
        initialFee: 0,
        procentInitialFeeMin: 0,
        procentInitialFeeMax: 0,
        purposeCredit: "",
        sellerName: "",
        productName: "",
        sourceFinancs: ""
      },

      comment: ""

    },

    creditCalc: {
      loanSum: 51105000,
      loanRate: 26,
      loanTerm: 24,
      loanDate: "2020-02-08",
      paymentType: 1,
      preferential: false,
      preTerm: 0
    },

    creditResult: {
      totalPercent: 300000,
      totalLoan: 1000000,
      totalPayment: 1300000,
      paymentRows: [
        {
          date: '01.01.2020',
          daysInMonth: 30,
          monthNum: 1,
          balanceAtStart: 1000000,
          percent: 10000,
          mainDebt: 20000,
          total: 30000,
          balanceAtEnd: 980000
        }
      ]
    },
    
    bpmService: new BpmService(),
    icon: false,
    loader: false,
    iconMessage: "",
    disableBtn: false,
    disableInput: false,
    submitting: false,
    loadMessage: "",
  },
  actions: {

    // async authProcess(state, payload) {
    //   return await state.state.bpmService.authProcess(payload);
    // }
  },
  mutations: {
    addPhone(state) {
      //console.log(state)
      state.personalData.phones.push({
        phone: 998
      })
    }, 

    addPhoneGuarantee(state, payload) {
      //console.log(state.personalData.guarantees[payload])
      state.personalData.guarantees[payload.index][payload.item].phones.push({
        phone: 998
      })

    },

    addProperty(state) {
      state.personalData.properties.push({
        type: "",
        region: "",
        price: 0
      })
    },

    addVehicle(state) {
      state.personalData.vehicles.push({
        type: "",
        brand: "",
        year: null,
        price: 0
      })
    },

    addGuarantee(state) {
      state.personalData.guarantees.push({
        type: "",
        individual: {
          attitude: "",
          price: 0,
          surname: "",
          name: "",
          mname: "",
          birthday: "",
          inn: null,
          pinpp: null,
          residency: "",
          index: "",
          region: "",
          city: "",
          street: "",
          houseNumber: "",
          housing: "",
          structure: "",
          apartmentNumber: "",
          passportData: {
            series: "",
            number: null,
            date: ""
          },
          phones: [{
            phone: 998
          }],
        },
        entity: {
          price: 0,
          name:"",
          inn: null,
          activity: "",
          index: "",
          region: "",
          city: "",
          street: "",
          houseNumber: "",
          housing: "",
          structure: "",
          officeNumber: "",
          phones: [{
            phone: 998
          }],
        },
        insurance: {
          name:"",
          inn: null,
          price: 0,
        },
      })
    },

    removeItem(state, payload) {
      state.personalData[payload.item].splice(payload.index, 1);
    },

    removePhoneGuarantee(state, payload) {
      //console.log(state.personalData.guarantees);
      state.personalData.guarantees[payload.index][payload.item].phones.splice(payload.index2, 1)
    },

    addRelative(state) {
        state.personalData.relatives.push({
        relative: "",
        surname: "",
        name: "",
        birthday: "",
        mname: "",
        passportData: {
          series: "",
          number: "",
          date: ""
        }
      })
    },

    // toggleConfirm(state, payload) {
    //   state.confirm = payload.preApprovalForm;
    //   state.preApprovalData.income = payload.income;
    //   state.preApprovalData.expense = payload.expense;
    //   state.preApprovalData.maxPayment = payload.maxPayment;
    //   state.preApprovalData.maxSum = payload.maxSum
    // },
    // toggleSubmitting(state, payload) {
    //   state.submitting = payload
    // },
    // toggleDisableBtn(state, payload) {
    //   state.disableBtn = payload
    // },
    // toggleDisableInput(state, payload) {
    //   state.disableInput = payload
    // },
    // errorLoadData(state, payload) {
    //   // console.log(payload);
    //   state.icon = payload.flag;
    //   state.loader = payload.loader;
    //   state.iconMessage = payload.message
    // },
    // loadMessageChange(state, payload) {
    //   state.loadMessage = payload
    // },
    // sentPersonData(state, payload) {
    //   console.log("Данные пользователя",payload);
    //   state.personalData.name = payload.personData.Name;
    //   state.personalData.surname = payload.personData.Surname;
    //   state.personalData.pinpp = payload.personData.Pinpp;
    //   state.personalData.passport = payload.personData.DocumentNumber;
    //   state.personalData.inn = payload.Inn;
    //   state.personalData.mname = payload.Patronym;
    // }
  },
  getters: {

  }
}