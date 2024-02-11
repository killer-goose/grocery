const items = [
  { id: 0, name: 'apple', price: 200, imgUrl: 'apple.jpg' },
  { id: 1, name: 'orange', price: 150, imgUrl: 'orange.jpg' },
  { id: 2, name: 'kiwi', price: 120, imgUrl: 'kiwi.jpg' },
  { id: 3, name: 'banana', price: 40, imgUrl: 'banana.jpg' },
]
// initialize HASHMAP
// const globalCart = [0, 0, 0, 0, 0, 0]
let globalCart = Array(items.length).fill(0)
if (localStorage.getItem('cartItems')) {
  globalCart = JSON.parse(localStorage.getItem('cartItems'))
}

function loadHomeProducts() {
  const homeContainer = document.getElementById('home-products-container')
  homeContainer.innerHTML = items
    .map(
      (item) =>
        `<div class="product" id=${item.name}>
      <img src="/assets/${item.imgUrl}" alt=${item.name} class='product-img' />
      <p>${item.name}</p>
      <p>Price: ₹${item.price}/kg</p>
      <button onclick=addToCart(${item.id})>Add to Cart</button>
    </div>`
    )
    .join('')
}

function addToCart(arg) {
  console.log(`${items[arg].name} added to cart!`)
  // update hash index
  globalCart[arg] += 1
  localStorage.setItem('cartItems', JSON.stringify(globalCart))
}

function removeFromCart(arg) {
  // 1. Get items from localstorage, filter them and store back to localstorage
  const newCartItems = JSON.parse(localStorage.getItem('cartItems'))
  newCartItems[arg] -= 1
  localStorage.setItem('cartItems', JSON.stringify(newCartItems))

  // 2. Trigger the loading of cart items to update UI
  loadCart()
}

// load the UI on the carts page
function loadCart() {
  // get the element where cart items need to be rendered

  // get elements from DOM
  const cartItemList = document.getElementById('cart-item-list')
  const cartTotalContainer = document.getElementById('cart-total')

  // get cartItems from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems'))
  let cartTotal = 0

  if (!cartItems || cartItems.every((item) => item == 0)) {
    cartItemList.innerHTML = `<p>No items in cart</p>`
    cartTotalContainer.innerHTML = 0
    return
  }

  const listItems = cartItems
    .map((item, i) => {
      let result = ''
      while (item--) {
        cartTotal += items[i].price
        result += `<li>
            <span><img src="/assets/${items[i].imgUrl}" alt=${items[i].name} class='cart-img' />
            </span>
            <span>${items[i].name}</span>
            <span> ₹${items[i].price}/kg</span>
            <button onclick="removeFromCart(${items[i].id})">Remove</button>
          </li>`
      }
      return result
    })
    .join('')

  console.log(cartTotal)
  cartItemList.innerHTML = listItems
  cartTotalContainer.innerHTML = cartTotal
}

// --------------------------------- END  ----------------------------------------------

function checkout() {
  // Implement logic to initiate the checkout process
}

function saveChanges() {
  const form = document.getElementById('profileForm')
  // Perform logic to save changes to the database using AJAX or fetch API
  // You may also want to validate user inputs before saving

  // For demonstration purposes, let's log the updated values to the console
  const formData = new FormData(form)
  const formValues = Object.fromEntries(formData)
  console.log(formValues)
}
