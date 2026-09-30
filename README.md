# Kaha — site dos apps

Site estático da Kaha: uma home para os dois apps (Kaha Trainer e DietCoach), a
landing de cada um e os documentos legais dos dois. HTML e CSS puros, **sem build
e sem dependência**: o que está na pasta é o que vai para o ar.

## Estrutura

```
index.html                           home: os dois apps (em inglês)
trainer/index.html                   landing do Kaha Trainer (em inglês)
dietcoach/index.html                 landing do DietCoach (em inglês)
assets/css/style.css                 folha única, usada por todas as páginas
assets/js/site.js                    só fecha o menu de app aberto ao clicar fora
assets/img/                          ícones e screenshots dos dois apps

privacy/{en,es,pt-br}/               Kaha Trainer — Política de Privacidade
terms/{en,es,pt-br}/                 Kaha Trainer — Termos de Serviço
user-privacy/{en,es,pt-br}/          Kaha Trainer — Suas escolhas de privacidade
support/{en,es,pt-br}/               Kaha Trainer — Suporte

dietcoach/privacy/{en,es,pt-br}/     DietCoach — Política de Privacidade
dietcoach/user-privacy/{en,es,pt-br}/ DietCoach — Suas escolhas de privacidade
dietcoach/support/{en,es,pt-br}/     DietCoach — Suporte
                                     (termos: o EULA padrão da Apple)

_redirects                           redirecionamentos (Netlify)
vercel.json                          os mesmos redirecionamentos (Vercel)
```

Os documentos do Kaha Trainer ficam na raiz porque essas URLs já estão no app
publicado e no App Store Connect — **não mover**. O DietCoach vive debaixo de
`/dietcoach`.

Toda página tem o mesmo cabeçalho: a marca leva à home e há um menu por app
(`<details>`, funciona sem JS). Ao mudar um link do menu, mudar em todas as páginas.

Cada documento tem também um `index.html` na raiz (`/privacy`) que manda para o
idioma do navegador.

### ⚠️ `pt-br` é minúsculo, e isso não é estilo

O disco do Mac **não diferencia maiúsculas**: criar `privacy/pt-br` ao lado de
`privacy/pt-BR` não cria duas pastas, sobrescreve a que existia. Um host estático,
por outro lado, diferencia — `/privacy/pt-BR` daria 404 se a pasta no disco for
minúscula. Por isso há uma grafia só, a minúscula, e a variante com maiúscula
existe apenas como redirecionamento em `_redirects` e `vercel.json`.
`LegalLinks.swift`, no app, monta a URL com `pt-br`. Não recriar a pasta maiúscula.

## URLs que o App Store Connect espera

### Kaha Trainer

| campo | URL |
|---|---|
| Política de privacidade (Inglês EUA) | `https://kahatrainer.com/privacy/en` |
| Política de privacidade (Espanhol) | `https://kahatrainer.com/privacy/es` |
| Política de privacidade (Português BR) | `https://kahatrainer.com/privacy/pt-br` |
| Opções de privacidade do usuário | `https://kahatrainer.com/user-privacy/en` (`/es`, `/pt-BR`) |
| URL de suporte | `https://kahatrainer.com/support/en` (`/es`, `/pt-BR`) |
| URL de marketing | `https://kahatrainer.com/` |

### DietCoach

| campo | URL |
|---|---|
| Política de privacidade (Inglês EUA) | `https://kahatrainer.com/dietcoach/privacy/en` |
| Política de privacidade (Espanhol) | `https://kahatrainer.com/dietcoach/privacy/es` |
| Política de privacidade (Português BR) | `https://kahatrainer.com/dietcoach/privacy/pt-br` |
| Opções de privacidade do usuário | `https://kahatrainer.com/dietcoach/user-privacy/en` (`/es`, `/pt-br`) |
| URL de suporte | `https://kahatrainer.com/dietcoach/support/en` (`/es`, `/pt-br`) |
| URL de marketing | `https://kahatrainer.com/dietcoach/` |

Os dois apps abrem as mesmas páginas por `LegalLinks.swift`, que monta
`base/documento/idioma`.

## Pendências antes de publicar

1. **HTTPS do domínio** — em 2026-09-24 `https://kahatrainer.com` respondia com o
   certificado do GitHub (`*.github.io`), não com um do domínio: o navegador mostra
   erro de segurança, e o revisor da Apple também. No repositório, *Settings → Pages*:
   conferir o domínio personalizado e marcar **Enforce HTTPS** (o certificado do Let's
   Encrypt sai em alguns minutos depois que o DNS está certo).
2. **Botão de download** — hoje é "Coming soon" apontando para o e-mail. Quando cada
   app sair, trocar por `https://apps.apple.com/app/idXXXXXXXXX` no hero e no CTA final
   da landing dele (`trainer/index.html`, `dietcoach/index.html`) e no card da home.
3. **Screenshots** — cada app tem só as telas de boas-vindas. Faltam as telas de uso
   (Kaha Trainer: treino, ficha, progresso, competição; DietCoach: diário, prato,
   estratégia, progresso).

Já preenchido: a entidade (**CloudArbitration LTDA**) e o foro (**Brasil**) em todos
os documentos, nos três idiomas.

## Rodar localmente

```bash
python3 -m http.server 8765
```

E abrir <http://127.0.0.1:8765>. É preciso servir por HTTP, e não abrir o arquivo
direto, porque os links internos são absolutos (`/privacy/en`).

## Publicar

Qualquer host estático serve. Arrastar a pasta para o Netlify já funciona,
`_redirects` incluso. Na Vercel/Cloudflare Pages, os redirecionamentos do
`_redirects` precisam ser reescritos no formato do host — ou basta confiar nos
`index.html` de redirecionamento, que funcionam em qualquer lugar.

Depois de publicar, apontar o domínio `kahatrainer.com` para o host e conferir as
seis URLs da tabela acima antes de salvar no App Store Connect.
