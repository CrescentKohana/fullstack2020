describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Super User',
      username: 'root',
      password: 'himitsu'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form is shown', function() {
    cy.contains('Login').click()
    cy.get('#username')
  })

  describe('login',function() {
    it('login is successful with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('himitsu')
      cy.get('#login-btn').click()

      cy.contains('Super User logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('Login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Super User logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'himitsu' })
    })

    it('a new blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('An E2E test blog')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://localhost:1337')
      cy.get('#likes').type('3')
      cy.get('#save-btn').click()
      cy.contains('An E2E test blog by Cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Another E2E test blog',
          author: 'Cypress',
          url: 'https://localhost:1337',
          likes: 0
        })
      })

      it('it can be liked', function () {
        cy.get('.blog-view-btn').click()

        cy.contains('❤️ 0')
        cy.get('.blog').contains('+').click()
        cy.contains('❤️ 1')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Super User', url: 'localhost', likes: 1 })
        cy.createBlog({ title: 'second blog', author: 'Super User', url: 'example.com', likes: 5 })
        cy.createBlog({ title: 'third blog', author: 'Normal User', url: 'example.org', likes: 30 })
      })

      it('one of those can be liked', function () {
        cy.contains('second blog').parent().find('button').click()
        cy.contains('❤️ 5')
        cy.contains('second blog').parent().contains('+').click()
        cy.contains('❤️ 6')
      })

      it('one of those can deleted', function () {
        cy.contains('third blog').parent().find('button').click()
        cy.contains('third blog').parent().get('.extra').get('.blog-del-btn').click()

        cy.get('.blog').should('not.contain', 'third blog')
      })

      it('which are ordered according to likes (descending)', function () {
        cy.get('.blog').then(blogs => {
          blogs.find('button').click()
          expect(blogs).to.have.length(3)

          for (let i = 0; i < blogs.length; i++) {
            const current = Number(blogs[i].getElementsByClassName('extra')[0].children[1].innerText.split(' ')[1])
            if (i < blogs.length - 1) {
              const next = Number(blogs[i+1].getElementsByClassName('extra')[0].children[1].innerText.split(' ')[1])
              expect(current).to.be.least(next)
            } else {
              const first = Number(blogs[0].getElementsByClassName('extra')[0].children[1].innerText.split(' ')[1])
              expect(current).to.be.most(first)
            }
          }
        })
      })
    })
  })
})
