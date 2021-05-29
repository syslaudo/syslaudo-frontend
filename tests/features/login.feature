# language: pt

Funcionalidade: realizar login na plataforma do syslaudo

Como usuário da plataforma

Eu quero acessar a plataforma

Para executar uma determinada atividade

  Contexto: acessar a plataforma do syslaudo
    Dado que acesso a plataforma do syslaudo

  Cenário: realizar login na plataforma do syslaudo
    Dado que preencho o campo de Email
    E preencho a Senha
    Quando clico no botão de login
    Então devo acessar a plataforma