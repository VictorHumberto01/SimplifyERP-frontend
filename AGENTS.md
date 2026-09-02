<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SimplifyERP Frontend

Contexto rápido para qualquer agente (ou humano) que for mexer neste repositório. O bloco acima é gerado
automaticamente pelo `next dev` — não apague, ele volta sozinho.

## O que é o SimplifyERP

Sistema de gestão para pequenos negócios (restaurantes, lojas, cafés) que substitui caderno de estoque +
app de vendas + planilha financeira por um hub único, com módulos que ligam/desligam conforme o negócio
cresce. Este repo é o client Next.js — landing page de marketing + painel autenticado. Toda a documentação
de arquitetura/domínio vive no repo backend (`SimplifyERP-backend/docs/`), não aqui.

**Modelo de distribuição atual (importante):** por enquanto o app é entregue como uma consultoria — não
existe cadastro público. Só um `super_admin` logado cria um novo tenant (cliente), em
`/dashboard/tenants/novo`. Não existe mais `/signup` público; se você achar referências a "cadastro grátis"
em algum lugar do código de marketing, é resquício e deve ser tratado como bug, não como funcionalidade.

## Estrutura

- `src/app/page.tsx` — landing page de marketing, composta pelos componentes `src/components/modern-*.tsx`
  (`ModernHero`, `ModernCta`, etc.) + `three-canvas.tsx` (cena Three.js do hero, com parallax por scroll e
  mouse). Paleta: fundo `stone-950`, acentos `amber`/`emerald`, fonte de destaque `Fraunces` (display/itálico)
  + `Geist` (corpo), cor `paper` (creme) pra cards claros — ver `src/app/globals.css`.
- `src/app/login/page.tsx` — login.
- `src/app/dashboard/` — área autenticada. `layout.tsx` é Server Component: lê o cookie de sessão, busca
  `GET /v1/establishment/modules` e `GET /v1/auth/me` direto no backend, e monta a navegação (só mostra
  módulos habilitados; só mostra "Novo tenant" pra `super_admin`).
  - `dashboard/modulos/` — liga/desliga módulos do tenant.
  - `dashboard/tenants/novo/` — só super admin: cria tenant + dono, mostra as credenciais geradas pra
    repassar ao cliente (não loga como o novo dono — a sessão de quem está criando não muda).
- `src/app/api/**/route.ts` — Route Handlers que fazem proxy pro backend (`NEXT_PUBLIC_API_URL`) e cuidam do
  cookie httpOnly `simplifyerp_session` (setar no login, nunca no `/api/admin/tenants` — ver nota acima).
- `src/proxy.ts` — **não é `middleware.ts`**. A partir do Next.js 16 esse arquivo foi renomeado de
  `middleware` pra `proxy` (mesma função, nome novo). Protege `/dashboard/:path*`: só checa se o cookie
  existe, não valida o JWT (isso é trabalho do backend em cada request).
- `src/lib/api.ts` — wrapper de fetch fino usado tanto pelos Route Handlers quanto pelos Server Components.

## Como as sprints estão organizadas

O planejamento de execução (sprints e tarefas) vive no repo backend, em
[`../SimplifyERP-backend/sprints/`](../SimplifyERP-backend/sprints), mesmo cobrindo trabalho deste repositório
— cada tarefa entrega uma fatia ponta a ponta (backend + frontend juntos), então faz sentido ficar num lugar
só. Ver o `sprints/README.md` de lá pro template e status atualizado antes de assumir que uma tela não existe.

## Testes / verificação

Não há test runner instalado (só `pnpm lint` e `pnpm build`). Para validar fluxos de UI, suba `pnpm dev`
localmente com o backend rodando e `NEXT_PUBLIC_API_URL` apontando pra ele (`.env.local`), e teste via
navegador ou Playwright — não existe suíte automatizada de UI ainda.
