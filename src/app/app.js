import "./styles.js";
import { API_URL } from "#shared/config/constants";
import { ModalManager } from "#shared/lib/plugins/ModalManager.js";
import { ApiClient } from "#shared/lib/services/ApiClient.js";
import { CustomSelect } from "#shared/ui/CustomSelect/model/index.js";
import { MapApp } from "#widgets/MapApp/model/index.js";
import {StoreService} from "#shared/lib/services/StoreService";
import {createStore} from "#shared/store/store";
import { DeleteMarkModel } from "#features/Marks/DeleteMark/model/index.js";

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
  window.App.StoreServiceForMap = new StoreService(store);

  new MapApp(window.App.StoreServiceForMap, apiClient);

  new CustomSelect();
  window.App.CustomSelect = CustomSelect;

  new DeleteMarkModel(window.App.StoreServiceForMap);
});