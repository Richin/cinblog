$(function() {
	
	Parse.$ = jQuery;
	Parse.initialize("t7H7F0izGrqZLbSbHAQgoY7TE2Kmzwvolf3d2wIo", "SsRcLc0FBSg6F0GWbQ1dNa87S3jT7bgMFsy2eJYq");
	
	/*var Blog = Parse.Object.extend("Blog");
	var Blogs = Parse.Collection.extend({
		model: Blog
	});
	var blogs = new Blogs();
	blogs.fetch({
		sucess: function(blogs)
		{
			alert(blogs);
		},
		error: function(blogs, error)
		{
			alert(error);
		}
	});*/
/*	
	var Blog = Parse.Object.extend("Blog"),
		Blogs = Parse.Collection.extend({
			model: Blog
		}),
		BlogsView = Parse.View.extend({
			template: Handlebars.compile($('#blogs-tpl').html()),
			render: function() { 
				var collection = { blog: this.collection.toJSON() };
				this.$el.html(this.template(collection));
			}
		});
		blogs = new Blogs();

		blogs.fetch({
			success: function(blogs) {
				var blogsView = new BlogsView({ collection: blogs });
				blogsView.render();
				$('.main-container').html(blogsView.el);
			},
			error: function(blogs, error) {
				console.log(error);
			}
		});*/
		
	var Blog = Parse.Object.extend("Blog");
	var Blogs = Parse.Collection.extend({
				model: Blog
	});
		
	var BlogsView = Parse.View.extend({
		template: Handlebars.compile($('#blogs-tpl').html()),
		render: function(){
			var collection = {blog: this.collection.toJSON() };
			this.$el.html(this.template(collection));
		}
	});
	
	
	blogs = new Blogs();
	
	blogs.fetch({
		success: function(blogs){
			var blogsView = new BlogsView({collection :blogs});
			blogsView.render();
			$('.main-container').html(blogsView.el);
		},
		error: function(blogs, error){
			alert(error);
		}
	});
	
});
