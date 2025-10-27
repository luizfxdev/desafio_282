// Dados dos participantes do torneio
const participants = [
  { nome: 'Velha Turbo', velocidade: 100, clã: 'Bruxas' },
  { nome: 'Ken Lobisomem', velocidade: 93, clã: 'Monstros' },
  { nome: 'Spectra', velocidade: 67, clã: 'Espectros' },
  { nome: 'Zumbizilla', velocidade: 72, clã: 'Monstros' },
  { nome: 'Morana', velocidade: 88, clã: 'Bruxas' }
];

// Função principal para estratégia do torneio
function estrategia_torneio_sombrio(participantes) {
  // Agrupar por clã
  const clanGroups = {};

  participantes.forEach(participante => {
    const clan = participante.clã;
    if (!clanGroups[clan]) {
      clanGroups[clan] = [];
    }
    clanGroups[clan].push(participante);
  });

  // Ordenar cada grupo por velocidade (decrescente)
  const result = [];
  for (const clan in clanGroups) {
    const sortedGroup = clanGroups[clan].sort((a, b) => b.velocidade - a.velocidade);
    result.push(sortedGroup);
  }

  return result;
}

// Elementos do DOM
const startButton = document.getElementById('start-race');
const resetButton = document.getElementById('reset-race');
const resultSection = document.getElementById('result-section');
const calculationDiv = document.getElementById('calculation');
const raceAnimationDiv = document.getElementById('race-animation');
const finalOutputDiv = document.getElementById('final-output');
const playAudioBtn = document.getElementById('play-audio');
const pauseAudioBtn = document.getElementById('pause-audio');
const themeAudio = document.getElementById('theme-audio');

// Controles de áudio
playAudioBtn.addEventListener('click', () => {
  themeAudio.play();
});

pauseAudioBtn.addEventListener('click', () => {
  themeAudio.pause();
});

// Mapear cores para cada participante
const colorMap = {
  'Velha Turbo': 'velha-turbo',
  'Ken Lobisomem': 'ken-lobisomem',
  Spectra: 'spectra',
  Zumbizilla: 'zumbizilla',
  Morana: 'morana'
};

// Função para exibir o cálculo detalhado
function displayCalculation() {
  calculationDiv.innerHTML = `
        <h4>🔍 Passo a Passo da Validação:</h4>
        <ul>
            <li><strong>Passo 1:</strong> Agrupar criaturas por clã</li>
            <li>📁 Bruxas: Velha Turbo (100), Morana (88)</li>
            <li>📁 Monstros: Ken Lobisomem (93), Zumbizilla (72)</li>
            <li>📁 Espectros: Spectra (67)</li>
            <li><strong>Passo 2:</strong> Ordenar cada grupo por velocidade (maior → menor)</li>
            <li>📊 Bruxas: [Velha Turbo: 100, Morana: 88]</li>
            <li>📊 Monstros: [Ken Lobisomem: 93, Zumbizilla: 72]</li>
            <li>📊 Espectros: [Spectra: 67]</li>
            <li><strong>Passo 3:</strong> Retornar lista de listas agrupadas</li>
        </ul>
    `;
}

// Função para criar animação da corrida
function createRaceAnimation(result) {
  raceAnimationDiv.innerHTML = '<h4 style="color: #ff8888; margin-bottom: 20px;">🏁 Corrida em Andamento:</h4>';

  result.forEach((group, index) => {
    const clanDiv = document.createElement('div');
    clanDiv.className = 'clan-group';

    const clanName = group[0].clã;
    const clanTitle = document.createElement('div');
    clanTitle.className = 'clan-title';
    clanTitle.textContent = `⚡ Clã: ${clanName}`;
    clanDiv.appendChild(clanTitle);

    group.forEach((racer, racerIndex) => {
      const racerDiv = document.createElement('div');
      racerDiv.className = 'racer';
      racerDiv.style.animationDelay = `${(index * group.length + racerIndex) * 0.3}s`;

      const racerInfo = document.createElement('div');
      racerInfo.className = 'racer-info';
      racerInfo.textContent = `${racer.nome}`;

      const raceTrack = document.createElement('div');
      raceTrack.className = 'race-track';

      // Adicionar linha de chegada
      const finishLine = document.createElement('div');
      finishLine.className = 'finish-line';
      raceTrack.appendChild(finishLine);

      const raceProgress = document.createElement('div');
      raceProgress.className = `race-progress ${colorMap[racer.nome]}`;

      // Calcular largura baseada na velocidade (100 = 100%)
      const progressWidth = racer.velocidade;
      raceProgress.style.width = `${progressWidth}%`;
      raceProgress.style.animationDelay = `${(index * group.length + racerIndex) * 0.3}s`;

      const speedLabel = document.createElement('span');
      speedLabel.className = 'speed-label';
      speedLabel.textContent = `${racer.velocidade}`;
      raceProgress.appendChild(speedLabel);

      raceTrack.appendChild(raceProgress);
      racerDiv.appendChild(racerInfo);
      racerDiv.appendChild(raceTrack);
      clanDiv.appendChild(racerDiv);
    });

    raceAnimationDiv.appendChild(clanDiv);
  });
}

// Função para exibir pódio
function displayPodium(result) {
  // Achatar todas as criaturas em uma única lista
  const allRacers = [];
  result.forEach(group => {
    group.forEach(racer => {
      allRacers.push(racer);
    });
  });

  // Ordenar por velocidade decrescente
  allRacers.sort((a, b) => b.velocidade - a.velocidade);

  // Medalhas
  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

  // Criar HTML do pódio
  let podiumHTML = '<h4>🏆 Pódio Final - Classificação Geral:</h4><div class="podium-container">';

  allRacers.forEach((racer, index) => {
    const position = index + 1;
    const medal = medals[index] || `${position}º`;
    const kmh = (racer.velocidade * 3.6).toFixed(1);

    podiumHTML += `
            <div class="podium-position" style="animation-delay: ${index * 0.15}s">
                <div class="position-medal">${medal}</div>
                <div class="position-info">
                    <div class="position-rank">${position}º Lugar</div>
                    <div class="position-name">${racer.nome}</div>
                    <div class="position-details">
                        <span class="position-speed">⚡ Velocidade: ${racer.velocidade} (${kmh} km/h)</span>
                        <span class="position-clan">🏴 Clã: ${racer.clã}</span>
                    </div>
                </div>
            </div>
        `;
  });

  podiumHTML += '</div>';
  finalOutputDiv.innerHTML = podiumHTML;
}

// Evento do botão INICIAR CORRIDA
startButton.addEventListener('click', () => {
  // Executar a função estratégica
  const result = estrategia_torneio_sombrio(participants);

  // Exibir seção de resultado
  resultSection.classList.remove('hidden');

  // Exibir cálculo detalhado
  displayCalculation();

  // Criar animação da corrida
  createRaceAnimation(result);

  // Exibir pódio
  displayPodium(result);

  // Scroll suave até o resultado
  setTimeout(() => {
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
});

// Evento do botão RETORNAR
resetButton.addEventListener('click', () => {
  // Ocultar seção de resultado com animação
  resultSection.style.opacity = '0';
  resultSection.style.transform = 'scale(0.95)';

  setTimeout(() => {
    resultSection.classList.add('hidden');
    resultSection.style.opacity = '1';
    resultSection.style.transform = 'scale(1)';

    // Limpar conteúdo
    calculationDiv.innerHTML = '';
    raceAnimationDiv.innerHTML = '';
    finalOutputDiv.innerHTML = '';
  }, 300);
});
