# 🌐 Portal de Gerenciamento Pessoal

Um hub centralizado de ferramentas utilitárias desenvolvido com **React, TypeScript e TailwindCSS**. O objetivo deste projeto é oferecer uma experiência fluida e persistente para a organização de tarefas, contatos e finanças em um único lugar.

---

## 🎯 Visão do Produto
O **Portal de Gerenciamento Pessoal** entrega valor ao usuário final ao centralizar as principais necessidades de organização diária em uma interface intuitiva. Diferente de ferramentas isoladas, este portal garante que dados de produtividade (TaskMaster), networking (ConnectHub) e saúde financeira (MoneyFlow) estejam a um clique de distância, com persistência de dados local que dispensa configurações complexas de login para uso imediato.

---

## ⚡ Planejamento Ágil (Sprint Bakclog)

### 1. User Stories (Módulo TaskMaster)

Seguindo o padrão de metodologias ágeis, mapeamos as necessidades do módulo de tarefas:

1. **Adição de Tarefas:** Como usuário, eu quero adicionar novas tarefas com título e categoria para que eu possa organizar minhas pendências do dia.
2. **Validação de Segurança:** Como usuário, eu quero que o sistema me impeça de criar tarefas curtas demais para garantir que os títulos sejam descritivos e úteis.
3. **Remoção de Itens:** Como usuário, eu quero poder excluir tarefas concluídas ou canceladas para manter minha lista limpa e atualizada.
4. **Categorização:** Como usuário, eu quero classificar minhas tarefas entre "Trabalho", "Pessoal" e "Urgente" para priorizar visualmente o que é mais importante.
5. **Persistência de Dados:** Como usuário, eu quero que minhas tarefas continuem salvas mesmo se eu fechar o navegador, para não perder meu planejamento.

---

### 2. Critérios de Aceitação (Definition of Done)

Para cada estória acima, os seguintes requisitos técnicos devem ser atendidos:

* **Story 1 & 4 (Cadastro):** O formulário deve utilizar `react-hook-form` e o campo de categoria deve ser um `select` com as opções pré-definidas.
* **Story 2 (Validação):** O schema do `Zod` deve disparar um erro visual se o campo "Título" tiver menos de 5 caracteres.
* **Story 3 (Exclusão):** A função de remoção deve atualizar o estado do React e refletir imediatamente no `localStorage`.
* **Story 5 (Persistência):** O componente deve utilizar um `useEffect` para carregar os dados do `localStorage` no montagem da página.

---

### 3. Milestones (Marcos do Projeto)

* **M1 - Fundações e Navegação:** Configuração do ambiente (Vite + TS + Tailwind), implementação do React Router Dom e criação da Navbar e Home Dashboard.
* **M2 - Módulos de Dados e Persistência:** Finalização dos formulários TaskMaster, ConnectHub e MoneyFlow com validações Zod e integração total com LocalStorage.

---

## 🛠️ Tecnologias Utilizadas

* **React + Vite**
* **TypeScript** (Tipagem Estrita)
* **TailwindCSS** (Design Responsivo)
* **React Hook Form + Zod** (Validação de Formulários)
* **React Router Dom** (Navegação SPA)
* **LocalStorage API** (Persistência)

---