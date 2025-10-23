import { d as defineBoot } from "./index-DcwkHxen.js";
import { c as createI18n } from "./vue-i18n.runtime-CPX_irvo.js";
const enUS = {
  indexPage: {
    overview: "Home - System overview"
  },
  pages: {
    servico: {
      title: "Services",
      subtitle: "Manage the offered services",
      searchPlaceholder: "Search services...",
      newButton: "New Service",
      noData: "No services found",
      cadastroTitle: "New Service",
      cadastroSubtitle: "Fill in the service details",
      valor: "Value",
      editar: "Edit",
      excluir: "Delete",
      fields: {
        nome: "Service Name",
        valor: "Value",
        descricao: "Description",
        unidade: "Unit",
        observacao: "Observations",
        ativo: "Active Service"
      },
      messages: {
        saveSuccess: "Service saved successfully!",
        saveError: "Error saving service.",
        deleteSuccess: "Service deleted successfully!",
        deleteError: "Error deleting service."
      }
    },
    pacoteServico: {
      title: "Service Packages",
      subtitle: "Manage the offered service packages",
      searchPlaceholder: "Search packages...",
      newButton: "New Package",
      noData: "No packages found",
      cadastroTitle: "New Service Package",
      editarTitle: "Edit Service Package",
      cadastroSubtitle: "Fill in the package details",
      novoPacote: "New Package",
      editar: "Edit",
      excluir: "Delete",
      margem: "Margin",
      valorCusto: "Cost Value",
      valorVenda: "Sale Value",
      mostrarFavoritos: "Show favorites only",
      favoritos: "favorites",
      confirmarExclusao: 'Are you sure you want to delete package "{descricao}"?',
      fields: {
        descricao: "Package Description",
        margemLucro: "Profit Margin",
        favorito: "Mark as Favorite",
        material: "Material",
        quantidade: "Quantity",
        valorTotal: "Total Value",
        servico: "Service",
        horas: "Hours",
        pessoas: "People",
        valorMaterial: "Material Value",
        valorServico: "Service Value",
        valorCusto: "Cost Value",
        valorVenda: "Sale Value"
      },
      sections: {
        informacoesBasicas: "Basic Information",
        materiais: "Materials",
        servicos: "Services",
        resumo: "Financial Summary"
      },
      buttons: {
        addMaterial: "Add Material",
        addServico: "Add Service"
      },
      messages: {
        noMaterials: "No materials added",
        noServicos: "No services added",
        saveSuccess: "Package saved successfully!",
        saveError: "Error saving package.",
        deleteSuccess: "Package deleted successfully!",
        deleteError: "Error deleting package."
      }
    },
    equipeForm: {
      titleNew: "New Team",
      titleEdit: "Edit Team",
      createSubtitle: "Fill in the new team details",
      sections: {
        basicInfo: "Basic Information",
        membros: "Team Members",
        observacoes: "Notes"
      },
      fields: {
        descricao: "Team Description",
        observacoes: "Observations and Notes",
        lider: "Team Leader",
        membros: "Team Members"
      },
      placeholders: {
        observacoes: "Enter observations, instructions, objectives or any additional information about this team..."
      },
      buttons: {
        save: "Save",
        cancel: "Cancel",
        addMembro: "Add Member"
      },
      messages: {
        saveSuccess: "Team saved successfully!",
        saveError: "Error saving team.",
        loadError: "Error loading team.",
        loadColaboradoresError: "Error loading employees.",
        noMembers: "No members added",
        addFirstMember: 'Click "Add Member" to get started',
        noValidMembers: "You need to add at least one valid member with employee and role defined."
      }
    },
    equipeList: {
      title: "Teams",
      subtitle: "Manage work teams",
      buttons: {
        newEquipe: "New Team",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        confirm: "Confirm",
        loadTestData: "Load Test Data"
      },
      filters: {
        search: "Search team..."
      },
      columns: {
        descricao: "Description",
        membros: "Team Members",
        lider: "Leader",
        actions: "Actions"
      },
      dialogs: {
        delete: {
          message: "Are you sure you want to delete team {descricao}?"
        }
      },
      messages: {
        saveSuccess: "Team saved successfully!",
        saveError: "Error saving team.",
        loadError: "Error loading teams.",
        deleteSuccess: "Team deleted successfully!",
        deleteError: "Error deleting team.",
        loadTestDataSuccess: "Test data loaded successfully!",
        loadTestDataError: "Error loading test data."
      }
    },
    scheduleList: {
      title: "Schedules",
      subtitle: "Manage client schedules",
      buttons: {
        newSchedule: "New Schedule",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        confirm: "Confirm",
        loadTestData: "Load Test Data"
      },
      filters: {
        search: "Search company..."
      },
      columns: {
        logomarca: "Logo",
        name: "Company Name",
        responsavel: "Contact Person",
        telefone: "Phone",
        email: "Email",
        tipo: "Company Type",
        documento: "Tax ID",
        actions: "Actions"
      },
      deleteDialog: {
        message: "Are you sure you want to delete company {name}?"
      },
      messages: {
        saveSuccess: "Company saved successfully!",
        saveError: "Error saving company.",
        loadError: "Error loading companies.",
        deleteSuccess: "Company deleted successfully!",
        deleteError: "Error deleting company.",
        loadTestDataSuccess: "Test data loaded successfully!",
        loadTestDataError: "Error loading test data."
      }
    },
    clientList: {
      title: "Clients",
      subtitle: "Manage clients registered in the system",
      buttons: {
        newClient: "New Client",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        confirm: "Confirm",
        loadTestData: "Load Test Data"
      },
      filters: {
        search: "Search client...",
        status: "Status",
        sort: "Sort by"
      },
      status: {
        active: "Active",
        inactive: "Inactive"
      },
      sort: {
        nameAsc: "Name (A-Z)",
        nameDesc: "Name (Z-A)",
        newest: "Newest first",
        oldest: "Oldest first"
      },
      columns: {
        name: "Name",
        email: "Email",
        phones: "Phones",
        addresses: "Addresses",
        properties: "Properties",
        status: "Status",
        actions: "Actions"
      },
      noProperties: "No properties",
      rooms: "rooms",
      propertyDetails: "Property Details",
      totalRooms: "Total rooms",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      address: "Address",
      noAddress: "No address provided",
      observations: "Observations",
      deleteDialog: {
        title: "Delete Client",
        message: "Are you sure you want to delete client {name}?"
      },
      messages: {
        saveSuccess: "Client saved successfully!",
        saveError: "Error saving client.",
        loadError: "Error loading clients.",
        deleteSuccess: "Client deleted successfully!",
        deleteError: "Error deleting client.",
        loadingTestData: "Load test data",
        loadingTestDataDesc: "This will replace all existing data with sample data. Do you want to continue?",
        testDataLoaded: "Test data loaded successfully!"
      }
    },
    clientEdit: {
      title: "Edit Client",
      buttons: {
        back: "Back",
        save: "Save Changes"
      },
      messages: {
        loadError: "Error loading client data."
      }
    },
    imovelList: {
      title: "Properties",
      subtitle: "Manage registered properties in the system",
      buttons: {
        newProperty: "New Property",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        confirm: "Confirm",
        loadTestData: "Load Test Data"
      },
      filters: {
        search: "Search property...",
        cidade: "City",
        areaRange: "Area Range",
        sort: "Sort by"
      },
      areaRanges: {
        small: "Up to 50m²",
        medium: "51-100m²",
        large: "101-200m²",
        extraLarge: "Over 200m²"
      },
      sortOptions: {
        endereco: "Address",
        area: "Area (largest)",
        comodos: "Rooms (most)",
        proprietario: "Owner (A-Z)"
      },
      table: {
        endereco: "Address",
        area: "Area",
        comodos: "Rooms",
        proprietario: "Owner",
        observacao: "Notes",
        actions: "Actions"
      },
      deleteDialog: {
        title: "Delete Property",
        message: "Are you sure you want to delete the property {endereco}?"
      },
      messages: {
        deleteSuccess: "Property deleted successfully!",
        deleteError: "Error deleting property.",
        loadingTestData: "Load test data",
        loadingTestDataDesc: "This will replace all existing data with sample data. Do you want to continue?",
        testDataLoaded: "Test data loaded successfully!",
        editNotImplemented: "Edit functionality under development."
      }
    },
    material: {
      title: "Materials",
      subtitle: "Manage materials used in services",
      newTitle: "New Material",
      editTitle: "Edit Material",
      formSubtitle: "Fill in the material data",
      newButton: "New Material",
      editButton: "Edit",
      deleteButton: "Delete",
      noData: "No materials found",
      searchPlaceholder: "Search material...",
      sections: {
        materialData: "Material Data",
        additionalInfo: "Additional Information"
      },
      fields: {
        descricao: "Description",
        unidade: "Unit",
        precoUnitario: "Unit Price",
        url: "Product URL",
        imagem: "Image"
      },
      messages: {
        saveSuccess: "Material saved successfully!",
        saveError: "Error saving material.",
        updateSuccess: "Material updated successfully!",
        updateError: "Error updating material.",
        deleteSuccess: "Material deleted successfully!",
        deleteError: "Error deleting material.",
        imageTooBig: "Image too large. Maximum 5MB."
      }
    }
  },
  validations: {
    required: "Required field",
    minLength: "Minimum {min} characters",
    maxLength: "Maximum {max} characters",
    email: "Invalid email",
    date: "Invalid date",
    phone: "Invalid phone number",
    cpf: "Invalid Tax ID",
    cnpj: "Invalid Business Tax ID",
    cep: "Invalid ZIP code"
  },
  enums: {
    statusColaborador: {
      undefined: "Undefined",
      APROVADO: "Approved",
      REJEITADO: "Rejected",
      ATIVO: "Active",
      INATIVO: "Inactive",
      EM_ANALISE: "In Analysis",
      EM_EXPERIENCIA: "In Trial Period",
      DESLIGADO: "Terminated"
    },
    funcaoColaborador: {
      LIDER: "Leader",
      EXECUTOR: "Executor",
      MOTORISTA: "Driver"
    },
    statusOrcamento: {
      RASCUNHO: "Draft",
      ENVIADO: "Sent",
      APROVADO: "Approved",
      RECUSADO: "Refused",
      EXPIRADO: "Expired",
      CANCELADO: "Cancelled",
      // Keep for compatibility
      PENDENTE: "Pending",
      REJEITADO: "Rejected"
    },
    tipoItemOrcamento: {
      MATERIAL: "Material",
      SERVICO: "Service"
    }
  },
  components: {
    colaboradorEquipeCard: {
      firstMember: "First Member",
      memberNumber: "Member {number}",
      remove: "Remove member",
      fields: {
        colaborador: "Employee",
        funcoes: "Roles"
      }
    }
  },
  menu: {
    home: "Home",
    myAccount: "My Account",
    settings: "Settings",
    logout: "Logout",
    pessoas: {
      title: "People",
      submenus: {
        clients: {
          title: "Clients",
          new: "New Client",
          list: "List Clients"
        },
        employees: {
          title: "Employees",
          new: "New Employee",
          list: "List Employees"
        },
        schedules: {
          title: "Schedules",
          new: "New Schedule",
          list: "List Schedules"
        },
        teams: {
          title: "Teams",
          new: "New Team",
          list: "List Teams"
        }
      }
    },
    servicos: {
      title: "Services",
      new: "New Service",
      list: "List Services"
    },
    pacotesServicos: {
      title: "Service Packages",
      new: "New Package",
      list: "List Packages"
    },
    materiais: {
      title: "Materials",
      new: "New Material",
      list: "List Materials"
    },
    orcamentos: {
      title: "Budget Quotes",
      new: "New Budget Quote",
      list: "List Budget Quotes"
    }
  },
  buttons: {
    save: "Save",
    update: "Update",
    cancel: "Cancel",
    add: "Add",
    remove: "Remove",
    close: "Close",
    downloadPDF: "Download PDF",
    sendEmail: "Send by Email"
  },
  validation: {
    required: "Required field",
    email: "Invalid email",
    positiveNumber: "Must be a positive number",
    nonNegativeNumber: "Must be a non-negative number",
    invalidCep: "ZIP Code not found",
    cepFound: "Address loaded successfully!",
    cepError: "Error fetching ZIP Code. Check your connection."
  },
  forms: {
    validation: {
      required: "Required field",
      email: "Invalid email",
      maxFileSize: "File must be less than {size}",
      invalidFileType: "Invalid file type",
      positiveNumber: "Must be a positive number",
      nonNegativeNumber: "Must be a non-negative number",
      cep: "ZIP code must follow format 12345-678",
      invalidCep: "Invalid ZIP code",
      invalidDate: "Invalid date",
      dateRequired: "Date is required",
      futureDate: "Date must be in the future",
      pastDate: "Date must be in the past",
      dateAfter: "Date must be after {date}",
      dateBefore: "Date must be before {date}",
      validityAfterEmission: "Validity date must be after emission date"
    },
    buttons: {
      save: "Save",
      update: "Update",
      cancel: "Cancel",
      add: "Add",
      remove: "Remove"
    },
    orcamento: {
      title: "Budget Quotes",
      subtitle: "Manage client budget quotes",
      searchPlaceholder: "Search budget quotes...",
      createTitle: "New Budget Quote",
      editTitle: "Edit Budget Quote",
      viewTitle: "View Budget Quote",
      createSubtitle: "Fill in the budget quote details",
      editSubtitle: "Edit the budget quote details",
      viewSubtitle: "Budget quote details",
      newButton: "New Budget Quote",
      viewButton: "View",
      editButton: "Edit",
      deleteButton: "Delete",
      addService: "Add Service",
      addMaterial: "Add Material",
      serviceItem: "Service {number}",
      materialItem: "Material {number}",
      valorPacote: "Package Value",
      noData: "No budget quotes found",
      noServices: "No services added",
      noMaterials: "No materials added",
      noClients: "No clients found",
      noImoveis: "No properties found for this client",
      noServicePackages: "No service packages found",
      notFound: "Budget quote not found",
      stats: {
        total: "Total",
        pending: "Pending",
        approved: "Approved",
        totalValue: "Total Value"
      },
      sections: {
        basicInfo: "Basic Information",
        client: "Client",
        propertyDetails: "Property Details",
        servicePackage: "Service Package",
        items: "Budget Items",
        services: "Services",
        materials: "Materials",
        financialSummary: "Financial Summary"
      },
      clientSummary: {
        noClient: "No client selected",
        noProperty: "No property selected",
        noAddress: "Address not provided"
      },
      propertyInfo: {
        basicInfo: "Basic Information",
        address: "Address",
        observations: "Observations",
        totalRooms: "Total Rooms",
        bedrooms: "Bedrooms",
        bathrooms: "Bathrooms",
        area: "Total Area"
      },
      labels: {
        item: "Item"
      },
      fields: {
        numero: "Number",
        cliente: "Client",
        imovel: "Property",
        pacoteServico: "Service Package",
        dataEmissao: "Issue Date",
        validade: "Validity",
        status: "Status",
        servico: "Service",
        material: "Material",
        quantidade: "Quantity",
        quantity: "Quantity",
        valorUnitario: "Unit Value",
        subtotal: "Subtotal",
        desconto: "Discount",
        valorTotal: "Total Value",
        subtotalItems: "Items Subtotal",
        itemDescription: "Item Description",
        itemType: "Item Type",
        unit: "Unit",
        unitCost: "Unit Cost",
        observations: "Observations",
        observacoes: "Notes",
        observacoesGerais: "General Notes",
        nome: "Name",
        email: "Email",
        telefone: "Phone",
        documento: "CPF/CNPJ",
        naoInformado: "Not provided"
      },
      buttons: {
        approve: "Approve",
        reject: "Reject",
        print: "Print",
        share: "Share"
      },
      actions: {
        addItem: "Add Item",
        removeItem: "Remove Item",
        selectMaterial: "Select Material"
      },
      confirmDelete: {
        title: "Confirm Delete",
        message: "Are you sure you want to delete this budget quote?"
      },
      confirmReject: {
        title: "Confirm Reject",
        message: "Are you sure you want to reject this budget quote?"
      },
      messages: {
        createSuccess: "Budget quote created successfully!",
        updateSuccess: "Budget quote updated successfully!",
        deleteSuccess: "Budget quote deleted successfully!",
        approveSuccess: "Budget quote approved successfully!",
        rejectSuccess: "Budget quote rejected.",
        loadError: "Error loading data.",
        saveError: "Error saving budget quote.",
        deleteError: "Error deleting budget quote.",
        approveError: "Error approving budget quote.",
        rejectError: "Error rejecting budget quote.",
        printDevelopment: "Print functionality under development.",
        shareDevelopment: "Share functionality under development.",
        noItems: "No items added",
        selectPackageOrAddItems: "Select a service package or add items manually"
      }
    },
    servico: {
      sections: {
        serviceData: "Service Data"
      }
    },
    schedule: {
      title: "Create Company",
      subtitle: "Fill in the company details",
      sections: {
        empresa: "Company Information",
        responsavel: "Contact Person Information",
        enderecoComercial: "Business Address",
        dadosBancarios: "Bank Information"
      },
      fields: {
        nomeEmpresa: "Company Name",
        documentoEmpresa: "Tax ID/EIN",
        telefoneComercial: "Business Phone",
        emailComercial: "Business Email",
        tipoEmpresa: "Company Type",
        logomarca: "Logo",
        responsavel: {
          nome: "First Name",
          sobrenome: "Last Name",
          email: "Email",
          telefone: "Phone",
          celular: "Mobile"
        },
        endereco: {
          cep: "ZIP Code",
          logradouro: "Street",
          numero: "Number",
          complemento: "Additional Info",
          bairro: "Neighborhood",
          cidade: "City",
          estado: "State"
        },
        dadosBancarios: {
          banco: "Bank",
          agencia: "Branch Number",
          conta: "Account Number",
          tipoConta: "Account Type",
          pix: "PIX Key"
        }
      },
      hints: {
        nomeEmpresa: "Enter the full company name",
        documentoEmpresa: "Enter the Tax ID/EIN (numbers only)",
        telefoneComercial: "Enter the business phone number",
        emailComercial: "Enter the business email",
        tipoEmpresa: "Select the company type",
        logomarca: "Upload company logo (optional, max 5MB)",
        responsavel: {
          nome: "Enter contact person's first name",
          sobrenome: "Enter contact person's last name",
          email: "Enter contact person's email",
          telefone: "Enter contact person's phone (optional)",
          celular: "Enter contact person's mobile number"
        },
        endereco: {
          cep: "Enter business ZIP code",
          logradouro: "Enter business street name",
          numero: "Enter business street number",
          complemento: "Enter additional address info (optional)",
          bairro: "Enter business neighborhood",
          cidade: "Enter business city",
          estado: "Enter business state abbreviation"
        },
        dadosBancarios: {
          banco: "Enter bank name",
          agencia: "Enter branch number (without check digit)",
          conta: "Enter account number with check digit",
          tipoConta: "Enter account type (checking or savings)",
          pix: "Enter PIX key (optional)"
        }
      },
      messages: {
        saveSuccess: "Company saved successfully!",
        saveError: "Error saving company.",
        deleteSuccess: "Company deleted successfully!",
        deleteError: "Error deleting company.",
        updateSuccess: "Company updated successfully!",
        updateError: "Error updating company.",
        invalidForm: "Please fill in all required fields!"
      }
    },
    cliente: {
      title: "New Client",
      subtitle: "Client registration and information management",
      editSubtitle: "Client information editing and updating",
      sections: {
        personalData: "Personal Information",
        addresses: "Addresses",
        properties: "Properties",
        observations: "Notes",
        observacoes: "Notes"
      },
      fields: {
        nome: "First Name",
        sobrenome: "Last Name",
        email: "Email",
        telefone: "Phone",
        celular: "Mobile",
        observacoes: "Notes"
      },
      address: {
        title: "Address {0}",
        addButton: "Add Address",
        fields: {
          cep: "ZIP Code",
          rua: "Street",
          numero: "Number",
          complemento: "Additional Info",
          bairro: "Neighborhood",
          cidade: "City",
          estado: "State"
        }
      },
      property: {
        title: "Property {0}",
        addButton: "Add Property",
        noProperties: "No properties registered",
        clickToAdd: 'Click "Add Property" to start',
        fields: {
          totalComodos: "Total Rooms",
          numeroQuartos: "Number of Bedrooms",
          numeroBanheiros: "Number of Bathrooms",
          areaTotal: "Total Area",
          observacao: "Notes"
        },
        address: {
          title: "Property Address",
          sameAsClient: "Same as client address"
        }
      }
    },
    imovel: {
      title: "New Property",
      subtitle: "Property registration and information management",
      sections: {
        propertyData: "Property Information",
        owner: "Owner",
        address: "Address",
        observations: "Notes"
      },
      fields: {
        totalComodos: "Total Rooms",
        numeroQuartos: "Number of Bedrooms",
        numeroBanheiros: "Number of Bathrooms",
        areaTotal: "Total Area",
        dono: "Owner",
        observacao: "Notes"
      },
      placeholders: {
        observacao: "Enter observations, special features, property conditions or any additional relevant information..."
      },
      validation: {
        totalComodosInvalid: "Total rooms must be greater than the sum of bedrooms and bathrooms"
      },
      messages: {
        success: "Property registered successfully!",
        error: "Error registering property."
      }
    },
    endereco: {
      fields: {
        logradouro: "Street",
        numero: "Number",
        complemento: "Additional Info",
        bairro: "Neighborhood",
        cidade: "City",
        estado: "State",
        cep: "ZIP Code",
        pais: "Country"
      }
    },
    colaborador: {
      subtitle: "Fill in the employee details",
      title: "Employee Registration",
      list: {
        title: "Employees",
        subtitle: "Manage company employees",
        buttons: {
          new: "New Employee",
          edit: "Edit",
          delete: "Delete",
          cancel: "Cancel",
          confirm: "Confirm",
          loadTestData: "Load Test Data"
        },
        filters: {
          search: "Search employee...",
          status: "Status",
          sort: "Sort by"
        },
        sort: {
          nameAsc: "Name (A-Z)",
          nameDesc: "Name (Z-A)",
          newest: "Newest first",
          oldest: "Oldest first"
        },
        columns: {
          name: "Name",
          email: "Email",
          phones: "Phones",
          status: "Status",
          availability: "Availability",
          regions: "Regions",
          age: "Age",
          experience: "Experience",
          actions: "Actions"
        },
        deleteDialog: {
          title: "Delete Employee",
          message: "Are you sure you want to delete employee {name}?"
        },
        messages: {
          saveSuccess: "Employee saved successfully!",
          saveError: "Error saving employee.",
          loadError: "Error loading employees.",
          deleteSuccess: "Employee deleted successfully!",
          deleteError: "Error deleting employee.",
          loadingTestData: "Load test data",
          loadingTestDataDesc: "This will replace all existing data with sample data. Do you want to continue?",
          testDataLoaded: "Test data loaded successfully!"
        }
      },
      sections: {
        personalData: "Personal Information",
        documents: "Documents",
        professionalInfo: "Professional Information",
        experience: "Experience",
        references: "References",
        address: "Residential Address",
        availability: "Availability",
        observations: "Notes"
      },
      fields: {
        nome: "First Name",
        sobrenome: "Last Name",
        email: "Email",
        telefone: "Phone",
        celular: "Mobile",
        documentoIdentidade: "ID Number",
        dataNascimento: "Date of Birth",
        nacionalidade: "Nationality",
        fotoPerfil: "Profile Picture",
        curriculo: "Resume",
        salarioEsperado: "Expected Salary",
        disponibilidade: "Availability",
        regioesAtuacao: "Work Regions",
        observacoes: "Notes"
      },
      experience: {
        title: "Experience {0}",
        addButton: "Add Experience",
        fields: {
          empresa: "Company",
          cargo: "Position",
          dataInicio: "Start Date",
          dataFim: "End Date",
          atividades: "Main Activities"
        }
      },
      reference: {
        title: "Reference {0}",
        addButton: "Add Reference",
        fields: {
          nome: "Name",
          empresa: "Company",
          cargo: "Position",
          telefone: "Phone",
          email: "Email"
        }
      }
    },
    login: {
      title: "eCleaner",
      subtitle: "Management System for Cleaning Companies",
      formTitle: "Sign in to your account",
      fields: {
        usuario: "Username",
        senha: "Password"
      },
      buttons: {
        login: "Sign In"
      },
      messages: {
        loginSuccess: "Login successful!",
        loginError: "Internal error. Please try again.",
        invalidCredentials: "Invalid username or password."
      },
      testInfo: "Test environment",
      testCredentials: {
        user: "Username"
      }
    },
    configuracoes: {
      title: "System Settings",
      subtitle: "Configure and manage system data",
      sections: {
        dataManagement: {
          title: "Data Management",
          subtitle: "Configure and manage system data.",
          completeLoad: {
            title: "Complete System Load",
            description: "Loads all initial data necessary for system operation: cleaning materials, sample clients, collaborators and other essential data.",
            button: "Execute Complete Load",
            confirm: "Are you sure you want to execute the complete load? This may take a few seconds.",
            success: "Complete load executed successfully!",
            error: "Error executing complete load."
          },
          individualLoad: {
            title: "Individual Loads",
            materials: {
              title: "Cleaning Materials",
              description: "15 essential materials",
              button: "Load",
              success: "Materials loaded successfully!",
              error: "Error loading materials."
            },
            clients: {
              title: "Clients",
              description: "Sample data",
              button: "Load",
              success: "Clients loaded successfully!",
              error: "Error loading clients."
            },
            collaborators: {
              title: "Collaborators",
              description: "Initial team",
              button: "Load",
              success: "Collaborators loaded successfully!",
              error: "Error loading collaborators."
            },
            services: {
              title: "Services",
              description: "30 cleaning services",
              button: "Load",
              success: "Services loaded successfully!",
              error: "Error loading services."
            }
          }
        },
        generalConfig: {
          title: "General Settings",
          fields: {
            companyName: "Company Name",
            companyEmail: "Company Email",
            companyPhone: "Company Phone",
            defaultCurrency: "Default Currency",
            logo: "Company Logo"
          },
          buttons: {
            edit: "Edit Settings",
            save: "Save",
            cancel: "Cancel"
          },
          messages: {
            success: "Settings saved!",
            error: "Error saving settings"
          }
        },
        activity: {
          title: "Activity Log",
          subtitle: "History of actions performed in the system",
          empty: "No activity recorded",
          buttons: {
            clear: "Clear Log"
          },
          actions: {
            "complete-load": "Complete load executed",
            "load-materials": "Materials loaded",
            "load-clients": "Clients loaded",
            "load-collaborators": "Collaborators loaded"
          }
        },
        danger: {
          title: "Danger Zone",
          subtitle: "Irreversible actions - use with caution",
          clearData: {
            title: "Clear All Data",
            description: "Permanently removes all system data. This action cannot be undone.",
            button: "Clear System",
            confirm: "WARNING: This action will remove ALL system data and cannot be undone. Are you sure?",
            success: "All data has been successfully removed!",
            error: "Error clearing data."
          }
        }
      },
      buttons: {
        cancel: "Cancel",
        confirm: "Confirm",
        loading: "Loading..."
      }
    },
    material: {
      editTitle: "Edit Material",
      newTitle: "New Material",
      formSubtitle: "Fill in the material details",
      sections: {
        materialData: "Material Data",
        additionalInfo: "Additional Information",
        imagePreview: "Image Preview"
      },
      fields: {
        descricao: "Description",
        unidade: "Unit",
        precoUnitario: "Unit Price",
        url: "Product URL",
        imagem: "Image"
      },
      messages: {
        saveSuccess: "Material saved successfully!",
        saveError: "Error saving material.",
        updateSuccess: "Material updated successfully!",
        updateError: "Error updating material.",
        deleteSuccess: "Material deleted successfully!",
        deleteError: "Error deleting material.",
        loadError: "Error loading material.",
        imageTooBig: "Image too large. Maximum 5MB.",
        clickToSelectImage: "Click to select an image"
      }
    }
  },
  layout: {
    logout: {
      confirmTitle: "Sign out",
      confirmMessage: "Are you sure you want to sign out?",
      success: "Logout successful!"
    }
  },
  messages: {
    saveSuccess: "Data saved successfully!",
    saveError: "Error saving data. Please try again.",
    updateSuccess: "Data updated successfully!",
    updateError: "Error updating data. Please try again.",
    deleteSuccess: "Item removed successfully!",
    deleteError: "Error removing item. Please try again.",
    loadError: "Error loading data. Please try again.",
    validationError: "Please check required fields.",
    networkError: "Connection error. Check your internet and try again.",
    pdfGenerateSuccess: "PDF generated successfully!",
    pdfGenerateError: "Error generating PDF. Check the data and try again.",
    pdfConfigMissing: "Configure company data in Settings before generating PDF.",
    emailSent: "Quote successfully sent to {email}!",
    emailError: "Error sending email: {error}",
    emailConfigMissing: "Configure EmailJS in Settings before sending emails.",
    clienteEmailMissing: "Client does not have a registered email. Please update the client information."
  }
};
const ptBR = {
  indexPage: {
    overview: "Início - Visão geral do sistema"
  },
  pages: {
    servico: {
      title: "Serviços",
      subtitle: "Gerencie os serviços oferecidos",
      searchPlaceholder: "Buscar serviços...",
      newButton: "Novo Serviço",
      noData: "Nenhum serviço encontrado",
      cadastroTitle: "Novo Serviço",
      cadastroSubtitle: "Preencha os dados do serviço",
      valor: "Valor",
      editar: "Editar",
      excluir: "Excluir",
      buttons: {
        novo: "Novo Serviço"
      },
      fields: {
        nome: "Nome do Serviço",
        valor: "Valor",
        descricao: "Descrição",
        unidade: "Unidade",
        observacao: "Observações",
        ativo: "Serviço Ativo"
      },
      messages: {
        saveSuccess: "Serviço salvo com sucesso!",
        saveError: "Erro ao salvar serviço.",
        deleteSuccess: "Serviço excluído com sucesso!",
        deleteError: "Erro ao excluir serviço."
      }
    },
    pacoteServico: {
      title: "Pacotes de Serviços",
      subtitle: "Gerencie os pacotes de serviços oferecidos",
      searchPlaceholder: "Buscar pacotes...",
      newButton: "Novo Pacote",
      noData: "Nenhum pacote encontrado",
      cadastroTitle: "Novo Pacote de Serviços",
      editarTitle: "Editar Pacote de Serviços",
      cadastroSubtitle: "Preencha os dados do pacote",
      novoPacote: "Novo Pacote",
      editar: "Editar",
      excluir: "Excluir",
      margem: "Margem",
      valorCusto: "Valor Custo",
      valorVenda: "Valor Venda",
      mostrarFavoritos: "Mostrar apenas favoritos",
      favoritos: "favoritos",
      confirmarExclusao: 'Tem certeza que deseja excluir o pacote "{descricao}"?',
      fields: {
        descricao: "Descrição do Pacote",
        margemLucro: "Margem de Lucro",
        favorito: "Marcar como Favorito",
        material: "Material",
        quantidade: "Quantidade",
        valorTotal: "Valor Total",
        servico: "Serviço",
        horas: "Horas",
        pessoas: "Pessoas",
        valorMaterial: "Valor Material",
        valorServico: "Valor Serviço",
        valorCusto: "Valor Custo",
        valorVenda: "Valor Venda"
      },
      sections: {
        informacoesBasicas: "Informações Básicas",
        materiais: "Materiais",
        servicos: "Serviços",
        resumo: "Resumo Financeiro"
      },
      buttons: {
        addMaterial: "Adicionar Material",
        addServico: "Adicionar Serviço"
      },
      messages: {
        noMaterials: "Nenhum material adicionado",
        noServicos: "Nenhum serviço adicionado",
        saveSuccess: "Pacote salvo com sucesso!",
        saveError: "Erro ao salvar pacote.",
        deleteSuccess: "Pacote excluído com sucesso!",
        deleteError: "Erro ao excluir pacote."
      }
    },
    equipeForm: {
      titleNew: "Nova Equipe",
      titleEdit: "Editar Equipe",
      createSubtitle: "Preencha os dados da nova equipe",
      sections: {
        basicInfo: "Informações Básicas",
        membros: "Membros da Equipe",
        observacoes: "Observações"
      },
      fields: {
        descricao: "Descrição da Equipe",
        observacoes: "Observações e Notas",
        lider: "Líder da Equipe",
        membros: "Membros da Equipe"
      },
      placeholders: {
        observacoes: "Digite observações, instruções, objetivos ou qualquer informação adicional sobre esta equipe..."
      },
      buttons: {
        save: "Salvar",
        cancel: "Cancelar",
        addMembro: "Adicionar Membro"
      },
      messages: {
        saveSuccess: "Equipe salva com sucesso!",
        saveError: "Erro ao salvar equipe.",
        loadError: "Erro ao carregar equipe.",
        loadColaboradoresError: "Erro ao carregar colaboradores.",
        noMembers: "Nenhum membro adicionado",
        addFirstMember: 'Clique em "Adicionar Membro" para começar',
        noValidMembers: "É necessário adicionar pelo menos um membro válido com colaborador e função definidos."
      }
    },
    equipeList: {
      title: "Equipes",
      subtitle: "Gerencie as equipes de trabalho",
      buttons: {
        newEquipe: "Nova Equipe",
        newColaborador: "Novo Colaborador",
        edit: "Editar",
        delete: "Excluir",
        cancel: "Cancelar",
        confirm: "Confirmar",
        loadTestData: "Carregar Dados de Teste"
      },
      filters: {
        search: "Buscar equipe..."
      },
      columns: {
        descricao: "Descrição",
        membros: "Membros da Equipe",
        lider: "Líder",
        actions: "Ações"
      },
      dialogs: {
        delete: {
          message: "Tem certeza que deseja excluir a equipe {descricao}?"
        }
      },
      messages: {
        saveSuccess: "Equipe salva com sucesso!",
        saveError: "Erro ao salvar equipe.",
        loadError: "Erro ao carregar equipes.",
        deleteSuccess: "Equipe excluída com sucesso!",
        deleteError: "Erro ao excluir equipe.",
        loadTestDataSuccess: "Dados de teste carregados com sucesso!",
        loadTestDataError: "Erro ao carregar dados de teste."
      }
    },
    scheduleList: {
      title: "Schedules",
      subtitle: "Gerencie os schedules clientes",
      buttons: {
        newSchedule: "Novo Schedule",
        edit: "Editar",
        delete: "Excluir",
        cancel: "Cancelar",
        confirm: "Confirmar",
        loadTestData: "Carregar Dados de Teste"
      },
      filters: {
        search: "Buscar schedule..."
      },
      columns: {
        logomarca: "Logomarca",
        name: "Nome do Schedule",
        responsavel: "Responsável",
        telefone: "Telefone",
        email: "E-mail",
        tipo: "Tipo de Schedule",
        documento: "CNPJ/CPF",
        actions: "Ações"
      },
      deleteDialog: {
        message: "Tem certeza que deseja excluir o schedule {name}?"
      },
      messages: {
        saveSuccess: "Schedule salvo com sucesso!",
        saveError: "Erro ao salvar schedule.",
        loadError: "Erro ao carregar schedules.",
        deleteSuccess: "Schedule excluído com sucesso!",
        deleteError: "Erro ao excluir schedule.",
        loadTestDataSuccess: "Dados de teste carregados com sucesso!",
        loadTestDataError: "Erro ao carregar dados de teste."
      }
    },
    clientList: {
      title: "Clientes",
      subtitle: "Gerencie os clientes cadastrados no sistema",
      buttons: {
        newClient: "Novo Cliente",
        edit: "Editar",
        delete: "Excluir",
        cancel: "Cancelar",
        confirm: "Confirmar",
        loadTestData: "Carregar Dados de Teste"
      },
      filters: {
        search: "Buscar cliente...",
        status: "Status",
        sort: "Ordenar por"
      },
      status: {
        active: "Ativo",
        inactive: "Inativo"
      },
      sort: {
        nameAsc: "Nome (A-Z)",
        nameDesc: "Nome (Z-A)",
        newest: "Mais recentes",
        oldest: "Mais antigos"
      },
      columns: {
        name: "Nome",
        email: "E-mail",
        phones: "Telefones",
        addresses: "Endereços",
        properties: "Imóveis",
        status: "Status",
        actions: "Ações"
      },
      noProperties: "Nenhum imóvel",
      rooms: "cômodos",
      propertyDetails: "Detalhes do Imóvel",
      totalRooms: "Total de cômodos",
      bedrooms: "Quartos",
      bathrooms: "Banheiros",
      address: "Endereço",
      noAddress: "Endereço não informado",
      observations: "Observações",
      deleteDialog: {
        title: "Excluir Cliente",
        message: "Tem certeza que deseja excluir o cliente {name}?"
      },
      messages: {
        saveSuccess: "Cliente salvo com sucesso!",
        saveError: "Erro ao salvar cliente.",
        loadError: "Erro ao carregar clientes.",
        deleteSuccess: "Cliente excluído com sucesso!",
        deleteError: "Erro ao excluir cliente.",
        loadingTestData: "Carregar dados de teste",
        loadingTestDataDesc: "Isso irá substituir todos os dados existentes por dados de exemplo. Deseja continuar?",
        testDataLoaded: "Dados de teste carregados com sucesso!"
      }
    },
    clientEdit: {
      title: "Editar Cliente",
      buttons: {
        back: "Voltar",
        save: "Salvar Alterações"
      },
      messages: {
        loadError: "Erro ao carregar dados do cliente."
      }
    },
    imovelList: {
      title: "Imóveis",
      subtitle: "Gerencie os imóveis cadastrados no sistema",
      buttons: {
        newProperty: "Novo Imóvel",
        edit: "Editar",
        delete: "Excluir",
        cancel: "Cancelar",
        confirm: "Confirmar",
        loadTestData: "Carregar Dados de Teste"
      },
      filters: {
        search: "Buscar imóvel...",
        cidade: "Cidade",
        areaRange: "Faixa de Área",
        sort: "Ordenar por"
      },
      areaRanges: {
        small: "Até 50m²",
        medium: "51-100m²",
        large: "101-200m²",
        extraLarge: "Acima de 200m²"
      },
      sortOptions: {
        endereco: "Endereço",
        area: "Área (maior)",
        comodos: "Cômodos (mais)",
        proprietario: "Proprietário (A-Z)"
      },
      table: {
        endereco: "Endereço",
        area: "Área",
        comodos: "Cômodos",
        proprietario: "Proprietário",
        observacao: "Observações",
        actions: "Ações"
      },
      deleteDialog: {
        title: "Excluir Imóvel",
        message: "Tem certeza que deseja excluir o imóvel {endereco}?"
      },
      messages: {
        deleteSuccess: "Imóvel excluído com sucesso!",
        deleteError: "Erro ao excluir imóvel.",
        loadingTestData: "Carregar dados de teste",
        loadingTestDataDesc: "Isso irá substituir todos os dados existentes por dados de exemplo. Deseja continuar?",
        testDataLoaded: "Dados de teste carregados com sucesso!",
        editNotImplemented: "Funcionalidade de edição em desenvolvimento."
      }
    },
    material: {
      title: "Materiais",
      subtitle: "Gerencie os materiais utilizados nos serviços",
      newTitle: "Novo Material",
      editTitle: "Editar Material",
      formSubtitle: "Preencha os dados do material",
      newButton: "Novo Material",
      editButton: "Editar",
      deleteButton: "Excluir",
      noData: "Nenhum material encontrado",
      searchPlaceholder: "Buscar material...",
      sections: {
        materialData: "Dados do Material",
        additionalInfo: "Informações Adicionais"
      },
      fields: {
        descricao: "Descrição",
        unidade: "Unidade",
        precoUnitario: "Preço Unitário",
        url: "URL do Produto",
        imagem: "Imagem"
      },
      messages: {
        saveSuccess: "Material salvo com sucesso!",
        saveError: "Erro ao salvar material.",
        updateSuccess: "Material atualizado com sucesso!",
        updateError: "Erro ao atualizar material.",
        deleteSuccess: "Material excluído com sucesso!",
        deleteError: "Erro ao excluir material.",
        imageTooBig: "Imagem muito grande. Máximo 5MB."
      }
    }
  },
  menu: {
    home: "Início",
    myAccount: "Minha Conta",
    settings: "Configurações",
    logout: "Sair",
    pessoas: {
      title: "Pessoas",
      submenus: {
        clients: {
          title: "Clientes",
          new: "Novo Cliente",
          list: "Listar Clientes"
        },
        employees: {
          title: "Colaboradores",
          new: "Novo Colaborador",
          list: "Listar Colaboradores"
        },
        schedules: {
          title: "Schedules",
          new: "Novo Schedule",
          list: "Listar Schedules"
        },
        teams: {
          title: "Equipes",
          new: "Nova Equipe",
          list: "Listar Equipes"
        }
      }
    },
    servicos: {
      title: "Serviços",
      new: "Novo Serviço",
      list: "Listar Serviços"
    },
    pacotesServicos: {
      title: "Pacotes de Serviços",
      new: "Novo Pacote",
      list: "Listar Pacotes"
    },
    materiais: {
      title: "Materiais",
      new: "Novo Material",
      list: "Listar Materiais"
    },
    orcamentos: {
      title: "Orçamentos",
      new: "Novo Orçamento",
      list: "Listar Orçamentos"
    }
  },
  buttons: {
    save: "Salvar",
    update: "Atualizar",
    cancel: "Cancelar",
    add: "Adicionar",
    remove: "Remover",
    close: "Fechar",
    downloadPDF: "Baixar PDF",
    sendEmail: "Enviar por E-mail"
  },
  validation: {
    required: "Campo obrigatório",
    email: "E-mail inválido",
    positiveNumber: "Deve ser um número positivo",
    nonNegativeNumber: "Deve ser um número não negativo",
    invalidCep: "CEP não encontrado",
    cepFound: "Endereço carregado com sucesso!",
    cepError: "Erro ao buscar CEP. Verifique sua conexão."
  },
  validations: {
    required: "Campo obrigatório",
    minLength: "Mínimo de {min} caracteres",
    maxLength: "Máximo de {max} caracteres",
    email: "E-mail inválido",
    date: "Data inválida",
    phone: "Telefone inválido",
    cpf: "CPF inválido",
    cnpj: "CNPJ inválido",
    cep: "CEP inválido"
  },
  enums: {
    statusColaborador: {
      undefined: "Não definido",
      APROVADO: "Aprovado",
      REJEITADO: "Rejeitado",
      ATIVO: "Ativo",
      INATIVO: "Inativo",
      EM_ANALISE: "Em Análise",
      EM_EXPERIENCIA: "Em Experiência",
      DESLIGADO: "Desligado"
    },
    funcaoColaborador: {
      LIDER: "Líder",
      EXECUTOR: "Executor",
      MOTORISTA: "Motorista"
    },
    statusOrcamento: {
      RASCUNHO: "Rascunho",
      ENVIADO: "Enviado",
      APROVADO: "Aprovado",
      RECUSADO: "Recusado",
      EXPIRADO: "Expirado",
      CANCELADO: "Cancelado",
      // Manter para compatibilidade
      PENDENTE: "Pendente",
      REJEITADO: "Rejeitado"
    },
    tipoItemOrcamento: {
      MATERIAL: "Material",
      SERVICO: "Serviço"
    }
  },
  components: {
    colaboradorEquipeCard: {
      firstMember: "Primeiro Membro",
      memberNumber: "Membro {number}",
      remove: "Remover membro",
      fields: {
        colaborador: "Colaborador",
        funcoes: "Funções"
      }
    }
  },
  forms: {
    validation: {
      required: "Campo obrigatório",
      email: "E-mail inválido",
      maxFileSize: "O arquivo deve ter no máximo {size}",
      invalidFileType: "Tipo de arquivo inválido",
      positiveNumber: "Deve ser um número positivo",
      nonNegativeNumber: "Deve ser um número não negativo",
      cep: "CEP deve ter o formato 12345-678",
      invalidCep: "CEP inválido",
      invalidDate: "Data inválida",
      dateRequired: "Data é obrigatória",
      futureDate: "A data deve ser futura",
      pastDate: "A data deve ser no passado",
      dateAfter: "A data deve ser posterior a {date}",
      dateBefore: "A data deve ser anterior a {date}",
      validityAfterEmission: "A data de validade deve ser posterior à data de emissão"
    },
    buttons: {
      save: "Salvar",
      update: "Atualizar",
      cancel: "Cancelar",
      add: "Adicionar",
      remove: "Remover"
    },
    orcamento: {
      title: "Orçamentos",
      subtitle: "Gerencie os orçamentos de clientes",
      searchPlaceholder: "Buscar orçamentos...",
      createTitle: "Novo Orçamento",
      editTitle: "Editar Orçamento",
      viewTitle: "Visualizar Orçamento",
      createSubtitle: "Preencha os dados do orçamento",
      editSubtitle: "Edite os dados do orçamento",
      viewSubtitle: "Detalhes do orçamento",
      newButton: "Novo Orçamento",
      viewButton: "Visualizar",
      editButton: "Editar",
      deleteButton: "Excluir",
      addService: "Adicionar Serviço",
      addMaterial: "Adicionar Material",
      serviceItem: "Serviço {number}",
      materialItem: "Material {number}",
      valorPacote: "Valor do Pacote",
      noData: "Nenhum orçamento encontrado",
      noServices: "Nenhum serviço adicionado",
      noMaterials: "Nenhum material adicionado",
      noClients: "Nenhum cliente encontrado",
      noImoveis: "Nenhum imóvel encontrado para este cliente",
      noServicePackages: "Nenhum pacote de serviço encontrado",
      notFound: "Orçamento não encontrado",
      labels: {
        item: "Item"
      },
      stats: {
        total: "Total",
        pending: "Pendentes",
        approved: "Aprovados",
        totalValue: "Valor Total"
      },
      sections: {
        basicInfo: "Informações Básicas",
        client: "Cliente",
        propertyDetails: "Detalhes do Imóvel",
        servicePackage: "Pacote de Serviço",
        items: "Itens do Orçamento",
        services: "Serviços",
        materials: "Materiais",
        financialSummary: "Resumo Financeiro"
      },
      clientSummary: {
        noClient: "Nenhum cliente selecionado",
        noProperty: "Nenhum imóvel selecionado",
        noAddress: "Endereço não informado"
      },
      propertyInfo: {
        basicInfo: "Informações Básicas",
        address: "Endereço",
        observations: "Observações",
        totalRooms: "Total de Cômodos",
        bedrooms: "Quartos",
        bathrooms: "Banheiros",
        area: "Área Total"
      },
      fields: {
        numero: "Número",
        cliente: "Cliente",
        imovel: "Imóvel",
        pacoteServico: "Pacote de Serviço",
        dataEmissao: "Data de Emissão",
        validade: "Validade",
        status: "Status",
        servico: "Serviço",
        material: "Material",
        quantidade: "Quantidade",
        quantity: "Quantidade",
        valorUnitario: "Valor Unitário",
        subtotal: "Subtotal",
        desconto: "Desconto",
        valorTotal: "Valor Total",
        subtotalItems: "Subtotal dos Itens",
        itemDescription: "Descrição do Item",
        itemType: "Tipo do Item",
        unit: "Unidade",
        unitCost: "Custo Unitário",
        observations: "Observações",
        observacoes: "Observações",
        observacoesGerais: "Observações Gerais",
        nome: "Nome",
        email: "E-mail",
        telefone: "Telefone",
        documento: "CPF/CNPJ",
        naoInformado: "Não informado"
      },
      buttons: {
        approve: "Aprovar",
        reject: "Rejeitar",
        print: "Imprimir",
        share: "Compartilhar"
      },
      actions: {
        addItem: "Adicionar Item",
        removeItem: "Remover Item",
        selectMaterial: "Selecionar Material"
      },
      confirmDelete: {
        title: "Confirmar Exclusão",
        message: "Tem certeza que deseja excluir este orçamento?"
      },
      confirmReject: {
        title: "Confirmar Rejeição",
        message: "Tem certeza que deseja rejeitar este orçamento?"
      },
      messages: {
        createSuccess: "Orçamento criado com sucesso!",
        updateSuccess: "Orçamento atualizado com sucesso!",
        deleteSuccess: "Orçamento excluído com sucesso!",
        approveSuccess: "Orçamento aprovado com sucesso!",
        rejectSuccess: "Orçamento rejeitado.",
        loadError: "Erro ao carregar dados.",
        saveError: "Erro ao salvar orçamento.",
        deleteError: "Erro ao excluir orçamento.",
        approveError: "Erro ao aprovar orçamento.",
        rejectError: "Erro ao rejeitar orçamento.",
        printDevelopment: "Funcionalidade de impressão em desenvolvimento.",
        shareDevelopment: "Funcionalidade de compartilhamento em desenvolvimento.",
        noItems: "Nenhum item adicionado",
        selectPackageOrAddItems: "Selecione um pacote de serviço ou adicione itens manualmente"
      }
    },
    servico: {
      sections: {
        serviceData: "Dados do Serviço"
      }
    },
    login: {
      title: "eCleanear",
      subtitle: "Sistema de Gerenciamento para Empresas de Limpeza",
      formTitle: "Entrar na sua conta",
      fields: {
        usuario: "Usuário",
        senha: "Senha"
      },
      buttons: {
        login: "Entrar"
      },
      messages: {
        loginSuccess: "Login realizado com sucesso!",
        loginError: "Erro interno. Tente novamente.",
        invalidCredentials: "Usuário ou senha incorretos."
      },
      testInfo: "Ambiente de teste",
      testCredentials: {
        user: "Usuário"
      }
    },
    schedule: {
      title: "Cadastro de Schedule",
      subtitle: "Preencha os dados do schedule",
      sections: {
        empresa: "Dados do Schedule",
        responsavel: "Dados do Responsável",
        enderecoComercial: "Endereço Comercial",
        dadosBancarios: "Dados Bancários"
      },
      fields: {
        nomeEmpresa: "Nome do Schedule",
        documentoEmpresa: "CNPJ/CPF",
        telefoneComercial: "Telefone Comercial",
        emailComercial: "E-mail Comercial",
        tipoEmpresa: "Tipo de Schedule",
        logomarca: "Logomarca",
        responsavel: {
          nome: "Nome",
          sobrenome: "Sobrenome",
          email: "E-mail",
          telefone: "Telefone",
          celular: "Celular"
        },
        endereco: {
          cep: "CEP",
          logradouro: "Logradouro",
          numero: "Número",
          complemento: "Complemento",
          bairro: "Bairro",
          cidade: "Cidade",
          estado: "Estado"
        },
        dadosBancarios: {
          banco: "Banco",
          agencia: "Agência",
          conta: "Conta",
          tipoConta: "Tipo de Conta",
          pix: "PIX"
        }
      },
      hints: {
        nomeEmpresa: "Digite o nome completo do schedule",
        documentoEmpresa: "Digite o CNPJ ou CPF do schedule (somente números)",
        telefoneComercial: "Digite o telefone comercial do schedule",
        emailComercial: "Digite o e-mail comercial do schedule",
        tipoEmpresa: "Selecione o tipo do schedule",
        logomarca: "Upload da logomarca da empresa (opcional, máx. 5MB)",
        responsavel: {
          nome: "Digite o nome do responsável",
          sobrenome: "Digite o sobrenome do responsável",
          email: "Digite o e-mail do responsável",
          telefone: "Digite o telefone fixo do responsável (opcional)",
          celular: "Digite o celular do responsável"
        },
        endereco: {
          cep: "Digite o CEP do endereço comercial",
          logradouro: "Digite o logradouro do endereço comercial",
          numero: "Digite o número do endereço comercial",
          complemento: "Digite o complemento do endereço comercial (opcional)",
          bairro: "Digite o bairro do endereço comercial",
          cidade: "Digite a cidade do endereço comercial",
          estado: "Digite a sigla do estado do endereço comercial"
        },
        dadosBancarios: {
          banco: "Digite o nome do banco",
          agencia: "Digite o número da agência (sem dígito verificador)",
          conta: "Digite o número da conta com dígito verificador",
          tipoConta: "Digite o tipo da conta (corrente ou poupança)",
          pix: "Digite a chave PIX (opcional)"
        }
      },
      messages: {
        saveSuccess: "Empresa salva com sucesso!",
        saveError: "Erro ao salvar empresa.",
        deleteSuccess: "Empresa excluída com sucesso!",
        deleteError: "Erro ao excluir empresa.",
        updateSuccess: "Empresa atualizada com sucesso!",
        updateError: "Erro ao atualizar empresa.",
        invalidForm: "Preencha todos os campos obrigatórios!"
      }
    },
    cliente: {
      title: "Novo Cliente",
      subtitle: "Cadastro e gerenciamento de informações do cliente",
      editSubtitle: "Edição e atualização de informações do cliente",
      sections: {
        personalData: "Dados Pessoais",
        addresses: "Endereços",
        properties: "Imóveis",
        observations: "Observações",
        observacoes: "Observações"
      },
      fields: {
        nome: "Nome",
        sobrenome: "Sobrenome",
        email: "E-mail",
        telefone: "Telefone",
        celular: "Celular",
        observacoes: "Observações"
      },
      address: {
        title: "Endereço {0}",
        addButton: "Adicionar Endereço",
        noAddresses: "Nenhum endereço cadastrado",
        clickToAdd: 'Clique em "Adicionar Endereço" para começar',
        fields: {
          cep: "CEP",
          rua: "Rua",
          numero: "Número",
          complemento: "Complemento",
          bairro: "Bairro",
          cidade: "Cidade",
          estado: "Estado"
        }
      },
      property: {
        title: "Imóvel {0}",
        addButton: "Adicionar Imóvel",
        noProperties: "Nenhum imóvel cadastrado",
        clickToAdd: 'Clique em "Adicionar Imóvel" para começar',
        fields: {
          totalComodos: "Total de Cômodos",
          numeroQuartos: "Número de Quartos",
          numeroBanheiros: "Número de Banheiros",
          areaTotal: "Área Total",
          observacao: "Observações"
        },
        address: {
          title: "Endereço do Imóvel",
          sameAsClient: "Mesmo endereço do cliente"
        }
      }
    },
    imovel: {
      title: "Novo Imóvel",
      subtitle: "Cadastro e gerenciamento de informações do imóvel",
      sections: {
        propertyData: "Dados do Imóvel",
        owner: "Proprietário",
        address: "Endereço",
        observations: "Observações"
      },
      fields: {
        totalComodos: "Total de Cômodos",
        numeroQuartos: "Número de Quartos",
        numeroBanheiros: "Número de Banheiros",
        areaTotal: "Área Total",
        dono: "Proprietário",
        observacao: "Observações"
      },
      placeholders: {
        observacao: "Digite observações, características especiais, condições do imóvel ou qualquer informação adicional relevante..."
      },
      validation: {
        totalComodosInvalid: "O total de cômodos deve ser maior que a soma de quartos e banheiros"
      },
      messages: {
        success: "Imóvel cadastrado com sucesso!",
        error: "Erro ao cadastrar imóvel."
      }
    },
    endereco: {
      fields: {
        logradouro: "Logradouro",
        numero: "Número",
        complemento: "Complemento",
        bairro: "Bairro",
        cidade: "Cidade",
        estado: "Estado",
        cep: "CEP",
        pais: "País"
      }
    },
    colaborador: {
      subtitle: "Preencha os dados do colaborador",
      title: "Cadastro de Colaborador",
      list: {
        title: "Colaboradores",
        subtitle: "Gerencie os colaboradores da empresa",
        buttons: {
          new: "Novo Colaborador",
          edit: "Editar",
          delete: "Excluir",
          cancel: "Cancelar",
          confirm: "Confirmar",
          loadTestData: "Carregar Dados de Teste"
        },
        filters: {
          search: "Buscar colaborador...",
          status: "Status",
          sort: "Ordenar por"
        },
        sort: {
          nameAsc: "Nome (A-Z)",
          nameDesc: "Nome (Z-A)",
          newest: "Mais recentes",
          oldest: "Mais antigos"
        },
        columns: {
          name: "Nome",
          email: "E-mail",
          phones: "Telefones",
          status: "Status",
          availability: "Disponibilidade",
          regions: "Regiões",
          age: "Idade",
          experience: "Experiência",
          actions: "Ações"
        },
        deleteDialog: {
          title: "Excluir Colaborador",
          message: "Tem certeza que deseja excluir o colaborador {name}?"
        },
        messages: {
          saveSuccess: "Colaborador salvo com sucesso!",
          saveError: "Erro ao salvar colaborador.",
          loadError: "Erro ao carregar colaboradores.",
          deleteSuccess: "Colaborador excluído com sucesso!",
          deleteError: "Erro ao excluir colaborador.",
          loadingTestData: "Carregar dados de teste",
          loadingTestDataDesc: "Isso irá substituir todos os dados existentes por dados de exemplo. Deseja continuar?",
          testDataLoaded: "Dados de teste carregados com sucesso!"
        }
      },
      sections: {
        personalData: "Dados Pessoais",
        documents: "Documentos",
        professionalInfo: "Informações Profissionais",
        experience: "Experiência",
        references: "Referências",
        address: "Endereço Residencial",
        availability: "Disponibilidade",
        observations: "Observações"
      },
      fields: {
        nome: "Nome",
        sobrenome: "Sobrenome",
        email: "E-mail",
        telefone: "Telefone",
        celular: "Celular",
        documentoIdentidade: "Documento de Identidade",
        dataNascimento: "Data de Nascimento",
        nacionalidade: "Nacionalidade",
        fotoPerfil: "Foto de Perfil",
        curriculo: "Currículo",
        salarioEsperado: "Salário Esperado",
        disponibilidade: "Disponibilidade",
        regioesAtuacao: "Regiões de Atuação",
        observacoes: "Observações"
      },
      experience: {
        title: "Experiência {0}",
        addButton: "Adicionar Experiência",
        fields: {
          empresa: "Empresa",
          cargo: "Cargo",
          dataInicio: "Data de Início",
          dataFim: "Data de Término",
          atividades: "Principais Atividades"
        }
      },
      reference: {
        title: "Referência {0}",
        addButton: "Adicionar Referência",
        fields: {
          nome: "Nome",
          empresa: "Empresa",
          cargo: "Cargo",
          telefone: "Telefone",
          email: "E-mail"
        }
      }
    },
    configuracoes: {
      title: "Configurações do Sistema",
      subtitle: "Configure e gerencie dados do sistema",
      sections: {
        dataManagement: {
          title: "Gerenciamento de Dados",
          subtitle: "Configure e gerencie os dados do sistema.",
          completeLoad: {
            title: "Carga Completa do Sistema",
            description: "Carrega todos os dados iniciais necessários para o funcionamento do sistema: materiais de limpeza, clientes de exemplo, colaboradores e outros dados essenciais.",
            button: "Executar Carga Completa",
            confirm: "Tem certeza que deseja executar a carga completa? Isso pode levar alguns segundos.",
            success: "Carga completa executada com sucesso!",
            error: "Erro ao executar a carga completa."
          },
          individualLoad: {
            title: "Cargas Individuais",
            materials: {
              title: "Materiais de Limpeza",
              description: "15 materiais essenciais",
              button: "Carregar",
              success: "Materiais carregados com sucesso!",
              error: "Erro ao carregar materiais."
            },
            clients: {
              title: "Clientes",
              description: "Dados de exemplo",
              button: "Carregar",
              success: "Clientes carregados com sucesso!",
              error: "Erro ao carregar clientes."
            },
            collaborators: {
              title: "Colaboradores",
              description: "Equipe inicial",
              button: "Carregar",
              success: "Colaboradores carregados com sucesso!",
              error: "Erro ao carregar colaboradores."
            },
            services: {
              title: "Serviços",
              description: "30 serviços de limpeza",
              button: "Carregar",
              success: "Serviços carregados com sucesso!",
              error: "Erro ao carregar serviços."
            }
          }
        },
        generalConfig: {
          title: "Configurações Gerais",
          fields: {
            companyName: "Nome da Empresa",
            companyEmail: "E-mail da Empresa",
            companyPhone: "Telefone da Empresa",
            defaultCurrency: "Moeda Padrão",
            logo: "Logomarca da Empresa"
          },
          buttons: {
            edit: "Editar Configurações",
            save: "Salvar",
            cancel: "Cancelar"
          },
          messages: {
            success: "Configurações salvas!",
            error: "Erro ao salvar configurações"
          }
        },
        activity: {
          title: "Registro de Atividades",
          subtitle: "Histórico de ações realizadas no sistema",
          empty: "Nenhuma atividade registrada",
          buttons: {
            clear: "Limpar Registro"
          },
          actions: {
            "complete-load": "Carga completa executada",
            "load-materials": "Materiais carregados",
            "load-clients": "Clientes carregados",
            "load-collaborators": "Colaboradores carregados"
          }
        },
        danger: {
          title: "Zona de Perigo",
          subtitle: "Ações irreversíveis - use com cuidado",
          clearData: {
            title: "Limpar Todos os Dados",
            description: "Remove permanentemente todos os dados do sistema. Esta ação não pode ser desfeita.",
            button: "Limpar Sistema",
            confirm: "ATENÇÃO: Esta ação irá remover TODOS os dados do sistema e não pode ser desfeita. Tem certeza?",
            success: "Todos os dados foram removidos com sucesso!",
            error: "Erro ao limpar os dados."
          }
        }
      },
      buttons: {
        cancel: "Cancelar",
        confirm: "Confirmar",
        loading: "Carregando..."
      }
    },
    material: {
      editTitle: "Editar Material",
      newTitle: "Novo Material",
      formSubtitle: "Preencha os dados do material",
      sections: {
        materialData: "Dados do Material",
        additionalInfo: "Informações Adicionais",
        imagePreview: "Visualização da Imagem"
      },
      fields: {
        descricao: "Descrição",
        unidade: "Unidade",
        precoUnitario: "Preço Unitário",
        url: "URL do Produto",
        imagem: "Imagem"
      },
      messages: {
        saveSuccess: "Material salvo com sucesso!",
        saveError: "Erro ao salvar material.",
        updateSuccess: "Material atualizado com sucesso!",
        updateError: "Erro ao atualizar material.",
        deleteSuccess: "Material excluído com sucesso!",
        deleteError: "Erro ao excluir material.",
        loadError: "Erro ao carregar material.",
        imageTooBig: "Imagem muito grande. Máximo 5MB.",
        clickToSelectImage: "Clique para selecionar uma imagem"
      }
    }
  },
  layout: {
    logout: {
      confirmTitle: "Sair do sistema",
      confirmMessage: "Tem certeza que deseja sair do sistema?",
      success: "Logout realizado com sucesso!"
    }
  },
  messages: {
    saveSuccess: "Dados salvos com sucesso!",
    saveError: "Erro ao salvar os dados. Tente novamente.",
    updateSuccess: "Dados atualizados com sucesso!",
    updateError: "Erro ao atualizar os dados. Tente novamente.",
    deleteSuccess: "Item removido com sucesso!",
    deleteError: "Erro ao remover o item. Tente novamente.",
    loadError: "Erro ao carregar os dados. Tente novamente.",
    validationError: "Por favor, verifique os campos obrigatórios.",
    networkError: "Erro de conexão. Verifique sua internet e tente novamente.",
    pdfGenerateSuccess: "PDF gerado com sucesso!",
    pdfGenerateError: "Erro ao gerar PDF. Verifique os dados e tente novamente.",
    pdfConfigMissing: "Configure os dados da empresa em Configurações antes de gerar o PDF.",
    emailSent: "Orçamento enviado com sucesso para {email}!",
    emailError: "Erro ao enviar e-mail: {error}",
    emailConfigMissing: "Configure o EmailJS em Configurações antes de enviar e-mails.",
    clienteEmailMissing: "Cliente não possui e-mail cadastrado. Por favor, atualize o cadastro do cliente."
  }
};
const messages = {
  "en-US": enUS,
  "pt-BR": ptBR
};
const i18n = defineBoot(({ app }) => {
  const i18n2 = createI18n({
    locale: "pt-BR",
    fallbackLocale: "en-US",
    globalInjection: true,
    messages
  });
  app.use(i18n2);
});
export {
  i18n as default
};
//# sourceMappingURL=i18n-C1KJUgwk.js.map
