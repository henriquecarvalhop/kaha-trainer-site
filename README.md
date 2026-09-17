# Kaha Trainer — site

Site estático da landing page + documentos legais do app Kaha Trainer (iOS).
HTML e CSS puros, **sem build e sem dependência**: o que está na pasta é o que vai
para o ar.

## Estrutura

```
index.html                 one-pager em inglês
assets/css/style.css       folha única, usada por todas as páginas
assets/img/                ícone do app e screenshots
privacy/{en,es,pt-br}/     Política de Privacidade
terms/{en,es,pt-br}/       Termos de Serviço
user-privacy/{en,es,pt-br}/ Suas escolhas de privacidade (exigida pelo App Store Connect)
support/{en,es,pt-br}/     Página de suporte
_redirects                 redirecionamentos (Netlify)
vercel.json                os mesmos redirecionamentos (Vercel)
```

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

| campo | URL |
|---|---|
| Política de privacidade (Inglês EUA) | `https://kahatrainer.com/privacy/en` |
| Política de privacidade (Espanhol) | `https://kahatrainer.com/privacy/es` |
| Política de privacidade (Português BR) | `https://kahatrainer.com/privacy/pt-br` |
| Opções de privacidade do usuário | `https://kahatrainer.com/user-privacy/en` (`/es`, `/pt-BR`) |
| URL de suporte | `https://kahatrainer.com/support/en` (`/es`, `/pt-BR`) |
| URL de marketing | `https://kahatrainer.com/` |

O app abre as mesmas páginas por `LegalLinks.swift`, que monta
`base/documento/idioma`.

## Pendências antes de publicar

1. **Botão de download** — hoje é "Coming soon" apontando para o e-mail. Quando o app
   sair, trocar por `https://apps.apple.com/app/idXXXXXXXXX` no header, no hero e no
   CTA final do `index.html` (três lugares).
2. **Screenshots** — `assets/img/` tem só a tela de boas-vindas. Faltam as telas de
   treino, ficha, progresso e competição.

Já preenchido: a entidade (**CloudArbitration LTDA**) e o foro (**Brasil**) nos seis
documentos de privacidade e termos, nos três idiomas.

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
