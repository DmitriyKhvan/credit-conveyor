<template>
  <div class="column fonts">
    <div class="row justify-around q-pb-md nav">
      <div class="col text-center active">
        <span>Задачи</span>
      </div>
      <div class="col text-center">
        <span>Документы</span>
      </div>
      <div class="col text-center">
        <span>Финансы</span>
      </div>
      <div class="col text-center">
        <span>Блокнот</span>
      </div>
      <div class="col text-center">
        <span>Заметки</span>
      </div>
    </div>

    <div class="col">
      <table>
        <tr>
          <td colspan="7" class="tdTop">
            <span class="row justify-center">
              <span class="col-1 text-center"><q-icon name="keyboard_arrow_left" size="sm" /></span>
              <span class="col-2 text-center">Апрель</span>
              <span class="col-1 text-center"><q-icon name="keyboard_arrow_right" size="sm" /></span>
              <span class="col-1 text-center"><q-icon name="keyboard_arrow_left" size="sm" /></span>
              <span class="col-2 text-center">2020</span>
              <span class="col-1 text-center"><q-icon name="keyboard_arrow_right" size="sm" /></span>
            </span>
          </td>
        </tr>
        <tr>
          <th>Пон</th>
          <th>Вт</th>
          <th>Ср</th>
          <th>Чт</th>
          <th>Пт</th>
          <th>Сб</th>
          <th>Вс</th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td><div>1</div></td>
          <td><div>2</div></td>
          <td><div>3</div></td>
          <td class="tdbg"><div>4</div></td>
          <td class="tdbg"><div>5</div></td>
        </tr>
        <tr>
          <td><div>6</div></td>
          <td><div>7</div></td>
          <td class="active"><div>8</div></td>
          <td><div>9</div></td>
          <td><div>10</div></td>
          <td class="tdbg"><div>11</div></td>
          <td class="tdbg"><div>12</div></td>
        </tr>
        <tr>
          <td><div>13</div></td>
          <td><div>14</div></td>
          <td><div>15</div></td>
          <td><div>16</div></td>
          <td><div>17</div></td>
          <td class="tdbg"><div>18</div></td>
          <td class="tdbg"><div>19</div></td>
        </tr>
        <tr>
          <td><div>20</div></td>
          <td><div>21</div></td>
          <td><div>22</div></td>
          <td><div>23</div></td>
          <td><div>24</div></td>
          <td class="tdbg"><div>25</div></td>
          <td class="tdbg"><div>26</div></td>
        </tr>
        <tr>
          <td><div>27</div></td>
          <td><div>28</div></td>
          <td><div>29</div></td>
          <td><div>30</div></td>
          <td></td>
          <td class="tdbg"></td>
          <td class="tdbg"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {

    }
  },

};
</script>

<style scoped>
@font-face {
    font-family: 'OpenSans';
    src: url(../../../../assets/fonts/OpenSans-Regular.ttf);
  }
.fonts {
  font-family: 'OpenSans';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #20253A;
}
.nav {
  font-size: 15px;
  font-weight: bold;
}
.nav .active {
  color: #0054FE
}
.nav span {
  border-bottom: 2px #fff solid;
  cursor: pointer;
}
.nav .active span {
  border-bottom: 2px #0054FE solid;
}


  table {
    width: 100%;
  }
  table, th, td {
  border: 1px solid #DEDEDE;
  border-collapse: collapse;
  }
  td {
    height: 80px;
    vertical-align: top;
    cursor: pointer;
  }
  th, td {padding: 10px;}
  th {
    color: #9B9EAC;
    height: 20px;
  }

  th, .tdTop {
    border: none;
  }
  .tdTop {
    vertical-align: middle;
    font-size: 16px;
    font-weight: 600;
    height: 60px;
  }
  .tdbg {background: #F8F8FB;}
  td div {
    float: left;
    border-radius: 15px;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
  }
  td.active div, td:hover div {
    background: #0054FE;
    color: #fff;
  }
</style>
