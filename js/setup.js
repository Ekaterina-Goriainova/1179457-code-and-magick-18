'use strict';

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

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
