function showContent(page) {
    let title = document.getElementById("pageTitle");
    let content = document.getElementById("pageContent");

    switch (page) {
        case 'about':
            title.innerText = "About Us";
            content.innerText = "Welcome to the About page!";
            break;
        case 'reacts':
            title.innerText = "Reacts";
            content.innerText = "Here are some reactions from our community.";
            break;
        case 'ai':
            title.innerText = "AI Art";
            content.innerText = "Explore amazing AI-generated artwork.";
            break;
        default:
            title.innerText = "Welcome";
            content.innerText = "Principal page";
    }
}

function arts_menu(page) {
    let title = document.getElementById("pageTitle");
    let content = document.getElementById("pageContent");

    switch (page) {
        case 'portraits':
            title.innerText = "Pencil Portraits";
            break;
        case 'acrylic':
            title.innerText = "Acrylic Paintings";
            break;
        case 'watercolor':
            title.innerText = "Watercolor Paintings";
            break;
        case 'dress':
            title.innerText = "Dress Paintings";
            break;
        case 'random_draw':
            title.innerText = "Random Drawings";
            break;

        default:
            title.innerText = "Welcome";
            content.innerText = "Principal page";
    }
}

function artist_menu(page) {
    let title = document.getElementById("pageTitle");
    let content = document.getElementById("pageContent");

    switch (page) {
        case '1':
            title.innerText = "Artist 1";
            break;
        case '2':
            title.innerText = "Artist 2";
            break;
        case '3':
            title.innerText = "Artist 3";
            break;
        default:
            title.innerText = "Welcome";
            content.innerText = "Principal page";
    }
}

function account_menu(page) {
    let title = document.getElementById("pageTitle");
    let content = document.getElementById("pageContent");
    if (!title || !content) {

        return;
    }

    switch (page) {
        case 'log_in':
            title.innerText = "Log in";
            break;
        case 'sing_in':
            title.innerText = "Sign in";
            break;
        case 'condition':
            title.innerText = "Conditions";
            break;
        default:
            title.innerText = "Welcome";
            content.innerText = "Principal page";
    }
}

/*
const acrylic_products = [
    {
        id: 1,
        name: "Cat",
        description: "Cat painting in acylic. The head of a reddish-brown cat, with white details, large hazel eyes, a small pink nose, on a fresh green and forest green background.",
        images: ["/images/acrylic/acrylic_cat.jpg"],
        price: 99.99
    },
    {
        id: 2,
        name: "River",
        description: "Acrylic painting of a river in the middle, surrounded on the right and back by dark green fir trees and on the left on the side of a road, rich natural green trees.",
        images: [
            "/images/acrylic/acrylic_river2.jpg",
            "/images/acrylic/acrylic_river1.jpg",
            "/images/acrylic/acrylic_river3.jpg"
        ],
        price: 99.99
    },
    {
        id: 3,
        name: "Cascade",
        description: "In the foreground flows a clear river, with blue and pale pink reflections, descending over the rocks. On the banks of the river, the vegetation is abundant, with green grass and bushes in shades of yellow and orange.\n" +
            "\n" +
            "In the center of attention is a spectacular waterfall with white foam that pours from a higher area, surrounded by trees of various colors - raw green, yellow, orange, red, but also lilac - suggesting chromatic fantasy. In the background rises a blue-gray mountain, with a sharp peak, under a clear blue sky covered with clouds in which the light is reflected in shades of pale pink, cream, orange that create a sunrise atmosphere.\n",
        images: [
            "/images/acrylic/acrylic_cascade.jpg",
            "/images/acrylic/acrylic_cascade2.jpg",
            "/images/acrylic/acrylic_cascade3.jpg"
        ],
        price: 99.99
    },
    {
        id: 4,
        name: "Forest",
        description: "In the forest with deep green trees in the back is a old wooden cabin see in the right, from beside her come a turbulent river with speed and breaks into a cascade on the rooks. In the left side are three deer and one little roe deer who looks in the forest. ",
        images: [
            "/images/acrylic/acrylic_forest.jpg",
            "/images/acrylic/acrylic_forest1.jpg",
            "/images/acrylic/acrylic_forest2.jpg"
        ],
        price: 99.99
    },
    {
        id: 5,
        name: "Mountain",
        description: "In a sunrise atmosphere, a hight peak of a mountain with the clouds saround him. Come from altitude in front of us. Little dirty withe flowers at the bottom",
        images: [
            "/images/acrylic/acrylic_mountain.jpg",
            "/images/acrylic/acrylic_mountain1.jpg",
            "/images/acrylic/acrylic_mountain2.jpg"
        ],
        price: 99.99
    },
    {
        id: 6,
        name: "Sunrise",
        description: "Acrylic painting of a lavender field in the fire o the sunrise atmosphere.",
        images: [
            "/images/acrylic/acrylic_sunrise.jpg",
            "/images/acrylic/acrylic_sunrise1.jpg",
            "/images/acrylic/acrylic_sunrise2.jpg"
        ],
        price: 99.99
    },
    {
        id: 7,
        name: "Lake",
        description: "Peaceful acrylic lake scene",
        images: [
            "/images/acrylic/acrylic_lake.jpg",
            "/images/acrylic/acrylic_lake1.jpg"
        ],
        price: 99.99
    },
    {
        id: 8,
        name: "Fire",
        description: "Abstract fire composition in acrylic",
        images: [
            "/images/acrylic/acrylic_fire1.jpg",
            "/images/acrylic/acrylic_fire2.jpg"
        ],
        price: 99.99
    },
    {
        id: 9,
        name: "Icon",
        description: "Religious icon acrylic painting",
        images: [
            "/images/acrylic/acrylic_icon1.jpg",
            "/images/acrylic/acrylic_icon2.jpg"
        ],
        price: 99.99
    }
];

const watercolor_products = [
    {
        id: 10,
        name: "Cat",
        description: "Whimsical watercolor cat",
        images: [
            "/images/watercolor/w_cat.jpg",
            "/images/watercolor/w_cat1.jpg"
        ],
        price: 99.99
    },
    {
        id: 11,
        name: "Dragon",
        description: "Fantasy dragon watercolor",
        images: ["/images/watercolor/w_dragon.jpg"],
        price: 99.99
    },
    {
        id: 12,
        name: "Stark wolf",
        description: "Inspired by Game of Thrones - Stark direwolf",
        images: [
            "/images/watercolor/w_stark.jpg",
            "/images/watercolor/w_stark1.jpg"
        ],
        price: 99.99
    },
    {
        id: 13,
        name: "Person",
        description: "Expressive abstract portrait",
        images: ["/images/watercolor/w_bipolar.jpg"],
        price: 99.99
    },
    {
        id: 14,
        name: "Wanda",
        description: "Portrait of Wanda in watercolor style",
        images: [
            "/images/watercolor/w_wanda.jpg",
            "/images/watercolor/w_wanda1.jpg"
        ],
        price: 99.99
    }
];

const portret_products = [
    {
        id: 15,
        name: "Zendaya",
        description: "Realistic portrait of Zendaya",
        images: [
            "/images/portret/portret_zendaya2.jpg",
            "/images/portret/portret_zendaya.jpg",
            "/images/portret/portret_zendaya1.jpg"
        ],
        price: 99.99
    },
    {
        id: 16,
        name: "The witcher",
        description: "Portrait of The Witcher character",
        images: [
            "/images/portret/portret_witcher1.jpg",
            "/images/portret/portret_witcher.jpg"
        ],
        price: 99.99
    },
    {
        id: 17,
        name: "Baby",
        description: "Cute baby portrait",
        images: [
            "/images/portret/portret_bebe.jpg",
            "/images/portret/portret_zendaya1.jpg",
            "/images/portret/portret_bebe2.jpg"
        ],
        price: 99.99
    },
    {
        id: 18,
        name: "Butterfly",
        description: "Girl with butterfly face paint",
        images: [
            "/images/portret/portret_butterfly.jpg",
            "/images/portret/portret_butterfly1.jpg"
        ],
        price: 99.99
    },
    {
        id: 19,
        name: "Children",
        description: "Siblings/children portrait",
        images: [
            "/images/portret/portret_copii.jpg",
            "/images/portret/portret_copii1.jpg"
        ],
        price: 99.99
    },
    {
        id: 20,
        name: "Rhaenyra",
        description: "Portrait inspired by House of the Dragon",
        images: [
            "/images/portret/portret_hotd.jpg",
            "/images/portret/portret_hotd2.jpg"
        ],
        price: 99.99
    },
    {
        id: 21,
        name: "Andreea",
        description: "Custom portrait of Andreea",
        images: ["/images/portret/portret_andreea.jpg"],
        price: 99.99
    },
    {
        id: 22,
        name: "Zendaya Dune",
        description: "Zendaya as Chani from Dune",
        images: ["/images/portret/portret_dune.jpg"],
        price: 99.99
    },
    {
        id: 23,
        name: "Cousins",
        description: "Portrait of two cousins",
        images: ["/images/portret/portret_ionut.jpg"],
        price: 99.99
    },
    {
        id: 24,
        name: "Loki",
        description: "Portrait of Loki from Marvel",
        images: [
            "/images/portret/portret_loki.jpg",
            "/images/portret/portret_loki1.jpg"
        ],
        price: 99.99
    }
];

const random_products = [
    {
        id: 28,
        name: "Eye",
        description: "Detailed eye sketch",
        images: ["/images/random/old_eye.jpg"],
        price: 99.99
    },
    {
        id: 26,
        name: "Carnaval",
        description: "Colorful carnival theme",
        images: ["/images/random/carnaval.jpg"],
        price: 99.99
    },
    {
        id: 27,
        name: "Dune",
        description: "Abstract artwork inspired by Dune",
        images: ["/images/random/dune.jpg"],
        price: 99.99
    },
    {
        id: 29,
        name: "Flower",
        description: "Bright floral artwork",
        images: ["/images/random/flower.jpg"],
        price: 99.99
    },
    {
        id: 30,
        name: "Phonecase",
        description: "Custom phonecase painting",
        images: [
            "/images/random/phonecase1.jpg",
            "/images/random/phonecase.jpg"
        ],
        price: 99.99
    }
];

const dress_products = [
    {
        id: 31,
        name: "Dark dress",
        description: "",
        images: ["/images/draw/rochieA.jpg", "/images/draw/rochieA1.jpg"],
        price: 99.99
    }
    // si asa mai departe .....
]*/

let cart = [];
let selectedProduct = null;
let currentImageIndex = 0;

/*
function displayProducts(products) {
    var productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(function (product){
        var productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.setAttribute("data-id", product.id);

        var title = document.createElement("h3");
        title.innerText = product.name;

        var price = document.createElement("p");
        price.innerText = "Price: " + product.price + " euro";

        var img = document.createElement("img");
        img.src = product.images[0];
        img.alt = product.name;

        var addButton = document.createElement("button");
        addButton.className = "addCart";
        addButton.innerText = "Add to cart";

        addButton.addEventListener("click", function (event) {
            event.stopPropagation();
            selectedProduct = product;
            addToCart();
        });

        productDiv.appendChild(title);
        productDiv.appendChild(img);
        productDiv.appendChild(price);
        productDiv.appendChild(addButton);
        productList.appendChild(productDiv);

        var imgIndex = 0;
        img.addEventListener("mouseenter", function () {
            imgIndex = 0;
            var interval = setInterval(function () {
                imgIndex = (imgIndex + 1) % product.images.length;
                img.src = product.images[imgIndex];
            }, 1000);

            img.addEventListener("mouseleave", function () {
                clearInterval(interval);
                img.src = product.images[0];
            }, {once: true});
        });

        productDiv.addEventListener("click", function () {
            viewProduct(product.id, product);
        });
    });
}

function viewProduct(id, product) {
    selectedProduct = product;
    currentImageIndex = 0;

    document.getElementById("detailName").textContent = selectedProduct.name;
    document.getElementById("detailImage").src = selectedProduct.images[currentImageIndex];
    document.getElementById("detailPrice").textContent = "Price: " + selectedProduct.price + " euro";

    document.getElementById("productList").style.display = "none";
    document.getElementById("product_details").style.display = "block";

    displayThumbnails();

    const detailImage = document.getElementById("detailImage");
    detailImage.onclick = function (event) {
        var imageWidth = this.clientWidth;
        var clickPosition = event.offsetX;

        if (clickPosition < imageWidth / 2) {
            prevImage();
        } else {
            nextImage();
        }
    };
}

function prevImage(){
    if(currentImageIndex > 0){
        currentImageIndex --;
        updateMainImage();
    }
}

function nextImage(){
    if(currentImageIndex < selectedProduct.images.length - 1){
        currentImageIndex++;
        updateMainImage();
    }
}

function updateMainImage(){
    document.getElementById("detailImage").src = selectedProduct.images[currentImageIndex];
}

function displayThumbnails(){
    var thumbnailContainer = document.getElementById("thumbnailContainer");
    thumbnailContainer.innerHTML = "";

    selectedProduct.images.forEach(function (img, index){
        var thumb = document.createElement("img");
        thumb.src = img;
        thumb.className = "thumbnail";
        thumb.onclick = function () {changeImage(index);};
        thumbnailContainer.appendChild(thumb);
    });
}
function changeImage(index){
    currentImageIndex = index;
    updateMainImage();
}

function addToCart(){
    cart.push(selectedProduct);
    document.getElementById("cart_count").textContent = cart.length;
    alert("Added to cart");

    document.getElementById("product_details").style.display = "none";
    document.getElementById("productList").style.display = "block";
}
*/

function showCart(){
    var cartItems = cart.map(function (p){ return p.name; }).join(", ");
    alert("Products" + cartItems);
}

document.addEventListener("DOMContentLoaded", () => {

    const rotators = document.querySelectorAll(".rotating-image");

    rotators.forEach(img => {
        const images = img.dataset.images.split(',').map(i => i.trim());
        let index = 0;
        let interval;

        img.addEventListener('mouseenter', () => {
            index = 0;
            interval = setInterval(() => {
                index = (index + 1) % images.length;
                img.src = images[index];
            }, 1000);
        });

        img.addEventListener('mouseleave', () => {
            clearInterval(interval);
            img.src = images[0];
        });
    });
});

//***************************integrare_openAI******************************
document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("generateBtn")) {
        const button = event.target;
        const item = button.closest(".item, .product");
        const img = item.querySelector("img");
        const result = item.querySelector(".result");

        button.disabled = true;
        button.textContent = "Generating...";

        try {
            const imageElement = new Image();
            imageElement.crossOrigin = "anonymous";
            imageElement.src = img.src;

            await new Promise((resolve, reject) => {
                imageElement.onload = resolve;
                imageElement.onerror = reject;
            });

            const canvas = document.createElement("canvas");
            canvas.width = imageElement.width;
            canvas.height = imageElement.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(imageElement, 0, 0);

            let blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

            while (blob.size > 4 * 1024 * 1024) {
                const scaleFactor = Math.sqrt((4 * 1024 * 1024) / blob.size);
                const newWidth = Math.floor(canvas.width * scaleFactor);
                const newHeight = Math.floor(canvas.height * scaleFactor);

                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(imageElement, 0, 0, newWidth, newHeight);

                blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
            }

            const formData = new FormData();
            formData.append("image", blob, "original_image.png");

            const apiResponse = await fetch("/api/generate-variation", {
                method: "POST",
                body: formData
            });

            const data = await apiResponse.json();

            if (data.imageUrl) {
                result.innerHTML = '<img src="' + data.imageUrl + '" alt="Generated image">';
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            alert("Generating Error:");
            console.error(error);
        } finally {
            button.disabled = false;
            button.textContent = "Generate image";
        }
    }
});

//***************************add_to_cart******************************
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".addCart");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");

            fetch("/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `productId=${productId}`
            })
                .then(() => {

                    return fetch("/cart/count");
                })
                .then(res => res.json())
                .then(data => {

                    document.getElementById("cart_count").textContent = data.count;


                    const toast = document.getElementById("toast");
                    toast.classList.add("show");


                    setTimeout(() => {
                        toast.classList.remove("show");
                    }, 3000);
                })
                .catch(err => console.error("Eroare:", err));
        });
    });
});

//***************************generare_upload******************************
document.getElementById("generateFromUpload").addEventListener("click", async () => {
    const fileInput = document.getElementById("imageUpload");
    const result = document.getElementById("generatedResult");

    if (!fileInput.files.length) {
        alert("Please upload an image first.");
        return;
    }

    const file = fileInput.files[0];

    const button = document.getElementById("generateFromUpload");
    button.disabled = true;
    button.textContent = "Generating...";

    try {
        const imageElement = new Image();
        imageElement.crossOrigin = "anonymous";
        imageElement.src = URL.createObjectURL(file);

        await new Promise((resolve, reject) => {
            imageElement.onload = resolve;
            imageElement.onerror = reject;
        });

        const canvas = document.createElement("canvas");
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imageElement, 0, 0);

        let blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));

        while (blob.size > 4 * 1024 * 1024) {
            const scaleFactor = Math.sqrt((4 * 1024 * 1024) / blob.size);
            const newWidth = Math.floor(canvas.width * scaleFactor);
            const newHeight = Math.floor(canvas.height * scaleFactor);

            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(imageElement, 0, 0, newWidth, newHeight);

            blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
        }

        const formData = new FormData();
        formData.append("image", blob, "uploaded_image.png");

        const response = await fetch("/api/generate-variation", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.imageUrl) {
            result.innerHTML = '<img src="' + data.imageUrl + '" alt="Generated Image" class="generated-image">';
        } else {
            result.innerHTML = '<p style="color:red;">Error: ' + (data.error || "Unknown error") + '</p>';
        }
    } catch (error) {
        console.error("Error during image generation:", error);
        result.innerHTML = '<p style="color:red;">An error occurred while generating the image.</p>';
    } finally {
        button.disabled = false;
        button.textContent = "Generate image";
    }
});

//***************************upload_file******************************
document.getElementById("imageUpload").addEventListener("change", function () {
    const fileName = this.files[0] ? this.files[0].name : "No file chosen";
    document.getElementById("fileName").textContent = fileName;
});

