<template>
  <div>
    <div v-if="currentStep === 1" class="modal w-full px-4 py-10 border rounded-panel dark:border-gray-700 dark:bg-gray-900">
      <h2 class="modal-title font-medium leading-6 text-gray-500 font-display dark:text-gray-300">
        Se você falou com um de nossos Funcionários digitais, informe seu whatsapp, para que lembremos de você
      </h2>
      <input type="text" v-model="whatsapp" placeholder="Digite seu WhatsApp" class="input-field" />
      <button @click="nextStep" class="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-bold rounded-button text-sm gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 aria-disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 dark:aria-disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 w-full flex justify-center items-center">Próximo</button>
    </div>
    <!-- Future steps can be added here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      whatsapp: ''
    };
  },
  methods: {
    nextStep() {
      // Logic to handle the transition to the next step
      this.currentStep++;
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

.next-button {
  padding: 10px 20px;
  background-color: #3b82f6; /* Blue color similar to InvoiceWidget */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right; /* Aligns the button to the right */
}

.next-button:hover {
  background-color: #2563eb; /* Darker blue on hover */
}
</style>
