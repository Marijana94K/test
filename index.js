// Slike

var APIKey = '11f2ff5a50fcce4df43aa4c897d132d3f5ad4a84ed0aec7be67718deb5120192';

$.getJSON('https://api.unsplash.com/search/photos?query=chicago&per_page=50&client_id=11f2ff5a50fcce4df43aa4c897d132d3f5ad4a84ed0aec7be67718deb5120192', function (data) {

    var imageList = data.results;
    $.each(imageList, function (i, val) {

        var image = val;
        var imageURL = val.urls.regular;
        var imageWidth = val.width;
        var imageHeight = val.height;

        if (imageWidth > imageHeight) {
            $('.carousel').append(`<div class="image-container"><a href="${imageURL}" data-lightbox="Optional caption attribute" ><img style="width: 100%; height: 100%;" src="${imageURL}"></a></div>`);
        }
    });
});


//Tabele

async function loadIntoTable(url, table) {

    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await fetch(url);
    const {headers, rows} = await response.json();


    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";


    //Popunjavanje kolona

    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement);
    }

//Popunjavanje redova

    for (const row of rows) {
        const rowElement = document.createElement("tr");

        for (const cellText of row) {
            const cellElement = document.createElement("td");

            cellElement.textContent = cellText;
            rowElement.appendChild(cellElement);
        }
        tableBody.appendChild(rowElement);
    }
}

loadIntoTable("./data.json", document.querySelector("table"));


// Vrijeme i datum

window.addEventListener("DOMContentLoaded", () => {
    const clock = new BouncyEmbossedClock(".clock");
});

class BouncyEmbossedClock {

    constructor(el) {
        this.el = document.querySelector(el);
        this.els = this.el ? this.el.querySelectorAll(".clock__digit") : [];
        this.digits = [];
        this.to = null;
        this.dto = [
            [null, null, null],
            [null, null, null],
            [null, null],
            [null, null, null],
            [null, null, null],
            [null, null],
            [null, null, null],
            [null, null, null],
        ];
        this.staticUpdate();
        this.update();
    }

    getTime() {

        const time = new Date();
        const hms = [
            time.getHours(),
            time.getMinutes(),
        ];

        return hms.map(u => u < 10 ? `0${u}` : `${u}`).join(":").split("");

    }

    staticUpdate() {
        if (this.els) {
            this.digits = this.getTime();
            this.digits.forEach((d, i) => {
                this.els[i].textContent = d;
            });
        }
    }

    update() {

        if (this.els) {
            // get the time
            const display = this.getTime();
            const bounce = "clock__digit--bounce";
            const baseDelay = 350;
            const delayDec = 50;
            // display the digits

            display.forEach((d, i) => {
                if (+d > +this.digits[i] || +d === 0 && +this.digits[i] !== 0) {
                    const colonElCL = display[i + 1] === ":" ? this.els[i + 1].classList : null;
                    const el = this.els[i];
                    const timeout = baseDelay - delayDec * i;
                    this.dto[i].forEach(t => {
                        clearTimeout(t);

                    });

                    // run the animation

                    this.dto[i][0] = setTimeout(() => {
                        el.classList.add(bounce);
                    }, timeout);

                    // show the next digit

                    this.dto[i][1] = setTimeout(() => {
                        el.textContent = d;
                    }, timeout + 167);

                    // kill the animation

                    this.dto[i][2] = setTimeout(() => {
                        el.classList.remove(bounce);
                    }, timeout + 500);

                    // colon animation (if applicable)

                    if (colonElCL) {
                        this.dto[i + 1].forEach(t => {
                            clearTimeout(t);
                        });

                        this.dto[i + 1][0] = setTimeout(() => {
                            colonElCL.add(bounce);
                        }, timeout - delayDec);

                        this.dto[i + 1][1] = setTimeout(() => {
                            colonElCL.remove(bounce);
                        }, (timeout - delayDec) + 500);
                    }
                }
                this.digits[i] = d;
            });

            // loop
            clearTimeout(this.to);
            this.to = setTimeout(this.update.bind(this), 1e3);
        }
    }
}

/* date */

var dateInfo = new Date();

var dow = [

        "Sunday",

        "Monday",

        "Tuesday",

        "Wednesday",

        "Thursday",

        "Friday",

        "Saturday"

    ],

    month = [

        "January",

        "February",

        "March",

        "April",

        "May",

        "June",

        "July",

        "August",

        "September",

        "October",

        "November",

        "December"

    ],

    day = dateInfo.getDate();


// store date

var currentDate = dow[dateInfo.getDay()] + ", " + month[dateInfo.getMonth()] + " " + day;


document.getElementsByClassName("date")[0].innerHTML = currentDate;

