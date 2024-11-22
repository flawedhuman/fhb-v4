<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>FHB Clear Vinyl Stickers</label>
      <input class="my-input" v-model="productDetails">
    </div>
    <div>
      <label>Details</label>
      <div class="my-input" id="card-element"></div>
    </div>
    <div id="express-checkout-element"></div>
    <button type="submit" :disabled="loading">Buy the Damn Thang!</button>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      stripe: null,
      elements: null,
      cardElement: null,
      expressCheckoutElement: null,
      error: null,
      loading: false,
      productDetails: ''
    }
  },
  async mounted() {
    // Make sure to load Stripe.js in your index.html or via npm
    // and set your publishable key
    this.stripe = Stripe('your-publishable-key')

    const appearance = {
      theme: 'stripe',
      variables: {
        borderRadius: '36px',
      }
    }

    const expressCheckoutOptions = {
      buttonHeight: 50,
      buttonTheme: {
        applePay: 'white-outline'
      }
    }

    // Initialize Stripe Elements
    this.elements = this.stripe.elements({
      mode: 'payment',
      amount: 1099,
      currency: 'usd',
      appearance,
    })

    // Create and mount the card element
    this.cardElement = this.elements.create('card')
    this.cardElement.mount('#card-element')

    // Create and mount the express checkout element
    this.expressCheckoutElement = this.elements.create(
      'expressCheckout',
      expressCheckoutOptions
    )
    this.expressCheckoutElement.mount('#express-checkout-element')

    // Listen for errors
    this.cardElement.on('change', (event) => {
      if (event.error) {
        this.error = event.error.message
      } else {
        this.error = null
      }
    })
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      this.error = null

      try {
        const { paymentMethod, error } = await this.stripe.createPaymentMethod({
          type: 'card',
          card: this.cardElement,
        })

        if (error) {
          throw new Error(error.message)
        }

        // Here you would typically send the paymentMethod.id to your server
        // to complete the payment
        console.log('Payment Method:', paymentMethod)
        
        // Add your backend API call here
        // await this.processPayment(paymentMethod.id)

      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  },
  beforeUnmount() {
    // Cleanup
    if (this.cardElement) {
      this.cardElement.unmount()
    }
    if (this.expressCheckoutElement) {
      this.expressCheckoutElement.unmount()
    }
  }
}
</script>

<style>
.my-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: #dc3545;
  margin-top: 8px;
  font-size: 14px;
}

button {
  margin-top: 16px;
  padding: 10px 20px;
  background-color: #5469d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #93a3e5;
  cursor: not-allowed;
}
</style>
