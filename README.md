# SimplifyERP — Frontend

> Tecnologia escalável, integrada e sem custos abusivos para impulsionar pequenos negócios.

Este repositório contém o **frontend** do SimplifyERP, construído em [Next.js](https://nextjs.org). Ele consome a API do [`SimplifyERP-backend`](https://github.com/VictorHumberto01/SimplifyERP-backend) e entrega as interfaces de uso do sistema: onboarding self-service, Cardápio Digital (acessado via QR Code pelo cliente final) e a Frente de Caixa (PDV) usada pela equipe do estabelecimento.

## Arquitetura, System Design e Domain Model

Toda a documentação de **arquitetura, system design e modelagem de domínio (DDD)** do SimplifyERP está centralizada no repositório backend, já que é lá que a arquitetura de Monolito Modular vive:

👉 [`SimplifyERP-backend/docs`](https://github.com/VictorHumberto01/SimplifyERP-backend/tree/main/docs)

Este README cobre apenas o que é específico do frontend.

## Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Linguagem**: TypeScript
- Consome a API Fastify do `SimplifyERP-backend` via HTTP

## Estrutura de páginas planejada (alinhada aos módulos do MVP)

| Área | Módulo backend correspondente | Descrição |
|---|---|---|
| Onboarding / login | Core | Criação de conta self-service, login, configuração do estabelecimento |
| Cardápio Digital (`/cardapio/[mesa]`) | Cardápio Digital | Página pública acessada via QR Code na mesa, sem necessidade de login |
| Frente de Caixa (`/pdv`) | PDV | Painel interno de balcão para operadores do estabelecimento |

## Getting Started

> O código-fonte ainda está sendo estruturado. Esta seção documenta o setup planejado para guiar a implementação inicial.

### Pré-requisitos

- [Node.js](https://nodejs.org) 20 LTS ou superior
- [pnpm](https://pnpm.io) (gerenciador de pacotes)
- API do [`SimplifyERP-backend`](https://github.com/VictorHumberto01/SimplifyERP-backend) rodando localmente (ver README do backend)

### Instalação

```bash
pnpm install
cp .env.example .env.local
```

### Variáveis de ambiente esperadas

| Variável | Descrição | Exemplo |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API do SimplifyERP-backend | `http://localhost:3000` |

### Scripts npm planejados

| Script | Descrição |
|---|---|
| `pnpm dev` | Sobe o frontend em modo desenvolvimento |
| `pnpm build` | Gera o build de produção |
| `pnpm start` | Roda o frontend a partir do build de produção |
| `pnpm lint` | Executa o linter |

## Repositório relacionado

- Backend (API + documentação de arquitetura): [SimplifyERP-backend](https://github.com/VictorHumberto01/SimplifyERP-backend)
