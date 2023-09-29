<template>
  <div class="tab-pane fade show" id="kt_tab_panel_3" role="tabpanel">
    <div class="col-md-6 offset-3">
      <div class="mb-5 d-flex justify-content-between">
        <h3>
          {{ translate("warehouses") }}
        </h3>
        <button
          @click="
                  product.warehouses.push({
                    warehouse_id: null,
                    quantity: null,
                  })
                "
          class="btn btn-icon btn-outline"
        >
          +
        </button>
      </div>
      <div
        class="d-flex justify-content-between mt-5"
        v-for="(item, i) in product.warehouses"
        :key="i"
      >
        <select
          v-model="item.warehouse_id"
          class="form-control form-control-lg form-control-solid mb-4 w-80"
        >
          <option
            v-for="(warehouse, i) in warehouses"
            :key="i"
            :value="warehouse.id"
          >
            {{ warehouse?.name[locale] }}
          </option>
        </select>
        <input
          type="number"
          min="0"
          class="w-25 form-control form-control-lg form-control-solid mb-4"
          style="margin-inline-start: 10px"
          :placeholder="translate('quantity')"
          v-model="item.quantity"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useWarehousesStore } from "@/stores/warehouses";
import { translate } from "@/core/services/TranslationService";

let locale = inject('locale');

defineProps({
  product: Object
})

let warehouses = ref()

onMounted(async () => {
  if (!useWarehousesStore().warehouses[0]) {
    await useWarehousesStore().get();
  }

  warehouses.value = useWarehousesStore().warehouses;
});
</script>