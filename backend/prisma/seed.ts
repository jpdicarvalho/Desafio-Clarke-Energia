import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Criando fornecedores
    await prisma.fornecedor.createMany({
        data: [
            {
                nome: 'Energia Solar LTDA',
                logo: 'logo_for_01.webp',
                estado: 'SP',
                custo_por_kwh: 0.42,
                limite_minimo_kwh: 25000,
            },
            {
                nome: 'Hidrelétrica do Norte',
                logo: 'logo_for_02.webp',
                estado: 'AM',
                custo_por_kwh: 0.38,
                limite_minimo_kwh: 20000,
            },
            {
                nome: 'Eólica Brasil',
                logo: 'logo_for_03.webp',
                estado: 'BA',
                custo_por_kwh: 0.35,
                limite_minimo_kwh: 18000,
            },
            {
                nome: 'Bioenergia Sustentável',
                logo: 'logo_for_04.webp',
                estado: 'PR',
                custo_por_kwh: 0.40,
                limite_minimo_kwh: 22000,
            },
            {
                nome: 'Termelétrica Nacional',
                logo: 'logo_for_05.webp',
                estado: 'RJ',
                custo_por_kwh: 0.50,
                limite_minimo_kwh: 30000,
            },
            {
                nome: 'Energia Verde LTDA',
                logo: 'logo_for_06.webp',
                estado: 'SP',
                custo_por_kwh: 0.37,
                limite_minimo_kwh: 15000,
            },
            {
                nome: 'HidroSul Energias',
                logo: 'logo_for_07.webp',
                estado: 'RS',
                custo_por_kwh: 0.39,
                limite_minimo_kwh: 17000,
            },
            {
                nome: 'SolarMax Energia',
                logo: 'logo_for_08.webp',
                estado: 'CE',
                custo_por_kwh: 0.43,
                limite_minimo_kwh: 20000,
            },
            {
                nome: 'Norte Energia Renovável',
                logo: 'logo_for_09.webp',
                estado: 'PA',
                custo_por_kwh: 0.36,
                limite_minimo_kwh: 19000,
            },
            {
                nome: 'SulEnergias',
                logo: 'logo_for_10.webp',
                estado: 'SC',
                custo_por_kwh: 0.41,
                limite_minimo_kwh: 23000,
            },
            {
                nome: 'Força Termoelétrica',
                logo: 'logo_for_11.webp',
                estado: 'MG',
                custo_por_kwh: 0.49,
                limite_minimo_kwh: 28000,
            },
            {
                nome: 'Eólica Nordeste',
                logo: 'logo_for_12.webp',
                estado: 'RN',
                custo_por_kwh: 0.34,
                limite_minimo_kwh: 16000,
            },
            {
                nome: 'MegaPower Energias',
                logo: 'logo_for_13.webp',
                estado: 'SP',
                custo_por_kwh: 0.45,
                limite_minimo_kwh: 24000,
            },
            {
                nome: 'Sol e Vento Energia',
                logo: 'logo_for_14.webp',
                estado: 'PE',
                custo_por_kwh: 0.38,
                limite_minimo_kwh: 18000,
            },
            {
                nome: 'Brasil Power Ltda',
                logo: 'logo_for_15.webp',
                estado: 'GO',
                custo_por_kwh: 0.46,
                limite_minimo_kwh: 25000,
            }
        ]
    });

    // Obtendo os IDs dos fornecedores criados
    const fornecedores = await prisma.fornecedor.findMany();

    // Criando número total de clientes atendidos
    await prisma.clienteAtendido.createMany({
        data: [
            {
                fornecedorId: fornecedores[0].id,
                quantidade: 150,
            },
            {
                fornecedorId: fornecedores[1].id,
                quantidade: 95,
            },
            {
                fornecedorId: fornecedores[2].id,
                quantidade: 120,
            },
            {
                fornecedorId: fornecedores[3].id,
                quantidade: 140,
            },
            {
                fornecedorId: fornecedores[4].id,
                quantidade: 170,
            },
            {
                fornecedorId: fornecedores[5].id,
                quantidade: 110,
            },
            {
                fornecedorId: fornecedores[6].id,
                quantidade: 190,
            },
            {
                fornecedorId: fornecedores[7].id,
                quantidade: 145,
            },
            {
                fornecedorId: fornecedores[8].id,
                quantidade: 130,
            },
            {
                fornecedorId: fornecedores[9].id,
                quantidade: 90,
            },
            {
                fornecedorId: fornecedores[10].id,
                quantidade: 125,
            },
            {
                fornecedorId: fornecedores[11].id,
                quantidade: 165,
            },
            {
                fornecedorId: fornecedores[12].id,
                quantidade: 100,
            },
            {
                fornecedorId: fornecedores[13].id,
                quantidade: 105,
            },
            {
                fornecedorId: fornecedores[14].id,
                quantidade: 195,
            },
            {
                fornecedorId: fornecedores[15].id,
                quantidade: 220,
            }
        ],
    });
    
    // Criando avaliações para cada fornecedor
    await prisma.avaliacao.createMany({
        data: [
            {
                fornecedorId: fornecedores[0].id,
                nota: 4.8,
                comentario: "Ótima experiência, atendimento excelente!",
            },
            {
                fornecedorId: fornecedores[0].id,
                nota: 4.5,
                comentario: "Boa qualidade, mas poderia ter mais flexibilidade nos contratos.",
            },
            {
                fornecedorId: fornecedores[1].id,
                nota: 4.2,
                comentario: "Preço justo, recomendo!",
            },
            {
                fornecedorId: fornecedores[1].id,
                nota: 3.9,
                comentario: "Atendimento um pouco lento, mas energia confiável.",
            },
            {
                fornecedorId: fornecedores[2].id,
                nota: 4.6,
                comentario: "Energia limpa e eficiente, adorei!",
            },
            {
                fornecedorId: fornecedores[2].id,
                nota: 4.0,
                comentario: "Poderia ter suporte 24h, mas no geral é bom.",
            }
        ],
    });

    console.log('Dados de teste inseridos com sucesso!');
}

main()
    .catch((e) => {
        console.error('Erro ao popular o banco:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
