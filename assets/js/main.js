/**
 * Khushbu Pardhi - Portfolio Interactive Engine
 * Power BI Developer Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initNavbarScroll();
  initDashboardSimulator();
  initProjectFilters();
  initContactForm();
  initCopyButtons();
});

/* ==========================================================================
   1. Dark / Light Theme Controller
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  
  // Check preference: localStorage > system preference > default dark
  const savedTheme = localStorage.getItem('khushbu_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('khushbu_theme', 'dark');
    updateThemeIcons(true);
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('khushbu_theme', 'light');
    updateThemeIcons(false);
  }
}

function updateThemeIcons(isDark) {
  const moonIcons = document.querySelectorAll('.theme-icon-moon');
  const sunIcons = document.querySelectorAll('.theme-icon-sun');

  moonIcons.forEach(icon => {
    if (isDark) {
      icon.classList.add('hidden');
    } else {
      icon.classList.remove('hidden');
    }
  });

  sunIcons.forEach(icon => {
    if (isDark) {
      icon.classList.remove('hidden');
    } else {
      icon.classList.add('hidden');
    }
  });
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
    } else {
      mobileMenu.classList.remove('hidden');
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   3. Navbar Scroll Shadow & Active Link Spy
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('main-nav');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-md', 'bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-md');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('shadow-md');
    }
  });
}

/* ==========================================================================
   4. Interactive Power BI KPI Dashboard Simulator
   ========================================================================== */
const DASHBOARD_DATA = {
  retail: {
    title: "Retail Sales & Inventory Intelligence",
    badge: "Retail / FMCG Distribution",
    kpis: [
      { label: "Total Revenue (YTD)", value: "$4.82M", delta: "+18.4% YoY", trend: "up", note: "Ahead of annual sales target" },
      { label: "Gross Margin %", value: "34.6%", delta: "+2.1% pts", trend: "up", note: "Optimized product category mix" },
      { label: "Stock Turn Ratio", value: "5.8x", delta: "-0.4 vs target", trend: "neutral", note: "Fast moving FMCG replenishment" },
      { label: "Critical Reorder SKU", value: "14 Items", delta: "-8 items", trend: "up", note: "Auto-flagged reorder threshold" }
    ],
    bars: [
      { label: "Electronics", val: 88, amount: "$1.42M" },
      { label: "Apparel", val: 72, amount: "$1.15M" },
      { label: "Home & Garden", val: 64, amount: "$980K" },
      { label: "Health & Beauty", val: 54, amount: "$760K" },
      { label: "Groceries", val: 42, amount: "$510K" }
    ],
    daxFormula: `Revenue YTD = \nCALCULATE(\n    [Total Sales Amount],\n    DATESYTD('Dim_Date'[Date])\n)`,
    logicExplanation: "Implements star-schema dimensional modeling with conformed calendar table and dynamic drill-through from regional aggregates to SKU-level transactions."
  },
  finance: {
    title: "Financial Performance & Budget Variance",
    badge: "Finance / Professional Services",
    kpis: [
      { label: "Total OpEx Actual", value: "$2.15M", delta: "-4.2% vs Budget", trend: "up", note: "Under budget variance" },
      { label: "EBITDA Margin", value: "28.3%", delta: "+3.5% pts", trend: "up", note: "Improved operational leverage" },
      { label: "AR DSO (Days Sales)", value: "38 Days", delta: "-6 Days", trend: "up", note: "Accelerated cash collection" },
      { label: "Variance Overspend", value: "$42.5K", delta: "3 Departments", trend: "neutral", note: "Controlled exception alerts" }
    ],
    bars: [
      { label: "IT & Software", val: 92, amount: "$640K" },
      { label: "Operations", val: 76, amount: "$510K" },
      { label: "Sales & Mktg", val: 68, amount: "$460K" },
      { label: "Admin & Legal", val: 48, amount: "$320K" },
      { label: "Facilities", val: 32, amount: "$220K" }
    ],
    daxFormula: `Budget Variance % = \nVAR _Var = [Actual Revenue] - [Budget Revenue]\nRETURN\nDIVIDE(_Var, [Budget Revenue], 0)`,
    logicExplanation: "Combines P&L reporting hierarchies with dynamic Row-Level Security (RLS), restricting sensitive department cost centers by regional finance controller roles."
  },
  workforce: {
    title: "Workforce & Attrition Intelligence",
    badge: "HR / People Operations",
    kpis: [
      { label: "Active Headcount", value: "1,248", delta: "+112 Net Hires", trend: "up", note: "Cross-functional staffing" },
      { label: "Annualized Attrition", value: "8.4%", delta: "-3.1% YoY", trend: "up", note: "Industry benchmark is 12.5%" },
      { label: "Avg Employee Tenure", value: "3.4 Yrs", delta: "+0.6 Yrs", trend: "up", note: "Enhanced retention programs" },
      { label: "Monthly Exit Count", value: "7 Exits", delta: "-3 vs Last Mo", trend: "up", note: "Early flight risk intervention" }
    ],
    bars: [
      { label: "Engineering", val: 95, amount: "410 Staff" },
      { label: "Customer Success", val: 78, amount: "320 Staff" },
      { label: "Product & Design", val: 56, amount: "210 Staff" },
      { label: "Sales & Growth", val: 48, amount: "180 Staff" },
      { label: "Corporate Services", val: 34, amount: "128 Staff" }
    ],
    daxFormula: `Attrition Rate % = \nDIVIDE(\n    [Total Exits],\n    ([Headcount Start] + [Headcount End]) / 2,\n    0\n)`,
    logicExplanation: "Features advanced Power Query M transformations reconciling disparate employee history logs, tenure banding, and automated monthly HR review packs."
  }
};

function initDashboardSimulator() {
  const tabs = document.querySelectorAll('.pbi-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active', 'border-amber-500', 'text-amber-500', 'bg-amber-500/10'));
      tab.classList.add('active', 'border-amber-500', 'text-amber-500', 'bg-amber-500/10');
      
      const category = tab.getAttribute('data-sim');
      renderDashboardSimulator(category);
    });
  });

  // Render initial tab
  renderDashboardSimulator('retail');
}

function renderDashboardSimulator(category) {
  const data = DASHBOARD_DATA[category] || DASHBOARD_DATA.retail;
  
  // Title & Badge
  const titleEl = document.getElementById('sim-title');
  const badgeEl = document.getElementById('sim-badge');
  const daxEl = document.getElementById('sim-dax');
  const logicEl = document.getElementById('sim-logic');

  if (titleEl) titleEl.textContent = data.title;
  if (badgeEl) badgeEl.textContent = data.badge;
  if (daxEl) daxEl.textContent = data.daxFormula;
  if (logicEl) logicEl.textContent = data.logicExplanation;

  // KPI Cards
  const kpiContainer = document.getElementById('sim-kpis');
  if (kpiContainer) {
    kpiContainer.innerHTML = data.kpis.map(kpi => `
      <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/60 transition-all hover:scale-[1.02]">
        <div class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${kpi.label}</div>
        <div class="flex items-baseline justify-between">
          <span class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">${kpi.value}</span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${
            kpi.trend === 'up' 
              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' 
              : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
          }">
            ${kpi.delta}
          </span>
        </div>
        <div class="mt-2 text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <svg class="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="truncate">${kpi.note}</span>
        </div>
      </div>
    `).join('');
  }

  // Bars Visual
  const barsContainer = document.getElementById('sim-bars');
  if (barsContainer) {
    barsContainer.innerHTML = data.bars.map(bar => `
      <div class="space-y-1.5">
        <div class="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300">
          <span>${bar.label}</span>
          <span class="font-semibold text-gray-900 dark:text-gray-100">${bar.amount}</span>
        </div>
        <div class="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div 
            class="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 transition-all duration-700 ease-out" 
            style="width: ${bar.val}%">
          </div>
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   5. Project Gallery Filters
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-500', 'text-gray-900', 'font-semibold');
        b.classList.add('bg-gray-100', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-400');
      });

      btn.classList.add('bg-amber-500', 'text-gray-900', 'font-semibold');
      btn.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-400');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Copy to Clipboard Utility
   ========================================================================== */
function initCopyButtons() {
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = "pardhikhushbu94@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast("Email copied: " + email);
      }).catch(() => {
        showToast("pardhikhushbu94@gmail.com");
      });
    });
  });
}

/* ==========================================================================
   7. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const msgInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : 'Inquiry from Portfolio';
    const message = msgInput ? msgInput.value.trim() : '';

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.");
      return;
    }

    // Launch mailto
    const mailtoUrl = `mailto:pardhikhushbu94@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailtoUrl;

    showToast("Opening email client to send message to Khushbu!");
    form.reset();
  });
}

/* ==========================================================================
   8. Global Notification Toast
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('portfolio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-gray-900 text-white dark:bg-amber-500 dark:text-gray-950 shadow-2xl font-medium text-sm flex items-center gap-2 transform transition-all duration-300 translate-y-20 opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg class="w-5 h-5 text-amber-400 dark:text-gray-950 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3500);
}
