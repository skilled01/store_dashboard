<template>
  <div class="tab-pane fade show" id="kt_tab_panel_4" role="tabpanel">
    <div class="col-md-6 offset-3">
      <div class="mb-5 d-flex justify-content-between">
        <h3>
          {{ translate("taxes") }}
        </h3>
        <button
          @click="product.taxes.push({ tax_id: null, value: null })"
          class="btn btn-icon btn-outline"
        >
          +
        </button>
      </div>
      <div
        class="d-flex justify-content-between mt-5"
        v-for="(item, i) in product.taxes"
        :key="i"
      >
        <select
          v-model="item.tax_id"
          class="form-control form-control-lg form-control-solid mb-4 w-80"
        >
          <option v-for="(tax, i) in taxes" :key="i" :value="tax.id">
            {{ tax?.name[locale] }}
          </option>
        </select>
        <input
          type="number"
          min="0"
          class="w-25 form-control form-control-lg form-control-solid mb-4"
          style="margin-inline-start: 10px"
          :placeholder="translate('value')"
          v-model="item.value"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useTaxesStore } from "@/stores/taxes";
import { translate } from "@/core/services/TranslationService";

let locale = inject('locale');

defineProps({
  product: Object
})

let taxes = ref()

onMounted(async () => {
  if (!useTaxesStore().taxes[0]) {
    await useTaxesStore().get();
  }

  taxes.value = useTaxesStore().taxes;
});
</script>