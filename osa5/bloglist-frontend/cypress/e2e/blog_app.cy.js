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
      cy.login({ username: 'ttester', password: 'supersecretword' })
    })

    it('A new blog can be added', function() {
      cy.contains('add blog').click()
      cy.get('#blog-title').type('Test title for a new blog post')
      cy.get('#blog-author').type('T. McAuthor')
      cy.get('#blog-url').type('https://www.testblog.fi/post1')
      cy.get('#save-button').click()

      cy.get('#bloglist').contains('Test title for a new blog post')
    })

    describe('and some blogs exist', function() {
      beforeEach(function () {
        cy.addBlog({ title: 'First test blog', author: 'Palle Palle', url: 'www.url.fi/1' })
        cy.addBlog({ title: 'Second blog of interest', author: 'Kuula', url: 'www.blogi.net/interest' })
        cy.addBlog({ title: 'Third blog', author: 'Charles Dickens', url: 'www.penguin.co.uk/blog' })
      })

      it.only('liking a blog increases its likes by one', function() {
        cy.contains('Second blog').as('Blog2').contains('view').click()
        cy.get('@Blog2').contains('likes 0')

        cy.get('@Blog2').find('button').contains('like').as('likeButton').click()
        cy.get('@Blog2').contains('likes 1')
      })
    })
  })

})
