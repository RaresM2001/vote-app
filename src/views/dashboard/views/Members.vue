<template>
  <div id="container">
    <table class="rwd-table">
      <tbody id="firstTb">
        <tr>
          <th>Nr. Crt.</th>
          <th>Nume</th>
          <th>Email</th>
          <th>Unitate</th>
          <th>CNP</th>
          <th>Adresa</th>
          <th></th>
        </tr>
        <tr @click="$router.push('members/' + member._id)" :key="i" v-for="(member, i) in members">
          <td>
            {{member.nrCrt}}
          </td>
          <td>
            {{member.firstName}}
          </td>
          <td>
            {{member.email}}
          </td>
          <td >
            {{member.DGRFP}}
          </td>
          <td>
            {{member.CNP}}
          </td>
          <td>
            {{member.address}}
          </td>
          <td><button id="delete-btn" @click="() => {deleteMember(member._id)}">stergeti</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import environment from '../../../utils/environment';
export default {
  data: () => ({
   allCheck: false,
    selected: [],
    members: [
      {}
    ],
    showUpdatePopup: false
  }),
  async mounted() {
    await this.getMembers();
  },
  methods: {

    redirectToUpdatePage(id) {

    },

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
  width: 100%;
  padding: 0 50px;
  /* margin-left: 10%; */
}

#delete-btn {
  color: var(--danger);
  background-color: transparent;
  height: auto;
  width: auto;
}

#delete-btn:hover {
  color: var(--danger-dark);
}

.rwd-table {
  width: 100%;
  max-width: 100%;
   /* table-layout: auto; */
  border-collapse: collapse;
}

.rwd-table #firstTb tr:first-child {
  border-top: none;
  background: #f4f7f8;
  color: var(--customBlack);
}

.rwd-table tr {
  background-color: white;
  cursor: pointer;
}

.rwd-table tr:nth-child(odd):not(:first-child) {
  background-color: red;
}

.rwd-table th {
  display: none;
}

.fake-tr {
  width: 100%;
  height: 40px;
}

.rwd-table td {
  display: block;
}

.rwd-table td:first-child {
  margin-top: .5em;
}

.rwd-table td:last-child {
  margin-bottom: .5em;
}

.rwd-table td:before {
  content: attr(data-th) ": ";
  font-weight: bold;
  width: 120px;
  display: inline-block;
  color: #000;
}

.rwd-table th,
.rwd-table td {
  text-align: left;
}

.rwd-table {
  color: #333;
  border-radius: .4em;
  overflow: hidden;
}

.rwd-table tr {
  border-color: #bfbfbf;
}

.rwd-table th,
.rwd-table td {
  padding: .5em 1em;
}
@media screen and (max-width: 601px) {
  .rwd-table tr:nth-child(2) {
    border-top: none;
  }
}
@media screen and (min-width: 600px) {
  .rwd-table tr:hover:not(:first-child) {
    background-color: #d8e7f3;
  }
  .rwd-table td:before {
    display: none;
  }
  .rwd-table th,
  .rwd-table td {
    display: table-cell;
    padding: .25em .5em;
  }
  .rwd-table th:first-child,
  .rwd-table td:first-child {
    padding-left: 0;
  }
  .rwd-table th:last-child,
  .rwd-table td:last-child {
    padding-right: 0;
  }
  .rwd-table th,
  .rwd-table td {
    padding: 1em !important;
  }
}

h1 {
  text-align: center;
  font-size: 2.4em;
  color: #f2f2f2;
}
.container {
  display: block;
  text-align: center;
}
h3 {
  display: inline-block;
  position: relative;
  text-align: center;
  font-size: 1.5em;
  color: #cecece;
}
h3:before {
  content: "\25C0";
  position: absolute;
  left: -50px;
  -webkit-animation: leftRight 2s linear infinite;
  animation: leftRight 2s linear infinite;
}
h3:after {
  content: "\25b6";
  position: absolute;
  right: -50px;
  -webkit-animation: leftRight 2s linear infinite reverse;
  animation: leftRight 2s linear infinite reverse;
}
@-webkit-keyframes leftRight {
  0%    { -webkit-transform: translateX(0)}
  25%   { -webkit-transform: translateX(-10px)}
  75%   { -webkit-transform: translateX(10px)}
  100%  { -webkit-transform: translateX(0)}
}
@keyframes leftRight {
  0%    { transform: translateX(0)}
  25%   { transform: translateX(-10px)}
  75%   { transform: translateX(10px)}
  100%  { transform: translateX(0)}
}

</style>

