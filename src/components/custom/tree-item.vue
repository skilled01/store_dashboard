<template>
  <div class="mb-5">
    <!--begin::Header-->
    <div class="accordion-header py-3 d-flex" data-bs-toggle="collapse" :data-bs-target="`#kt_accordion_${id}_item_1`">
            <span class="accordion-icon">
                <i class="ki-duotone ki-arrow-right fs-4"><span class="path1"></span><span class="path2"></span></i>
            </span>
      <h3 class="fs-4 fw-semibold mb-0 ms-4">{{item.name}}</h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div id="kt_accordion_2_item_1" class="fs-6 collapse show ps-10" data-bs-parent="#kt_accordion_2">
      <tree v-if="item.children" :data="item.children" :id="item.id"></tree>
    </div>
  </div>
</template>

<script setup>
  import Tree from "@/components/custom/tree.vue";

  defineProps({
    item: Object,
    id: Number
  })
</script>