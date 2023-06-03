<template>
  <div class="container d-flex justify-content-center">
    <div class="card bg-dark w-50 p-3">
      <fieldset>
        <div class="form-group">
          <label for="flightId" class="form-label mt-4">{{
            $t("flightId")
          }}</label>
          <input
            type="number"
            class="form-control"
            id="flightId"
            disabled
            :value="flight.id"
          />
        </div>
        <div class="form-group">
          <label for="flightRoute" class="form-label mt-4">{{
            $t("flightRoute")
          }}</label>
          <template v-if="flight.departureAirport">
            <input
              type="text"
              class="form-control"
              id="flightRoute"
              disabled
              :value="`${flight.departureAirport.airportCode} -> ${flight.arrivalAirport.airportCode}`"
            />
          </template>
        </div>
        <div class="form-group">
          <label for="chosenDate" class="form-label mt-4">{{
            $t("dateAndTime")
          }}</label>
          <input
            type="text"
            class="form-control"
            id="chosenDate"
            disabled
            :value="new Date(flight.startDateTime).toString()"
          />
        </div>
      </fieldset>
      <br />
      <br />
      <div class="alert alert-danger" v-if="errorMessage">
        <strong>{{ errorMessage }}</strong>
      </div>
      <fieldset>
        <div v-for="(, index) in passengerNames" :key="index">
          <div class="card">
            <div class="card-header">
              <h2 class="text-center">{{ $t("passenger") }} {{ index + 1 }}</h2>
            </div>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label for="name" class="form-label mt-4">{{
                    $t("name")
                  }}</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    v-model="passengerNames[index]"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="email" class="form-label mt-4">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    v-model="passengerEmails[index]"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          <br />
          <br />
        </div>
      </fieldset>
      <div class="alert alert-success" v-if="successMessage">
        <strong>{{ successMessage }}</strong>
      </div>
      <button @click="bookConfirm" class="btn btn-primary">
        {{ $t("book") }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Booking",
  data() {
    return {
      flight: {},
      numOfPassengers: 0,
      errorMessage: null,
      successMessage: null,
      passengerNames: [],
      passengerEmails: [],
    };
  },
  mounted() {
    if (this.$store.state.numOfPassengers == 0) this.$router.push("/");

    document.title = "Book flight | Flight Booker";

    this.flight = this.$store.state.flightInfo;
    this.numOfPassengers = this.$store.state.numOfPassengers;
    for (let i = 0; i < this.numOfPassengers; i++) {
      this.passengerNames.push("");
    }
    for (let i = 0; i < this.numOfPassengers; i++) {
      this.passengerEmails.push("");
    }
  },
  methods: {
    /**
     * Confirms the booking.
     */
    async bookConfirm() {
      if (
        !(this.passengerNames.includes("") || this.passengerEmails.includes(""))
      ) {
        await axios
          .post("/book", {
            FlightId: this.flight.id,
            passengerNames: this.passengerNames,
            passengerEmails: this.passengerEmails,
          })
          .then((response) => {
            this.successMessage =
              "Your flight is successfully booked. Your booking number is: " +
              response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errorMessage = "All fields are required";
      }
    },
  },
};
</script>
