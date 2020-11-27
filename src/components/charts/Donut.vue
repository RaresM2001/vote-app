<template>
  <apexchart
    width="380"
    type="donut"
    :options="options"
    :series="series"
  ></apexchart>
</template>
<script>
export default {
  props: ["pollData"],
  data() {
    return {
      totlaVotes: 0,
      options: {
        colors: ["var(--primary)", "var(--danger)"],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                },
              },
            },
          },
        },
        labels: ["DA", "NU"],
      },
      series: [],
    }; 
  },
  mounted() {
    this.getSeries();
  },
  methods: {
    getSeries() {
      let positiveVotes = 0;
      let negativeVotes = 0;
      let votes = this.pollData.yesOrNoAnswers;

      for(let i = 0; i < votes.length; i++) {
        if(votes[i].vote < 0) negativeVotes++;
        else positiveVotes++;
      }

      this.series.push(positiveVotes);
      this.series.push(negativeVotes);
    }
  }
};
</script>