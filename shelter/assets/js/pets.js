import pets from "./petslist.js";

//open mobmenu
burger.addEventListener("click", () => {
    header.classList.toggle("menuShown");
    document.body.classList.toggle("noscroll");
})

//mobmenu item click
document.querySelectorAll(".topmenu__item").forEach((el) => {
    el.addEventListener("click", (event) =>{
        if (event.currentTarget.classList.contains("topmenu__item_active")) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        header.classList.remove("menuShown");
        document.body.classList.remove("noscroll");
    });
})

//close mobmenu
mobileMenuShadow.addEventListener("click", () =>{
    header.classList.remove("menuShown");
    document.body.classList.remove("noscroll");
});

//smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(el => {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//open pet popup
document.querySelectorAll(".pets__list__item").forEach((el) => {
    el.addEventListener("click", (event) =>{
        if (event.target.closest('.pets__list__item')) {
            let indexPets = event.target.closest('.pets__list__item').dataset.index;
            createPopup(indexPets);
        }
    });
})


const myPopup = document.querySelector('.popup__wrapper');

function createPopup(index) {
	myPopup.querySelector('.popup__text__title').textContent = pets[index].name;
	myPopup.querySelector('.popup__text__type').textContent = pets[index].type;
	myPopup.querySelector('.popup__text__breed').textContent = pets[index].breed;
	myPopup.querySelector('.popup__text__desc').textContent = pets[index].description;
	myPopup.querySelector('img').src = pets[index].img;
	myPopup.querySelector('.popup__text__age').textContent = pets[index].age;
	myPopup.querySelector('.popup__text__inoculations').textContent = pets[index].inoculations.join(", ");
	myPopup.querySelector('.popup__text__diseases').textContent = pets[index].diseases.join(", ");
	myPopup.querySelector('.popup__text__parasites').textContent = pets[index].parasites.join(", ");
	myPopup.classList.add("active");
}

//close pet popup
myPopup.addEventListener("click", function (event) {
	if (!event.target.closest('.popup__container') || event.target.closest('.popup__close')) {
		myPopup.classList.remove("active");
	}
});





function shuffle(array) { 
	let shaffleArray = [...array];
	for (let i = shaffleArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[shaffleArray[i], shaffleArray[j]] = [shaffleArray[j], shaffleArray[i]];
	}
	return shaffleArray;
}

function create48ItemsPets() {
	let pets48 = [];
	for (let i = 0; i < 6; i++) {
		pets48.push(...shuffle(pets));
	}
	return pets48;
}

const rnd48Pets = create48ItemsPets();


const arrowFirst = document.querySelector('.pets__pages_first');
const arrowNext = document.querySelector('.pets__pages_next');
const arrowPrev = document.querySelector('.pets__pages_prev');
const arrowLast = document.querySelector('.pets__pages_last');
const buttonNumer = document.querySelector('.pets__pages_cur');


const sliderState = {
	currentPage: 1,
	countItems: 8,
}

function getActualCollection() {
	let countItems;
	let actualCollection;
	if (window.innerWidth < 768) {
		countItems = 3;
		actualCollection = Array.from(document.querySelectorAll('.pets__list__item')).slice(0, 3);
	} else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
		countItems = 6;
		actualCollection = Array.from(document.querySelectorAll('.pets__list__item')).slice(0, 6);
	} else if (window.innerWidth >= 1280) {
		countItems = 8;
		actualCollection = document.querySelectorAll('.pets__list__item');
	}
	sliderState.countItems = countItems;
	return actualCollection;
}



function setCard(currentPage, countItems, actualCollection = getActualCollection()) {
	actualCollection.forEach((item, index) => {
		let index48Arr;
		currentPage <= 1 ? index48Arr = index : index48Arr = (currentPage - 1) * countItems + index;
		item.setAttribute('data-index', index48Arr);
		item.querySelector('img').src = rnd48Pets[index48Arr].img;
		item.querySelector('.pets__list__item__text p').textContent = rnd48Pets[index48Arr].name;
	});
}

setCard(sliderState.currentPage, sliderState.countItems); 


arrowFirst.addEventListener('click', function () {
	if (!this.classList.contains("pets__pages_disabled")) {
		sliderState.currentPage = 1;
		remoteVisiblePagination();
	}
})

arrowNext.addEventListener('click', function () {
	if (!this.classList.contains("pets__pages_disabled")) {
		sliderState.currentPage++;
		remoteVisiblePagination();
	}
})

arrowPrev.addEventListener('click', function () {
	if (!this.classList.contains("pets__pages_disabled")) {
		sliderState.currentPage--;
		remoteVisiblePagination();
	}
})

arrowLast.addEventListener('click', function () {
	if (!this.classList.contains("pets__pages_disabled")) {
		sliderState.currentPage = Math.ceil(rnd48Pets.length / sliderState.countItems);
		remoteVisiblePagination();
	}
})


function remoteVisiblePagination() {
	buttonNumer.textContent = sliderState.currentPage;
	setCard(sliderState.currentPage, sliderState.countItems);
	if (sliderState.currentPage <= 1) {
		arrowLast.classList.remove('pets__pages_disabled');
		arrowNext.classList.remove('pets__pages_disabled');
		arrowFirst.classList.add('pets__pages_disabled');
		arrowPrev.classList.add('pets__pages_disabled');
	} else if (sliderState.currentPage > 1 && sliderState.currentPage < Math.ceil(rnd48Pets.length / sliderState.countItems)) {
		arrowFirst.classList.remove('pets__pages_disabled');
		arrowPrev.classList.remove('pets__pages_disabled');
		arrowLast.classList.remove('pets__pages_disabled');
		arrowNext.classList.remove('pets__pages_disabled');
	} else if (sliderState.currentPage >= Math.ceil(rnd48Pets.length / sliderState.countItems)) {
		arrowFirst.classList.remove('pets__pages_disabled');
		arrowPrev.classList.remove('pets__pages_disabled');
		arrowLast.classList.add('pets__pages_disabled');
		arrowNext.classList.add('pets__pages_disabled');
	}
}



