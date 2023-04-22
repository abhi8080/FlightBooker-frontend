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
          Flight time: {{ flight.flightDuration }} hours
        </small>
      </p>
    </div>
    <div class="card-footer">
      <button v-on:click="bookFlight" type="button" class="btn btn-primary">
        Book Flight
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
    bookFlight() {
      this.$store.commit("setFlightInfo", this.flight);
      this.$router.push("/book");
    },
  },
};
</script>
