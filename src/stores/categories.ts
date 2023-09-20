import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Category {
  id: number
  name: object;
  status: string
}

export const useCategoriesStore = defineStore("categories", () => {
  const errors = ref({});
  const categories = ref<Array<Category>>([]);
  let links = ref({});

  function store(category: Category) {
    categories.value.push(category);
    errors.value = {};
  }

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateCategory(item: Category) {
    let index = categories.value.findIndex(category =>  category.id === item.id);
    categories.value[index] = item;
  }

  function updateCategoryStatus(id: Number, status: string) {
    let index = categories.value.findIndex(category =>  category.id === id);
    categories.value[index].status = status
  }

  function deleteCategory(id: Number) {
    categories.value = categories.value.filter(category =>  category.id !== id)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function create(payload: Category) {
    try {
      let result0 = await ApiService.post("categories", payload);
      const {data} = result0;
      store(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function update(payload: Category) {
    try {
      let result0 = await ApiService.put(`categories/${payload.id}`, payload);
      const {data} = result0;
      updateCategory(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function updateStatus(payload: Category) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/category/${payload.id}/${status}`, {});
      const {data} = result0;
      updateCategoryStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function destroy(payload: Category) {
    try {
      await ApiService.delete(`categories/${payload.id}`);
      deleteCategory(payload.id);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("categories?" + new URLSearchParams(query));
      const {data} = result0;
      categories.value = data?.data?.data;
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
    categories,
    links,
    create,
    get,
    update,
    updateStatus,
    destroy
  };
});
