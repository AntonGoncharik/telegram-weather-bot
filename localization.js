const LocalizedStrings = require('localized-strings').default;

const strings = new LocalizedStrings({
    en: {
        introduction: 'Hello! Please choose your language.',
        enterName: 'Please type your name. Example: you need to write the command /name your name',
        greeting: 'Hello',
        buttonLocation: 'Location',
        location: 'I also need to know your city. Please press the button Location.',
        descriptionApp: 'I will send you the weather for the day every morning). If you want to start over, write the command /reset',
        reset: `Let's start over. Write the command /start`,
    },
    ru: {
        introduction: 'Привет! Пожалуйста, выбери язык.',
        enterName: 'Напиши пожалуйста свое имя. Пример: ты должн написать команду /name твое имя',
        greeting: 'Привет',
        buttonLocation: 'Местонахождение',
        location: 'Еще надо узнать твой город. Нажми пожалуйста на кнопку Местонахождение.',
        descriptionApp: 'Я буду каждое утро присылать тебе погоду на день). Если хочешь начать заново напиши команду /reset',
        reset: 'Давай начнем заново. Напиши команду /start',
    }
});

module.exports = strings;