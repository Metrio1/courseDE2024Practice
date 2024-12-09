import { createStore as create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

/**
 * Функция для создания Store с уникальным именем
 * @param {string} storageName - Имя хранилища
 * @return {Function} - Функция, возвращающая Store
 */
export const createStore = (storageName) => {
  return create(
    subscribeWithSelector(
      persist(
        (set) => ({
          markers: [],
          activeFilters: {},
          setMarkers: (markers) => set({ markers }),
          addMarker: (marker) => {
            set((state) => {
              const updatedMarkers = state.markers.map((m) =>
                m.id === marker.id ? { ...m, ...marker } : m
              );
              if (updatedMarkers.every((m) => m.id !== marker.id)) {
                updatedMarkers.push(marker);
              }
              return { markers: updatedMarkers };
            });
          },
          addMarkers: (newMarkers) => {
            set((state) => {
              const updatedMarkers = [...state.markers];
              newMarkers.forEach((marker) => {
                const markerIndex = updatedMarkers.findIndex(
                  (m) => m.id === marker.id
                );
                if (markerIndex !== -1) {
                  updatedMarkers[markerIndex] = {
                    ...updatedMarkers[markerIndex],
                    ...marker,
                  };
                } else {
                  updatedMarkers.push(marker);
                }
              });

              return { markers: updatedMarkers };
            });
          },

          addMarkersList: (markersList) => {
              set((state) => {

                  const newMarkers = markersList.filter(
                      (marker) => !state.markers.some((m) => m.id === marker.id)
                  );
                  return {
                      markers: [...state.markers, ...newMarkers],
                  };

              });
          },

          removeMarker: (markerId) =>
            set((state) => {
              const updatedMarkers = state.markers.filter((marker) => marker.id !== markerId);
              return { markers: updatedMarkers };
            }),
          setFilters: (filters) => set({ activeFilters: filters }),
          clearFilters: () => set({ activeFilters: {} }),
          removeMarkersList: () => set({ markers: [] })

        }),

        {
          name: storageName,
          getStorage: () => localStorage,
        }
      )
    )
  );
};
