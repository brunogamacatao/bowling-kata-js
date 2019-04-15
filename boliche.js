const MAX_JOGADAS = 10; // Número máximo de jogadas
const SOMA = (acc, val) => acc + val; // Somador

class Boliche {
  constructor() {
    this.jogadas = [[]];
    this.jogadaAtual = this.jogadas[0];
  }

  getPontos() {
    return this.jogadas.slice(0, MAX_JOGADAS).map((jogada, i) => {
      if (this.isSpare(jogada)) {
        return 10 + this.getPontosProximaJogada(i);
      } else if (this.isStrike(jogada)) {
        return 10 + this.getPontosDuasProximasJogadas(i);
      } else {
        return this.getPontosDaJogada(jogada);
      }
    }).reduce(SOMA, 0);
  }

  lancamento(pinos) {
    this.jogadaAtual.push(pinos); // Registra os pinos na jogada atual
    // Se já completou a jogada ou é um strike ...
    if (this.jogadaAtual.length === 2 || pinos === 10) {
      this.jogadaAtual = []; // Inicia outra jogada
      this.jogadas.push(this.jogadaAtual);
    }
  }

  getPontosDaJogada(jogada) { 
    return jogada.reduce(SOMA, 0);
  }

  getPontosProximaJogada(indiceAtual) {
    return this.jogadas[indiceAtual + 1][0];
  }

  getPontosDuasProximasJogadas(indiceAtual) {
    if (this.jogadas[indiceAtual + 1].length === 2) {
      return this.jogadas[indiceAtual + 1][0] + this.jogadas[indiceAtual + 1][1];
    }

    return this.jogadas[indiceAtual + 1][0] + this.jogadas[indiceAtual + 2][0];
  }

  isSpare(jogada) {
    return jogada.length === 2 && this.getPontosDaJogada(jogada) === 10;
  }

  isStrike(jogada) {
    return jogada[0] === 10;
  }
}

module.exports = Boliche;
