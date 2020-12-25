<template>
  <q-dialog persistent ref="comment">
    <q-card class="q-ma-none q-pa-none" style="min-width: 600px; !important;">
      <q-card-section
        class="q-ma-none q-pa-none relative-position"
        v-if="regulaInfo.regulaType === 'docScan'"
      >
        <div>
          <img
            class="full-width"
            :src="'data:image/png;base64,' + regulaInfo.payload.docScan"
            alt=""
          />
        </div>
        <div class="q-pa-md row justify-between items-center absolute-top">
          <div class="text-weight-bold text-white text-body1">
            Скан паспорта
          </div>
          <q-btn flat round color="white" icon="clear" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section
        class="q-py-lg q-px-xl  relative-position"
        v-if="regulaInfo.regulaType === 'match'"
      >
        <div class="text-h6 text-weight-bold q-mb-xl">
          Сравнение фотографий
        </div>
        <div class="row justify-between q-mb-lg">
          <div style="flex: 0 1 48%; height: 300px;">
            <img
              :src="'data:image/png;base64,' + regulaInfo.payload.personPhoto"
              alt=""
              class="full-width full-height"
              style="object-fit: cover"
            />
          </div>
          <div style="flex: 0 1 48%; height: 300px;">
            <img
              :src="
                'data:image/png;base64,' + regulaInfo.payload.livePersonPhoto
              "
              alt=""
              class="full-width full-height"
              style="object-fit: cover"
            />
          </div>
        </div>
        <div class="text-body1 text-weight-bold text-blue-grey-5 q-mb-xl">
          Совпадение человека на фотографии состовляет
          <span :style="`color: ${regulaInfo.payload.matchPercent >= 75 ? '#47B881' : '#910E02'}`"
            >{{ regulaInfo.payload.matchPercent }}%</span
          >
        </div>
        <div class="row justify-center">
          <q-btn
            style="background: #47B881;"
            text-color="white"
            class="q-px-lg q-py-xs"
            label="Подтвердить"
            v-close-popup
          />
        </div>
      </q-card-section>

<!--      <q-card-section-->
<!--        class="q-ma-none q-pa-none relative-position"-->
<!--        v-if="regulaInfo.regulaType === 'liveVideo'"-->
<!--      >-->
<!--        <div>-->
<!--          <div style="width: 100%; height: 400px !important;" class="bg-white">-->
<!--            <video-->
<!--              controls-->
<!--              src=""-->
<!--              width="100%"-->
<!--              height="100%"-->
<!--            ></video>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="q-pa-md row justify-between items-center absolute-top">-->
<!--          <div-->
<!--            class="row justify-between items-center text-weight-bold text-blue-grey-5 text-body1"-->
<!--          >-->
<!--            <q-icon-->
<!--              name="fiber_manual_record"-->
<!--              style="color: #47B881; font-size: 13px"-->
<!--              class="q-mr-xs"-->
<!--            />-->
<!--            Лайв видео-->
<!--          </div>-->
<!--          <q-btn color="red-7" text-color="white" class="q-px-md" v-close-popup>-->
<!--            <span style="font-size: 14px">Закрыть</span>-->
<!--          </q-btn>-->
<!--        </div>-->
<!--      </q-card-section>-->
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'RegulaInfoPopup',
  props: {
    regulaInfo: {
      type: Object
    }
  },
  data () {
    return {}
  },
  mounted () {
    // console.log(this.regulaInfo);
  },
  methods: {
    show () {
      this.$refs.comment.show()
    },
    hide () {
      this.$refs.comment.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },

    onOKClick () {
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },
    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>

<style scoped></style>
