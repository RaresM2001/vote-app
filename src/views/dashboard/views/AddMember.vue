<template>
  <div id="centered">
    <h1 class="title">Adaugati Membru</h1>
    <form action="">
      <input type="text" placeholder="prenume" v-model="memberInfo.firstName"  />
      <input type="text" placeholder="nume"  v-model="memberInfo.lastName" />
      <input type="text" placeholder="CNP" v-model="memberInfo.CNP"  />
      <input type="text" placeholder="adresa"  v-model="memberInfo.address" />
      <input type="email" placeholder="email" v-model="memberInfo.email" />
      <input type="text" placeholder="DGRFP"  v-model="memberInfo.DGRFP" />
      <input type="text" placeholder="data adeziunii" v-model="memberInfo.joinedIn" />

      <button type="submit" class="m-btn small-btn" @click="(event) => {addMember(event);}">adauga membru</button>
    </form>
  </div>
</template>
<script>
import notifications from '../../../utils/notification';
import environment from '../../../utils/environment';

export default {
  data() {
    return {
      memberInfo: {
        firstName: "",
        lastName: "",
        CNP: "",
        adress: "",
        email: "",
        DGRFP: "",
        joinedIn: "",
        adminId: ""
      }
    };
  },
  methods: {
      clearInputs() {
        this.memberInfo = { firstName: "", lastName: "",
        CNP: "",
        adress: "",
        email: "",
        DGRFP: "",
        joinedIn: "",
      }
    },

    async addMember(event) {
      event.preventDefault();
      this.memberInfo.adminId = localStorage.adminId;
      let result = await axios.post(`${environment.getApiUrl()}/members`, {
        ...this.memberInfo,
      });
      if (result.data.success) {
        notifications.notifySuccess('Membru adaugat!', 'Membrul a fost adaugat cu succes in baza de date!', this.$vs);
        this.addMemberToMailingList(result.data.member);
      } else notifications.notifyFail('Eroare', 'Verificat daca membrun nu exista deja in baza de date!', this.$vs);
        
      this.clearInputs();
    },

    async addMemberToMailingList(member) {
      let result = await axios.post(`${environment.getApiUrl()}/mailgun/add_member/members`, {member: {...member},  tradeUnion: localStorage.tradeUnion.toLowerCase()});
      if(!result.data.success) notifications.notifyFail('Posibila problema!', 'Membrul adaugat nu a fost adaugat in mailing list!');
    }
    
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