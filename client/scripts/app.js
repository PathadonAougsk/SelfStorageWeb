window.onload = async (event) => {
  const response = await fetch("http://localhost:3000/loadItem", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const itemsView = document.getElementsByName("mainContent")[0];
  const jsonBody = await response.json();

  // the most ugly thing I ever saw
  for await (const item of jsonBody) {
    const div = document.createElement("div");
    div.classList.add("container");

    const pId = document.createElement("p");
    pId.innerHTML = item._id;

    const pProduct = document.createElement("p");
    pProduct.innerHTML = item.productName;

    const pQuantity = document.createElement("p");
    pQuantity.innerHTML = `Quantity: ${item.quantity}`;

    const pCategory = document.createElement("p");
    pCategory.innerHTML = `Category: ${item.category}`;

    const pDate = document.createElement("p");
    pDate.innerHTML = `Stock Date: ${item.stockDate}`;

    const pPrice = document.createElement("p");
    pPrice.innerHTML = `Price: $${item.price}`;

    div.appendChild(pId);
    div.appendChild(pProduct);
    div.appendChild(pQuantity);
    div.appendChild(pCategory);
    div.appendChild(pDate);
    div.appendChild(pPrice);

    itemsView.appendChild(div);
  }
};

document.getElementById("item-description").onsubmit = async (e) => {
  e.preventDefault();
  let data = new FormData(e.target);
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
