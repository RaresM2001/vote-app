<template>
      <div id="container">
    <vs-table v-model="selected">
      <template #thead>
        <vs-tr>
          <vs-th>
            <vs-checkbox
              :indeterminate="selected.length == members.length"
              v-model="allCheck"
              @change="selected = $vs.checkAll(selected, members)"
            />
          </vs-th>
          <vs-th> Prenume </vs-th>
          <vs-th> Nume </vs-th>
          <vs-th> Email </vs-th>
          <vs-th> DGRFP </vs-th>
          <vs-th> CNP </vs-th>
          <vs-th> Adresa </vs-th>
          <vs-th></vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(member, i) in members"
          :data="member"
          :is-selected="!!selected.includes(member)"
        >
          <vs-td checkbox>
            <vs-checkbox :val="member" v-model="selected" />
          </vs-td>
          <vs-td>
            {{ member.firstName }}
          </vs-td>
          <vs-td>
            {{ member.lastName }}
          </vs-td>
          <vs-td>
             {{ member.email }}
          </vs-td>
          <vs-td>
            {{ member.DGRFP }}
          </vs-td>
          <vs-td>
            {{ member.CNP }}
          </vs-td>
           <vs-td>
            {{ member.address }}
          </vs-td>
           <vs-td>
           <button id="delete-btn" @click="() => {deleteMember(member._id)}">stergeti</button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>
<script>
import Vue from 'vue';
import environment from '../../../utils/environment';
export default {

  data: () => ({
   allCheck: false,
    selected: [],
    members: [
      {}
],
  }),
  async mounted() {
    await this.getMembers();
  },
  methods: {

    async getMembers() {
      const loading = this.$vs.loading({background: '#5b3cc4', color: '#fff'});
      this.members = [];
      let id = localStorage.adminId;
      let result = await axios.get(`${environment.getApiUrl()}/members/${id}`);
      for(let i = 0; i < result.data.members.length; i++) {
       this.members.push(result.data.members[i]);
      }
      loading.close();
    },

    async deleteMember(id) {
      
      let result = await axios.delete(`${environment.getApiUrl()}/members/${id}`);
       if (result.data.success) {
          this.$vs.notification({
          progress: "auto",
          color: "success",
          position: "top-right",
          title: "Membru Sters",
          text: `Membrul a fost sters cu success din baza de date!`,
        });
      }
      else
        this.$vs.notification({
          progress: "auto",
          color: "danger",
          position: "top-right",
          title: "Eroare",
          text: `Stergerea membrului a esuat. Incercati mai tarziu.`,
        });

       this.getMembers();
    }
  }
};
</script>
<style scoped>
#container {
  width: 80%;
  margin-left: 10%;
}

#delete-btn {
  background-color: var(--danger);
  height: 40px;
  width: 80px;
  border-radius: 20px;
  font-size: .9em;
}

#delete-btn:hover {
  background-color: var(--danger-dark);
}
</style>

