import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Subscription {
  id: number
  name: object;
  status: string
}

export const useSubscriptionsStore = defineStore("subscriptions", () => {
  const errors = ref({});
  const subscriptions = ref<Array<Subscription>>([]);
  let links = ref({});

  function updateLinks(link: any) {
    delete link.data
    links.value = link
  }

  function updateSubscriptionStatus(id: Number, status: string) {
    let index = subscriptions.value.findIndex(subscription =>  subscription.id === id);
    subscriptions.value[index].status = status
  }

  function deleteSubscription(id: Number) {
    subscriptions.value = subscriptions.value.filter(subscription =>  subscription.id !== id)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function updateStatus(payload: Subscription) {
    try {
      let status = payload.status === 'active' ? 'disabled': 'active';
      let result0 = await ApiService.put(`/status/update/subscription/${payload.id}/${status}`, {});
      const {data} = result0;
      updateSubscriptionStatus(payload.id, status);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function destroy(payload: Subscription) {
    try {
      await ApiService.delete(`subscriptions/${payload.id}`);
      deleteSubscription(payload.id);
      return true;
    } catch (e) {
      const {response} = e;
      setError(response.data.errors);
      return errors.value;
    }
  }

  async function get(query: object|null = null) {
    try {
      let result0 = await ApiService.get("subscriptions?" + new URLSearchParams(query));
      const {data} = result0;
      subscriptions.value = data?.data?.data;
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
    subscriptions,
    links,
    get,
    updateStatus,
    destroy
  };
});
