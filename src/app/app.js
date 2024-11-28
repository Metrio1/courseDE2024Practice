import "./styles.js";
import { API_URL, API_ENDPOINTS } from "#shared/config/constants";
import { ApiClient } from "#shared/lib/services/ApiClient.js";
import { CustomSelect } from "#shared/ui/CustomSelect/model/index.js";
import { MapApp } from "#widgets/MapApp/model/index.js";
import {StoreService} from "#shared/lib/services/StoreService";
import {createStore} from "#shared/store/store";
import {modalManager} from "#shared/lib/plugins/modalManager.js";

async function initMSW() {
  if (process.env.NODE_ENV === "development") {
    const { getMocks } = await import("#shared/api/browser");
    await getMocks();

    console.debug("msw ready");
  } else {
    return Promise.resolve();
  }
}

function domReady() {
  return new Promise((res) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", res);
    } else {
      res();
    }
  });
}

Promise.all([initMSW(), domReady()]).then(() => {
  window.App = {};
  const apiClient = new ApiClient(API_URL);
  const storageName = "storageName";

  const store = createStore(storageName);
  const storeService = new StoreService(store);

  new MapApp(storeService, apiClient);

  new CustomSelect();
  window.App.ChoiceSelectModel = CustomSelect;

  setTimeout(() => {
    new modalManager().open({ htmlContent: "<div>Контент модалки</div>" })
  }, 3000)

  apiClient.get(API_ENDPOINTS.marks.list).then((res) => console.debug(res));
});
