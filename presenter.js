import { TripModel } from './model.js';
import { TripView } from './view.js';

class TripPresenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.setUpdateCallback(() => this.updateView());
        this.view.setAddTripCallback(() => this.addTrip());
        this.view.setFilterCallback(() => this.filterTrips());

        this.isEditing = false;
        this.editingIndex = null;
    }

    addTrip() {
        if (this.isEditing) {
            const updatedTrip = this.view.getFormData();
            this.model.updateTrip(this.editingIndex, updatedTrip);
            this.isEditing = false;
            this.editingIndex = null;
        } else {
            const newTrip = this.view.getFormData();
            this.model.addTrip(newTrip);
        }
        this.view.clearForm();
    }

    deleteTrip(index) {
        this.model.deleteTrip(index);
    }

    editTrip(index) {
        const trip = this.model.trips[index];
        this.view.setFormData(trip);
        this.isEditing = true;
        this.editingIndex = index;
    }

    filterTrips() {
        const date = this.view.dateFilter.value;
        const completedOnly = this.view.completedFilter.checked;
        const filteredTrips = this.model.filterTrips(date, completedOnly);
        this.view.renderTrips(filteredTrips);
    }

    updateView() {
        this.filterTrips();
    }
}


export { TripPresenter };
