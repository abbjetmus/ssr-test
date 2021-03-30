<template>
  <q-page class="flex flex-center">
    <div class="row">
      <q-select
        ref="uppdragRef"
        style="border-radius: 0px !important;"
        use-input
        outlined
        v-model="model"
        hide-dropdown-icon
        input-debounce="0"
        :options="cities"
        class="shadow-1 col-xs-12 col-md max-sm-mt-sm min-md-mb-xs"
        bg-color="grey-3"
        label="Cities"
      >
      </q-select>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      model: null
    }
  },
  async preFetch ({ store }) {
      if (store.state.data.cities.length === 0) {
        await store.dispatch('data/getCities')
      }
  },
  computed: {
    ...mapGetters("data", ["cities"]),
  },
  methods: { }
}
</script>
