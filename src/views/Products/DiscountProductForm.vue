<template>
  <div class="tab-pane fade show" id="kt_tab_panel_5" role="tabpanel">
    <div class="col-md-6 offset-3">
      <div>
        <label class="form-label mb-3">
          {{ translate("discount") }}
        </label>
        <input
          type="number"
          min="1"
          max="90"
          v-model="discount.discount"
          class="form-control form-control-lg form-control-solid mb-4"
        />
      </div>
      <div>
        <label class="form-label mb-3">
          {{translate("minimum quantity")}}
        </label>
        <input
          type="number"
          min="1"
          max="10"
          v-model="discount.minimum_quantity"
          class="form-control form-control-lg form-control-solid mb-4"
        />
      </div>

      <div>
        <label class="form-label mb-3">
          {{translate("expires at")}}
        </label>
        <input
          type="date"
          v-model="discount.to"
          class="form-control form-control-lg form-control-solid mb-4"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { translate } from "@/core/services/TranslationService";

let locale = inject('locale');

let discount = ref({
  discount: null,
  minimum_quantity: 1,
  to: null,
});

</script>