describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Tuula Test",
      username: "ttester",
      password: "supersecretword",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is displayed", function () {
    cy.get("#username");
    cy.get("#password");
    cy.get("#login-button");
  });

  it("An existing user can log in", function () {
    cy.get("#username").type("ttester");
    cy.get("#password").type("supersecretword");
    cy.get("#login-button").click();

    cy.contains("Tuula Test logged in");
  });

  it("Login fails with incorrect username", function () {
    cy.get("#username").type("notauser");
    cy.get("#password").type("badpassword");
    cy.get("#login-button").click();

    cy.get(".notify-error")
      .should("contain", "wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Tuula Test logged in");
  });

  it("Login fails with incorrect password", function () {
    cy.get("#username").type("ttester");
    cy.get("#password").type("badpassword");
    cy.get("#login-button").click();

    cy.get(".notify-error")
      .should("contain", "wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Tuula Test logged in");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "ttester", password: "supersecretword" });
    });

    it("A new blog can be added", function () {
      cy.contains("add blog").click();
      cy.get("#blog-title").type("Test title for a new blog post");
      cy.get("#blog-author").type("T. McAuthor");
      cy.get("#blog-url").type("https://www.testblog.fi/post1");
      cy.get("#save-button").click();

      cy.get("#bloglist").contains("Test title for a new blog post");
    });

    describe("and some blogs exist", function () {
      const initialBlogs = [
        {
          title: "First test blog",
          author: "Palle Palle",
          url: "www.url.fi/1",
        },
        {
          title: "Second blog of interest",
          author: "Kuula",
          url: "www.blogi.net/interest",
        },
        {
          title: "Third blog",
          author: "Charles Dickens",
          url: "www.penguin.co.uk/blog",
        },
      ];

      beforeEach(function () {
        initialBlogs.forEach((blog) => {
          cy.addBlog(blog);
        });
      });

      it("liking a blog increases its likes by one", function () {
        cy.contains("Second blog").as("Blog2").contains("view").click();
        cy.get("@Blog2").contains("likes 0");

        cy.get("@Blog2")
          .find("button")
          .contains("like")
          .as("likeButton")
          .click();
        cy.get("@Blog2").contains("likes 1");
      });

      it("the user who added a blog can delete it", function () {
        cy.contains("Third blog").contains("view").click();
        cy.contains("Third blog").find("button").contains("Delete").click();
        cy.get("#bloglist").should("not.contain", "Third blog");
      });

      it("a user should not be able to delete a blog not added by them", function () {
        const user = {
          name: "Paavo Karhu",
          username: "paavoblogs",
          password: "hunter2",
        };
        cy.request("POST", "http://localhost:3003/api/users/", user);
        cy.login({ username: "paavoblogs", password: "hunter2" });
        cy.contains("Third blog").contains("view").click();
        cy.contains("Third blog")
          .find("button")
          .should("not.contain", "Delete");
      });

      it("blogs should be sorted by likes", function () {
        let checkCount = 0;
        let checkLimit = 10;
        // Sort blogs into random order and give first two random decreasing likes
        const randomisedBlogs = initialBlogs
          .sort((_) => Math.random() - 0.5)
          .map((blog, i) => ({
            blog: blog,
            likes: (2 - i) * 3 + 3 * Math.floor(Math.random()),
          }));
        // give blogs likes based on randomisedBlogs
        const giveAndCheckLikes = ({ blog, likes }) => {
          cy.contains(blog.title)
            .invoke("text")
            // parse number found after "likes " as an Int
            .then((text) => parseInt(text.match(/likes (\d+)/)[1]))
            .then((number) => {
              if (number === likes) {
                cy.log(`Blog ${blog.title} has ${likes} likes!`);
              } else {
                cy.wait(500, { log: false });
                cy.giveLike(blog.title);
                checkCount += 1;
                if (checkCount >= checkLimit) {
                  throw new Error("Check limit exceeded!");
                }
                giveAndCheckLikes({ blog, likes });
              }
            });
        };
        randomisedBlogs.forEach(({ blog, likes }) => {
          giveAndCheckLikes({ blog, likes });
        });

        cy.get("#bloglist")
          .children()
          .then((blogs) => {
            for (let i = 0; i < randomisedBlogs.length; i++) {
              expect(blogs[i]).to.contain(randomisedBlogs[i].blog.title);
            }
          });
      });
    });
  });
});
