// Selectores de elementos
const elements = {
    buyButton: document.querySelector('#btnBuy'),
    sellButton: document.querySelector('#btnSell'),
    sendButton: document.querySelector('#btnSend'),
    buyModal: document.querySelector('#buyModal'),
    modalClose: document.querySelector('.modal-close'),
    buyForm: document.querySelector('#buyForm')
};

// Manejadores de eventos para los botones principales
elements.buyButton?.addEventListener('click', () => {
    if (elements.buyModal) {
        elements.buyModal.style.display = 'flex';
    }
});

elements.modalClose?.addEventListener('click', () => {
    if (elements.buyModal) {
        elements.buyModal.style.display = 'none';
    }
});

// Manejar el envío del formulario de compra
elements.buyForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Esta es una demo. En una implementación real, aquí se procesaría el pago.');
    if (elements.buyModal) {
        elements.buyModal.style.display = 'none';
    }
});

// Manejar botón de P2P
elements.sellButton?.addEventListener('click', () => {
    alert('Funcionalidad P2P en desarrollo');
});

// Manejar botón de envío
elements.sendButton?.addEventListener('click', () => {
    alert('Funcionalidad de envío en desarrollo');
});

// Simulación de actualización de precios
function simulateMarketUpdates() {
    setInterval(() => {
        const bitcoinPrice = document.querySelector('#bitcoin .amount');
        const ethereumPrice = document.querySelector('#ethereum .amount');
        
        if (bitcoinPrice) {
            const currentBTC = parseFloat(bitcoinPrice.textContent?.replace('$', '').replace(',', '') || '0');
            const newBTC = currentBTC + (Math.random() - 0.5) * 100;
            bitcoinPrice.textContent = `$${newBTC.toFixed(2)}`;
        }
        
        if (ethereumPrice) {
            const currentETH = parseFloat(ethereumPrice.textContent?.replace('$', '').replace(',', '') || '0');
            const newETH = currentETH + (Math.random() - 0.5) * 10;
            ethereumPrice.textContent = `$${newETH.toFixed(2)}`;
        }
    }, 5000);
}

// Iniciar simulación de mercado
simulateMarketUpdates();

// Clase principal para manejar la wallet
class CryptoWallet {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.simulateMarketUpdates();
        this.loadP2POffers();
    }
    
    initializeElements() {
        // Modales
        this.modals = {
            buy: document.getElementById('buyModal'),
            p2p: document.getElementById('p2pModal'),
            send: document.getElementById('sendModal')
        };
        
        // Botones
        this.buttons = {
            buy: document.getElementById('btnBuy'),
            sell: document.getElementById('btnSell'),
            send: document.getElementById('btnSend')
        };
        
        // Formularios
        this.forms = {
            buy: document.getElementById('buyForm'),
            p2p: document.getElementById('createP2pForm'),
            send: document.getElementById('sendForm')
        };
    }
    
    attachEventListeners() {
        // Eventos de botones principales
        Object.entries(this.buttons).forEach(([key, button]) => {
            button?.addEventListener('click', () => this.openModal(key));
        });
        
        // Cerrar modales
        document.querySelectorAll('.modal-close').forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) modal.style.display = 'none';
            });
        });
        
        // Eventos de formularios
        this.forms.buy?.addEventListener('submit', (e) => this.handleBuySubmit(e));
        this.forms.p2p?.addEventListener('submit', (e) => this.handleP2PSubmit(e));
        this.forms.send?.addEventListener('submit', (e) => this.handleSendSubmit(e));
        
        // Validación de tarjeta en tiempo real
        const cardNumber = document.getElementById('cardNumber');
        cardNumber?.addEventListener('input', (e) => utils.formatCardNumber(e.target));
        
        // Manejo de tabs en P2P
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleTabChange(e));
        });
    }
    
    openModal(type) {
        const modal = this.modals[type];
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    handleTabChange(e) {
        const targetTab = e.target.dataset.tab;
        
        // Actualizar tabs activos
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === targetTab);
        });
        
        // Actualizar contenido visible
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.dataset.tab === targetTab);
        });
    }
    
    async handleBuySubmit(e) {
        e.preventDefault();
        const form = e.target;
        const cardNumber = form.querySelector('#cardNumber').value.replace(/\s/g, '');
        
        if (!utils.validateCardNumber(cardNumber)) {
            utils.showError('cardNumber', 'Número de tarjeta inválido');
            return;
        }
        
        // Simulación de compra exitosa
        await this.simulateTransaction();
        this.modals.buy.style.display = 'none';
        form.reset();
    }
    
    async handleP2PSubmit(e) {
        e.preventDefault();
        const amount = document.getElementById('p2pAmount').value;
        const price = document.getElementById('p2pPrice').value;
        
        if (amount <= 0) {
            utils.showError('p2pAmount', 'La cantidad debe ser mayor a 0');
            return;
        }
        
        if (price <= 0) {
            utils.showError('p2pPrice', 'El precio debe ser mayor a 0');
            return;
        }
        
        // Simulación de creación de oferta
        await this.simulateTransaction();
        this.modals.p2p.style.display = 'none';
        e.target.reset();
        this.loadP2POffers(); // Recargar ofertas
    }
    
    async handleSendSubmit(e) {
        e.preventDefault();
        const address = document.getElementById('recipientAddress').value;
        const amount = document.getElementById('sendAmount').value;
        const crypto = document.getElementById('sendCrypto').value;
        
        // Validar dirección según la criptomoneda
        const isValidAddress = crypto === 'BTC' ? 
            utils.validateBTCAddress(address) : 
            utils.validateETHAddress(address);
        
        if (!isValidAddress) {
            utils.showError('recipientAddress', 'Dirección inválida');
            return;
        }
        
        if (amount <= 0) {
            utils.showError('sendAmount', 'La cantidad debe ser mayor a 0');
            return;
        }
        
        // Simulación de envío exitoso
        await this.simulateTransaction();
        document.getElementById('sendSuccess').style.display = 'block';
        setTimeout(() => {
            this.modals.send.style.display = 'none';
            document.getElementById('sendSuccess').style.display = 'none';
            e.target.reset();
        }, 2000);
    }
    
    async simulateTransaction() {
        // Simular tiempo de procesamiento
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
}