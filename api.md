# Auth API

    -POST /signup
    -POST /signin
    -POST /guest

# Event API

    -POST /events       create the event 
    -GET /events        get all the event (with filter)
    -GET /event/:id     get event detail by id
    -PATCH /event/:id   update a event (owner only)
    -DELETE /event/:id  Delete a event (owner only)

# Attendees API 
    -POST /event/:eventId/attendees    Register for a event
    -DELETE /events/:eventId/attendees Unregister from a event 
    -GET  /event/:eventId/attendees    get list of all attendees


# Image upload 
    -POST /uploads  upload event images