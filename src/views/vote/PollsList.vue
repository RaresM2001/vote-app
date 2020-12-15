<template>
  <div>
    <h1 class="title text-centered">Lista Voturi</h1>
    <div id="container">
      <router-link tag="div" :to="`/polls/${poll._id}`" class="poll-card-container" v-for="poll in polls" :key="poll._id">
        <div class="poll-card light-shadow">
          <h1 class="title">{{poll.title}}</h1>
          <p class="date">{{poll.date}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      polls: [],
    }
  },
  async mounted() {
    await this.getPolls();
  },
  methods: {
    async getPolls() {
      let result = await axios.get(`http://localhost:8081/polls`);
      if(result.data.success) this.polls = result.data.polls;
      console.log(this.polls);
    }
  }
};
</script>
<style scoped>
.title {
  margin-top: 100px;
  margin-bottom: 100px;
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
  color: var(--primary)
}

.date {
  color: lightgrey;
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
}
 </style>