# Backoffice (Next.js + TypeScript + Tailwind)

Projeto de backoffice administrativo implementado com React, Next.js, TypeScript, TailwindCSS e um conjunto de componentes locais estilo `shadcn/ui`.

Instalação e execução:

```bash
npm install
npm run dev
```

Estrutura principal:

- `src/data/` - JSONs com dados iniciais: `users.json`, `orders.json`, `commissions.json`
- `src/types/` - Tipagens TypeScript
- `src/services/api.ts` - Mock API que simula delay e falhas (10% chance)
- `src/store/useStore.ts` - Zustand para estado global (users, orders, commissions)
- `src/components/` - Componentes compartilhados e telas
- `src/pages/` - Páginas Next.js: dashboard, users, orders, commissions

Fluxo de dados:

1. Os JSONs em `src/data/` são importados pelo `src/services/api.ts`.
2. O serviço expõe funções assíncronas que simulam delay (500-1500ms) e 10% de erro.
3. O `useStore` usa essas funções para popular o estado global e atualizar itens.
4. As páginas consomem `useStore` para renderizar tabelas, filtros e formulários.

Decisões técnicas:

- Usei `zustand` para um estado simples e direto em vez de Context para simplicidade e performance.
- Para `shadcn/ui` foi criada uma camada local `src/components/ui/*` com componentes minimalistas (Card, Button, Input, Select, Badge, Skeleton) para reproduzir a experiência visual e permitir desenvolvimento sem dependências extras.
- API mock: as funções retornam cópias dos dados e mantêm cópias em memória para permitir atualizações durante a sessão.

Pontos de melhoria:

- Adicionar autenticação e autorização real.
- Persistir alterações em backend real (API/DB).
- Adicionar paginação e testes unitários.
- Melhorar a biblioteca de componentes (usar primitives do Radix e design tokens).
