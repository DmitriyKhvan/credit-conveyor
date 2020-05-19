<template>
    <div class="col-lg-2 col-md-3 col-sm-4 right q-pa-md">
      <div class="row">
        <div class="col-4">
          <img :src="getUserProfilePhotoUrl(emp_id)"/>
        </div>
        <div class="col-8 q-pl-md">
          <div class="text-h6 name">
            {{user}}
            <div class="text-body2">
              Проектный менеджер
              <span class="text-caption">работает с 11.04.2020</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="q-pa-sm q-my-md bg-white otdel">
          НБУ > Республиканский Отдел > ДИТ
          Управление инновационного >
          развития и внедерения новых
          продуктов > Отдел разработки ПО
        </div>

        <div class="menu">
          <div @click="menu(0)" :class="menuId == 0 ? 'active' : ''"><q-icon name="account_box" size="xs" class="q-pr-sm" /> Мои данные</div>
          <div @click="menu(1)" :class="menuId == 1 ? 'active' : ''"><q-icon name="work" size="xs" class="q-pr-sm" /> Документы</div>
          <div @click="menu(2)" :class="menuId == 2 ? 'active' : ''"><q-icon name="contacts" size="xs" class="q-pr-sm" /> Личные</div>
          <div @click="menu(3)" :class="menuId == 3 ? 'active' : ''"><q-icon name="person" size="xs" class="q-pr-sm" /> Паспорт</div>
          <div @click="menu(4)" :class="menuId == 4 ? 'active' : ''"><q-icon name="people" size="xs" class="q-pr-sm" /> Родственники</div>
          <div @click="menu(5)" :class="menuId == 5 ? 'active' : ''"><q-icon name="menu_book" size="xs" class="q-pr-sm" /> Пое/Наг/Выб</div>
          <div @click="menu(6)" :class="menuId == 6 ? 'active' : ''"><q-icon name="school" size="xs" class="q-pr-sm" /> Образование</div>
          <div @click="menu(7)" :class="menuId == 7 ? 'active' : ''"><q-icon name="trending_up" size="xs" class="q-pr-sm" /> Карьера</div>
          <div @click="menu(8)" :class="menuId == 8 ? 'active' : ''"><q-icon name="memory" size="xs" class="q-pr-sm" /> Трудовой деятельность</div>
          <div @click="menu(9)" :class="menuId == 9 ? 'active' : ''"><q-icon name="chrome_reader_mode" size="xs" class="q-pr-sm" /> Контракт</div>
          <div @click="menu(10)" :class="menuId == 10 ? 'active' : ''"><q-icon name="assignment_turned_in" size="xs" class="q-pr-sm" /> Отметки</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    getUserProfilePhotoUrl(emp_id) {
      return `http://10.8.88.219/index.php?module=Tools&file=phones&prefix=profile&act=img&uid=${emp_id}`;
    },
    menu(id) {
      this.$store.dispatch('setMenuId', id)
    }
  },
  computed: {
    ...mapGetters({
    user: "auth/fullName"
    }),
    ...mapGetters({
    emp_id: "auth/empId"
    }),
    menuId () {
      return this.$store.getters.getMenuId
    }
  }
}
</script>

<style scoped>
  .right {
    background: #EAF3FC;
    height: calc(100vh - 82px);
  }
  .right img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    border: 1px #9FB7CF solid;
  }
  .name {
    line-height: 28px;
  }
  .otdel {
    border-radius: 5px;
  }
  .menu {
    width: 100%;
  }
  .menu div {
    padding: 5px 10px;
    cursor: pointer;
  }
  .menu div.active, .menu div:hover {
    background: #9FB7CF;
    color: #fff;
  }
</style>
