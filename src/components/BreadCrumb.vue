<template>
  <div class="breadCrumbs">
    <q-bar>
      <q-breadcrumbs active-color="black" style="font-size: 16px">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" />
        </template>
        <q-breadcrumbs-el :key="index" v-for="(routeObject, index) in routeRecords">
          <span class="active" v-if="isLast(index)">{{ getName(routeObject) }}</span>
          <router-link :to="routeObject" v-else>{{ getName(routeObject) }}</router-link>
        </q-breadcrumbs-el>
      </q-breadcrumbs>
    </q-bar>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    routeRecords: function() {
      return this.list.filter(route => route.name || route.meta.label);
    }
  },
  methods: {
    getName(item) {
      return item.meta && item.meta.label ? item.meta.label : item.name || null;
    },
    isLast(index) {
      return index === this.list.length - 1;
    }
  }
};
</script>
<style lang="scss">
  .breadCrumbs {
    .q-bar {
      background: none;
    }

    .q-breadcrumbs__el {
      font-weight: bold;
      a {
        color: #282D30;
        text-decoration: none;
      }
      .active {
        color: #000000;
        font-size: 14px;
      }
    }

    .q-breadcrumbs__separator i {
      color: #A0A5BA !important;
    }
  }
</style>
