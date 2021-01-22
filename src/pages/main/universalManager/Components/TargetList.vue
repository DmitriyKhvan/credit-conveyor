<template>
    <q-dialog :content-class="'targetListBlock'" persistent ref="alertMessage" @hide="onDialogHide">
      <q-card class="q-dialog-plugin">
        <div class="headerList">
          <p class="titleList">Список целей</p>
          <q-btn
            flat
            round
            icon="close"
            class="listCloseBtn"
            @click="onOKClick"
          />
        </div>

        <div class="bodyList">
          <div class="newTargetArea">
            <q-input
              outlined
              v-model="text"
              type="textarea"
            />
          </div>
          <div class="btnBlock">
            <q-btn
              unelevated
              label="Добавить новую цель"
              class="setTarget"
              @click="setTarget"
            />
          </div>

          <div class="targetList">
            <div class="q-gutter-sm">
              <q-checkbox v-model="right" label="Покупка машины" />
              <q-btn
                flat
                round
                icon="close"
                class="targetRemove"
                @click="targetRemove"
              >
                <q-tooltip>Удалить</q-tooltip>
              </q-btn>
            </div>

            <div class="q-gutter-sm">
              <q-checkbox v-model="right2" label="Покупка квартиры" />
              <q-btn
                flat
                round
                icon="close"
                class="targetRemove"
                @click="targetRemove"
              >
                <q-tooltip>Удалить</q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>

        <q-card-actions class="btnBlockTargetList" align="left">
          <q-btn unelevated class="blueBtn" label="Сохранить" @click="onOKClick" />
          <q-btn unelevated class="redBtn" label="Закрыть" @click="onCancelClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import MessagePopup from "./MessagePopup";

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      right: false,
      right2: true
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.alertMessage.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.alertMessage.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    async onOKClick() {
      try {
      } catch (error) {
        this.$q.dialog({
          component: MessagePopup,
          parent: this,
          data: {
            message: error.message,
            code: error.code
          }
          // persistent: true
        });
      }

      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit("ok");
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    },

    setTarget() {
      return
    },

    targetRemove() {
      return
    }
  }
};
</script>

<style lang="scss">
.targetListBlock {
  .headerList {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px 20px 30px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);

    .titleList {
      font-weight: 600;
      font-size: 24px;
    }
  }

  .bodyList {
    padding: 50px 50px 40px 50px;

    .newTargetArea {
      margin-bottom: 20px;
    }

    .targetList {
      margin: 20px 0 0 -10px;
      font-size: 20px;

      & > div {
        display: flex;
        justify-content: space-between;
      }

      .q-btn .q-icon {
        font-size: 15px;
      } 
    }
  }

  .listCloseBtn {
    color: #A0A5BA;
  }

  .q-dialog-plugin{
    width: 1020px;
  }

  .q-dialog__inner--minimized > div {
    max-width: 1020px;
  }

  .q-card__actions {
    padding: 30px; 
  }

  .btnBlockTargetList {
    box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.05);
  }

}
</style>
