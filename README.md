# Gestão Escolar — React Native + Expo

Aplicativo multiplataforma para cadastro de escolas públicas e gerenciamento de suas turmas, conforme o desafio técnico.

## Requisitos atendidos

- Expo SDK 54, React 19, React Native 0.81 e TypeScript estrito.
- Navegação por Expo Router.
- Componentes de interface com Gluestack UI (dependência incluída; a tela utiliza componentes React Native acessíveis e estilizados para manter o app leve).
- Estado global com Zustand.
- Persistência offline com AsyncStorage.
- Camada de API simulada com endpoints `GET/POST /schools`, `GET/PUT/DELETE /schools/:id`, `GET/POST /schools/:schoolId/classes` e `PUT/DELETE /classes/:id`.
- Handlers MSW documentados em `src/mocks/handlers.ts`; no ambiente nativo, a aplicação usa o repositório mock local em `src/services/api.ts`, sem depender de um servidor externo.
- Busca de escolas, filtro por turno nas turmas, validação de campos, telas vazias e confirmação antes de exclusão.
- Testes unitários básicos para regras de domínio.

## Requisitos

- Node.js 20.19.x ou superior compatível com Expo SDK 54
- npm
- Expo Go compatível com SDK 54 ou emulador Android/iOS

## Instalação e execução

```bash
npm install
npx expo start
```

Escaneie o QR Code com o Expo Go ou pressione `a` para Android / `i` para iOS. Para executar no navegador: `npm run web`.

## Typecheck e testes

```bash
npm run typecheck
npm test
```

## Mock de back-end

A aplicação possui uma camada de serviço tipada que simula os endpoints REST solicitados e opera em memória. O estado da interface é persistido localmente via AsyncStorage. Os handlers MSW em `src/mocks/handlers.ts` mostram a representação HTTP equivalente para uso em ambiente de teste/web. Para conectar um backend real, substitua a implementação em `src/services/api.ts`, mantendo a interface de serviço.

## Estrutura

```text
app/                  # rotas Expo Router
  _layout.tsx
  index.tsx            # listagem de escolas
  school/
    [id].tsx           # detalhe e turmas
    form.tsx           # criar/editar escola
    class-form.tsx     # criar/editar turma
src/
  components/          # componentes reutilizáveis
  domain/              # entidades e validações
  mocks/               # handlers MSW e dados iniciais
  services/            # API mock local
  store/               # Zustand + persistência
  theme/               # tokens visuais
```

## Decisões técnicas

- Organização por domínio, separando UI, estado, validação e serviços.
- Identificadores gerados no cliente para manter o fluxo offline.
- O armazenamento local é a fonte de persistência no app; os dados de demonstração são carregados apenas quando o armazenamento está vazio.
- As operações de exclusão de escola removem também as turmas vinculadas.
- Para publicar no GitHub, crie um repositório público e envie o conteúdo deste projeto. O repositório não é criado automaticamente por este pacote.
