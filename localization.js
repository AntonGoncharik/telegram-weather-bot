const LocalizedStrings = require('localized-strings').default;

const strings = new LocalizedStrings({
    en: {
        introduction: 'Hello! Please choose your language.',
        enterName: 'Please type your name. Example: you need to write the command /name your name.',
        greeting: 'Hello',
        buttonLocation: 'My location',
        location: 'I also need to know your city. Please press the button My location.',
        descriptionApp: 'I will send you the weather for the day every morning). If you want to start over, write the command /reset.',
        reset: `Let's start over. Write the command /start.`,
        hasUser: `You are exist, please try another command or write the command /reset.`,
        hasNotUser: `I do not know you yet, please write a command /start.`,
        error: `Oops! Something went wrong! Try again!`,
        end: `Everything is ready to receive the weather! I will send you the weather for the day every morning! Thank you!`,
        date: 'Date',
        temp: 'Temp.',
        tempFeelsLike: 'Feels like',
        pressure: 'Pressure',
        humidity: 'Humidity',
        clouds: 'Clouds',
        currentWeather: 'Current weather',
        forecastWeather: 'Forecast weather',
        windSpeed: 'Weend speed',
        description: 'Description',
        metreSec: 'metre/sec',
        hPa: 'hPa',
    },
    ru: {
        introduction: 'Привет! Пожалуйста, выбери язык.',
        enterName: 'Напиши пожалуйста свое имя. Пример: ты должен написать команду /name твое имя.',
        greeting: 'Привет',
        buttonLocation: 'Мое местонахождение',
        location: 'Еще надо узнать твой город. Нажми пожалуйста на кнопку Мое местонахождение.',
        descriptionApp: 'Я буду каждое утро присылать тебе погоду на день). Если хочешь начать заново напиши команду /reset.',
        reset: 'Давай начнем заново. Напиши команду /start.',
        hasUser: 'Я тебя уже знаю, попробуй ввести другую команду или напиши команду /reset.',
        hasNotUser: 'Я тебя еще не знаю, напиши пожалуйста команду /start.',
        error: 'Упс! Что-то пошло не так! Попробуй еще раз!',
        end: 'Все готово для получения погоды! Я буду присылать тебе каждое утро погоду на день! Спасибо!',
        date: 'Дата',
        temp: 'Темп.',
        tempFeelsLike: 'Ощущ.',
        pressure: 'Давление',
        humidity: 'Влажность',
        clouds: 'Облачность',
        currentWeather: 'Погода сейчас',
        forecastWeather: 'Прогноз погоды',
        windSpeed: 'Скорость ветра',
        description: 'Описание',
        metreSec: 'м/с',
        hPa: 'гПа',
    },
});

module.exports = strings;