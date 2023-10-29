import { LocaleType } from '@/shared/locales/en'

export const ru: LocaleType = {
  zodSchema: {
    minNumberOfCharacters: 'Минимальное количество символов: ',
    maxNumberOfCharacters: 'Максимальное количество символов: ',
    userNameRegex: 'Должно содержать только символы A-Z, a-z, 0-9, тире и подчеркивания',
    firstLastNameRegex: 'Должно содержать только символы A-Z, a-z, А-Я, а-я',
    email: 'Email должен соответствовать формату example@example.com',
    passwordRegex: 'Пароль должен содержать ',
    passwordRefine: 'Пароли должны совпадать',
    termsConfirm: 'Подтвердите условия',
  },
  header: {
    inctagram: 'Инктаграм',
    ru: 'Русский',
    en: 'English',
  },
  sidebar: {
    home: 'Главная',
    create: 'Создать',
    myProfile: 'Мой профиль',
    messenger: 'Мессенджер',
    search: 'Поиск',
    statistics: 'Статистика',
    favorites: 'Избранное',
    logout: 'Выйти',
    logoutModalDescription: 'Вы действительно хотите выйти из своей учетной записи',
    yes: 'Да',
    no: 'Нет',
  },
  myProfile: {
    tabs: {
      generalInformation: 'Общая информация',
      devices: 'Устройства',
      accountManagement: 'Управление аккаунтом',
      myPayments: 'Мои платежи',
    },
    generalInformation: {
      userName: 'Имя пользователя',
      placeholderUserName: 'введите имя пользователя',
      firstName: 'Имя',
      placeholderFirstName: 'введите свое имя',
      lastName: 'Фамилия',
      placeholderLastName: 'введите свою фамилию',
      dateOfBirth: 'Дата рождения',
      month: {
        jan: 'Январь',
        feb: 'Февраль',
        mar: 'Март',
        apr: 'Апрель',
        may: 'Май',
        jun: 'Июнь',
        jul: 'Июль',
        aug: 'Август',
        sep: 'Сентябрь',
        oct: 'Октябрь',
        nov: 'Ноябрь',
        dec: 'Декабрь',
      },
      placeholderDateOfBirth: 'дд.мм.гггг',
      selectYourCity: 'Выберите свой город',
      cities: {
        minsk: 'Минск',
        grodno: 'Гродно',
        brest: 'Брест',
      },
      placeholderCity: 'Город',
      aboutMe: 'Обо мне',
      placeholderAboutMe: 'Расскажите нам о себе',
      saveChanges: 'Сохранить изменения',
      addAProfilePhoto: 'Добавить фотографию профиля',
      photoModal: {
        addAProfilePhoto: 'Добавить фотографию профиля',
        errorType: 'Формат загружаемой фотографии должен быть PNG и JPEG.',
        errorSize: 'Размер фотографии должен быть меньше 10 МБ',
        selectFromComputer: 'Выбрать с компьютера',
        save: 'Сохранить',
      },
      deletePhotoModal: {
        deletePhoto: 'Удалить фото',
        areYouSure: 'Вы уверены, что хотите удалить фотографию?',
        yes: 'Да',
        no: 'Нет',
      },
    },
    profilePage: {
      following: 'Подписки',
      followers: 'Подписчики',
      publications: 'Публикации',
      profileSettings: 'Настройки профиля',
    },
  },
  auth: {
    signIn: {
      signIn: 'Войти',
      email: 'Адрес электронной почты',
      signInServerError:
        'Адрес электронной почты или пароль неверны. Попробуйте еще раз, пожалуйста',
      password: 'Пароль',
      passwordPlaceholder: 'введите ваш пароль',
      forgotPassword: 'Забыл пароль',
      question: `У вас нет учетной записи?`,
      signUp: 'Зарегистрироваться',
    },
    signUp: {
      signUp: 'Регистрация',
      userName: 'Имя пользователя',
      userNamePlaceholder: 'введите ваше имя пользователя',
      userNameExistError: 'Пользователь с таким именем пользователя уже зарегистрирован',
      email: 'Адрес электронной почты',
      emailPlaceholder: 'введите ваш адрес электронной почты',
      emailExistError: 'Пользователь с этим адресом электронной почты уже зарегистрирован',
      password: 'Пароль',
      passwordPlaceholder: 'введите ваш пароль',
      passwordConfirmation: 'Подтверждение пароля',
      passwordConfirmationPlaceholder: 'введите ваш пароль снова',
      forgotPassword: 'Забыл пароль',
      checkboxOneChart: 'я согласен с',
      termsOfService: 'Условия использования',
      checkboxTwoChart: 'и',
      privacyPolicy: 'Политика конфиденциальности',
      question: `У вас есть аккаунт?`,
      signIn: 'Войти',
      modal: 'Письмо отправлено',
      modalDescription: 'Мы отправили ссылку для подтверждения вашего электронного письма на',
    },
    forgotPassword: {
      forgotPassword: 'Забыл пароль',
      email: 'Адрес электронной почты',
      description: 'Введите свой адрес электронной почты и мы вышлем вам дальнейшие инструкции',
      sendLink: 'Отправить ссылку',
      backToSignIn: 'Вернуться к входу',
      modal: 'Письмо отправлено',
      modalDescription: 'Мы отправили ссылку для подтверждения вашего электронного письма на',
    },
    createNewPassword: {
      newPassword: 'Новый пароль',
      newPasswordPlaceholder: 'введите ваш пароль',
      passwordConfirmation: 'Подтверждение пароля',
      passwordConfirmationPlaceholder: 'введите ваш пароль снова',
      description: 'Ваш пароль должен содержать от 6 до 20 символов',
      createNewPassword: 'Создать новый пароль',
    },
    badRecoveryLink: {
      linkExpired: 'Срок действия ссылки для подтверждения электронной почты истек',
      description:
        'Похоже, срок действия ссылки для подтверждения истек. Не волнуйтесь, мы можем отправить ссылку еще раз',
      resendLink: 'Отправить ссылку повторно',
    },
    congratulations: {
      congratulations: 'Поздравления!',
      description: 'Ваше сообщение было подтверждено',
      signIn: 'Войти',
    },
    privacy: {
      backToSignUp: 'Вернуться к регистрации',
    },
    error404: {
      pageNotFound: 'Извините! Страница не найдена!',
      backToMain: 'Вернуться на главную',
    },
  },
}
