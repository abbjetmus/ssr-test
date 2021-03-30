<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          SSR Test

        <q-btn to="/" color="grey" class="q-mr-sm">Select 1</q-btn>
        <q-btn to="/cities" color="grey">Select 2</q-btn>
        </q-toolbar-title>        
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
    }
  }
}
</script>
