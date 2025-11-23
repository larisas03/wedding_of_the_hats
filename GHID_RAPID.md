# 🚀 GHID RAPID - Start în 5 minute!

## Varianta ULTRA-SIMPLĂ (Fără Firebase)

### ✅ Ce trebuie să faci:

1. **Deschide fișierul `index.html` în browser**
   - Click dreapta pe `index.html` → "Open with" → Browser
   - SAU dublu-click pe `index.html`

2. **Gata! Site-ul funcționează!** 🎉
   - Invitații pot confirma prezența
   - Datele se salvează în browser-ul tău local

### ⚠️ Limitări:
- Datele sunt doar pe computerul tău
- Nu se actualizează automat pe alte dispozitive
- OK pentru testare sau evenimente mici

---

## Varianta COMPLETĂ (Cu Firebase - 10 minute)

### Pasul 1: Firebase Setup (5 min)

1. **Creează cont Firebase**
   ```
   👉 Mergi pe: https://console.firebase.google.com/
   👉 Click "Add project"
   👉 Nume: "nunta-larisa-razvan"
   👉 Disable Google Analytics (sau lasă enabled)
   👉 Click "Create project"
   ```

2. **Activează Firestore**
   ```
   👉 În meniul lateral: Firestore Database
   👉 Click "Create database"
   👉 Alege "Start in test mode"
   👉 Locație: europe-west3 (Frankfurt)
   👉 Click "Enable"
   ```

3. **Obține configurația**
   ```
   👉 Click pe iconița ⚙️ (Settings) → Project settings
   👉 Scroll jos la "Your apps"
   👉 Click pe iconița </> (Web)
   👉 App nickname: "Wedding Site"
   👉 NU bifa "Also set up Firebase Hosting"
   👉 Click "Register app"
   👉 COPIAZĂ configurația firebaseConfig
   ```

### Pasul 2: Configurează site-ul (2 min)

1. **Deschide `script.js`**
2. **Caută linia 7** și înlocuiește:

```javascript
// ÎNAINTE (liniile 7-14):
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    // ... etc
};

// DUPĂ (cu datele tale):
const firebaseConfig = {
    apiKey: "AIzaSyAbc123...",  // ← COPIAZĂ din Firebase
    authDomain: "nunta-larisa-razvan.firebaseapp.com",
    projectId: "nunta-larisa-razvan",
    storageBucket: "nunta-larisa-razvan.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

3. **Salvează fișierul**

### Pasul 3: Pornește site-ul (3 min)

**Opțiune A - Firebase Hosting (Recomandat):**

```bash
# În Terminal/Command Prompt:
cd /Users/larisas/Documents/cursor/candy/wedding-site

# Instalează Firebase CLI (prima dată)
npm install -g firebase-tools

# Login
firebase login

# Inițializează
firebase init hosting
# → Use an existing project
# → Alege "nunta-larisa-razvan"
# → Public directory: . (tastează punct)
# → Configure as single-page app: y
# → Overwrite index.html: N

# Deploy
firebase deploy

# 🎉 Gata! Link-ul tău: https://nunta-larisa-razvan.web.app
```

**Opțiune B - Local (pentru testare):**

```bash
# În folderul wedding-site:
python3 -m http.server 8000

# Deschide în browser:
http://localhost:8000
```

---

## 📧 Cum să trimiți invitațiile?

Odată ce site-ul e live, trimite mesaj invitaților:

```
💌 Mesaj pentru WhatsApp/Email:

Dragă [Nume],

Larisa și Răzvan te invită la nuntă pe 5 Iunie 2025! 💕

📍 Locație: Domeniul cu Cireși, București
⏰ Ora: 17:00

Te rugăm să confirmi prezența aici:
👉 https://nunta-larisa-razvan.web.app

Vă așteptăm cu drag!
```

---

## 👀 Cum vezi cine a confirmat?

1. **Deschide același link în browser:** https://nunta-larisa-razvan.web.app
2. **Scroll jos** până la secțiunea "Listă Invitați"
3. **Vezi în timp real:**
   - Cine a confirmat
   - Cine a refuzat
   - Câte persoane vin
   - Mesajele lor

4. **Exportă în Excel:**
   - Click pe butonul "📊 Exportă Excel"
   - Salvează fișierul CSV
   - Deschide în Excel/Google Sheets

---

## 🎨 Personalizare Rapidă

### Schimbă numele:
Fișier: `index.html`, linia 14
```html
<h1 class="couple-names">Larisa & Răzvan</h1>
```

### Schimbă data:
Fișier: `index.html`, linia 15
```html
<div class="wedding-date">5 Iunie 2025</div>
```

### Schimbă locația:
Fișier: `index.html`, linia 38-40
```html
<p><strong>Domeniul cu Cireși</strong></p>
<p>București</p>
<a href="https://maps.google.com/?q=Domeniul+cu+Ciresi" ...>
```

### Schimbă culorile:
Fișier: `styles.css`, liniile 10-13
```css
--primary-color: #d4a373;    /* Schimbă cu orice culoare dorești */
--secondary-color: #8b5a3c;
```

---

## ✅ Checklist Final

- [ ] Am creat proiectul Firebase
- [ ] Am activat Firestore Database
- [ ] Am copiat configurația în script.js
- [ ] Am testat site-ul local
- [ ] Am făcut deploy pe Firebase Hosting
- [ ] Am trimis link-ul către 1-2 prieteni pentru test
- [ ] Funcționează confirmarea prezență
- [ ] Văd lista de invitați când apeși submit
- [ ] Am personalizat datele (nume, dată, locație)
- [ ] Am trimis link-ul către toți invitații

---

## 🆘 Probleme Frecvente

**❌ "Firebase not configured"**
→ Verifică că ai copiat configurația corect în `script.js`

**❌ Nu văd lista de invitați**
→ Trebuie să ai cel puțin o confirmare. Testează cu datele tale!

**❌ "Permission denied" în Firebase**
→ Verifică că Firestore Database e în "test mode"

**❌ Site-ul nu se încarcă**
→ Asigură-te că rulezi un server local sau ai făcut deploy pe Firebase

---

## 📱 Testare Înainte de Lansare

1. ✅ Completează formularul tu
2. ✅ Verifică că apare în lista de invitați
3. ✅ Testează pe telefon
4. ✅ Testează butonul "Vezi pe Hartă"
5. ✅ Exportă Excel și verifică datele
6. ✅ Cere unui prieten să testeze

---

**Mult succes și casă de piatră! 💒✨**

