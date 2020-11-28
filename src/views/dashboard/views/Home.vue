<template>
    <div id="content">
        <div id="cards-container">
            <div class="card light-shadow">
                <p class="count"><span>{{memberCount}}</span> membrii</p>
            </div>
            <div class="card light-shadow">
                <p class="count"><span>{{pollCount}}</span> polluri</p>
            </div>
            <div id="chart-container">

            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            memberCount: 0,
            pollCount: 0
        }
    },
    async mounted() {
        await this.geMebersCount();
        await this.getPollsCount();
    },
    methods: {
        async geMebersCount() {
            let result = await axios.get('http://localhost:8081/members/count');
            if(result.data.success) this.memberCount = result.data.count;
        },
        async getPollsCount() {
            let result = await axios.get('http://localhost:8081/polls/count');
            if(result.data.success) this.pollCount = result.data.count;
        }
    }
}
</script>

<style scoped>

#content {
    width: 85%;
    margin-left: 7.5%;
}

.card {
    width: 25%;
    height: 150px;
    margin-right: 30px;
    float: left;
    border-radius: 15px;
    line-height: 150px;
    vertical-align: center;
}

.card-title {
    font-weight: bold;
    color: #2c3e50;
    padding-left: 30px;
}

.count {
    text-align: center;
    color: lightgray;
    margin: 0;
}

span {
    color: var(--primary);
    font-size: 3em;
}

</style>