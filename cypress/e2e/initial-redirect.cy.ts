const mockApiResponse = {
  _embedded: {
    events: [
      {
        id: '123',
        name: 'Test Concert',
        type: 'event',
        locale: 'en-us',
        url: 'https://www.ticketmaster.com/event/123',
        images: [],
        dates: {
          start: { dateTime: '2025-07-23T00:00:00Z' }, status: { code: 'onsale' }
        },
        classifications: [{
          segment: {
            name: 'Music'
          },
          genre: {
            name: 'Alternative'
          }
        }],
        description: "",
        additionalInfo: "",
        info: "",
        place: {
          name: "",
          address: {
            line1: "",
            line2: ""
          },
          city: {
            name: ""
          },
          state: {
            stateCode: "",
            name: ""
          },
          postalCode: ""
        }
      },
      {
        id: '234',
        name: 'Test Play',
        type: 'event',
        locale: 'en-us',
        url: 'https://www.ticketmaster.com/event/234',
        images: [],
        dates: {
          start: { dateTime: '2025-07-23T00:00:00Z' }, status: { code: 'onsale' }
        },
        classifications: [{
          segment: {
            name: 'Play'
          },
          genre: {
            name: 'Theater'
          }
        }],
        description: "",
        additionalInfo: "",
        info: "",
        place: {
          name: "",
          address: {
            line1: "",
            line2: ""
          },
          city: {
            name: ""
          },
          state: {
            stateCode: "",
            name: ""
          },
          postalCode: ""
        }
      },
    ],
  },
  page: { number: 0, size: 25, totalElements: 2, totalPages: 1 },
}

describe("Navigation Redirects", () => {
  it("should redirect from '/' to '/events'", () => {
    cy.visit('/')

    cy.url().should('include', '/events')

    cy.get('h1').should('contain', 'Events')
  })

  it("should redirect to detail page when you click on an event in the event list", () => {
    cy.intercept('GET', 'https://app.ticketmaster.com/discovery/v2/events.json**', {
      body: mockApiResponse,
      delay: 200
    }).as('getEvents')

    cy.intercept('GET', 'https://app.ticketmaster.com/discovery/v2/events/**.json**', {
      body: mockApiResponse._embedded.events[0],
      delay: 200
    }).as('getEventDetails')

    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((successCallback) => {
          successCallback({
            coords: {
              latitude: 47.6061,
              longitude: -122.3328
            },
            timestamp: Date.now(),
          });
        });
      },
    })

    cy.contains('div', 'Loading Events...').should('be.visible')

    cy.wait('@getEvents').its('response.statusCode').should('eq', 200)

    cy.contains('div', 'Loading Events...').should('not.exist')
    
    cy.get('div').contains(mockApiResponse._embedded.events[0].name).click()

    cy.url().should('contain', `/events/${mockApiResponse._embedded.events[0].id}`)

    cy.wait('@getEventDetails').its('response.statusCode').should('eq', 200)

    cy.get('h1').should('contain', mockApiResponse._embedded.events[0].name)
  })
})
