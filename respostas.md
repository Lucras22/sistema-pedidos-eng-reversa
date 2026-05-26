# Justificativa Técnica - Evolução Arquitetural do Sistema de Pedidos

Este documento apresenta a justificativa técnica das decisões de design e arquitetura adotadas na reestruturação e evolução do sistema de pedidos, conforme os requisitos estabelecidos na Prática Orientada 04.

---

## 1. Quais problemas foram resolvidos?

Na versão anterior do sistema, foram identificados e corrigidos os seguintes problemas estruturais:
- **Acoplamento com o DOM:** A lógica de negócio e os cálculos matemáticos estavam diretamente misturados com seletores de interface (`document.getElementById`, manipulação de elementos HTML, etc.). 
- **Variáveis Globais:** O estado do pedido ficava disperso em variáveis de escopo global, facilitando efeitos colaterais imprevistos e dificultando a manutenção ou rastreabilidade de bugs.
- **Funções com Múltiplas Responsabilidades:** Funções acumulavam tarefas como calcular o subtotal, atualizar o texto na tela e gerar links de comunicação ao mesmo tempo.
- **Código Duplicado:** Regras de cálculo de total e formatação de valores estavam repetidas em diferentes partes do código.
- **Inexistência de Testes:** Devido ao acoplamento estrito com a interface visual, era impossível rodar testes unitários automatizados nas regras de negócio.

---

## 2. Como a arquitetura melhorou o sistema?

A divisão do sistema na estrutura clássica de **Arquitetura em Camadas** (`models`, `services`, `controllers`, `repositories`, `views`) trouxe benefícios claros de legibilidade e organização:
- **Isolamento de Domínio (`models`):** As regras mais importantes (Produto, ItemPedido, Pedido) tornaram-se classes puras de JavaScript, completamente alheias a como os dados são salvos ou exibidos.
- **Persistência Abstraída (`repositories`):** A comunicação com o banco de dados simulado (`json-server`) foi isolada. Se no futuro for necessário trocar o JSON Server por um banco de dados real (MongoDB, PostgreSQL), a alteração será feita unicamente nesta camada.
- **Desacoplamento de Interface (`views`):** A interface funciona de maneira passiva. Ela apenas reage a notificações, permitindo que a aplicação funcione em ambiente de console, web ou mobile sem alterar uma única linha da lógica de negócio.

---

## 3. Onde os padrões foram aplicados?

Os padrões de projeto foram distribuídos estrategicamente para solucionar problemas específicos:

* **Factory & Singleton (`PedidoFactory.js`):** Encapsula o processo de criação de objetos complexos (como associar instâncias de `Produto` dentro de `ItemPedido`), garantindo que os objetos sejam instanciados corretamente. Funciona como uma instância única (Singleton) para centralizar a criação das entidades.
* **Strategy (`DescontoStrategy.js`):** Utilizado para implementar o cálculo de descontos. Em vez de encher a classe `Pedido` com condicionais (`if/else`) para cada novo tipo de promoção, o pedido recebe uma estratégia de desconto e delega o cálculo a ela. Isso torna o sistema aberto para novos tipos de desconto sem alterar o código existente.
* **Observer (`Observer.js` e `PedidoController.js`):** Implementado para automatizar a atualização da interface de usuário. O `PedidoController` atua como o sujeito que gerencia o estado e, sempre que um item é adicionado ou removido, notifica automaticamente todas as visões (`views`) cadastradas.
* **Repository (`PedidoRepository.js`):** Abstrai e centraliza todas as requisições assíncronas (operações `fetch`) para a API fake do JSON Server.

---

## 4. Quais benefícios foram obtidos?

Com a refatoração e evolução arquitetural, o projeto alcançou os seguintes índices de qualidade:
- **Testabilidade:** Como a lógica de negócio foi isolada da interface, foi possível implementar testes unitários rápidos e confiáveis utilizando o Jest para garantir o cálculo correto de totais e descontos.
- **Manutenibilidade:** O código tornou-se modular. Encontrar e corrigir um erro de comunicação com a API ou uma falha de exibição de tela tornou-se trivial, pois os escopos estão bem delimitados.
- **Escalabilidade:** O sistema está preparado para crescer de forma segura. Adicionar novas funcionalidades (como novos canais de comunicação além do WhatsApp, ou novos critérios de validação) exige apenas a criação de novas classes ou métodos, sem risco de quebrar o que já funciona.

---

## Respostas às Perguntas Norteadoras

### O sistema possui arquitetura definida?
Sim, o sistema foi totalmente reestruturado sob uma arquitetura em camadas com separação clara de responsabilidades, abandonando o modelo monolítico de arquivo único (script único focado em DOM).

### Está desacoplado?
Sim. A camada de dados não conhece a interface, e a camada de interface não conhece as regras internas de negócio. A comunicação é mediada de forma limpa por meio de Controllers e do padrão de projeto Observer.

### É reutilizável?
Com certeza. As classes de modelo (`Pedido`, `Produto`) e de serviço (`WhatsAppService`, `DescontoStrategy`) são totalmente reutilizáveis e podem ser facilmente portadas para qualquer outro ecossistema JavaScript (como uma API em Node.js ou um app em React/Vue).

### Está preparado para crescer?
Sim. A aplicação dos padrões de projeto (especialmente *Strategy* e *Repository*) garante que novos requisitos (como novas regras de desconto ou integração com outros meios de persistência) possam ser acoplados ao sistema de forma incremental, sem a necessidade de reescrever as regras já consolidadas.