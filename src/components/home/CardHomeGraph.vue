<template>
  <q-page class="q-mr-md q-ml-md q-mb-xl">
    <div class="row justify-center" style="margin-bottom: 9px">
      <transition name="fade">
        <q-card class="my-card">
          <q-card-section class="conatinerGraphic">
            <Apexchart
              type="donut"
              height="350"
              :options="chartOptions"
              :series="series"
            />
          </q-card-section>
        </q-card>
      </transition>
    </div>
  </q-page>
</template>
<script>
import chart from "vue3-apexcharts";

export default {
  components: {
    Apexchart: chart,
  },
  data() {
    return {
      series: [10, 10, 10],
      chartOptions: {
        labels: [
          "Canceladas",
          "Bloqueadas",
          "Ativas",
        ],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
              },
              size: "45%",
            },
          },
        },
        colors: ["#CB4335", "#8E44AD", "#28B463"],
        legend: {
          fontFamily: "Roboto",
          fontWeight: 500,
          position: "bottom",
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.45,
          },
          background: {
            enabled: true,
            foreColor: "#fff",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: "#000",
              opacity: 0.45,
            },
          },
          labels: {
            colors: ["#555"],
          },
          markers: {
            width: 13,
            height: 13,
            strokeWidth: 0,
            strokeColor: "#ddd",
            radius: 4,
            customHTML: undefined,
            offsetX: 0,
            offsetY: 0,
          },
        },
      },
    };
  },
};
</script>
<style scoped>
.accounts-cards {
  width: 100%;
  max-width: 650px;
  padding: 30px 20px 20px 30px;
  display: flex;
  justify-content: space-between;
}

.title-card-accounts {
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 300;
  color: #595959;
}

.number-accounts {
  font-weight: 600;
  font-size: 28px;
  color: #595959;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button_open_graph {
  color: #919191;
  width: 90%;
  font-weight: 400;
  border: 1px solid #dfdfdf;
}

.conatinerGraphic {
  height: auto;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 40px;
}

.my-card {
  width: 100%;
  max-width: 650px;
  border-radius: 12px;
  background-color: #FFF;
  box-shadow: 2px 2px 10px 2px rgba(80, 80, 80, 0.1);
}
</style>
