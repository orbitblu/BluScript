import { Parser, HTMLGenerator } from './bluscript.js';

const code = `
// Full-featured Navigation
NAVBAR {
    BRAND: OrbitBlu Platform
    LINK: Dashboard: /dashboard
    LINK: Projects: /projects
    LINK: Settings: /settings
    BUTTON: Sign Up: /register: primary
    BUTTON: Login: /login: secondary
}

// Advanced Login Form
LOGIN PAGE {
    TITLE: Welcome to OrbitBlu
    FIELD: username: Username
    FIELD: email: Email Address
    FIELD: password: Password
    FIELD: confirm: Confirm Password
    AUTH: JWT
    ACTION: /api/register
    BUTTON: Create Account: primary
    FOOTER: Already have an account?: /login
}`;

// Display the BluScript code with syntax highlighting
const highlightedCode = code
    .replace(/\/\/.+/g, match => `<span class="comment">${match}</span>`)
    .replace(/\b(NAVBAR|LOGIN|PAGE|BRAND|LINK|BUTTON|FIELD|AUTH|ACTION|TITLE|FOOTER)\b/g, 
        match => `<span class="keyword">${match}</span>`)
    .replace(/:\s([^:\n]+)(?=\s|$)/g, 
        (match, value) => `: <span class="string">${value}</span>`);

document.getElementById('code').innerHTML = highlightedCode;

// Parse the BluScript code
const parser = new Parser(code);
const ast = parser.parse();
const htmlGenerator = new HTMLGenerator();

// Add route handling
const router = {
    currentPath: window.location.pathname,
    navigate(path) {
        this.currentPath = path;
        window.history.pushState({}, '', path);
        renderCurrentRoute();
    }
};

router.currentPath = window.location.pathname;
renderCurrentRoute();

function renderCurrentRoute() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    // Always show navbar
    const navbarCommand = ast.find(cmd => cmd.type === 'NAVBAR');
    if (navbarCommand) {
        const navbarHtml = htmlGenerator.generateNavbar(navbarCommand);
        app.innerHTML = navbarHtml;
    }

    // Show login form on /login or /register route
    if (router.currentPath === '/login' || router.currentPath === '/register') {
        const loginCommand = ast.find(cmd => cmd.type === 'LOGIN');
        if (loginCommand) {
            const loginHtml = htmlGenerator.generateLoginPage(loginCommand);
            app.innerHTML += loginHtml;
        }
    }
}

// Add click handlers for navigation
document.addEventListener('click', (e) => {
    if (e.target.matches('a') || e.target.matches('.btn')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        if (href && !href.startsWith('http')) {
            router.navigate(href);
        }
    }
});

// Initial render
renderCurrentRoute();