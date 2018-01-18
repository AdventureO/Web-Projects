class Carousel {
    constructor (container, images) {
        this.images= images;
        this.index = 0;
        this.root = document.createElement("div");
        this.root.innerHTML = this.render();
        this.root.classList.add("Carousel");

        this.root
            .querySelector(".Carousel__next")
            .addEventListener("click", this.next.bind(this));

        this.root
            .querySelector(".Carousel__prev")
            .addEventListener("click", this.prev.bind(this));

        container.appendChild(this.root);
    }

    next () {
        this.index ++;
        this.move();
    }

    prev () {
        this.index --;
        this.move();
    }

    move () {
        if (this.index < 0) {
            this.root.querySelectorAll(".Carousel__img")
                [ (this.images.length) + (this.index % this.images.length) -1 ].style.left = ((this.index) * 550) + "px";
        } else {
            this.root.querySelectorAll(".Carousel__img")
                [this.index % this.images.length].style.left = ((this.index) * 550) + "px";
        }
        this.root.querySelector(".Carousel__frame").style.left = -(this.index * 550)  + "px";
    }

    render () {
        return `
            <div class="Carousel__frame">
                ${this.images.map( (img, index) => `
                    <img class="Carousel__img" 
                        src="${img}"
                        style="left: ${index * 550}px"
                    />
                `).join("")}    
            </div>
            <button class="Carousel__prev">&#x2190;</button>
            <button class="Carousel__next">&#x2192;</button>
        `
    }
}

export default Carousel;