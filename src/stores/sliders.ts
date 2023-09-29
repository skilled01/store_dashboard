import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Slider {
  id: number
  name: object;
  status: string
}

export const useSlidersStore = defineStore("sliders", () => {
  const errors = ref({});
  const sliders = ref<Array<Slider>>([]);
  let links = ref({});

  function store(slider: Slider) {
    sliders.value.push(slider);
    errors.value = {};
  }

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateSlider(item: Slider) {
    let index = sliders.value.findIndex(slider =>  slider.id === item.id);
    sliders.value[index] = item;
  }

  function updateSliderStatus(id: Number, status: string) {
    let index = sliders.value.findIndex(slider =>  slider.id === id);
    sliders.value[index].status = status
  }

  function deleteSlider(id: Number) {
    sliders.value = sliders.value.filter(slider =>  slider.id !== id)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function create(payload: Slider) {
    try {
      let result0 = await ApiService.post("sliders", payload);
      const {data} = result0;
      store(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function update(payload: Slider) {
    try {
      let result0 = await ApiService.put(`sliders/${payload.id}`, payload);
      const {data} = result0;
      updateSlider(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function updateStatus(payload: Slider) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/slider/${payload.id}/${status}`, {});
      const {data} = result0;
      updateSliderStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function destroy(payload: Slider) {
    try {
      await ApiService.delete(`sliders/${payload.id}`);
      deleteSlider(payload.id);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("sliders?" + new URLSearchParams(query));
      const {data} = result0;
      sliders.value = data?.data?.data;
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
    sliders,
    links,
    create,
    get,
    update,
    updateStatus,
    destroy
  };
});
