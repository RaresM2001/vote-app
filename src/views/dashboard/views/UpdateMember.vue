<template>
  <div id="centered">
    <h1 class="title">Updatati Membru</h1>
    
      <input type="text" placeholder="Nume si prenume" v-model="memberInfo.firstName"  />
      <input type="text" placeholder="CNP" v-model="memberInfo.CNP"  />
      <input type="text" placeholder="Adresa"  v-model="memberInfo.address" />
      <input type="email" placeholder="Email" v-model="memberInfo.email" />
      <input type="text" placeholder="Unitate"  v-model="memberInfo.DGRFP" />
      <input type="text" placeholder="Aata adeziunii" v-model="memberInfo.joinedIn" />

      <button type="submit" class="m-btn small-btn" @click="updateMemberData">salvati datele noi</button>
    
  </div>
</template>
<script>
import notifications from '../../../utils/notification';
import environment from '../../../utils/environment';

export default {
  data() {
    return {
      currentCNP: '',
      memberId: '',
      memberInfo: {
        firstName: "",
        CNP: "",
        adress: "",
        email: "",
        DGRFP: "",
        joinedIn: "",
        adminId: ""
      }
    };
  },

  async mounted() {
    await this.getMemberData();
  },

  methods: {
    async getMemberData() {
      let result = await axios.get(`${environment.getApiUrl()}/members/member/${this.$route.params.id}`);
      console.log(result)
      if(result.data.success) {
        this.memberInfo = result.data.member;
        this.currentCNP = result.data.member.CNP;
        this.memberId = result.data.member._id;
      } else notifications.notifyFail('Eroare', 'A intervenit o eraore. Va rugam incercati mai tarziu.', this.$vs);
    },

    async updateMemberData() {
      console.log('Updatinig the fucking member.')
      let result = await axios.post(`${environment.getApiUrl()}/members/${this.memberId}`, {currentCNP: this.currentCNP, updatedInfo: this.memberInfo});
      console.log(result);
    },

    clearInputs() {
        this.memberInfo = { firstName: "", lastName: "",
        CNP: "",
        adress: "",
        email: "",
        DGRFP: "",
        joinedIn: "",
      }
    },
  },
};
</script>
<style scoped>
#centered {
  width: 70%;
  margin-left: 10%;
}

input {
  width: 50%;
  margin-right: 50%;
  float: left;
}

.m-btn {
  margin-top: 30px;
}
</style>