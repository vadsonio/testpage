import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

VueI18n.prototype.getChoiceIndex = function (choice, choicesLength) {
  // this === VueI18n instance, so the locale property also exists here
  if (this.locale !== 'ru') {
    // proceed to the default implementation
  }

  if (choice === 1) {
    return 0;
  }
  if (choice === 2) {
    return 1;
  }

  if (choice === 3) {
    return 2;
  }

  if (choice === 4) {
    return 3;
  }

  if (choice === 5) {
    return 4;
  }

  if(choice>5){
    return 4;
  }
 /* const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;

  if (!teen && endsWithOne) {
    return 1;
  }

  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2;
  }

  return (choicesLength < 4) ? 2 : 3;*/
}


export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'ru',
  messages: {
    EN:{
      nav:{
        navHome: "home",
        navAboutUs: "about us",
        navApartments: "our apartments",
        navReviews: "reviews",
        navBlog: "blog",
        navContact: "contact us"
      },
      btns:{
        sign: "sign up",
        learnMore: "learn more",
        search: "search",
        popularApartments: {
          perDay: "Per Day",
          perMonth: "Per Month"
        },
        viewMore: "view more"
      },
      proposes:{
        saveSubText: "Save 10% on",
        saveMainText: "europe and britain"
      },
      labels: {
        cityChoose: "City, country, or apartment",
        peopleChoose: "Guest",
        roomChoose: "Room",
        checkIn: "Check-in",
        durationChoose: "Duration",
        checkOut: "Check-out"
      },
      placeholders:{
        cityChoose: "Start typing...",
        peopleChoose: "Choose guests...",
        roomChoose: "Choose rooms...",
        datePickerPlaceholder: "Choose date...",
        durationChoose: "Choose duration..."
      },
      placeholdersAdd:{
        peopleChoose: "{n} people",
        roomChoose: "{n} room",
        durationChoose: "{n} days"
      },
      datePicker:{
        month: {
          jan: "Jan"
        }
      },
      headings:{
        citiesCatalog:{
          bg: "explore, stay, or work",
          main: "experience the finest cities"
        },
        popularApartments:{
          bg: "our offers are great",
          main: "popular apartments"
        },
        dialogues:{
          bg: "answer will be soon",
          main: "you can write us"
        }
      }
    },
    RU:{
      nav:{
        navHome: "главная",
        navAboutUs: "о нас",
        navApartments: "наши предложения",
        navReviews: "отзывы",
        navBlog: "блог",
        navContact: "контакты"
      },
      btns:{
        sign: "войти",
        learnMore: "узнать больше",
        search: "поиск",
        popularApartments: {
          perDay: "За День",
          perMonth: "За Месяц"
        },
        viewMore: "показать еще"
      },
      proposes:{
        saveSubText: "Экономьте 10% на",
        saveMainText: "Европе и Британии"
      },
      labels: {
        cityChoose: "Город, страна, или апартаменты",
        peopleChoose: "Гости",
        roomChoose: "Кол-во комнат",
        checkIn: "Въезд",
        durationChoose: "Длительность",
        checkOut: "Выезд"
      },
      placeholders:{
        cityChoose: "Начните печатать...",
        peopleChoose: "Кол-во гостей...",
        roomChoose: "Кол-во комнат...",
        datePickerPlaceholder: "Дата...",
        durationChoose: "Кол-во дней..."
      },
      placeholdersAdd:{
        peopleChoose: '{n} гость | {n} гостя | {n} гостя | {n} гостя | {n} гостей',
        roomChoose: '{n} комната | {n} комнаты | {n} комнаты | {n} комнаты | {n} комнат',
        durationChoose: "{n} день | {n} дня | {n} дня | {n} дня | {n} дней"
      },
      datePicker:{
        month: {
          jan: "Янв"
        }
      },
      headings:{
        citiesCatalog:{
          bg: "путешествие, отдых или работа",
          main: "посещайте лучшие города"
        },
        popularApartments:{
          bg: "наши предложения великолепны",
          main: "популярные апартаменты"
        },
        dialogues:{
          bg: "ответим очень быстро",
          main: "напишите нам"
        }
      }
    },
    UKR:{
      nav:{
        navHome: "головна",
        navAboutUs: "про нас",
        navApartments: "де прилягти",
        navReviews: "вiдгуки",
        navBlog: "блог",
        navContact: "контакти"
      },
      btns:{
        sign: "увiйти",
        learnMore: "дізнатися більше",
        search: "шукати",
        popularApartments: {
          perDay: "За День",
          perMonth: "За Місяць"
        },
        viewMore: "показати ще"
      },
      proposes:{
        saveSubText: "Економте 10% на",
        saveMainText: "Європі і Британії"
      },
      labels: {
        cityChoose: "Місто, країна чи апартаменти",
        peopleChoose: "Гости",
        roomChoose: "Кiл-ть комнат",
        checkIn: "В'їзд",
        durationChoose: "Тривалість",
        checkOut: "Виїзд"
      },
      placeholders:{
        cityChoose: "Почніть друкувати ...",
        peopleChoose: "Кіл-ть гостей ...",
        roomChoose: "Кіл-ть кімнат...",
        datePickerPlaceholder: "Дата...",
        durationChoose: "Кіл-ть днів..."
      },
      placeholdersAdd:{
        peopleChoose: '{n} гість | {n} гостей | {n} гостей',
        roomChoose: '{n} кімната | {n} кімнат | {n} кімнат',
        durationChoose: "{n} день | {n} дня | {n} днiв"
      },
      headings:{
        citiesCatalog:{
          bg: "подорож, відпочинок або робота",
          main: "відвідуйте найкращі міста"
        },
        popularApartments:{
          bg: "наші пропозиції прекрасні",
          main: "популярні апартаменти"
        },
        dialogues:{
          bg: "відповідаємо швидко",
          main: "напишiть нам"
        }
      }
    }
  }
});

