const container = document.getElementById('main-container');
const showPAge = document.getElementById('body');
const showEpisodesButton = document.getElementById('showEpisodesButton');
const backButton = document.getElementById('backButton');

showEpisodesButton.addEventListener('click', () => {
    fetchEpisodes();
    showEpisodesButton.style.display = 'none';
    backButton.style.display = 'inline-block';

});

backButton.addEventListener('click', () => {
    container.innerHTML = '';
    backButton.style.display = 'none';
    showEpisodesButton.style.display = 'inline-block';
});

function fetchEpisodes() {
    container.innerHTML = '';

    fetch('/episodes')
        .then(response => {
            if (!response.ok) {
                throw new Error('An error occurred while fetching episodes.');
            }
            return response.json();
        })
        .then(episodes => {

            episodes.forEach(episode => {

                const card = document.createElement('div');
                card.classList.add('card');

                const image = document.createElement('img');
                image.classList.add('card-image');
                image.src = episode.image.medium;
                image.alt = episode.name;

                const content = document.createElement('div');
                content.classList.add('card-content');

                const title = document.createElement('h3');
                title.classList.add('card-title');
                title.textContent = episode.name;

                const summary = document.createElement('p');
                summary.classList.add('card-summary');
                summary.innerHTML = episode.summary;

                content.appendChild(title);
                content.appendChild(summary);

                card.appendChild(image);
                card.appendChild(content);

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}
