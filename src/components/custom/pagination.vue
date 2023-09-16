<template>
  <ul class="pagination" v-if="store.links?.links">
    <li class="page-item previous" :class="{'disable': store?.links?.current_page == 1}">
      <a href="#" class="page-link"><i class="previous"></i></a>
    </li>
    <li v-for="(star, i) in store.links?.links"
        :key="i"
        :class="{'active': store.links.current_page === i+1}"
        class="page-item ">
      <a href="#" class="page-link">{{i + 1}}</a>
    </li>
    <li class="page-item next"
        :class="{'disable': store?.links?.current_page === store?.links?.last_page }"
    >
      <a href="#"  class="page-link"><i class="next"></i></a>
    </li>
  </ul>
</template>

<script setup>

import {onMounted, onUpdated, ref} from "vue";

let props = defineProps({
  store: Object
})

let links = ref(props.store.links?.links)

</script>