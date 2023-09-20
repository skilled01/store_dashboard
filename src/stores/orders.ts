import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Order {
  id: number
  name: object;
  image: string;
  status: string
}

export const useOrdersStore = defineStore("orders", () => {
  const errors = ref({});
  const orders = ref<Array<Order>>([]);
  let links = ref({});

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateOrder(item: Order) {
    let index = orders.value.findIndex(order =>  order.id === item.id);
    orders.value[index] = item;
  }


  function setError(error: any) {
    errors.value = { ...error };
  }

  async function update(payload: Order) {
    try {
      let result0 = await ApiService.put(`orders/${payload.id}`, payload);
      const {data} = result0;
      updateOrder(data.data);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("orders?" + new URLSearchParams(query));
      const {data} = result0;
      orders.value = data?.data?.data;
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
    orders,
    links,
    get,
    update,
  };
});
