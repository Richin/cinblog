$(function() {
	
	Parse.$ = jQuery;
	Parse.initialize("t7H7F0izGrqZLbSbHAQgoY7TE2Kmzwvolf3d2wIo", "SsRcLc0FBSg6F0GWbQ1dNa87S3jT7bgMFsy2eJYq");
	var Blog = Parse.Object.extend('Blog', {
			create: function(title, content) {
				this.save({
					'title': title,
					'content': content,
					'author': Parse.User.current(),
					'authorName': Parse.User.current().get('username'),
					'time': new Date().toDateString()
				}, {
					success: function(blog) {
						alert('You added a new blog: ' + blog.get('title'));
					},
					error: function(blog, error) {
						console.log(blog);
						console.log(error);
					}
				});
			}

		}), 
		LoginView = Parse.View.extend({
			template: Handlebars.compile($('#login-tpl').html()),
			events: {
				'submit .form-signin': 'login'
			},
			login: function(e) {

				// Prevent Default Submit Event
				e.preventDefault();

				// Get data from the form and put them into variables
				var data = $(e.target).serializeArray(),
					username = data[0].value,
					password = data[1].value;

				// Call Parse Login function with those variables
				Parse.User.logIn(username, password, {
					// If the username and password matches
					success: function(user) {
						var welcomeView = new WelcomeView({ model: user });
						welcomeView.render();
						$('.main-container').html(welcomeView.el);
					},
					// If there is an error
					error: function(user, error) {
						console.log(error);
					}
				});
			},
 			render: function(){
				this.$el.html(this.template());
			}
		}),
		WelcomeView = Parse.View.extend({
			template: Handlebars.compile($('#welcome-tpl').html()),
			events: {
				'click .add-blog': 'add'
			},
			add: function(){
				var addBlogView = new AddBlogView();
				addBlogView.render();
				$('.main-container').html(addBlogView.el);
			},
			render: function(){
				var attributes = this.model.toJSON();
				this.$el.html(this.template(attributes));
			}
		}),
		AddBlogView = Parse.View.extend({
			template: Handlebars.compile($('#add-tpl').html()),
			events: {
				'submit .form-add': 'submit'
			},
			submit: function(e){
				// Prevent Default Submit Event		
				e.preventDefault();
				// Take the form and put it into a data object
				var data = $(e.target).serializeArray(),
				// Create a new instance of Blog
					blog = new Blog();
				// Call .create()
				blog.create(data[0].value, $('textarea').val());
			},
			render: function(){
				this.$el.html(this.template()).find('textarea').wysihtml5();
			}
		});

		// Render login view on page
		var loginView = new LoginView();
		loginView.render();
		$('.main-container').html(loginView.el);
	/*
	var Blog = Parse.Object.extend('Blog', {
		create: function(title,content){
			this.set({
				'title': title,
				'content': content,
				'author': Parse.User.current(),
				'authorName': Parse.User.current().get('username'),
   				'time': new Date().toDateString()
			}).save(null, {
				success: function(blog){
					alert('You added a new blog: '+blog.get('title'));
				},
				error:function(blog,error){
					console.log(blog);
                console.log(error);	
				}
			});
		}
	});
	
	var LoginView = Parse.View.extend({
        template: Handlebars.compile($('#login-tpl').html()),
        events: {
        	'submit .form-signin': 'login'
        	
        },
        login: function(e) {
 
        // Prevent Default Submit Event
        e.preventDefault();
 
        // Get data from the form and put them into variables
        var data = $(e.target).serializeArray(),
            username = data[0].value,
            password = data[1].value;
 
        // Call Parse Login function with those variables
        Parse.User.logIn(username, password, {
            // If the username and password matches
            success: function(user) {
                //alert('Welcome!');
                var welcomeView = new WelcomeView({model: user});
                welcomeView.render();
                $('.main-container').html(welcomeView.el);
            },
            // If there is an error
            error: function(user, error) {
                alert(error.message);
            }
        });
    },
        render: function(){
            this.$el.html(this.template());
        }
    }),
    WelcomeView = Parse.View.extend({
        template: Handlebars.compile($('#welcome-tpl').html()),
        events:{
        	'click .add-blog':'add'
        },
        add: function(){
        	var addBlogView = new AddBlogView();
    		addBlogView.render();
    		$('.main-container').html(addBlogView.el);
        	
        },
        render: function(){
            var attributes = this.model.toJSON();
            this.$el.html(this.template(attributes));
        }
    }),
    	AddBlogView = Parse.View.extend({
			template: Handlebars.compile($('#add-tpl').html()),
			events: {
				'submit .form-add': 'submit'
			},
			submit: function(e){
				e.preventDefault();
				var data = $(e.target).serializeArray(),
				blog = new Blog();
				blog.create(data[0].value, $('textarea').val());
			},
			render: function(){
				this.$el.html(this.template()).find('textarea').wysihtml5();
			}
		});

	
	var loginView = new LoginView();
		loginView.render();
		$('.main-container').html(loginView.el);
		
		
	
/*	$('.form-signin').on('submit', function(e) {
 
    // Prevent Default Submit Event
    e.preventDefault();
 
    // Get data from the form and put them into variables
    var data = $(this).serializeArray(),
        username = data[0].value,
        password = data[1].value;
 
    // Call Parse Login function with those variables
    Parse.User.logIn(username, password, {
        // If the username and password matches
        success: function(user) {
            alert('Welcome!');
        },
        // If there is an error
        error: function(user, error) {
            console.log(error);
        }
    });
 
});*/
	
});
