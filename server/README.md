### API Endpoints
---

#### Room Listing Reservation Checkout

`GET` /rooms/:listingId

`POST` /rooms/listings

`PUT` /rooms/:listing_id

`DELETE` /rooms/:listing_id

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| Listing Id | string | Id of room listing |

---

#### Bookings

`GET` /rooms/bookings/:listingId

`POST` /rooms/bookings/:listing_id

`PUT` /rooms/booking/:bookingId

`DELETE` /rooms/booking/:bookingId

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| Listing Id | string | Id of room listing |
| Booking Id | string | Id of booking |
