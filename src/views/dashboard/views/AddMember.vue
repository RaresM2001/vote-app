<template>
  <div id="centered">
    <h1 class="title">Adaugati Membru</h1>
    <form action="">
      <input type="text" placeholder="prenume" v-model="memberInfo.firstName" required />
      <input type="text" placeholder="nume"  v-model="memberInfo.lastName" required/>
      <input type="text" placeholder="CNP" v-model="memberInfo.CNP" required />
      <input type="text" placeholder="adresa"  v-model="memberInfo.address" required/>
      <input type="email" placeholder="email" v-model="memberInfo.email" required/>
      <input type="text" placeholder="DGRFP"  v-model="memberInfo.DGRFP" required/>
      <input type="text" placeholder="data adeziunii" v-model="memberInfo.joinedIn" required/>

      <button type="submit" class="m-btn small-btn" @click="(event) => {addMember(event);}">adauga membru</button>
    </form>
  </div>
</template>
<script>
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
      },
      //   wrongInputs
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
      console.log("adding member");
      event.preventDefault();
      let result = await axios.post("http://localhost:8081/members", {
        ...this.memberInfo,
        adminId: localStorage.adminId,
      });
      if (result.data.success)
        this.$vs.notification({
          progress: "auto",
          color: "success",
          position: "top-right",
          title: "Membru Adaugat",
          text: `Membrul a fost adaugat cu success in baza de date!`,
        });
      else
        this.$vs.notification({
          progress: "auto",
          color: "danger",
          position: "top-right",
          title: "Erroare",
          text: `Verificat daca membrun nu exista deja in baza de date!`,
        });
        this.clearInputs();
    },
    
  },
};
</script>
<style scoped>
#centered {
  width: 70%;
  margin-left: 15%;
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