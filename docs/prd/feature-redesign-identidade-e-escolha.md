# PRD — Identidade editorial e escolha interativa da FIO / tech

> Tipo: Feature · Data: 2026-10-06  
> Status: Pronto para planejamento

## Visão geral e objetivo

A FIO / tech é uma loja fictícia de eletrônicos e informática criada para portfólio. A demonstração já permite encontrar, examinar e selecionar produtos, mas a apresentação visual e os momentos de escolha ainda se parecem com os de um catálogo convencional. Este redesign deve tornar a marca reconhecível e ajudar a pessoa a entender quais atributos importam para sua rotina, sem substituir sua decisão por um vencedor universal.

O resultado esperado é uma experiência editorial, clara e interativa em celular e desktop. A pessoa deve conseguir descobrir produtos, examinar critérios, comparar alternativas e entender por que o questionário sugere determinado setup.

## Contexto do projeto

- A aplicação existente usa React, TypeScript e Vite, com CSS próprio, dados locais e GSAP com ScrollTrigger na vista explodida do celular.
- O catálogo atual contém onze produtos fictícios em cinco categorias. Há busca, filtros, ordenação, detalhes, comparação de até três itens, questionário por regras, favoritos e seleção demonstrativa guardados no navegador.
- A apresentação `loja-tech-conceito.pdf` define a ideia de “ver, entender, escolher” e mostra a vista explodida como recurso de explicação, com alternativas acessíveis para celular e movimento reduzido.
- O nome FIO / tech permanece provisório nesta versão. A proposta de redesign foi confirmada para reforçar a identidade visual e tornar catálogo, comparação e questionário mais interativos, preservando os fluxos atuais.

## Decisões do produto

### Identidade e apresentação

- A marca usa a ideia de um **fio condutor** entre descoberta, entendimento e escolha. A linguagem visual é editorial e precisa, com grafite, branco quente e azul cobalto, tipografia de presença, composição assimétrica e espaços bem definidos.
- Fotografias e composições dos produtos fictícios devem ter direção visual coerente. Modelos diferentes precisam ser distinguíveis visualmente; a mesma foto não deve sugerir que são o mesmo aparelho.
- A página inicial apresenta a proposta da loja e oferece caminhos claros para explorar o catálogo e montar um setup. A vista explodida permanece como explicação ilustrativa de um celular fictício.
- Movimento e interação devem esclarecer relações entre produto e informação. A explicação não pode depender de animação, hover ou rolagem presa.

### Descoberta e escolha

- Busca, categorias, filtros e ordenação do catálogo continuam disponíveis.
- Um controle de prioridade permite destacar, nos produtos exibidos, atributos ligados a **portabilidade, tela, autonomia ou som**. A escolha altera a ênfase e a explicação dos atributos; não cria um ranking oculto nem substitui a ordenação selecionada pela pessoa.
- A comparação continua aceitando até três produtos. A pessoa pode destacar um critério para examiná-lo lado a lado; os demais critérios permanecem disponíveis. Quando um atributo não se aplica a um produto, a interface o explica sem preencher a lacuna com dados inventados.
- O questionário apresenta, em etapas, as escolhas de rotina, prioridade e faixa de investimento. A pessoa pode voltar e alterar respostas. O resultado mantém regras transparentes e mostra os motivos da sugestão e o valor total ilustrativo.
- Detalhes de produtos, favoritos e seleção demonstrativa mantêm suas ações atuais, com apresentação e mensagens coerentes com a nova identidade.

## Histórias de usuário

- Como visitante, quero entender rapidamente o propósito da FIO / tech e escolher por onde começar, para explorar a demonstração com confiança.
- Como pessoa que pesquisa produtos, quero filtrar e destacar o atributo que importa para mim, para ler as opções com mais contexto.
- Como pessoa indecisa, quero colocar até três produtos lado a lado e focar em um critério, para perceber diferenças sem receber uma resposta universal.
- Como pessoa que monta um setup, quero responder uma pergunta por vez, revisar respostas e entender a regra do resultado, para avaliar se a sugestão faz sentido.
- Como visitante em celular ou usando teclado ou movimento reduzido, quero acessar as mesmas informações e ações, para concluir os fluxos sem depender de gestos ou animações específicas.
- Como pessoa que salva ou seleciona itens, quero encontrar meus favoritos e ajustar quantidades no navegador, para testar os estados da interface sem conta ou compra real.

## Regras de negócio e dados

- Todos os produtos, especificações, imagens e valores são demonstrativos. A interface identifica produtos como “Produto demonstrativo” e preços como “Valor ilustrativo” nos contextos em que aparecem.
- A demonstração não coleta dados pessoais e não oferece cadastro, pagamento, checkout, cálculo de frete, estoque, avaliações ou promessas de prazo.
- A prioridade escolhida no catálogo é uma lente de leitura. Ela destaca informações existentes do produto e pode apresentar uma explicação curta, sem inventar compatibilidade ou desempenho e sem mudar silenciosamente a ordenação.
- A comparação aceita no máximo três produtos. A pessoa pode remover itens e continuar a exploração. Diferenças entre categorias são apresentadas como critérios não aplicáveis quando necessário.
- O questionário usa as rotinas, prioridades, faixas de investimento e regras explícitas do catálogo local. Produtos ligados à rotina recebem três pontos; produtos ligados à prioridade recebem dois; o papel de item principal adiciona um ponto; empates são desfeitos pelo menor valor ilustrativo. Somente itens dentro da faixa escolhida entram na sugestão. O resultado pode conter um item principal e, quando couber na faixa e atender às regras, um complemento.
- Favoritos, comparação e seleção demonstrativa permanecem guardados apenas no navegador. A seleção aceita ajuste de quantidade e remoção; seu resumo não representa pedido ou reserva.
- Estados vazios, produto ou página inexistente, imagem indisponível e falha ao guardar dados no navegador devem apresentar uma mensagem clara e uma ação de recuperação adequada.

## Fluxos

### Explorar pelo que importa

1. A pessoa entra pela página inicial ou acessa o catálogo, usa busca, categorias, filtros ou ordenação e pode escolher uma prioridade de leitura.
2. Os produtos exibidos preservam os filtros e a ordem selecionada. Cada produto mostra com clareza o atributo relacionado à prioridade, quando esse dado existe.
3. A pessoa abre detalhes, salva, adiciona à seleção demonstrativa ou inclui um item na comparação. Se nenhum produto corresponder à busca e aos filtros, vê um estado vazio com opção para limpar os critérios.

### Comparar alternativas

1. A pessoa inclui até três produtos a partir do catálogo ou dos detalhes e abre a comparação. Se a lista estiver vazia, recebe orientação para adicionar itens.
2. A tabela apresenta os atributos lado a lado. A pessoa escolhe um critério para destacá-lo, pode examinar os demais e remover itens.
3. Se tentar adicionar um quarto produto, recebe uma mensagem que explica o limite e orienta a remover um item antes de continuar.

### Montar um setup

1. A pessoa escolhe sua rotina, depois a prioridade e a faixa de investimento, com indicação da etapa atual.
2. Pode voltar, revisar as escolhas e avançar novamente sem perder as respostas já dadas.
3. O resultado apresenta os itens demonstrativos que cabem na faixa, o valor total ilustrativo e os motivos calculados pelas regras. Se não houver item principal elegível, explica a ausência e oferece caminhos para rever a faixa ou explorar o catálogo.

### Rever itens

1. A pessoa salva e remove favoritos ou adiciona e remove produtos da seleção demonstrativa.
2. Na seleção, ajusta quantidades e vê o resumo ilustrativo atualizado. Se a lista ficar vazia, encontra um caminho de volta ao catálogo.
3. Ao retornar ao site no mesmo navegador, encontra os itens guardados, quando o armazenamento local estiver disponível. Se o armazenamento falhar, a interface informa a limitação sem bloquear a exploração.

### Explorar a vista explodida

1. No desktop, a rolagem separa gradualmente as camadas ilustrativas e mostra o progresso. A pessoa seleciona rótulos para ler explicações curtas.
2. No celular, a explicação usa etapas por toque ou uma vista estática, sem prender a rolagem por muito tempo.
3. Com movimento reduzido, a explicação e os controles permanecem disponíveis sem depender da animação.

## Critérios de aceite

- Dada a página inicial em celular ou desktop, quando a pessoa a abre, então identifica a proposta da loja e encontra caminhos para catálogo e questionário.
- Dadas a página inicial, a vitrine e os detalhes, quando a pessoa percorre a interface, então encontra uma linguagem editorial coerente em grafite, branco quente e azul cobalto e consegue distinguir visualmente modelos diferentes.
- Dado o catálogo, quando a pessoa busca, filtra, muda de categoria ou ordena, então a lista reflete essas escolhas e informa quantos produtos foram encontrados.
- Dada uma prioridade selecionada no catálogo, quando a pessoa examina os produtos, então vê atributos relacionados destacados sem mudança silenciosa da ordem nem declaração de vencedor.
- Dada uma busca sem correspondências, quando a lista fica vazia, então aparece uma explicação e uma ação para limpar os critérios.
- Dada uma comparação com até três itens, quando a pessoa destaca um critério, então consegue ler esse critério lado a lado e ainda acessar os demais.
- Dada uma comparação com três itens, quando a pessoa tenta incluir outro, então a seleção permanece em três e a interface explica o limite.
- Dado um atributo não aplicável entre categorias diferentes, quando a pessoa abre a comparação, então a célula não inventa uma especificação.
- Dado o questionário, quando a pessoa avança e volta entre etapas, então suas respostas permanecem editáveis e a etapa atual é perceptível.
- Dado um resultado do questionário, quando a pessoa o abre, então vê itens elegíveis, valor ilustrativo e motivos correspondentes às regras declaradas; na ausência de item principal elegível, vê uma explicação e uma ação útil.
- Dados favoritos ou itens na seleção, quando a pessoa retorna no mesmo navegador, então o estado é restaurado quando o armazenamento local está disponível; quantidades e remoções atualizam o resumo.
- Dada uma falha de armazenamento, rota desconhecida, produto inexistente ou imagem indisponível, quando a condição ocorre, então há mensagem compreensível e a interface principal continua utilizável.
- Dada a vista explodida, quando a pessoa usa teclado, celular ou movimento reduzido, então consegue acessar os nomes e explicações das camadas sem depender da animação.
- Dadas as páginas e controles alterados, quando são usados com teclado e em larguras de celular e desktop, então navegação, foco visível, contraste, áreas de toque e leitura dos conteúdos permanecem adequados.
- Dado qualquer caminho da demonstração, quando a pessoa vê produtos, preços ou a seleção, então fica claro que os dados são fictícios e nenhuma compra real será concluída.

## Stack e restrições técnicas decididas

- Manter React, TypeScript, Vite e CSS próprio do projeto, para evoluir a interface existente sem migração de framework.
- Manter GSAP, ScrollTrigger e `@gsap/react` para a vista explodida e para movimentos que ajudem a compreender a interface, com limpeza correta no React e respeito a `prefers-reduced-motion`.
- Manter catálogo e regras de sugestão locais, bem como o armazenamento no navegador para favoritos, comparação e seleção demonstrativa. Nenhuma integração externa ou dependência nova foi decidida para esta feature.
