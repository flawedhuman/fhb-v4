<template>
    <form>
        <div>
          <label>FHB Clear Vinyl Stickers</label>
          <input class="my-input">
        </div>
        <div>
          <label>FHB Clear Vinyl Stickers</label>
          <!-- Using the same "my-input" class on the -->
          <!-- regular input above and on this container. -->
          <div class="my-input" id="card-element"></div>
        </div>
      </form>
</template>

<script>

cardElement.mount('#sticker-form');

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

const elements = stripe.elements({
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  appearance,
})

const expressCheckoutElement = elements.create(
  'expressCheckout',
  expressCheckoutOptions
)

expressCheckoutElement.mount('#express-checkout-element')

</script>

<style>
    .my-input {
        padding: 10px;
        border: 1px solid #ccc;
    }
</style>

