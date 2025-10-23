import { S as Servico } from "./servico-Bx3u9W9d.js";
async function seedServicos() {
  const servicosData = [
    // Serviços Residenciais Básicos
    {
      nome: "Limpeza Básica Residencial",
      valor: 120,
      categoria: "Residencial",
      descricao: "Limpeza geral de ambientes residenciais incluindo varredura, passagem de pano, limpeza de banheiros e organização básica."
    },
    {
      nome: "Limpeza Completa de Casa",
      valor: 220,
      categoria: "Residencial",
      descricao: "Limpeza profunda de todos os cômodos da casa, incluindo limpeza de vidros, enceramento de pisos e limpeza detalhada."
    },
    {
      nome: "Limpeza de Apartamento Pequeno",
      valor: 80,
      categoria: "Residencial",
      descricao: "Limpeza completa de apartamentos até 60m², incluindo todos os ambientes e organização."
    },
    {
      nome: "Limpeza Pós-Obra Residencial",
      valor: 350,
      categoria: "Especializado",
      descricao: "Limpeza especializada após reformas e obras, removendo entulho, poeira e resíduos de construção."
    },
    {
      nome: "Limpeza de Mudança",
      valor: 180,
      categoria: "Especializado",
      descricao: "Limpeza completa para imóveis que estão sendo desocupados ou recém-ocupados."
    },
    // Serviços Especializados Residenciais
    {
      nome: "Limpeza de Carpetes e Estofados",
      valor: 150,
      categoria: "Especializado",
      descricao: "Lavagem profunda de carpetes, tapetes e estofados com equipamentos especializados e produtos específicos."
    },
    {
      nome: "Limpeza de Vidros e Janelas",
      valor: 90,
      categoria: "Residencial",
      descricao: "Limpeza completa de vidros internos e externos, janelas, espelhos e superfícies de vidro."
    },
    {
      nome: "Enceramento de Pisos",
      valor: 85,
      categoria: "Especializado",
      descricao: "Aplicação de cera em pisos de madeira, laminado e vinílico para proteção e brilho."
    },
    {
      nome: "Limpeza de Cozinha Profunda",
      valor: 110,
      categoria: "Residencial",
      descricao: "Limpeza detalhada de cozinha incluindo fogão, forno, geladeira, armários internos e azulejos."
    },
    {
      nome: "Limpeza de Banheiros Especializada",
      valor: 75,
      categoria: "Residencial",
      descricao: "Limpeza profunda de banheiros com produtos específicos para remoção de calcário e fungos."
    },
    // Serviços Comerciais
    {
      nome: "Limpeza de Escritório Pequeno",
      valor: 95,
      categoria: "Comercial",
      descricao: "Limpeza diária de escritórios até 100m², incluindo mesas, computadores, banheiros e copa."
    },
    {
      nome: "Limpeza de Escritório Grande",
      valor: 280,
      categoria: "Comercial",
      descricao: "Limpeza completa de escritórios acima de 200m², incluindo salas de reunião, recepção e áreas comuns."
    },
    {
      nome: "Limpeza de Consultório Médico",
      valor: 130,
      categoria: "Especializado",
      descricao: "Limpeza hospitalar de consultórios com produtos específicos e protocolo de desinfecção."
    },
    {
      nome: "Limpeza de Clínica Odontológica",
      valor: 140,
      categoria: "Especializado",
      descricao: "Limpeza especializada para clínicas odontológicas com desinfecção de equipamentos e ambientes."
    },
    {
      nome: "Limpeza de Loja Comercial",
      valor: 160,
      categoria: "Comercial",
      descricao: "Limpeza de estabelecimentos comerciais incluindo vitrine, provadores e área de atendimento."
    },
    // Serviços Industriais e Especiais
    {
      nome: "Limpeza de Galpão Industrial",
      valor: 450,
      categoria: "Industrial",
      descricao: "Limpeza pesada de galpões industriais, remoção de óleo, graxa e resíduos industriais."
    },
    {
      nome: "Limpeza de Restaurante",
      valor: 320,
      categoria: "Comercial",
      descricao: "Limpeza completa de restaurantes incluindo cozinha industrial, salão e área de preparo."
    },
    {
      nome: "Limpeza de Academia",
      valor: 250,
      categoria: "Comercial",
      descricao: "Limpeza e desinfecção de academias, vestiários, equipamentos e áreas de exercício."
    },
    {
      nome: "Limpeza de Escola/Creche",
      valor: 380,
      categoria: "Especializado",
      descricao: "Limpeza educacional com produtos atóxicos, desinfecção de brinquedos e mobiliário infantil."
    },
    {
      nome: "Limpeza de Hospital/Clínica",
      valor: 420,
      categoria: "Especializado",
      descricao: "Limpeza hospitalar com protocolos rígidos de desinfecção e produtos hospitalares."
    },
    // Serviços Externos
    {
      nome: "Limpeza de Fachada Predial",
      valor: 650,
      categoria: "Especializado",
      descricao: "Limpeza externa de fachadas de prédios com equipamentos de segurança e produtos específicos."
    },
    {
      nome: "Limpeza de Piscina",
      valor: 120,
      categoria: "Especializado",
      descricao: "Limpeza completa de piscinas incluindo aspiração, limpeza de bordas e tratamento da água."
    },
    {
      nome: "Limpeza de Quintal e Jardim",
      valor: 95,
      categoria: "Residencial",
      descricao: "Limpeza de áreas externas, varredura de folhas, limpeza de churrasqueira e mobiliário externo."
    },
    {
      nome: "Limpeza de Garagem",
      valor: 85,
      categoria: "Residencial",
      descricao: "Limpeza de garagens residenciais e comerciais, lavagem de piso e organização."
    },
    {
      nome: "Lavagem de Calçadas",
      valor: 60,
      categoria: "Residencial",
      descricao: "Lavagem com pressão de calçadas, entrada de garagem e áreas cimentadas."
    },
    // Serviços Premium e Especiais
    {
      nome: "Limpeza de Evento Corporativo",
      valor: 280,
      categoria: "Comercial",
      descricao: "Limpeza pré e pós eventos corporativos, montagem e desmontagem de espaços."
    },
    {
      nome: "Limpeza de Festa Residencial",
      valor: 150,
      categoria: "Residencial",
      descricao: "Limpeza completa após festas e eventos residenciais, incluindo jardim e área externa."
    },
    {
      nome: "Organização de Armários",
      valor: 100,
      categoria: "Especializado",
      descricao: "Organização completa de armários, guarda-roupas e despensas com sistema de categorização."
    },
    {
      nome: "Limpeza de Apartamento de Temporada",
      valor: 110,
      categoria: "Comercial",
      descricao: "Limpeza especializada para apartamentos de temporada com troca de roupas de cama e organização."
    },
    {
      nome: "Limpeza de Condomínio - Áreas Comuns",
      valor: 380,
      categoria: "Comercial",
      descricao: "Limpeza de áreas comuns de condomínios: hall, escadas, elevadores, salão de festas e portaria."
    }
  ];
  console.log("🔧 Criando", servicosData.length, "instâncias de serviços...");
  const servicos = servicosData.map(
    (data) => new Servico(data.nome, data.descricao, data.valor, data.valor, "Unidade", data.categoria)
  );
  console.log("✅ Criadas", servicos.length, "instâncias");
  const servicosExistentes = JSON.parse(localStorage.getItem("ecleaner_servicos") || "[]");
  console.log("📦 Serviços existentes no localStorage:", servicosExistentes.length);
  if (servicosExistentes.length > 0) {
    console.log("⚠️ Serviços já existem no sistema. Adicionando apenas novos serviços...");
    const novosServicos = servicos.filter(
      (novoServico) => !servicosExistentes.some((existente) => existente.Nome === novoServico.Nome)
    );
    if (novosServicos.length > 0) {
      const servicosAtualizados = [...servicosExistentes, ...novosServicos];
      localStorage.setItem("ecleaner_servicos", JSON.stringify(servicosAtualizados));
      console.log(`✅ ${novosServicos.length} novos serviços adicionados com sucesso!`);
      console.log("💾 Total no localStorage:", servicosAtualizados.length);
    } else {
      console.log("ℹ️ Todos os serviços já existem no sistema.");
    }
  } else {
    console.log("💾 Salvando", servicos.length, "serviços no localStorage...");
    localStorage.setItem("ecleaner_servicos", JSON.stringify(servicos));
    console.log(`✅ ${servicos.length} serviços criados com sucesso!`);
    const verificacao = JSON.parse(localStorage.getItem("ecleaner_servicos") || "[]");
    console.log("🔍 Verificação: salvos", verificacao.length, "serviços no localStorage");
  }
  return servicos;
}
export {
  seedServicos as s
};
//# sourceMappingURL=servicoSeed-DT2RWvuq.js.map
