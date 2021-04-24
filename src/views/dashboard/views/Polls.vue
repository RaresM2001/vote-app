<template>
  <div id="content">
    <vs-table striped>
      <template #thead>
        <vs-tr>
          <vs-th> Titlu </vs-th>
          <vs-th> Data </vs-th>
          <vs-th> Status </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(poll, i) in polls" :data="poll">
          <vs-td>
            {{ poll.title }}
          </vs-td>
          <vs-td>
            {{ poll.date }}
          </vs-td>
          <vs-td>
            <p v-if="poll.closed" class="danger-color">Închisă</p>
            <p v-else class="success-color">Deschis</p>
          </vs-td>
          <template #expand>
            <bar-chart v-if="poll.options.length > 0" :pollData="poll"></bar-chart>
            <donut-chart v-else :pollData="poll"></donut-chart>
            <button class="m-btn rounded-btn" id="delete" @click="() => {closePoll(poll._id)}">închide</button>
          </template>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>
<script>
import DonutChart from '../../../components/charts/Donut'
import BarChart from '../../../components/charts/BarChart'
import environment from '../../../utils/environment';

export default {
  components: {
    DonutChart,
    BarChart
  },
  data() {
    return {
      allCheck: false,
      polls: [
        {options: []}
      ],
    };
  },

  async mounted() {
    await this.getPolls();
  },

  methods: {
    async closePoll(id) {
      let result = await axios.post(`${environment.getApiUrl()}/polls/update/${id}`);
      if(result.data.success) {
        this.$vs.notification({ 
          color: 'success', 
          position: 'top-right', 
          title: 'Sesiune Vot Inchisă', 
          text: 'Sesiunea de vot a fost inchisă cu succes!'
        })
      }
      this.getPolls();
    },
    async getPolls() {
      const loading = this.$vs.loading({
        background: "#5b3cc4",
        color: "#fff",
      });

      let adminId = localStorage.adminId;
      let result = await axios.get(`${environment.getApiUrl()}/polls/${adminId}`);
      this.polls = [];
      if (result.data.success) {
        for (let i = 0; i < result.data.polls.length; i++) {
          this.polls.push(result.data.polls[i]);
        }
      }
      loading.close();
    }
    
  },
};
</script>
<style scoped>
#content {
  width: 80%;
  margin-left: 10%;
}
#delete {
  background-color: var(--danger);
  position: absolute;
  right: 40px;
  top: 60px;
}
#delete:hover {
  background-color: var(--danger-dark);
}

.danger-color {
  color: var(--danger);
}

.success-color {
  color: var(--success);
}

p {
  margin: 0;
}
</style>