
export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}

export const generateItems = (count, creator) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(creator(i))
  }
  return result
}

export const getData = (n, g) => {
  // eslint-disable-next-line no-unused-vars
  const initdata = {
    'task_id': 396,
    'f_task_data': {
      'doc_id': 160,
      'file': {
        'id': 247,
        'name': '123_тест.pdf',
        'size': 25532,
        'extension': '.pdf'
      },
      'journal': 'Олий Мажлис, Аппарат Президента, Кабинет Министров',
      'region': 'Ферганская область',
      'organ': 'Кабинет Министров РУз',
      'paper_count': 3,
      'format': 'Бумажное письмо',
      'out_number': '08/1-609',
      'out_date': '2020-08-08',
      'in_number': '757-к',
      'in_date': '2020-08-10',
      'fio': null,
      'description': 'График осуществления поставленных задач в ПКМ №444 от 16.07.2020г. о развитии системы электронное правительство.',
      'signed_by': 'О.Умаров',
      'doc_status': 2,
      'type': 1,
      'h_emps': [
        {
          'FIRST_NAME': 'Сирожиддин',
          'LAST_NAME': 'Баратов',
          'MIDDLE_NAME': 'Умарович',
          'EMP_ID': 14365
        }
      ],
      'task_message': 'Прошу в установленном порядке взять на контроль',
      'deadline': null,
      'deadline_status': null,
      'active': null,
      'created_by': 14365,
      'created_at': '2020-08-28T13:08:15.069257+05:00',
      'updated_by': 14365,
      'updated_at': '2020-09-01T23:49:08.893581+05:00'
    },
    'emp_id': 14365,
    'check': true,
    'last_name': 'Баратов',
    'first_name': 'Сирожиддин',
    'middle_name': 'Умарович',
    'dep_code': '000407',
    'dep_name': 'Ахборот технологиялари департаменти',
    'h_emp_id': 2010,
    'h_last_name': 'Курамбаев',
    'h_first_name': 'Азамат',
    'h_middle_name': 'Каримбаевич',
    'h_dep_code': '000151',
    'h_dep_name': 'Ра&#1203;барият',
    'u_status': 2,
    'm_emp_id': 14365,
    'm_last_name': 'Баратов',
    'm_first_name': 'Сирожиддин',
    'm_middle_name': 'Умарович',
    'created_at': '2020-09-01T23:49:08.893581+05:00',
    'updated_at': '2020-09-01T23:51:09.346455+05:00',
    'history': {},
    'comments': [
      {
        'id': 236,
        'task_id': 160,
        'emp_id': 14365,
        'first_name': 'Сирожиддин',
        'last_name': 'Баратов',
        'middle_name': 'Умарович',
        'dep_code': '000407',
        'dep_name': 'Ахборот технологиялари департаменти',
        'text': 'salom123',
        'created_at': '2020-09-01T23:50:17.431658',
        'updated_at': '2020-09-01T23:50:41.877488',
        'edit': null
      },
      {
        'id': 237,
        'task_id': 160,
        'emp_id': 8722,
        'first_name': 'Отабек',
        'last_name': 'Мухамеджанов',
        'middle_name': 'Улугбекович',
        'dep_code': '000407',
        'dep_name': 'Ахборот технологиялари департаменти',
        'text': '54654',
        'created_at': '2020-09-01T23:51:59.665798',
        'updated_at': '2020-09-01T23:51:59.665798',
        'edit': null
      },
      {
        'id': 238,
        'task_id': 160,
        'emp_id': 8722,
        'first_name': 'Отабек',
        'last_name': 'Мухамеджанов',
        'middle_name': 'Улугбекович',
        'dep_code': '000407',
        'dep_name': 'Ахборот технологиялари департаменти',
        'text': 'dsfds ',
        'created_at': '2020-09-07T16:02:55.181912',
        'updated_at': '2020-09-07T16:02:55.181912',
        'edit': null
      }
    ],
    'user_files': null,
    'forward_tasks': null
  }
  const result = []
  for (let i = 0; i < n; i++) {
    result.push(g(i))
  }
  return result
}
