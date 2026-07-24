// ==============================
// BONUS MANAGER
// Parte 1
// ==============================

const utenti = [];

const bonusRegistrati = [];

const piattaforma = document.getElementById("piattaforma");
const utente = document.getElementById("utente");

const username = document.getElementById("username");
const piattaformaUser = document.getElementById("piattaformaUser");

const salvaUser = document.getElementById("salvaUser");
const salvaBonus = document.getElementById("salvaBonus");

const tipoBonus = document.getElementById("tipoBonus");
const importo = document.getElementById("importo");
const note = document.getElementById("note");

const storico = document.getElementById("storico");

const bonusOggi = document.getElementById("bonusOggi");
const bonusMese = document.getElementById("bonusMese");
const totUtenti = document.getElementById("totUtenti");

//==============================
// AGGIUNGI USER
//==============================

salvaUser.addEventListener("click", () => {

    const nome = username.value.trim();

    if (nome === "") {
        alert("Inserisci uno username");
        return;
    }

    utenti.push({
        username: nome,
        piattaforma: piattaformaUser.value
    });

    username.value = "";

    aggiornaListaUtenti();

    aggiornaStatistiche();

});

//==============================
// LISTA USER
//==============================

function aggiornaListaUtenti() {

    utente.innerHTML = "";

    const lista = utenti.filter(
        u => u.piattaforma === piattaforma.value
    );

    lista.forEach(u => {

        const option = document.createElement("option");

        option.value = u.username;
        option.textContent = u.username;

        utente.appendChild(option);

    });

}

piattaforma.addEventListener("change", aggiornaListaUtenti);

//==============================
// REGISTRA BONUS
//==============================

salvaBonus.addEventListener("click", () => {

    if (utente.value === "") {

        alert("Seleziona un utente");

        return;

    }

    const record = {

        ora: new Date().toLocaleTimeString(),

        piattaforma: piattaforma.value,

        user: utente.value,

        tipo: tipoBonus.value,

        importo: Number(importo.value),

        note: note.value

    };

    bonusRegistrati.push(record);

    aggiungiRiga(record);

    aggiornaStatistiche();

    note.value = "";

});

//==============================
// AGGIUNGE RIGA
//==============================

function aggiungiRiga(record){

    const tr=document.createElement("tr");

    tr.innerHTML=`

<td>${record.ora}</td>

<td>${record.piattaforma}</td>

<td>${record.user}</td>

<td>${record.tipo}</td>

<td>${record.importo} €</td>

<td>

<button onclick="eliminaBonus(this)">

🗑

</button>

</td>

`;

    storico.appendChild(tr);

}

//==============================
// ELIMINA BONUS
//==============================

function eliminaBonus(btn){

    const riga=btn.parentElement.parentElement;

    const indice=riga.rowIndex-1;

    bonusRegistrati.splice(indice,1);

    riga.remove();

    aggiornaStatistiche();

}

//==============================
// STATISTICHE
//==============================

function aggiornaStatistiche(){

    let totale=0;

    bonusRegistrati.forEach(b=>{

        totale+=b.importo;

    });

    bonusOggi.textContent=totale+" €";

    bonusMese.textContent=totale+" €";

    totUtenti.textContent=utenti.length;

}
