import { menuArray } from "/data.js"

// global variables
let order = []
let uniqueOrder = []
const form = document.getElementById("form")

document.addEventListener('click', function(e) {
    if (e.target.dataset.price) {
        handleAddItem(e.target.dataset.price)
    }
    else if (e.target.dataset.remove) {
        handleRemove(e.target.dataset.remove)
    }
})

// add function
function handleAddItem(itemId) {
    const newItem = menuArray.filter((item) => item.id === Number(itemId))[0]
    order.push(newItem)
    let orderSet = new Set(order)
    uniqueOrder = [...orderSet]
    getOrderHTML(order, uniqueOrder)
}

// pre-order state function to render elements and calculate price
function getOrderHTML(arr1, arr2) {
    let totalPrice = 0
    let orderHTML = ``
    arr1.forEach(item => totalPrice += item.price)
    orderHTML += `<h1>Your order</h1>`
    arr2.forEach(item => {
        orderHTML += 
        `
            <div class="ordered-item">
                <div class="item-name-parent">
                    <div class="item-name"> ${item.name} </div>
                    <div class="remove" id="remove" data-remove="${item.id}">remove</div>
                </div>
                <div class="item-price"> $${item.price} </div>
            </div>
        `
    })
    orderHTML += `
    <div class="price-divider"></div>
    <div class="total-price">
        <div class="total-price-text">Total price:</div>
        <div class="price">$${totalPrice}</div>
    </div>
    <button id="complete-order">Complete order</button>
    `
    document.getElementById('order').innerHTML = orderHTML
    
    if(totalPrice>0) {
        completeOrder()
    }
    pay()
}

// function to render payment form
function completeOrder() {
    const completeOrder = document.getElementById('complete-order')
    completeOrder.addEventListener('click', function(){
     form.style.display = 'flex'
    })  
}

// function to complete payment
function pay() {
    const payBtn = document.getElementById("pay")
    const name = document.getElementById("name")
    payBtn.addEventListener('click', function(e) {
        e.preventDefault()
        // name.addEventListener('change', function(e){
        //     customerName = e.target.value
        //     // document.getElementById('order').innerHTML = `<div class="thanks">Thanks ${customerName} !</div>`
        //     // form.style.display = 'none'
        
        // })
        document.getElementById('order').innerHTML = `<div class="thanks">Thanks, ${name.value}! Your order is on its way!</div>`
        form.style.display = 'none'
    })
    
}

// handle remove function
function handleRemove(itemId) {
    uniqueOrder = uniqueOrder.filter(item => item.id !== Number(itemId))
    order = order.filter(item => item.id !== Number(itemId))
    getOrderHTML(order, uniqueOrder)
}

// render default HTML 
function getFeedHTML() {
    let feedHTML = ``
    
    menuArray.forEach(item => {
        feedHTML += `
        <div class="menu-item-parent">
            <div class="item-emoji">${item.emoji}</div>
            <div class="item">
                <h1 class="item-heading">${item.name}</h1>
                <p class="item-desc">${item.ingredients}</p>
                <h1 class="price">$${item.price}</h1>
            </div>
            <div class="plus-parent" data-price="${item.id}">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </div>
        </div>
        <div class="divider"></div>
    `
    })
    return feedHTML
}

function render() {
    document.getElementById('menu').innerHTML += getFeedHTML()
}

render()








// <div class="menu-item-parent">
//                     <img class="item-emoji" src="/images/pizza.png">
//                     <div class="item">
//                         <h1 class="item-heading">Pizza</h1>
//                         <p class="item-desc">pepperoni,mushrom,mozarella</p>
//                         <h1 class="price">$14</h1>
//                     </div>
//                     <div class="plus-parent">
//                         <i class="fa fa-plus" aria-hidden="true"></i>
//                     </div>
//                 </div>
//                 <div class="divider"></div>
