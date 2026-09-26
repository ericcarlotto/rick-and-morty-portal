# Cérebro do teste

Só este teste. Ler isto primeiro.

**Código:** https://github.com/ericcarlotto/rick-and-morty-portal  
**Atualizado:** 2026-09-26  
**Próxima tarefa:** T4, Docker e CI

## Estado

| Item | Estado |
| --- | --- |
| README, cérebro, plano, AGENTS | escritos |
| Lint (ESLint na raiz) | `npm run lint` |
| Testes no plano | unidade, componente, integração, HTTP, E2E, contrato, acessibilidade. Cobertura mínima 96%, alvo 100% |
| T1 BFF | feito. `npm run start:bff` |
| T2 Web | feito |
| T3 Flutter | feito |
| T4 Docker e CI | por fazer |

O BFF está em `apps/bff`. A web está em `apps/web`. O Flutter está em `apps/mobile`. Não criar pastas que o plano não nomeia.

A pasta `docs/` fica fora do git. O plano está no ficheiro local `docs/PLANO.md`.

## Abrir se

| Precisas de | Abrir |
| --- | --- |
| Requisitos e as 4 tarefas | `docs/PLANO.md` |
| O que foi pedido, em lista | `README.md` |
| Limiares e fronteiras do lint | `AGENTS.md`, `eslint.config.js` |

## Regras

- Uma tarefa, um pull request. Não começar a seguinte no mesmo PR.
- O browser e o Flutter não chamam a Rick and Morty API. Só o BFF.
- No fim da tarefa, atualizar esta tabela e a linha Próxima tarefa.
