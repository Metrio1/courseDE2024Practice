import { create } from "zustand";
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
              // Проверка, есть ли уже маркер с таким ID
              const exists = state.markers.some((m) => m?.id === marker.id);
              if (exists) {
                console.warn(`Marker with ID ${marker.id} already exists.`);
                return state; // Не изменяем состояние, если маркер с таким ID уже существует
              }
              return {
                markers: [...state.markers, marker], // Добавляем новый маркер
              };
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
          name: storageName, // Используем переданное имя хранилища
          getStorage: () => localStorage,
        }
      )
    )
  );
};
