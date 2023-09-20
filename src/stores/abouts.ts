import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface About {
  id: number
  title: object;
  description: object;
  status: string
}

export const useAboutsStore = defineStore("abouts", () => {
  const errors = ref({});
  const abouts = ref<Array<About>>([]);
  let links = ref({});

  function store(about: About) {
    abouts.value.push(about);
    errors.value = {};
  }

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateAbout(item: About) {
    let index = abouts.value.findIndex(about =>  about.id === item.id);
    abouts.value[index] = item;
  }

  function updateAboutStatus(id: Number, status: string) {
    let index = abouts.value.findIndex(about =>  about.id === id);
    abouts.value[index].status = status
  }

  function deleteAbout(id: Number) {
    abouts.value = abouts.value.filter(about =>  about.id !== id)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function create(payload: About) {
    try {
      let result0 = await ApiService.post("abouts", payload);
      const {data} = result0;
      store(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function update(payload: About) {
    try {
      let result0 = await ApiService.put(`abouts/${payload.id}`, payload);
      const {data} = result0;
      updateAbout(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function updateStatus(payload: About) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/about/${payload.id}/${status}`, {});
      const {data} = result0;
      updateAboutStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function destroy(payload: About) {
    try {
      await ApiService.delete(`abouts/${payload.id}`);
      deleteAbout(payload.id);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("abouts?" + new URLSearchParams(query));
      const {data} = result0;
      abouts.value = data?.data?.data;
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
    abouts,
    links,
    create,
    get,
    update,
    updateStatus,
    destroy
  };
});
