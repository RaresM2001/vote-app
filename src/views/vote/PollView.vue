<template>
  <div class="root">
    <h1 class="title text-centered small">Bine ati venit!</h1>
    <h1 class="title text-centered">{{ pollData.title }}</h1>
    <div id="content">
      <p class="text-centered">{{ pollData.question }}</p>
      <div v-if="!pollData.options.length">
        <button
          class="m-btn small-btn"
          @click="
            () => {
              placeVote(1);
            }
          "
        >
          DA
        </button>
        <button
          class="m-btn small-btn"
          @click="
            () => {
              placeVote(-1);
            }
          "
        >
          NU
        </button>
      </div>
      <div id="checkbox-container" v-else>
        <vs-checkbox
          class="m-checkbox"
          v-for="(option, index) in pollData.options"
          :key="option"
          @click="
            () => {
              chooseOption(index);
            }
          "
          >{{ option }}</vs-checkbox
        >
        <div class="clearfix"></div>
        <button class="m-btn small-btn small-btn-centerd" @click="placeOption">
          voteaza
        </button>
      </div>
      <span class="clearfix"></span>
    </div>
  </div>
</template>

<script>
import environment from '../../utils/environment';
const URL = require('../../utils/environment')
export default {
  data() {
    return {
      pollData: {
        options: [],
      },
      memberData: {},
      optionAnswer: -1,
    };
  },
  async mounted() {
    await this.getPollData();
    this.checkForFirsTime();
    this.checkForVote();
    this.checkIfStillOpen();
  },
  methods: {
    checkForFirsTime() {
      if (localStorage.getItem("votes") == undefined) {
        var votes = [];
        localStorage.setItem('votes', JSON.stringify(votes));
      }
    },

    checkForVote() {
      var votes = JSON.parse(localStorage.getItem('votes'));
      if(this.pollData.options.length == 0) {
        this.pollData.yesOrNoAnswers.forEach((data) => {
          if(data.email == localStorage.getItem("memberEmail")) return this.$router.push({name: 'already-voted'})
        })
      } else {
        this.pollData.optionAnswers.forEach((data) => {
          if(data.email == localStorage.getItem("memberEmail")) return this.$router.push({name: 'already-voted'})
        })
      }
    },

    checkIfStillOpen() {
      if(this.pollData.closed) this.$router.push({ name: "poll-closed" });
    },

    async getPollData() {
      let pollId = this.$route.params.id;

      let result = await axios.get(
        `${environment.getApiUrl()}/polls/poll/${pollId}`
      );
      if (result.data.success) this.pollData = result.data.poll;
      else
        alert(
          "Sesiunea de vot la care incercati sa participati nu exista sau a fost inchis."
        );
    },

    async placeVote(vote) {
      let votes = JSON.parse(localStorage.getItem('votes'));
      votes.push(this.$route.params.id);
      localStorage.setItem('votes', JSON.stringify(votes));
      let pollId = this.$route.params.id;
      if (!this.pollData.options.length) {
        let result = await axios.post(
          `${environment.getApiUrl()}/polls/vote/${pollId}/yesorno`,
          { vote, email: localStorage.getItem('memberEmail') }
        );
        if (result.data.success) this.$router.push({ name: "vote-placed" });
        else alert("Something went wrong");
      }
    },

    chooseOption(index) {
      this.optionAnswer = index;
    },

    async placeOption() {
      let votes = JSON.parse(localStorage.getItem('votes'));
      votes.push(this.$route.params.id);
      localStorage.setItem('votes', JSON.stringify(votes));
      let pollId = this.$route.params.id;
      let index = this.optionAnswer;

      let result = await axios.post(
        `${environment.getApiUrl()}/polls/vote/${pollId}/multiple`,
        { vote: index, email: localStorage.getItem("memberEmail") }
      );
      if (result.data.success) this.$router.push({ name: "vote-placed" });
      else alert("Something went wrong");
    },
  },
};
</script>

<style scoped>
.root {
  padding-top: 100px;
}
.small {
  font-size: 1.2em;
  color: lightgrey;
}

.title {
  margin-top: 0;
  margin-bottom: 0;
}

.title:nth-child(2) {
  margin-bottom: 50px;
}

#content {
  width: 100%;
  min-height: px;
  max-width: 700px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.m-btn:nth-child(2) {
  float: right;
  background-color: var(--danger);
}

.m-btn:nth-child(2):hover {
  background-color: var(--danger-dark);
}

#checkbox-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 50px;
}

#checkbox-container .m-checkbox {
  float: left;
  margin: 10px;
}

#checkbox-container .m-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 50px;
}

.clearfix {
  content: "";
  clear: both;
}

@media only screen and (max-width: 800px) {
  button {
    width: 97%;
    margin-bottom: 30px;
    margin-left: 1.5%;
    margin-right: 1.5%;
  }
}
</style>