<template>
  <apexchart
    width="500"
    type="bar"
    :options="options"
    :series="series"
  ></apexchart>
</template>
<script>
export default {
  props: ["pollData"],
  data() {
    return {
      series: [],
      options: {
        colors: ["var(--primary)"],
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + " voturi";
          },
          offsetY: 20,
          style: {
            fontSize: "12px",
            colors: ["white"],
          },
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return (val * 100) / 1 + "%";
            },
          },
        },
      },
    };
  },

  mounted() {
    this.updateOptions();
    this.getSeries();
  },

  methods: {
    updateOptions() {
      let options = this.pollData.options;
      let xaxisCategories = [];

      for (let i = 0; i < options.length; i++) {
        xaxisCategories.push(options[i]);
      }

      const SCOPE = this;

      this.options = {
        ...this.options,
        ...{
          xaxis: {
            categories: [...xaxisCategories],
          },
          yaxis: {
            labels: {
              show: false,
              formatter: function (val) {
                return (val * 100) / SCOPE.pollData.optionAnswers.length + "%";
              },
            },
          },
        },
      };
    },

    getSeries() {
      let optionsNumber = this.options.xaxis.categories.length;
      let seriesData = [];
      let seriesObject = {};
      let answeres = this.pollData.optionAnswers;

      for (let i = 0; i < optionsNumber; i++) seriesData.push(0);
      for (let i = 0; i < answeres.length; i++)
        seriesData[answeres[i].voteOption]++;

      this.series.push({ name: "Voturi", data: seriesData });
    },
  },
};
</script>
<style scoped>
</style>