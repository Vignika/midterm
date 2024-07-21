document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const categoryLinks = document.querySelectorAll('.sidebar a');
    const addProductModal = document.getElementById('add-product-modal');
    const closeModalBtn = document.querySelector('.modal .close');
    const addProductForm = document.getElementById('add-product-form');
    let addProductButton;

    const products = {
        men: [
            { name: 'Emporio Armani', image: 'https://www.thewatchcompany.com/media/catalog/product/cache/2e643380bf6acdbc360c33153b32ea2f/E/m/Emporio_Armani-AR1451.jpg', price: '$500' },
            { name: 'Emporio Armani chronography watch', image: 'https://th.bing.com/th/id/R.efc2fa7063f8adb6cfd141659c7b608e?rik=Iz47D%2bLu4gXDKw&riu=http%3a%2f%2fwww.d2time.co.uk%2fFiles%2f127316%2fImg%2f23%2farmani-AR5890x1200.jpg&ehk=e4UD%2feiGE%2fvL4kk6NIGGiGQbClAPI1gG5mySy9TH%2fLE%3d&risl=&pid=ImgRaw&r=0', price: '$700' },
            { name: 'Emporia Armani stainless steel', image: 'https://th.bing.com/th/id/OIP.yXi1fmO84aiDgY1NzTHwrwAAAA?rs=1&pid=ImgDetMain', price: '$300' },
            { name: 'Rolex Cosmograph Daytona Rose Gold ', image: 'https://th.bing.com/th/id/OIP.Y6bLx90O45cMyQZ0IET30wAAAA?rs=1&pid=ImgDetMain', price: '$500' },
            { name: 'Rolex Submariner steel Gold Diamond ', image: 'https://cdn.swisswatchexpo.com/productphotos/9/16/rolex-submariner-steel-gold-diamond-sapphire-serti-dial-mens-watch-16613-29353_33406.jpg', price: '$700' },
            { name: 'Rolex Daytona Yellow Gold Diamond ', image: 'https://cdn.swisswatchexpo.com/productphotos/31/25381/rolex-daytona-yellow-gold-diamond-dial-chronograph-mens-watch-16528_25381_f.jpg', price: '$300' },
            { name: 'Gucci Timeless Black stainless steel', image: 'https://i5.walmartimages.com/asr/3edee1f5-5035-44e8-b75e-ed5dab46d16d_1.c3d70ea35a91bf39aa94985c5ec7fe21.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff', price: '$500' },
            { name: 'Gucci Gold Black swis made interlock', image: 'https://th.bing.com/th/id/OIP.mLL9OR6o9wAh0mqfAMinDAHaHa?rs=1&pid=ImgDetMain', price: '$700' },
            { name: 'Gucci G-Chrono ', image: 'https://bestwatch.sg/media/catalog/product/image/width/800/height/800/G/u/Gucci-G-Chrono-YA101309.jpg', price: '$300' }
        ],
        women: [
            { name: 'Emporio Armani Gianni T-Bar Blue', image: 'https://img.tatacliq.com/images/i5/658Wx734H/MP000000005430476_658Wx734H_20190905222005.jpeg', price: '$200' },
            { name: 'Emporio Armani Classic Mother Pearl watch', image: 'https://www.watchbazaar.com/images/emporio-armani-ar11091-ladies-gianni-t-bar-watch-p1075-3650_medium.jpg', price: '$150' },
            { name: 'Gucci Signora Twisted Watch', image: 'https://th.bing.com/th/id/OIP.e7IW0tghYuSTFfUEcVn_5wAAAA?rs=1&pid=ImgDetMain', price: '$500' },
            { name: 'Gucci Small Diamond Brown', image: 'https://i5.walmartimages.com/asr/42b30918-81e4-44d1-9525-bf75320958bb_1.a7a70560c90297c7aa26ceff04fd8586.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff', price: '$700' },
            { name: 'Fossil Womens Gen2 Connection', image: 'https://2.bp.blogspot.com/-itToO04l114/UBviJnbr-3I/AAAAAAAABlY/rnAj1ol-Tr4/s1600/2.jpg', price: '$500' },
            { name: 'Fossil leather watch', image: 'https://th.bing.com/th/id/R.2ab7fd6491726359511ff7c0bb2c65d5?rik=2PCFsF6puffEJg&riu=http%3a%2f%2fcdn2.jomashop.com%2fmedia%2fcatalog%2fproduct%2ff%2fo%2ffossil-original-boyfriend-chronograph-white-dial-cot-bone-leather-ladies-watch-es3625_5.jpg&ehk=uwzAYuZzoHWgIPlIqG1EmyiLFjZEYAORxUuhBPMTXzk%3d&risl=&pid=ImgRaw&r=0', price: '$700' }
        ],
        brands: [
            { name: 'Emporio Armani', image: 'https://www.thewatchcompany.com/media/catalog/product/cache/2e643380bf6acdbc360c33153b32ea2f/E/m/Emporio_Armani-AR1451.jpg', price: '$500' },
            { name: 'Emporio Armani chronography watch', image: 'https://th.bing.com/th/id/R.efc2fa7063f8adb6cfd141659c7b608e?rik=Iz47D%2bLu4gXDKw&riu=http%3a%2f%2fwww.d2time.co.uk%2fFiles%2f127316%2fImg%2f23%2farmani-AR5890x1200.jpg&ehk=e4UD%2feiGE%2fvL4kk6NIGGiGQbClAPI1gG5mySy9TH%2fLE%3d&risl=&pid=ImgRaw&r=0', price: '$700' },
            { name: 'Emporio Armani Gianni T-Bar Blue', image: 'https://img.tatacliq.com/images/i5/658Wx734H/MP000000005430476_658Wx734H_20190905222005.jpeg', price: '$200' },
            { name: 'Emporio Armani Classic Mother Pearl watch', image: 'https://www.watchbazaar.com/images/emporio-armani-ar11091-ladies-gianni-t-bar-watch-p1075-3650_medium.jpg', price: '$150' },
            { name: 'Rolex Daytona Yellow Gold Diamond ', image: 'https://cdn.swisswatchexpo.com/productphotos/31/25381/rolex-daytona-yellow-gold-diamond-dial-chronograph-mens-watch-16528_25381_f.jpg', price: '$300' },
            { name: 'Fossil Womens Gen2 Connection', image: 'https://2.bp.blogspot.com/-itToO04l114/UBviJnbr-3I/AAAAAAAABlY/rnAj1ol-Tr4/s1600/2.jpg', price: '$500' }
           
        ]
    };

    const loadProducts = (category) => {
        productList.innerHTML = '';

        if (category === 'scrolling') {
            // Show scrolling items
            const scrollingItems = document.createElement('div');
            scrollingItems.className = 'scrolling-items';
            scrollingItems.innerHTML = `
                <div class="item">
                    <img src="./images/watches.jpg" alt="Item 1" class="item-image">
                </div>
                <div class="item">
                    <img src="./images/bag.jpg" alt="Item 2" class="item-image">
                </div>
                <div class="item">
                    <img src="./images/perfume.jpg" alt="Item 3" class="item-image">
                </div>
            `;
            productList.appendChild(scrollingItems);

            // Ensure the Add Product button is removed when displaying scrolling items
            if (addProductButton) {
                addProductButton.remove();
                addProductButton = null;
            }
        } else {
            // Add products to the list
            products[category].forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product-item';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="product-price">${product.price}</p>
                    <div>
                        <button>Edit</button>
                        <button>Remove</button>
                    </div>
                `;
                productList.appendChild(productDiv);
            });

            // Add the "Add Product" button if it is not already present
            if (!addProductButton) {
                addProductButton = document.createElement('button');
                addProductButton.id = 'open-add-product-modal';
                addProductButton.textContent = 'Add Product';
                productList.appendChild(addProductButton);

                addProductButton.addEventListener('click', () => {
                    addProductModal.style.display = 'block';
                });
            }
        }
    };

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');

            // Remove active class from all links and add it to the clicked link
            categoryLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');

            loadProducts(category);
        });
    });

    closeModalBtn.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === addProductModal) {
            addProductModal.style.display = 'none';
        }
    });

    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const image = document.getElementById('product-image').value;
        const price = document.getElementById('product-price').value;

        if (name && image && price) {
            // Assume the user is adding the product to the currently selected category
            const currentCategory = document.querySelector('.sidebar a.active').getAttribute('data-category');
            
            if (currentCategory !== 'scrolling') {
                products[currentCategory].push({ name, image, price });
                loadProducts(currentCategory);
            }

            // Clear form and close modal
            addProductForm.reset();
            addProductModal.style.display = 'none';
        } else {
            alert('All fields are required.');
        }
    });

    // Load initial content
    loadProducts('scrolling');
});
