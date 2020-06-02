<template>
  <q-drawer
    show-if-above
    :mini="isLeftDrawerClosed"
    bordered
    content-class="bg-grey-2 drawOver"
    :width="250"
    
  >
    <q-list>
      <q-item-label header>{{ $t("layout.menu_label") }}</q-item-label>
      <div
        v-for="(menus, index) in menusList"
        :key="index"
         class="menuLabel"          
      >
      

                <q-list v-if="getChildMenus(menus).length !== 0" class="menuItem subPopup" :id="menus.menu_id">
                    <q-item
                      v-for="(menuss, index) in getChildMenus(menus)"
                      :key="index"
                      clickable
                      :to="menuss.url"
                      
                      active-class="text-orange"
                      v-ripple
                    >
                      <q-item-section>{{ menuss.name }}</q-item-section>
                    </q-item>
                  </q-list>
                
                  
                

        <q-expansion-item
          expand-separator
          :icon="menus.icon"
          :label="menus.name"
          :caption="$t('layout.menu_caption')"
          @show = eventShow(menus.menu_id)
          @hide = eventHide(menus.menu_id)
          group="somegroup"
          :to="menus.url"
          exact-active-class="icon-style"
          :class="'id-'+menus.menu_id"
        >
                  


          <div
            v-for="(menuss, index) in menus.children"
            :key="index"
            style="background-color:#D6DBDF;"
          >
            <q-item clickable :to="menuss.url">
              <q-item-section avatar>
                <q-icon :name="menuss.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ menuss.name }}</q-item-label>
                <q-item-label caption>
                  {{
                  $t("layout.menu_caption")
                  }}
                </q-item-label>               

              </q-item-section>
            </q-item>
          </div>

          
        </q-expansion-item>
        
      </div>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[-15, 55]">
      <q-btn
        fab
        color="blue"
        style="width: 30px; height: 30px;"
        @click="isLeftDrawerClosed = !isLeftDrawerClosed"
      >
        <q-icon
          :name="isLeftDrawerClosed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'"
          class="absolute-center"
        />
      </q-btn>
    </q-page-sticky>
  </q-drawer>
</template>

<script>
export default {
  name: "Leftbar",
  computed: {
    //menu: this.$store.getters["dicts/getMenuList"],
    isLeftDrawerClosed: {
      get() {
        return this.$store.getters["common/isLeftDrawerClosed"];
      },
      set(val) {
        this.$store.dispatch("common/setLeftDrawerClosed", val);
      }
    },
    menusList() {
      return this.$store.getters["dicts/getMenuList"];
    }
  },
  created() {
    
  },
  data() {
    return {
      isExpansionOpen: [],
      show: null
    };
  },
  
  methods: {    
    eventShow(id){
      const popup = document.getElementById(id)
      if(popup) {
        popup.setAttribute("style", "display:none;");
        this.show = id
      }
    },
    eventHide(id) {
      const popup = document.getElementById(id)
      if(popup) {
        popup.removeAttribute("style")      
        this.show = null
      }
    },
    mOver (id) {
      console.log('mOver ',id)
    },
    mLeave (id) {
      console.log('mLeave ',id)
    },
    getChildMenus(menus) {
      let myMenuList = [];

      if (this.isLeftDrawerClosed) {
        myMenuList.push(menus);
        if (menus.children) {
          menus.children.forEach(element => {
            myMenuList.push(element);
          });
        }
      } else {
        if (menus.children) {
          menus.children.forEach(element => {
            myMenuList.push(element);
          });
        }
      }
      return myMenuList;
    },
    openExtention(index) {     
      this.$refs.qmenu[index].hide();
    },
    closeExtention(index) {
      this.$refs.qmenu[index].show();
    },
  },
  watch: {
    isLeftDrawerClosed() {
        if(this.isLeftDrawerClosed) {
          const popup = document.getElementsByClassName('menuItem')          
          for (var i = 0; i < popup.length; i++) {
            popup[i].removeAttribute("style")            
          }         
        }
        if(this.show){
          const popup = document.getElementById(this.show)
          popup.setAttribute("style", "display:none;");
        }
    }
  }
};
</script>

<style>
.button1 {
  position: fixed;
  background-color: red;
}
.menuLabel {
  position: relative;
}
.menuLabel .menuItem {
  display: none;
  position: absolute;
  right: -150px;
  top: 0;
  width: 150px;
  background: #fff;
  z-index: 10000;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.menuLabel:hover .menuItem {
  display: block;
}
.drawOver {
  overflow: visible;
}

.menuItem .q-item__section--main {
  display: block !important;
  text-align: left  !important;
  padding-left: 10px !important;
  align-self: center;
  }
.q-item__section {
  position: relative;
}

.q-item__label {text-align: left;}
</style>
