<template>
  <div>
   <div id="container">
      <h1 class="title">Trimiteti mesaj</h1>
      <textarea  type="text" placeholder="introduceti mesajul" id="message" v-model="message"></textarea>
      <div class="clearfix"></div>
      <button class="m-btn small-btn" @click="sendMessage">TRIMITE</button>
      <button class="m-btn small-btn" id="send-code-btn" @click="sendAccessCode">TRIMITEȚI CODUL DE ACCES</button>
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
      axios.post(`${environment.getApiUrl()}/mailgun/send_mail`, {tradeUnion: localStorage.tradeUnion, message: this.message});
      
      this.$vs.notification({
        progress: "auto",
        color: "success",
        position: "top-right",
        title: "Mesaj Trimis",
        text: `Mesajul a fost trimist cu succes!`,
      });
      this.message = "";
    },

    async sendAccessCode() {
      axios.post(`${environment.getApiUrl()}/mailgun/send_code`, {tradeUnion: localStorage.tradeUnion});
      this.$vs.notification({
        progress: "auto",
        color: "success",
        position: "top-right",
        title: "Coduri Trimise",
        text: `Codurile de acces au fost trimise cu succes!`,
      });
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
  height: 600px;
  margin-bottom: 50px;
}

button {
  margin-right: 50px;
}

#send-code-btn {
  background-color: var(--success);
}

#send-code-btn:hover {
  background-color: var(--successDark);
}

</style>