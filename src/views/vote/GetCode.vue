<template>
  <div>
    <div v-if="showCode">
      <h1 class="title" id="code" >Codul dumneavoastra este</h1>
      <h1 class="title" style="color: var(--primaryColor); text-align: center; margin: 0">{{code}}</h1><br>
      <p class="warning">ATENȚIE: Acest cod de acces este unica modalitatea de a exercita dreptul la vot. Va rugăm să nu impărtășiți sau distribuiți codul.</p>
      <button class="small-btn small-btn-centered" @click="$router.go(-1)">votează</button>
    </div>
    <div v-else id="form-container" class="absolute-center light-shadow">
      <h1 class="title text-centered">Obține Codul</h1>
      <input type="text" v-model="cnp" placeholder="introduceti CNP" />
      <button class="small-btn small-btn-centered" @click="getCode">află codul</button>
    </div>
  </div>
</template>
<script>
import environment from '../../utils/environment';
import notification from '../../utils/notification';
export default {
  data() {
    return {
      cnp: "",
      code: "",
      showCode: false
    };
  },
  methods: {
    async getCode() {
      let result = await axios.get(`${environment.getApiUrl()}/members/by_cnp/${this.cnp}`);
      if(result.data.success) {
        this.code = result.data.code;
        this.showCode = true;
      } else {
        notification.notifyFail('Cod Inexistent', 'Nu există nici un cod de acces pe acest nume. Vă rugam verificați campurile introduse.', this.$vs);
      }
    }
  }
};
</script>
<style scoped>

.warning {
  width: 500px;
  text-align: center;
  color: var(--danger);
  margin-left: calc(50% - 250px);
}

#code {
  text-align: center;
  margin-top: 150px;
  margin-bottom: 0;
}

#form-container {
  width: 400px;
  height: 400px;
  background-color: white;
  padding: 0 40px 0 40px;
}

#form-container .title {
  margin-top: 30px;
  margin-bottom: 40px;
}

#bottom-footer {
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  font-size: 0.9em;
  font-style: italic;
}

button {
  margin-top: 20px;
}

.danger-p {
  margin: 0;
  color: red;
  text-align: center;
  width: 100%;
}

input {
  width: 300px;
  margin-left: 10px;
  /* text-align: center; */
  padding: 0;
  padding-left: 15px;
  /* font-size: 1.5em; */
}
</style>