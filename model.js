
class TripModel {
    constructor() {
        this.trips = [];
    }

    addTrip(trip) {
        this.trips.push(trip);
        this.onTripsUpdated();
    }

    deleteTrip(index) {
        this.trips.splice(index, 1);
        this.onTripsUpdated();
    }

    updateTrip(index, updatedTrip) {
        this.trips[index] = updatedTrip;
        this.onTripsUpdated();
    }

    filterTrips(date, completedOnly) {
        return this.trips.filter(trip => {
            const matchesDate = date ? trip.date === date : true;
            const matchesStatus = completedOnly ? trip.status === 'Completed' : true;
            return matchesDate && matchesStatus;
        });
    }

    setUpdateCallback(callback) {
        this.onTripsUpdated = callback;
    }
}


export { TripModel };
