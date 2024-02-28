/* -- Csak akkor fut le, ha a DOM betöltődött -- */
document.addEventListener('DOMContentLoaded', function () {
    // A függvényeket a DOM betöltődése után definiáljuk, hogy biztosan létezzenek a szükséges elemek
    function init() {

        const top3 = document.getElementById('top3');
        top3.addEventListener('load', getTop3());
    };
    async function getTop3() {
        const response = await fetch('data/top-rated-restauransts.json');
        const data = await response.json(); // response.json() returns a promise
        console.log(data);
        let html = ''; // create a variable to store the HTML
        for (let index = 0; index < data.length; index++) {
            html += getRestoranteCard(data[index]);

        }
        top3.innerHTML = html; //-- frissíti a DOM-ot, megjeleníti a kártyákat
        document.getElementById('top4').innerHTML = html;
    }
    function getRestoranteCard(restoranteData) {
        console.log(restoranteData.rating);
        let html = `<div class="card col-lg-3 col-md-6 col-sm-12 mx-4 top3card">
                             <img src="data\\${restoranteData.image}" class="card-img-top" alt="${restoranteData.name}">
                             <div class="card-body">
                                 <h5
                                     class="card-title d-flex justify-content-between"><span
                                         class="m-4">${restoranteData.name}</span><span
                                         class="m-4">${rate(restoranteData.rating)}</span></h5>
                                 <p class="card-text">${restoranteData.description}</p>
                                 <a href="#" class="btn btn-block btn-primary">View
                                     restaurant &#187; </a>
                             </div>
                         </div>`;
        console.log(html);
        return html;

    }
    function rate(rate) {
        let stars = "";
        for (let index = 0; index < rate; index++) {
            if (index < rate) {
                stars += `<img src="./images/star.png" alt"star">`;                               
            }                                        
        }
        if (rate < 5) {
            stars += `<img src="./images/star.png" alt"star" class="gray">`;
        } 
        
        return stars;
    }
    init();

}
);
