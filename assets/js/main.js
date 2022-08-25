import { getHellfireClubSubscriptions, subscribeToHellfireClub } from './firebase/hellfire-club.js';

const txtName = document.getElementById('txtName');
const txtEmail = document.getElementById('txtEmail');
const txtLevel = document.getElementById('txtLevel');
const txtCharacter = document.getElementById('txtCharacter');
const btnSubscribe = document.getElementById('btnSubscribe');

const subscriptionsList = document.getElementById('subscriptions');
const btnSubscriptions = document.getElementById('btnSubscriptions');
const tableContainer = document.getElementById('table-container');

btnSubscribe.addEventListener('click', async () => {
  const subscription = {
    name: txtName.value,
    email: txtEmail.value,
    level: txtLevel.value,
    character: txtCharacter.value,
  }

  const subscriptionId = await subscribeToHellfireClub(subscription);
  
  txtName.value = '';
  txtEmail.value = '';
  txtLevel.value = '';
  txtCharacter.value = '';

  alert(`Inscrito com sucesso: ${subscriptionId}`);
});

async function loadSubscriptions() {

  const subscriptions = await getHellfireClubSubscriptions();

  tableContainer.classList.remove('not-show');

  const tableHeader = `
    <tr>
      <th>Nome</th>
      <th>E-mail</th>
      <th>Level</th>
      <th>Personagem</th>
    </tr>
  `;
  
  subscriptionsList.innerHTML = tableHeader + subscriptions.map(subs => `
    <tr>
      <td>${subs.name}</td>
      <td>${subs.email}</td>
      <td>${subs.level}</td>
      <td>${subs.character}</td>
    </tr>
  `).join('');
}

btnSubscriptions.addEventListener('click', () => loadSubscriptions());
