import { PlaceSwitchGroup } from "#features/PlaceSwitchGroup";
import { Button } from "#shared/ui/Button/index";
import { CustomSelect } from "#shared/ui/CustomSelect/index";
import {
  CheckIcon,
  CancelIcon,
  BarIcon,
  CinemaIcon,
  RestIcon,
  MusicIcon,
  TheatreIcon, LocationIcon, RouteIcon, DirectIcon,
} from "#shared/ui/Icons/index";
import { Switch } from "#shared/ui/Switch/index";
import {MapButtons} from "#shared/ui/MapButtons/index.js";

/**
 * Страница приложения
 * @return {string}
 */
const IndexPage = () => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Home Page</title>
    </head>
    <body>
      <header>
      </header>
      <main>
      <div class="mapLayout">
        <aside class="mapLayout__filters">
           <input class="mapLayout__input" type="text" id="searchAddress" placeholder="Введите текст"/>
           <div class="switch__wrapper" data-js-filter="1">
             ${Switch({ label: "Бары", labelPosition: "right" })}
          </div>
          ${Switch({ label: "Рестораны", labelPosition: "right" })}
          ${Switch({ label: "ТРК", labelPosition: "right" })}
          ${Switch({ label: "Театры", labelPosition: "right" })}
          ${Switch({ label: "Кино", labelPosition: "right" })}
        </aside>
        <div class="mapLayout__map">
          <div id="map1" class="yandexMap" style="width: 1407px; height: 658px;"></div>
            ${MapButtons({
              buttons: [
                { text: "Добавить метку", iconSlot: LocationIcon() },
                { text: "Построить маршрут", iconSlot: RouteIcon() },
                { text: "Мои маршруты", iconSlot: DirectIcon() },
              ],
            })}
        </div>
        </div>
      </div>
        <p>Hello world! 12</p>
        <div class="isFlex mb16 gap8">
          ${Button({ text: "Да", iconSlot: CheckIcon(), extraClasses: ["btn--isGreenLightIcon"] })}
          ${Button({ text: "Нет", iconSlot: CancelIcon(), extraClasses: ["btn--isRedIcon"] })}
        </div>
        <div class="isFlex mb16 gap8">
          ${Switch({
            label: "Привет мир",
            extraInputAttrs: [
              { name: "name", value: "rememberMe" },
              { name: "form", value: "formAuth" },
            ],
          })}
          
          ${Switch({
            label: "Привет мир",
            extraClasses: ["switch--isRightLabel"],
            extraInputAttrs: [
              { name: "name", value: "rememberMe" },
              { name: "form", value: "formAuth" },
              { name: "checked", value: "true" },
            ],
          })}
        </div>

        <div style="max-width: 279px">
          ${CustomSelect({
            extraAttrs: [{ name: "id", value: "select-type-mark" }],
            cfg: {
              itemSelectText: "",
              searchEnabled: false,
              choices: [
                {
                  value: "Ресторан",
                  label: "Ресторан",
                  selected: true,
                  customProperties: {
                    icon: RestIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
                {
                  value: "Ночной клуб",
                  label: "Ночной клуб",
                  selected: false,
                  customProperties: {
                    icon: MusicIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
                {
                  value: "Театр",
                  label: "Театр",
                  selected: false,
                  customProperties: {
                    icon: TheatreIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
                {
                  value: "Кино",
                  label: "Кино",
                  selected: false,
                  customProperties: {
                    icon: CinemaIcon({ iconColor: "var(--colorPrimary)" }),
                  },
                },
                {
                  value: "Бар",
                  label: "Бар",
                  selected: false,
                  customProperties: {
                    icon: BarIcon({ iconColor: "var(--colorRed)" }),
                  },
                },
              ],
            },
          })}
        </div>  
        </div>
        ${PlaceSwitchGroup()}
      </main>
      <div id="modalSuccess">
          <p>Успешно!</p>
      </div>
      <div id="modalError">
          <p>Не успешно!</p>
      </div>
    </body>
  </html>
`;

export default IndexPage;
