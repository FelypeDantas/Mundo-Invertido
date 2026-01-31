// ==========================
// ELEMENTOS DO DOM
// ==========================
const btnSubscribe = document.getElementById("btnSubscribe");

const txtName = document.getElementById("txtName");
const txtEmail = document.getElementById("txtEmail");
const txtLevel = document.getElementById("txtLevel");
const txtCharacter = document.getElementById("txtCharacter");

const formSection = document.getElementById("section-form");

// ==========================
// EVENTOS
// ==========================
btnSubscribe.addEventListener("click", handleSubmit);

// ==========================
// FUNÇÕES PRINCIPAIS
// ==========================
function handleSubmit() {
  if (!validateForm()) return;

  const characterData = createCharacter();
  saveCharacter(characterData);
  renderCharacterSheet(characterData);
  clearForm();
}

// ==========================
// VALIDAÇÃO
// ==========================
function validateForm() {
  if (
    !txtName.value ||
    !txtEmail.value ||
    !txtLevel.value ||
    !txtCharacter.value
  ) {
    alert("⚠️ Todos os campos são obrigatórios!");
    return false;
  }

  if (isNaN(txtLevel.value) || txtLevel.value <= 0) {
    alert("🎲 Level inválido. Use um número positivo.");
    return false;
  }

  return true;
}

// ==========================
// CRIAÇÃO DO PERSONAGEM
// ==========================
function createCharacter() {
  const level = Number(txtLevel.value);

  return {
    name: txtName.value,
    email: txtEmail.value,
    level,
    backstory: txtCharacter.value,
    class: getClassByLevel(level),
    alignment: getAlignment(),
    createdAt: new Date().toLocaleDateString()
  };
}

function getClassByLevel(level) {
  if (level < 5) return "Aprendiz do D20";
  if (level < 10) return "Aventureiro de Hawkings";
  if (level < 20) return "Veterano do Mundo Invertido";
  return "Lenda Viva 🐉";
}

function getAlignment() {
  return document.body.classList.contains("dark-theme")
    ? "Caótico Invertido 😈"
    : "Heroico Luminoso ✨";
}

// ==========================
// STORAGE
// ==========================
function saveCharacter(character) {
  const characters = JSON.parse(localStorage.getItem("characters")) || [];
  characters.push(character);
  localStorage.setItem("characters", JSON.stringify(characters));
}

// ==========================
// RENDERIZAÇÃO DA FICHA
// ==========================
function renderCharacterSheet(character) {
  removeOldSheet();

  const sheet = document.createElement("div");
  sheet.classList.add("character-sheet");

  sheet.innerHTML = `
    <h3>📜 Ficha do Personagem</h3>

    <p><strong>Nome:</strong> ${character.name}</p>
    <p><strong>Classe:</strong> ${character.class}</p>
    <p><strong>Level:</strong> ${character.level}</p>
    <p><strong>Alinhamento:</strong> ${character.alignment}</p>

    <div class="character-story">
      <strong>História:</strong>
      <p>${character.backstory}</p>
    </div>

    <span class="character-date">
      Criado em: ${character.createdAt}
    </span>
  `;

  formSection.appendChild(sheet);
}

function removeOldSheet() {
  const oldSheet = document.querySelector(".character-sheet");
  if (oldSheet) oldSheet.remove();
}

// ==========================
// LIMPAR FORM
// ==========================
function clearForm() {
  txtName.value = "";
  txtEmail.value = "";
  txtLevel.value = "";
  txtCharacter.value = "";
}
