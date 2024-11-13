import { TripModel } from './model.js';
import { TripView } from './view.js';
import { TripPresenter } from './presenter.js';

const tripModel = new TripModel();
const tripView = new TripView();
const tripPresenter = new TripPresenter(tripModel, tripView);


export { tripPresenter };
