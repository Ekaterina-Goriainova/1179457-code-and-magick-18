'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function() {
  openPopup();
});

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function() {
  closePopup();
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// Изменение основного персонажа

var eyesColorWizard = ['black', 'red', 'blue', 'yellow', 'green'];
var coatColorWizard = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var fireballColorWizard = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var coatWizard = document.querySelector('.setup-wizard .wizard-coat');
var coatInput = document.querySelector('input[name=coat-color]');
var eyesWizard = document.querySelector('.setup-wizard .wizard-eyes');
var eyesInput = document.querySelector('input[name=eyes-color]');
var fireballWizard = document.querySelector('.setup-fireball-wrap');
var fireballInput = document.querySelector('input[name=fireball-color]');

coatWizard.addEventListener('click', function () {
  var colorCoat = coatColorWizard[[Math.floor(Math.random() * coatColorWizard.length)]];
  coatWizard.style.fill = colorCoat;
  coatInput.value = colorCoat;
});

eyesWizard.addEventListener('click', function () {
  var colorEyes = eyesColorWizard[[Math.floor(Math.random() * eyesColorWizard.length)]];
  eyesWizard.style.fill = colorEyes;
  eyesInput.value = colorEyes;
});

fireballWizard.addEventListener('click', function () {
  var colorFireball = fireballColorWizard[[Math.floor(Math.random() * fireballColorWizard.length)]];
  fireballWizard.style.backgroundColor = colorFireball;
  fireballInput.value = colorFireball;
});

// Похожие персонажи

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomIndex = function (min, max) {
  return Math.floor((Math.random() * (max - min)) + min);
};

var createWizard = function () {
  var wizardItem = {};
  var firstNameIndex = getRandomIndex(0, firstNames.length);
  var lastNameIndex = getRandomIndex(0, lastNames.length);
  var coatColorIndex = getRandomIndex(0, coatColors.length);
  var eyesColorIndex = getRandomIndex(0, eyesColors.length);

  wizardItem.name = firstNames.splice(firstNameIndex, 1) + ' ' + lastNames.splice(lastNameIndex, 1);
  wizardItem.coatColor = coatColors.splice(coatColorIndex, 1);
  wizardItem.eyesColor = eyesColors.splice(eyesColorIndex, 1);

  return wizardItem;
};

var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards.push(createWizard());
}

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < wizards.length; k++) {
  fragment.appendChild(renderWizard(wizards[k]));
}

var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
