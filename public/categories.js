document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const categoryLinks = document.querySelectorAll('.sidebar a');
    const addProductModal = document.getElementById('add-product-modal');
    const editProductModal = document.getElementById('edit-product-modal');
    const closeModalBtns = document.querySelectorAll('.modal .close');
    const addProductForm = document.getElementById('add-product-form');
    const editProductForm = document.getElementById('edit-product-form');
    let addProductButton;

    const products = {
        men: [
            { name: 'Rolex Submariner', image: 'https://example.com/rolex.jpg', price: '$700' }
        ],
        women: [
            { name: 'Gucci Signora', image: 'https://example.com/gucci.jpg', price: '$500' }
        ]
    };
    const loadProducts = async (category) => {
        try {
            const response = await fetch(`/products?category=${category}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            productList.innerHTML = '';

            if (category === 'scrolling') {
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

                if (addProductButton) {
                    addProductButton.remove();
                    addProductButton = null;
                }
            } else {
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product-item';
                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="product-price">${product.price}</p>
                        <div>
                            <button class="edit-btn" data-id="${product._id}">Edit</button>
                            <button class="remove-btn" data-id="${product._id}">Remove</button>
                        </div>
                    `;
                    productList.appendChild(productDiv);

                    const editButton = productDiv.querySelector('.edit-btn');
                    editButton.addEventListener('click', () => {
                        populateEditForm(product);
                    });

                    const removeButton = productDiv.querySelector('.remove-btn');
                    removeButton.addEventListener('click', async () => {
                        const confirmDelete = confirm(`Are you sure you want to delete ${product.name}?`);
                        if (confirmDelete) {
                            await deleteProduct(product._id);
                            loadProducts(category);
                        }
                    });
                });

                if (!addProductButton) {
                    addProductButton = document.createElement('button');
                    addProductButton.id = 'open-add-product-modal';
                    addProductButton.textContent = 'Add Product';
                    productList.appendChild(addProductButton);

                    addProductButton.addEventListener('click', () => {
                        document.getElementById('modal-title').textContent = 'Add Product';
                        addProductForm.reset();
                        addProductModal.style.display = 'block';
                    });
                }
            }
        } catch (error) {
            console.error('Error loading products:', error.message);
            alert('Failed to load products. Please try again.');
        }
    };

    const populateEditForm = (product) => {
        document.getElementById('edit-modal-title').textContent = 'Edit Product';
        document.getElementById('edit-product-id').value = product._id;
        document.getElementById('edit-product-name').value = product.name;
        document.getElementById('edit-product-image').value = product.image;
        document.getElementById('edit-product-price').value = product.price;
        editProductModal.style.display = 'block';
    };

    const updateProduct = async (productId, name, image, price) => {
        try {
            const response = await fetch(`/update-product/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, image, price })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update product');
            }
            alert('Product updated successfully');
        } catch (error) {
            console.error('Error updating product:', error.message);
            alert('Failed to update product. Please try again.');
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`/delete-product/${productId}`, { method: 'DELETE' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete product');
            }
            alert('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error.message);
            alert('Failed to delete product. Please try again.');
        }
    };

    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const image = document.getElementById('product-image').value;
        const price = document.getElementById('product-price').value;

        try {
            const response = await fetch('/add-product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, image, price })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to add product');
            }
            alert('Product added successfully');
            addProductModal.style.display = 'none';
            loadProducts(currentCategory); // Reload the products for the current category
        } catch (error) {
            console.error('Error adding product:', error.message);
            alert('Failed to add product. Please try again.');
        }
    });

    editProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const productId = document.getElementById('edit-product-id').value;
        const name = document.getElementById('edit-product-name').value;
        const image = document.getElementById('edit-product-image').value;
        const price = document.getElementById('edit-product-price').value;

        await updateProduct(productId, name, image, price);
        editProductModal.style.display = 'none';
        loadProducts(currentCategory); // Reload the products for the current category
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentCategory = link.dataset.category;
            loadProducts(currentCategory);
        });
    });

    // Load initial category
    let currentCategory = 'watches';
    loadProducts(currentCategory);
    loadProducts('scrolling');
});
