<template>
  <div class="container my-5">
    <div class="form-group">
      <select
        class="btn btn-primary custom-select"
        id="lang"
        v-model="lang"
        @change="handleChange($event)"
      >
        <option value="en">{{ $t("lang.eng") }}</option>
        <option value="se">{{ $t("lang.se") }}</option>
      </select>
    </div>

    <h1 class="text-center mb-5">{{ $t("searchFlights") }}</h1>
    <form @submit.prevent="search" class="row g-3">
      <div class="col-md-6">
        <label for="departureAirport" class="form-label fw-bold">{{
          $t("departureAirport")
        }}</label>
        <select
          id="departureAirport"
          v-model="selectedDepAirport"
          required
          class="form-select"
        >
          <option v-for="airport in airports" :value="airport.id">
            {{ airport.airportCode }}
          </option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="arrivalAirport" class="form-label fw-bold">{{
          $t("arrivalAirport")
        }}</label>
        <select
          id="arrivalAirport"
          v-model="selectedArrivAirport"
          required
          class="form-select"
        >
          <option v-for="airport in airports" :value="airport.id">
            {{ airport.airportCode }}
          </option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="numOfPassengers" class="form-label fw-bold">{{
          $t("noOfPassengers")
        }}</label>
        <select
          id="numOfPassengers"
          v-model="numOfPassengers"
          required
          class="form-select"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="selectedDate" class="form-label fw-bold">{{
          $t("date")
        }}</label>
        <select
          id="selectedDate"
          v-model="selectedDate"
          required
          class="form-select"
        >
          <option v-for="date in flightDates" :value="date.slice(0, 10)">
            {{ date.slice(0, 10) }}
          </option>
        </select>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">
          {{ $t("search") }}
        </button>
      </div>
    </form>
    <div class="row mt-5">
      <FlightBox
        v-for="flight in flights"
        v-bind:key="flight.id"
        v-bind:flight="flight"
        class="col-lg-4 col-md-6 mb-4"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import FlightBox from "../components/FlightBox.vue";

export default {
  name: "Home",
  components: {
    FlightBox,
  },
  data() {
    const lang = localStorage.getItem("lang") || "en";
    return {
      selectedDepAirport: "",
      selectedArrivAirport: "",
      numOfPassengers: 1,
      selectedDate: "",
      airports: [],
      flightDates: [],
      flights: [],
      lang: lang,
    };
  },
  mounted() {
    this.getAirports();
    this.getFlightDates();
  },

  methods: {
    async getAirports() {
      await axios
        .get("/airports")
        .then((response) => {
          this.airports = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getFlightDates() {
      await axios
        .get("/flights/dates")
        .then((response) => {
          this.flightDates = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async search() {
      this.$store.commit("setNumOfPassengers", this.numOfPassengers);
      await axios
        .get(
          `/flights?departureAirportCode=${this.selectedDepAirport}&arrivalAirportCode=${this.selectedArrivAirport}&startDate=${this.selectedDate}`
        )
        .then((response) => {
          this.flights = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleChange(event) {
      localStorage.setItem("lang", event.target.value);
      window.location.reload();
    },
  },
};
</script>
