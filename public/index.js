const logIn = document.querySelectorAll('.reference');
const logOut = document.querySelector('.logout');
const card = document.querySelector('.card-list');
const loggedIn = document.querySelectorAll('.logged-in');
const loggedOut = document.querySelectorAll('.logged-out');
const save = document.querySelector('.save-btn');
const next = document.querySelector('.next-btn');

const doLoginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
};

logIn[0].addEventListener('click', e => {
  e.preventDefault();
  doLoginWithGoogle();
});

logIn[1].addEventListener('click', e => {
  e.preventDefault();
  doLoginWithGoogle();
});

logOut.addEventListener('click', e => {
  e.preventDefault();
  auth
    .signOut()
    .then()
    .catch(error => console.error(error));
});

const getCharacterCard = data => `
  <div class="card-box">
    <div class="box-header">
      <span>Personaje</span>
      <h1 id="name">${data.name}</h1>
    </div>
    <div class="box-body">
      <div class="box-body-infos">
        <ul>
          <li>
            <span>Altura</span>
            <p id="population">${data.height}</p>
          </li>
          <li>
            <span>Fecha de nacimiento</span>
            <p id="climate">${data.birth_year}</p>
          </li>
          <li>
            <span>Color de piel</span>
            <p id="terrain">${data.skin_color}</p>
          </li>
          <li>
            <span>Color de ojos</span>
            <p id="gravity">${data.eye_color}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
`;

let currentUserCharacter = 1;
const setupCharacters = userData => {
  if (userData.length) {
    const html = userData.map(doc => {
      const data = doc.data();
      return getCharacterCard(data);
    });
    card.innerHTML = html;
  } else {
    card.innerHTML = `<h3 class="text-center">Sin información</h3>`;
  }
};

auth.onAuthStateChanged(user => {
  if (user) {
    fs.collection('personajes')
      .get()
      .then(response => setupCharacters(response.docs));
    loggedOut.forEach(element => {
      element.style.display = 'none';
    });
    loggedIn.forEach(ele => {
      ele.style.display = 'block';
    });
  } else {
    setupCharacters([]);
    loggedOut.forEach(element => {
      element.style.display = 'contents';
    });
    loggedIn.forEach(ele => {
      ele.style.display = 'none';
    });
  }
});

let currentCharacter = 1;
const getNextCharacter = async () => {
  const resp = await fetch(`https://swapi.dev/api/people/${currentCharacter}`);
  const data = await resp.json();
  console.log(data);
  currentCharacter++;
  console.log('+++++++++++');
  console.log(currentCharacter);
  return getCharacterCard(data);
};

next.addEventListener('click', async(e) => {
  card.innerHTML = await getNextCharacter();
});
