import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Product {
  id: number
  name: object;
  status: string
}

export const useProductsStore = defineStore("products", () => {
  const errors = ref({});
  const products = ref<Array<Product>>([]);
  let links = ref({});

  function store(product: Product) {
    products.value.push(product);
    errors.value = {};
  }

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateProduct(item: Product) {
    let index = products.value.findIndex(product =>  product.id === item.id);
    products.value[index] = item;
  }

  function updateProductStatus(id: Number, status: string) {
    let index = products.value.findIndex(product =>  product.id === id);
    products.value[index].status = status
  }

  function deleteProduct(id: Number) {
    products.value = products.value.filter(product =>  product.id !== id)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function create(payload: Product) {
    try {
      let result0 = await ApiService.post("products", payload);
      const {data} = result0;
      store(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function update(payload: Product) {
    try {
      let result0 = await ApiService.put(`products/${payload.id}`, payload);
      const {data} = result0;
      updateProduct(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function updateStatus(payload: Product) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/product/${payload.id}/${status}`, {});
      const {data} = result0;
      updateProductStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function destroy(payload: Product) {
    try {
      await ApiService.delete(`products/${payload.id}`);
      deleteProduct(payload.id);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("products?" + new URLSearchParams(query));
      const {data} = result0;
      products.value = data?.data?.data;
      updateLinks(data?.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  return {
    errors,
    products,
    links,
    create,
    get,
    update,
    updateStatus,
    destroy
  };
});
