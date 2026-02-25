Projeto desenvolvido para a disciplina de Programação Client-Side.

# Utility Portal

## Visão do Produto

O Utility Portal é uma aplicação web que reúne diferentes ferramentas utilitárias em um único lugar, permitindo ao usuário organizar tarefas, gerenciar contatos e controlar gastos de forma simples e prática.

A aplicação foi desenvolvida utilizando React com TypeScript e possui persistência de dados através do LocalStorage, garantindo que as informações continuem disponíveis mesmo após o recarregamento da página.

O objetivo do projeto é oferecer uma interface intuitiva e funcional que facilite a organização do dia a dia do usuário.

## User Stories (Módulo TaskMaster)

1. **Como usuário, eu quero adicionar uma nova tarefa para organizar minhas atividades diárias.**
2. **Como usuário, eu quero categorizar minhas tarefas (Trabalho, Pessoal, Urgente) para priorizar melhor.**
3. **Como usuário, eu quero listar todas as minhas tarefas para visualizar o que preciso fazer.**
4. **Como usuário, eu quero remover tarefas concluídas para manter a lista limpa.**
5. **Como usuário, eu quero que minhas tarefas sejam salvas automaticamente para não perder dados ao recarregar a página.**

## Critérios de Aceitação

Para cada User Story do TaskMaster, os seguintes critérios técnicos devem ser atendidos:

1. **Adicionar tarefa**:
   - O campo título deve aceitar no mínimo 5 caracteres.
   - A categoria deve ser selecionada obrigatoriamente.
   - A tarefa deve aparecer na lista imediatamente após a adição.

2. **Categorizar tarefas**:
   - As opções de categoria devem ser Trabalho, Pessoal e Urgente.
   - A categoria deve ser exibida junto ao título na lista.
   - Deve ser possível filtrar ou visualizar tarefas por categoria (opcional, mas recomendado).

3. **Listar tarefas**:
   - Todas as tarefas devem ser exibidas em uma lista clara.
   - Cada tarefa deve mostrar título e categoria.
   - A lista deve ser atualizada em tempo real após adições ou remoções.

4. **Remover tarefas**:
   - Cada tarefa deve ter um botão de remoção.
   - Ao remover, a tarefa deve desaparecer da lista e do localStorage.
   - Deve haver confirmação ou feedback visual da remoção.

5. **Persistência automática**:
   - Os dados devem ser salvos no localStorage após cada adição ou remoção.
   - Ao recarregar a página, as tarefas devem ser carregadas automaticamente.
   - Não deve haver perda de dados em caso de erro ou recarregamento.

## Milestones

1. **M1 - Estrutura de Rotas e Home**: Implementar o roteamento com React Router Dom, criar a página Home com cards de navegação e configurar a Navbar persistente.
2. **M2 - Finalização dos Módulos de Dados**: Desenvolver os módulos TaskMaster, ConnectHub e MoneyFlow com formulários, validações Zod, persistência localStorage e listagem de dados.