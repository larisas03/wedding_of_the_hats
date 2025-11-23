// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase config - TREBUIE ÎNLOCUIT CU CONFIGURAȚIA TA
// Instrucțiuni în README.md
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let app, db;
let isFirebaseConfigured = false;

try {
    if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        isFirebaseConfigured = true;
        console.log('✅ Firebase connected successfully!');
        
        // Load guests in real-time
        loadGuests();
    } else {
        console.warn('⚠️ Firebase not configured. Using localStorage fallback.');
        loadGuestsFromLocalStorage();
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
    loadGuestsFromLocalStorage();
}

// Form submission
const form = document.getElementById('rsvpForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        guests: parseInt(document.getElementById('guests').value),
        attending: document.querySelector('input[name="attending"]:checked').value,
        message: document.getElementById('message').value.trim(),
        timestamp: new Date().toISOString()
    };
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Se trimite...';
    
    try {
        if (isFirebaseConfigured) {
            // Save to Firebase
            await addDoc(collection(db, 'guests'), formData);
            showMessage('success', '✓ Mulțumim! Confirmarea ta a fost înregistrată cu succes!');
        } else {
            // Fallback to localStorage
            saveToLocalStorage(formData);
            showMessage('success', '✓ Mulțumim! Confirmarea ta a fost înregistrată!');
        }
        
        // Reset form
        form.reset();
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    } catch (error) {
        console.error('Error saving RSVP:', error);
        showMessage('error', '✗ A apărut o eroare. Te rugăm să încerci din nou.');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Trimite Confirmarea';
    }
});

// Show form message
function showMessage(type, text) {
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = text;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Load guests from Firestore
function loadGuests() {
    const q = query(collection(db, 'guests'), orderBy('timestamp', 'desc'));
    
    onSnapshot(q, (snapshot) => {
        const guests = [];
        snapshot.forEach((doc) => {
            guests.push({ id: doc.id, ...doc.data() });
        });
        
        displayGuests(guests);
        updateStats(guests);
        
        // Show admin section if there are guests
        if (guests.length > 0) {
            document.getElementById('adminSection').classList.add('show');
        }
    });
}

// LocalStorage fallback functions
function saveToLocalStorage(guestData) {
    let guests = JSON.parse(localStorage.getItem('weddingGuests') || '[]');
    guests.push({ id: Date.now().toString(), ...guestData });
    localStorage.setItem('weddingGuests', JSON.stringify(guests));
    loadGuestsFromLocalStorage();
}

function loadGuestsFromLocalStorage() {
    const guests = JSON.parse(localStorage.getItem('weddingGuests') || '[]');
    displayGuests(guests);
    updateStats(guests);
    
    if (guests.length > 0) {
        document.getElementById('adminSection').classList.add('show');
    }
}

// Display guests in admin panel
function displayGuests(guests) {
    const guestList = document.getElementById('guestList');
    
    if (guests.length === 0) {
        guestList.innerHTML = '<p style="padding: 2rem; text-align: center; color: #999;">Nicio confirmare încă...</p>';
        return;
    }
    
    guestList.innerHTML = guests.map(guest => `
        <div class="guest-item attending-${guest.attending}">
            <div>
                <div class="guest-name">${guest.name}</div>
                <div style="font-size: 0.85rem; color: #999;">
                    ${guest.email ? `📧 ${guest.email}` : ''} 
                    ${guest.phone ? `📱 ${guest.phone}` : ''}
                </div>
            </div>
            <div style="text-align: center;">
                <strong>${guest.guests || 1}</strong> 
                <span style="font-size: 0.85rem; color: #999;">pers.</span>
            </div>
            <div>
                <span class="guest-status status-${guest.attending}">
                    ${guest.attending === 'yes' ? '✓ Participă' : '✗ Nu participă'}
                </span>
            </div>
            <div style="font-size: 0.85rem; color: #999;">
                ${new Date(guest.timestamp).toLocaleDateString('ro-RO', { 
                    day: 'numeric', 
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </div>
            <div style="font-size: 0.9rem; color: #666; font-style: italic;">
                ${guest.message ? `"${guest.message}"` : '-'}
            </div>
        </div>
    `).join('');
}

// Update statistics
function updateStats(guests) {
    const confirmed = guests.filter(g => g.attending === 'yes');
    const declined = guests.filter(g => g.attending === 'no');
    const totalGuests = confirmed.reduce((sum, g) => sum + (g.guests || 1), 0);
    
    document.getElementById('totalConfirmed').textContent = confirmed.length;
    document.getElementById('totalDeclined').textContent = declined.length;
    document.getElementById('totalGuests').textContent = totalGuests;
}

// Search functionality
document.getElementById('searchInput')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const guestItems = document.querySelectorAll('.guest-item');
    
    guestItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'grid' : 'none';
    });
});

// Export to Excel function
window.exportToExcel = function() {
    let guests;
    
    if (isFirebaseConfigured) {
        // Get from displayed list
        const guestItems = document.querySelectorAll('.guest-item');
        if (guestItems.length === 0) {
            alert('Nu există date de exportat!');
            return;
        }
    } else {
        guests = JSON.parse(localStorage.getItem('weddingGuests') || '[]');
    }
    
    // Create CSV content
    const headers = ['Nume', 'Email', 'Telefon', 'Nr. Persoane', 'Participă', 'Mesaj', 'Data'];
    const data = guests || Array.from(document.querySelectorAll('.guest-item')).map(item => {
        return {
            name: item.querySelector('.guest-name').textContent,
            email: '',
            phone: '',
            guests: '',
            attending: item.querySelector('.guest-status').textContent.includes('Participă') ? 'Da' : 'Nu',
            message: '',
            timestamp: ''
        };
    });
    
    const csvContent = [
        headers.join(','),
        ...data.map(row => [
            `"${row.name || ''}"`,
            `"${row.email || ''}"`,
            `"${row.phone || ''}"`,
            row.guests || 1,
            row.attending === 'yes' ? 'Da' : 'Nu',
            `"${row.message || ''}"`,
            new Date(row.timestamp).toLocaleDateString('ro-RO')
        ].join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `invitati_nunta_larisa_razvan_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
};

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add scroll animation on scroll indicator
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    document.querySelector('.details').scrollIntoView({ behavior: 'smooth' });
});

