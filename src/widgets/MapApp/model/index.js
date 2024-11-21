import { API_ENDPOINTS } from "#shared/config/constants";
import { getDebouncedFn } from "#shared/lib/utils";
import { yandexMapCustomEventNames } from "#shared/ui/Map/config/constants";
import { YandexMap } from "#shared/ui/Map/model";

export class MapApp {
  constructor(storeService, apiClient, filters) {
    this.apiClient = apiClient;
    this.storeService = storeService;
    this.apiGeoUrl = "https://geocode-maps.yandex.ru/1.x/?apikey";
    this.apiKey = "b4a559eb-311c-4123-8025-480ecdc62549";
    this.filters = filters || { inputAddress: "#searchAddress" };
    this.inputAddress = document.querySelector(this.filters.inputAddress);
    console.debug(this.inputAddress, "!!!");

    this.yandexMap = new YandexMap({
      containerSelector: "#map1",
      apiUrl: "https://api-maps.yandex.ru/2.1/?apikey",
      apiKey: this.apiKey,
      lang: "ru_RU",
      center: [53.5, 53.9],
      zoom: 10,
    });

    this.yandexMap
      .initMap()
      .then(async () => {
        this.yandexMap.renderMarks(this.storeService.getMarkers()); //Рендерим метки из стора
        const marks = await this.getMarks();
        this.storeService.updateStore("addMarkers", marks);
      })
      .catch((e) => console.error(e));

    this.storeService = storeService;
    this.apiClient = apiClient;
    this.fetchAndSetMarkers();

    this.#bindYandexMapEvents();
    this.subscribeForStoreService();
    this.#bindFilterEvents();
  }

  async getMarks() {
    return this.apiClient
      .get(API_ENDPOINTS.marks.list)
      .then((res) => res?.data?.marks);
  }

  async handleMarkerClick(e) {
    const {
      detail: { id, mark },
    } = e;

    try {
      const res = await this.apiClient.get(API_ENDPOINTS.marks.detail, {
        id: id,
      });
      const layout = this.yandexMap.getLayoutContentForBallon(res.data);
      this.yandexMap.updateBallonContent(id, mark, layout);
    } catch (e) {
      console.error(e);
    }
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
    this.yandexMap.renderMarks(this.storeService.getMarkers());
  }

  handleFiltersChanged() {
    console.debug("markers changed", this.storeService.getFilters());
  }

  async handleCenterMapByAddress(address) {
    console.debug(address, "address");

    try {
      const response = await this.apiClient.get(this.apiGeoUrl, {
        apikey: this.apiKey,
        geocode: encodeURIComponent(address),
        format: "json",
        ignoreBaseUrl: true, // Добавляем этот параметр
      });

      const coords =
          response?.data?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos?.split(
              " "
          );

      if (coords) {
        const lat = parseFloat(coords[1]);
        const lon = parseFloat(coords[0]);
        this.yandexMap.centerMapByCords([lat, lon]);
      } else {
        console.warn("Не удалось получить координаты для адреса", address);
      }
    } catch (e) {
      console.error("Ошибка при получении координат для адреса", e);
    }
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

  #bindYandexMapEvents() {
    document.addEventListener(yandexMapCustomEventNames.markClicked, (e) => {
      this.handleMarkerClick(e);
    });
  }

  #bindFilterEvents() {
    const debouncedHandleMapByAddress = getDebouncedFn(
        this.handleCenterMapByAddress,
        1000
    ).bind(this);

    if (this.inputAddress) {
      this.inputAddress.addEventListener("input", (e) => {
        debouncedHandleMapByAddress(e.target.value);
      });
    }
  }
}
