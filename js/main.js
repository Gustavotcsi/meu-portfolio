document.addEventListener('DOMContentLoaded', () => {
    

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
            }
        });
    }, {
        threshold: 0.1 
    });

   
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
    // ... (mantenha a parte 1 das animações de scroll aqui em cima) ...

// 2. COMPORTAMENTO DO FORMULÁRIO DE CONTATO (Integração Formspree)
const form = document.querySelector('.contato-form');
if(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        
        // Feedback visual de carregamento
        btn.textContent = 'Enviando...';
        btn.style.opacity = '0.7';
        btn.style.cursor = 'not-allowed';

        // 1. Captura os dados e converte para um Objeto JS puro
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // 2. Envia para o Formspree forçando o formato JSON
            const response = await fetch(form.action, {
                method: form.method,
                body: JSON.stringify(data), // Converte o objeto para string JSON
                headers: {
                    'Content-Type': 'application/json', // Avisa que estamos mandando JSON
                    'Accept': 'application/json'        // Avisa que queremos a resposta em JSON
                }
            });
            
            if (response.ok) {
                // Sucesso!
                btn.textContent = 'Mensagem Enviada com Sucesso!';
                btn.style.backgroundColor = '#10b981'; // Verde
                btn.style.color = '#ffffff';
                form.reset(); // Limpa os campos
            } else {
                // Erro do servidor
                btn.textContent = 'Ops! Ocorreu um erro.';
                btn.style.backgroundColor = '#ef4444'; // Vermelho
                console.error("Erro da API:", await response.text()); // Mostra o motivo no console
            }
        } catch (error) {
            // Erro de internet
            btn.textContent = 'Erro de conexão.';
            btn.style.backgroundColor = '#ef4444'; 
            console.error("Erro de requisição:", error);
        }

        // Retorna o botão ao estado original após 3 segundos
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }, 3000);
    });
}
// 3. MENU MOBILE (Hambúrguer)
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');
const navLinksClick = document.querySelectorAll('.nav-links li a');

if(mobileMenu && navbar) {
    // Abre/Fecha o menu ao clicar no ícone
    mobileMenu.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Fecha o menu automaticamente quando clica em algum link
    navLinksClick.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });
}

  
});