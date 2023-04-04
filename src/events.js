import React from 'react'
import './test.css';

export default function events() {
  return (
    <div className="container">
        <form>
		<div class="form-field">
			<label for="event-name">Event Name:</label>
			<input type="text" id="event-name" name="event-name" required />
		</div>
		<div class="form-field">
			<label for="event-date">Event Date:</label>
			<input type="date" id="event-date" name="event-date" required />
		</div>
		<div class="form-field">
			<label for="event-description">Event Description:</label>
			<textarea id="event-description" name="event-description" required></textarea>
		</div>
		<div class="form-field">
			<label for="event-price">Price:</label>
			<input type="number" id="event-price" name="event-price" min="0" required />
		</div>
		<div class="form-field">
			<label>Premium or Normal Booking:</label>
			<input type="radio" id="normal" name="booking-type" value="normal" checked/>
			<label for="normal">Normal</label>
            <br/>
			<input type="radio" id="premium" name="booking-type" value="premium"/>
			<label for="premium">Premium</label>
        </div>
		<div class="form-field">
			<input type="checkbox" id="accept-terms" name="accept-terms" required />
			<label for="accept-terms">I accept the terms & conditions</label>
		</div>
		<div class="form-field">
			<input type="submit" value="Submit"/>
		</div>
	</form>
    </div>
  )
}
