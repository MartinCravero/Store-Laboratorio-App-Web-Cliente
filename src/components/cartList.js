import { getFromLocalStorage, setItemToLocalStorage } from "../storage/storage.js";
import { toast } from "./toast.js";


export function cartList(){
    const offcanvasbody = document.querySelector('.offcanvas-body');
    const dataStorage = getFromLocalStorage();
    let template = '';

    if (dataStorage.length === 0) {
        offcanvasbody.innerHTML = '<p class="text-center">El carrito está vacío</p>';
        return;
    }

    dataStorage.forEach(item => {
        const finalPrice = (item.price * item.qtty).toFixed(2);
        template += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4 d-flex justify-content-center align-items-center">
                        <img src="${item.image}" class="img-fluid rounded-start" style="object-fit: contain; height: 150px" alt="${item.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <div class="d-flex align-items-center gap-2 my-2">
                                <button class="btn btn-dark btn-sm" data-action="decrement" data-id="${item.id}" ${item.qtty === 1 ? 'disabled' : ''}>-</button>
                                <span id="contador-${item.id}">${item.qtty}</span>
                                <button class="btn btn-dark btn-sm" data-action="increment" data-id="${item.id}">+</button>
                            </div>
                            <p id="precio-${item.id}" class="card-text">Precio final: $${finalPrice}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-body-secondary">Precio unitario $${item.price}</small>
                            <button class="btn btn-outline-danger border-0" data-action="delete" data-id="${item.id}">
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
        });

    offcanvasbody.innerHTML = template;

//// Delegación de eventos////
    offcanvasbody.onclick = (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const id = parseInt(btn.dataset.id);
        const action = btn.dataset.action;
        let cart = getFromLocalStorage();
        const idx = cart.findIndex(p => p.id === id);
        if (idx === -1) return;

        if (action === 'increment') {
            cart[idx].qtty++;
            toast(`Cantidad de ${cart[idx].title} aumentada`, 'dark');
        }

        if (action === 'decrement' && cart[idx].qtty > 1) {
            cart[idx].qtty--;
            toast(`Cantidad de ${cart[idx].title} disminuida`, 'dark');
        }

        if (action === 'delete') {
            cart = cart.filter(p => p.id !== id);
            toast(`${cart[idx]?.title || 'Producto'} eliminado`, 'danger');
        }

        setItemToLocalStorage(cart);
        cartList(); // refrescar vista
    };
}


export function initCartFooterEvents() {
    const btnFinalizar = document.querySelector('.offcanvas-footer .btn-dark');
    const btnVaciar = document.querySelector('.offcanvas-footer .btn-close-white');

    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            setItemToLocalStorage([]);
            toast('Compra finalizada con éxito', 'success');
            cartList();
        });
    };

    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            setItemToLocalStorage([]);
            toast('Carrito vaciado', 'danger');
            cartList();
        });
    };
}
