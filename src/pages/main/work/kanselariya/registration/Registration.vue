<template>
  <div class="row justify-center q-col-gutter-sm regKanc q-pa-md">
    <div class="col-10">
      <div class="row">
        <div class="col-8">
          <q-form  @submit="sendNewDoc" @reset="resetForm" ref="myform">
          <div class="row">
            <div class="col-12 q-pa-sm">

              
                <q-file 
                    color="teal" 
                    filled 
                    v-model="file" 
                    label="Выберите файл" 
                    @input="uploadFile"
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" />
                  </template>
                  <template v-slot:append>
                  <q-btn round dense flat icon="close" @click.stop="file = []" class="cursor-pointer" />
                </template>
                </q-file>
              

            </div>
          </div>

          <div class="row">

            <div class="col-6 q-pa-sm">

              <q-select 
                  v-model="form.journal"
                  :options="select.journals" 
                  option-value="id"
                  option-label="name_short"
                  label="Журнал" 
                  filled 
                  bottom-slots 
                  square
                  emit-value
                  map-options
                  lazy-rules
                  :rules="[
                    val => (val && val.length !== null) || 'Пожалуста выберите журнал'
                  ]"
                >
                <template v-slot:prepend>
                  <q-icon name="menu_book" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="close" @click.stop="form.journal = null" class="cursor-pointer" />
                </template>
              </q-select>

            </div>

            <div class="col-6 q-pa-sm">

              <q-select 
                  v-model="form.region" 
                  :options="select.regions" 
                  option-value="id"
                  option-label="name_short"
                  label="Регионы"
                  filled 
                  bottom-slots 
                  emit-value
                  map-options                  
                >
                <template v-slot:prepend>
                  <q-icon name="public" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="close" @click.stop="form.region = null" class="cursor-pointer" />
                </template>
              </q-select>

            </div>
            
          </div>

          <div class="row">

            <div class="col-6 q-pr-sm q-pa-sm">
              <q-input disable outlined v-model="form.in_number" label="Вх. Номер" />
            </div>

            <div class="col-6 q-pl-sm q-pa-sm">
              <q-input outlined v-model="form.in_date" placeholder="Вх. Дата">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy1" transition-show="scale" transition-hide="scale">
                      <q-date 
                          mask="YYYY-MM-DD" 
                          v-model="form.in_date" 
                          @input="() => $refs.qDateProxy1.hide()" 
                          today-btn
                        />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

          </div>

          <div class="row">

            <div class="col-6 q-pr-sm q-pa-sm">
               <q-select 
                  v-model="form.organs" 
                  :options="select.organs" 
                  option-value="id"
                  option-label="name_short"
                  label="Выбрать организацию" 
                  filled 
                  bottom-slots
                  emit-value
                  map-options  
                  :rules="[
                    val =>
                      (val && val.length !== null) || 'Укажите пожалуста организацию'
                  ]"                    
                >
                <template v-slot:prepend>
                  <q-icon name="list" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="close" @click.stop="form.organs = null" class="cursor-pointer" />
                </template>
              </q-select>
            </div>

            <div class="col-6 q-pl-sm q-pa-sm">
              <q-input outlined v-model="form.whoIsText" label="Написать откуда" />
            </div>

          </div>

          <div class="row">

            <div class="col-6 q-pr-sm q-pa-sm checkInput">
               <div class="checkBlock">
                 <q-checkbox v-model="form.number" />
               </div>
               <div style="width:100%">
                 <q-input
                    :disable="form.number"
                    outlined  
                    square 
                    v-model="form.out_number" 
                    :placeholder="[form.number ? 'Без номер' : 'Исх. Номер']"
                  />
               </div>
            </div>

            <div class="col-6 q-pl-sm q-pa-sm checkInput">
               <div class="checkBlock">
                 <q-checkbox v-model="form.date" />
               </div>
               <div style="width:100%" >
                 <q-input 
                    :disable="form.date"
                    outlined 
                    square 
                    v-model="form.out_date"
                   
                    :placeholder="[form.date ? 'Без даты' : 'Исх. Дата']"
                    
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date  
                              mask="YYYY-MM-DD"  
                              v-model="form.out_date" 
                              @input="() => $refs.qDateProxy.hide()" 
                              today-btn
                            />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
               </div>
            </div>

          </div>

          <div class="row">

            <div class="col-6 q-pr-sm q-pa-sm">
               <q-select 
                  v-model="form.format" 
                  :options="select.formats"   
                  option-value="id"
                  option-label="name_short"                
                  filled 
                  bottom-slots 
                  emit-value
                  map-options
                  label="Формат" 
                >
                  <template v-slot:prepend>
                    <q-icon name="dashboard" @click.stop />
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" @click.stop="form.format = null" class="cursor-pointer" />
                  </template>
                </q-select>
            </div>

            <div class="col-6 q-pl-sm q-pa-sm">
               <q-input 
                  v-model="form.listCount"
                  label="Кол. лист"
                  outlined
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length !== null) || 'Пожалуста укажите кол. листов'
                  ]"                
                />
            </div>

          </div>

          <div class="row">
            <div class="col q-pa-sm">
              <q-input
                v-model="form.description"
                outlined
                type="textarea"
                label="Содержание"
                lazy-rules
                :rules="[
                  val => (val && val.length >= 10) || 'Пожалуста укажите содержание'
                ]"
              />
            </div>
          </div>

          <div class="row">
            <div class="col q-pa-sm">
              <q-input outlined v-model="form.signedby" label="Кто подписаль" />
            </div>
          </div>

          

          <div class="row">
            <div class="col text-center q-pa-sm">
              <q-btn color="white" text-color="black" label="Сбросит" type="reset" class="q-mr-sm" />
              <q-btn color="primary" label="Сохранить" type="submit"/>
            </div>
          </div>

          </q-form>
        </div>      

        <div class="col-4 q-pa-sm">
          <div class="rightBlock q-pa-md text-center" @click="newFile()">
            <img src="@/assets/file.png" alt=""><br>
            просмотреть файл
          </div>
          <div><br>
            <span>ФАЙЛ === {{ file.name }}</span><br>
            <span>ЖУРНАЛ === {{ form.journal }}</span><br>
            <span>РЕГИОН === {{ form.region }}</span><br>
            <span>ВХ НОМЕР === {{ form.in_number }}</span><br>
            <span>ВХ ДАТА === {{ form.in_date }}</span><br>
            <span>ОРГАН === {{ form.organs }}</span><br>
            <span>КТО ОТПРАВИЛ === {{ form.whoIsText }}</span><br>
            <span>ИСХ НОМЕР === {{ form.out_number }}</span><br>
            <span>ИСХ ДАТА === {{ form.out_date }}</span><br>
            <span>ФОРМАТ === {{ form.format }}</span><br>
            <span>КОЛ ЛИСТ === {{ form.listCount }}</span><br>
            <span>СОДЕРЖАНИЕ === {{ form.description }}</span><br>
            <span>КТО ПОДПИСАЛ === {{ form.signedby }}</span><br>
          </div>            
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/api.service";
import { QSpinnerFacebook } from 'quasar'
export default {
data(){
  return{
    file:[],
    form: {
        journal: null,
        region: null,
        in_number: null,
        number: false,
        in_date: null,
        date: false,
        organs: null,
        whoIsText: null,
        out_number: null,
        out_date: null,
        format: null,
        listCount: null,
        description: null,
        signedby: null
      },
    
    select:{
      formats: null,
      journals: null,
      regions: null,
      organs: null
    }
  }
},
methods:{
  uploadFile(val) {
      console.log(val)
      this.file = val;
      this.form.in_number = val.name.slice(0, -4);
      console.log(this.form.in_number)

    },
  
  sendNewDoc() {

      this.$q.loading.show({
        spinner: QSpinnerFacebook
      })

      let formData = new FormData();
      formData.append("journal", this.form.journal);
      formData.append("region", this.form.region);
      formData.append("in_number", this.form.in_number);
      formData.append("in_date", this.form.in_date);
      formData.append("organ", this.form.organs);
      formData.append("fio", this.form.whoIsText);
      formData.append("out_number", this.form.out_number);
      formData.append("out_date", this.form.out_date);
      formData.append("format", this.form.format);
      formData.append("paper_count", this.form.listCount);
      formData.append("description", this.form.description);
      formData.append("signed_by", this.form.signedby);
      formData.append("doc", this.file);

      console.log(formData);


      
      ApiService.post("/files/addDoc", formData)
        .then(
          response => {
            console.log(response);
            if (response.data.status === 1) {
              this.$q.notify({
                color: "green-8",
                textColor: "white",
                icon: "cloud_done",
                position: "top",
                message: "Ваш документ успешно сохранен"
              });
              this.$refs.myform.reset();
            } else {
              this.$q.notify({
                color: "red-4",
                textColor: "white",
                icon: "cloud_done",
                message: response.data.message
              });
            }
            this.$q.loading.hide()
          }
        )
        .catch(error => {
          this.$q.notify({
            color: "red-4",
            textColor: "white",
            icon: "cloud_done",
            message: error
          });
          this.$q.loading.hide()
        });
    },

    resetForm() {
      (this.file = []),
      (this.form.journal = null),
        (this.form.region = null),
        (this.form.in_number = null),
        (this.form.in_date = null),
        (this.form.organs = null),
        (this.form.whoIsText = null),
        (this.form.out_number = null),
        (this.form.out_date = null),
        (this.form.format = null),
        (this.form.listCount = null),
        (this.form.description = null),
        (this.form.signedby = null)
    },

    notifyRules(val){
      this.$q.notify({
        color: "red-4",
        textColor: "white",
        icon: "cloud_done",
        message: val
      });
    },
    newFile(){
      let blob = new Blob([this.file], { type: "application/pdf" });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = this.form.in_number;
      link.click();
    }
},
watch: {
    file: function() {
      //this.form.in_number = this.file.name.slice(0, -4);
      var now = new Date();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      this.form.in_date = now.getFullYear() + "-" + month + "-" + day;
    }
  },
beforeCreate: function(){
  ApiService.get("dicts/formats")
  .then(res =>{
    this.select.formats = res.data
  })
  .catch(err =>{
    console.log(err)
  })

  ApiService.get("dicts/journals")
  .then(res =>{
    this.select.journals = res.data
  })
  .catch(err =>{
    console.log(err)
  })

  ApiService.get("dicts/regions")
  .then(res =>{
    this.select.regions = res.data
  })
  .catch(err =>{
    console.log(err)
  })

  ApiService.get("dicts/organs")
  .then(res =>{
    this.select.organs = res.data
  })
  .catch(err =>{
    console.log(err)
  })
}
}
</script>
<style lang="scss" scoped>
.my-content {
  padding: 10px 15px;
  background: rgba(86,61,124,.15);
  border: 1px solid rgba(86,61,124,.2);
  }
.checkInput {
  display: flex;
  align-items: center;
}
.checkBlock {
  padding: 7px;
  background: #F2F2F2;
  border: 1px #C2C2C2 solid;
}
.rightBlock {
  background: #F2F2F2;
  cursor: pointer;
}
</style>

<style lang="stylus">
.regKanc .q-field--with-bottom {padding-bottom:0 }
</style>
