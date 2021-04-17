<template>
  <apexchart
    type="bar"
    :options="options"
    :series="series"
  ></apexchart>
</template>
<script>
import environment from '../../utils/environment';
export default {
  data() {
    return {
      series: [
        {
          name: "DA",
          data: [0, 0, 0, 0, 0 ],
        },
        {
          name: "NU",
          data: [0, 0, 0, 0, 0 ],
        },
        {
          name: "Abtineri",
          data: [0, 0, 0, 0, 0 ],
        },
      ],
      options: {
        colors: ["var(--primaryColor)", "var(--danger)", "#ffba00"],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "25%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [],
        },
        fill: {
          opacity: 1,
        }
        
      },
    };
  },
  mounted() {
      this.getPolls();
  },
  methods: {
      async getPolls() {
        let polls = [];
        let categories = [];

        let id = localStorage.adminId;
        let result = await axios.get(`${environment.getApiUrl()}/polls/${id}`);
        if(result.data.success) {
            result.data.polls.forEach((poll) => {
                if(poll.options.length == 0) polls.push(poll);
            });
        }

        for(let i = 0 ; i < polls.length; i++) {
            categories.push(polls[i].title);
            for(let j = 0; j < polls[i].yesOrNoAnswers.length; j++) {
                
                if(polls[i].yesOrNoAnswers[j].vote > 0) {
                  console.log('vote is > 0')
                  this.series[0].data[i]++;
                }
                else {
                  console.log('vote is < 0')
                  this.series[1].data[i]++;
                }
            }
        }        

        this.options = {
            ...this.options,
            xaxis: {
                categories: [...categories]
            }
        }
      }
  }
};
</script>
<style scoped>
</style>