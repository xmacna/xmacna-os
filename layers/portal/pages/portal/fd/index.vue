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

    <div v-if="currentStep === 2" class="flex w-full h-screen">
      <div class="w-1/2 p-4 border-r dark:border-gray-700 flex flex-col">
        <!-- Chat with AI -->
        <h2 class="text-lg font-bold">Chat com a IA</h2>
        <div class="chat-box flex-grow overflow-y-auto">
          <!-- Chat messages will go here -->
        </div>
        <div class="mt-auto">
          <input type="text" placeholder="Digite sua mensagem..." class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400" />
        </div>
      </div>
      <!-- Dados do usuário -->
      <div v-if="templateStep === 1" class="w-1/2 p-4">
        <button @click="setCurrStep(1)" class="mb-4 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Voltar
        </button>
        <h2 class="text-lg font-bold">Informações do Usuário</h2>
        <form @submit.prevent="confirmUserInfo">
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200 after:ms-0.5 after:text-red-500 dark:after:text-red-400">Nome</label>
            <input type="text" v-model="userName" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200 after:ms-0.5 after:text-red-500 dark:after:text-red-400">Email</label>
            <input type="email" v-model="userEmail" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200 after:ms-0.5 after:text-red-500 dark:after:text-red-400">Telefone</label>
            <input type="phone" v-model="userTelefone" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
          </div>
          <button type="submit" class="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-bold rounded-button text-sm gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 aria-disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 dark:aria-disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 w-full flex justify-center items-center mt-4">Enviar</button>
        </form>
      </div>

      <!-- Escolha do Template -->
      <div v-if="templateStep === 2" class="w-1/2 p-4">
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
      </div>

      <!-- Possuí site? -->
      <div v-if="templateStep === 3" class="w-1/2 p-4">
        <button @click="setTemplateStep(2)" class="mb-4 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Voltar
        </button>
        <h2 class="text-lg font-bold">Possuí site?</h2>
        <div class="flex space-x-4">
          <button @click="hasWebsite = true" class="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">Possuo site</button>
          <button @click="setTemplateStep(4)" class="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">Não possuo site</button>
        </div>
        <div v-if="hasWebsite" class="mt-4">
          <input type="text" v-model="websiteUrl" placeholder="Digite o URL do seu site" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400" />
          <button @click="setTemplateStep(4)" class="mt-2 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">Confirmar</button>
        </div>
      </div>

      <!-- Preencher informações para briefing -->
      <div v-if="templateStep === 4" class="w-1/2 p-4">
        <button @click="setTemplateStep(3)" class="mb-4 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Voltar
        </button>
        <h2 class="text-lg font-bold">Preencher informações para briefing</h2>
        <form @submit.prevent="advanceToStep5">
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Nome da sua empresa</label>
            <input type="text" v-model="companyName" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Telefone da sua empresa</label>
            <input type="text" v-model="companyPhone" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Site / Blog</label>
            <input type="text" v-model="websiteUrl" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Copy</label>
            <textarea v-model="copy" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Produtos / Serviços</label>
            <textarea v-model="productsServices" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
          </div>
          <button type="submit" class="mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">Avançar</button>
        </form>
      </div>

      <!-- Customização do FD -->
      <div v-if="templateStep === 5" class="w-1/2 p-4">
        <button @click="setTemplateStep(4)" class="mb-4 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Voltar
        </button>
        <h2 class="text-lg font-bold">Customização do FD</h2>
        <form @submit.prevent="advanceToStep6">
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Nome do Funcionário</label>
            <input type="text" v-model="employeeName" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Personalidade</label>
            <input type="range" v-model="personality" min="0" max="100" class="w-full" />
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Informal</span>
              <span>Formal</span>
            </div>
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Emojis</label>
            <input type="range" v-model="emojis" min="0" max="100" class="w-full" />
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Não usar</span>
              <span>Usar muitos</span>
            </div>
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Tipo de linguagem</label>
            <textarea v-model="languageType" placeholder="Como se fosse o robô, responda à uma pergunta do usuário: 'Olá, gostaria de saber mais informações'" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Backstory do Bot</label>
            <textarea v-model="botBackstory" placeholder="Quer se basear em alguma personalidade/personagem fictício para o comportamento? Senão descreva como se fosse uma 'BIO' do bot, para ele saber quem ele é" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
          </div>
          <button type="submit" class="mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">Continuar</button>
        </form>
      </div>

      <!-- Treinamento do Funcionário -->
      <div v-if="templateStep === 6" class="w-1/2 p-4">
        <button @click="setTemplateStep(5)" class="mb-4 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Voltar
        </button>
        <h2 class="text-lg font-bold">Treinamento do Funcionário</h2>
        <form @submit.prevent="advanceToStep7">
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Descrição do Cargo</label>
            <input type="text" v-model="jobDescription" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Conhecimentos específicos</label>
            <textarea v-model="specificKnowledge" placeholder="Coisas que seu negócio exige que eu saiba, e eu possa não saber" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Restrições ou limitações</label>
            <textarea v-model="restrictions" placeholder="Coisas que o bot não pode fazer, ou tem que obrigatóriamente fazer" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
          </div>
          <div class="mb-4">
            <label class="block font-medium text-gray-700 dark:text-gray-200">Informações adicionais</label>
            <textarea v-model="additionalInfo" placeholder="Mais alguma coisa que o FD precisa levar em conta?" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
          </div>
          <button type="submit" class="mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">Finalizar Treinamento</button>
        </form>
      </div>

      <!-- Teste do Funcionário -->
      <div v-if="templateStep === 7" class="w-1/2 p-4">
        <button @click="setTemplateStep(6)" class="mb-4 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
          Voltar
        </button>
        <h2 class="text-lg font-bold">Teste do Funcionário</h2>
        <div class="accordion">
          <div class="accordion-item">
            <button @click="toggleAccordion('personality')" class="accordion-header">
              Personalidade
            </button>
            <div v-if="activeAccordion === 'personality'" class="accordion-content scrollable-content">
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Nome do Funcionário</label>
                <input type="text" v-model="employeeName" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Personalidade</label>
                <input type="range" v-model="personality" min="0" max="100" class="w-full" />
                <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Informal</span>
                  <span>Formal</span>
                </div>
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Emojis</label>
                <input type="range" v-model="emojis" min="0" max="100" class="w-full" />
                <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Não usar</span>
                  <span>Usar muitos</span>
                </div>
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Tipo de linguagem</label>
                <textarea v-model="languageType" placeholder="Como se fosse o robô, responda à uma pergunta do usuário: 'Olá, gostaria de saber mais informações'" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Backstory do Bot</label>
                <textarea v-model="botBackstory" placeholder="Quer se basear em alguma personalidade/personagem fictício para o comportamento? Senão descreva como se fosse uma 'BIO' do bot, para ele saber quem ele é" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Descrição do Cargo</label>
                <input type="text" v-model="jobDescription" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Conhecimentos específicos</label>
                <textarea v-model="specificKnowledge" placeholder="Coisas que seu negócio exige que eu saiba, e eu possa não saber" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Restrições ou limitações</label>
                <textarea v-model="restrictions" placeholder="Coisas que o bot não pode fazer, ou tem que obrigatóriamente fazer" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Informações adicionais</label>
                <textarea v-model="additionalInfo" placeholder="Mais alguma coisa que o FD precisa levar em conta?" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <button @click="toggleAccordion('context')" class="accordion-header">
              Contexto
            </button>
            <div v-if="activeAccordion === 'context'" class="accordion-content">
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Nome da sua empresa</label>
                <input type="text" v-model="companyName" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Telefone da sua empresa</label>
                <input type="text" v-model="companyPhone" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Site / Blog</label>
                <input type="text" v-model="websiteUrl" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1" />
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Copy</label>
                <textarea v-model="copy" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
              </div>
              <div class="mb-4">
                <label class="block font-medium text-gray-700 dark:text-gray-200">Produtos / Serviços</label>
                <textarea v-model="productsServices" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mt-1"></textarea>
              </div>
            </div>
          </div>
        </div>
        <button @click="finalizeSetup" class="mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">Finalizar</button>
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
      templates: [
        { name: 'Vendedor Digital [Recomendado]', description: 'Eu sou o Hermes, Funcionário Digital especialista em vendas. Trago a eloquência e o carisma do mítico mensageiro para o mundo digital. Com minhas habilidades de ler, ouvir e falar, estou sempre pronto para engajar e transformar cada interação em uma oportunidade de negócio. Disponível 24h, sou a solução ideal para otimizar suas vendas e encantar seus clientes com um atendimento repleto de inteligência.', disabled: false },
        { name: 'Copiloto', description: 'Eu sou o Hermes, Funcionário Digital especialista em vendas. Trago a eloquência e o carisma do mítico mensageiro para o mundo digital. Com minhas habilidades de ler, ouvir e falar, estou sempre pronto para engajar e transformar cada interação em uma oportunidade de negócio. Disponível 24h, sou a solução ideal para otimizar suas vendas e encantar seus clientes com um atendimento repleto de inteligência.', disabled: true },
        { name: 'Assistente', description: 'Eu sou o Hermes, Funcionário Digital especialista em vendas. Trago a eloquência e o carisma do mítico mensageiro para o mundo digital. Com minhas habilidades de ler, ouvir e falar, estou sempre pronto para engajar e transformar cada interação em uma oportunidade de negócio. Disponível 24h, sou a solução ideal para otimizar suas vendas e encantar seus clientes com um atendimento repleto de inteligência.', disabled: true }
      ]
    };
  },
  methods: {
    async nextStep() {
      if (!this.whatsapp) {
        this.errorMessage = 'O campo de WhatsApp é obrigatório.';
        return;
      }

      this.errorMessage = ''; // Clear any previous error message
      this.currentStep++;
      this.templateStep = 1;

      try {
        const directus = useDirectus();
        const response = await directus.items('BoCliente').readByQuery({
          filter: {
            phone: {
              _eq: this.whatsapp
            }
          }
        });

        if (response.data.length === 0) {
          this.errorMessage = 'Nenhum cliente encontrado com este número de WhatsApp.';
        } else {
          // Handle the case where the client is found
          console.log('Cliente encontrado:', response.data[0]);
          this.currentStep++;
        }
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        this.errorMessage = 'Ocorreu um erro ao buscar o cliente. Tente novamente mais tarde.';
      }
    },
    confirmUserInfo() {
      // Logic to confirm user information and proceed to the next step
      this.templateStep = 2; // Start the template selection step
    },
    setCurrStep(step) {
      this.currentStep = step;
    },
    setTemplateStep(step) {
      this.templateStep = step;
    },
    selectTemplate(template) {
      if (!template.disabled) {
        console.log('Template selecionado:', template);
        this.templateStep = 3; // Move to the next step after selecting a template
      }
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