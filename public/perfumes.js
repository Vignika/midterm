document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const categoryLinks = document.querySelectorAll('.sidebar a');
    const addProductModal = document.getElementById('add-product-modal');
    const closeModalBtn = document.querySelector('.modal .close');
    const addProductForm = document.getElementById('add-product-form');
    let addProductButton;

    const products = {
        men: [
            { name: 'Christian Dior Philippines', image: 'https://ph-live-01.slatic.net/original/c44509094fcbe05ce194594ad492d2b3.jpg', price: '$500' },
            { name: 'Dior Homme Intense', image: 'https://th.bing.com/th/id/OIP.Gn-iBPMCxJkT7YzVJ1lwRAHaJi?rs=1&pid=ImgDetMain', price: '$700' },
            { name: 'Chanel Launches Bleu de Parfum for Men', image: 'https://www.thefashionisto.com/wp-content/uploads/2014/08/bleu_chanel.jpg', price: '$300' },
            { name: 'BLEU DE CHANEL PARFUM ', image: 'https://www.chanel.com/images/t_one/w_0.51,h_0.51,c_crop/q_auto:good,f_jpg,fl_lossy,dpr_1.2/w_1920/bleu-de-chanel-after-shave-lotion-3-4fl-oz--packshot-default-107070-8826672152606.jpg', price: '$500' },
            { name: 'VERSACE EROS EDT 100ML FOR MEN', image: 'https://th.bing.com/th/id/OIP.EI7EOlYkNGJgcoYjhU0qmgAAAA?rs=1&pid=ImgDetMain', price: '$700' },
            { name: 'Versace Eros Flame Eau De Perfume For Men', image: 'https://th.bing.com/th/id/OIP.uQMIzOxT6yca2ob8dUny0AAAAA?rs=1&pid=ImgDetMain', price: '$300' }
        ],
        women: [
            { name: 'Versace Eros Pour Femme Eau De Parfum for Women', image: 'https://www.nextcrush.in/wp-content/uploads/2018/11/Versace-Eros-Pour-Femme_100ml_EDP_women_4-1024x1024.jpg', price: '$200' },
            { name: 'Versace Eros Pour Femme, Eau de Parfum for Women ', image: 'https://i.notino.com/zoomMobile/versace/vererow_aedp20_03__9.jpg', price: '$150' },
            { name: 'Gucci Bloom Gucci perfume', image: 'https://fimgs.net/images/secundar/o.47799.jpg', price: '$500' },
            { name: 'Gucci Bloom Ambrosia ', image: 'https://image-optimizer-hk.production.sephora-asia.net/images/product_images/zoom_1_Product_3614229461336-Gucci-Bloom-Ambrosia-Di-Fiori-Eau-De-Parfum-50ml_b493b73eb611568d9413745ecbfa69f93bc370f2_1575369700.png', price: '$700' },
            { name: 'Victorias  Secret Bombshell Perfume', image: 'https://th.bing.com/th/id/OIP.JaqzqJg1p99t481I8jRjzwHaHZ?rs=1&pid=ImgDetMain', price: '$700' },
            { name: 'Victoria s Secret perfume ', image: 'https://i.pinimg.com/736x/78/26/39/782639cdc3a44d1475ae78d0c8dddbe3.jpg', price: '$700' }
        ],
        brands: [
            { name: 'Gucci Bloom Ambrosia ', image: 'https://image-optimizer-hk.production.sephora-asia.net/images/product_images/zoom_1_Product_3614229461336-Gucci-Bloom-Ambrosia-Di-Fiori-Eau-De-Parfum-50ml_b493b73eb611568d9413745ecbfa69f93bc370f2_1575369700.png', price: '$700' },
            { name: 'Victorias  Secret Bombshell Perfume', image: 'https://th.bing.com/th/id/OIP.JaqzqJg1p99t481I8jRjzwHaHZ?rs=1&pid=ImgDetMain', price: '$700' },
            { name: 'BLEU DE CHANEL PARFUM ', image: 'https://www.chanel.com/images/t_one/w_0.51,h_0.51,c_crop/q_auto:good,f_jpg,fl_lossy,dpr_1.2/w_1920/bleu-de-chanel-after-shave-lotion-3-4fl-oz--packshot-default-107070-8826672152606.jpg', price: '$500' },
            { name: 'VERSACE EROS EDT 100ML FOR MEN', image: 'https://th.bing.com/th/id/OIP.EI7EOlYkNGJgcoYjhU0qmgAAAA?rs=1&pid=ImgDetMain', price: '$700' },
            { name: 'Christian Dior Philippines', image: 'https://ph-live-01.slatic.net/original/c44509094fcbe05ce194594ad492d2b3.jpg', price: '$500' },
            { name: 'Versace Eros Pour Femme, Eau de Parfum for Women ', image: 'https://i.notino.com/zoomMobile/versace/vererow_aedp20_03__9.jpg', price: '$150' }



          
           
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
