export class StoreService {
  constructor(store) {
    this.store = store;
    this.actionMap = {
      addMarker: (payload) => this.store.getState().addMarker(payload),
      removeMarker: (payload) => this.store.getState().removeMarker(payload),
      setFilters: (payload) => this.store.getState().setFilters(payload),
      clearFilters: () => this.store.getState().clearFilters(),
      removeMarkersList: () => this.store.getState().removeMarkersList(),
      addMarkersList: (payload) => this.store.getState().addMarkersList(payload),
      setMarkers: (payload) => this.store.getState().setMarkers(payload),
    };
  }

  subscribeToMarkers(callback) {
    return this.store.subscribe((state) => state.markers, callback);
  }

  subscribeToFilters(callback) {
    return this.store.subscribe((state) => state.activeFilters, callback);
  }

  getMarkers() {
    return this.store.getState().markers;
  }

  getFilters() {
    return this.store.getState().activeFilters;
  }

  updateStore(action, payload) {
    const actionFunction = this.actionMap[action];
    if (actionFunction) {
      actionFunction(payload);
    } else {
      console.warn(`Action ${action} is not defined`);
    }
  }
}
