
        let items = JSON.parse(localStorage.getItem('shopping-items')) || [];
        let currentFilter = 'all';

        function addItem() {
            const itemInput = document.getElementById('item-input');
            const quantityInput = document.getElementById('item-quantity');
            const categorySelect = document.getElementById('item-category');

            const itemText = itemInput.value.trim();
            const quantity = quantityInput.value;

            if (itemText) {
                items.push({
                    name: itemText,
                    quantity: quantity,
                    category: categorySelect.value,
                    completed: false
                });

                itemInput.value = '';
                quantityInput.value = '1';
                renderItems();
            }
        }

        function renderItems() {
            const shoppingList = document.getElementById('shopping-list');
            shoppingList.innerHTML = '';

            let displayedItems = items;
            if (currentFilter !== 'all') {
                displayedItems = items.filter(item => item.category === currentFilter);
            }

            displayedItems.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = item.completed ? 'completed' : '';
                li.innerHTML = `
                    <span onclick="toggleItemStatus(${index})">
                        ${item.name} (${item.quantity})
                    </span>
                    <button class="delete-btn" onclick="deleteItem(${index})">Supprimer</button>
                `;
                shoppingList.appendChild(li);
            });

            localStorage.setItem('shopping-items', JSON.stringify(items));
        }

        function toggleItemStatus(index) {
            items[index].completed = !items[index].completed;
            renderItems();
        }

        function deleteItem(index) {
            items.splice(index, 1);
            renderItems();
        }

        function clearList() {
            if (confirm('Voulez-vous vraiment vider toute la liste de courses ?')) {
                items = [];
                renderItems();
            }
        }

        function printList() {
            const printContent = items.map(item => 
                `${item.name} (${item.quantity}) - ${item.category}`
            ).join('\n');

            const printWindow = window.open('', 'Liste de courses', 'height=500, width=500');
            printWindow.document.write('<html><head><title>Liste de Courses</title>');
            printWindow.document.write('<style>body{font-family:Arial;} ul{padding-left:20px;}</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write('<h1>Liste de Courses</h1>');
            printWindow.document.write('<ul>');
            
            items.forEach(item => {
                printWindow.document.write(`
                    <li>
                        ${item.name} (${item.quantity}) - ${item.category}
                    </li>
                `);
            });
            
            printWindow.document.write('</ul></body></html>');
            printWindow.document.close();
            printWindow.print();
        }

        function filterItems(category) {
            currentFilter = category;
            
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent.toLowerCase() === category || 
                    (category === 'all' && btn.textContent === 'Tous')) {
                    btn.classList.add('active');
                }
            });
            
            renderItems();
        }

        // Initialisation
        renderItems();
    
