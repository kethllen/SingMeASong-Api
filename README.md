# API SING ME A SONG 

Sing me a song é uma aplicação para recomendação anômina de músicas. 
Quanto mais as pessoas curtirem uma recomendação, maior a chance dela ser recomendada para outras pessoas 🙂

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **Implantação** para saber como implantar o projeto.

### 📋 Pré-requisitos

Primeiro faça o clone deste repositorio e vamos intalar as depencias

```
npm i
```

Depois crie seu banco de desenvolvimento:

```
npx prisma migrate dev
```
E seu banco de test

```
npm run migrate:test
```
### 🔧 Instalação

Agora vamos configurar as variaveis de ambiente seguindo o .env.example lembrando q este arquivo precisa estar na raiz do projeto.

Esse sera suas variaveis de ambiente para desenvolvimento ".env":

```
PORT=5000
DATABASE_URL=postgres://postgres:SUASENHASUPERSECRETA@localhost:5432/singMeASong
NODE_ENV=development
```

E repita o processo para o ".env.test":

```
PORT=5000
DATABASE_URL=postgres://postgres:SUASENHASUPERSECRETA@localhost:5432/singMeASongTest
NODE_ENV=test
```


## ⚙️ Executando os testes


### 🔩 Analise os testes de ponta a ponta

Esses testes faremos pelo frontEnd!!


### ⌨️Analise os testes de integração e unitarios

Esta configurado um script para executar estes testes basta vc executar o seguinte comando.

```
npm run test
```

## 📦 Desenvolvimento

Para suubir seu servidor execute:

```
npm run dev
```

Você escontrará as rotas desta API disponiveis no diretorio routers dentro de src e os schemas aceitaveis dentro do diretorio schemas

## 🛠️ Construído com


* [JEST](https://jestjs.io/)
* [Eslint](https://eslint.org/) 
* [Prettier](https://www.npmjs.com/package/prettier) 



## ✒️ Autores

Mencione todos aqueles que ajudaram a levantar o projeto desde o seu início

* **Kethllen Andrey** - [Git hub kethllen](https://github.com/kethllen)

