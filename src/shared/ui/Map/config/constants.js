import {
  BarIcon,
  CenterMapIcon,
  CinemaIcon,
  MusicIcon,
  RestIcon,
  TheatreIcon,
} from "#shared/ui/Icons/index.js";

export const yandexMapDefaults = {
  center: [45.751574, 37.573856],
  zoom: 10,
  lang: "ru_RU",
  apiUrl: "https://api-maps.yandex.ru/2.1/?apikey",
};

export const classNames = {
  ballonContent: "yandexMap__ballonContent",
  ballonLayout: "yandexMap__ballonLayout",
  mark: "yandexMap__mark",
  centerMarker: "yandexMap__centerMarker",
  hintContainer: "yandexMap__hintContainer",
  hintVisible: "yandexMap__hintContainer--visible",
  hintIcon: "yandexMap__hintContainer-icon",
  hintText: "yandexMap__hintContainer-text",
  hintHidden: "yandexMap__hintContainer--hidden",
};

export const iconShapeCfg = {
  type: "Circle",
  coordinates: [0, 0],
  radius: 50,
};

export const iconsPresets = {
  bars: BarIcon({ iconColor: "var(--colorRed)" }),
  cinema: CinemaIcon({ iconColor: "var(--colorGreen)" }),
  theatre: TheatreIcon({ iconColor: "var(--colorPurple)" }),
  restaurant: RestIcon({ iconColor: "var(--colorOrange)" }),
  club: MusicIcon({ iconColor: "var(--colorBlue)" }),
  centerMarker: CenterMapIcon({ iconColor: "var(--colorGray)" }),
};

export const yandexMapCustomEventNames = {
  markClicked: "yandexMap::markClicked",
};
