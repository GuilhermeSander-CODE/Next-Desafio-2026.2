-- CreateEnum
CREATE TYPE "Demografia" AS ENUM ('SHONEN', 'SEINEN', 'SHOJO', 'JOSEI', 'KODOMO');

-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('ACAO', 'AVENTURA', 'COMEDIA', 'DRAMA', 'FANTASIA', 'FICCAO_CIENTIFICA', 'ROMANCE', 'SUSPENSE', 'TERROR', 'SLICE_OF_LIFE');

-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('PENDENTE', 'PAGO', 'ENVIADO', 'ENTREGUE', 'CANCELADO');

-- CreateTable
CREATE TABLE "Administrador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "volume" INTEGER NOT NULL DEFAULT 1,
    "autor" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "imagem" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL DEFAULT 0,
    "genero" "Genero" NOT NULL,
    "demografia" "Demografia" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrinho" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCarrinho" (
    "id" TEXT NOT NULL,
    "carrinhoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "precoUnit" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemCarrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "emailCliente" TEXT NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    "status" "StatusPedido" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemPedido" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoUnit" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "ItemPedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_email_key" ON "Administrador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Carrinho_sessionId_key" ON "Carrinho"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemCarrinho_carrinhoId_produtoId_key" ON "ItemCarrinho"("carrinhoId", "produtoId");

-- AddForeignKey
ALTER TABLE "ItemCarrinho" ADD CONSTRAINT "ItemCarrinho_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCarrinho" ADD CONSTRAINT "ItemCarrinho_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
