const expect = require('chai').expect;
const Boliche = require('../boliche');

describe('boliche', () => {
  describe('pontos iniciais', () => {
    it('deve começar o jogo com 0 pontos', () => {
        let b = new Boliche();
        expect(b.getPontos()).to.equal(0);
    });
  });

  describe('jogada simples', () => {
    it('deve somar os pontos dos 2 lançamentos', () => {
        let b = new Boliche();
        b.lancamento(2); 
        b.lancamento(3);
        expect(b.getPontos()).to.equal(5);
    });
  });

  describe('spare - 10 pontos em 2 lançamentos', () => {
    it('deve somar 10 mais o próximo lançamento', () => {
        let b = new Boliche();
        b.lancamento(4); 
        b.lancamento(6); // somou 10 - spare
        b.lancamento(5); // 1ª jogada dá 15, 2ª jogada dá 5 + 15
        expect(b.getPontos()).to.equal(20);
    });

    it('deve somar 10 mais o próximo lançamento', () => {
      let b = new Boliche();
      b.lancamento(4); 
      b.lancamento(6); // somou 10 - spare
      b.lancamento(5); // mais esses 5, 1ª jogada dá 15
      b.lancamento(2); // a 2ª jogada dá 7
      // Total: (10 + 5) + (5 + 2) = 22
      expect(b.getPontos()).to.equal(22);
    });
  });

  describe('strike - 10 pontos em 1 lançamento', () => {
    it('deve somar 10 mais os 2 próximos lançamentos', () => {
      let b = new Boliche();
      b.lancamento(10); // strike - 1ª jogada
      b.lancamento(4);
      b.lancamento(3); // Total: (10 + 4 + 3) + (4 + 3) = 24
      expect(b.getPontos()).to.equal(24);
    });
  });
  
  describe('jogada perfeita - 12 strikes', () => {
    it('12 strikes somam 300 pontos', () => {
      let b = new Boliche();
      for (let i = 0; i < 12; i++) b.lancamento(10);
      expect(b.getPontos()).to.equal(300);
    });
  });
  
});