const getLogButton = document.getElementById('get-log-button');
const logContainer = document.getElementById('log-container');
const errorMessage = document.getElementById('error-message');

getLogButton.addEventListener('click', () => {
    logContainer.innerHTML = "<p style='text-align: center;'>Загрузка...</p>";
    errorMessage.style.display = 'none';

    fetch('http://localhost:8000/api/battle_log')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(log => {
            logContainer.innerHTML = '';
            log.forEach(entry => {
                const logEntry = document.createElement('div');
                logEntry.className = 'log-entry';
                logEntry.textContent = entry;
                logContainer.appendChild(logEntry);
            });
        })
        .catch(error => {
            console.error('Ошибка при получении лога:', error);
            logContainer.innerHTML = '';
            errorMessage.style.display = 'block';
        });
});