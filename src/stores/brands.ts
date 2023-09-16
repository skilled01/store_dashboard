import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Brand {
  id: number
  name: object;
  image: string;
  status: string
}

export const useBrandsStore = defineStore("brands", () => {
  const errors = ref({});
  const brands = ref<Array<Brand>>([]);
  let links = ref({});

  function store(brand: Brand) {
    brands.value.push(brand);
    errors.value = {};
  }

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateBrand(item: Brand) {
    let index = brands.value.findIndex(brand =>  brand.id === item.id);
    brands.value[index] = item;
  }

  function updateBrandStatus(id: Number, status: string) {
    let index = brands.value.findIndex(brand =>  brand.id === id);
    brands.value[index].status = status
  }

  function deleteBrand(id: Number) {
    brands.value = brands.value.filter(brand =>  brand.id !== id)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function create(payload: Brand) {
    try {
      let result0 = await ApiService.post("brands", payload);
      const {data} = result0;
      store(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function update(payload: Brand) {
    try {
      let result0 = await ApiService.put(`brands/${payload.id}`, payload);
      const {data} = result0;
      updateBrand(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function updateStatus(payload: Brand) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/brand/${payload.id}/${status}`, {});
      const {data} = result0;
      updateBrandStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function destroy(payload: Brand) {
    try {
      await ApiService.delete(`brands/${payload.id}`);
      deleteBrand(payload.id);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("brands?" + new URLSearchParams(query));
      const {data} = result0;
      brands.value = data?.data?.data;
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
    brands,
    links,
    create,
    get,
    update,
    updateStatus,
    destroy
  };
});
