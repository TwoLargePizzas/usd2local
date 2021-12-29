<template>
  <!-- <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message" class="pa-4">{{ message }}</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click.native="agree">Yes</v-btn>
        <v-btn color="grey" text @click.native="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->

  <v-dialog
    v-model="dialog"
    scrollable
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-card-title>Select Currency</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <v-radio-group v-model="selected" column>
          <v-radio
            v-for="currency in currencies"
            :key="currency.code"
            :label="`${currency.code} - ${currency.name}`"
            :value="currency.code"
          />
        </v-radio-group>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="save">
          Save
        </v-btn>
        <v-btn text @click="cancel">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    currencies: [],
    selected: "",
    options: {
      color: "primary",
      width: 290,
      zIndex: 200,
    },
  }),
  async created() {
    const response = await axios.get("/api/fiat");
    this.currencies = response.data;
  },
  methods: {
    open(selected, options) {
      this.selected = selected;
      this.dialog = true;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    save() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  },
};
</script>
