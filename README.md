# Compiladores UJ - Site Educacional

Este é um site educacional interativo sobre teoria de compiladores, desenvolvido para facilitar o aprendizado dos conceitos fundamentais.

## 🚀 Como fazer deploy no GitHub Pages

### 1. Criar repositório no GitHub
1. Acesse [github.com](https://github.com)
2. Crie um novo repositório público chamado `compiladores_uj`
3. **NÃO** inicialize com README, .gitignore ou licença

### 2. Configurar o repositório local
```bash
# No diretório do projeto
git init
git add .
git commit -m "Initial commit - Site educacional de compiladores"
git branch -M main
git remote add origin https://github.com/SEU_USUÁRIO/compiladores_uj.git
git push -u origin main
```

### 3. Configurar GitHub Pages
1. Vá para o repositório no GitHub
2. Clique em **Settings** > **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. O workflow já está configurado em `.github/workflows/deploy.yml`

### 4. Atualizar a URL no componente QR Code
1. Edite o arquivo `src/components/QRCodeComponent.tsx`
2. Na linha 15, substitua `SEU_USUÁRIO` pelo seu username do GitHub:
```typescript
const siteUrl = url || 'https://SEU_USUÁRIO.github.io/compiladores_uj'
```

### 5. Deploy automático
Após fazer push para o branch `main`, o GitHub Actions irá:
- Instalar as dependências
- Fazer build do projeto
- Fazer deploy para GitHub Pages

O site ficará disponível em: `https://SEU_USUÁRIO.github.io/compiladores_uj`

## 📱 Compartilhando com a turma

### QR Code
- Na página inicial, clique no ícone de compartilhar (Share)
- Um QR Code será exibido com o link do site
- Os alunos podem escanear com a câmera do celular

### Link direto
- Copie e compartilhe: `https://SEU_USUÁRIO.github.io/compiladores_uj`
- Funciona em qualquer navegador (desktop/mobile)

## 🎯 Conteúdo Educacional

### 1. Gramática Livre de Contexto
- Definição formal e conceitos
- Visualizador interativo de produções
- Quiz com 10 questões

### 2. Árvore Sintática
- Diferenças entre CST e AST
- Visualizador de árvores interativo
- Comparação lado a lado
- Quiz com 10 questões

### 3. Ambiguidade
- Demonstração de múltiplas interpretações
- Problema do dangling else
- Visualizações interativas
- Quiz com 10 questões

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm start
```

## 📚 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Componentes
- **Lucide React** - Ícones
- **QR Code.js** - Geração de QR codes

## 🎨 Design

Interface inspirada no Epic Games Store com:
- Cards interativos em tela cheia
- Efeitos de parallax
- Animações suaves
- Design responsivo
- Tema dark moderno

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique as configurações do GitHub Pages
2. Confirme se o workflow do GitHub Actions executou sem erros
3. Teste o link localmente antes do deploy
