    const Node = require("./linked-list-models.js")
    module.exports = class LinkedList{
    constructor(){
        this.equalsFn = require("./util");
        this.count = 0;
        this.countPrioritario = 0
        this.countNormal = 0
        this.head = undefined;
        this.proxSenha = 1
        this.chamado = 0
        this.chamadoNormal = 0
        this.chamadoPrioritario=0
        this.chamadoTotal = 0
        this.senhasChamadas = []
        this.senhasChamadasCount = 0
    }
    pushNormal(){
        const node = new Node(this.proxSenha+"N");
        var current;
        if(this.head == null){
            this.head = node;
            node.previous = null
            node.position = this.count
            this.count++
            this.countNormal++
            node.tipo = "Normal"
            node.chamado = "N"
            console.clear()
            console.log("Adicionado senha : ",this.proxSenha," normal.")
        }
        else{
            current = this.head;
            while(current.next != null){
                current = current.next;
            }
            node.previous = current
            current.next = node;
            node.tipo = "Normal"
            node.chamado = "N"
            node.position = this.count
            this.count++
            this.countNormal++
            console.clear()
            console.log("Adicionado senha : ",this.proxSenha," normal.")
        }
        this.proxSenha++
    }
    pushPrioridade(){
        const node = new Node(this.proxSenha+"P");
        var current;
        if(this.head == null){
            this.head = node;
            node.previous = null
            node.position = this.count
            this.count++
            this.countPrioritario++
            node.tipo = "Prioridade"
            node.chamado = "N"
            console.clear()
            console.log("Adicionado senha : ",this.proxSenha," prioridade.")
        }
        else{
            current = this.head;
            while(current.next != null){
                current = current.next;
            }
            node.previous = current
            current.next = node;
            node.tipo = "Prioridade"
            node.chamado = "N"
            node.position = this.count
            this.count++
            this.countPrioritario++
            console.clear()
            console.log("Adicionado senha : ",this.proxSenha," prioridade.")
        }
        this.proxSenha++
    }
    getElementAt(index){
        if(index>= 0 && index <=this.count){
            let node = this.head;
            for(let i = 0; i < index && node != null; i++){
                node = node.next;
            }
            return node
        }
        //return undefined;
    }
    chamarSenha(){
        if(this.count!=0){
            if(this.chamado == 2){
                this.chamarPrioridade()
            }
            else{
                this.chamarNormal()
            }
        }
        else{
            console.log("Nenhuma senha a ser chamada!")
        }
    }






    chamarNormal(){
        var current = this.head
        if(this.countNormal==0){
            this.chamarPrioridade()
        }
        else{
                if(this.head === undefined){
                this.count = 0
            }
            else{
                while(current.tipo != "Normal"){
                    if(current === undefined){
                        console.log("NADA")
                    }
                    else{
                        current = current.next
                    }
                }
                console.log(current.element)
                if(current.element === this.head.element){
                    this.head = this.head.next;
                    current.previous = undefined
                    if(this.head.next === undefined){
                        //this.count = 0
                        console.log("Nada mais a mostrar")
                    }
                    else{
                        this.head.next.position = this.head.position
                        this.head.position = 0
                        this.count--;
                    }
                }
                else{
                    const previous = this.getElementAt(this.head.position);
                    current = previous.next;
                    previous.next = current.next;
                    this.count--
                }
            
                this.countNormal--
                this.chamado++
                this.chamadoTotal++
                this.chamadoNormal++
            }
        }
    }
    chamarPrioridade(){
        var current = this.head
        if(this.countPrioritario == 0){
            this.chamarNormal()
        }
        else{
            while(current.tipo != "Prioridade"){
                if(current === undefined){
                    console.log("NADA")
                }
                else{
                    current = current.next
                }
            }
            console.log(current.element)
            if(current.element === this.head.element){
                this.head = current.next;
                current.previous = undefined
                this.head.position = 0
                if(this.head.next === undefined){
                    //this.count = 0
                    console.log("Nada mais a mostrar")
                }
                else{
                    this.head.next.position = this.head.position+1
                    this.head.position = 0
                    this.count--;
                }
            }
            else{
                const previous = this.getElementAt(this.head.position);
                current = previous.next;
                previous.next = current.next;
                this.count--
            }
            if(this.head === undefined){
                this.count = 0
            }
            this.countPrioritario--
            this.chamado = 0
            this.chamadoTotal++
            this.chamadoPrioritario++
        }
    }
    insert(element, index){
        if(index >= 0 && index <= this.count){
            const node = new Node(element);
            if(index === 0){
                const current = this.head;
                node.next = current;
                node.next.previous = node
                this.head = node;
            }
            else{
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
                node.next.previous = node
                node.previous = this.getElementAt(index-1)
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
        while (current.next != null) {
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
        this.head.previous = undefined
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
            this.count--
        }
    }  
    isEmpty() {
        return this.count === 0;
    }   
    }


