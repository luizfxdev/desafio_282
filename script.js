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

// Função para criar animação da corrida circular
function createRaceAnimation(result) {
  raceAnimationDiv.innerHTML =
    '<h4 style="color: #ff8888; margin-bottom: 20px; text-align: center;">🏁 Corrida em Andamento - Pista Única:</h4>';

  // Criar container da pista única para TODOS os participantes
  const mainTrackContainer = document.createElement('div');
  mainTrackContainer.className = 'race-track-circular';

  // Criar fundo da pista
  const trackBackground = document.createElement('div');
  trackBackground.className = 'track-background';
  mainTrackContainer.appendChild(trackBackground);

  // Criar linhas da pista
  const trackLines = document.createElement('div');
  trackLines.className = 'track-lines';
  for (let i = 0; i < 4; i++) {
    const line = document.createElement('div');
    line.className = 'track-line';
    trackLines.appendChild(line);
  }
  mainTrackContainer.appendChild(trackLines);

  // Criar linha de chegada
  const finishLine = document.createElement('div');
  finishLine.className = 'finish-line-circular';
  mainTrackContainer.appendChild(finishLine);

  // Coletar TODOS os participantes de TODOS os clãs
  const allRacers = [];
  result.forEach(group => {
    group.forEach(racer => {
      allRacers.push(racer);
    });
  });

  // Emojis para cada criatura
  const emojiMap = {
    'Velha Turbo': '👵',
    'Ken Lobisomem': '🐺',
    Spectra: '👻',
    Zumbizilla: '🧟',
    Morana: '🧙'
  };

  // Adicionar TODOS os corredores na MESMA pista
  allRacers.forEach((racer, index) => {
    const racerDiv = document.createElement('div');
    racerDiv.className = `racer-on-track ${colorMap[racer.nome]}`;
    racerDiv.textContent = emojiMap[racer.nome] || '👤';

    // Calcular duração da animação baseada na velocidade
    // Velocidade 100 = 4s, Velocidade 67 = ~6s
    const baseTime = 10; // tempo base em segundos
    const animationDuration = baseTime - (racer.velocidade / 100) * 6;

    // Aplicar animação com duração proporcional à velocidade
    racerDiv.style.animationDuration = `${animationDuration}s`;
    racerDiv.style.animationDelay = `${index * 0.2}s`;
    racerDiv.style.animationTimingFunction = 'linear';
    racerDiv.style.animationFillMode = 'forwards';

    // Definir animação baseada na velocidade
    if (racer.velocidade >= 95) {
      racerDiv.style.animationName = 'raceVeryFast';
    } else if (racer.velocidade >= 85) {
      racerDiv.style.animationName = 'raceFast';
    } else if (racer.velocidade >= 75) {
      racerDiv.style.animationName = 'raceMedium';
    } else if (racer.velocidade >= 70) {
      racerDiv.style.animationName = 'raceSlow';
    } else {
      racerDiv.style.animationName = 'raceVerySlow';
    }

    mainTrackContainer.appendChild(racerDiv);
  });

  raceAnimationDiv.appendChild(mainTrackContainer);

  // Criar legenda ÚNICA com TODOS os corredores
  const legend = document.createElement('div');
  legend.className = 'racers-legend';
  legend.style.marginTop = '20px';

  const legendTitle = document.createElement('div');
  legendTitle.style.color = '#ff8888';
  legendTitle.style.fontWeight = '700';
  legendTitle.style.marginBottom = '12px';
  legendTitle.style.textAlign = 'center';
  legendTitle.textContent = '🏁 Todos os Participantes';
  legend.appendChild(legendTitle);

  // Ordenar por velocidade para exibir na legenda
  const sortedRacers = [...allRacers].sort((a, b) => b.velocidade - a.velocidade);

  sortedRacers.forEach((racer, index) => {
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';
    legendItem.style.animationDelay = `${index * 0.15}s`;

    const icon = document.createElement('div');
    icon.className = `legend-icon ${colorMap[racer.nome]}`;
    icon.textContent = emojiMap[racer.nome] || '👤';

    const name = document.createElement('div');
    name.className = 'legend-name';
    name.textContent = `${racer.nome} (${racer.clã})`;

    const speed = document.createElement('div');
    speed.className = 'legend-speed';
    speed.textContent = `${racer.velocidade} (${(racer.velocidade * 3.6).toFixed(1)} km/h)`;

    legendItem.appendChild(icon);
    legendItem.appendChild(name);
    legendItem.appendChild(speed);
    legend.appendChild(legendItem);
  });

  raceAnimationDiv.appendChild(legend);
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
