
class TripView {
    constructor() {
        this.container = document.createElement('div');
        this.container.classList.add('container');
        document.body.appendChild(this.container);

        const title = document.createElement('h1');
        title.textContent = 'Планер поездок';
        this.container.appendChild(title);

        this.tripForm = this.createTripForm();
        this.container.appendChild(this.tripForm);

        this.tripFilter = this.createTripFilter();
        this.container.appendChild(this.tripFilter);

        const tripListContainer = document.createElement('div');
        tripListContainer.classList.add('trip-list');
        const tripListTitle = document.createElement('h2');
        tripListTitle.textContent = 'Поездки';
        tripListContainer.appendChild(tripListTitle);

        this.tripList = document.createElement('ul');
        this.tripList.id = 'trip-list';
        tripListContainer.appendChild(this.tripList);
        this.container.appendChild(tripListContainer);
    }

    createTripForm() {
        const formContainer = document.createElement('div');
        formContainer.classList.add('trip-form');

        const formTitle = document.createElement('h2');
        formTitle.textContent = 'Добавить новую поездку';
        formContainer.appendChild(formTitle);

        const form = document.createElement('form');
        form.id = 'trip-form';
        formContainer.appendChild(form);

        form.appendChild(this.createLabel('Путешествие:', 'trip-destination'));
        const destinationInput = document.createElement('input');
        destinationInput.type = 'text';
        destinationInput.id = 'trip-destination';
        destinationInput.placeholder = 'Destination';
        destinationInput.required = true;
        form.appendChild(destinationInput);

        form.appendChild(this.createLabel('Дата:', 'trip-date'));
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.id = 'trip-date';
        dateInput.required = true;
        form.appendChild(dateInput);

        form.appendChild(this.createLabel('Заметки:', 'trip-notes'));
        const notesInput = document.createElement('textarea');
        notesInput.id = 'trip-notes';
        notesInput.placeholder = 'Notes';
        notesInput.rows = 3;
        form.appendChild(notesInput);

        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = 'Статус поездки:';
        fieldset.appendChild(legend);
        fieldset.appendChild(this.createRadio('trip-status', 'Planned', 'Запланировано'));
        fieldset.appendChild(this.createRadio('trip-status', 'Completed', 'Выполнено'));
        form.appendChild(fieldset);

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Добавить поездку';
        form.appendChild(submitButton);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.onAddTrip();
        });

        return formContainer;
    }

    createTripFilter() {
        const filterContainer = document.createElement('div');
        filterContainer.classList.add('trip-filter');

        filterContainer.appendChild(this.createLabel('Фильтр по дате:', 'date-filter'));
        this.dateFilter = document.createElement('input');
        this.dateFilter.type = 'date';
        this.dateFilter.id = 'date-filter';
        this.dateFilter.addEventListener('input', () => this.onFilterTrips());
        filterContainer.appendChild(this.dateFilter);

        this.completedFilter = document.createElement('input');
        this.completedFilter.type = 'checkbox';
        this.completedFilter.id = 'completed-filter';
        this.completedFilter.addEventListener('change', () => this.onFilterTrips());
        const completedLabel = document.createElement('label');
        completedLabel.textContent = ' Показывать только завершенные поездки';
        completedLabel.prepend(this.completedFilter);
        filterContainer.appendChild(completedLabel);

        return filterContainer;
    }

    createLabel(text, forId) {
        const label = document.createElement('label');
        label.textContent = text;
        label.htmlFor = forId;
        return label;
    }

    createRadio(name, value, labelText) {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = name;
        radio.value = value;
        radio.required = true;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(labelText));
        return label;
    }

    renderTrips(trips) {
        this.tripList.innerHTML = '';
        trips.forEach((trip, index) => {
            const tripItem = document.createElement('li');
            tripItem.innerHTML = `
                <span><strong>${trip.destination}</strong> - ${trip.date}</span>
                <span>${trip.notes}</span>
                <span>${trip.status}</span>
                <button onclick="tripPresenter.editTrip(${index})">Редактировать</button>
                <button onclick="tripPresenter.deleteTrip(${index})">Удалить</button>
            `;
            this.tripList.appendChild(tripItem);
        });
    }

    getFormData() {
        return {
            destination: document.getElementById('trip-destination').value,
            date: document.getElementById('trip-date').value,
            notes: document.getElementById('trip-notes').value,
            status: document.querySelector('input[name="trip-status"]:checked').value
        };
    }

    setFormData(trip) {
        document.getElementById('trip-destination').value = trip.destination;
        document.getElementById('trip-date').value = trip.date;
        document.getElementById('trip-notes').value = trip.notes;
        document.querySelector(`input[name="trip-status"][value="${trip.status}"]`).checked = true;
    }

    clearForm() {
        document.getElementById('trip-form').reset();
    }

    setAddTripCallback(callback) {
        this.onAddTrip = callback;
    }

    setFilterCallback(callback) {
        this.onFilterTrips = callback;
    }
}


export { TripView };
