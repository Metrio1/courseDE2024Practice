import { getResponseMock } from "./lib/index.js";
import { API_ENDPOINTS } from "../config/constants.js";
import {
  filerCfg,
  listMarsMockResponse as listMarks,
  marksDetailMockResponse,
} from "#widgets/MapApp/api/mockData.js";

export const handlers = [
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.marks.list,
    data: listMarks,
  }),
  ...marksDetailMockResponse.map((markInfo) => {
    return getResponseMock({
      type: "GET",
      endpoint: `${API_ENDPOINTS.marks.detail}`,
      queryParams: { id: markInfo.id },
      data: markInfo,
    });
  }),
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.config.list,
    data: filerCfg,
  }),
  getResponseMock({
    type: "DELETE",
    endpoint: API_ENDPOINTS.marks.delete,
    data: {},
  }),
  getResponseMock({
    type: "POST",
    endpoint: API_ENDPOINTS.marks.update,
    data: {},
  }),
];
