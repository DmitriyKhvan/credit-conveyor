<template>
  <div class="OpenSans">
  <div class="font-a row justify-end no-wrap items-center col q-pa-sm text-weight-bolder j-grey">
    <div class="row q-mr-xs no-wrap items-center cursor-pointer"  @click="reversed">
      #<q-icon color="primary" name="arrow_drop_down" />
    </div>
    <div class="col q-mx-sm text-no-wrap text-uppercase">
      Наименование задачи
    </div>
    <div class="col-2 q-px-sm text-uppercase">
      ПОЛУЧАТЕлЬ
    </div>
    <div class="col-1 text-center q-px-sm text-uppercase">
      Срок
    </div>
    <div class="col-2 text-center q-px-sm text-uppercase">
      Важность
    </div>
    <div class="col-2 text-center q-px-sm text-uppercase">
      Статус
    </div>
  </div>
  <div  class="font-b row justify-end text-no-wrap no-wrap items-center col text-weight-bolder rounded-borders bg-white q-mb-sm"
        v-for="(item, i) in itemsData.slice(pagination.StartIndex, pagination.EndIndex+1)" :key="i">
    <div class="row q-mr-xs no-wrap items-center q-ml-sm">
      {{ reverse ? pagination.TotalItems-pagination.StartIndex-i : i + pagination.StartIndex + 1 }}
    </div>
    <div class="col q-px-sm text-no-wrap">
      {{item.title}}
    </div>
    <div class="bg-white col-2 q-px-sm">
      <q-avatar size="35px">
        <img v-bind:src="item.avatar" />
      </q-avatar>
      <b class="q-ml-sm">{{item.name}}</b>
    </div>
    <div class="col-1 text-center q-px-sm text-lowercase bg-white">
      {{forDate(item.deadline)}}
    </div>
    <div class="col-2 text-center q-px-sm" v-html="priority[item.prior]">
    </div>
    <div class="col-2 text-center bg-white q-py-sm">
      {{status[item.status]}}
    </div>
  </div>
  <div class="row no-wrap justify-end items-center text-weight-bolder">
    <div>Показано строк: </div>
    <q-select class="q-px-md" borderless v-model="per" :options="peroption" @input="viewChange(pagination.CurrentPage)"/>
    <i class="q-mx-sm">
        {{ reverse ? pagination.TotalItems-pagination.StartIndex : pagination.StartIndex+1 }}
        -{{reverse ? pagination.TotalItems-pagination.EndIndex : pagination.EndIndex+1}}
        из {{pagination.TotalItems}}
    </i>
    <div class="row no-wrap q-mr-md">
      <q-icon name="arrow_back_ios" class="q-mx-md cursor-pointer" @click="prev" />
      <q-icon name="arrow_forward_ios" class="cursor-pointer" @click="next" />
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reverse: true,
      pagination: {
        TotalItems: null,
        CurrentPage: null,
        PageSize: null,
        TotalPages: null,
        StartPage: null,
        EndPage: null,
        StartIndex: null,
        EndIndex: null,
        Pages: null
      },
      priority: {
        1: '<b class="bg-red text-white q-py-xs q-px-md">Срочная</b>',
        2: '<b class="bg-orange text-white q-py-xs q-px-md">Важная</b>',
        3: '<b class="bg-green text-white q-py-xs q-px-md">Не важная</b>'
      },
      status: {
        1: 'В работе',
        2: 'На рассмотрении',
        3: 'Исполнено'
      },
      per: { label: '<span class="q-px-md">5</span>', value: 5 },
      peroption: [{
        label: '<span class="q-px-md">5</span>',
        value: 5
      },
      {
        label: '<span class="q-px-md">10</span>',
        value: 10
      },
      {
        label: '<span class="q-px-md">15</span>',
        value: 15
      },
      {
        label: '<span class="q-px-md">20</span>',
        value: 20
      }]
    }
  },
  props: {
    itemsData: {
      type: Array,
      required: true
    }
  },
  mounted () {
    // console.log(this.pagination)
  },
  created () {
    this.viewChange(1)
  },
  methods: {
    forDate (i) {
      if (i) {
        // eslint-disable-next-line no-unused-vars
        var monthNames = [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь'
        ]
        // eslint-disable-next-line no-unused-vars
        var temp = i.split('-')
        return (temp[0] + ' ' + monthNames[Number(temp[1] - 1)] + ' ' + temp[2])
      }
    },
    viewChange (p) {
      var totalItems = this.itemsData.length,
        currentPage = p,
        pageSize = this.per.value,
        maxPages = 10,
        totalPages = Math.ceil(totalItems / pageSize)

      // ensure current page isn't out of range
      if (currentPage < 1) {
        currentPage = 1
      } else if (currentPage > totalPages) {
        currentPage = totalPages
      }

      var startPage, endPage
      if (totalPages <= maxPages) {
      // total pages less than max so show all pages
        startPage = 1
        endPage = totalPages
      } else {
      // total pages more than max so calculate start and end pages
        var maxPagesBeforeCurrentPage = Math.floor(maxPages / 2)
        var maxPagesAfterCurrentPage = Math.Ceiling(maxPages / 2) - 1
        if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
          startPage = 1
          endPage = maxPages
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
          startPage = totalPages - maxPages + 1
          endPage = totalPages
        } else {
        // current page somewhere in the middle
          startPage = currentPage - maxPagesBeforeCurrentPage
          endPage = currentPage + maxPagesAfterCurrentPage
        }
      }

      // calculate start and end item indexes
      var startIndex = (currentPage - 1) * pageSize
      var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

      // create an array of pages that can be looped over
      var pages = this.range(startPage, (endPage + 1) - startPage)

      // update object instance with all pager properties required by the view
      this.pagination.TotalItems = totalItems
      this.pagination.CurrentPage = currentPage
      this.pagination.PageSize = pageSize
      this.pagination.TotalPages = totalPages
      this.pagination.StartPage = startPage
      this.pagination.EndPage = endPage
      this.pagination.StartIndex = startIndex
      this.pagination.EndIndex = endIndex
      this.pagination.Pages = pages
    },
    range (start, end, step = 1) {
      const output = []
      if (typeof end === 'undefined') {
        end = start
        start = 0
      }
      for (let i = start; i < end; i += step) {
        output.push(i)
      }
      return output
    },
    next () {
      const temp = this.pagination.CurrentPage
      this.viewChange(temp + 1)
    },
    prev () {
      const temp = this.pagination.CurrentPage
      this.viewChange(temp - 1)
    },
    reversed () {
      this.reverse = !this.reverse
      this.itemsData.reverse()
    }
  }
}
</script>
<style scoped>
@font-face {
  font-family: "OpenSans";
  src: url("~assets/fonts/OpenSans-Regular.ttf") format("truetype");
}
.OpenSans {
  font-family: "OpenSans";
  font-weight: 500;
  font-style: normal;
}
.j-grey {
  color: #A0A5BA;
}
.font-a {
  font-size: 16px;
}
.font-b {
  font-size: 14px;
}
</style>