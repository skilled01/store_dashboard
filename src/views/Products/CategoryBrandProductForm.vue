<template>
  <div class="tab-pane fade show" id="kt_tab_panel_2" role="tabpanel">
    <div class="col-md-6 offset-3">
      <div>
        <label class="form-label mb-3">
          {{translate("select brand")}}
        </label>
        <select
          v-model="product.brand_id"
          class="form-control form-control-lg form-control-solid mb-4"
        >
          <option v-for="(brand, i) in brands" :key="i" :value="brand.id">
            {{ brand?.name[locale] }}
          </option>
        </select>
      </div>

      <div>
        <label class="form-label mb-3">
          {{translate("select category")}}
        </label>
        <select
          v-model="product.category_id"
          class="form-control form-control-lg form-control-solid mb-4"
        >
          <option
            v-for="(category, i) in categories"
            :key="i"
            :value="category.id"
          >
            {{ category?.name[locale] }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useCategoriesStore } from "@/stores/categories";
import { useBrandsStore } from "@/stores/brands";
import { translate } from "@/core/services/TranslationService";

let locale = inject('locale');

defineProps({
  product: Object
})

let categories = ref(null);
let brands = ref(null);

onMounted(async () => {
  if (!useCategoriesStore().categories[0]) {
    await useCategoriesStore().get();
  }

  if (!useBrandsStore().brands[0]) {
    await useBrandsStore().get();
  }

  categories.value = useCategoriesStore().categories;
  brands.value = useBrandsStore().brands;
});
</script>