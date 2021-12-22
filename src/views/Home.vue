<template>
  <v-container>
    <v-card v-if="balances">
      <v-toolbar flat>
        <v-toolbar-title>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                Account Balances
              </v-list-item-title>
              <v-list-item-subtitle class="caption">
                {{ formatDollars(balances.total.usd) }} USD
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-toolbar-title>
        <v-toolbar-title class="ma-2 primary--text text-h4">
          {{ formatDollars(balances.total.local) }} {{ selected }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>Select Currency</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-radio-group v-model="selected" column>
                <v-radio
                  v-for="currency in currencies"
                  :key="currency"
                  :label="currency"
                  :value="currency"
                />
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="close">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col
            v-for="key in Object.keys(balances.accounts)"
            :key="key"
            lg="3"
            md="6"
            sm="12"
          >
            <v-card outlined class="text-center">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ key }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="caption">
                    {{ formatDollars(balances.accounts[key].usd) }} USD
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-text>
                <v-row align="center">
                  <v-col class="text-h5 ma-0 pa-0 text-center primary--text">
                    {{ formatDollars(balances.accounts[key].local) }}
                    {{ selected }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import numeral from "numeral";

export default {
  name: "Home",
  data() {
    return {
      dialog: false,
      currencies: [],
      balances: null,
      selected: "AUD",
    };
  },
  methods: {
    async connect() {
      const response = await axios.post("/api/3commas", {
        apiKey: this.$route.query.api_key,
        secret: this.$route.query.secret,
        userId: this.$route.query.user_id,
      });

      window.console.log(response);
      if (response.data) {
        this.$cookies.set("3commas", response.data);
      }
    },
    async load() {
      const response = await axios.get("/api/fiat");
      this.currencies = response.data;
    },
    async loadBalances(code) {
      const response = await axios.get(`/api/fiat/${code}`);
      this.balances = response.data;
    },
    async close() {
      await this.loadBalances(this.selected);
      this.dialog = false;
    },
    formatDollars(value) {
      return `${numeral(value).format("0,0")}`;
    },
  },
  async created() {
    await this.connect();
    await this.load();
    await this.loadBalances(this.selected);
  },
};
</script>
