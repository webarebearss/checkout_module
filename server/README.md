### API Endpoints
---

#### Room Listing Reservation Checkout

`GET` /rooms/checkout/:listingId

`POST` /rooms/listings

`PUT` /rooms/checkout/:listing_id

`DELETE` /rooms/checkout/:listing_id

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| Listing Id | string | Id of room listing |

---

#### Bookings

`GET` /rooms/bookings/:listingId

`POST` /rooms/checkout/:listing_id

`PUT` /rooms/checkout/booking/:bookingId

`DELETE` /rooms/checkout/booking/:bookingId

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| Listing Id | string | Id of room listing |
| Booking Id | string | Id of booking |
