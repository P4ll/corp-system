export default {
    graph: {
        scale: "Масштаб",
        change: "Редактировать",
        add: "Добавить",
        addFunc: "Добавить функцию",
        close: "Закрыть",
        title: "График функций",
        addDialog: {
            funcName: "Имя функции",
            addHint: "Можно оставить пустым",
            funcsParms: "Параметры функций",
            notANumber: "Не числовое значение",
            color: "Цвет",
            colorError: "Неправильное значение цвета",
            colorHint: "Введите цвет в HEX формате",
        },
        updateDialog: {
            updateFunc: "Редактировать функцию",
            selectFunc: "Выбрать функцию",
            delFuncErr: "Не была выбрана функция для удаления",
            delFunc: "Удалить",
            delSucc: "функция успешно удалена",
        },
    },
    menu: {
        siteTitle: "Лабораторная работа",
        enter: "Войти",
        reg: "Зарегестрироваться",
        hello: "Вы вошли как",
        exit: "Выйти",
        funcChart: "График функций",
        userProfile: "Профиль пользователя",
        nt: {
            exit: "Вы успешно вышли из системы",
        },
        lang: {
            ru: "Русский",
            en: "Английский",
        },
    },
    auth: {
        title: "Страница регистрации",
        login: "Логин",
        name: "Имя",
        pass: "Пароль",
        repPass: "Повторите пароль",
        country: "Страна",
        age: "Возраст",
        reg: "Зарегистрироваться",
        countries: ["Россия", "Украина", "Белорусь", "Казахстан"],
        isAdm: "Админ?",
        formErrors: {
            passEq: "Пароли должны совпадать",
            country: "Страна не была выбрана",
            less3sym: "Введено меньше 3-х символов",
            latinOnly: "Только латинские символы",
            noCyr: "Нельзя использовать кириллицу",
            ageInp: "Введите возраст",
            notANumber: "Введено не число",
            wrNumb: "Возраст не принадлежит отрезку [1, 150]",
            notAInt: "Введен нецелочисленный возраст",
        },
        nt: {
            usedLogin: "Такой логин уже используется",
            succesReg: "Пользователь успешно зарегистрирован",
            authRed: "Автоматический переход на страницу входа",
            stOnPage: "Нажмите <b>Отмена</b>, чтобы остаться на странице",
            someInpIsWrong: "Какие-то поля не заполнены / заполнены неверно",
        },
    },
    usrData: {
        title: "Панель настройки пользователя",
        update: "Редактировать",
        endUpdate: "Закончить редактирование",
        changePass: "Изменить пароль",
        oldPass: "Старый пароль",
        newPass: "Новый пароль",
        cancel: "Отмена",
        save: "Сохранить",
        delUser: "Удалить профиль",
        uSel: "Выберите пользователя",
        nt: {
            inpOldPass: "Введите старый пароль",
            oldPassWrong: "Старый пароль неверен",
            success: "Пароль успешно сменен",
            isOk: "Вы уверены?",
            delMess: "Удаление нельзя будет отменить. Вы уверены?",
        },
    },
    log: {
        title: "Вход",
        nt: {
            succExit: "Вы успешно вышли из системы",
            succEnter: "Вы успешно вошли в систему",
            wrPass: "Неправильный пароль",
            wrLog: "Пользователь с таким логином не найден",
        },
    },
    errorPage: {
        error404: "Ошибка 404",
        pageNF: "Страница не найдена",
        onMain: "На главную",
    },
};
