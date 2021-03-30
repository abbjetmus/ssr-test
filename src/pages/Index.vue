<template>
  <q-page class="flex flex-center">
    <div class="row">
      <q-select
        ref="uppdragRef"
        style="border-radius: 0px !important;"
        use-chips
        use-input
        multiple
        @add="addUppdrag"
        outlined
        v-model="modelUppdragMultiple"
        hide-dropdown-icon
        input-debounce="0"
        @new-value="createUppdragValue"
        :options="filterUppdragOptions"
        @filter="filterUppdragFn"
        class="shadow-1 col-xs-12 col-md max-sm-mt-sm min-md-mb-xs"
        bg-color="grey-3"
        label="Sök eller ange uppdragstyper..."
      >

        <template v-slot:prepend>
          <q-icon name="mdi-briefcase" />
        </template>

        <template v-slot:option="scope">

          <q-item
            v-if="scope.opt.categoryId"
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-item-label class="q-ml-sm">{{scope.opt.label}}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-else
            :clickable="false"
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section
              class="q-mx-none q-pl-sm"
              :class="scope.opt.color"
              style="border-radius: 3px;"
            >
              <q-item-label class="text-subtitle1 text-black q-mx-none">{{scope.opt.label}}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        ref="cityRef"
        style="border-radius: 0px;"
        v-model="modelCityMultiple"
        multiple
        :options="filterCityOptions"
        @filter="filterCityFn"
        use-chips
        use-input
        outlined
        @add="addCity"
        input-debounce="0"
        @new-value="createCityValue"
        class="shadow-1 col-xs-12 col-md max-sm-mt-sm min-md-mb-xs"
        bg-color="grey-3"
        hide-dropdown-icon
        label="Sök eller ange orter..."
      >

        <template v-slot:prepend>
          <q-icon name="mdi-map-marker" />
        </template>

        <template v-slot:option="scope">
          <q-item
            v-if="scope.opt.countyId"
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section class="q-ml-sm">
              <q-item-label>{{scope.opt.label}}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-else
            :clickable="false"
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section
              class="q-mx-none q-pl-sm"
              :class="scope.opt.color"
              style="border-radius: 3px;"
            >
              <q-item-label class="text-subtitle1 text-black q-mx-none">{{scope.opt.label}}</q-item-label>
            </q-item-section>
          </q-item>

        </template>
      </q-select>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      modelCityMultiple: [],
      modelUppdragMultiple: [],
      filterCityOptions: this.cityOptions,
      filterUppdragOptions: this.uppdragOptions
    }
  },
  async preFetch ({ store }) {
      if (store.state.data.countiesWithCities.length === 0) {
        await store.dispatch('data/getCountiesWithCities')
      }

      if (store.state.data.categoriesWithTypes.length === 0) {
        await store.dispatch('data/getCategoriesWithTypes')
      }
  },
  computed: {
    ...mapGetters("data", ["categoriesWithTypes", 'countiesWithCities']),
    cityOptions () {
      let options = []

      if (this.countiesWithCities.length > 0) {
        this.countiesWithCities.forEach(county => {
          options.push({ id: county.id, name: county.name, label: county.label, value: county.value, color: county.color })
          county.cities.forEach(city => {
            options.push(city)
          })
        })
      }
      return options
    },
    uppdragOptions () {
      let options = []

      if (this.categoriesWithTypes.length > 0) {
        this.categoriesWithTypes.forEach(category => {
          options.push({ id: category.id, name: category.name, label: category.label, value: category.value, color: category.color })
          category.uppdragTypes.forEach(uppdragType => {
            options.push(uppdragType)
          })
        })
      }
      return options
    }
  },
  methods: {
    createUppdragValue (val, done) {
      if (val.length > 0) {
        let value = this.uppdragOptions.find(uppdrag => {
          if (uppdrag.label) {
            return uppdrag.label.toLowerCase() === val.toLowerCase()
          }
        })

        if (value == null) {
          value = { id: 0, name: val, label: val, value: val }
        }
        done(value, 'add-unique')
      }
    },
    createCityValue (val, done) {
      if (val.length > 0) {
        let value = this.cityOptions.find(city => {
          if (city.label) {
            return city.label.toLowerCase() === val.toLowerCase()
          }
        })

        if (value == null) {
          value = { id: 0, name: val, label: val, value: val }
        }

        done(value, 'add-unique')
      }
    },
    filterCityFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterCityOptions = this.cityOptions
        }
        else {
          const needle = val.toLowerCase()

          let kalle = []

          this.countiesWithCities.forEach(county => {
            var temp = county.cities.filter(v => v.label.toLowerCase().startsWith(needle) > 0)
            if (temp.length > 0) {
              temp.unshift({
                id: county.id,
                name: county.name,
                label: county.label,
                value: county.value,
                color: county.color
              })
              kalle = kalle.concat(temp)
            }
          })

          this.filterCityOptions = kalle
        }
      })
    },
    filterUppdragFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterUppdragOptions = this.uppdragOptions
        }
        else {
          const needle = val.toLowerCase()

          let kalle = []

          this.categoriesWithTypes.forEach(category => {
            var temp = category.uppdragTypes.filter(v => v.label.toLowerCase().startsWith(needle) > 0)
            if (temp.length > 0) {
              temp.unshift({
                id: category.id,
                name: category.name,
                label: category.label,
                value: category.value,
                color: category.color
              })
              kalle = kalle.concat(temp)
            }
          })

          this.filterUppdragOptions = kalle
        }
      })
    },
    addCity () {
      // this.$refs.cityRef.updateInputValue('')
    },
    addUppdrag () {
      // this.$refs.uppdragRef.updateInputValue('')
    }
  }
}
</script>
