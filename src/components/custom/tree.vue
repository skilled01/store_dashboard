<template>
  <div class="accordion accordion-icon-toggle" :id="`kt_accordion_${id}`">
      <tree-item v-for="(item, i) in data" :key="i" :item="item" :id="id"></tree-item>
  </div>
</template>

<script setup>
  import TreeItem from "@/components/custom/tree-item.vue";

  defineProps({
    data: Array,
    id: {
      type: Number,
      default: 0
    }
  })
</script>