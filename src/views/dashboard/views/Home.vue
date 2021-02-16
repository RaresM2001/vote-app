<template>
    <div id="content">
        <div id="cards-container">
            <div class="card light-shadow">
                <p class="count"><span>{{memberCount}}</span> membrii</p>
            </div>
            <div class="card light-shadow">
                <p class="count"><span>{{pollCount}}</span> polluri</p>
            </div>
            <div class="clearfix"></div>
        </div>
        
          <div id="chart-container" class="light-shadow">
              <multiple-bar-chart></multiple-bar-chart>
            </div>
    </div>
</template>
<script>
import MultipleBarChart from '../../../components/charts/MultipleBarChart.vue'
import environment from '../../../utils/environment';
export default {
    components: {
        MultipleBarChart
    },
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
            let adminId = localStorage.adminId;
            let result = await axios.get(`${environment.getApiUrl()}/members/count/${adminId}`);
            if(result.data.success) this.memberCount = result.data.count;
        },
        async getPollsCount() {
            let adminId = localStorage.adminId;
            let result = await axios.get(`${environment.getApiUrl()}/polls/count/${adminId}`);
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

#cards-container {
    margin-bottom: 50px;
}

.clearfix {
    content: "";
    clear: both;
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

#chart-container {
    width: 65%;
    padding: 10px;
    min-height: 400px;
    border-radius: 15px;
}


</style>