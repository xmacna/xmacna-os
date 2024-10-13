 // Start of Selection
<template>
  <div v-if="showPaymentPage" class="payment-page">
    <h1>Select Quantity</h1>
    <div class="quantity-selector">
      <label for="quantity">Quantity:</label>
      <input
        id="quantity"
        type="number"
        v-model.number="quantity"
        min="1"
        class="input"
      />
    </div>
    <p class="total">Total: R$ {{ total }}</p>
    <button @click="handleNext" class="next-button">Next</button>
  </div>
  <div v-else class="embedded" id="embedded">
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Stripe from 'stripe';

// Initialize Stripe with your secret key and specify the API version
const stripe = new Stripe('sk_test_51Q96u2Em4kLiPlVDstushGxzWzjXUFc0UOAkilXwylK46NISYpQVgxb9VJqazrucXnrtOlADmMvZJpVq6GyUYjZA007lDSBsOu', {
  apiVersion: '2022-11-15',
});

const showPaymentPage = ref(true);
const quantity = ref(1);
const total = computed(() => quantity.value * 10);
const paymentIntentId = ref('');

const handleNext = async () => {
  try {
    const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
      amount: total.value * 100, // Amount in cents
      currency: 'brl',
      setup_future_usage: 'on_session',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment Intent created:', paymentIntent.id);
    paymentIntentId.value = paymentIntent.id;
    showPaymentPage.value = false;
    return paymentIntent;
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
const openPaymentForm = async () => {
	if(!paymentIntentId.value) return;
    const embeddedDiv = document.getElementById('embedded') as HTMLElement;
    if (!embeddedDiv) {
        console.error('Embedded div not found');
        return;
    }

    const { loadStripe } = await import('@stripe/stripe-js');
    const stripeInstance = await loadStripe('pk_test_51Q96u2Em4kLiPlVDrfIwwiTnOLLYjrydDxg0CRdjjpgX9xATiVtmDUNGG2fAcvvtWcuFjBHjkxfnDXKXSn6aNwd1002sBPp4Ln'); // Replace with your publishable key

    if (!stripeInstance) {
        console.error('Stripe failed to load');
        return;
    }

    const elements = stripeInstance.elements();
    const paymentElement = elements.create('payment');

    paymentElement.mount(embeddedDiv);
};

openPaymentForm();

</script>

<style scoped>
.payment-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.quantity-selector {
  margin-bottom: 20px;
}

.input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

.total {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.next-button {
  background-color: #6772e5;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.next-button:hover {
  background-color: #5469d4;
}

.stripe-embed {
  margin-top: 30px;
}

.embedded {
  /* Add styles for the embedded section if needed */
}
</style>
