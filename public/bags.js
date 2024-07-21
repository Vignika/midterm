document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const categoryLinks = document.querySelectorAll('.sidebar a');
    const addProductModal = document.getElementById('add-product-modal');
    const closeModalBtn = document.querySelector('.modal .close');
    const addProductForm = document.getElementById('add-product-form');
    let addProductButton;

    const products = {
        men: [
            { name: 'Gucci Shoulder Bag', image: 'https://img.giglio.com/images/prodZoom/289834.022_1.jpg', price: '$500' },
            { name: 'Gucci Small Messenger Bag', image: 'https://cdna.lystit.com/photos/mrporter/1db06f74/gucci-black-Leather-trimmed-Monogrammed-Coated-canvas-Messenger-Bag.jpeg', price: '$700' },
            { name: 'Prada Saffiano Leather Shoulder Bag', image: 'https://cdnd.lystit.com/photos/stefaniamode/123863-BLACK-57417a7d-.jpeg', price: '$300' },
            { name: 'Prada Handbag ', image: 'https://cdna.lystit.com/photos/rafaellonetwork/0d0ec1de/prada--Bags-For-Men.jpeg', price: '$500' },
            { name: 'Louis Vuitton LV Men Avenue Sling Bag ', image: 'https://www.lulux.ru/wp-content/uploads/2020/02/Louis-Vuitton-LV-Men-Avenue-Sling-Bag-in-Damier-Infini-Leather-Black-1.jpg', price: '$700' },
            { name: 'Louis Vuitton LV Men Trio Messenger Bag', image: 'https://th.bing.com/th/id/OIP.j2ilicxHF5j_9LLtZhH-mwAAAA?rs=1&pid=ImgDetMain', price: '$300' }
        ],
        women: [
            { name: 'Gucci iconic GG Marmont Bag', image: 'https://images.summitmedia-digital.com/preview/images/2019/11/11/443497_HVKEG_9772_001_062_0000_Light-GG-Marmont-small-shoulder-bag.jpg', price: '$200' },
            { name: 'White Gucci Bag', image: 'https://th.bing.com/th/id/OIP.v2bcU2NYC3dMoty6Y0eDxQHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain', price: '$150' },
            { name: 'Michael Kors Women’s 30F8GV6T2B bag', image: 'https://th.bing.com/th/id/OIP.qI03k80AAZkycXBeAhrgRQAAAA?rs=1&pid=ImgDetMain', price: '$500' },
            { name: 'Michael Kors Mini Purse', image: 'https://th.bing.com/th/id/OIP.zCuX_07-0z3Tppy589v9oQAAAA?w=474&h=472&rs=1&pid=ImgDetMain', price: '$700' },
            { name: 'Prada Vintage - Gathered Nylon Satchel Bag', image: 'https://th.bing.com/th/id/OIP.rIP4lfBwvKtm8eBKShT78AHaHa?rs=1&pid=ImgDetMain', price: '$500' },
            { name: 'Prada Cross Body Purse', image: 'https://www.prada.com/content/dam/pradanux_products/1/1BH/1BH082/2BBEF0572/1BH082_2BBE_F0572_V_NOM_SLD.png/jcr:content/renditions/cq5dam.web.white.2400.3000.jpg', price: '$700' }
        ],
        brands: [
            { name: 'Michael Kors Mini Purse', image: 'https://th.bing.com/th/id/OIP.zCuX_07-0z3Tppy589v9oQAAAA?w=474&h=472&rs=1&pid=ImgDetMain', price: '$700' },
            { name: 'Prada Vintage - Gathered Nylon Satchel Bag', image: 'https://th.bing.com/th/id/OIP.rIP4lfBwvKtm8eBKShT78AHaHa?rs=1&pid=ImgDetMain', price: '$500' },
            { name: 'Gucci Shoulder Bag', image: 'https://img.giglio.com/images/prodZoom/289834.022_1.jpg', price: '$500' },
            { name: 'Gucci Small Messenger Bag', image: 'https://cdna.lystit.com/photos/mrporter/1db06f74/gucci-black-Leather-trimmed-Monogrammed-Coated-canvas-Messenger-Bag.jpeg', price: '$700' },
            { name: 'White Gucci Bag', image: 'https://th.bing.com/th/id/OIP.v2bcU2NYC3dMoty6Y0eDxQHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain', price: '$150' },
            { name: 'Prada Saffiano Leather Shoulder Bag', image: 'https://cdnd.lystit.com/photos/stefaniamode/123863-BLACK-57417a7d-.jpeg', price: '$300' }

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
