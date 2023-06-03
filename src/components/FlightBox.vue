<template>
  <div class="card mb-3">
    <div class="card-body">
      <h4 class="card-title mb-0">
        {{ flight.departureAirport.airportCode }}
        <i class="bi bi-arrow-right-short"></i>
        {{ flight.arrivalAirport.airportCode }}
      </h4>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ new Date(flight.startDateTime).toLocaleString() }}
      </h6>
      <p class="card-text">
        <small class="text-muted">
          {{ $t("flightTime") }}: {{ flight.flightDuration }}
          {{ $t("hours") }}
        </small>
      </p>
    </div>
    <div class="card-footer">
      <button v-on:click="bookFlight" type="button" class="btn btn-primary">
        {{ $t("bookFlight") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlightBox",
  props: {
    flight: Object,
  },
  methods: {
    /**
     * Stores the flight info in the store and navigates to the book page.
     */
    bookFlight() {
      this.$store.commit("setFlightInfo", this.flight);
      this.$router.push("/book");
    },
  },
};
</script>
