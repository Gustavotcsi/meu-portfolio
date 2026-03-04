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
   


const form = document.querySelector('.contato-form');
if(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        
        
        btn.textContent = 'Enviando...';
        btn.style.opacity = '0.7';
        btn.style.cursor = 'not-allowed';

        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            
            const response = await fetch(form.action, {
                method: form.method,
                body: JSON.stringify(data), 
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json'       
                }
            });
            
            if (response.ok) {
             
                btn.textContent = 'Mensagem Enviada com Sucesso!';
                btn.style.backgroundColor = '#10b981'; 
                btn.style.color = '#ffffff';
                form.reset(); 
            } else {
                
                btn.textContent = 'Ops! Ocorreu um erro.';
                btn.style.backgroundColor = '#ef4444'; 
                console.error("Erro da API:", await response.text()); 
            }
        } catch (error) {
            
            btn.textContent = 'Erro de conexão.';
            btn.style.backgroundColor = '#ef4444'; 
            console.error("Erro de requisição:", error);
        }

       
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        }, 3000);
    });
}

const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');
const navLinksClick = document.querySelectorAll('.nav-links li a');

if(mobileMenu && navbar) {
    
    mobileMenu.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

  
    navLinksClick.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });
}

  
});