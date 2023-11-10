module.exports = class Node {
  constructor(element, next, previous, position, tipo, chamado) {
    this.element = element;
    this.next = next;
    this.previous = previous
    this.position = position
    this.tipo = tipo
    this.chamado = chamado
  }
}
