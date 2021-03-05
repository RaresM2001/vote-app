<template>
  <div class="root">
    <div v-if="codeEntered">
      <div class="absolute-center" v-if="polls.length == 0">
        <h1 class="title text-centered">Nu Exista Poll-uri</h1>
        <p class="subtitle">Momentan, nu exista poll-uri active .</p>
      </div>
      <div v-else>
        <h1 class="title text-centered">Lista Voturi</h1>
        <div id="container" >
          <router-link tag="div" :to="`/polls/${poll._id}`" class="poll-card-container" v-for="poll in polls" :key="poll._id">
            <div class="poll-card light-shadow">
              <h1 class="title">{{ poll.title }}</h1>
              <p class="date">{{ poll.date }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="full-width-root">
        <div id="form-container" class="absolute-center light-shadow">
          <h1 class="title text-centered">Introduceti Codul</h1>
          <input type="text" v-model="code" :class="{ dangerInput : credentialsError.password }" @focus="credentialsError.password = false">
          <p class="danger-p" v-if="credentialsError.password">Condul introdus este gresit!</p>
          <button class="small-btn small-btn-centered" @click="checkCode">mai departe</button>
        </div>
      </div>
      <p id="missing-code">Daca nu ati primit un <span>cod</span> pentru a accesa sesiunile de vot va rugam sa dati click  <router-link tag="a" to="">aici</router-link>.</p>
    </div>
  </div>
</template>
<script>
import environment from "../../utils/environment";

export default {
  data() {
    return {
      polls: [],
      admins: [],
      selectedAdmin: false,
      selectedAdminId: '',
      codeEntered: false,
      code: '',
      memberInfo: null,
      credentialsError: {
        password: false
      }
    };
  },
  async mounted() {
    await this.getAdmins();
  },
  methods: {
    async getPollsByAdminId() {
      const loading = this.$vs.loading({
        background: '#5b3cc4',
        color: '#fff'
      });

      let result = await axios.get(`${environment.getApiUrl()}/polls/${this.selectedAdminId}`);
      if(result.data.success) {
        this.polls = result.data.polls;
        this.selectedAdmin = true;
      }

      loading.close();
    },

    async getAdmins() {
      const loading = this.$vs.loading({
        background: '#5b3cc4',
        color: '#fff'
      });

      let response = await axios.get(`${environment.getApiUrl()}/auth/admins/`);
      if(response.data.success) this.admins = response.data.admins;

      loading.close();
    },

    async checkCode() {

       const loading = this.$vs.loading({
        background: '#5b3cc4',
        color: '#fff'
      });

      let response = await axios.get(`${environment.getApiUrl()}/members/code/${this.code}`);
      
      loading.close();

      if(response.data.success) {
        this.codeEntered = true;
        localStorage.setItem("memberEmail", response.data.member.email);
        this.selectedAdminId = response.data.member.adminId;
      } else {
        this.credentialsError.password = true;
      }
    }
  }, 
};
</script>
<style scoped>
.title {
  margin-top: 100px;
  margin-bottom: 100px;
}

.absolute-center .title {
  margin-bottom: 20px;
}

#admin-select {
  width: 100%;
  height: 30px;
  background-color: var(--grey);
  border-radius: 5px;
}

#missing-code {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
}

#container {
  width: 95%;
  margin-left: 2.5%;
}

.poll-card-container {
  width: 25%;
  height: 150px;
  float: left;
  margin-bottom: 40px;
}

.poll-card {
  width: 90%;
  height: 100%;
  margin-left: 5%;

  border-radius: 15px;
  padding: 25px;
  cursor: pointer;
}

.poll-card .title {
  margin: 0;
  font-size: 1.5em;
  color: var(--primary);
}

.date {
  color: lightgrey;
}

.full-width-root {
  background-color: var(--grey);
  min-height: 100vh;
  overflow: hidden;
}


#form-container {
  width: 400px;
  height: 350px;
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
  font-size: .9em;
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
  text-align: center;
  padding: 0;
  font-size: 1.5em;
}

@media only screen and (max-width: 1400px) {
  .poll-card-container {
    width: 33.33%;
  }
}

@media only screen and (max-width: 1100px) {
  .poll-card-container {
    width: 50%;
  }
}

@media only screen and (max-width: 700px) {
  .poll-card-container {
    width: 100%;
  }

  #form-container, input {
    box-shadow: none;
    background-color: var(--grey);
    width: 100%;
  }

  #form-container {
    top: 25%;
  }

  button {
    width: 100%;
    margin: 0;
    margin-top: 50px;
    height: 80px;
  }
}
</style>