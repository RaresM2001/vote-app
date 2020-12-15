<template>
  <div class="root">
    <div id="left">
      <h1 class="title">Informatii Poll</h1>
      <input type="text" placeholder="titlu" v-model="pollInfo.title" />
      <div id="checkbox-container">
        <vs-checkbox
          v-model="pollInfo.yesOrNo"
          class="m-checkbox"
          @click="pollInfo.isGeneralQuestion = false"
        >
          Da & Nu
        </vs-checkbox>
        <vs-checkbox
          v-model="pollInfo.isGeneralQuestion"
          class="m-checkbox"
          @click="pollInfo.yesOrNo = false"
        >
          Raspuns Multiplu
        </vs-checkbox>
      </div>
      <div id="yesOrNo" v-if="pollInfo.yesOrNo">
        <textarea
          type="text"
          placeholder="introduceti intrebarea"
          v-model="pollInfo.question"
        ></textarea>
        <button class="m-btn small-btn" @click="createPoll">creati poll</button>
      </div>
      <div id="generalQuestion" v-if="pollInfo.isGeneralQuestion">
        <textarea
          type="text"
          placeholder="introduceti intrebarea"
          v-model="pollInfo.question"
        ></textarea>
        <div class="group">
          <input
            type="text"
            :class="{ dangerInput: wrongInputValues.answerOption }"
            placeholder="adauga varianta / candidat"
            v-model="pollInfo.answerOption"
          />
        </div>
        <div class="group">
          <button class="m-btn rounded-btn" @click="addAnswerOption">
            Adauga
          </button>
        </div>
        <div class="clearfix"></div>
        <button class="m-btn small-btn" @click="createPoll">creati poll</button>
      </div>
    </div>
    <div id="right">
      <h1 class="title">Vizionare Poll</h1>
      <div id="preview">
        <h1 class="small-title">{{ pollInfo.title }}</h1>
        <p class="question-p">{{ pollInfo.question }}</p>
        <div v-if="pollInfo.isGeneralQuestion" id="checkbox-preview-container">
          <vs-checkbox
            class="m-checkbox"
            v-for="option in multipleAnswersOptions"
            :key="option"
          >
            {{ option }}
          </vs-checkbox>
           <button v-if="multipleAnswersOptions.length" style="float: left;" class="m-btn small-btn small-btn-centered">voteaza</button>
        </div>
        <div id="yesOrNoContainer" v-if="pollInfo.yesOrNo">
          <button class="m-btn small-btn">DA</button>
          <button class="m-btn small-btn">nu</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dateUtil from '../../../utils/date';
export default {
  data() {
    return {
      pollInfo: {
        title: "",
        yesOrNo: false,
        isGeneralQuestion: false,
        question: "",
        answerOption: "",
      },
      multipleAnswersOptions: [],
      wrongInputValues: {
        answerOption: false,
        title: false,
        generalQuestion: false,
      },
    };
  },
  methods: {
    addAnswerOption() {
      if (this.pollInfo.answerOption != "")
        this.multipleAnswersOptions.push(this.pollInfo.answerOption);
      else this.wrongInputValues.answerOption = true;
      this.pollInfo.answerOption = "";
    },

    clearInputs() {
      this.wrongInputValues.answerOption = false;
      this.wrongInputValues.generalQuestion = false;
      this.wrongInputValues.title = false;
    },

    clearFields() {
      this.pollInfo.title = '';
      this.pollInfo.question = '';
      this.multipleAnswersOptions = [];
      this.pollInfo.yesOrNo = false;
      this.pollInfo.isGeneralQuestion = false;
    },

    async createPoll() {
      var pollData;
      if (this.pollInfo.yesOrNo) {
        pollData = {
          title: this.pollInfo.title,
          adminId: localStorage.getItem("adminId"),
          question: this.pollInfo.question,
          yesOrNoAnswers: [],
          options: [],
          optionAnswers: [],
          closed: false,
          date: dateUtil.currentDateFormat()
        };
      } else {
        pollData = {
          title: this.pollInfo.title,
          question: this.pollInfo.question,
          adminId: localStorage.getItem("adminId"),
          yesOrNoAnswers: [],
          options: this.multipleAnswersOptions,
          optionAnswers: [],
          closed: false,
          date: dateUtil.currentDateFormat()
        };
      }
      pollData.adminId = localStorage.adminId;
      let result = await axios.post('http://localhost:8081/polls', {
        ...pollData
      });
      if(result.data.success)  {
        this.$vs.notification({ progress: 'auto', color: 'success', position: 'top-right', title: 'Poll Creat', text: 'Poll-ul a fost creat cu succes!'})
        this.clearFields();
      }
    }

  },
};
</script>
<style scoped>
.title {
  text-align: left;
}
.m-btn {
  float: left;
}
#left,
#right {
  width: 50%;
  height: 100vh;
  float: left;
  position: relative;
}
#left {
  padding-left: 100px;
}
#right .title {
  padding-left: 15%;
}
#right p {
  text-align: center;
}
#right .question-p {
  max-width: 100%;
}
#preview {
  width: 70%;
  min-height: 800px;
  margin-left:15%;
  padding: 20px;
  padding-bottom: 50px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 3px 0px 6px rgba(0,0,0,0.23);
}
#preview .m-checkbox {
  margin-left: 30px;
  margin-bottom: 30px;
}
#checkbox-preview-container {
  min-height: 100px;
}
#preview #yesOrNoContainer button {
  width: 45%;
  margin-left: 2.5%;
  margin-right: 2.5%;
  float: left;
}
#preview #yesOrNoContainer button:nth-child(2) {
  background-color: var(--danger);
}
input,
textarea {
  float: left;
  width: 100%;
  margin-left: 0;
}
.m-checkbox {
  float: left;
}
.clearfix {
  clear: both;
  content: "";
}
.m-checkbox:nth-child(2) {
  margin-left: 50px;
}
#checkbox-container {
  width: 100%;
  margin-bottom: 30px;
  float: left;
}
#yesOrNo,
#generalQuestion {
  margin-top: 50px;
}
.group {
  width: 50%;
  float: left;
  margin-bottom: 20px;
}
.group .rounded-btn {
  margin-left: 20px;
}
.small-title {
  font-size: 1.3em;
  margin-top: 50px;
  text-align: center;
}
</style> 