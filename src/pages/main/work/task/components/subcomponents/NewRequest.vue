<template>
    <div>
        <div class="row no-wrap justify-between">
            <div class="col-7 column q-mr-xl">
                <div class="text-no-wrap q-mb-sm f16">Выберите шаблон заявки</div>
                <q-input label-color="grey-8" outlined borderless label="Шаблон заявки" class="q-mb-md bg-white">
                    <template v-slot:append side>
                        <q-icon name="search" class="cursor-pointer"/>
                    </template>
                </q-input>
                <div class="text-no-wrap q-mb-sm f16">Выберите подразделение</div>
                <div class="row">
                    <q-select outlined borderless v-model="model" :options="options" label="Подразделение" class="bg-white q-mb-sm full-width" />
                </div>
                <div class="text-no-wrap q-mb-sm f16">Описание заявки</div>
                <q-editor
                    dense
                    v-model="comment"
                    ref="editor_ref"
                    class="q-mb-sm bg-white"
                    min-height="8rem"
                    max-height="8rem"
                    @paste.native="evt => pasteCapture(evt)"
                />
                <div class="text-no-wrap q-mb-sm f20 text-weight-bolder text-dark q-mt-md">Дополнительные комментарии</div>
                <q-input label-color="grey-8" outlined borderless label="Оставьте комментарии" type="textarea" class="q-mb-lg textarea bg-white"/>
            </div>
            <div class="col column q-ml-lg">
                <div class="text-no-wrap f20 text-weight-bolder text-dark">Статус заявки:</div>
                <div class="row">
                    <q-select outlined borderless v-model="model" :options="options" label="На рассмотрение" class="bg-white q-mb-sm" style="min-width: 250px" />
                </div>
                <div class="text-no-wrap f20 text-weight-bolder text-dark">Срок выполнения:</div>
                <div class="row">
                    <q-input outlined v-model="sDate" label="Выберите срок" class="bg-white" style="min-width: 250px">
                            <q-popup-proxy ref="iDateProxy">
                                <q-date
                                    v-model="sDate"
                                    title="Выберите срок"
                                    subtitle="Срок выполнения"
                                    mask="YYYY-MM-DD"
                                    @input="() => $refs.iDateProxy.hide()"
                                />
                            </q-popup-proxy>
                            <template v-slot:prepend>
                                <q-icon name="date_range" color="red-7" />
                            </template>
                    </q-input>
                </div>

            </div>
        </div>
        <div class="row items-center justify-center q-pt-lg">
            <q-btn label="ОТПРАВИТЬ" class="text-white bg-blue-8 q-mr-md q-pa-xs" />
            <q-btn label="ОТМЕНА" class="text-dark bg-white q-pa-xs" v-close-popup  />
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      files: null,
      editor: '',
      comment: '',
      repeat: true,
      sDate: null,
      model: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      priority: null
    }
  },
  methods: {
    setPrior (n) {
      this.priority = n
    },
    pasteCapture (evt) {
      let text, onPasteStripFormattingIEPaste
      evt.preventDefault()
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData('text/plain')
        this.$refs.editor_ref.runCmd('insertText', text)
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData('text/plain')
        this.$refs.editor_ref.runCmd('insertText', text)
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true
          this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text)
        }
        onPasteStripFormattingIEPaste = false
      }
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
.f20 {
  font-size: 20px;
}
.f16 {
  font-size: 16px;
}
.f14 {
  font-size: 14px;
}
.f13 {
  font-size: 13px;
}
.textarea {
    min-height: 4rem;
    max-height: 8rem;
}
.bordered {
    border: .5px solid grey;
}
.activeb {
    border: .5px solid transparent;
    background-color: #1976d2;
    color: white;
}
</style>
