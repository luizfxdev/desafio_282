# 👹 Velocidade das Sombras: O Grande Torneio da Velha Turbo

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Anime](https://img.shields.io/badge/Inspired_by-DanDaDan-FF6B6B?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> **Desafio de algoritmos inspirado no anime DanDaDan** - Uma aplicação web interativa que simula um torneio sombrio entre criaturas sobrenaturais, com animações de corrida e pódio dinâmico.

## 📖 Sobre o Desafio

### História

Na noite do eclipse, monstros e bruxas das histórias mais tenebrosas do mundo saem de seus esconderijos para participar do **Torneio Sombrio** — uma competição patrocinada pela Velha Turbo, onde apenas a velocidade e a astúcia podem garantir a vitória. Nestes becos vermelhos e alucinantes, criaturas como lobisomens, espectros, zumbis velozes e feiticeiras turbinadas disputam o primeiro lugar!

Entre todos, o destaque é a terrível **Velha Turbo**, conhecida por atingir inacreditáveis **100 de velocidade**, o que equivale a **360 km/h** (considerando que 1 de velocidade = 3,6 km/h nesta corrida sobrenatural).

### Objetivo do Desafio

Receba uma lista de criaturas (monstros e bruxas), onde cada participante é representado como um dicionário com as chaves `'nome'`, `'velocidade'` e `'clã'`. 

**Implemente a função `estrategia_torneio_sombrio` que:**
- Agrupe as criaturas por clã (monstros, bruxas, espectros, etc).
- Em cada grupo, organize os integrantes em ordem decrescente de velocidade.

No final, retorne uma lista de listas contendo as criaturas agrupadas por clã e ordenadas da mais rápida para a mais lenta.

### Exemplo de Entrada

```javascript
const participantes = [
    { nome: 'Velha Turbo', velocidade: 100, clã: 'Bruxas' },
    { nome: 'Ken Lobisomem', velocidade: 93, clã: 'Monstros' },
    { nome: 'Spectra', velocidade: 67, clã: 'Espectros' },
    { nome: 'Zumbizilla', velocidade: 72, clã: 'Monstros' },
    { nome: 'Morana', velocidade: 88, clã: 'Bruxas' }
];
```

## 🎯 Solução Implementada

### Função Principal

```javascript
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
```

### Lógica Técnica da Solução

A solução implementa um algoritmo de **agrupamento e ordenação** em duas etapas principais:

#### 1️⃣ **Fase de Agrupamento (Hashing)**
- Utiliza um objeto JavaScript como **estrutura de dados hash map** (`clanGroups`)
- **Complexidade:** O(n) onde n é o número de participantes
- **Processo:**
  - Itera sobre cada participante usando `forEach()`
  - Usa o campo `clã` como **chave única** para agrupamento
  - Verifica se a chave já existe no objeto; caso contrário, inicializa um array vazio
  - Insere o participante no array correspondente ao seu clã usando `push()`

**Vantagem:** Acesso em tempo constante O(1) para inserção devido à natureza das propriedades de objetos JavaScript.

#### 2️⃣ **Fase de Ordenação (Sorting)**
- Aplica o algoritmo **Timsort** (implementação nativa do `Array.sort()` no JavaScript)
- **Complexidade:** O(m log m) para cada grupo, onde m é o tamanho do grupo
- **Processo:**
  - Itera sobre cada clã usando `for...in`
  - Aplica `sort()` com função comparadora customizada: `(a, b) => b.velocidade - a.velocidade`
  - A subtração negativa garante ordenação **decrescente** (maior velocidade primeiro)
  - Adiciona o grupo ordenado ao array de resultados

**Complexidade Total:** O(n + k * m log m) onde:
- n = número total de participantes
- k = número de clãs distintos
- m = tamanho médio de cada clã

**No pior caso** (todos em clãs diferentes): O(n log n)
**No melhor caso** (todos no mesmo clã): O(n log n)

#### 🔍 **Otimizações Aplicadas**

1. **Uso de HashMap:** Evita múltiplas iterações para encontrar grupos
2. **Single Pass Grouping:** Agrupa em uma única passagem pelos dados
3. **In-place Sorting:** Ordena os arrays diretamente sem criar cópias desnecessárias
4. **Lazy Evaluation:** Só cria grupos quando necessário (verificação `if (!clanGroups[clan])`)

#### 📊 **Análise de Espaço**

- **Espaço Auxiliar:** O(n) para armazenar o hash map
- **Espaço de Saída:** O(n) para o array de resultados
- **Espaço Total:** O(n)

## 🚀 Aplicações em Projetos Reais

Esta solução de **agrupamento e ordenação** é extremamente versátil e pode ser aplicada em diversos cenários do mundo real:

### 1. **E-commerce & Marketplace**
```javascript
// Agrupar produtos por categoria e ordenar por preço/avaliação
function organizarProdutos(produtos) {
    // Agrupa por categoria, ordena por rating descendente
    // Útil para: Páginas de categorias, filtros dinâmicos, recomendações
}
```

### 2. **Sistemas de Gerenciamento de Projetos**
```javascript
// Agrupar tarefas por status e ordenar por prioridade
function organizarTarefas(tarefas) {
    // Agrupa por status (todo, doing, done)
    // Ordena por prioridade/deadline
    // Útil para: Kanban boards, dashboards, relatórios
}
```

### 3. **Análise de Dados & BI**
```javascript
// Agrupar vendas por região e ordenar por volume
function analisarVendas(vendas) {
    // Agrupa por região/filial
    // Ordena por faturamento descendente
    // Útil para: Relatórios gerenciais, KPIs, dashboards
}
```

### 4. **Redes Sociais & Comunidades**
```javascript
// Agrupar posts por hashtag e ordenar por engajamento
function organizarPosts(posts) {
    // Agrupa por categoria/tag
    // Ordena por likes/comentários/shares
    // Útil para: Feeds, trending topics, descoberta de conteúdo
}
```

### 5. **Educação & LMS**
```javascript
// Agrupar alunos por turma e ordenar por desempenho
function classificarAlunos(alunos) {
    // Agrupa por turma/disciplina
    // Ordena por nota/frequência
    // Útil para: Boletins, rankings, relatórios pedagógicos
}
```

### 6. **Logística & Transporte**
```javascript
// Agrupar entregas por rota e ordenar por prioridade
function otimizarEntregas(entregas) {
    // Agrupa por região/rota
    // Ordena por urgência/valor
    // Útil para: Roteirização, gestão de frotas
}
```

### 7. **RH & Recrutamento**
```javascript
// Agrupar candidatos por vaga e ordenar por score
function rankearCandidatos(candidatos) {
    // Agrupa por vaga/departamento
    // Ordena por pontuação/experiência
    // Útil para: ATS, processos seletivos
}
```

## 🎨 Recursos da Interface

- ⚡ **Animação de Corrida Visual:** Barras de progresso coloridas representando cada participante
- 🏁 **Linha de Chegada:** Bandeira xadrez animada no final de cada pista
- 🏆 **Pódio Dinâmico:** Classificação geral com medalhas e informações detalhadas
- 🎵 **Controles de Áudio:** Play/pause da música tema
- 📱 **Design Responsivo:** Adaptável para desktop, tablet e mobile
- 🎭 **Efeitos Glitch:** Animações temáticas que remetem ao anime DanDaDan
- 🌈 **Cores Personalizadas:** Cada criatura tem sua paleta única

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica
- **CSS3:** Animações avançadas, Flexbox, Grid Layout
- **Vanilla JavaScript:** Lógica pura sem frameworks
- **Web APIs:** Audio API, DOM Manipulation

## 📁 Estrutura do Projeto

```
projeto/
├── index.html          # Estrutura principal
├── styles.css          # Estilos e animações
├── script.js           # Lógica do desafio
└── assets/
    ├── background.mp4  # Vídeo de fundo
    └── theme.mp3       # Música tema
```

## 🎮 Como Usar

1. Clone o repositório:
```bash
git clone https://github.com/luizfxdev/desafio_282.git
cd desafio_282
```

2. Adicione os arquivos de mídia:
   - Coloque seu vídeo em `assets/background.mp4`
   - Coloque sua música em `assets/theme.mp3`

3. Abra o `index.html` no navegador

4. Interaja com a aplicação:
   - 🎵 Clique para tocar/pausar música
   - 🏁 **INICIAR CORRIDA** para ver a competição
   - 🔄 **RETORNAR** para resetar

## 🎯 Características Técnicas

### Performance
- Uso eficiente de estruturas de dados (Hash Map)
- Animações otimizadas com CSS transforms
- Event delegation para melhor performance

### Acessibilidade
- Contraste adequado de cores
- Labels descritivos
- Navegação por teclado

### Boas Práticas
- Código limpo e comentado
- Nomes semânticos de classes
- Separação de responsabilidades (HTML/CSS/JS)

## 🎬 Inspiração: DanDaDan

Este projeto foi inspirado no anime **DanDaDan**, conhecido por sua estética vibrante, ação frenética e mistura única de elementos sobrenaturais e ficção científica. A Velha Turbo (Turbo Granny) é uma das antagonistas icônicas da série, famosa por sua velocidade absurda.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- Linkedin: [in/luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!


***Supere os seus medos, eles são a pior corrente que te impede de vencer!***
