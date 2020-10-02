<template>
    <div>
        <div class="row no-wrap justify-between">
            <div class="col-7 column q-mr-xl">
                <div class="text-no-wrap q-mb-sm f16">Текст и описание задачи:</div>
                <q-input label-color="grey-8" outlined borderless label="Текст задачи" class="q-mb-md bg-white" />
                <q-editor
                    dense
                    v-model="comment"
                    ref="editor_ref"
                    class="q-mb-sm bg-white"
                    min-height="5rem"
                    max-height="8rem"
                    @paste.native="evt => pasteCapture(evt)"
                />
                <div class="text-no-wrap q-mb-sm f16">Выберите получателя:</div>
                <q-input label-color="grey-8" outlined borderless label="Кому отправить задачу" class="q-mb-md bg-white">
                    <template v-slot:append side>
                        <q-icon name="search" class="cursor-pointer"/>
                    </template>
                </q-input>
                <div class="text-no-wrap q-mb-sm f20 text-weight-bolder text-dark">Дополнительные комментарии</div>
                <q-input label-color="grey-8" outlined borderless label="Оставьте комментарии" type="textarea" class="q-mb-lg textarea bg-white"/>
                <div class="row no-wrap items-center q-mb-xl">
                    <q-checkbox v-model="repeat" />
                    <div class="text-no-wrap f16 text-weight-bolder text-dark">Повторить задачу для другого сотрудника?</div>
                </div>
            </div>
            <div class="col column q-ml-lg">
                <div class="text-no-wrap f20 text-weight-bolder text-dark">Статус задачи:</div>
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
                <div class="text-no-wrap q-my-sm f20 text-weight-bolder text-dark">Важность задачи:</div>
                <div class="row no-wrap">
                    <div class="q-px-md q-py-sm q-mr-md f13 rounded-borders cursor-pointer bordered text-no-wrap" :class="priority === 1 ? 'activeb' : ''" @click="setPrior(1)">Срочная</div>
                    <div class="q-px-md q-py-sm q-mr-md f13 rounded-borders cursor-pointer bordered text-no-wrap" :class="priority === 2 ? 'activeb' : ''" @click="setPrior(2)">Важная</div>
                    <div class="q-px-md q-py-sm q-mr-md f13 rounded-borders cursor-pointer bordered text-no-wrap" :class="priority === 3 ? 'activeb' : ''" @click="setPrior(3)">Не срочная</div>
                </div>
                <div class="row no-wrap items-center q-mb-md q-mt-lg" >
                    <q-icon name="attach_file" color="grey-8" size="25px" />
                    <div class="text-no-wrap q-my-sm f20 text-weight-bolder text-dark">Прикрепленные файлы (3)</div>
                </div>
                <div class="row items-center bg-primary rounded-borders" style="max-width: 150px; max-height: 45px">
                    <div style="position: absolute; margin-left: 30px" tabindex="0" class="text-white text-body1">Загрузить</div>
                    <q-file
                        v-model="files"
                        label-color="white"
                        dense
                        borderless
                        multiple
                        tabindex="1"
                        class="text-center text-white"
                        display-value
                        :filter="
                        files => files.filter(file => {if(!!file){return file.type === 'application/pdf'} else return false})
                        "
                        :rules="[
                        val => (val && val.length !== null)
                        ]"
                        />
                </div>
                <q-list class="row text-grey q-mt-md" style="max-width: 350px">
                    <q-item class="rounded-borders items-center bg-white q-mb-xs" style="border: 1px solid #e7e7e7;" dense  v-for="i in 3" :key="i">
                        <q-icon name="description" size="25px" class="q-mr-md" />
                        <q-item-section
                            class="text-no-wrap overflow-hidden"
                            style="width: 150px; overflow:hidden; text-no-wrap overflow-hidden"
                        >{{ "awdwhformat" }}</q-item-section>
                        <q-btn flat color="grey" icon="get_app" side />
                        <q-btn flat color="grey" icon="cancel" side />
                    </q-item>
                </q-list>
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
      repeat: false,
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
