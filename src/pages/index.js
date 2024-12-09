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
import {MapButtons} from "#shared/ui/MapButtons/ui/MapButtons.js";

/**
 * Страница приложения
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
      <main class="mainContent">
        <div class="mapLayout">
          <aside>
              ${PlaceSwitchGroup()}
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
        </div>
      </main>

      <form>
          
      </form>

      <div style="display: none">
        <div id="modalSuccess">
            <p>Успешно!</p>
        </div>
        <div id="modalError">
          <p>Не успешно!</p>
        </div>
      </div>
    </body>
  </html>
`;

export default IndexPage;
