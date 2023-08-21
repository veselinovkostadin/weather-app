// Weather
const API_KEY = "";


document.querySelector("#weatherBanner form").addEventListener("submit", function (e) {
    e.preventDefault();

    let city = document.querySelector("#city").value;
    if (city) {
        fetch(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
            method: "GET",
            contentType: "application/json",
            headers: {
                'X-Api-Key': API_KEY
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                document.querySelector("#temp span").innerText = data.temp;
                document.querySelector("#min_temp span").innerText = data.min_temp;
                document.querySelector("#max_temp span").innerText = data.max_temp;
                document.querySelector("#feels_like span").innerText = data.feels_like;
                document.querySelector("#humidity span").innerText = data.humidity;
            })
            .catch((error) => {
                alert("Sorry but we can't find info about the city " + city);
            })
    }
})


// Pictures Carousel
let pic1 = document.getElementById("picture1")
let pic2 = document.getElementById("picture2")
let nextBtn = document.querySelector("#nextBtn")
let prevBtn = document.querySelector("#prevBtn")
prevBtn.setAttribute("disabled", "disabled")

let loadedImages = 1


function getPictures(loadedImages) {
    fetch(`https://picsum.photos/v2/list?page=${loadedImages}&limit=2`)
        .then((response) => response.json())
        .then((data) => {
            pic1.setAttribute("src", data[0].download_url)
            pic1.nextElementSibling.innerText = data[0].author
            pic2.setAttribute("src", data[1].download_url)
            pic2.nextElementSibling.innerText = data[1].author
        })
}

getPictures(1);

nextBtn.addEventListener("click", function () {
    prevBtn.removeAttribute("disabled")

    loadedImages++;
    getPictures(loadedImages);
});

prevBtn.addEventListener("click", function () {
    loadedImages--;
    if (loadedImages == 1) {
        prevBtn.setAttribute("disabled", "disabled")
    }
    getPictures(loadedImages);

});

// Tickets
let total_price = 0;
document.getElementById("destination_form").addEventListener("submit", (e) => {
    e.preventDefault();

    let city = document.querySelector("#destination").value;
    let one_way = document.getElementById("one_way");
    let return_ticket = document.getElementById("return_ticket");
    let no_tickets = document.querySelector("#no_tickets").value;
    let errors = [];
    let price = 0;

    if (city != "istanbul" || city != "vienna" || city != "rome") {
        city == "istanbul" ? price = 100 :
            city == "vienna" ? price = 80 :
                city == "rome" ? price = 150 : errors.push("Please select correct city!");
    }

    if (return_ticket.checked) {
        price = price * 2;
    } else if (!one_way.checked) {
        errors.push("Please select ticket type!");
    }

    if (!no_tickets) {
        errors.push("Please enter tickets amount!")
    }

    price = price * no_tickets;
    total_price += price;

    // remove last errors if any
    let errorsUl = document.getElementById("errorsUl");
    removePreviosErrors(errorsUl);
    // displaying the errors
    if (errors.length > 0) {
        let ul = document.createElement("ul");
        ul.setAttribute("id", "errorsUl");
        ul.style.color = "red";
        errors.forEach((el) => {
            ul.innerHTML += `<li><b>${el}</b></li>`;
        })
        document.getElementById("destination_form").appendChild(ul);
    } else {
        showTicket(city, no_tickets, price, total_price);
    }


})

function removePreviosErrors(element) {
    if (element) {
        element.remove();
    }
}

function showTicket(city, no_tickets, price, total) {
    document.getElementById("total_paid").innerHTML = `You have paid total <span>${total}</span>$.`;
    let ticket_div = document.createElement("div");
    ticket_div.classList.add("col-12", "border", "mt-2", "p-3");
    ticket_div.innerHTML = `<h3>Congratulatons</h3>
                            <p class="text-muted">You just bought ${no_tickets} for ${city}</p>
                            <p><b>Total Paid: ${price}$</b></p>`
    document.querySelector("#tickets_div").append(ticket_div);
}