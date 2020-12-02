<template>
    <div class="root">
        <h1 class="title text-centered small">Bine ati venit!</h1>
        <h1 class="title text-centered">{{pollData.title}}</h1>
        <div id="content">
            <p class="text-centered">{{pollData.question}}</p>
            <div v-if="!pollData.options.length">
                <button class="m-btn small-btn" @click="() => {placeVote(1)}">DA</button>
                <button class="m-btn small-btn" @click="() => {placeVote(-1)}">NU</button>
            </div>
            <div id="checkbox-container" v-else>
                <vs-checkbox class="m-checkbox" v-for="(option, index) in pollData.options" :key="option" @click="() => {chooseOption(index)}">{{option}}</vs-checkbox>
                <div class="clearfix"></div>
                <button class="m-btn small-btn small-btn-centerd" @click="placeOption">voteaza</button>
            </div>
            <span class="clearfix"></span>
            
        </div>
       
    </div>
</template>

<script>
export default {
    data() {
        return {
            pollData: {
                options: []
            },
            memberData: {},
            optionAnswer: -1
        }
    },
    async mounted() {
        await this.getPollData();
        await this.getMemberData();
        this.checkForVote();
    },
    methods: {
        checkForVote() {
            
            let ok = true;
            if(this.pollData.options.length) {
                for(let i = 0; i < this.pollData.optionAnswers.length; i++) {
                    if(this.pollData.optionAnswers[i].memberId == this.$route.params.memberId) ok = false;
                }
            } else {
                for(let i = 0; i < this.pollData.yesOrNoAnswers.length; i++) {
                    if(this.pollData.yesOrNoAnswers[i].memberId == this.$route.params.memberId)  ok = false;
                }
            }
            if(!ok) {this.$router.push({name: 'vote-error'})}
        },

        async getPollData() {
            let pollId = this.$route.params.pollId;
            
            let result = await axios.get(`http://localhost:8081/polls/poll/${pollId}`);
            if(result.data.success) this.pollData = result.data.poll;
            else alert('pollul la care incercati sa participati nu exista sau a fost inchis.');
        },

        async getMemberData() {
            const loading = this.$vs.loading({background: '#5b3cc4', color: '#fff'});
            let memberId = this.$route.params.memberId;
            
            let result = await axios.get(`http://localhost:8081/members/member/${memberId}`);
            if(result.data.success) this.memberData = result.data.member;
            else  alert('Votul dumneavoastra a fost inregistrat deja.');
            
            loading.close();
        },

        async placeVote(vote) {
            let pollId = this.$route.params.pollId;
            let memberId = this.$route.params.memberId;
            if(!this.pollData.options.length) {
                let result = await axios.post(`http://localhost:8081/polls/vote/${pollId}/yesorno`, {memberId, vote});
                if(result.data.success) this.$router.push({name: 'vote-placed'})
                else alert('Something went wrong');
            }
        },

        chooseOption(index) {
            this.optionAnswer = index;
        },

        async placeOption() {
            let pollId = this.$route.params.pollId;
            let memberId = this.$route.params.memberId;
            let index = this.optionAnswer;
           

            let result = await axios.post(`http://localhost:8081/polls/vote/${pollId}/multiple`, {memberId: memberId, vote: index});
            console.log(result.data);
        }
    }
}
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

</style>