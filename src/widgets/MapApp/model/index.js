import { StoreService } from "#shared/lib/services/StoreService";
import {API_ENDPOINTS} from "#shared/config/constants.js";

export class MapApp {
  constructor(storeService, apiClient) {
    this.storeService = storeService;
    this.apiClient = apiClient;
    this.subscribeForStoreService();

    this.fetchAndSetMarkers();
  }

  async fetchAndSetMarkers() {
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.marks.list);

      if (response.isSuccess && response.data?.marks) {
        this.storeService.updateStore("addMarkersList", response.data.marks);
      } else {
        console.warn("Не удалось получить метки", response);
      }
    } catch (error) {
      console.error("Ошибка при получении меток", error);
    }
  }

  handleMarkersChanged() {
    console.debug("markers changed", this.storeService.getMarkers());
  }

  handleFiltersChanged() {
    console.debug("markers changed", this.storeService.getFilters());
  }

  subscribeForStoreService() {
    this.markerSubscription = this.storeService.subscribeToMarkers(() => {
      this.handleMarkersChanged();
    });
    this.filterSubscription = this.storeService.subscribeToFilters(() => {
      this.handleFiltersChanged();
    });
  }

  unsubscribeFromStoreService() {
    this.markerSubscription?.();
    this.subscribeOnStoreChange?.();
  }
}
