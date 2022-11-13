describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: "Tuula Test",
      username: "ttester",
      password: "supersecretword"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is displayed', function() {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  it('An existing user can log in', function() {
    cy.get('#username').type('ttester')
    cy.get('#password').type('supersecretword')
    cy.get('#login-button').click()

    cy.contains('Tuula Test logged in')
  })

  it('Login fails with incorrect username', function() {
    cy.get('#username').type('notauser')
    cy.get('#password').type('badpassword')
    cy.get('#login-button').click()

    cy.get('.notify-error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Tuula Test logged in')
  })

  it('Login fails with incorrect password', function() {
    cy.get('#username').type('ttester')
    cy.get('#password').type('badpassword')
    cy.get('#login-button').click()

    cy.get('.notify-error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Tuula Test logged in')
  })

  describe('When logged in', function() {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'ttester', password: 'supersecretword'
      }).then(response => {
        localStorage.setItem('loggedInBlogUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it.only('A new blog can be added', function() {
      cy.contains('add blog').click()
      cy.get('#blog-title').type('Test title for a new blog post')
      cy.get('#blog-author').type('T. McAuthor')
      cy.get('#blog-url').type('https://www.testblog.fi/post1')
      cy.get('#save-button').click()

      cy.get('#bloglist').contains('Test title for a new blog post')
    })
  })
})
