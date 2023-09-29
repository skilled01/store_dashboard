<template>
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">
          {{ translate("Create Product") }}
        </span>
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3 row">
      <div>
        <ul
          class="nav nav-tabs nav-line-tabs mb-5 d-flex fs-6 justify-content-center"
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              data-bs-toggle="tab"
              href="#kt_tab_panel_1"
            >
              <label class="form-label mb-3">
                {{translate("product info") }}
              </label>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_panel_2">
              <label class="form-label mb-3">
                {{translate("category and brand") }}
              </label>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_panel_3">
              <label class="form-label mb-3">
                {{translate("warehouses") }}
              </label>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_panel_4">
              <label class="form-label mb-3">{{ translate("taxes") }}</label>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#kt_tab_panel_5">
              <label class="form-label mb-3">{{ translate("discount") }}</label>
            </a>
          </li>
        </ul>
      </div>

      <div class="tab-content" id="myTabContent">
        <basic-product-form  :product="product"/>

        <category-brand-product-form :product="product"/>

        <warehouses-product-form  :product="product"/>

        <taxes-product-form  :product="product"/>

        <discount-product-form  :product="product"/>
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <button @click.prevent="save" class="btn btn-primary">
          {{ translate("save") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, watch } from "vue";
import { useProductsStore } from "@/stores/products";
import AlertService from "@/core/services/AlertService";
import BasicProductForm from "@/views/Products/BasicProductForm.vue";
import CategoryBrandProductForm from "@/views/Products/CategoryBrandProductForm.vue";
import WarehousesProductForm from "@/views/Products/WarehousesProductForm.vue";
import TaxesProductForm from "@/views/Products/TaxesProductForm.vue";
import DiscountProductForm from "@/views/Products/DiscountProductForm.vue";
import { translate } from "@/core/services/TranslationService";
import { useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";

let locale = inject('locale');

let schema = {
  name: {
    ar: "",
    en: "",
  },
  description: {
    ar: "",
    en: "",
  },
  price: null,
  images: [],
  category_id: null,
  brand_id: null,
  warehouses: [
    {
      warehouse_id: null,
      quantity: 1,
    },
  ],
  taxes: [
    {
      tax_id: null,
      value: 1,
    },
  ],
  discount: {
    discount: null,
    minimum_quantity: 1,
    to: null,
  },
};

let product = ref(schema);

let router = useRoute()

onMounted(() => {
  init();
})

watch(router, () => {
  init()
})

async function init() {
  if (router.name === 'update-product') {
    let result = await ApiService.get(`products/${router.params.id}`)
    product.value = result.data.data
    product.value.warehouses = product.value.warehouses.map(warehouse => warehouse.pivot)
    product.value.taxes = product.value.taxes.map(tax => tax.pivot)
  }
  else {
    product.value = schema
  }
}

const save = async () => {
  if (router.name === 'update-product') {
    await useProductsStore().update(product.value);
    AlertService(useProductsStore(), translate("item updated successfully"));
  }else {
    await useProductsStore().create(product.value);
    AlertService(useProductsStore(), translate("item created successfully"));
  }
};
</script>