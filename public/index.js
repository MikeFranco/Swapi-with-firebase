const logIn = document.querySelectorAll('.reference');
const logOut = document.querySelector('.logout');
const card = document.querySelector('.card-list');
const loggedIn = document.querySelectorAll('.logged-in');
const loggedOut = document.querySelectorAll('.logged-out');

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

const setupCharacters = userData => {
  if (userData.length) {
    const html = userData.map(doc => {
      const data = doc.data();
      return `
        <li class="list-group-item list-group-item-action">
          <h2>${data.name}</h2>
          <h3>${data.height}</h3>
          <h3>${data.skin_color}</h3>
          <h3>${data.birthday}</h3>
        </li>
      `;
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
