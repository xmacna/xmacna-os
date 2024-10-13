
<template>
  <div>
    <div id="payment-form">
      <div id="card-element"></div>
      <button id="submit-button">Pay</button>
    </div>
    <div id="payment-result"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q96u2Em4kLiPlVDrfIwwiTnOLLYjrydDxg0CRdjjpgX9xATiVtmDUNGG2fAcvvtWcuFjBHjkxfnDXKXSn6aNwd1002sBPp4Ln');

const cardElement = ref(null);
const paymentResult = ref('');

onMounted(async () => {
  const stripe = await stripePromise;
  const elements = stripe.elements();
  cardElement.value = elements.create('card');
  cardElement.value.mount('#card-element');

  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', async () => {
    const { error, paymentIntent } = await stripe.confirmCardPayment('your-client-secret-here', {
      payment_method: {
        card: cardElement.value,
      },
    });

    if (error) {
      paymentResult.value = `Payment failed: ${error.message}`;
    } else if (paymentIntent.status === 'succeeded') {
      paymentResult.value = 'Payment succeeded!';
    }
  });
});
</script>

<style scoped>
#payment-form {
  max-width: 400px;
  margin: 0 auto;
}

#card-element {
  margin-bottom: 20px;
}

#submit-button {
  background-color: #6772e5;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#submit-button:hover {
  background-color: #5469d4;
}
</style>
