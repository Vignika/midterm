document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const categoryLinks = document.querySelectorAll('.sidebar a');
    const addProductModal = document.getElementById('add-product-modal');
    const closeModalBtn = document.querySelector('.modal .close');
    const addProductForm = document.getElementById('add-product-form');
    let addProductButton;

    const loadProducts = async (category) => {
        try {
            const response = await fetch(`/products?category=${category}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
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
                products.forEach(product => {
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
        } catch (error) {
            console.error('Error loading products:', error.message);
            alert('Failed to load products. Please try again.');
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

    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const image = document.getElementById('product-image').value;
        const price = document.getElementById('product-price').value;

        if (name && image && price) {
            const currentCategory = document.querySelector('.sidebar a.active').getAttribute('data-category');

            try {
                const response = await fetch('/add-product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, image, price })
                });

                if (!response.ok) {
                    throw new Error('Failed to add product');
                }

                // Assuming server responds with success message
                const result = await response.json();
                console.log(result.message);

                // Reload products for the current category
                loadProducts(currentCategory);

                // Clear form and close modal
                addProductForm.reset();
                addProductModal.style.display = 'none';
            } catch (error) {
                console.error('Error adding product:', error.message);
                alert('Failed to add product. Please try again.');
            }
        } else {
            alert('All fields are required.');
        }
    });

    // Load initial content
    loadProducts('scrolling');
});
