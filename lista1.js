const Node = require("./linked-list-models.js");

module.exports =  class LinkedList {
  constructor() {
    this.count = 0;
    this.countPrioritario = 0;
    this.countNormal = 0;
    this.head = undefined;
    this.proxSenha = 1;
    this.chamado = 0;
    this.chamadoNormal = 0;
    this.chamadoPrioritario = 0;
    this.chamadoTotal = 0;
    this.senhasChamadas = [];
    this.senhasChamadasCount = 0;
  }

  push(tipo) {
    const node = new Node(this.proxSenha + tipo[0]);

    if (this.head === undefined) {
        this.head = node;
        node.previous = null;
        node.position = this.count;
    } else {
        let current = this.head;
        while (current.next !== undefined) {
            current = current.next;
        }
        node.previous = current;
        current.next = node;
        node.position = this.count;
    }
    
    node.tipo = tipo;
    node.chamado = "N";
    console.clear();
    console.log(`Adicionada senha: ${this.proxSenha} ${tipo === "P" ? "prioridade" : "normal"}`);
    this.proxSenha++;
    this.count++;
    tipo === "P" ? this.countPrioritario++ : this.countNormal++;
}

pushNormal() {
    this.push("N");
}

pushPrioridade() {
    this.push("P");
}

  getElementAt(index) {
    if (index >= 0 && index < this.count) {
      let node = this.head;
      for (let i = 0; i < index && node !== null; i++) {
        node = node.next;
      }
      return node;
    }
  }

  chamarSenha() {
    if (this.count === 0) {
        console.log("Nenhuma senha a ser chamada!");
    } else if (this.chamado === 2) {
        this.chamarPrioridade();
        this.chamado = 0; // Resetar para chamar 2 normais na próxima vez
    } else {
        this.chamarNormal();
    }
}

chamarNormal() {
    if (this.countNormal === 0) {
        console.log("Chamando prioridade porque não há senhas normais.");
        this.chamarPrioridade();
    } else {
        this.chamar("Normal");
        this.chamado++;
    }
}

chamarPrioridade() {
    if (this.countPrioritario === 0) {
        console.log("Chamando normal porque não há senhas prioritárias.");
        this.chamarNormal();
    } else {
        this.chamar("Prioridade");
        this.chamado = 0; // Resetar para chamar 2 normais na próxima vez
    }
}

chamar(tipo) {
    const current = this.head;
    if (current === undefined) {
        console.log("Lista vazia. Não há senhas para chamar.");
        return;
    }

    console.log(`Chamando senha ${current.element}`);
    if (current.next === undefined) {
        this.head = undefined;
    } else if (current.element === this.head.element) {
        this.head = this.head.next;
        if (this.head !== undefined) {
            this.head.position = 0;
        }
    } else {
        const previous = this.getElementAt(this.head.position);
        previous.next = current.next;
    }
    this.count--;
    current.tipo === "Prioridade" ? this.countPrioritario-- : this.countNormal--;
    this.chamado = current.tipo === "Prioridade" ? 0 : (this.chamado + 1)
    this.chamadoTotal++;
    tipo === "Prioridade" ? this.chamadoPrioritario++ : this.chamadoNormal++;
    }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        node.next.previous = node;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
        node.next.previous = node;
        node.previous = this.getElementAt(index - 1);
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }

    if (this.count === 1) {
      const removedElement = this.head.element;
      this.head = undefined;
      this.count--;
      return removedElement;
    }

    let current = this.head;
    let previous = undefined;
    while (current.next !== null) {
      previous = current;
      current = current.next;
    }

    const removedElement = current.element;
    previous.next = undefined;
    this.count--;
    return removedElement;
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }

    const removedElement = this.head.element;
    this.head = this.head.next;
    if (this.head !== undefined) {
      this.head.previous = undefined;
    }
    this.count--;
    return removedElement;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      if (index === 0) {
        return this.removeFront();
      }
      const previous = this.getElementAt(index - 1);
      const current = previous.next;
      previous.next = current.next;
      this.count--;
    }
  }

  isEmpty() {
    return this.count === 0;
  }
  realocarSenha(element) {
    const node = this.getElementByElement(element);
        if (node) {
            const novaPosicao = Math.floor(node.position / 2) - 1;
            if (novaPosicao >= 0) {
                const previous = this.getElementAt(novaPosicao);
                if (previous) {
                    node.previous = previous;
                    node.next = previous.next;
                    previous.next = node;
                    if (node.next) {
                        node.next.previous = node;
                    }
                    node.position = novaPosicao;
                    console.log(`Senha ${element} realocada para a posição ${novaPosicao}`);
                }
            } else {
                console.log(`A senha ${element} já está na posição mais alta.`);
            }
        } else {
            console.log(`Senha ${element} não encontrada.`);
        }
    }

    getElementByElement(element) {
        let current = this.head;
        while (current !== null) {
            if (current.element === element) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
}


