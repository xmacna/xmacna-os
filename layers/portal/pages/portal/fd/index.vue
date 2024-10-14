<template>
  <div>
    <div v-if="currentStep === 1" class="modal w-full px-4 py-10 border rounded-panel dark:border-gray-700 dark:bg-gray-900">
      <h2 class="modal-title font-medium leading-6 text-gray-500 font-display dark:text-gray-300">
        Se você falou com um de nossos Funcionários digitais, informe seu whatsapp, para que lembremos de você
      </h2>
      <br />
      <input type="text" v-model="whatsapp" placeholder="Digite seu WhatsApp" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400" />
      <span v-if="errorMessage" class="text-red-500">{{ errorMessage }}</span>
      <br />
      <br />
      <button @click="nextStep" class="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-bold rounded-button text-sm gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 aria-disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 dark:aria-disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 w-full flex justify-center items-center">Próximo</button>
    </div>

    <div v-if="currentStep === 2" class="modal w-full px-4 py-10 border rounded-panel dark:border-gray-700 dark:bg-gray-900">
      <button @click="setCurrStep(1)" class="mb-4 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
        Voltar
      </button>
      <h2 class="modal-title font-medium leading-6 text-gray-500 font-display dark:text-gray-300">
        Escolha um template para seu Funcionário Digital
      </h2>
      <br />
      <div v-for="template in templates" :key="template.id" 
           :class="['mb-4 p-4 border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800', 
                     template.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700']"
           @click="!template.disabled && selectTemplate(template)">
        <h3 class="text-xl font-semibold">{{ template.name }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ template.description }}</p>
      </div>
      <span v-if="errorMessage" class="text-red-500">{{ errorMessage }}</span>
    </div>

    <div v-if="currentStep === 3" class="flex w-full h-screen">
      <div class="w-1/2 p-4 border-r dark:border-gray-600 flex flex-col">
        <h2 class="text-lg font-bold">Chat com a IA</h2>
        <div id="chatbot-container" style="min-height: 400px; overflow-y: auto;">
          <div v-for="(message, index) in chatMessages" :key="index" class="mb-2">
            <div :class="{'text-right': message.sender === 'user'}">
              <span :class="{'bg-black-100': message.sender === 'user', 'bg-black-100': message.sender === 'bot'}" class="inline-block p-2 rounded">
                {{ message.text }}
              </span>
            </div>
          </div>
          <!-- Loading indicator -->
          <div v-if="isLoading" class="flex justify-center items-center">
            <img src="/loading.gif" alt="Loading" class="w-50 h-50" />
          </div>
        </div>
        <div class="mt-auto">
          <input v-model="userMessage" type="text" placeholder="Digite sua mensagem..." @keyup.enter="sendMessage" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400" />
        </div>
      </div>

      <!-- <div v-if="templateStep === 1" class="w-1/2 p-4">
        <button @click="setTemplateStep(1)" class="mb-4 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Voltar
        </button>
        <h2 class="text-lg font-bold">Escolha seu Template de Chatbot</h2>
        <div v-for="template in templates" :key="template.name" 
            :class="['mb-4 p-4 border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800', 
                      template.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700']"
            @click="!template.disabled && selectTemplate(template)">
          <h3 class="text-xl font-semibold">{{ template.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ template.description }}</p>
        </div>
      </div> -->

      <div v-if="templateStep === 1" class="w-1/2 p-4">
        <button @click="setCurrStep(2)" class="mb-4 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Voltar
        </button>
        <h2 class="text-lg font-bold">Informações do Usuário</h2>
        <div ref="tagsContainer" class="tags-container">
          <!-- Renderização dinâmica dos artefatos -->
          <div v-for="artefact in artefacts" :key="artefact.id" class="artefact-item mb-4 p-4 border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <label :for="artefact.identificador" class="block font-medium text-gray-700 dark:text-gray-200">{{ artefact.label }}</label>
            
            <!-- Input para texto -->
            <input v-if="artefact.tipo === 'text'" 
                   :id="artefact.identificador"
                   v-model="artefact.value"
                   :type="artefact.tipo_text === 'textarea' ? 'text' : 'text'"
                   :placeholder="artefact.placeholder"
                   class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400">
            
            <!-- Textarea -->
            <textarea v-if="artefact.tipo === 'textArea'"
                      :id="artefact.identificador"
                      v-model="artefact.value"
                      :placeholder="artefact.placeholder"
                      class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"></textarea>
            
            <!-- Slider -->
            <input v-if="artefact.tipo === 'slider'"
                   :id="artefact.identificador"
                   v-model="artefact.value"
                   type="range"
                   :min="artefact.slider_valor_minimo"
                   :max="artefact.slider_valor_maximo"
                   class="w-full">
            
            <!-- Checkbox -->
            <div v-if="artefact.tipo === 'checkbox'" class="flex items-center">
              <input :id="artefact.identificador"
                     v-model="artefact.value"
                     type="checkbox"
                     class="form-checkbox h-5 w-5 text-primary-600">
              <label :for="artefact.identificador" class="ml-2 text-sm text-gray-700 dark:text-gray-200">{{ artefact.label }}</label>
            </div>
            
            <!-- Options -->
            <div v-if="artefact.tipo === 'options'">
              <!-- Checkbox options -->
              <div v-if="artefact.tipo_options === 'checkbox'">
                <div v-for="option in artefact.opcoes_enum" :key="option" class="flex items-center">
                  <input :id="`${artefact.identificador}-${option}`"
                         v-model="artefact.value"
                         type="checkbox"
                         :value="option"
                         class="form-checkbox h-5 w-5 text-primary-600">
                  <label :for="`${artefact.identificador}-${option}`" class="ml-2 text-sm text-gray-700 dark:text-gray-200">{{ option }}</label>
                </div>
              </div>
              
              <!-- Radio options -->
              <div v-if="artefact.tipo_options === 'radio'">
                <div v-for="option in artefact.opcoes_enum" :key="option" class="flex items-center">
                  <input :id="`${artefact.identificador}-${option}`"
                         v-model="artefact.value"
                         type="radio"
                         :value="option"
                         :name="`radio-${artefact.identificador}`"
                         class="form-radio h-5 w-5 text-primary-600">
                  <label :for="`${artefact.identificador}-${option}`" class="ml-2 text-sm text-gray-700 dark:text-gray-200">{{ option }}</label>
                </div>
              </div>
              
              <!-- Combobox options -->
              <select v-if="artefact.tipo_options === 'combobox'"
                      :id="artefact.identificador"
                      v-model="artefact.value"
                      class="form-select block w-full mt-1">
                <option v-for="option in artefact.opcoes_enum" :key="option" :value="option">{{ option }}</option>
              </select>
              
              <!-- Button options -->
              <div v-if="artefact.tipo_options === 'button'">
                <button v-for="option in artefact.opcoes_enum" 
                        :key="option"
                        @click="artefact.value = option"
                        :class="['mt-2 px-4 py-2 border rounded', artefact.value === option ? 'bg-primary-500 text-white' : 'bg-white text-gray-700']">
                  {{ option }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      templateStep: 1, // New state to manage template display
      activeAccordion: null, // Track which accordion is open
      whatsapp: '',
      errorMessage: '',
      userName: '',
      userEmail: '',
      userTelefone: '',
      hasWebsite: false,
      websiteUrl: '',
      companyName: '',
      companyPhone: '',
      copy: '',
      productsServices: '',
      employeeName: '',
      personality: 50, // Default value for personality slider
      emojis: 50, // Default value for emojis slider
      languageType: '',
      botBackstory: '',
      jobDescription: '',
      specificKnowledge: '',
      restrictions: '',
      additionalInfo: '',
      selectedTemplate: null,
      templates: [],
      artefacts: [],
      chatMessages: [], // Array to store chat messages
      userMessage: '', // Model for the user's input
      isLoading: false, // State to track loading status
      templateArtefacts: [], // Novo array para armazenar os artefatos originais do template
    };
  },
  methods: {
    async nextStep() {
      if (this.currentStep === 1) {
        if (!this.whatsapp) {
          this.errorMessage = 'O campo de WhatsApp é obrigatório.';
          return;
        }
        this.errorMessage = '';
        await this.fetchTemplates();
        this.currentStep = 2;
      } else {
        this.currentStep++;
      }
    },
    async fetchTemplates() {
      try {
        const response = await useDirectus(readItems('bo_bot_template'));
        console.log('templates', response);

        this.templates = response.map((template) => ({
          name: template.titulo,
          description: template.caracteristicas,
          disabled: template.status !== 'published',
          id: template.id
        }));
      } catch (error) {
        console.error('Erro ao buscar templates:', error);
        this.errorMessage = 'Ocorreu um erro ao buscar os templates. Tente novamente mais tarde.';
      }
    },
    selectTemplate(template) {
      if (template.disabled) return;

      this.selectedTemplate = template;
      this.currentStep = 3;
      this.fetchArtefacts();
      this.chatMessages = []; // Limpa o histórico de chat ao selecionar um novo template
    },
    async fetchArtefacts() {
      try {
        const response = await useDirectus(readItems('bo_briefing_artefato', {
          filter: { bo_template_pai: { _eq: this.selectedTemplate.id } },
          fields: ['*']
        }));
        this.artefacts = response;
        this.templateArtefacts = JSON.parse(JSON.stringify(response)); // Cria uma cópia profunda dos artefatos originais
        this.generateArtefactHTML();
      } catch (error) {
        console.error('Erro ao buscar artefatos do template:', error);
        this.errorMessage = 'Ocorreu um erro ao buscar os artefatos do template. Tente novamente mais tarde.';
      }
    },
    async confirmUserInfo() {
      // Logic to confirm user information and proceed to the next step
      this.templateStep = 2; // Start the template selection step

      try {
        const response = await useDirectus(readItems('bo_bot_template'));

        console.log('templates', response);

        this.templates = response.map((template) => ({
          name: template.titulo,
          description: template.caracteristicas,
          disabled: template.status !== 'published',
          id: template.id
        }));

        
      } catch (error) {
        console.error('Erro ao buscar templates:', error);
        this.errorMessage = 'Ocorreu um erro ao buscar os templates. Tente novamente mais tarde.';
      } 
    },
    setCurrStep(step) {
      this.currentStep = step;
    },
    setTemplateStep(step) {
      this.templateStep = step;
    },
    generateArtefactHTML() {
      // Este método não é mais necessário, pois estamos usando a renderização dinâmica no template
    },
    advanceToStep5() {
      this.templateStep = 5; // Move to the customization step
    },
    advanceToStep6() {
      this.templateStep = 6; // Move to the training step
    },
    advanceToStep7() {
      this.templateStep = 7; // Move to the testing step
    },
    toggleAccordion(section) {
      this.activeAccordion = this.activeAccordion === section ? null : section;
    },
    finalizeSetup() {
      // Logic to finalize the setup
      console.log('Setup finalized');
    },
    async query(data) {
      console.log('data', data);
      const response = await fetch(
          "https://xmacna-engineering.onrender.com/api/v1/prediction/6c8bc6d8-42b8-4515-a408-25e7789e0ed5",
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
          }
      );
      const result = await response.json();
      return result;
    },
    gerarStringCampos() {
      let camposString = '';
      this.artefacts.forEach(artefact => {
        if (artefact.value !== undefined && artefact.value !== '') {
          let valor = artefact.value;
          if (Array.isArray(valor)) {
            valor = valor.join(', ');
          } else if (typeof valor === 'boolean') {
            valor = valor ? 'Sim' : 'Não';
          }
          camposString += `<elemento><nome>${artefact.identificador}</nome><valor_inicial>${valor}</valor_inicial></elemento>`;
        }
      });
      return camposString;
    },
    async sendMessage() {
      if (!this.userMessage.trim()) return;

      let message = this.userMessage;

      // Clear the input field
      this.userMessage = '';

      // Add user's message to chat
      this.chatMessages.push({ sender: 'user', text: message });

      // Scroll to the bottom of the chat
      this.scrollToBottom();

      // Set loading state to true
      this.isLoading = true;

      try {
        // Generate the campos string
        const camposString = this.gerarStringCampos();

        // Send message to the bot and get response
        const response = await this.query({ 
          question: message, 
          overrideConfig: { campos: camposString }
        });

        console.log('response', response);

        // Set loading state to false
        this.isLoading = false;

        await this.handleBotResponse(response);
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        this.isLoading = false;
        this.chatMessages.push({ sender: 'bot', text: 'Ocorreu um erro. Tente novamente mais tarde.' });
      }      
    },
    async handleBotResponse(response) {
      const message = this.extrairMensagem(response.text);
      const uiFields = this.extrairCamposUi(response.text);

      // Adiciona a mensagem do bot ao chat
      if (!message.includes('\n')) {
        this.chatMessages.push({ sender: 'bot', text: message });
      } else {
        const paragraphs = message.split('\n');
        paragraphs.forEach(paragraph => {
          if (paragraph.trim()) {
            this.chatMessages.push({ sender: 'bot', text: paragraph.trim() });
          }
        });
      }
      this.scrollToBottom();

      // Atualiza os artefatos existentes com base nos campos UI recebidos
      uiFields.forEach(field => {
        const existingArtefact = this.artefacts.find(a => a.identificador === field.nome);
        if (existingArtefact) {
          existingArtefact.value = field.valor_inicial || '';
          // Atualiza outros campos conforme necessário
        }
      });

      // Regenera o HTML com os artefatos atualizados
      this.generateArtefactHTML();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = document.getElementById('chatbot-container');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    extrairCamposUi(response) {
      const regex = /<elemento>\s*<nome>(.*?)<\/nome>\s*<valor_inicial>(.*?)<\/valor_inicial>\s*<\/elemento>/gs;
      const matches = [...response.matchAll(regex)];

      const uiElements = matches.map(match => ({
          nome: match[1],
          valor_inicial: match[2]
      }));

      return uiElements;
    },
    extrairMensagem(response) {
      const regex = /<mensagem>([\s\S]*?)<\/mensagem>/;
      const match = response.match(regex);
      
      if (match && match[1]) {
        return match[1].trim();
      }
      
      return '';
    }
  }
};
</script>

<style scoped>
.modal {
  /* Updated styling for the modal */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}

.input-field {
  display: block;
  margin: 10px 0;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db; /* Light border for input */
  border-radius: 4px;
}

.chat-box {
  height: 90%; /* Adjust height to fit within the container */
}

.accordion {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid #e5e7eb;
}

.accordion-header {
  width: 100%;
  text-align: left;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
}

.accordion-content {
  padding: 10px;
  max-height: 300px; /* Set a fixed height for the accordion content */
  overflow-y: auto; /* Enable vertical scrolling */
}
</style>