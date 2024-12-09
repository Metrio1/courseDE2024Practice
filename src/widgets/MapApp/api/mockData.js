export const filerCfg = {
  inputs: {
    search: {
      value: null,
      isChecked: "null",
      isDisabled: "null",
    },
    bars: {
      value: null,
      isChecked: true,
      isDisabled: false,
    },
    restaurant: {
      value: null,
      isChecked: true,
      isDisabled: false,
    },
    club: {
      value: null,
      isChecked: true,
      isDisabled: false,
    },
    theatre: {
      value: null,
      isChecked: true,
      isDisabled: false,
    },
    cinema: {
      value: null,
      isChecked: true,
      isDisabled: false,
    },
  },
};

export const listMarsMockResponse = {
  marks: [
    { id: "1", type: "bars", cords: [53.5, 58.9] },
    { id: "2", type: "restaurant", cords: [54.5, 57.9] },
    { id: "3", type: "club", cords: [53.5, 57.9] },
    { id: "4", type: "theatre", cords: [52.5, 57.9] },
    { id: "5", type: "cinema", cords: [51.5, 57.9] },
  ],
};

export const marksDetailMockResponse = [
  {
    id: "1",
    title: "Al Capone",
    type: "bars",
    address: {
      city: "Челябинск",
      house: "12a",
      street: "ул. Братьев Кашириных",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями",
    images: [
        "/assets/marksDetail/image1.jpg",
        "/assets/marksDetail/image2.jpg",
        "/assets/marksDetail/image3.jpg",
        "/assets/marksDetail/image4.jpg",
    ],
  },
  {
    id: "2",
    title: "Al Capone 2",
    type: "restaurant",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/assets/marksDetail/image1.jpg",
      "/assets/marksDetail/image2.jpg",
      "/assets/marksDetail/image3.jpg",
      "/assets/marksDetail/image4.jpg",
    ],
  },
  {
    id: "3",
    title: "Al Capone 2",
    type: "club",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/assets/marksDetail/image1.jpg",
      "/assets/marksDetail/image2.jpg",
      "/assets/marksDetail/image3.jpg",
      "/assets/marksDetail/image4.jpg",
    ],
  },
  {
    id: "4",
    title: "Al Capone 3",
    type: "theatre",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
  {
    id: "5",
    title: "Al Capone 4",
    type: "cinema",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
];
