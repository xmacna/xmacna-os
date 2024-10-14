<template>
  <div class="transition duration-200 rounded-card divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow-none bg-white dark:bg-gray-900 mt-6">
    <form @submit.prevent="cadastrar" style="padding: 20px;">
      <div class="form-group transition duration-200 rounded-card rounded-card divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary dark:hover:ring-primary shadow-none bg-white dark:bg-gray-900 h-full">
        <label for="firstName">Primeiro Nome:</label>
        <input type="text" id="firstName" v-model="firstName" required />
      </div>
			<br>
      <div class="form-group transition duration-200 rounded-card rounded-card divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary dark:hover:ring-primary shadow-none bg-white dark:bg-gray-900 h-full">
        <label for="lastName">Sobrenome:</label>
        <input type="text" id="lastName" v-model="lastName" required />
      </div>
			<br>
      <div class="form-group transition duration-200 rounded-card rounded-card divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary dark:hover:ring-primary shadow-none bg-white dark:bg-gray-900 h-full">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
			<br>
      <div class="form-group transition duration-200 rounded-card rounded-card divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary dark:hover:ring-primary shadow-none bg-white dark:bg-gray-900 h-full">
        <label for="phone">Telefone:</label>
        <input type="tel" id="phone" v-model="phone" required />
      </div>
			<br>
      <UButton type="submit" @click="cadastrar">Cadastrar</UButton>
    </form>
  </div>
</template>

<script setup lang="js">
import { ref, computed } from 'vue';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Q96u2Em4kLiPlVDstushGxzWzjXUFc0UOAkilXwylK46NISYpQVgxb9VJqazrucXnrtOlADmMvZJpVq6GyUYjZA007lDSBsOu');

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');

const cadastrar = async () => {
  try {
				event.preventDefault();
        // Start Generation Here
        console.log('First Name:', firstName.value);
        console.log('Last Name:', lastName.value);
        console.log('Email:', email.value);
        console.log('Phone:', phone.value);

    const customer = await stripe.customers.create({
      name: `${firstName.value} ${lastName.value}`,
      email: email.value,
      phone: phone.value,
      address: {
        line1: '',
        city: '',
        state: '',
        postal_code: '',
      },
    });

		console.log('Customer created:', customer.id);
    navigateTo(`/portal/pagamentos/?customerId=${customer.id}`);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      // Handle Stripe-specific errors
      console.error('Stripe error:', error.message);
    } else {
      // Handle generic errors
      console.error('Error creating payment intent:', error);
    }

    throw error;
  }
};
</script>
