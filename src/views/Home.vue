<template>
  <v-container>
    <v-card v-if="balances" :loading="loading">
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
          {{ balances.totalFormatted }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="primary--text">
          {{ selected }}
        </v-toolbar-title>
        <v-btn @click="showOptions" icon>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
        <options-dialog ref="options" />
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col
            v-for="account in balances.accounts"
            :key="account.id"
            lg="3"
            md="6"
            sm="12"
          >
            <v-card outlined class="text-center">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ account.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="caption">
                    {{ formatDollars(account.usd) }} USD
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-text>
                <v-row align="center">
                  <v-col class="text-h5 ma-0 pa-0 text-center primary--text">
                    {{ account.localFormatted }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-skeleton-loader v-else class="mx-auto" type="card-heading, card" />
    <p class="text-center caption ma-0 grey--text">
      This 3Commas app was created by TwoLargePizzas.
    </p>
    <p class="text-center caption ma-0 grey--text">
      Come and join our crypto trading
      <a
        target="_blank"
        href="https://join.slack.com/t/twolargepizzas/shared_invite/zt-10vua1weq-SGGBJdEdhXJoVO2kb5fwsA"
        class="text-decoration-none"
      >
        Slack community
      </a>
      to discuss ideas and share thoughts.
    </p>
  </v-container>
</template>

<script>
import axios from "axios";
import numeral from "numeral";
import OptionsDialog from "@/components/OptionsDialog.vue";

export default {
  name: "Home",
  components: {
    OptionsDialog,
  },
  data() {
    return {
      dialog: false,
      currencies: [],
      balances: null,
      selected: "AUD",
      loading: true,
    };
  },
  methods: {
    async showOptions() {
      const options = this.$refs.options;
      if (await options.open(this.selected)) {
        this.selected = options.selected;
        await this.loadBalances(this.selected);
      }
    },
    async loadBalances(code) {
      this.loading = true;
      const key = this.$route.query.api_key;
      const secret = this.$route.query.secret;
      const userId = this.$route.query.user_id;
      const response = await axios.get(`/api/3commas/${key}?local=${code}`, {
        headers: {
          "3commasSecret": secret,
          "3commasUserId": userId,
        },
      });
      this.balances = response.data;
      this.loading = false;
    },
    async close() {
      await this.loadBalances(this.selected);
      this.dialog = false;
    },
    formatDollars(value) {
      return `${numeral(value).format("0,0")}`;
    },
    formatBtc(value) {
      return `${numeral(value).format("0.00000")}`;
    },
  },
  async created() {
    await this.loadBalances(this.selected);
  },
  watch: {
    selected(newSelected) {
      localStorage.currencyCode = newSelected;
    },
  },
  mounted() {
    if (localStorage.currencyCode) {
      this.selected = localStorage.currencyCode;
    }
  },
};
</script>
