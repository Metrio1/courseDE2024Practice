import {FilterManager} from "#features/Filter/model/index";
import {API_ENDPOINTS} from "#shared/config/constants";
import {yandexMapCustomEventNames} from "#shared/ui/Map/config/constants";
import {YandexMap} from "#shared/ui/Map/model";

export class MapApp {
  constructor(storeService, apiClient) {
    this.storeService = storeService;
    this.apiClient = apiClient;

    // Создаем экземпляр FilterManager с обновленной логикой
    this.filterManager = new FilterManager({
      filterGroupName: "marks",
      onFilterChange: this.updateMapFilters.bind(this),
      filtersConfig: this.storeService.getFilters(),
    });

    // Инициализация карты
    this.yandexMap = new YandexMap({
      containerSelector: "#map1",
      apiUrl: "https://api-maps.yandex.ru/2.1/?apikey",
      apiKey: "b4a559eb-311c-4123-8025-480ecdc62549",
      lang: "ru_RU",
      center: [53.5, 58.8],
      zoom: 10,
    });


    this.initMap().then(() => {
      this.#bindYandexMapEvents();
      this.subscribeForStoreService();
      this.loadAndUpdateFilters();
    });
  }

  // Метод инициализации карты
  async initMap() {
    try {
      await this.yandexMap.initMap();
      this.updateMapFilters(); // Применяем фильтры при инициализации
      const markers = await this.getMarks();
      this.storeService.updateStore("setMarkers", markers);
      this.yandexMap.renderMarks(this.getFilteredMarkers());
    } catch (error) {
      console.error("Ошибка инициализации карты", error);
    }
  }

  // Обновление меток на основе фильтров
  updateMapFilters(updatedFilters) {
    const currentFilters = this.storeService.getFilters();

    // Log current and updated filters
    console.log("Current filters before update:", currentFilters);
    console.log("Updated filters:", updatedFilters);

    // Merge current and updated filters
    const newFilters = {
      ...currentFilters,
      ...updatedFilters,
    };

    console.log("Merged filters:", newFilters);

    // Check for address filter
    if (updatedFilters?.search?.value) {
      const address = updatedFilters.search.value;
      this.handleCenterMapByAddress(address); // Center map on entered address
    }

    const currentState = this.storeService.getFilters().inputs;
    const updatedState = { ...currentState, ...newFilters };
    // Update store with new filters
    this.storeService.updateStore("setFilters", { inputs: updatedState });

    // Get filtered markers
    const filteredMarkers = this.getFilteredMarkers();
    console.log("Filtered markers:", filteredMarkers);

    // Render filtered markers on the map
    this.yandexMap.renderMarks(filteredMarkers);
  }

  // Загрузка и применение конфигурации фильтров


  // Получение меток с сервера
  async getMarks() {
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.marks.list);
      return response?.data?.marks || [];
    } catch (error) {
      console.error("Ошибка при получении меток:", error);
      return [];
    }
  }

  // Получение конфигурации фильтров
  loadAndUpdateFilters() {
    (async () => {
      try {
        const filters = await this.getFiltersCfg();
        this.storeService.updateStore("setFilters", filters);
        this.filterManager.applyFilters(filters);
      } catch (error) {
        console.error("Ошибка при получении конфигурации фильтров:", error);
      }
    })();
  }

  async getFiltersCfg() {
    return this.apiClient
        .get(API_ENDPOINTS.config.list)
        .then((res) => res?.data);
  }

  // Фильтрация меток
  getFilteredMarkers() {
    const filters = this.storeService.getFilters().inputs;

    if (!filters || typeof filters !== "object") {
      console.error("Filters not found or malformed:", filters);
      return this.storeService.getMarkers();
    }

    const markers = this.storeService.getMarkers();

    if (!markers || !Array.isArray(markers)) {
      console.error("Markers not found or invalid format:", markers);
      return [];
    }

    return markers.filter((marker) => {
      const filter = filters[marker.type];
      return filter?.isChecked;
    });
  }

  // Центрирование карты по адресу
  async handleCenterMapByAddress(address) {
    try {
      const response = await fetch(
          `https://geocode-maps.yandex.ru/1.x/?apikey=b4a559eb-311c-4123-8025-480ecdc62549&geocode=${encodeURIComponent(
              address
          )}&format=json`
      );
      const data = await response.json();
      const coords =
          data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.Point?.pos?.split(
              " "
          );

      if (coords) {
        const lat = parseFloat(coords[1]);
        const lon = parseFloat(coords[0]);
        this.yandexMap.centerMapByCords([lat, lon]);
      } else {
        console.warn("Не удалось получить координаты для адреса:", address);
      }
    } catch (error) {
      console.error("Ошибка при обработке адреса:", error);
    }
  }

  // Подписка на изменения в StoreService
  subscribeForStoreService() {
    this.markerSubscription = this.storeService.subscribeToMarkers(() =>
        this.handleMarkersChangedInStore()
    );
    this.filterSubscription = this.storeService.subscribeToFilters(() =>
        this.handleFiltersChangedInStore()
    );
  }

  // Отписка от изменений StoreService
  unsubscribeFromStoreService() {
    this.markerSubscription?.();
    this.filterSubscription?.();
  }

  // События Yandex карты
  #bindYandexMapEvents() {
    this.yandexMap?.containerMap?.addEventListener(
        yandexMapCustomEventNames.markClicked,
        (e) => this.handleMarkerClick(e)
    );
  }

  // Обработчик кликов по меткам
  async handleMarkerClick(event) {
    const { id, mark } = event.detail;
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.marks.detail, {
        id,
      });
      const layout = this.yandexMap.getLayoutContentForBallon(
          id,
          response.data
      );
      this.yandexMap.updateBallonContent(id, mark, layout);
    } catch (error) {
      console.error("Ошибка при обработке клика по метке:", error);
    }
  }

  // Обработка изменений меток в Store
  handleMarkersChangedInStore() {
    const markers = this.getFilteredMarkers();
    this.yandexMap.renderMarks(markers);
  }

  // Обработка изменений фильтров в Store
  handleFiltersChangedInStore() {
    const markers = this.getFilteredMarkers();
    this.yandexMap.renderMarks(markers);
  }
}