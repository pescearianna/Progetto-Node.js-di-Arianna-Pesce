


document.addEventListener("DOMContentLoaded", () => {
  
  //SCRIPT PER CATTURARE IL CLICK NEL BOOTONE ELIMINA E PASSARLO AL APP.DELETE
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = button.dataset.id
      const resource = button.dataset.resource 
      
      const res = await fetch(`/api/${resource}/${id}`, { method: 'DELETE' })
      const data = await res.json()
      console.log(data.message)

      if (res.ok) {
        button.closest(`.${button.dataset.target}`).remove()
      }
    })
  })
  //SCRIPT PER CATTURARE IL CLICK NEL BOOTONE MODIFICA E PASSARLO AL APP.PUT - PACKS

  document.querySelectorAll('.pack').forEach(pack => {
    const modifyBtn = pack.querySelector('.modify-btn');
    const saveBtn = pack.querySelector('.save-btn');
    const inputs = pack.querySelectorAll('input');

    modifyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      inputs.forEach(input => input.disabled = false);
      modifyBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
    });

    saveBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = pack.dataset.id;
      const name = pack.querySelector(".pack-name").value;
      const destination = pack.querySelector(".pack-destination").value;
      
      const price = pack.querySelector(".pack-price").value;

console.log("Pack ID:", id);
console.log("Pack element:", pack);

      const response = await fetch(`/api/packs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, destination, price })
      });

      if (response.ok) {
        alert("Pacchetto aggiornato con successo!");
        inputs.forEach(input => input.disabled = true);
        modifyBtn.style.display = "inline-block";
        saveBtn.style.display = "none";
      } else {
        alert("Errore durante l'aggiornamento");
      }
    });
  });


  //SCRIPT PER CATTURARE IL CLICK NEL BOOTONE MODIFICA E PASSARLO AL APP.PUT - users

  document.querySelectorAll('.user').forEach(user => {
    const modifyBtn = user.querySelector('.modify-btn');
    const saveBtn = user.querySelector('.save-btn');
    const inputs = user.querySelectorAll('input');

    modifyBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      inputs.forEach(input => input.disabled = false);
      modifyBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
    });

    saveBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = user.dataset.id;
      const name = user.querySelector(".user-name").value;
      const firstName = user.querySelector(".user-firstname").value;
      const email = user.querySelector(".user-email").value;
      

      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, firstName, email })
      });

      if (response.ok) {
        alert("Pacchetto aggiornato con successo!");
        inputs.forEach(input => input.disabled = true);
        modifyBtn.style.display = "inline-block";
        saveBtn.style.display = "none";
      } else {
        alert("Errore durante l'aggiornamento");
      }
    });
  });
});

  //SCRIPT PER CATTURARE IL CLICK NEL BOOTONE MODIFICA E PASSARLO AL APP.PUT - orders
   
  
      document.addEventListener('DOMContentLoaded', function() {
    // La tua riga di codice che stava dando problemi
    const modifica = document.getElementById("mod-order");
    const saveOrder = document.getElementById("save-order");
    const inputsOrder = document.querySelectorAll("select");

    modifica.addEventListener("click", function() {
      inputsOrder.forEach(input => input.disabled = false);
      modifica.style.display = "none";
        saveOrder.style.display = "inline-block";
    });

        
    saveOrder.addEventListener("click", async () => {

      const id = modifica.dataset.id
        const byUser = document.querySelector(".user-selected").value;
        const listPackId = document.querySelectorAll(".pack-selected");
        const listQuantity = document.querySelectorAll(".order-quantity");

        const packsData=[];

        
        listPackId.forEach((pack,index) => {
          const quantityElement = listQuantity[index];
         
          const itemId = pack.closest('li').dataset.intId;
          
          packsData.push({unicum: itemId, packId: pack.value, quantity: quantityElement.value});});
        //prendo il primo valore selezionato
        
        
        


      const response = await fetch(`/api/orders/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({byUser: byUser, packs: packsData})
        });
        if (response.ok) {
          alert("Ordine aggiornato con successo!");
          inputsOrder.forEach(input => input.disabled = true);
          modifica.style.display = "inline-block";
          saveOrder.style.display = "none";
        } else {
          alert("Errore durante l'aggiornamento");
        }


});
});
     
   