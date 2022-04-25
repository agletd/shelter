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







const sliderItems = document.querySelectorAll('.pets__list__item');
const btnLeft = document.querySelector('.pets__list__btn_left');
const btnRight = document.querySelector('.pets__list__btn_right');

const sliderData = {
	countPets: pets.length,
	prevPets: [],
	currentPets: []
}

function createUniqItem() {
	let rnd = Math.floor(Math.random() * sliderData.countPets);
	while (sliderData.currentPets.includes(rnd) || sliderData.prevPets.includes(rnd)) {
		rnd = Math.floor(Math.random() * sliderData.countPets);
	}
	return rnd;
}

const slide = document.querySelector('.pets__list__slide');

function setUniqItem (event) {
	const curSlide = document.querySelector('.pets__list__slide').cloneNode(true);
	
 	curSlide.children[0].classList.add("item__old");
	curSlide.children[1].classList.add("item__old");
	curSlide.children[2].classList.add("item__old");
	
	sliderItems.forEach((item, index) => {
		let rnd = createUniqItem();
		item.setAttribute('data-index', rnd);// устанавливаем атрибут
		item.querySelector('img').src = pets[rnd].img;
		item.querySelector('.pets__list__item__text p').textContent = pets[rnd].name;
		sliderData.currentPets[index] = rnd;
		if (index === 2) {sliderData.prevPets = [...sliderData.currentPets]};
	});
	
	if (event?.currentTarget === btnRight) {
		slide.prepend(curSlide.children[2]);
		slide.prepend(curSlide.children[1]);
		slide.prepend(curSlide.children[0]);
		
		slide.classList.add("mooving__right");
		slide.addEventListener('animationend', () => {
			slide.classList.remove("mooving__right");
			const newCard = slide.querySelectorAll('.item__old');
			newCard.forEach(item => {
				item.remove();
			})
		}); 
	}
	if (event?.currentTarget === btnLeft) {
		const cld0 = curSlide.children[0].cloneNode(true);
		const cld1 = curSlide.children[1].cloneNode(true);
		const cld2 = curSlide.children[2].cloneNode(true);
		slide.append(cld0);
		slide.append(cld1);
		slide.append(cld2);

		slide.classList.add("mooving__left");
		slide.addEventListener('animationend', () => {
			slide.classList.remove("mooving__left");
			const newCard = slide.querySelectorAll('.item__old');
			newCard.forEach(item => {
				item.remove();
			})
		});
	}
}

setUniqItem();

btnLeft.addEventListener('click', setUniqItem);
btnRight.addEventListener('click', setUniqItem);


