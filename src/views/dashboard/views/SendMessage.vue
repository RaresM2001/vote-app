<template>
  <div>
   <div id="container">
      <h1 class="title">Trimiteti mesaj</h1>
      <textarea  type="text"
          placeholder="introduceti mesajul" id="message" v-model="message"></textarea>
      <button class="m-btn small-btn" @click="sendMessage">TRIMITE</button>
   </div>
  </div>
</template>
<script>
import environment from '../../../utils/environment';
export default {
  data() {
    return {
      message: ""
    }
  },
  methods: {
    async sendMessage() {
       let result = await axios.post(`${environment.getApiUrl()}/mailgun/send_mail`, {tradeUnion: localStorage.tradeUnion, message: this.message});
    }
  }
}
</script>
<style scoped>
#container {
  padding-left: 100px;
  height: 900px;
  position: relative;
}

textarea {
  margin: 0;
}

#message {
  width: 70%;
  height: 800px;
}

button {
  margin-top: 100px;
  position: absolute;
  bottom: -100px;
  left: 100px;
}
</style>