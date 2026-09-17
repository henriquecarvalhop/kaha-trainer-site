# Kaha Trainer — site

Site estático da landing page + documentos legais do app Kaha Trainer (iOS).
HTML e CSS puros, **sem build e sem dependência**: o que está na pasta é o que vai
para o ar.

## Estrutura

```
index.html                 one-pager em inglês
assets/css/style.css       folha única, usada por todas as páginas
assets/img/                ícone do app e screenshots
privacy/{en,es,pt-BR}/     Política de Privacidade
terms/{en,es,pt-BR}/       Termos de Serviço
user-privacy/{en,es,pt-BR}/ Suas escolhas de privacidade (exigida pelo App Store Connect)
support/{en,es,pt-BR}/     Página de suporte
_redirects                 regras de redirecionamento (Netlify)
```

Cada documento tem também um `index.html` na raiz (`/privacy`) que manda para o
idioma do navegador, e uma pasta `pt-br` minúscula que redireciona para `pt-BR` —
hosts estáticos diferenciam maiúsculas e ninguém digita `pt-BR` à mão.

## URLs que o App Store Connect espera

| campo | URL |
|---|---|
| Política de privacidade (Inglês EUA) | `https://kahatrainer.com/privacy/en` |
| Política de privacidade (Espanhol) | `https://kahatrainer.com/privacy/es` |
| Política de privacidade (Português BR) | `https://kahatrainer.com/privacy/pt-BR` |
| Opções de privacidade do usuário | `https://kahatrainer.com/user-privacy/en` (`/es`, `/pt-BR`) |
| URL de suporte | `https://kahatrainer.com/support/en` (`/es`, `/pt-BR`) |
| URL de marketing | `https://kahatrainer.com/` |

O app abre as mesmas páginas por `LegalLinks.swift`, que monta
`base/documento/idioma`.

## ⚠️ Pendências antes de publicar

1. **`[LEGAL ENTITY]` / `[ENTIDADE LEGAL]` / `[ENTIDAD LEGAL]`** — pessoa física ou
   jurídica que responde pelo app. Aparece na Política de Privacidade e nos Termos,
   nos três idiomas.
2. **`[JURISDICTION]` / `[JURISDIÇÃO]` / `[JURISDICCIÓN]`** — lei aplicável e foro.
   Só nos Termos.
3. **Botão de download** — hoje é "Coming soon" apontando para o e-mail. Quando o app
   sair, trocar por `https://apps.apple.com/app/idXXXXXXXXX` no header, no hero e no
   CTA final do `index.html` (três lugares).
4. **Screenshots** — `assets/img/` tem só a tela de boas-vindas. Faltam as telas de
   treino, ficha, progresso e competição.

Para achar todas as pendências de uma vez:

```bash
grep -rn "\[LEGAL ENTITY\]\|\[ENTIDADE LEGAL\]\|\[ENTIDAD LEGAL\]\|\[JURISDICTION\]\|\[JURISDIÇÃO\]\|\[JURISDICCIÓN\]" .
```

As caixas laranja no topo dos documentos marcam essas lacunas na própria página —
elas somem quando os campos forem preenchidos (apague o `<div class="todo">`).

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
