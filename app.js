const input = document.getElementById('track1');
const submitBtn = document.getElementById('submit-btn')
const urlBase = 'https://seekin-backend-e02d70f045ca.herokuapp.com/'

function resolveTrack(trackUrl) {
    return fetch(`${urlBase}/resolveTrack?url=${trackUrl}`)
    .then(response => response.json())
    .then(data => {
        const track1Id = data.id
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
        console.log(data);
        return data;
    })
    .catch(error => {
        console.error('Erro ao buscar track:', error);
        throw error;
    })
}

submitBtn.addEventListener('click', () => {
    const trackUrl = input.value;

    resolveTrack(trackUrl)
        .then(track1Id => {
            returnPlaylists(track1Id)
                .then(playlists => {
                    const arr = playlists
                    console.log('Playlists recebidas:', arr[0]);
                })
                .catch(error => {
                    console.error('Erro ao buscar playlists:', error);
                });
        })
        .catch(error => {
            console.error('Erro ao processar a track:', error)
        })

})