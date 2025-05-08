window.onload = async (event) => {
  const response = await fetch("http://localhost:3000/loadItem", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const itemsView = document.getElementsByName("items-view")[0];
  const jsonBody = await response.json();

  for await (const item of jsonBody) {
    const div = document.createElement("div");
    div.classList.add("cardItem");
    div.addEventListener("click", () => itemDetail(item._id));

    const h1 = document.createElement("h1");
    h1.innerHTML = item.productName;

    const h2 = document.createElement("h2");
    h2.innerHTML = `Category: ${item.category}`;

    const p1 = document.createElement("p");
    p1.innerHTML = `Quantity: ${item.quantity}`;

    const p2 = document.createElement("p");
    p2.innerHTML = `Stock Date: ${item.stockDate}`;

    const p3 = document.createElement("p");
    p3.innerHTML = `Price: $${item.price}`;

    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);

    itemsView.appendChild(div);
  }
};

document.getElementById("item-description").onsubmit = async (e) => {
  let data = new FormData(document.getElementById("item-description"));
  var jsonData = {};
  data.forEach((value, key) => (jsonData[key] = value));
  const response = await fetch("http://localhost:3000/createItem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsonData),
  });
};

async function itemDetail(orderObject) {
  const response = await fetch(
    `http://localhost:3000/itemDetail/${orderObject}`,
    {
      method: "GET",
    },
  );

  if (response) {
    window.location = `http://localhost:3000/itemDetail/${orderObject}`;
  }
}
