# 💒 Site Nuntă - Larisa & Răzvan

Site elegant de nuntă cu sistem de confirmare prezență și panou admin în timp real.

## ✨ Caracteristici

- ✅ Design modern și romantic
- ✅ Formular de confirmare prezență (RSVP)
- ✅ Link către locație (Google Maps)
- ✅ Panou admin cu listă invitați în timp real
- ✅ Statistici automate (confirmări, refuzuri, total persoane)
- ✅ Export listă invitați în Excel/CSV
- ✅ Responsive (funcționează pe telefon, tabletă, desktop)
- ✅ Salvare date în Firebase (sau localStorage ca backup)

## 🚀 Cum să folosești site-ul

### Opțiunea 1: Fără Firebase (Simplu - doar local)

1. Deschide fișierul `index.html` direct în browser
2. Site-ul va funcționa cu localStorage (datele se salvează doar în browser-ul tău)
3. Pentru a vedea lista de invitați, deschide aceeași pagină pe același computer

**Avantaje:** Foarte simplu, fără configurare
**Dezavantaje:** Datele sunt doar pe computerul tău, nu se actualizează automat

### Opțiunea 2: Cu Firebase (Recomandat - Cloud)

#### Pasul 1: Creează un cont Firebase

1. Mergi pe [Firebase Console](https://console.firebase.google.com/)
2. Click pe "Add project" / "Adaugă proiect"
3. Nume proiect: "nunta-larisa-razvan" (sau orice nume dorești)
4. Urmează pașii și creează proiectul

#### Pasul 2: Configurează Firestore Database

1. În Firebase Console, mergi la **Firestore Database**
2. Click pe **"Create database"**
3. Alege **"Start in test mode"** (pentru dezvoltare)
4. Selectează locația: **europe-west** (Europa)
5. Click **"Enable"**

#### Pasul 3: Obține configurația Firebase

1. În Firebase Console, mergi la **Project Settings** (iconița ⚙️)
2. Scroll jos la **"Your apps"**
3. Click pe iconița **</>** (Web)
4. Înregistrează aplicația: nume "Wedding Site"
5. Copiază configurația care arată așa:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "nunta-larisa-razvan.firebaseapp.com",
  projectId: "nunta-larisa-razvan",
  storageBucket: "nunta-larisa-razvan.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

#### Pasul 4: Actualizează fișierul script.js

1. Deschide `script.js`
2. La linia 7-14, **înlocuiește** configurația cu cea de la tine:

```javascript
const firebaseConfig = {
    apiKey: "COPIAZĂ-DIN-FIREBASE",
    authDomain: "COPIAZĂ-DIN-FIREBASE",
    projectId: "COPIAZĂ-DIN-FIREBASE",
    storageBucket: "COPIAZĂ-DIN-FIREBASE",
    messagingSenderId: "COPIAZĂ-DIN-FIREBASE",
    appId: "COPIAZĂ-DIN-FIREBASE"
};
```

3. Salvează fișierul

#### Pasul 5: Rulează site-ul

**Opțiune A - Hosting gratuit cu Firebase:**

```bash
# Instalează Firebase CLI
npm install -g firebase-tools

# Loginează-te
firebase login

# Inițializează proiectul
firebase init hosting

# Alege:
# - Use existing project: nunta-larisa-razvan
# - Public directory: . (punct)
# - Single-page app: Yes
# - Overwrite index.html: No

# Deploy
firebase deploy
```

Site-ul tău va fi live la: `https://nunta-larisa-razvan.web.app`

**Opțiune B - Local cu server simplu:**

```bash
# Dacă ai Python instalat:
python3 -m http.server 8000

# SAU cu Node.js:
npx http-server

# SAU cu VS Code Live Server
# Click dreapta pe index.html -> "Open with Live Server"
```

Apoi deschide: `http://localhost:8000`

## 📊 Cum să vezi lista de invitați

1. După ce primești confirmări, scroll jos pe pagină
2. Secțiunea **"Listă Invitați"** va apărea automat
3. Vei vedea:
   - Număr de confirmări
   - Număr de refuzuri
   - Total persoane
   - Lista completă cu detalii
4. Poți căuta după nume
5. Poți exporta lista în Excel

## 🎨 Personalizare

### Schimbă culorile:

În `styles.css`, la începutul fișierului (linia 10-17):

```css
:root {
    --primary-color: #d4a373;      /* Culoare principală */
    --secondary-color: #8b5a3c;    /* Culoare secundară */
    --accent-color: #f4e4d7;       /* Culoare accent */
}
```

### Schimbă data, locația:

În `index.html`, caută și modifică:
- Linia 15: `<div class="wedding-date">5 Iunie 2025</div>`
- Linia 28: `<p>Joi, 5 Iunie 2025</p>`
- Linia 38: `<p><strong>Domeniul cu Cireși</strong></p>`

### Schimbă link-ul Google Maps:

În `index.html`, linia 40:
```html
<a href="https://www.google.com/maps/search/Domeniul+cu+Ciresi+Bucuresti" 
```

Înlocuiește cu link-ul exact al locației tale.

## 🔒 Securitate Firebase

**IMPORTANT:** După ce testezi site-ul, actualizează regulile Firestore:

1. Mergi în Firebase Console → Firestore Database → Rules
2. Înlocuiește cu:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guests/{document=**} {
      allow read: if true;
      allow write: if true; // Eventual poți restricționa
    }
  }
}
```

Pentru producție, poți restricționa write-ul dacă vrei.

## 📱 Partajare site

După deploy:
1. Trimite link-ul către invitați: `https://nunta-larisa-razvan.web.app`
2. Ei pot confirma prezența direct din browser
3. Tu vei vedea actualizările în timp real!

## 🆘 Troubleshooting

**Problema:** Site-ul nu salvează datele
- **Soluție:** Verifică dacă ai configurat corect Firebase în `script.js`

**Problema:** Nu văd lista de invitați
- **Soluție:** Lista apare automat după prima confirmare

**Problema:** Export Excel nu funcționează
- **Soluție:** Asigură-te că ai cel puțin o confirmare în listă

**Problema:** Firebase error
- **Soluție:** Verifică că Firestore Database este activat în modul "test"

## 📞 Contact

Pentru ajutor sau întrebări despre personalizare, verifică documentația Firebase:
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

**Multe bucurii la nuntă! 💕🎊**

Made with ❤️ for Larisa & Răzvan

