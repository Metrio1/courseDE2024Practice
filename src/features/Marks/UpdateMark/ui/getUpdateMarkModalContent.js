import { Button } from "#shared/ui/Button";
import { CustomSelect } from "#shared/ui/CustomSelect/index";
import {
  CinemaIcon,
  RestIcon,
  MusicIcon,
  TheatreIcon,
  BarIcon, ImageIcon, CancelIcon, SaveIcon,
} from "#shared/ui/Icons/index";

/**
 * Контент модалки обновления метки
 */
export const getUpdateMarkModalContent = ({
  markInfo,
  url,
  method = "post",
  iconColor = "var(--colorBlack)",
}) => {
  const {
    title,
    address: { city = "", house = "", street = "" } = {}, // Дефолтные значения
  } = markInfo;

  const formattedAddress = [city, street, house].filter(Boolean).join(", ");

  return `<div class="updateModalContent" >
  <form class="updateModalContent__form" data-js-form=${JSON.stringify({ url, method, showModalAfterSuccess: "#modalSuccess" })}>
    <h3>Редактировать метку</h3>
    <p>${formattedAddress}</p>
    <div class="updateModalContent__formBody">
    
      <div class="updateModalContent__inputGroup">
        <label class="updateModalContent__label">Тип метки</label>
        <div class="updateModalContent__field">
          ${CustomSelect({
    extraAttrs: [
      {
        name: "data-js-update-mark-info-select-type",
        value: markInfo.id,
      },
      {
        name: "name",
        value: "typeMark",
      },
    ],
    cfg: {
      preset: "default",
      itemSelectText: "",
      searchEnabled: false,
      choices: [
        {
          value: "Бar",
          label: "Бар",
          selected: markInfo.type === "bars",
          customProperties: {
            icon: BarIcon({ iconColor: "var(--colorRed)" }),
          },
        },
        {
          value: "Ресторан",
          label: "Ресторан",
          selected: markInfo.type === "restaurant",
          customProperties: {
            icon: RestIcon({ iconColor: "var(--colorRed)" }),
          },
        },
        {
          value: "Ночной клуб",
          label: "Ночной клуб",
          selected: markInfo.type === "club",
          customProperties: {
            icon: MusicIcon({ iconColor: "var(--colorRed)" }),
          },
        },
        {
          value: "Театр",
          label: "Театр",
          selected: markInfo.type === "theatre",
          customProperties: {
            icon: TheatreIcon({ iconColor: "var(--colorRed)" }),
          },
        },
        {
          value: "Кино",
          label: "Кино",
          selected: markInfo.type === "cinema",
          customProperties: {
            icon: CinemaIcon({ iconColor: "var(--colorPrimary)" }),
          },
        },
      ],
    },
  })}
        </div>
      </div>
      
      <div class="updateModalContent__inputGroup">
        <label class="updateModalContent__label">Комментарий пользователя</label>
        <div class="updateModalContent__field">
          <textarea type="comment" value="${markInfo.comment}" name="comment" ></textarea>
        </div>
      </div>
      
      <div class="updateModalContent__inputGroup">
        <label class="updateModalContent__label">Фотографии</label>
        <div class="updateModalContent__field">
        <div class="updateModalContent__photos">
          <div class="updateModalContent__photo">
            <img src="/assets/marksDetail/image1.jpg" alt="Фото 1" />
            <button type="button" class="updateModalContent__photoRemove">×</button>
          </div>
          <div class="updateModalContent__photo">
            <img src="/assets/marksDetail/image2.jpg" alt="Фото 1" />
            <button type="button" class="updateModalContent__photoRemove">×</button>
          </div>
          <div class="updateModalContent__photo">
            <img src="/assets/marksDetail/image3.jpg" alt="Фото 1" />
            <button type="button" class="updateModalContent__photoRemove">×</button>
          </div>
          <div class="updateModalContent__photo">
            <img src="/assets/marksDetail/image4.jpg" alt="Фото 1" />
            <button type="button" class="updateModalContent__photoRemove">×</button>
          </div>
        </div>
        </div>
      </div>
      
      <div class="updateModalContent__inputGroup">
        <label class="updateModalContent__label">Добавить фото</label>
        <div class="updateModalContent__field">
        <div class="updateModalContent__upload">
          <input
            type="file"
            id="fileUpload"
            name="photos"
            accept="image/*"
            multiple
            hidden
          />
          <label for="fileUpload" class="updateModalContent__uploadArea">
            <div class="updateModalContent__uploadHint">
                ${ImageIcon()}
              <div class="updateModalContent__uploadHint-text updateModalContent__uploadHint-text--top">Перетащите файл в эту область</div>
              <div class="updateModalContent__uploadHint-text updateModalContent__uploadHint-text--bottom">jpg, png, bmp, до 5 МБ</div>
            </div>
          </label>
        </div>
      </div>
      </div>
      
      <div class="updateModalContent__actions">
        ${Button({
          text: "Отмена",
          extraClasses: [
            "button--no-icon",
            "btn__isRedLabel",
          ],
          extraAttrs: [
            {
              name: "type",
              value: "submit",
            },
          ],
        })}
            ${Button({
          text: "Сохранить",
          iconSlot: SaveIcon(),
          extraAttrs: [
            {
              name: "type",
              value: "submit",
            },
          ],
        })}
      </div>
    </div>
  </form>
  </div>`;
};
