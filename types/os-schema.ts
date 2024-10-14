export type BlockButton = {
    button_group?: string | BlockButtonGroup | null;
    color?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    external_url?: string | null;
    id: string;
    label?: string | null;
    page?: string | Pages | null;
    post?: string | Posts | null;
    sort?: number | null;
    type?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    variant?: string | null;
  };
  
  export type BlockButtonGroup = {
    alignment?: string | null;
    buttons: any[] | BlockButton[];
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BlockColumns = {
    headline?: string | null;
    id: string;
    rows: any[] | BlockColumnsRows[];
    title?: string | null;
  };
  
  export type BlockColumnsRows = {
    block_columns?: string | BlockColumns | null;
    button_group?: string | BlockButtonGroup | null;
    content?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    headline?: string | null;
    id: string;
    image?: string | DirectusFiles | null;
    image_position?: string | null;
    sort?: number | null;
    title?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BlockCta = {
    button_group?: string | BlockButtonGroup | null;
    content?: string | null;
    headline?: string | null;
    id: string;
    title?: string | null;
  };
  
  export type BlockDivider = {
    id: string;
    title?: string | null;
  };
  
  export type BlockFaqs = {
    alignment?: string | null;
    faqs?: unknown | null;
    headline?: string | null;
    id: string;
    title?: string | null;
  };
  
  export type BlockForm = {
    form?: string | Forms | null;
    headline?: string | null;
    id: string;
    title?: string | null;
  };
  
  export type BlockGallery = {
    gallery_items: any[] | BlockGalleryFiles[];
    headline?: string | null;
    id: string;
    title?: string | null;
  };
  
  export type BlockGalleryFiles = {
    block_gallery_id?: string | BlockGallery | null;
    date_created?: string | null;
    date_updated?: string | null;
    directus_files_id?: string | DirectusFiles | null;
    id: string;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BlockHero = {
    button_group?: string | BlockButtonGroup | null;
    content?: string | null;
    headline?: string | null;
    id: string;
    image?: string | DirectusFiles | null;
    image_position?: string | null;
    title?: string | null;
  };
  
  export type BlockHtml = {
    id: string;
    raw_html?: string | null;
  };
  
  export type BlockLogocloud = {
    headline?: string | null;
    id: string;
    logos: any[] | BlockLogocloudLogos[];
    title?: string | null;
  };
  
  export type BlockLogocloudLogos = {
    block_logocloud_id?: string | BlockLogocloud | null;
    directus_files_id?: string | DirectusFiles | null;
    id: string;
    sort?: number | null;
  };
  
  export type BlockQuote = {
    content?: string | null;
    id: string;
    subtitle?: string | null;
    title?: string | null;
  };
  
  export type BlockRichtext = {
    alignment?: string | null;
    content?: string | null;
    headline?: string | null;
    id: string;
    title?: string | null;
  };
  
  export type BlockStepItems = {
    block_steps?: string | BlockSteps | null;
    button_group?: string | BlockButtonGroup | null;
    content?: string | null;
    id: string;
    image?: string | DirectusFiles | null;
    sort?: number | null;
    title?: string | null;
  };
  
  export type BlockSteps = {
    alternate_image_position: boolean;
    headline?: string | null;
    id: string;
    show_step_numbers?: boolean | null;
    steps: any[] | BlockStepItems[];
    title?: string | null;
  };
  
  export type BlockTeam = {
    content?: string | null;
    headline?: string | null;
    id: string;
    title?: string | null;
  };
  
  export type BlockTestimonialSliderItems = {
    block_testimonial_slider_id?: string | BlockTestimonials | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    sort?: number | null;
    testimonials_id?: string | Testimonials | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BlockTestimonials = {
    headline?: string | null;
    id: string;
    testimonials: any[] | BlockTestimonialSliderItems[];
    title?: string | null;
  };
  
  export type BlockVideo = {
    headline?: string | null;
    id: string;
    title?: string | null;
    type?: string | null;
    video_file?: string | DirectusFiles | null;
    video_url?: string | null;
  };
  
  export type BoApikeys = {
    anotacoes?: string | null;
    apikey?: string | null;
    dados_adicionais?: unknown | null;
    date_created?: string | null;
    date_updated?: string | null;
    genimages: any[] | BoGenimageBoApikeys[];
    id: string;
    llms: any[] | BoLlmsBoApikeys[];
    nome?: string | null;
    sort?: number | null;
    stts: any[] | BoSttBoApikeys[];
    ttss: any[] | BoTtsBoApikeys[];
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoAssinatura = {
    ContactsFK?: string | Contacts | null;
    data_expiracao?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    PlanoId?: string | BoPlano | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoAssistants = {
    assistant_id?: string | null;
    id: string;
    nome?: string | null;
  };
  
  export type BoAutobotRuns = {
    bo_autobots_bots_id?: number | BoAutobotsBots | null;
    bo_botclient_id?: string | BoBotclient | null;
    bo_chat_id: string | BoChat;
    client_chat_id: string;
    conversa?: string | null;
    date_created?: string | null;
    Debug: string;
    erro_detalhado?: string | null;
    graph?: unknown | null;
    id: number;
    last_message_id?: string | null;
    last_message_timestamp?: number | null;
    last_run_timestamp: number;
    log?: string | null;
    payload?: unknown | null;
    prompt?: string | null;
    raw_response?: unknown | null;
    resposta_airtable?: unknown | null;
    resposta_webhook?: string | null;
    result?: unknown | null;
    status: string;
    tokens_input?: number | null;
    tokens_output?: number | null;
  };
  
  export type BoAutobots = {
    access_token?: string | null;
    "accordion-bhk_jo": string;
    airtable_options: string;
    apikey?: string | BoApikeys | null;
    ativo: boolean;
    base_id?: string | null;
    botoes: string;
    bots: any[] | BoAutobotsBots[];
    bots_group: string;
    campos?: unknown | null;
    campos_adicionais?: unknown | null;
    condicoes?: unknown | null;
    datahora_inicial: string;
    date_created?: string | null;
    date_updated?: string | null;
    executar_autobot: string;
    id: string;
    ignorar_imagem: boolean;
    integracoes: string;
    llm?: string | BoLlms | null;
    llm_apikey?: string | BoApikeys | null;
    mensagens_maxchars: number;
    minimo_interacoes?: number | null;
    nome: string;
    parametros: string;
    periodicidade_group: string;
    quantidade_mensagens: number;
    rodar_em_grupo?: boolean | null;
    select_integracoes?: unknown | null;
    select_periodicidade: string;
    share_id?: string | null;
    sort?: number | null;
    system_prompt?: string | null;
    table_id?: string | null;
    temp: number;
    "triggers-dobe4n": string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    webhook_body?: unknown | null;
    webhook_group: string;
    webhook_headers?: unknown | null;
    webhook_method?: string | null;
    webhook_url?: string | null;
  };
  
  export type BoAutobotsBots = {
    Airtable_Override: string;
    base_id?: string | null;
    base_id_default: string;
    bo_autobot_runs: any[] | BoAutobotRuns[];
    bo_autobots_id?: string | BoAutobots | null;
    collection?: string | null;
    id: number;
    item?: string | any | null;
    table_id?: string | null;
    "triggers-8trx4d": string;
  };
  
  export type BoBotTemplate = {
    avatar?: string | DirectusFiles | null;
    Blueprints: string;
    bo_artefatos: any[] | BoBriefingArtefato[];
    branding: string;
    caracteristicas?: string | null;
    chatflow: string | BoFlowiseChatflows;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    sort?: number | null;
    status: string;
    tagline?: string | null;
    titulo: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoBotcart = {
    backstory?: string | null;
    bo_cliente: string | BoCliente;
    conhecimentos_adicionais?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    descricao_cargo?: string | null;
    emojis?: number | null;
    formalidade: number;
    id: string;
    nome?: string | null;
    respostas_artefatos?: unknown | null;
    restricoes?: string | null;
    status: string;
    tipo_linguagem?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoBotclient = {
    "accordion-8r3nm0": string;
    alertar_por_email?: boolean | null;
    alertar_por_whatsapp?: boolean | null;
    Autobots: string;
    bo_autobot_runs: any[] | BoAutobotRuns[];
    bo_chat_status_notification?: string | BoChat | null;
    botao_reload: string;
    botao_remover_backup: string;
    callback_olympus?: string | null;
    capabilidades?: unknown | null;
    capabilidades_modais: string;
    Categoria?: string | null;
    chave_grupo?: string | null;
    client_comunicador?: string | BoBotclient | null;
    cluster_id?: string | BoClusters | null;
    comportamento: string;
    contatos_responsaveis: any[] | BoBotclientContacts[];
    custom_prompt?: string | null;
    customizacao: string;
    date_created?: string | null;
    date_updated?: string | null;
    descrever_imagens: string;
    descricao?: string | null;
    endpoint_olympus?: string | null;
    flowise_chatflow_id?: string | BoFlowiseChatflows | null;
    gatilho_interacao: string;
    genimage?: string | BoGenimage | null;
    genimage_apikey?: string | BoApikeys | null;
    geracao_audios: string;
    geracao_imagens: string;
    id: string;
    identificador?: string | null;
    imbot: string;
    imbot_apikey?: string | null;
    imbot_bot_id?: string | null;
    imbot_bot_phone?: string | null;
    imbot_endpoint?: string | null;
    interacao_habilitada?: boolean | null;
    llm_descimage?: string | BoLlms | null;
    llm_image_apikey?: string | BoApikeys | null;
    location_apikey?: string | BoApikeys | null;
    modo_debug: boolean;
    monitoramento: string;
    permite_grupos?: boolean | null;
    preprocess_delay_ms?: number | null;
    primeiras_respostas?: unknown | null;
    processamento_habilitado?: boolean | null;
    processamento_location: string;
    rate_limit_24h?: number | null;
    responder_mentions?: boolean | null;
    responder_respostas?: boolean | null;
    sort?: number | null;
    status?: string | null;
    status_detail?: string | null;
    stt?: string | BoStt | null;
    stt_apikey?: string | BoApikeys | null;
    stt_video?: string | BoStt | null;
    stt_video_apikey?: string | BoApikeys | null;
    timeout_ms: number;
    tipo_client_id?: string | BoTiposClients | null;
    transcrever_video: string;
    transcricao_audio: string;
    tts?: string | BoTts | null;
    tts_apikey?: string | BoApikeys | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    variaveis_flowise?: unknown | null;
    vision_custom_prompt?: string | null;
    vision_detail?: string | null;
    webapp_token?: string | null;
    webapp_url?: string | null;
    whatsapp_client_id?: string | null;
    whatsapp_web: string;
  };
  
  export type BoBotclientContacts = {
    bo_botclient_id?: string | BoBotclient | null;
    contacts_id?: string | Contacts | null;
    id: number;
  };
  
  export type BoBriefingArtefato = {
    bo_template_pai: string | BoBotTemplate;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    identificador: string;
    label: string;
    nota?: string | null;
    obrigatorio: boolean;
    opcoes_enum?: unknown | null;
    opcoes_options: string;
    opcoes_textbox: string;
    placeholder?: string | null;
    prompt?: string | null;
    slider_options_group: string;
    slider_texto_maximo?: string | null;
    slider_texto_minimo?: string | null;
    slider_valor_maximo?: number | null;
    slider_valor_minimo?: number | null;
    sort?: number | null;
    tipo?: string | null;
    tipo_options?: string | null;
    tipo_text?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoChangelog = {
    changes?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    status?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoChat = {
    bo_autobot_runs: any[] | BoAutobotRuns[];
    bo_botclient_id?: string | BoBotclient | null;
    client_chat_id?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    interacao_habilitada?: boolean | null;
    isGroup?: boolean | null;
    nome?: string | null;
    rateLimit24h?: number | null;
    thread_id?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoCliente = {
    cpf: string;
    data_nascimento?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    sort?: number | null;
    status: string;
    stripe_cliente_id?: string | null;
    telefone?: string | null;
    user?: string | DirectusUsers | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoClienteOpcoesPagamento = {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    nome?: string | null;
    sort?: number | null;
    status: string;
    stripe_payment_method_id: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoClusters = {
    access_token?: string | null;
    acesso_publico_midias?: boolean | null;
    apelido: string;
    app_deploy: string;
    app_service_plan?: string | null;
    botclients: any[] | BoBotclient[];
    btn_deploy: string;
    date_created?: string | null;
    date_updated?: string | null;
    debug: string;
    faz_manutencao: string;
    function_url?: string | null;
    id: string;
    implantacao: string;
    intervalo_manutencao_min?: number | null;
    modo_recebimento?: string | null;
    organizacao?: string | Organizations | null;
    restart_button: string;
    seguranca: string;
    sincronize_button: string;
    sort?: number | null;
    status: string;
    tipo_client_id: string | BoTiposClients;
    url?: string | null;
    url_scm?: string | null;
    usar_flowise_sdk: boolean;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    webhook_deploy?: string | null;
    webhook_deploy_button: string;
  };
  
  export type BoCupom = {
    cupom_expira?: boolean | null;
    data_expiracao?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    desconto_bruto?: number | null;
    desconto_porcentagem?: number | null;
    id: string;
    nome?: string | null;
    sort?: number | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    uso_unico?: boolean | null;
  };
  
  export type BoFlowiseChatflows = {
    access_token?: string | null;
    acompanhamento: string;
    anotacoes?: string | null;
    avatar?: string | DirectusFiles | null;
    bo_bot_templates: any[] | BoBotTemplate[];
    botclients: any[] | BoBotclient[];
    chatflow_id: string;
    date_created?: string | null;
    date_updated?: string | null;
    descricao?: string | null;
    flowise_id?: string | BoFlowises | null;
    id: string;
    identificador: string;
    implantacao: string;
    informacoes_bot: string;
    isAssistant?: boolean | null;
    llmSupportsVision?: boolean | null;
    nome: string;
    organizacao_id?: string | Organizations | null;
    owner_id?: string | DirectusUsers | null;
    project_id?: string | OsProjects | null;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    zep_id: string | BoZep;
  };
  
  export type BoFlowises = {
    date_created?: string | null;
    date_updated?: string | null;
    Debug: string;
    descricao?: string | null;
    icone?: string | DirectusFiles | null;
    id: string;
    password?: string | null;
    sort?: number | null;
    url?: string | null;
    url_scm?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    username?: string | null;
  };
  
  export type BoGenimage = {
    apikeys: any[] | BoGenimageBoApikeys[];
    dados_adicionais?: unknown | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    identificador: string;
    nome: string;
    sort?: number | null;
    url_docs?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoGenimageBoApikeys = {
    bo_apikeys_id?: string | BoApikeys | null;
    bo_genimage_id?: string | BoGenimage | null;
    id: number;
  };
  
  export type BoLlms = {
    apikeys: any[] | BoLlmsBoApikeys[];
    custos: string;
    dados_adicionais?: unknown | null;
    date_created?: string | null;
    date_updated?: string | null;
    descricao?: string | null;
    empresa?: string | null;
    id: string;
    identificador: string;
    input?: number | null;
    logo?: string | DirectusFiles | null;
    model: string;
    output?: number | null;
    site?: string | null;
    sort?: number | null;
    tem_vision: boolean;
    tokens_max?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoLlmsBoApikeys = {
    bo_apikeys_id?: string | BoApikeys | null;
    bo_llms_id?: string | BoLlms | null;
    id: number;
  };
  
  export type BoPagamento = {
    AssinaturaFK?: string | BoAssinatura | null;
    date_created?: string | null;
    date_updated?: string | null;
    historico?: string | null;
    id: string;
    id_externo?: string | null;
    Metodo?: number | null;
    status: string;
    StatusPagamento?: number | null;
    valor?: number | null;
  };
  
  export type BoPlano = {
    Descricao?: string | null;
    id: string;
    Nome?: string | null;
    Periodicidade?: number | null;
    Valor?: number | null;
  };
  
  export type BoStt = {
    apikeys: any[] | BoSttBoApikeys[];
    dados_adicionais?: unknown | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    identificador: string;
    nome: string;
    sort?: number | null;
    url_docs?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoSttBoApikeys = {
    bo_apikeys_id?: string | BoApikeys | null;
    bo_stt_id?: string | BoStt | null;
    id: number;
  };
  
  export type BoTiposClients = {
    date_created?: string | null;
    date_updated?: string | null;
    especificidades_prompt?: string | null;
    id: string;
    logotipo?: string | DirectusFiles | null;
    nome: string;
    suporta_historico?: boolean | null;
    suporta_reaction?: boolean | null;
    suporta_state?: boolean | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type BoTts = {
    apikeys: any[] | BoTtsBoApikeys[];
    dados_adicionais?: unknown | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    identificador: string;
    nome?: string | null;
    sort?: number | null;
    url_docs?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    voice_speed?: number | null;
  };
  
  export type BoTtsBoApikeys = {
    bo_apikeys_id?: string | BoApikeys | null;
    bo_tts_id?: string | BoTts | null;
    id: number;
  };
  
  export type BoZep = {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    nome: string;
    sort?: number | null;
    token: string;
    url: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type Categories = {
    color?: string | null;
    headline?: string | null;
    id: string;
    seo?: string | Seo | null;
    slug?: string | null;
    sort?: number | null;
    title?: string | null;
  };
  
  export type Contacts = {
    activities: any[] | OsActivityContacts[];
    activity: string;
    contact_notes?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    deals: any[] | OsDealContacts[];
    email?: string | null;
    first_name?: string | null;
    id: string;
    job_title?: string | null;
    last_name?: string | null;
    organizations: any[] | OrganizationsContacts[];
    phone?: string | null;
    status?: string | null;
    user?: string | DirectusUsers | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type Conversations = {
    collection?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    item?: string | null;
    messages: any[] | Messages[];
    organization?: string | Organizations | null;
    status: string;
    title?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    visitor_id?: string | null;
  };
  
  export type DirectusAccess = {
    id: string;
    policy: string | DirectusPolicies;
    role?: string | DirectusRoles | null;
    sort?: number | null;
    user?: string | DirectusUsers | null;
  };
  
  export type DirectusActivity = {
    action: string;
    collection: string;
    comment?: string | null;
    id: number;
    ip?: string | null;
    item: string;
    origin?: string | null;
    revisions: any[] | DirectusRevisions[];
    timestamp: string;
    user?: string | DirectusUsers | null;
    user_agent?: string | null;
  };
  
  export type DirectusCollections = {
    accountability?: string | null;
    archive_app_filter: boolean;
    archive_field?: string | null;
    archive_value?: string | null;
    collapse: string;
    collection: string;
    color?: string | null;
    display_template?: string | null;
    group?: string | DirectusCollections | null;
    hidden: boolean;
    icon?: string | null;
    item_duplication_fields?: unknown | null;
    note?: string | null;
    preview_url?: string | null;
    singleton: boolean;
    sort?: number | null;
    sort_field?: string | null;
    translations?: unknown | null;
    unarchive_value?: string | null;
    versioning: boolean;
  };
  
  export type DirectusDashboards = {
    color?: string | null;
    date_created?: string | null;
    icon: string;
    id: string;
    name: string;
    note?: string | null;
    panels: any[] | DirectusPanels[];
    user_created?: string | DirectusUsers | null;
  };
  
  export type DirectusExtensions = {
    bundle?: string | null;
    enabled: boolean;
    folder: string;
    id: string;
    source: string;
  };
  
  export type DirectusFields = {
    collection: string | DirectusCollections;
    conditions?: unknown | null;
    display?: string | null;
    display_options?: unknown | null;
    field: string;
    group?: string | DirectusFields | null;
    hidden: boolean;
    id: number;
    interface?: string | null;
    note?: string | null;
    options?: unknown | null;
    readonly: boolean;
    required?: boolean | null;
    sort?: number | null;
    special?: unknown | null;
    translations?: unknown | null;
    validation?: unknown | null;
    validation_message?: string | null;
    width?: string | null;
  };
  
  export type DirectusFiles = {
    charset?: string | null;
    created_on: string;
    description?: string | null;
    duration?: number | null;
    embed?: string | null;
    filename_disk?: string | null;
    filename_download: string;
    filesize?: number | null;
    focal_point_x?: number | null;
    focal_point_y?: number | null;
    folder?: string | DirectusFolders | null;
    height?: number | null;
    id: string;
    location?: string | null;
    metadata?: unknown | null;
    modified_by?: string | DirectusUsers | null;
    modified_on: string;
    storage: string;
    tags?: unknown | null;
    title?: string | null;
    tus_data?: unknown | null;
    tus_id?: string | null;
    type?: string | null;
    uploaded_by?: string | DirectusUsers | null;
    uploaded_on?: string | null;
    width?: number | null;
  };
  
  export type DirectusFlows = {
    accountability?: string | null;
    color?: string | null;
    date_created?: string | null;
    description?: string | null;
    flow_manager_category?: string | null;
    flow_manager_order?: number | null;
    icon?: string | null;
    id: string;
    name: string;
    operation?: string | DirectusOperations | null;
    operations: any[] | DirectusOperations[];
    options?: unknown | null;
    status: string;
    trigger?: string | null;
    user_created?: string | DirectusUsers | null;
  };
  
  export type DirectusFolders = {
    id: string;
    name: string;
    organizations: any[] | Organizations[];
    parent?: string | DirectusFolders | null;
  };
  
  export type DirectusMigrations = {
    name: string;
    timestamp?: string | null;
    version: string;
  };
  
  export type DirectusNotifications = {
    collection?: string | null;
    id: number;
    item?: string | null;
    message?: string | null;
    recipient: string | DirectusUsers;
    sender?: string | DirectusUsers | null;
    status?: string | null;
    subject: string;
    timestamp?: string | null;
  };
  
  export type DirectusOperations = {
    date_created?: string | null;
    flow: string | DirectusFlows;
    id: string;
    key: string;
    name?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    reject?: string | DirectusOperations | null;
    resolve?: string | DirectusOperations | null;
    type: string;
    user_created?: string | DirectusUsers | null;
  };
  
  export type DirectusPanels = {
    color?: string | null;
    dashboard: string | DirectusDashboards;
    date_created?: string | null;
    height: number;
    icon?: string | null;
    id: string;
    name?: string | null;
    note?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    show_header: boolean;
    type: string;
    user_created?: string | DirectusUsers | null;
    width: number;
  };
  
  export type DirectusPermissions = {
    action: string;
    collection: string;
    fields?: unknown | null;
    id: number;
    permissions?: unknown | null;
    policy: string | DirectusPolicies;
    presets?: unknown | null;
    validation?: unknown | null;
  };
  
  export type DirectusPolicies = {
    admin_access: boolean;
    app_access: boolean;
    description?: string | null;
    enforce_tfa: boolean;
    icon: string;
    id: string;
    ip_access?: unknown | null;
    name: string;
    permissions: any[] | DirectusPermissions[];
    roles: any[] | DirectusAccess[];
    users: any[] | DirectusAccess[];
  };
  
  export type DirectusPresets = {
    bookmark?: string | null;
    collection?: string | null;
    color?: string | null;
    filter?: unknown | null;
    icon?: string | null;
    id: number;
    layout?: string | null;
    layout_options?: unknown | null;
    layout_query?: unknown | null;
    refresh_interval?: number | null;
    role?: string | DirectusRoles | null;
    search?: string | null;
    user?: string | DirectusUsers | null;
  };
  
  export type DirectusRelations = {
    id: number;
    junction_field?: string | null;
    many_collection: string;
    many_field: string;
    one_allowed_collections?: unknown | null;
    one_collection?: string | null;
    one_collection_field?: string | null;
    one_deselect_action: string;
    one_field?: string | null;
    sort_field?: string | null;
  };
  
  export type DirectusRevisions = {
    activity: number | DirectusActivity;
    collection: string;
    data?: unknown | null;
    delta?: unknown | null;
    id: number;
    item: string;
    parent?: number | DirectusRevisions | null;
    version?: string | DirectusVersions | null;
  };
  
  export type DirectusRoles = {
    children: any[] | DirectusRoles[];
    description?: string | null;
    icon: string;
    id: string;
    name: string;
    parent?: string | DirectusRoles | null;
    policies: any[] | DirectusAccess[];
    users: any[] | DirectusUsers[];
    users_group: string;
  };
  
  export type DirectusSessions = {
    expires: string;
    ip?: string | null;
    next_token?: string | null;
    origin?: string | null;
    share?: string | DirectusShares | null;
    token: string;
    user?: string | DirectusUsers | null;
    user_agent?: string | null;
  };
  
  export type DirectusSettings = {
    auth_login_attempts?: number | null;
    auth_password_policy?: string | null;
    basemaps?: unknown | null;
    custom_aspect_ratios?: unknown | null;
    custom_css?: string | null;
    default_appearance: string;
    default_language: string;
    default_theme_dark?: string | null;
    default_theme_light?: string | null;
    flow_manager_categories?: unknown | null;
    id: number;
    mapbox_key?: string | null;
    module_bar?: unknown | null;
    project_color: string;
    project_descriptor?: string | null;
    project_logo?: string | DirectusFiles | null;
    project_name: string;
    project_url?: string | null;
    public_background?: string | DirectusFiles | null;
    public_favicon?: string | DirectusFiles | null;
    public_foreground?: string | DirectusFiles | null;
    public_note?: string | null;
    public_registration: boolean;
    public_registration_email_filter?: unknown | null;
    public_registration_role?: string | DirectusRoles | null;
    public_registration_verify_email: boolean;
    report_bug_url?: string | null;
    report_error_url?: string | null;
    report_feature_url?: string | null;
    storage_asset_presets?: unknown | null;
    storage_asset_transform?: string | null;
    storage_default_folder?: string | DirectusFolders | null;
    theme_dark_overrides?: unknown | null;
    theme_light_overrides?: unknown | null;
    theming_group: string;
  };
  
  export type DirectusShares = {
    collection: string | DirectusCollections;
    date_created?: string | null;
    date_end?: string | null;
    date_start?: string | null;
    id: string;
    item: string;
    max_uses?: number | null;
    name?: string | null;
    password?: string | null;
    role?: string | DirectusRoles | null;
    times_used?: number | null;
    user_created?: string | DirectusUsers | null;
  };
  
  export type DirectusTranslations = {
    id: string;
    key: string;
    language: string;
    value: string;
  };
  
  export type DirectusUsers = {
    appearance?: string | null;
    auth_data?: unknown | null;
    avatar?: string | DirectusFiles | null;
    bo_cliente: any[] | BoCliente[];
    contacts: any[] | Contacts[];
    description?: string | null;
    email?: string | null;
    email_notifications?: boolean | null;
    external_identifier?: string | null;
    first_name?: string | null;
    id: string;
    language?: string | null;
    last_access?: string | null;
    last_name?: string | null;
    last_page?: string | null;
    location?: string | null;
    password?: string | null;
    policies: any[] | DirectusAccess[];
    provider: string;
    role?: string | DirectusRoles | null;
    status: string;
    tags?: unknown | null;
    tfa_secret?: string | null;
    theme_dark?: string | null;
    theme_dark_overrides?: unknown | null;
    theme_light?: string | null;
    theme_light_overrides?: unknown | null;
    title?: string | null;
    token?: string | null;
  };
  
  export type DirectusVersions = {
    collection: string | DirectusCollections;
    date_created?: string | null;
    date_updated?: string | null;
    hash?: string | null;
    id: string;
    item: string;
    key: string;
    name?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type DirectusWebhooks = {
    actions: unknown;
    collections: unknown;
    data: boolean;
    headers?: unknown | null;
    id: number;
    method: string;
    migrated_flow?: string | DirectusFlows | null;
    name: string;
    status: string;
    url: string;
    was_active_before_deprecation: boolean;
  };
  
  export type Forms = {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    key?: string | null;
    on_success?: string | null;
    redirect_url?: string | null;
    schema?: unknown | null;
    sort?: number | null;
    status: string;
    submit_label?: string | null;
    success_message?: string | null;
    title?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type Globals = {
    address_country?: string | null;
    address_locality?: string | null;
    address_region?: string | null;
    build_hook_url?: string | null;
    contact: string;
    deployment: string;
    description?: string | null;
    email?: string | null;
    id: string;
    logo_on_dark_bg?: string | DirectusFiles | null;
    logo_on_light_bg?: string | DirectusFiles | null;
    og_image?: string | DirectusFiles | null;
    phone?: string | null;
    postal_code?: string | null;
    seo: string;
    social: string;
    social_links?: unknown | null;
    street_address?: string | null;
    tagline?: string | null;
    theme?: unknown | null;
    theming: string;
    title?: string | null;
    url?: string | null;
  };
  
  export type HelpArticles = {
    content?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    help_collection?: string | HelpCollections | null;
    id: string;
    owner?: string | DirectusUsers | null;
    slug?: string | null;
    sort?: number | null;
    status: string;
    summary?: string | null;
    title?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type HelpCollections = {
    articles: any[] | HelpArticles[];
    description?: string | null;
    icon?: string | null;
    id: string;
    slug?: string | null;
    sort?: number | null;
    title?: string | null;
  };
  
  export type HelpFeedback = {
    comments?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    rating?: number | null;
    title?: string | null;
    url?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    visitor_id?: string | null;
  };
  
  export type ImCursos = {
    Area?: string | null;
    Cursos_Relacionados: any[] | ImCursosImCursos[];
    date_created?: string | null;
    date_updated?: string | null;
    Descricao?: string | null;
    DuracaoMeses?: number | null;
    Ead: boolean;
    Ementa?: string | null;
    id: string;
    Nome: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    Valor?: number | null;
    ValorComDesconto?: number | null;
    Video_Depoimento?: string | null;
  };
  
  export type ImCursosImCursos = {
    id: number;
    Im_Cursos_id?: string | ImCursos | null;
    related_Im_Cursos_id?: string | ImCursos | null;
    sort?: number | null;
  };
  
  export type Inbox = {
    data?: unknown | null;
    date_created?: string | null;
    date_updated?: string | null;
    form?: string | Forms | null;
    id: string;
    project?: string | OsProjects | null;
    sort?: number | null;
    status?: string | null;
    task?: string | OsTasks | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type Messages = {
    contact_id?: string | null;
    conversation?: string | Conversations | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    text?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    visitor_id?: string | null;
  };
  
  export type Navigation = {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    items: any[] | NavigationItems[];
    status: string;
    title?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type NavigationItems = {
    children: any[] | NavigationItems[];
    display_details: string;
    has_children?: boolean | null;
    icon?: string | null;
    id: string;
    label?: string | null;
    navigation?: string | Navigation | null;
    open_in_new_tab?: boolean | null;
    page?: string | Pages | null;
    parent?: string | NavigationItems | null;
    sort?: number | null;
    title?: string | null;
    type?: string | null;
    url?: string | null;
  };
  
  export type OrganizationAddresses = {
    address_country?: string | null;
    address_locality?: string | null;
    address_region?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    is_primary_billing?: boolean | null;
    name?: string | null;
    organization?: string | Organizations | null;
    postal_code?: string | null;
    sort?: number | null;
    street_address?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type Organizations = {
    addresses: any[] | OrganizationAddresses[];
    billing: string;
    brand_color?: string | null;
    branding: string;
    contacts: any[] | OrganizationsContacts[];
    date_created?: string | null;
    date_updated?: string | null;
    email?: string | null;
    folder?: string | DirectusFolders | null;
    id: string;
    logo?: string | DirectusFiles | null;
    name?: string | null;
    organization_notes?: string | null;
    owner?: string | DirectusUsers | null;
    payment_terms?: string | OsPaymentTerms | null;
    phone?: string | null;
    status: string;
    stripe_customer_id?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    website?: string | null;
  };
  
  export type OrganizationsContacts = {
    contacts_id?: string | Contacts | null;
    id: string;
    organizations_id?: string | Organizations | null;
    sort?: number | null;
  };
  
  export type OsActivities = {
    activity_notes?: string | null;
    activity_type?: string | null;
    assigned_to?: string | DirectusUsers | null;
    contacts: any[] | OsActivityContacts[];
    date_created?: string | null;
    date_updated?: string | null;
    deal?: string | OsDeals | null;
    due_date?: string | null;
    end_time?: string | null;
    id: string;
    name?: string | null;
    organization?: string | Organizations | null;
    sort?: number | null;
    start_time?: string | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsActivityContacts = {
    contacts_id?: string | Contacts | null;
    id: string;
    os_activities_id?: string | OsActivities | null;
  };
  
  export type OsDealContacts = {
    contacts_id?: string | Contacts | null;
    id: string;
    os_deals_id?: string | OsDeals | null;
    primary?: boolean | null;
    sort?: number | null;
  };
  
  export type OsDealStages = {
    color?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    name?: string | null;
    sort?: number | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsDeals = {
    activities: any[] | OsActivities[];
    activity: string;
    close_date?: string | null;
    contacts: any[] | OsDealContacts[];
    date_created?: string | null;
    date_updated?: string | null;
    deal_notes?: string | null;
    deal_stage?: string | OsDealStages | null;
    deal_value?: number | null;
    id: string;
    name?: string | null;
    next_contact_date?: string | null;
    organization?: string | Organizations | null;
    owner?: string | DirectusUsers | null;
    proposals: any[] | OsProposals[];
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsEmailTemplates = {
    body?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    name?: string | null;
    sort?: number | null;
    subject?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsExpenses = {
    category?: string | null;
    cost?: number | null;
    date?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    description?: string | null;
    file?: string | DirectusFiles | null;
    id: string;
    invoice_item?: string | OsInvoiceItems | null;
    is_billable?: boolean | null;
    is_reimbursable?: boolean | null;
    name?: string | null;
    project?: string | OsProjects | null;
    sort?: number | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_submitted?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsInvoiceItems = {
    billable_expense?: string | OsExpenses | null;
    date_created?: string | null;
    date_updated?: string | null;
    description?: string | null;
    id: string;
    invoice?: string | OsInvoices | null;
    item?: string | OsItems | null;
    item_name?: string | null;
    line_amount?: number | null;
    line_item_number?: number | null;
    override_unit_price?: boolean | null;
    quantity?: number | null;
    sort?: number | null;
    tax_amount?: number | null;
    tax_rate?: string | OsTaxRates | null;
    type?: string | null;
    unit_price?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsInvoices = {
    amount_due?: number | null;
    amount_paid?: number | null;
    contact?: string | Contacts | null;
    date_created?: string | null;
    date_updated?: string | null;
    due_date?: string | null;
    id: string;
    invoice_number?: string | null;
    issue_date?: string | null;
    line_items: any[] | OsInvoiceItems[];
    organization?: string | Organizations | null;
    payments: any[] | OsPayments[];
    project?: string | OsProjects | null;
    reference?: string | null;
    sort?: number | null;
    status: string;
    subtotal?: number | null;
    total?: number | null;
    total_tax?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsItems = {
    date_created?: string | null;
    date_updated?: string | null;
    default_tax_rate?: string | OsTaxRates | null;
    description?: string | null;
    icon?: string | null;
    id: string;
    name?: string | null;
    sort?: number | null;
    status?: string | null;
    unit_cost?: number | null;
    unit_price?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsPaymentTerms = {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    name?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsPayments = {
    amount?: number | null;
    contact?: string | Contacts | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    invoice?: string | OsInvoices | null;
    metadata?: unknown | null;
    organization?: string | Organizations | null;
    payment_date?: string | null;
    payment_method_type?: string | null;
    receipt_url?: string | null;
    sort?: number | null;
    status?: string | null;
    stripe_payment_id?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsProjectContacts = {
    contacts_id?: string | Contacts | null;
    id: string;
    os_projects_id?: string | OsProjects | null;
    sort?: number | null;
  };
  
  export type OsProjectTemplates = {
    date_created?: string | null;
    date_updated?: string | null;
    description?: string | null;
    id: string;
    name?: string | null;
    sort?: number | null;
    status: string;
    tasks?: unknown | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsProjectUpdates = {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    message?: string | null;
    project?: string | OsProjects | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsProjects = {
    billing: string;
    bo_flowise_chatflows: any[] | BoFlowiseChatflows[];
    contacts: any[] | OsProjectContacts[];
    date_created?: string | null;
    date_updated?: string | null;
    description?: string | null;
    due_date?: string | null;
    expenses: any[] | OsExpenses[];
    id: string;
    invoices: any[] | OsInvoices[];
    name?: string | null;
    organization?: string | Organizations | null;
    owner?: string | DirectusUsers | null;
    sort?: number | null;
    start_date?: string | null;
    status?: string | null;
    tasks: any[] | OsTasks[];
    updates: any[] | OsProjectUpdates[];
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsProposalApprovals = {
    contact?: string | Contacts | null;
    date_created?: string | null;
    date_updated?: string | null;
    email?: string | null;
    esignature_agreement?: boolean | null;
    first_name?: string | null;
    id: string;
    ip_address?: string | null;
    last_name?: string | null;
    metadata?: unknown | null;
    organization?: string | null;
    proposal?: string | OsProposals | null;
    signature_image?: string | DirectusFiles | null;
    signature_text?: string | null;
    signature_type?: string | null;
    sort?: number | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsProposalBlocks = {
    collection?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    item?: string | any | null;
    os_proposals_id?: string | OsProposals | null;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsProposalContacts = {
    contacts_id?: string | Contacts | null;
    id: string;
    os_proposals_id?: string | OsProposals | null;
    sort?: number | null;
  };
  
  export type OsProposals = {
    activity: string;
    approvals: any[] | OsProposalApprovals[];
    blocks: any[] | OsProposalBlocks[];
    contacts: any[] | OsProposalContacts[];
    date_created?: string | null;
    date_updated?: string | null;
    deal?: string | OsDeals | null;
    expiration_date?: string | null;
    id: string;
    name?: string | null;
    organization?: string | Organizations | null;
    sort?: number | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsSettings = {
    id: string;
    next_invoice_number?: number | null;
    next_proposal_number?: number | null;
    organization_folder_root?: string | DirectusFolders | null;
  };
  
  export type OsTaskFiles = {
    directus_files_id?: string | DirectusFiles | null;
    id: string;
    os_tasks_id?: string | OsTasks | null;
    sort?: number | null;
  };
  
  export type OsTasks = {
    assigned_to?: string | DirectusUsers | null;
    client_task_details: string;
    date_completed?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    description?: string | null;
    due_date?: string | null;
    embed_url?: string | null;
    files: any[] | OsTaskFiles[];
    form?: string | Forms | null;
    id: string;
    is_visible_to_client: boolean;
    name?: string | null;
    project?: string | OsProjects | null;
    responsibility?: string | null;
    sort?: number | null;
    start_date?: string | null;
    status?: string | null;
    type: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type OsTaxRates = {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    name?: string | null;
    rate?: number | null;
    sort?: number | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type PageBlocks = {
    collection?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    hide_block?: boolean | null;
    id: string;
    item?: string | any | null;
    pages_id?: string | Pages | null;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type Pages = {
    blocks: any[] | PageBlocks[];
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    permalink?: string | null;
    seo?: string | Seo | null;
    sort?: number | null;
    status: string;
    title?: string | null;
    user_created?: string | null;
    user_updated?: string | null;
  };
  
  export type PagesBlog = {
    featured_post?: string | Posts | null;
    headline?: string | null;
    id: string;
    seo?: string | Seo | null;
    title?: string | null;
  };
  
  export type PagesProjects = {
    headline?: string | null;
    id: string;
    seo?: string | Seo | null;
    title?: string | null;
  };
  
  export type PostGalleryItems = {
    directus_files_id?: string | DirectusFiles | null;
    id: string;
    posts_id?: string | Posts | null;
    sort?: number | null;
  };
  
  export type Posts = {
    author?: string | Team | null;
    built_with?: unknown | null;
    category?: string | Categories | null;
    client?: string | null;
    content?: string | null;
    cost?: string | null;
    date_created?: string | null;
    date_published?: string | null;
    date_updated?: string | null;
    gallery: any[] | PostGalleryItems[];
    id: string;
    image?: string | DirectusFiles | null;
    project_details: string;
    seo?: string | Seo | null;
    slug?: string | null;
    sort?: number | null;
    status: string;
    summary?: string | null;
    title?: string | null;
    type?: string | null;
    user_created?: string | null;
    user_updated?: string | null;
    video_url?: string | null;
  };
  
  export type Redirects = {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    response_code?: number | null;
    url_new?: string | null;
    url_old?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type Seo = {
    canonical_url?: string | null;
    id: string;
    meta_description?: string | null;
    no_follow?: boolean | null;
    no_index?: boolean | null;
    sitemap_change_frequency?: string | null;
    sitemap_priority?: number | null;
    title?: string | null;
  };
  
  export type Team = {
    bio?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    image?: string | DirectusFiles | null;
    job_title?: string | null;
    name?: string | null;
    posts: any[] | Posts[];
    social_media?: unknown | null;
    sort?: number | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type Testimonials = {
    company?: string | null;
    company_info: string;
    company_logo?: string | DirectusFiles | null;
    content?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    image?: string | DirectusFiles | null;
    link?: string | null;
    sort?: number | null;
    status: string;
    subtitle?: string | null;
    title?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
  };
  
  export type CustomDirectusTypes = {
    block_button: BlockButton[];
    block_button_group: BlockButtonGroup[];
    block_columns: BlockColumns[];
    block_columns_rows: BlockColumnsRows[];
    block_cta: BlockCta[];
    block_divider: BlockDivider[];
    block_faqs: BlockFaqs[];
    block_form: BlockForm[];
    block_gallery: BlockGallery[];
    block_gallery_files: BlockGalleryFiles[];
    block_hero: BlockHero[];
    block_html: BlockHtml[];
    block_logocloud: BlockLogocloud[];
    block_logocloud_logos: BlockLogocloudLogos[];
    block_quote: BlockQuote[];
    block_richtext: BlockRichtext[];
    block_step_items: BlockStepItems[];
    block_steps: BlockSteps[];
    block_team: BlockTeam[];
    block_testimonial_slider_items: BlockTestimonialSliderItems[];
    block_testimonials: BlockTestimonials[];
    block_video: BlockVideo[];
    bo_apikeys: BoApikeys[];
    bo_assinatura: BoAssinatura[];
    bo_assistants: BoAssistants[];
    bo_autobot_runs: BoAutobotRuns[];
    bo_autobots: BoAutobots[];
    bo_autobots_bots: BoAutobotsBots[];
    bo_bot_template: BoBotTemplate[];
    bo_botcart: BoBotcart[];
    bo_botclient: BoBotclient[];
    bo_botclient_contacts: BoBotclientContacts[];
    bo_briefing_artefato: BoBriefingArtefato[];
    bo_changelog: BoChangelog[];
    bo_chat: BoChat[];
    bo_cliente: BoCliente[];
    bo_cliente_opcoes_pagamento: BoClienteOpcoesPagamento[];
    bo_clusters: BoClusters[];
    bo_cupom: BoCupom[];
    bo_flowise_chatflows: BoFlowiseChatflows[];
    bo_flowises: BoFlowises[];
    bo_genimage: BoGenimage[];
    bo_genimage_bo_apikeys: BoGenimageBoApikeys[];
    bo_llms: BoLlms[];
    bo_llms_bo_apikeys: BoLlmsBoApikeys[];
    bo_pagamento: BoPagamento[];
    bo_plano: BoPlano[];
    bo_stt: BoStt[];
    bo_stt_bo_apikeys: BoSttBoApikeys[];
    bo_tipos_clients: BoTiposClients[];
    bo_tts: BoTts[];
    bo_tts_bo_apikeys: BoTtsBoApikeys[];
    bo_zep: BoZep[];
    categories: Categories[];
    contacts: Contacts[];
    conversations: Conversations[];
    directus_access: DirectusAccess[];
    directus_activity: DirectusActivity[];
    directus_collections: DirectusCollections[];
    directus_dashboards: DirectusDashboards[];
    directus_extensions: DirectusExtensions[];
    directus_fields: DirectusFields[];
    directus_files: DirectusFiles[];
    directus_flows: DirectusFlows[];
    directus_folders: DirectusFolders[];
    directus_migrations: DirectusMigrations[];
    directus_notifications: DirectusNotifications[];
    directus_operations: DirectusOperations[];
    directus_panels: DirectusPanels[];
    directus_permissions: DirectusPermissions[];
    directus_policies: DirectusPolicies[];
    directus_presets: DirectusPresets[];
    directus_relations: DirectusRelations[];
    directus_revisions: DirectusRevisions[];
    directus_roles: DirectusRoles[];
    directus_sessions: DirectusSessions[];
    directus_settings: DirectusSettings;
    directus_shares: DirectusShares[];
    directus_translations: DirectusTranslations[];
    directus_users: DirectusUsers[];
    directus_versions: DirectusVersions[];
    directus_webhooks: DirectusWebhooks[];
    forms: Forms[];
    globals: Globals;
    help_articles: HelpArticles[];
    help_collections: HelpCollections[];
    help_feedback: HelpFeedback[];
    Im_Cursos: ImCursos[];
    Im_Cursos_Im_Cursos: ImCursosImCursos[];
    inbox: Inbox[];
    messages: Messages[];
    navigation: Navigation[];
    navigation_items: NavigationItems[];
    organization_addresses: OrganizationAddresses[];
    organizations: Organizations[];
    organizations_contacts: OrganizationsContacts[];
    os_activities: OsActivities[];
    os_activity_contacts: OsActivityContacts[];
    os_deal_contacts: OsDealContacts[];
    os_deal_stages: OsDealStages[];
    os_deals: OsDeals[];
    os_email_templates: OsEmailTemplates[];
    os_expenses: OsExpenses[];
    os_invoice_items: OsInvoiceItems[];
    os_invoices: OsInvoices[];
    os_items: OsItems[];
    os_payment_terms: OsPaymentTerms[];
    os_payments: OsPayments[];
    os_project_contacts: OsProjectContacts[];
    os_project_templates: OsProjectTemplates[];
    os_project_updates: OsProjectUpdates[];
    os_projects: OsProjects[];
    os_proposal_approvals: OsProposalApprovals[];
    os_proposal_blocks: OsProposalBlocks[];
    os_proposal_contacts: OsProposalContacts[];
    os_proposals: OsProposals[];
    os_settings: OsSettings;
    os_task_files: OsTaskFiles[];
    os_tasks: OsTasks[];
    os_tax_rates: OsTaxRates[];
    page_blocks: PageBlocks[];
    pages: Pages[];
    pages_blog: PagesBlog;
    pages_projects: PagesProjects;
    post_gallery_items: PostGalleryItems[];
    posts: Posts[];
    redirects: Redirects[];
    seo: Seo[];
    team: Team[];
    testimonials: Testimonials[];
  };
  