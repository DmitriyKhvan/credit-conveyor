<template>
  <div class="task q-py-md q-mb-lg">
    <div class="q-pr-sm">
      <q-checkbox v-model="val" />
    </div>
    <div class="taskContent q-pr-md">
      <div class="title q-py-sm">
        Организация по кибербезопасности направляет вам документы по зашиты внутренних систем для ознакомления и принятие соответствующие меры.
      </div>
      <div class="despBlock q-py-sm">
        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Send.svg" />
          </div>
          <div class="q-px-sm">Статус:</div>
          <div><strong class="blue">В работе</strong></div>
        </div>
        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Time-Limit.svg" />
          </div>
          <div class="q-px-sm">Срок сдачи:</div>
          <div><strong>23.06.2020</strong><br><strong class="green">Осталось 2 дня</strong></div>
        </div>
        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Send.svg" />
          </div>
          <div class="q-px-sm">От:</div>
          <div><strong>С. Баратов</strong></div>
        </div>
        <div class="buttonFilter buttonTask text-center">
          <a-popup></a-popup>

        </div>
      </div>

      <div class="despBlock q-py-sm despBlockTwo">
        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Enter-1.svg" />
          </div>
          <div class="q-px-sm">Исходящий номер:<br>02-1073</div>
        </div>
        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Enter.svg" />
          </div>
          <div class="q-px-sm">Входящий номер:<br>001_к</div>
        </div>
        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Calendar.svg" />
          </div>
          <div class="q-px-sm">Исходящая дата:<br>28.03.2020</div>
        </div>
        <div class="desp">
          <div class="pad-3">
            <img src="@/assets/icons/Calendar.svg" />
          </div>
          <div class="q-px-sm">Входящая дата:<br>28.03.2020</div>
        </div>
        <div class="desp">
          <div class="desp q-pr-sm">
            <div><img src="@/assets/icons/List.svg" /></div>
            <div class="desp q-px-sm">7</div>
          </div>
          <div class="desp q-pr-sm">
            <div><img src="@/assets/icons/Comments.svg" /></div>
            <div class="desp q-px-sm">25</div>
          </div>
          <div class="desp q-pr-sm">
            <div><img src="@/assets/icons/User-Account.svg" /></div>
            <div class="desp q-px-sm">25</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import Popup from './Popup'
export default {
  components: {
    APopup: Popup
  },
  data(){
    return {
      val: false
    }
  }
}
</script>
<style scoped>
  .task {
    border-bottom: 1px #E3E4E8 solid;
  }
  .task, .taskContent {
    width: 100%;
    font-size: 16px;
    color: #333;
  }
  .pad-3 {padding-top: 3px;}
  .blue {color: #3576CB;}
  .green {color: #47B881;}
  .despBlock {
    display: flex;
    justify-content: space-between;
    color: #606060
  }
  .despBlockTwo {
    font-size: 14px;
  }
  .desp {
    display: flex;
  }
  .task {
    display: flex;
  }

</style>
