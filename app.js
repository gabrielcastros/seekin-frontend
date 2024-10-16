const input = document.getElementById('track1');
const submitBtn = document.getElementById('submit-btn');
const playlistList = document.querySelector('.list-group');
const addTrackBtn = document.getElementById('add-track-btn');
const inputWrapper = document.querySelector('.input-wrapper');
// const urlBase = 'https://seekin-backend-e02d70f045ca.herokuapp.com'
const urlBase = 'http://localhost:3000';

function resolveTrack(trackUrl) {
    return fetch(`${urlBase}/resolveTrack?url=${trackUrl}`)
    .then(response => response.json())
    .then(data => {
        const track1Id = data.id;
        return track1Id;
    })
    .catch(error => {
        console.error('Erro ao buscar track:', error);
        throw error;
    })
}

function returnPlaylists(trackId) {
    return fetch(`${urlBase}/findPlaylistWithTrack?id=${trackId}&offset=0`)
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Erro ao buscar track:', error);
        throw error;
    })
}
function resolveTrackAndPlaylists(trackUrl) {
    return resolveTrack(trackUrl)
        .then(track1Id => returnPlaylists(track1Id));
}

function fetchPlaylists(trackUrl) {
    resolveTrackAndPlaylists(trackUrl)
        .then(playlists => {
            addNewPlaylist(playlists);
            input.value = '';
            input.placeholder = 'Insira a URL de outra track (opcional)';
        })
        .catch(error => {
            console.error('Erro ao buscar playlists:', error);
        });
    
}

function addNewPlaylist(playlists) {
    const matchingPlaylists = playlists.collection
    const playlistIds = []
    matchingPlaylists.forEach(playlist => {
        console.log(playlist);
        const newPlaylist = document.createElement('li');
        newPlaylist.classList.add(
            'list-group-item',
            'd-flex',
            'justify-content-between',
            'align-items-center',
            'list-group-item-action'
        );
        newPlaylist.textContent = playlist.title;
        playlistList.appendChild(newPlaylist);

        const newButton = document.createElement('button');
        newButton.classList.add(
            'btn',
            'btn-sm',
            'btn-dark',
            'text-white',
            'px-3'
        );
        newButton.textContent = 'Acessar'
        newPlaylist.appendChild(newButton);

        const redirectUrl = playlist.permalink_url;
        newButton.addEventListener('click', () => {
            window.open(redirectUrl, '_blank');
        });
    });
}

submitBtn.addEventListener('click', () => {
    const trackUrl = input.value;
    fetchPlaylists(trackUrl)
})

addTrackBtn.addEventListener('click', () => {
    addTrackBtn.style.display = 'none';

    /* const inputGroup = document.createElement('div');
    inputGroup.classList.add(
        'input-group',
        'mt-3'
    );
    
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('id', 'track2');
    newInput.setAttribute('class', 'form-control');
    newInput.setAttribute('placeholder', 'Insira a URL de uma outra track');

    const newButton = document.createElement('button')
    newButton.setAttribute('id', 'submit-btn');
    newButton.classList.add(
        'btn', 
        'btn-info'
    );
    newButton.textContent = 'Find'

    inputGroup.appendChild(newInput)
    inputGroup.appendChild(newButton)
    inputWrapper.appendChild(inputGroup) */

})